# Ex21 - Decorators & Metadata

## Objectif
Maîtriser les patterns de décorateurs en JavaScript pour modifier et enrichir le comportement des fonctions, méthodes et classes de manière déclarative.

## Contexte
Les décorateurs permettent d'ajouter des comportements transversaux (cross-cutting concerns) comme le logging, la validation, le caching, sans modifier le code métier. Bien que la proposition TC39 pour les décorateurs natifs soit encore en stage 3, le pattern est largement utilisé via des fonctions wrapper (enveloppantes).

```javascript
// Pattern décorateur basique
function withLogging(fn) {
    return function(...args) {
        console.log(`Calling ${fn.name} with:`, args);
        const result = fn.apply(this, args);
        console.log(`Result:`, result);
        return result;
    };
}

const add = (a, b) => a + b;
const loggedAdd = withLogging(add);
loggedAdd(2, 3); // Logs et retourne 5
```

## Instructions

### 1. `memoize(fn)`
Cache les résultats des appels précédents.

### 2. `debounce(fn, delay)` / `throttle(fn, limit)`
Contrôler la fréquence d'exécution.

### 3. `retry(fn, maxAttempts, delay)`
Réessayer automatiquement en cas d'échec.

### 4. `validate(schema)`
Décorateur de validation des arguments.

### 5. `deprecated(message)`
Marquer une fonction comme dépréciée.

## Exemples

### memoize - Cache intelligent
```javascript
function memoize(fn, options = {}) {
    const {
        maxSize = 100,
        ttlMs = 0,
        keyResolver = (...args) => JSON.stringify(args)
    } = options;

    const cache = new Map();
    const timestamps = new Map();

    function cleanup() {
        if (ttlMs > 0) {
            const now = Date.now();
            for (const [key, timestamp] of timestamps) {
                if (now - timestamp > ttlMs) {
                    cache.delete(key);
                    timestamps.delete(key);
                }
            }
        }

        while (cache.size > maxSize) {
            const oldestKey = cache.keys().next().value;
            cache.delete(oldestKey);
            timestamps.delete(oldestKey);
        }
    }

    const memoized = function(...args) {
        const key = keyResolver(...args);

        if (cache.has(key)) {
            const timestamp = timestamps.get(key);
            if (ttlMs === 0 || Date.now() - timestamp < ttlMs) {
                return cache.get(key);
            }
        }

        const result = fn.apply(this, args);
        cache.set(key, result);
        timestamps.set(key, Date.now());
        cleanup();

        return result;
    };

    // API pour gérer le cache
    memoized.cache = cache;
    memoized.clear = () => {
        cache.clear();
        timestamps.clear();
    };
    memoized.delete = (key) => {
        cache.delete(key);
        timestamps.delete(key);
    };

    return memoized;
}

// Usage
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoFib = memoize(function fib(n) {
    if (n <= 1) return n;
    return memoFib(n - 1) + memoFib(n - 2);
});

console.log(memoFib(50)); // Instantané! Sans memo, prendrait des heures

// Avec TTL et maxSize
const cachedFetch = memoize(
    async (url) => {
        const res = await fetch(url);
        return res.json();
    },
    { maxSize: 50, ttlMs: 60000 } // Cache 1 minute, max 50 entrées
);
```

### debounce - Anti-rebond
```javascript
function debounce(fn, delay, options = {}) {
    const { leading = false, trailing = true, maxWait } = options;

    let timeoutId = null;
    let maxTimeoutId = null;
    let lastArgs = null;
    let lastThis = null;
    let lastCallTime = 0;
    let result;

    function invoke() {
        const args = lastArgs;
        const thisArg = lastThis;

        lastArgs = null;
        lastThis = null;

        result = fn.apply(thisArg, args);
        return result;
    }

    function cancel() {
        if (timeoutId) clearTimeout(timeoutId);
        if (maxTimeoutId) clearTimeout(maxTimeoutId);
        timeoutId = null;
        maxTimeoutId = null;
        lastArgs = null;
        lastThis = null;
        lastCallTime = 0;
    }

    function debounced(...args) {
        const now = Date.now();
        const isInvoking = leading && !timeoutId;

        lastArgs = args;
        lastThis = this;
        lastCallTime = now;

        if (timeoutId) clearTimeout(timeoutId);

        if (isInvoking) {
            result = invoke();
        }

        if (trailing) {
            timeoutId = setTimeout(() => {
                timeoutId = null;
                if (!leading || lastArgs) {
                    invoke();
                }
            }, delay);
        }

        // maxWait garantit une exécution même si les appels continuent
        if (maxWait && !maxTimeoutId) {
            maxTimeoutId = setTimeout(() => {
                maxTimeoutId = null;
                if (timeoutId) {
                    clearTimeout(timeoutId);
                    timeoutId = null;
                    invoke();
                }
            }, maxWait);
        }

        return result;
    }

    debounced.cancel = cancel;
    debounced.flush = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
            return invoke();
        }
    };

    return debounced;
}

// Usage - Recherche avec debounce
const searchInput = {
    onInput: debounce((query) => {
        console.log('Searching for:', query);
        // fetch(`/api/search?q=${query}`)
    }, 300)
};

// Simule des frappes rapides
searchInput.onInput('h');
searchInput.onInput('he');
searchInput.onInput('hel');
searchInput.onInput('hell');
searchInput.onInput('hello');
// Après 300ms: "Searching for: hello" (un seul appel)
```

### throttle - Limitation de débit
```javascript
function throttle(fn, limit, options = {}) {
    const { leading = true, trailing = true } = options;

    let lastCallTime = 0;
    let timeoutId = null;
    let lastArgs = null;
    let lastThis = null;

    function invoke() {
        lastCallTime = Date.now();
        const args = lastArgs;
        const thisArg = lastThis;
        lastArgs = null;
        lastThis = null;
        return fn.apply(thisArg, args);
    }

    function throttled(...args) {
        const now = Date.now();
        const remaining = limit - (now - lastCallTime);

        lastArgs = args;
        lastThis = this;

        if (remaining <= 0 || remaining > limit) {
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
            if (leading || lastCallTime !== 0) {
                return invoke();
            }
        } else if (!timeoutId && trailing) {
            timeoutId = setTimeout(() => {
                timeoutId = null;
                if (trailing) {
                    invoke();
                }
            }, remaining);
        }
    }

    throttled.cancel = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        lastCallTime = 0;
        lastArgs = null;
        lastThis = null;
    };

    return throttled;
}

// Usage - Scroll handler
const scrollHandler = throttle(() => {
    console.log('Scroll position:', window.scrollY);
}, 100);

// S'exécute max toutes les 100ms même si scroll continu
window.addEventListener('scroll', scrollHandler);
```

### retry - Réessai automatique
```javascript
function retry(fn, options = {}) {
    const {
        maxAttempts = 3,
        delay = 1000,
        backoff = 'exponential', // 'fixed', 'linear', 'exponential'
        shouldRetry = (error) => true,
        onRetry = () => {}
    } = options;

    function getDelay(attempt) {
        switch (backoff) {
            case 'fixed': return delay;
            case 'linear': return delay * attempt;
            case 'exponential': return delay * Math.pow(2, attempt - 1);
            default: return delay;
        }
    }

    return async function(...args) {
        let lastError;

        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                return await fn.apply(this, args);
            } catch (error) {
                lastError = error;

                if (attempt < maxAttempts && shouldRetry(error)) {
                    const waitTime = getDelay(attempt);
                    onRetry({ attempt, error, nextDelay: waitTime });
                    await new Promise(r => setTimeout(r, waitTime));
                }
            }
        }

        throw lastError;
    };
}

// Usage
const fetchWithRetry = retry(
    async (url) => {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    },
    {
        maxAttempts: 3,
        delay: 1000,
        backoff: 'exponential',
        shouldRetry: (err) => err.message.includes('5'), // Retry 5xx only
        onRetry: ({ attempt, error, nextDelay }) => {
            console.log(`Attempt ${attempt} failed: ${error.message}`);
            console.log(`Retrying in ${nextDelay}ms...`);
        }
    }
);

// fetchWithRetry('/api/data')
//   .then(data => console.log(data))
//   .catch(err => console.error('All retries failed:', err));
```

### validate - Validation des arguments
```javascript
function validate(schema) {
    return function(fn) {
        return function(...args) {
            // Valider chaque argument selon le schéma
            for (let i = 0; i < schema.length; i++) {
                const validator = schema[i];
                const arg = args[i];
                const argName = validator.name || `argument ${i}`;

                if (validator.required && arg === undefined) {
                    throw new TypeError(`${argName} is required`);
                }

                if (arg !== undefined) {
                    if (validator.type && typeof arg !== validator.type) {
                        throw new TypeError(
                            `${argName} must be of type ${validator.type}, got ${typeof arg}`
                        );
                    }

                    if (validator.min !== undefined && arg < validator.min) {
                        throw new RangeError(
                            `${argName} must be >= ${validator.min}`
                        );
                    }

                    if (validator.max !== undefined && arg > validator.max) {
                        throw new RangeError(
                            `${argName} must be <= ${validator.max}`
                        );
                    }

                    if (validator.pattern && !validator.pattern.test(arg)) {
                        throw new Error(
                            `${argName} doesn't match pattern ${validator.pattern}`
                        );
                    }

                    if (validator.custom && !validator.custom(arg)) {
                        throw new Error(
                            `${argName} failed custom validation`
                        );
                    }
                }
            }

            return fn.apply(this, args);
        };
    };
}

// Usage
const createUser = validate([
    { name: 'email', type: 'string', required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    { name: 'age', type: 'number', required: true, min: 0, max: 150 },
    { name: 'role', type: 'string', custom: (r) => ['admin', 'user', 'guest'].includes(r) }
])(function(email, age, role = 'user') {
    return { email, age, role, createdAt: new Date() };
});

createUser('alice@example.com', 25);           // OK
createUser('alice@example.com', 25, 'admin');  // OK
// createUser('invalid', 25);                  // TypeError: email doesn't match pattern
// createUser('alice@example.com', -5);        // RangeError: age must be >= 0
// createUser('alice@example.com', 25, 'superadmin'); // Error: role failed custom validation
```

### deprecated - Avertissement de dépréciation
```javascript
function deprecated(message, options = {}) {
    const {
        version,
        alternative,
        warnOnce = true,
        logger = console.warn
    } = options;

    const warned = new Set();

    return function(fn) {
        const wrapper = function(...args) {
            const key = fn.name || 'anonymous';

            if (!warnOnce || !warned.has(key)) {
                warned.add(key);

                let warning = `DEPRECATED: ${fn.name || 'This function'} is deprecated.`;
                if (message) warning += ` ${message}`;
                if (version) warning += ` Will be removed in version ${version}.`;
                if (alternative) warning += ` Use ${alternative} instead.`;

                logger(warning);

                if (options.throwInProduction && process.env.NODE_ENV === 'production') {
                    throw new Error(warning);
                }
            }

            return fn.apply(this, args);
        };

        wrapper.originalName = fn.name;
        return wrapper;
    };
}

// Usage
const oldMethod = deprecated(
    'This method has performance issues.',
    {
        version: '3.0.0',
        alternative: 'newMethod()',
        warnOnce: true
    }
)(function oldMethod(data) {
    // Old implementation
    return data;
});

oldMethod({ x: 1 }); // Warning logged
oldMethod({ x: 2 }); // No warning (warnOnce: true)
```

### Composition de décorateurs
```javascript
function compose(...decorators) {
    return function(fn) {
        return decorators.reduceRight(
            (decorated, decorator) => decorator(decorated),
            fn
        );
    };
}

// Décorateurs réutilisables
const withTiming = (fn) => async function(...args) {
    const start = performance.now();
    try {
        return await fn.apply(this, args);
    } finally {
        console.log(`${fn.name} took ${performance.now() - start}ms`);
    }
};

const withLogging = (fn) => function(...args) {
    console.log(`→ ${fn.name}(${args.map(a => JSON.stringify(a)).join(', ')})`);
    const result = fn.apply(this, args);
    console.log(`← ${fn.name} returned:`, result);
    return result;
};

const withErrorHandling = (fn) => async function(...args) {
    try {
        return await fn.apply(this, args);
    } catch (error) {
        console.error(`Error in ${fn.name}:`, error.message);
        throw error;
    }
};

// Composer les décorateurs
const enhancedFetch = compose(
    withTiming,
    withLogging,
    withErrorHandling,
    retry({ maxAttempts: 3 })
)(async function fetchData(url) {
    const res = await fetch(url);
    return res.json();
});

// enhancedFetch('/api/data');
// Logs: → fetchData("/api/data")
// Logs: fetchData took 150ms
// Logs: ← fetchData returned: {...}
```

### Method Decorator Pattern (pour classes)
```javascript
function methodDecorator(decorator) {
    return function(target, key, descriptor) {
        const original = descriptor.value;
        descriptor.value = decorator(original);
        return descriptor;
    };
}

// Decorators pour classes (pattern manuel)
function decorateMethod(target, methodName, decorator) {
    const original = target.prototype[methodName];
    target.prototype[methodName] = decorator(original);
}

class UserService {
    async getUser(id) {
        // Simule un appel API
        return { id, name: 'User ' + id };
    }

    async createUser(data) {
        return { id: Date.now(), ...data };
    }
}

// Appliquer les décorateurs
decorateMethod(UserService, 'getUser', withLogging);
decorateMethod(UserService, 'getUser', memoize);
decorateMethod(UserService, 'createUser', validate([
    { name: 'data', type: 'object', required: true }
]));

const service = new UserService();
service.getUser(1); // Logged + memoized
```

### Metadata avec WeakMap
```javascript
// Stocker des métadonnées sur les objets/fonctions
const metadata = new WeakMap();

function setMetadata(target, key, value) {
    if (!metadata.has(target)) {
        metadata.set(target, new Map());
    }
    metadata.get(target).set(key, value);
}

function getMetadata(target, key) {
    return metadata.get(target)?.get(key);
}

function hasMetadata(target, key) {
    return metadata.get(target)?.has(key) ?? false;
}

// Décorateur qui ajoute des métadonnées
function route(path, method = 'GET') {
    return function(fn) {
        setMetadata(fn, 'route', { path, method });
        return fn;
    };
}

function roles(...allowedRoles) {
    return function(fn) {
        setMetadata(fn, 'roles', allowedRoles);
        return fn;
    };
}

// Usage
const getUsers = route('/users', 'GET')(
    roles('admin', 'manager')(
        function getUsers() {
            return [/* users */];
        }
    )
);

// Lire les métadonnées
console.log(getMetadata(getUsers, 'route'));  // { path: '/users', method: 'GET' }
console.log(getMetadata(getUsers, 'roles'));  // ['admin', 'manager']

// Router automatique
function createRouter(controllers) {
    const routes = [];

    for (const controller of controllers) {
        for (const key of Object.keys(controller)) {
            const handler = controller[key];
            const routeMeta = getMetadata(handler, 'route');
            const rolesMeta = getMetadata(handler, 'roles');

            if (routeMeta) {
                routes.push({
                    ...routeMeta,
                    handler,
                    roles: rolesMeta || []
                });
            }
        }
    }

    return routes;
}
```

### once - Exécution unique
```javascript
function once(fn) {
    let called = false;
    let result;

    return function(...args) {
        if (!called) {
            called = true;
            result = fn.apply(this, args);
        }
        return result;
    };
}

// Usage
const initialize = once(() => {
    console.log('Initializing...');
    return { ready: true };
});

initialize(); // 'Initializing...' + returns { ready: true }
initialize(); // returns { ready: true } (no log)
initialize(); // returns { ready: true } (no log)
```

### before / after - Hooks
```javascript
function before(beforeFn) {
    return function(fn) {
        return function(...args) {
            beforeFn.apply(this, args);
            return fn.apply(this, args);
        };
    };
}

function after(afterFn) {
    return function(fn) {
        return function(...args) {
            const result = fn.apply(this, args);
            afterFn.call(this, result, ...args);
            return result;
        };
    };
}

function around(aroundFn) {
    return function(fn) {
        return function(...args) {
            return aroundFn.call(this, fn, args);
        };
    };
}

// Usage
const save = compose(
    before(function() {
        console.log('Validating before save...');
    }),
    after(function(result) {
        console.log('Saved successfully:', result.id);
    })
)(function save(data) {
    return { id: Date.now(), ...data };
});

save({ name: 'Test' });
// 'Validating before save...'
// 'Saved successfully: 1234567890'
```

## Tests
```bash
node ex21/test.js
```

## Concepts
- Higher-Order Functions (fonctions d'ordre supérieur)
- Function wrapping (enveloppement de fonctions)
- Cross-cutting concerns (préoccupations transversales)
- Aspect-Oriented Programming (AOP)
- Metadata API
- Composition de décorateurs
- TC39 Decorators proposal
