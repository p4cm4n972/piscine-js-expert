# Ex09 - Event Loop & Microtasks

## Objectif
Comprendre en profondeur l'Event Loop de JavaScript, la différence entre macrotasks et microtasks, et savoir prédire l'ordre d'exécution du code asynchrone.

## Contexte
L'Event Loop est le cœur du modèle asynchrone de JavaScript. Il gère l'exécution du code, la collecte des événements et l'exécution des sous-tâches.

```
┌───────────────────────────┐
│         Call Stack        │
│  (exécution synchrone)    │
└───────────────────────────┘
            ↓
┌───────────────────────────┐
│      Microtask Queue      │
│  (Promise, queueMicrotask)│
└───────────────────────────┘
            ↓
┌───────────────────────────┐
│      Macrotask Queue      │
│  (setTimeout, I/O, etc.)  │
└───────────────────────────┘
```

**Ordre d'exécution :**
1. Exécuter tout le code synchrone (call stack)
2. Vider la microtask queue (TOUTES les microtasks)
3. Exécuter UNE macrotask
4. Retour à l'étape 2

## Instructions

### 1. Prédire l'ordre d'exécution
Analyser des snippets de code et prédire l'ordre des console.log.

### 2. `nextTick(callback)`
Implémenter une fonction qui schedule au prochain tick.

### 3. `defer(fn)`
Retarde l'exécution après le rendu (browser).

### 4. `createTaskScheduler()`
Scheduler avec priorités (high, normal, low).

### 5. `runSequentially(asyncFns)`
Exécute des fonctions async en séquence.

## Exemples

### Prédiction d'ordre - Quiz
```javascript
// Quiz 1 - Basique
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');

// Réponse: 1, 4, 3, 2
// Explication:
// - '1' et '4' sont synchrones
// - Promise.then est une microtask (prioritaire)
// - setTimeout est une macrotask


// Quiz 2 - Microtasks imbriquées
console.log('start');

setTimeout(() => {
    console.log('timeout 1');
    Promise.resolve().then(() => console.log('promise inside timeout'));
}, 0);

Promise.resolve()
    .then(() => {
        console.log('promise 1');
        return Promise.resolve();
    })
    .then(() => console.log('promise 2'));

setTimeout(() => console.log('timeout 2'), 0);

console.log('end');

// Réponse: start, end, promise 1, promise 2, timeout 1, promise inside timeout, timeout 2
// Explication:
// - Sync: 'start', 'end'
// - Microtasks: 'promise 1', puis 'promise 2'
// - Macrotask 1: 'timeout 1', puis sa microtask 'promise inside timeout'
// - Macrotask 2: 'timeout 2'


// Quiz 3 - Async/Await
async function asyncFunc() {
    console.log('async start');
    await Promise.resolve();
    console.log('async after await');
}

console.log('script start');

setTimeout(() => console.log('setTimeout'), 0);

asyncFunc();

new Promise(resolve => {
    console.log('promise executor');
    resolve();
}).then(() => console.log('promise then'));

console.log('script end');

// Réponse: script start, async start, promise executor, script end,
//          async after await, promise then, setTimeout
// Explication:
// - await divise la fonction async - avant await = sync, après = microtask


// Quiz 4 - queueMicrotask
console.log('1');

queueMicrotask(() => {
    console.log('2');
    queueMicrotask(() => console.log('3'));
});

Promise.resolve()
    .then(() => console.log('4'))
    .then(() => console.log('5'));

queueMicrotask(() => console.log('6'));

console.log('7');

// Réponse: 1, 7, 2, 4, 6, 3, 5
// Toutes les microtasks ajoutées pendant l'exécution sont traitées avant la prochaine macrotask
```

### nextTick - Scheduling au prochain tick
```javascript
// Node.js a process.nextTick, créons l'équivalent browser
function nextTick(callback) {
    // Utilise queueMicrotask pour être dans la microtask queue
    queueMicrotask(callback);
}

// Alternative avec Promise (légèrement plus lent)
function nextTickPromise(callback) {
    Promise.resolve().then(callback);
}

// Usage
console.log('before');
nextTick(() => console.log('next tick'));
console.log('after');
// Output: before, after, next tick

// Cas d'usage: batching de updates
let pendingUpdate = false;
const updates = [];

function scheduleUpdate(data) {
    updates.push(data);

    if (!pendingUpdate) {
        pendingUpdate = true;
        nextTick(() => {
            // Traiter tous les updates en une fois
            const batch = [...updates];
            updates.length = 0;
            pendingUpdate = false;
            processBatchedUpdates(batch);
        });
    }
}

// Plusieurs appels dans la même frame
scheduleUpdate({ id: 1 });
scheduleUpdate({ id: 2 });
scheduleUpdate({ id: 3 });
// → Un seul processBatchedUpdates avec [{ id: 1 }, { id: 2 }, { id: 3 }]
```

### defer - Après le rendu
```javascript
// Macrotask pour exécuter après le rendu
function defer(fn) {
    setTimeout(fn, 0);
}

// Version plus précise avec MessageChannel (browser)
function deferWithMessageChannel(fn) {
    const channel = new MessageChannel();
    channel.port1.onmessage = fn;
    channel.port2.postMessage(undefined);
}

// Version avec requestAnimationFrame + setTimeout (après paint)
function afterPaint(fn) {
    requestAnimationFrame(() => {
        setTimeout(fn, 0);
    });
}

// Usage - Mesurer le temps de rendu
function measureRenderTime(renderFn) {
    const start = performance.now();
    renderFn();

    afterPaint(() => {
        const end = performance.now();
        console.log(`Render took ${end - start}ms`);
    });
}
```

### createTaskScheduler - Priorités
```javascript
function createTaskScheduler() {
    const queues = {
        high: [],
        normal: [],
        low: []
    };
    let isRunning = false;

    function runTasks() {
        if (isRunning) return;
        isRunning = true;

        queueMicrotask(function processNext() {
            // Traiter par priorité
            let task;
            if (queues.high.length > 0) {
                task = queues.high.shift();
            } else if (queues.normal.length > 0) {
                task = queues.normal.shift();
            } else if (queues.low.length > 0) {
                task = queues.low.shift();
            }

            if (task) {
                try {
                    task();
                } catch (e) {
                    console.error('Task error:', e);
                }
                // Continuer avec la prochaine tâche
                queueMicrotask(processNext);
            } else {
                isRunning = false;
            }
        });
    }

    return {
        schedule(task, priority = 'normal') {
            if (!queues[priority]) {
                throw new Error(`Invalid priority: ${priority}`);
            }
            queues[priority].push(task);
            runTasks();
        },

        scheduleHigh(task) {
            this.schedule(task, 'high');
        },

        scheduleLow(task) {
            this.schedule(task, 'low');
        },

        get pendingCount() {
            return queues.high.length + queues.normal.length + queues.low.length;
        }
    };
}

// Usage
const scheduler = createTaskScheduler();

scheduler.scheduleLow(() => console.log('low priority'));
scheduler.schedule(() => console.log('normal priority'));
scheduler.scheduleHigh(() => console.log('high priority'));

// Output: high priority, normal priority, low priority
```

### runSequentially - Exécution séquentielle
```javascript
async function runSequentially(asyncFns) {
    const results = [];

    for (const fn of asyncFns) {
        results.push(await fn());
    }

    return results;
}

// Version avec reduce
function runSequentiallyReduce(asyncFns) {
    return asyncFns.reduce(
        (promise, fn) => promise.then(results =>
            fn().then(result => [...results, result])
        ),
        Promise.resolve([])
    );
}

// Version avec generator
async function* runSequentiallyGenerator(asyncFns) {
    for (const fn of asyncFns) {
        yield await fn();
    }
}

// Usage
const tasks = [
    () => fetch('/api/1').then(r => r.json()),
    () => fetch('/api/2').then(r => r.json()),
    () => fetch('/api/3').then(r => r.json()),
];

// Séquentiel (pas en parallèle)
const results = await runSequentially(tasks);

// Avec generator pour traiter au fur et à mesure
for await (const result of runSequentiallyGenerator(tasks)) {
    console.log('Got result:', result);
}
```

## Visualisation de l'Event Loop

```javascript
function visualizeEventLoop() {
    console.log('=== SYNC START ===');
    console.log('1. Synchronous code');

    // Macrotask (ajouté à la queue)
    setTimeout(() => {
        console.log('5. Macrotask 1 (setTimeout)');

        // Microtask dans macrotask
        Promise.resolve().then(() => {
            console.log('6. Microtask in macrotask');
        });
    }, 0);

    // Autre macrotask
    setTimeout(() => {
        console.log('7. Macrotask 2');
    }, 0);

    // Microtasks (prioritaires)
    Promise.resolve().then(() => {
        console.log('3. Microtask 1 (Promise)');
    });

    queueMicrotask(() => {
        console.log('4. Microtask 2 (queueMicrotask)');
    });

    console.log('2. Synchronous code end');
    console.log('=== SYNC END ===');
}

visualizeEventLoop();
/*
Output:
=== SYNC START ===
1. Synchronous code
2. Synchronous code end
=== SYNC END ===
3. Microtask 1 (Promise)
4. Microtask 2 (queueMicrotask)
5. Macrotask 1 (setTimeout)
6. Microtask in macrotask
7. Macrotask 2
*/
```

## Pièges courants

### Starvation de macrotasks
```javascript
// ❌ DANGER - Microtasks infinies bloquent les macrotasks
function badMicrotaskLoop() {
    queueMicrotask(() => {
        console.log('microtask');
        badMicrotaskLoop(); // Récursion infinie de microtasks!
    });
}
// setTimeout ne sera JAMAIS exécuté!

// ✅ Solution - Utiliser setTimeout pour "respirer"
function goodLoop(count = 0) {
    if (count >= 1000) return;

    console.log(count);

    if (count % 100 === 0) {
        // Céder au main thread périodiquement
        setTimeout(() => goodLoop(count + 1), 0);
    } else {
        queueMicrotask(() => goodLoop(count + 1));
    }
}
```

### Timing de requestAnimationFrame
```javascript
// rAF est appelé avant le paint, pas après!
console.log('start');

requestAnimationFrame(() => {
    console.log('rAF'); // Avant le paint du browser
});

setTimeout(() => {
    console.log('timeout'); // Après le paint (généralement)
}, 0);

Promise.resolve().then(() => {
    console.log('promise'); // Microtask
});

// Order typique: start, promise, rAF, timeout
// (mais peut varier selon le browser et la charge)
```

## Tests
```bash
node ex09/test.js
```

## Concepts
- Call stack
- Heap (mémoire)
- Macrotask queue (task queue)
- Microtask queue (job queue)
- Event loop
- requestAnimationFrame timing
- process.nextTick (Node.js)
- queueMicrotask
- Web APIs (setTimeout, fetch, etc.)

## Bonus
- Implémenter un mini event loop simulé
- Créer un visualiseur d'event loop
- Implémenter `setImmediate` polyfill pour browser
- Comparer les performances microtask vs macrotask
