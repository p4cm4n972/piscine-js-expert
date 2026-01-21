# Ex23 - Memory Management & Garbage Collection

## Objectif
Comprendre la gestion mémoire en JavaScript, identifier et résoudre les memory leaks (fuites mémoire), et optimiser l'utilisation de la mémoire dans les applications.

## Contexte
JavaScript utilise un garbage collector (ramasse-miettes) automatique, mais cela ne signifie pas que les memory leaks sont impossibles. Comprendre comment la mémoire est allouée et libérée est essentiel pour les applications performantes.

```javascript
// Le cycle de vie de la mémoire
// 1. Allocation - quand vous créez des variables/objets
const obj = { data: 'hello' };  // Mémoire allouée

// 2. Utilisation - lecture/écriture
console.log(obj.data);

// 3. Libération - quand il n'y a plus de références
// obj = null;  // Éligible au garbage collection
```

## Instructions

### 1. Identifier les memory leaks courants
Analyser et corriger des patterns problématiques.

### 2. `createMemoryMonitor()`
Outil de surveillance de la mémoire.

### 3. WeakMap / WeakSet patterns
Utiliser les références faibles correctement.

### 4. `createLeakDetector()`
Détecter les fuites mémoire automatiquement.

### 5. Optimisation de structures de données
Réduire l'empreinte mémoire.

## Exemples

### Garbage Collection Basics
```javascript
// L'objet est éligible au GC quand il n'y a plus de références
function example() {
    const local = { big: new Array(1000000) };
    return local.big[0];  // local est éligible au GC après return
}

// Références circulaires - le GC moderne les gère
function circular() {
    const a = {};
    const b = {};
    a.ref = b;
    b.ref = a;
    // Les deux seront garbage collected quand la fonction termine
}

// Mark-and-Sweep algorithm (simplifié)
// 1. Marque tous les objets accessibles depuis les "roots" (global, stack)
// 2. Supprime tous les objets non marqués
```

### Memory Leaks Courants

#### 1. Variables globales accidentelles
```javascript
// ❌ MAUVAIS - variable globale implicite (sans 'use strict')
function leak1() {
    leakedVar = 'oops';  // Devient window.leakedVar!
}

// ✅ BON
'use strict';
function noLeak1() {
    const localVar = 'safe';
}
```

#### 2. Closures qui retiennent des références
```javascript
// ❌ MAUVAIS - la closure retient tout le scope
function createLeak() {
    const hugeData = new Array(1000000).fill('x');
    const smallValue = hugeData.length;

    return function() {
        // Cette closure retient une référence à hugeData!
        return smallValue;
    };
}

// ✅ BON - ne capturer que ce qui est nécessaire
function noLeak() {
    const hugeData = new Array(1000000).fill('x');
    const smallValue = hugeData.length;
    // hugeData peut être GC après cette ligne

    return function() {
        return smallValue;  // Seul smallValue est capturé
    };
}

// ✅ MIEUX - structure explicite
function betterNoLeak() {
    const smallValue = computeValue();
    return () => smallValue;

    function computeValue() {
        const hugeData = new Array(1000000).fill('x');
        return hugeData.length;  // hugeData est éligible au GC ici
    }
}
```

#### 3. Event listeners non supprimés
```javascript
// ❌ MAUVAIS - listener jamais supprimé
class BadComponent {
    constructor() {
        this.data = new Array(10000);
        window.addEventListener('resize', this.handleResize);
    }

    handleResize = () => {
        // this.data est retenu même si le composant est "détruit"
    };

    // Pas de cleanup!
}

// ✅ BON - cleanup explicite
class GoodComponent {
    constructor() {
        this.data = new Array(10000);
        this.boundHandler = this.handleResize.bind(this);
        window.addEventListener('resize', this.boundHandler);
    }

    handleResize() {
        // ...
    }

    destroy() {
        window.removeEventListener('resize', this.boundHandler);
        this.data = null;  // Optionnel mais explicite
    }
}

// ✅ MIEUX - AbortController (modern)
class ModernComponent {
    #abortController = new AbortController();

    constructor() {
        this.data = new Array(10000);
        window.addEventListener('resize', () => this.handleResize(), {
            signal: this.#abortController.signal
        });
    }

    handleResize() {
        // ...
    }

    destroy() {
        this.#abortController.abort();  // Supprime tous les listeners
    }
}
```

#### 4. Timers et intervals oubliés
```javascript
// ❌ MAUVAIS - interval jamais clear
class Poller {
    constructor() {
        this.data = [];
        setInterval(() => {
            this.data.push(new Date());  // Accumule indéfiniment
        }, 1000);
    }
}

// ✅ BON - cleanup du timer
class GoodPoller {
    #intervalId;
    #data = [];

    start() {
        this.#intervalId = setInterval(() => {
            this.#data.push(new Date());
            // Limiter la taille
            if (this.#data.length > 1000) {
                this.#data.shift();
            }
        }, 1000);
    }

    stop() {
        clearInterval(this.#intervalId);
    }

    destroy() {
        this.stop();
        this.#data = [];
    }
}
```

#### 5. Caches sans limite
```javascript
// ❌ MAUVAIS - cache qui grandit indéfiniment
const cache = new Map();

function fetchCached(url) {
    if (!cache.has(url)) {
        cache.set(url, fetch(url).then(r => r.json()));
    }
    return cache.get(url);
}
// Après des milliers d'URLs différentes... boom!

// ✅ BON - LRU Cache avec limite
function createLRUCache(maxSize) {
    const cache = new Map();

    return {
        get(key) {
            if (!cache.has(key)) return undefined;
            // Move to end (most recently used)
            const value = cache.get(key);
            cache.delete(key);
            cache.set(key, value);
            return value;
        },

        set(key, value) {
            if (cache.has(key)) cache.delete(key);
            cache.set(key, value);

            // Evict oldest if over limit
            if (cache.size > maxSize) {
                const oldest = cache.keys().next().value;
                cache.delete(oldest);
            }
        },

        clear() {
            cache.clear();
        }
    };
}
```

### createMemoryMonitor - Surveillance mémoire
```javascript
function createMemoryMonitor(options = {}) {
    const {
        interval = 5000,
        threshold = 0.9,  // 90% heap usage
        onThresholdExceeded = () => {},
        onSample = () => {}
    } = options;

    const samples = [];
    let intervalId = null;

    function takeSample() {
        if (typeof process !== 'undefined' && process.memoryUsage) {
            // Node.js
            const usage = process.memoryUsage();
            return {
                timestamp: Date.now(),
                heapUsed: usage.heapUsed,
                heapTotal: usage.heapTotal,
                external: usage.external,
                rss: usage.rss,
                ratio: usage.heapUsed / usage.heapTotal
            };
        } else if (performance.memory) {
            // Chrome (avec --enable-precise-memory-info)
            const memory = performance.memory;
            return {
                timestamp: Date.now(),
                heapUsed: memory.usedJSHeapSize,
                heapTotal: memory.totalJSHeapSize,
                heapLimit: memory.jsHeapSizeLimit,
                ratio: memory.usedJSHeapSize / memory.totalJSHeapSize
            };
        }
        return null;
    }

    function formatBytes(bytes) {
        const units = ['B', 'KB', 'MB', 'GB'];
        let i = 0;
        while (bytes >= 1024 && i < units.length - 1) {
            bytes /= 1024;
            i++;
        }
        return `${bytes.toFixed(2)} ${units[i]}`;
    }

    return {
        start() {
            if (intervalId) return;

            intervalId = setInterval(() => {
                const sample = takeSample();
                if (sample) {
                    samples.push(sample);
                    onSample(sample);

                    if (sample.ratio > threshold) {
                        onThresholdExceeded(sample);
                    }

                    // Keep only last 1000 samples
                    if (samples.length > 1000) {
                        samples.shift();
                    }
                }
            }, interval);
        },

        stop() {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        },

        getSamples() {
            return [...samples];
        },

        getStats() {
            if (samples.length === 0) return null;

            const heapValues = samples.map(s => s.heapUsed);
            const sorted = [...heapValues].sort((a, b) => a - b);

            return {
                sampleCount: samples.length,
                current: formatBytes(heapValues[heapValues.length - 1]),
                min: formatBytes(sorted[0]),
                max: formatBytes(sorted[sorted.length - 1]),
                avg: formatBytes(heapValues.reduce((a, b) => a + b) / heapValues.length),
                trend: samples.length > 1
                    ? heapValues[heapValues.length - 1] - heapValues[0]
                    : 0
            };
        },

        snapshot() {
            return takeSample();
        },

        compare(snapshot1, snapshot2) {
            return {
                heapDiff: snapshot2.heapUsed - snapshot1.heapUsed,
                heapDiffFormatted: formatBytes(snapshot2.heapUsed - snapshot1.heapUsed),
                timeDiff: snapshot2.timestamp - snapshot1.timestamp
            };
        }
    };
}

// Usage
const monitor = createMemoryMonitor({
    interval: 1000,
    threshold: 0.8,
    onThresholdExceeded: (sample) => {
        console.warn('High memory usage:', sample.ratio * 100 + '%');
    }
});

monitor.start();
// ... run application ...
console.log(monitor.getStats());
monitor.stop();
```

### WeakMap / WeakSet - Références faibles
```javascript
// WeakMap: les clés sont des références faibles
// - Les clés doivent être des objets
// - Si l'objet-clé est GC, l'entrée est supprimée
// - Non itérable (pas de .keys(), .values(), .entries())

// Pattern: Metadata sur des objets
const metadata = new WeakMap();

function setMetadata(obj, data) {
    metadata.set(obj, data);
}

function getMetadata(obj) {
    return metadata.get(obj);
}

const element = document.createElement('div');
setMetadata(element, { created: Date.now(), clicks: 0 });

// Quand element est retiré du DOM et plus référencé,
// les metadata sont automatiquement GC!

// Pattern: Cache par objet
const computationCache = new WeakMap();

function expensiveOperation(obj) {
    if (computationCache.has(obj)) {
        return computationCache.get(obj);
    }

    const result = /* expensive computation */;
    computationCache.set(obj, result);
    return result;
}

// Pattern: Données privées
const privateData = new WeakMap();

class SecureUser {
    constructor(name, password) {
        privateData.set(this, { password });
        this.name = name;
    }

    checkPassword(attempt) {
        return privateData.get(this).password === attempt;
    }
}

const user = new SecureUser('Alice', 'secret');
console.log(user.name);           // 'Alice'
console.log(user.password);       // undefined
console.log(user.checkPassword('secret')); // true

// WeakSet: collection de références faibles
const processedObjects = new WeakSet();

function processOnce(obj) {
    if (processedObjects.has(obj)) {
        return 'already processed';
    }

    processedObjects.add(obj);
    // ... process obj ...
    return 'processed';
}
```

### WeakRef & FinalizationRegistry (ES2021)
```javascript
// WeakRef permet une référence faible à un objet
// FinalizationRegistry notifie quand un objet est GC

// Pattern: Cache avec cleanup automatique
function createSmartCache() {
    const cache = new Map();  // string -> WeakRef
    const registry = new FinalizationRegistry((key) => {
        const ref = cache.get(key);
        if (ref && !ref.deref()) {
            cache.delete(key);
            console.log(`Cache entry "${key}" was garbage collected`);
        }
    });

    return {
        set(key, value) {
            const ref = new WeakRef(value);
            cache.set(key, ref);
            registry.register(value, key, value);
        },

        get(key) {
            const ref = cache.get(key);
            if (!ref) return undefined;

            const value = ref.deref();
            if (value === undefined) {
                cache.delete(key);
                return undefined;
            }
            return value;
        },

        has(key) {
            const ref = cache.get(key);
            return ref && ref.deref() !== undefined;
        }
    };
}

// ATTENTION: WeakRef.deref() peut retourner undefined à tout moment!
// Ne pas l'utiliser pour du code critique.
```

### createLeakDetector - Détection de fuites
```javascript
function createLeakDetector(options = {}) {
    const {
        sampleInterval = 1000,
        windowSize = 10,
        growthThreshold = 0.1  // 10% growth is suspicious
    } = options;

    const samples = [];
    let intervalId = null;

    function getHeapUsed() {
        if (typeof process !== 'undefined') {
            return process.memoryUsage().heapUsed;
        }
        if (performance.memory) {
            return performance.memory.usedJSHeapSize;
        }
        return null;
    }

    function analyzeGrowth() {
        if (samples.length < windowSize) return null;

        const recent = samples.slice(-windowSize);
        const first = recent[0];
        const last = recent[recent.length - 1];

        const growth = (last - first) / first;
        const avgGrowthPerSample = growth / windowSize;

        // Linear regression to detect trend
        const n = recent.length;
        const sumX = (n * (n - 1)) / 2;
        const sumY = recent.reduce((a, b) => a + b, 0);
        const sumXY = recent.reduce((sum, y, x) => sum + x * y, 0);
        const sumX2 = (n * (n - 1) * (2 * n - 1)) / 6;

        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);

        return {
            growth: (growth * 100).toFixed(2) + '%',
            avgGrowthPerSample: (avgGrowthPerSample * 100).toFixed(4) + '%',
            slope,
            isLeaking: growth > growthThreshold && slope > 0,
            trend: slope > 0 ? 'increasing' : slope < 0 ? 'decreasing' : 'stable'
        };
    }

    return {
        start() {
            if (intervalId) return;

            intervalId = setInterval(() => {
                const heap = getHeapUsed();
                if (heap !== null) {
                    samples.push(heap);

                    // Keep limited history
                    if (samples.length > windowSize * 10) {
                        samples.splice(0, samples.length - windowSize * 10);
                    }
                }
            }, sampleInterval);
        },

        stop() {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        },

        analyze() {
            return analyzeGrowth();
        },

        forceGC() {
            // Node.js avec --expose-gc flag
            if (typeof global !== 'undefined' && global.gc) {
                global.gc();
                return true;
            }
            return false;
        },

        // Compare memory before/after a function
        async measure(fn) {
            this.forceGC();
            await new Promise(r => setTimeout(r, 100));

            const before = getHeapUsed();
            const result = await fn();

            this.forceGC();
            await new Promise(r => setTimeout(r, 100));

            const after = getHeapUsed();

            return {
                result,
                memoryDelta: after - before,
                leaked: after > before * 1.01  // >1% growth
            };
        }
    };
}

// Usage
const detector = createLeakDetector({ windowSize: 20 });
detector.start();

// Après un certain temps...
setTimeout(() => {
    const analysis = detector.analyze();
    console.log('Memory analysis:', analysis);
    if (analysis?.isLeaking) {
        console.warn('Potential memory leak detected!');
    }
    detector.stop();
}, 30000);
```

### Optimisation des structures de données
```javascript
// Arrays typés pour données numériques
const regularArray = new Array(1000000).fill(0);  // ~8MB
const typedArray = new Float64Array(1000000);      // ~8MB exact

// Int8Array, Uint8Array pour petits entiers (1 byte)
const flags = new Uint8Array(1000000);  // ~1MB (vs ~8MB pour Array)

// Strings interning - réutiliser les strings identiques
const stringPool = new Map();

function internString(str) {
    if (stringPool.has(str)) {
        return stringPool.get(str);
    }
    stringPool.set(str, str);
    return str;
}

// Flatten nested objects
// ❌ MAUVAIS - objets imbriqués
const nested = {
    user: {
        profile: {
            settings: {
                theme: 'dark'
            }
        }
    }
};

// ✅ BON - structure plate
const flat = {
    'user.profile.settings.theme': 'dark'
};

// Utiliser null au lieu de {} pour objets vides
const sparse = {
    data: null  // 0 bytes
    // vs data: {}  // overhead de l'objet
};

// ArrayBuffer pour données binaires
const buffer = new ArrayBuffer(1024);  // 1KB exactement
const view = new DataView(buffer);
view.setInt32(0, 42);
view.setFloat64(4, 3.14159);
```

### Patterns de libération mémoire
```javascript
// Pattern: Disposable
class Resource {
    #disposed = false;
    #data;

    constructor() {
        this.#data = new Array(1000000).fill('x');
    }

    use() {
        if (this.#disposed) {
            throw new Error('Resource already disposed');
        }
        return this.#data.length;
    }

    dispose() {
        if (this.#disposed) return;

        this.#data = null;
        this.#disposed = true;
    }

    get isDisposed() {
        return this.#disposed;
    }
}

// Pattern: Using (like C# using statement)
async function using(resource, fn) {
    try {
        return await fn(resource);
    } finally {
        if (resource && typeof resource.dispose === 'function') {
            resource.dispose();
        }
    }
}

// Usage
await using(new Resource(), async (res) => {
    console.log(res.use());  // 1000000
});
// Resource is automatically disposed

// Pattern: Object pooling (voir ex22)
// Réutiliser les objets au lieu de les créer/détruire
```

## Tests
```bash
node --expose-gc ex23/test.js
```

## Concepts
- Garbage Collection (Mark-and-Sweep)
- Memory leaks patterns
- WeakMap / WeakSet
- WeakRef / FinalizationRegistry
- Typed Arrays
- Memory profiling
- Heap snapshots
- Reference counting vs Tracing GC
