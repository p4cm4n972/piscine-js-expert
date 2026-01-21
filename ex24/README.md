# Ex24 - Web Workers & Concurrency

## Objectif
Maîtriser le multi-threading en JavaScript avec les Web Workers, SharedArrayBuffer, et les patterns de concurrence pour des applications performantes.

## Contexte
JavaScript est single-threaded, mais les Web Workers permettent d'exécuter du code dans des threads séparés. Cela débloque le thread principal pour des calculs intensifs, améliore la réactivité de l'UI, et permet du vrai parallélisme.

```javascript
// Le thread principal peut être bloqué par des calculs lourds
function heavyComputation() {
    let sum = 0;
    for (let i = 0; i < 1000000000; i++) {
        sum += Math.sqrt(i);
    }
    return sum;  // L'UI est gelée pendant ce temps!
}

// Avec un Worker, le calcul s'exécute en parallèle
const worker = new Worker('heavy-worker.js');
worker.postMessage({ iterations: 1000000000 });
worker.onmessage = (e) => console.log('Result:', e.data);
// L'UI reste responsive!
```

## Instructions

### 1. Créer un Worker basique
Communication de messages.

### 2. `createWorkerPool(workerScript, poolSize)`
Pool de workers réutilisables.

### 3. `parallelize(fn, chunks)`
Paralléliser un calcul sur plusieurs workers.

### 4. SharedArrayBuffer patterns
Mémoire partagée entre threads.

### 5. `createTask(fn)` avec Transferable
Optimiser les transferts de données.

## Exemples

### Web Worker Basique
```javascript
// main.js
const worker = new Worker('worker.js');

// Envoyer un message au worker
worker.postMessage({ type: 'compute', data: [1, 2, 3, 4, 5] });

// Recevoir les résultats
worker.onmessage = (event) => {
    console.log('Result from worker:', event.data);
};

// Gérer les erreurs
worker.onerror = (error) => {
    console.error('Worker error:', error.message);
};

// worker.js
self.onmessage = (event) => {
    const { type, data } = event.data;

    if (type === 'compute') {
        const result = data.map(x => x * x);
        self.postMessage(result);
    }
};
```

### Inline Worker (sans fichier séparé)
```javascript
function createInlineWorker(workerFn) {
    const code = `self.onmessage = function(e) {
        self.postMessage((${workerFn.toString()})(e.data));
    }`;
    const blob = new Blob([code], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const worker = new Worker(url);

    return {
        worker,
        run(data) {
            return new Promise((resolve, reject) => {
                worker.onmessage = (e) => resolve(e.data);
                worker.onerror = (e) => reject(e);
                worker.postMessage(data);
            });
        },
        terminate() {
            worker.terminate();
            URL.revokeObjectURL(url);
        }
    };
}

// Usage
const compute = createInlineWorker((data) => {
    return data.map(x => Math.sqrt(x));
});

const result = await compute.run([1, 4, 9, 16, 25]);
console.log(result);  // [1, 2, 3, 4, 5]
compute.terminate();
```

### createWorkerPool - Pool de Workers
```javascript
function createWorkerPool(workerScript, poolSize = navigator.hardwareConcurrency || 4) {
    const workers = [];
    const taskQueue = [];
    const workerStatus = new Map();

    // Créer les workers
    for (let i = 0; i < poolSize; i++) {
        const worker = new Worker(workerScript);
        workers.push(worker);
        workerStatus.set(worker, 'idle');

        worker.onmessage = (event) => {
            const { taskId, result, error } = event.data;
            const task = taskQueue.find(t => t.id === taskId);

            if (task) {
                if (error) {
                    task.reject(new Error(error));
                } else {
                    task.resolve(result);
                }
                const index = taskQueue.indexOf(task);
                taskQueue.splice(index, 1);
            }

            workerStatus.set(worker, 'idle');
            processQueue();
        };
    }

    function getIdleWorker() {
        return workers.find(w => workerStatus.get(w) === 'idle');
    }

    function processQueue() {
        const pendingTasks = taskQueue.filter(t => t.status === 'pending');

        for (const task of pendingTasks) {
            const worker = getIdleWorker();
            if (!worker) break;

            task.status = 'running';
            workerStatus.set(worker, 'busy');
            worker.postMessage({ taskId: task.id, data: task.data });
        }
    }

    let taskIdCounter = 0;

    return {
        run(data) {
            return new Promise((resolve, reject) => {
                const task = {
                    id: ++taskIdCounter,
                    data,
                    status: 'pending',
                    resolve,
                    reject
                };
                taskQueue.push(task);
                processQueue();
            });
        },

        runAll(dataArray) {
            return Promise.all(dataArray.map(data => this.run(data)));
        },

        getStats() {
            const busy = [...workerStatus.values()].filter(s => s === 'busy').length;
            return {
                poolSize,
                busyWorkers: busy,
                idleWorkers: poolSize - busy,
                pendingTasks: taskQueue.filter(t => t.status === 'pending').length
            };
        },

        terminate() {
            workers.forEach(w => w.terminate());
        }
    };
}

// pool-worker.js
self.onmessage = (event) => {
    const { taskId, data } = event.data;

    try {
        const result = data.map(x => {
            let sum = 0;
            for (let i = 0; i < 10000; i++) {
                sum += Math.sqrt(x * i);
            }
            return sum;
        });
        self.postMessage({ taskId, result });
    } catch (error) {
        self.postMessage({ taskId, error: error.message });
    }
};

// Usage
const pool = createWorkerPool('pool-worker.js', 4);
const results = await pool.runAll([[1, 2, 3], [4, 5, 6]]);
pool.terminate();
```

### Transferable Objects - Zero-copy transfer
```javascript
// Les Transferable objects sont transférés sans copie
// ArrayBuffer, MessagePort, ImageBitmap, OffscreenCanvas

function transferExample() {
    const worker = new Worker('transfer-worker.js');
    const buffer = new ArrayBuffer(1024 * 1024 * 100);  // 100MB
    const view = new Uint8Array(buffer);

    for (let i = 0; i < view.length; i++) {
        view[i] = i % 256;
    }

    console.log('Before transfer:', buffer.byteLength);  // 104857600

    // Transférer (pas copier!) le buffer au worker
    worker.postMessage({ buffer }, [buffer]);

    console.log('After transfer:', buffer.byteLength);   // 0 (neutered!)
}

// transfer-worker.js
self.onmessage = (e) => {
    const { buffer } = e.data;
    const view = new Uint8Array(buffer);

    for (let i = 0; i < view.length; i++) {
        view[i] = view[i] * 2;
    }

    self.postMessage({ buffer }, [buffer]);
};
```

### SharedArrayBuffer - Mémoire partagée
```javascript
// SharedArrayBuffer permet le vrai partage de mémoire
// ATTENTION: Nécessite des headers COOP/COEP sur le serveur

function sharedMemoryExample() {
    const sharedBuffer = new SharedArrayBuffer(1024);
    const sharedArray = new Int32Array(sharedBuffer);

    const worker1 = new Worker('shared-worker.js');
    const worker2 = new Worker('shared-worker.js');

    worker1.postMessage({ sharedBuffer, workerId: 1 });
    worker2.postMessage({ sharedBuffer, workerId: 2 });
}

// Atomics pour synchronisation thread-safe
function atomicsExample() {
    const sharedBuffer = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * 2);
    const sharedArray = new Int32Array(sharedBuffer);

    // Incrément atomique (thread-safe)
    Atomics.add(sharedArray, 0, 1);

    // Compare-and-swap
    Atomics.compareExchange(sharedArray, 0, 5, 10);

    // Wait/Notify (mutex-like)
    // Atomics.wait(sharedArray, 1, 0);
    // Atomics.notify(sharedArray, 1, 1);
}

// shared-worker.js
self.onmessage = (e) => {
    const { sharedBuffer, workerId } = e.data;
    const sharedArray = new Int32Array(sharedBuffer);

    for (let i = 0; i < 1000; i++) {
        Atomics.add(sharedArray, 0, 1);
    }

    console.log(`Worker ${workerId}: Counter =`, Atomics.load(sharedArray, 0));
};
```

### Mutex avec Atomics
```javascript
class Mutex {
    constructor(sharedArray, index) {
        this.sharedArray = sharedArray;
        this.index = index;
    }

    lock() {
        while (true) {
            const old = Atomics.compareExchange(
                this.sharedArray, this.index, 0, 1
            );
            if (old === 0) return;
            Atomics.wait(this.sharedArray, this.index, 1);
        }
    }

    unlock() {
        Atomics.store(this.sharedArray, this.index, 0);
        Atomics.notify(this.sharedArray, this.index, 1);
    }

    withLock(fn) {
        this.lock();
        try {
            return fn();
        } finally {
            this.unlock();
        }
    }
}

// Usage
const sharedBuffer = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * 10);
const sharedArray = new Int32Array(sharedBuffer);
const mutex = new Mutex(sharedArray, 9);

mutex.withLock(() => {
    sharedArray[0] = sharedArray[0] + 1;
});
```

### OffscreenCanvas - Rendering dans Worker
```javascript
// main.js
const canvas = document.getElementById('canvas');
const offscreen = canvas.transferControlToOffscreen();

const worker = new Worker('canvas-worker.js');
worker.postMessage({ canvas: offscreen }, [offscreen]);

// canvas-worker.js
let canvas, ctx;

self.onmessage = (e) => {
    if (e.data.canvas) {
        canvas = e.data.canvas;
        ctx = canvas.getContext('2d');
        animate();
    }
};

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const time = Date.now() / 1000;
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(
        canvas.width / 2 + Math.cos(time) * 100,
        canvas.height / 2 + Math.sin(time) * 100,
        20, 0, Math.PI * 2
    );
    ctx.fill();

    requestAnimationFrame(animate);
}
```

### Pattern: Task Queue avec priorité
```javascript
function createPriorityTaskQueue(workerScript, poolSize = 4) {
    const workers = [];
    const queues = { high: [], normal: [], low: [] };

    for (let i = 0; i < poolSize; i++) {
        const worker = new Worker(workerScript);
        workers.push({ worker, busy: false });

        worker.onmessage = (e) => {
            workers[i].busy = false;
            processNextTask();
        };
    }

    function getIdleWorker() {
        return workers.find(w => !w.busy);
    }

    function processNextTask() {
        const idle = getIdleWorker();
        if (!idle) return;

        const task = queues.high.shift()
                  || queues.normal.shift()
                  || queues.low.shift();

        if (task) {
            idle.busy = true;
            idle.worker.postMessage(task);
        }
    }

    return {
        enqueue(data, priority = 'normal') {
            return new Promise((resolve, reject) => {
                queues[priority].push({ data, resolve, reject });
                processNextTask();
            });
        },

        getQueueLengths() {
            return {
                high: queues.high.length,
                normal: queues.normal.length,
                low: queues.low.length
            };
        }
    };
}
```

### Node.js Worker Threads
```javascript
// Node.js a son propre système de workers
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
    // Main thread
    const worker = new Worker(__filename, {
        workerData: { numbers: [1, 2, 3, 4, 5] }
    });

    worker.on('message', (result) => {
        console.log('Result:', result);
    });
} else {
    // Worker thread
    const { numbers } = workerData;
    const result = numbers.map(x => x * x);
    parentPort.postMessage(result);
}
```

## Tests
```bash
node ex24/test.js
```

## Headers requis pour SharedArrayBuffer
```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

## Concepts
- Web Workers
- Worker Threads (Node.js)
- Message passing
- Transferable objects
- SharedArrayBuffer
- Atomics
- Mutex & Semaphore patterns
- OffscreenCanvas
