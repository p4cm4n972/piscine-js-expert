# Ex08 - Rate Limiter & Retry Patterns

## Objectif
Implémenter des patterns de contrôle de flux asynchrone : rate limiting, retry avec backoff exponentiel, et circuit breaker.

## Contexte
Lors d'interactions avec des APIs ou services externes, il est crucial de :
- **Rate limiting** : Ne pas dépasser les quotas d'appels
- **Retry** : Réessayer les opérations échouées intelligemment
- **Circuit breaker** : Éviter d'appeler un service défaillant

```javascript
// Sans rate limiting - DANGER
for (const url of urls) {
    fetch(url); // 1000 requêtes simultanées = ban!
}

// Avec rate limiting
const limiter = createRateLimiter(10, 1000); // 10 req/sec
for (const url of urls) {
    await limiter(() => fetch(url));
}
```

## Instructions

### 1. `createRateLimiter(maxRequests, timeWindow)`
Limite le nombre d'appels par fenêtre de temps.

### 2. `retry(fn, options)`
Réessaie une fonction avec backoff exponentiel.

### 3. `createCircuitBreaker(fn, options)`
Implémente le pattern circuit breaker.

### 4. `createThrottledQueue(concurrency)`
File d'attente avec concurrence limitée.

### 5. `createBatcher(fn, options)`
Regroupe les appels en batches.

## Exemples

### createRateLimiter - Limitation de débit
```javascript
function createRateLimiter(maxRequests, timeWindowMs) {
    const queue = [];
    let activeCount = 0;
    const timestamps = [];

    function processQueue() {
        const now = Date.now();

        // Nettoyer les timestamps expirés
        while (timestamps.length > 0 && timestamps[0] <= now - timeWindowMs) {
            timestamps.shift();
        }

        // Exécuter tant que possible
        while (queue.length > 0 && timestamps.length < maxRequests) {
            const { fn, resolve, reject } = queue.shift();
            timestamps.push(now);

            fn()
                .then(resolve)
                .catch(reject)
                .finally(() => {
                    setTimeout(processQueue, 0);
                });
        }

        // Programmer le prochain traitement
        if (queue.length > 0 && timestamps.length >= maxRequests) {
            const oldestTimestamp = timestamps[0];
            const waitTime = oldestTimestamp + timeWindowMs - now;
            setTimeout(processQueue, waitTime);
        }
    }

    return function limit(fn) {
        return new Promise((resolve, reject) => {
            queue.push({ fn, resolve, reject });
            processQueue();
        });
    };
}

// Usage
const rateLimiter = createRateLimiter(5, 1000); // 5 requêtes par seconde

const urls = Array.from({ length: 20 }, (_, i) => `https://api.example.com/item/${i}`);

const results = await Promise.all(
    urls.map(url => rateLimiter(() => fetch(url).then(r => r.json())))
);

// Les requêtes sont espacées automatiquement : 5/sec max
```

### retry - Retry avec backoff exponentiel
```javascript
async function retry(fn, options = {}) {
    const {
        maxAttempts = 3,
        initialDelay = 1000,
        maxDelay = 30000,
        backoffFactor = 2,
        retryOn = (error) => true, // Retry sur toutes les erreurs par défaut
        onRetry = () => {}
    } = options;

    let lastError;
    let delay = initialDelay;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;

            if (attempt === maxAttempts || !retryOn(error)) {
                throw error;
            }

            onRetry({
                attempt,
                error,
                nextDelay: delay,
                maxAttempts
            });

            // Attendre avec jitter (variation aléatoire)
            const jitter = delay * 0.1 * Math.random();
            await new Promise(resolve => setTimeout(resolve, delay + jitter));

            // Augmenter le délai pour la prochaine tentative
            delay = Math.min(delay * backoffFactor, maxDelay);
        }
    }

    throw lastError;
}

// Usage
const result = await retry(
    () => fetch('https://api.example.com/data').then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
    }),
    {
        maxAttempts: 5,
        initialDelay: 500,
        backoffFactor: 2,
        retryOn: (error) => {
            // Ne retry que sur les erreurs réseau ou 5xx
            return error.message.includes('fetch') ||
                   error.message.includes('50');
        },
        onRetry: ({ attempt, error, nextDelay }) => {
            console.log(`Attempt ${attempt} failed: ${error.message}`);
            console.log(`Retrying in ${nextDelay}ms...`);
        }
    }
);

// Délais: 500ms → 1000ms → 2000ms → 4000ms
```

### createCircuitBreaker - Protection contre les pannes
```javascript
function createCircuitBreaker(fn, options = {}) {
    const {
        failureThreshold = 5,      // Nombre d'échecs avant ouverture
        successThreshold = 2,       // Succès nécessaires pour fermer
        timeout = 30000,            // Temps avant tentative de fermeture
        onStateChange = () => {}
    } = options;

    let state = 'CLOSED';  // CLOSED, OPEN, HALF_OPEN
    let failures = 0;
    let successes = 0;
    let lastFailureTime = null;
    let nextAttemptTime = null;

    function setState(newState) {
        if (state !== newState) {
            const oldState = state;
            state = newState;
            onStateChange({ from: oldState, to: newState });
        }
    }

    function recordSuccess() {
        failures = 0;
        if (state === 'HALF_OPEN') {
            successes++;
            if (successes >= successThreshold) {
                setState('CLOSED');
                successes = 0;
            }
        }
    }

    function recordFailure() {
        failures++;
        successes = 0;
        lastFailureTime = Date.now();

        if (state === 'HALF_OPEN' || failures >= failureThreshold) {
            setState('OPEN');
            nextAttemptTime = Date.now() + timeout;
        }
    }

    return async function circuitBreaker(...args) {
        // Vérifier si on peut tenter
        if (state === 'OPEN') {
            if (Date.now() >= nextAttemptTime) {
                setState('HALF_OPEN');
            } else {
                throw new Error('Circuit breaker is OPEN');
            }
        }

        try {
            const result = await fn(...args);
            recordSuccess();
            return result;
        } catch (error) {
            recordFailure();
            throw error;
        }
    };
}

// Usage
const fetchUser = createCircuitBreaker(
    async (id) => {
        const response = await fetch(`https://api.example.com/users/${id}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
    },
    {
        failureThreshold: 3,
        timeout: 60000,  // 1 minute avant réessai
        onStateChange: ({ from, to }) => {
            console.log(`Circuit breaker: ${from} → ${to}`);
            if (to === 'OPEN') {
                // Alerter, logger, etc.
            }
        }
    }
);

// Après 3 échecs consécutifs, le circuit s'ouvre
// Pendant 60 secondes, toutes les requêtes échouent immédiatement
// Après 60 secondes, une requête test est autorisée (HALF_OPEN)
```

### createThrottledQueue - Concurrence limitée
```javascript
function createThrottledQueue(concurrency = 5) {
    const queue = [];
    let running = 0;

    async function processNext() {
        if (queue.length === 0 || running >= concurrency) return;

        running++;
        const { fn, resolve, reject } = queue.shift();

        try {
            const result = await fn();
            resolve(result);
        } catch (error) {
            reject(error);
        } finally {
            running--;
            processNext();
        }
    }

    return {
        add(fn) {
            return new Promise((resolve, reject) => {
                queue.push({ fn, resolve, reject });
                processNext();
            });
        },

        addAll(fns) {
            return Promise.all(fns.map(fn => this.add(fn)));
        },

        get pending() {
            return queue.length;
        },

        get active() {
            return running;
        }
    };
}

// Usage
const queue = createThrottledQueue(3); // Max 3 requêtes simultanées

const urls = Array.from({ length: 100 }, (_, i) =>
    `https://api.example.com/item/${i}`
);

const results = await queue.addAll(
    urls.map(url => () => fetch(url).then(r => r.json()))
);

// Seulement 3 requêtes en parallèle à tout moment
```

### createBatcher - Regroupement d'appels
```javascript
function createBatcher(batchFn, options = {}) {
    const {
        maxBatchSize = 100,
        maxWaitMs = 50
    } = options;

    let batch = [];
    let resolvers = [];
    let timeout = null;

    async function flush() {
        if (batch.length === 0) return;

        const currentBatch = batch;
        const currentResolvers = resolvers;
        batch = [];
        resolvers = [];
        timeout = null;

        try {
            const results = await batchFn(currentBatch);
            currentResolvers.forEach((resolve, i) => resolve(results[i]));
        } catch (error) {
            currentResolvers.forEach(({ reject }) => reject(error));
        }
    }

    return function batchedCall(item) {
        return new Promise((resolve, reject) => {
            batch.push(item);
            resolvers.push({ resolve, reject });

            if (batch.length >= maxBatchSize) {
                clearTimeout(timeout);
                flush();
            } else if (!timeout) {
                timeout = setTimeout(flush, maxWaitMs);
            }
        });
    };
}

// Usage - Batching de requêtes GraphQL
const batchedFetch = createBatcher(
    async (ids) => {
        // Une seule requête pour plusieurs IDs
        const response = await fetch('/graphql', {
            method: 'POST',
            body: JSON.stringify({
                query: `query GetUsers($ids: [ID!]!) {
                    users(ids: $ids) { id, name }
                }`,
                variables: { ids }
            })
        });
        const { data } = await response.json();
        return data.users;
    },
    { maxBatchSize: 50, maxWaitMs: 10 }
);

// Ces appels sont automatiquement regroupés
const [user1, user2, user3] = await Promise.all([
    batchedFetch('user-1'),
    batchedFetch('user-2'),
    batchedFetch('user-3')
]);
// → Une seule requête avec ids: ['user-1', 'user-2', 'user-3']
```

## Combinaison de patterns

```javascript
// API client robuste
function createApiClient(baseUrl) {
    const rateLimiter = createRateLimiter(100, 60000); // 100 req/min
    const queue = createThrottledQueue(10); // 10 concurrent

    const fetchWithCircuitBreaker = createCircuitBreaker(
        async (path) => {
            const response = await fetch(`${baseUrl}${path}`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        },
        { failureThreshold: 5, timeout: 30000 }
    );

    return {
        async get(path) {
            return queue.add(() =>
                rateLimiter(() =>
                    retry(
                        () => fetchWithCircuitBreaker(path),
                        { maxAttempts: 3, initialDelay: 1000 }
                    )
                )
            );
        }
    };
}

const api = createApiClient('https://api.example.com');
const data = await api.get('/users/123');
```

## Tests
```bash
node ex08/test.js
```

## Concepts
- Rate limiting (token bucket, sliding window)
- Exponential backoff
- Jitter (variation aléatoire)
- Circuit breaker pattern
- Bulkhead pattern
- Request batching
- Concurrency control

## Bonus
- Implémenter un token bucket algorithm
- Ajouter la persistance du circuit breaker (Redis)
- Créer un retry avec politique personnalisable (linear, fibonacci)
- Implémenter un semaphore asynchrone
