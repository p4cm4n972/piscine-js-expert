# Ex22 - Performance & Optimization

## Objectif
Optimiser le code JavaScript pour les performances en comprenant les mécanismes internes du moteur JS, les patterns d'optimisation et les techniques de mesure.

## Contexte
JavaScript est un langage interprété avec compilation JIT (Just-In-Time). Les moteurs modernes (V8, SpiderMonkey) optimisent automatiquement le code "hot" (exécuté fréquemment), mais certains patterns peuvent bloquer ces optimisations.

### Le cycle d'optimisation V8

```
Source Code → Parser → AST → Interpreter (Ignition) → Bytecode
                                    ↓
                            Profiling (feedback)
                                    ↓
                   Optimizing Compiler (TurboFan) → Optimized Machine Code
                                    ↓
                            Deoptimization (si types changent)
```

## Instructions

Implémentez les fonctions suivantes :

### 1. `measurePerformance(fn, iterations)`
Mesure précise du temps d'exécution.

### 2. `memoize(fn, options)`
Memoization avec stratégies de cache (LRU, TTL).

### 3. `debounce(fn, wait)` et `throttle(fn, wait)`
Limiter la fréquence d'exécution.

### 4. `batchProcess(items, batchSize, processor)`
Traitement par lots pour éviter de bloquer le thread.

### 5. `createObjectPool(factory, initialSize)`
Pool d'objets pour éviter les allocations.

### 6. Optimiser des fonctions données
Appliquer les techniques d'optimisation.

## Exemples

### measurePerformance - Mesure précise
```javascript
function measurePerformance(fn, iterations = 1000) {
    // Warmup - permet au JIT de compiler
    for (let i = 0; i < 100; i++) {
        fn();
    }

    // Mesure avec performance.now() (haute précision)
    const times = [];

    for (let i = 0; i < iterations; i++) {
        const start = performance.now();
        fn();
        const end = performance.now();
        times.push(end - start);
    }

    // Statistiques
    const sorted = times.sort((a, b) => a - b);
    const sum = times.reduce((a, b) => a + b, 0);

    return {
        iterations,
        total: sum.toFixed(3) + 'ms',
        mean: (sum / iterations).toFixed(4) + 'ms',
        median: sorted[Math.floor(iterations / 2)].toFixed(4) + 'ms',
        min: sorted[0].toFixed(4) + 'ms',
        max: sorted[iterations - 1].toFixed(4) + 'ms',
        p95: sorted[Math.floor(iterations * 0.95)].toFixed(4) + 'ms'
    };
}

// Usage
const results = measurePerformance(() => {
    const arr = Array.from({ length: 1000 }, (_, i) => i);
    return arr.reduce((a, b) => a + b, 0);
}, 1000);

console.log(results);
// { iterations: 1000, mean: '0.0234ms', median: '0.0200ms', ... }
```

### memoize - Cache intelligent
```javascript
// Version simple
function memoize(fn) {
    const cache = new Map();

    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);

        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// Version LRU (Least Recently Used)
function memoizeLRU(fn, maxSize = 100) {
    const cache = new Map();

    return function(...args) {
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            // Déplacer en fin (plus récent)
            const value = cache.get(key);
            cache.delete(key);
            cache.set(key, value);
            return value;
        }

        const result = fn.apply(this, args);

        // Supprimer le plus ancien si plein
        if (cache.size >= maxSize) {
            const oldestKey = cache.keys().next().value;
            cache.delete(oldestKey);
        }

        cache.set(key, result);
        return result;
    };
}

// Version avec TTL (Time To Live)
function memoizeTTL(fn, ttlMs = 60000) {
    const cache = new Map();

    return function(...args) {
        const key = JSON.stringify(args);
        const cached = cache.get(key);

        if (cached && Date.now() < cached.expiry) {
            return cached.value;
        }

        const result = fn.apply(this, args);
        cache.set(key, {
            value: result,
            expiry: Date.now() + ttlMs
        });
        return result;
    };
}

// Usage
const fibonacci = memoize(function fib(n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
});

console.log(fibonacci(40)); // Instant (avec memoization)
// Sans memoization: plusieurs secondes !

// API call avec cache TTL
const fetchUser = memoizeTTL(async (id) => {
    const response = await fetch(`/api/users/${id}`);
    return response.json();
}, 30000); // Cache 30 secondes
```

### debounce et throttle - Contrôle de fréquence
```javascript
// Debounce: n'exécute qu'après un délai sans appel
function debounce(fn, wait) {
    let timeoutId = null;

    return function debounced(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, wait);
    };
}

// Throttle: exécute au plus une fois par période
function throttle(fn, wait) {
    let lastCall = 0;
    let timeoutId = null;

    return function throttled(...args) {
        const now = Date.now();
        const remaining = wait - (now - lastCall);

        if (remaining <= 0) {
            clearTimeout(timeoutId);
            lastCall = now;
            fn.apply(this, args);
        } else if (!timeoutId) {
            timeoutId = setTimeout(() => {
                lastCall = Date.now();
                timeoutId = null;
                fn.apply(this, args);
            }, remaining);
        }
    };
}

// Version avec options
function debounceAdvanced(fn, wait, options = {}) {
    const { leading = false, trailing = true, maxWait } = options;
    let timeoutId, lastArgs, lastThis, lastCallTime, result;
    let lastInvokeTime = 0;

    function invokeFunc(time) {
        const args = lastArgs;
        const thisArg = lastThis;
        lastArgs = lastThis = undefined;
        lastInvokeTime = time;
        result = fn.apply(thisArg, args);
        return result;
    }

    function shouldInvoke(time) {
        const timeSinceLastCall = time - lastCallTime;
        const timeSinceLastInvoke = time - lastInvokeTime;

        return (lastCallTime === undefined) ||
               (timeSinceLastCall >= wait) ||
               (maxWait !== undefined && timeSinceLastInvoke >= maxWait);
    }

    function timerExpired() {
        const time = Date.now();
        if (shouldInvoke(time)) {
            return trailingEdge(time);
        }
        timeoutId = setTimeout(timerExpired, remainingWait(time));
    }

    function trailingEdge(time) {
        timeoutId = undefined;
        if (trailing && lastArgs) {
            return invokeFunc(time);
        }
        lastArgs = lastThis = undefined;
        return result;
    }

    function debounced(...args) {
        const time = Date.now();
        const isInvoking = shouldInvoke(time);

        lastArgs = args;
        lastThis = this;
        lastCallTime = time;

        if (isInvoking) {
            if (timeoutId === undefined && leading) {
                return invokeFunc(time);
            }
        }
        if (timeoutId === undefined) {
            timeoutId = setTimeout(timerExpired, wait);
        }
        return result;
    }

    debounced.cancel = function() {
        clearTimeout(timeoutId);
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timeoutId = undefined;
    };

    return debounced;
}

// Usage
// Recherche: n'envoie qu'après 300ms sans frappe
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', debounce((e) => {
    fetchSearchResults(e.target.value);
}, 300));

// Scroll: update au plus toutes les 100ms
window.addEventListener('scroll', throttle(() => {
    updateScrollPosition();
}, 100));
```

### batchProcess - Traitement non-bloquant
```javascript
async function batchProcess(items, batchSize, processor) {
    const results = [];

    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        const batchResults = await Promise.all(
            batch.map(item => processor(item))
        );
        results.push(...batchResults);

        // Yield to main thread
        await new Promise(resolve => setTimeout(resolve, 0));
    }

    return results;
}

// Version avec progress callback
async function batchProcessWithProgress(items, batchSize, processor, onProgress) {
    const results = [];
    const total = items.length;

    for (let i = 0; i < total; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        const batchResults = await Promise.all(
            batch.map(item => processor(item))
        );
        results.push(...batchResults);

        // Report progress
        const processed = Math.min(i + batchSize, total);
        onProgress?.({
            processed,
            total,
            percentage: Math.round((processed / total) * 100)
        });

        // Yield to main thread
        await new Promise(resolve => setTimeout(resolve, 0));
    }

    return results;
}

// Usage
const largeDataset = Array.from({ length: 10000 }, (_, i) => i);

await batchProcessWithProgress(
    largeDataset,
    100,
    async (item) => item * 2, // Process each item
    ({ percentage }) => console.log(`Progress: ${percentage}%`)
);

// Version avec requestIdleCallback (browser)
function processInIdleTime(items, processor, callback) {
    let index = 0;
    const results = [];

    function processChunk(deadline) {
        while (index < items.length && deadline.timeRemaining() > 0) {
            results.push(processor(items[index]));
            index++;
        }

        if (index < items.length) {
            requestIdleCallback(processChunk);
        } else {
            callback(results);
        }
    }

    requestIdleCallback(processChunk);
}
```

### createObjectPool - Réutilisation d'objets
```javascript
function createObjectPool(factory, initialSize = 10, maxSize = 100) {
    const pool = [];
    const activeObjects = new Set();

    // Pre-populate pool
    for (let i = 0; i < initialSize; i++) {
        pool.push(factory());
    }

    return {
        acquire() {
            let obj;
            if (pool.length > 0) {
                obj = pool.pop();
            } else if (activeObjects.size < maxSize) {
                obj = factory();
            } else {
                throw new Error('Pool exhausted');
            }
            activeObjects.add(obj);
            return obj;
        },

        release(obj) {
            if (!activeObjects.has(obj)) {
                throw new Error('Object not from this pool');
            }
            activeObjects.delete(obj);

            // Reset object if possible
            if (typeof obj.reset === 'function') {
                obj.reset();
            }

            pool.push(obj);
        },

        get stats() {
            return {
                available: pool.length,
                active: activeObjects.size,
                total: pool.length + activeObjects.size
            };
        }
    };
}

// Usage - Pool de vecteurs (évite les allocations fréquentes)
class Vector {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    reset() {
        this.x = 0;
        this.y = 0;
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
}

const vectorPool = createObjectPool(() => new Vector(), 100);

// Dans une boucle de jeu
function updateParticles(particles) {
    for (const particle of particles) {
        const velocity = vectorPool.acquire();
        const acceleration = vectorPool.acquire();

        velocity.set(particle.vx, particle.vy);
        acceleration.set(0, 9.81);

        velocity.add(acceleration);

        particle.vx = velocity.x;
        particle.vy = velocity.y;

        vectorPool.release(velocity);
        vectorPool.release(acceleration);
    }
}
```

## Techniques d'optimisation

### 1. Éviter les déoptimisations
```javascript
// ❌ MAUVAIS - Types polymorphes
function add(a, b) {
    return a + b;
}
add(1, 2);      // number + number
add('a', 'b');  // string + string (déoptimise!)

// ✅ BON - Types monomorphes
function addNumbers(a, b) {
    return a + b;
}
function concatStrings(a, b) {
    return a + b;
}

// ❌ MAUVAIS - Hidden class change
const obj = {};
obj.a = 1;
obj.b = 2;  // Changement de hidden class

// ✅ BON - Propriétés définies au même endroit
const obj2 = { a: 1, b: 2 };

// ❌ MAUVAIS - delete
delete obj.a;  // Change hidden class!

// ✅ BON - set to undefined ou null
obj.a = undefined;
```

### 2. Optimisation des boucles
```javascript
// ❌ MAUVAIS - Calcul de length à chaque itération
for (let i = 0; i < arr.length; i++) { }

// ✅ BON - Cache length
for (let i = 0, len = arr.length; i < len; i++) { }

// ✅ MIEUX - for...of pour les arrays simples
for (const item of arr) { }

// ❌ MAUVAIS - forEach avec closure
arr.forEach(item => process(item));

// ✅ BON - for loop pour performance critique
for (let i = 0; i < arr.length; i++) {
    process(arr[i]);
}

// ❌ MAUVAIS - Allocation dans boucle
for (let i = 0; i < 1000; i++) {
    const result = { value: i }; // Nouvelle allocation à chaque fois
}

// ✅ BON - Réutilisation
const result = { value: 0 };
for (let i = 0; i < 1000; i++) {
    result.value = i;
    // utiliser result
}
```

### 3. Strings et Arrays
```javascript
// ❌ MAUVAIS - Concaténation de strings en boucle
let str = '';
for (let i = 0; i < 10000; i++) {
    str += 'item' + i;  // Crée une nouvelle string à chaque fois
}

// ✅ BON - Array.join
const parts = [];
for (let i = 0; i < 10000; i++) {
    parts.push('item' + i);
}
const str2 = parts.join('');

// ✅ MIEUX - Template literal si possible
const items = Array.from({ length: 10000 }, (_, i) => `item${i}`);
const str3 = items.join('');

// ❌ MAUVAIS - Spread avec grands arrays
const big = [...arr1, ...arr2, ...arr3];

// ✅ BON - concat
const big2 = arr1.concat(arr2, arr3);

// ✅ MIEUX - push.apply pour mutation
arr1.push.apply(arr1, arr2);
```

### 4. DOM et Browser
```javascript
// ❌ MAUVAIS - Modifications DOM répétées
for (const item of items) {
    document.body.appendChild(createEl(item));
    // Trigger reflow à chaque append!
}

// ✅ BON - DocumentFragment
const fragment = document.createDocumentFragment();
for (const item of items) {
    fragment.appendChild(createEl(item));
}
document.body.appendChild(fragment);

// ❌ MAUVAIS - Lire et écrire alternativement
element.style.width = '100px';
const width = element.offsetWidth;  // Force reflow
element.style.height = '200px';
const height = element.offsetHeight;  // Force reflow again!

// ✅ BON - Batch reads et writes
const width2 = element.offsetWidth;
const height2 = element.offsetHeight;
element.style.width = '100px';
element.style.height = '200px';
```

### 5. WeakMap pour éviter les memory leaks
```javascript
// ❌ MAUVAIS - Map avec objets comme clés (memory leak)
const cache = new Map();

function processElement(el) {
    if (!cache.has(el)) {
        cache.set(el, expensiveComputation(el));
    }
    return cache.get(el);
}
// Si l'élément est supprimé du DOM, il reste dans cache!

// ✅ BON - WeakMap (garbage collected automatiquement)
const cache2 = new WeakMap();

function processElement2(el) {
    if (!cache2.has(el)) {
        cache2.set(el, expensiveComputation(el));
    }
    return cache2.get(el);
}
// Quand l'élément est garbage collected, l'entrée est supprimée
```

## Profiling

```javascript
// Console profiling
console.time('operation');
// ... code ...
console.timeEnd('operation');

// Performance API
performance.mark('start');
// ... code ...
performance.mark('end');
performance.measure('operation', 'start', 'end');
const measures = performance.getEntriesByName('operation');
console.log(measures[0].duration);

// Memory usage (Node.js)
const used = process.memoryUsage();
console.log(`Heap used: ${Math.round(used.heapUsed / 1024 / 1024)} MB`);
```

## Tests
```bash
node ex13/test.js
```

## Concepts
- JIT compilation
- Hidden classes / Shapes
- Inline caching
- Monomorphic vs polymorphic code
- Memory allocation et GC
- Event loop et microtasks
- Reflow et repaint (browser)
- Time complexity (Big O)

## Bonus
- Implémenter un `Worker` pool pour le multi-threading
- Créer un profiler custom qui mesure CPU et mémoire
- Optimiser un algorithme de tri pour différentes tailles de données
- Implémenter un système de "lazy loading" pour les gros datasets
