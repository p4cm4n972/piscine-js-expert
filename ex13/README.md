# Ex13 - Factory Functions & Data Privacy

## Objectif
Maîtriser les factory functions pour créer des objets avec données privées, en utilisant les closures comme mécanisme d'encapsulation.

## Contexte
Les factory functions sont une alternative aux classes pour créer des objets. Elles offrent une vraie privacy via les closures, sans les complexités de `this` et `new`.

```javascript
// Factory function - vraie encapsulation
function createCounter() {
    let count = 0; // Variable privée via closure

    return {
        increment() { return ++count; },
        decrement() { return --count; },
        getCount() { return count; }
    };
}

const counter = createCounter();
counter.increment(); // 1
// counter.count; // undefined - vraiment privé!
```

## Instructions

### 1. `createPerson(name, age)`
Factory avec validation et méthodes.

### 2. `createBankAccount(owner, initialBalance)`
Compte bancaire avec historique privé.

### 3. `createStateMachine(config)`
Machine à états avec transitions privées.

### 4. `createEventEmitter()`
Émetteur d'événements avec listeners privés.

### 5. `createCache(options)`
Cache avec TTL et limite de taille.

## Exemples

### createPerson - Factory avec validation
```javascript
function createPerson(name, age) {
    // Validation à la création
    if (typeof name !== 'string' || name.length === 0) {
        throw new Error('Name must be a non-empty string');
    }
    if (typeof age !== 'number' || age < 0) {
        throw new Error('Age must be a positive number');
    }

    // État privé
    let _name = name;
    let _age = age;
    const _createdAt = new Date();

    // Méthodes privées
    function validateAge(newAge) {
        return typeof newAge === 'number' && newAge >= 0 && newAge <= 150;
    }

    // Interface publique
    return {
        getName() {
            return _name;
        },

        setName(newName) {
            if (typeof newName !== 'string' || newName.length === 0) {
                throw new Error('Invalid name');
            }
            _name = newName;
        },

        getAge() {
            return _age;
        },

        setAge(newAge) {
            if (!validateAge(newAge)) {
                throw new Error('Invalid age');
            }
            _age = newAge;
        },

        celebrateBirthday() {
            _age++;
            return `Happy birthday ${_name}! Now ${_age} years old.`;
        },

        getInfo() {
            return {
                name: _name,
                age: _age,
                createdAt: _createdAt
            };
        }
    };
}

// Usage
const alice = createPerson('Alice', 30);
console.log(alice.getName()); // 'Alice'
alice.celebrateBirthday();    // 'Happy birthday Alice! Now 31 years old.'

// Impossible d'accéder directement aux données
// alice._name; // undefined
// alice._age;  // undefined
```

### createBankAccount - État privé complexe
```javascript
function createBankAccount(owner, initialBalance = 0) {
    // État privé
    let balance = initialBalance;
    const transactions = [];
    const createdAt = new Date();

    // Helpers privés
    function logTransaction(type, amount, note = '') {
        transactions.push({
            type,
            amount,
            balance,
            timestamp: new Date(),
            note
        });
    }

    function validateAmount(amount) {
        if (typeof amount !== 'number' || amount <= 0) {
            throw new Error('Amount must be a positive number');
        }
    }

    logTransaction('OPEN', initialBalance, 'Account opened');

    return {
        getOwner() {
            return owner;
        },

        getBalance() {
            return balance;
        },

        deposit(amount) {
            validateAmount(amount);
            balance += amount;
            logTransaction('DEPOSIT', amount);
            return balance;
        },

        withdraw(amount) {
            validateAmount(amount);
            if (amount > balance) {
                throw new Error('Insufficient funds');
            }
            balance -= amount;
            logTransaction('WITHDRAW', -amount);
            return balance;
        },

        transfer(targetAccount, amount) {
            validateAmount(amount);
            this.withdraw(amount);
            targetAccount.deposit(amount);
            logTransaction('TRANSFER_OUT', -amount, `To: ${targetAccount.getOwner()}`);
        },

        getStatement(limit = 10) {
            return transactions.slice(-limit).map(t => ({
                ...t,
                timestamp: t.timestamp.toISOString()
            }));
        },

        getAccountAge() {
            return Math.floor((Date.now() - createdAt) / (1000 * 60 * 60 * 24));
        }
    };
}

// Usage
const account1 = createBankAccount('Alice', 1000);
const account2 = createBankAccount('Bob', 500);

account1.deposit(200);         // 1200
account1.transfer(account2, 300);
console.log(account1.getBalance()); // 900
console.log(account2.getBalance()); // 800

// Les transactions sont privées mais accessibles via getStatement
console.log(account1.getStatement());
```

### createStateMachine - Machine à états
```javascript
function createStateMachine(config) {
    const { initial, states } = config;

    // État privé
    let currentState = initial;
    const history = [{ state: initial, timestamp: Date.now() }];
    const listeners = new Map();

    // Helpers privés
    function emit(event, data) {
        if (listeners.has(event)) {
            listeners.get(event).forEach(fn => fn(data));
        }
    }

    function canTransition(action) {
        const stateConfig = states[currentState];
        return stateConfig && stateConfig.on && stateConfig.on[action];
    }

    return {
        getState() {
            return currentState;
        },

        can(action) {
            return canTransition(action);
        },

        send(action, payload) {
            if (!canTransition(action)) {
                throw new Error(`Cannot '${action}' from state '${currentState}'`);
            }

            const previousState = currentState;
            const stateConfig = states[currentState];
            const transition = stateConfig.on[action];

            // Exécuter onExit si défini
            if (stateConfig.onExit) {
                stateConfig.onExit({ from: previousState, action, payload });
            }

            // Changer d'état
            currentState = typeof transition === 'string' ? transition : transition.target;
            history.push({ state: currentState, action, timestamp: Date.now() });

            // Exécuter onEnter si défini
            const newStateConfig = states[currentState];
            if (newStateConfig && newStateConfig.onEnter) {
                newStateConfig.onEnter({ from: previousState, action, payload });
            }

            emit('transition', { from: previousState, to: currentState, action });

            return currentState;
        },

        on(event, callback) {
            if (!listeners.has(event)) {
                listeners.set(event, new Set());
            }
            listeners.get(event).add(callback);
            return () => listeners.get(event).delete(callback);
        },

        getHistory() {
            return [...history];
        }
    };
}

// Usage - Traffic light
const trafficLight = createStateMachine({
    initial: 'red',
    states: {
        red: {
            on: { TIMER: 'green' },
            onEnter: () => console.log('🔴 Stop!')
        },
        green: {
            on: { TIMER: 'yellow' },
            onEnter: () => console.log('🟢 Go!')
        },
        yellow: {
            on: { TIMER: 'red' },
            onEnter: () => console.log('🟡 Slow down!')
        }
    }
});

trafficLight.on('transition', ({ from, to }) => {
    console.log(`Light changed: ${from} → ${to}`);
});

trafficLight.send('TIMER'); // 🟢 Go!
trafficLight.send('TIMER'); // 🟡 Slow down!
trafficLight.send('TIMER'); // 🔴 Stop!
```

### createCache - Cache avec TTL
```javascript
function createCache(options = {}) {
    const {
        maxSize = 100,
        ttlMs = 60000, // 1 minute par défaut
        onEvict = () => {}
    } = options;

    // État privé
    const cache = new Map();
    const timers = new Map();

    // Helpers privés
    function evict(key) {
        if (cache.has(key)) {
            const value = cache.get(key);
            cache.delete(key);
            clearTimeout(timers.get(key));
            timers.delete(key);
            onEvict(key, value);
        }
    }

    function setExpiry(key, ttl) {
        if (timers.has(key)) {
            clearTimeout(timers.get(key));
        }
        if (ttl > 0) {
            timers.set(key, setTimeout(() => evict(key), ttl));
        }
    }

    function enforceMaxSize() {
        while (cache.size > maxSize) {
            const oldestKey = cache.keys().next().value;
            evict(oldestKey);
        }
    }

    return {
        set(key, value, customTtl = ttlMs) {
            // Si la clé existe, la supprimer pour la remettre en fin
            if (cache.has(key)) {
                cache.delete(key);
            }
            cache.set(key, value);
            setExpiry(key, customTtl);
            enforceMaxSize();
        },

        get(key) {
            if (!cache.has(key)) {
                return undefined;
            }
            // Déplacer en fin (LRU)
            const value = cache.get(key);
            cache.delete(key);
            cache.set(key, value);
            return value;
        },

        has(key) {
            return cache.has(key);
        },

        delete(key) {
            evict(key);
        },

        clear() {
            for (const key of cache.keys()) {
                evict(key);
            }
        },

        get size() {
            return cache.size;
        },

        keys() {
            return [...cache.keys()];
        }
    };
}

// Usage
const cache = createCache({
    maxSize: 3,
    ttlMs: 5000,
    onEvict: (key, value) => console.log(`Evicted: ${key}`)
});

cache.set('a', 1);
cache.set('b', 2);
cache.set('c', 3);
cache.set('d', 4); // 'a' est évincé (maxSize atteint)

console.log(cache.keys()); // ['b', 'c', 'd']

// Après 5 secondes, les entrées expirent automatiquement
```

## Composition de factories

```javascript
// Mixin pattern avec factories
function withLogging(factory) {
    return (...args) => {
        const instance = factory(...args);

        return new Proxy(instance, {
            get(target, prop) {
                const value = target[prop];
                if (typeof value === 'function') {
                    return (...args) => {
                        console.log(`Calling ${prop} with:`, args);
                        return value.apply(target, args);
                    };
                }
                return value;
            }
        });
    };
}

// Usage
const createLoggedPerson = withLogging(createPerson);
const person = createLoggedPerson('Alice', 30);
person.setAge(31); // Log: Calling setAge with: [31]
```

## Tests
```bash
node ex13/test.js
```

## Concepts
- Factory functions
- Closures pour la privacy
- Revealing module pattern
- Composition over inheritance
- État privé immuable
- Interfaces publiques

## Bonus
- Implémenter un ORM simple avec factories
- Créer un système de plugins avec factories
- Implémenter le pattern Object Pool avec factory
- Créer un système de versioning d'objets
