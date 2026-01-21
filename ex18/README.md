# Ex18 - Proxy & Reflect

## Objectif
Utiliser Proxy et Reflect pour intercepter et modifier le comportement des objets JavaScript - un outil puissant pour la métaprogrammation.

## Contexte
`Proxy` permet de créer un objet qui enveloppe un autre objet et intercepte les opérations fondamentales (lecture, écriture, appels de fonction, etc.). `Reflect` fournit des méthodes pour effectuer ces opérations de manière standard.

```javascript
// Un Proxy intercepte les opérations sur un objet
const target = { name: 'Alice' };
const proxy = new Proxy(target, {
    get(target, prop) {
        console.log(`Accessing ${prop}`);
        return target[prop];
    }
});

proxy.name; // Log: "Accessing name", returns "Alice"
```

### Les traps (pièges) disponibles

| Trap | Opération interceptée |
|------|----------------------|
| get | Lecture de propriété |
| set | Écriture de propriété |
| has | Opérateur `in` |
| deleteProperty | Opérateur `delete` |
| apply | Appel de fonction |
| construct | Opérateur `new` |
| getPrototypeOf | Object.getPrototypeOf |
| setPrototypeOf | Object.setPrototypeOf |
| ownKeys | Object.keys, for...in |
| defineProperty | Object.defineProperty |

## Instructions

Implémentez les fonctions suivantes :

### 1. `createValidator(obj, schema)`
Valide les propriétés avec un Proxy.

### 2. `createObservable(obj, callback)`
Observe les modifications d'un objet.

### 3. `createReadOnly(obj)`
Rend un objet complètement immutable.

### 4. `createNegativeArray(arr)`
Tableau acceptant les indices négatifs.

### 5. `createPrivate(obj)`
Simule les propriétés privées (préfixées par _).

### 6. `createCached(fn)`
Fonction avec cache automatique via Proxy.

## Exemples

### createValidator - Validation de schéma
```javascript
function createValidator(obj, schema) {
    return new Proxy(obj, {
        set(target, prop, value) {
            // Si pas de règle, accepter la valeur
            if (!schema[prop]) {
                target[prop] = value;
                return true;
            }

            // Valider avec la règle du schéma
            const rule = schema[prop];
            if (!rule(value)) {
                throw new Error(`Invalid value for ${prop}: ${value}`);
            }

            target[prop] = value;
            return true;
        }
    });
}

// Usage
const schema = {
    age: (val) => typeof val === 'number' && val >= 0 && val <= 150,
    name: (val) => typeof val === 'string' && val.length > 0,
    email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
};

const user = createValidator({}, schema);

user.name = 'Alice';        // OK
user.age = 25;              // OK
user.email = 'a@b.com';     // OK
user.city = 'Paris';        // OK (pas de règle)

// user.age = -5;           // Error: Invalid value for age: -5
// user.name = '';          // Error: Invalid value for name:
// user.email = 'invalid';  // Error: Invalid value for email: invalid

// Schéma plus complexe
const productSchema = {
    price: (val) => typeof val === 'number' && val > 0,
    quantity: (val) => Number.isInteger(val) && val >= 0,
    name: (val) => typeof val === 'string' && val.length >= 2
};

const product = createValidator({ name: 'Widget', price: 9.99, quantity: 10 }, productSchema);
product.quantity = 5;       // OK
// product.price = 0;       // Error!
```

### createObservable - Observation de changements
```javascript
function createObservable(obj, callback) {
    return new Proxy(obj, {
        set(target, prop, value) {
            const oldValue = target[prop];
            target[prop] = value;
            callback(prop, value, oldValue);
            return true;
        },
        deleteProperty(target, prop) {
            const oldValue = target[prop];
            delete target[prop];
            callback(prop, undefined, oldValue, 'delete');
            return true;
        }
    });
}

// Usage
const state = createObservable({ count: 0, name: 'App' }, (prop, newVal, oldVal, action) => {
    if (action === 'delete') {
        console.log(`Deleted ${prop} (was ${oldVal})`);
    } else {
        console.log(`${prop}: ${oldVal} → ${newVal}`);
    }
});

state.count = 1;     // Log: "count: 0 → 1"
state.count = 2;     // Log: "count: 1 → 2"
state.name = 'MyApp'; // Log: "name: App → MyApp"
delete state.name;   // Log: "Deleted name (was MyApp)"

// Application: Reactive UI updates
const reactiveState = createObservable({ items: [] }, (prop, value) => {
    if (prop === 'items') {
        renderItemList(value); // Hypothetical render function
    }
});
```

### createReadOnly - Objet immutable
```javascript
function createReadOnly(obj) {
    return new Proxy(obj, {
        set(target, prop, value) {
            throw new Error(`Cannot modify read-only property: ${prop}`);
        },
        deleteProperty(target, prop) {
            throw new Error(`Cannot delete read-only property: ${prop}`);
        },
        defineProperty(target, prop, descriptor) {
            throw new Error(`Cannot define property on read-only object: ${prop}`);
        },
        setPrototypeOf(target, proto) {
            throw new Error('Cannot change prototype of read-only object');
        }
    });
}

// Usage
const config = createReadOnly({
    apiUrl: 'https://api.example.com',
    timeout: 5000,
    retries: 3
});

console.log(config.apiUrl);  // "https://api.example.com"
// config.apiUrl = 'http://...'; // Error: Cannot modify read-only property
// delete config.timeout;        // Error: Cannot delete read-only property

// Version récursive (deep readonly)
function createDeepReadOnly(obj) {
    return new Proxy(obj, {
        get(target, prop) {
            const value = target[prop];
            if (typeof value === 'object' && value !== null) {
                return createDeepReadOnly(value);
            }
            return value;
        },
        set() {
            throw new Error('Object is read-only');
        },
        deleteProperty() {
            throw new Error('Object is read-only');
        }
    });
}

const deepConfig = createDeepReadOnly({
    server: {
        host: 'localhost',
        port: 3000
    }
});

// deepConfig.server.port = 8080; // Error!
```

### createNegativeArray - Indices négatifs Python-style
```javascript
function createNegativeArray(arr) {
    return new Proxy(arr, {
        get(target, prop) {
            // Convertir en nombre si c'est un index
            const index = Number(prop);

            if (!Number.isNaN(index) && index < 0) {
                // Index négatif: compter depuis la fin
                return target[target.length + index];
            }

            // Comportement normal pour les autres propriétés
            return Reflect.get(target, prop);
        },
        set(target, prop, value) {
            const index = Number(prop);

            if (!Number.isNaN(index) && index < 0) {
                target[target.length + index] = value;
                return true;
            }

            return Reflect.set(target, prop, value);
        }
    });
}

// Usage
const arr = createNegativeArray([1, 2, 3, 4, 5]);

// Indices positifs normaux
console.log(arr[0]);   // 1
console.log(arr[2]);   // 3

// Indices négatifs (Python-style)
console.log(arr[-1]);  // 5 (dernier élément)
console.log(arr[-2]);  // 4 (avant-dernier)
console.log(arr[-5]);  // 1 (premier)

// Modification avec indices négatifs
arr[-1] = 10;
console.log(arr);      // [1, 2, 3, 4, 10]

// Les méthodes fonctionnent toujours
arr.push(6);
console.log(arr[-1]);  // 6

// Slice-like behavior
const last3 = [arr[-3], arr[-2], arr[-1]]; // [4, 10, 6]
```

### createPrivate - Propriétés privées simulées
```javascript
function createPrivate(obj) {
    return new Proxy(obj, {
        get(target, prop) {
            if (prop.startsWith('_')) {
                throw new Error(`Cannot access private property: ${prop}`);
            }
            return Reflect.get(target, prop);
        },
        set(target, prop, value) {
            if (prop.startsWith('_')) {
                throw new Error(`Cannot set private property: ${prop}`);
            }
            return Reflect.set(target, prop, value);
        },
        has(target, prop) {
            if (prop.startsWith('_')) {
                return false; // Cacher les propriétés privées
            }
            return Reflect.has(target, prop);
        },
        ownKeys(target) {
            // Filtrer les propriétés privées
            return Reflect.ownKeys(target).filter(key =>
                typeof key !== 'string' || !key.startsWith('_')
            );
        },
        getOwnPropertyDescriptor(target, prop) {
            if (typeof prop === 'string' && prop.startsWith('_')) {
                return undefined;
            }
            return Reflect.getOwnPropertyDescriptor(target, prop);
        }
    });
}

// Usage
const user = createPrivate({
    name: 'Alice',
    email: 'alice@example.com',
    _password: 'secret123',
    _token: 'abc123'
});

console.log(user.name);    // "Alice"
// console.log(user._password); // Error: Cannot access private property

console.log('name' in user);     // true
console.log('_password' in user); // false

console.log(Object.keys(user));  // ['name', 'email'] (sans _password, _token)

// user._password = 'new';       // Error: Cannot set private property
```

### createCached - Memoization avec Proxy
```javascript
function createCached(fn) {
    const cache = new Map();

    return new Proxy(fn, {
        apply(target, thisArg, args) {
            const key = JSON.stringify(args);

            if (cache.has(key)) {
                console.log('Cache hit:', key);
                return cache.get(key);
            }

            console.log('Cache miss:', key);
            const result = Reflect.apply(target, thisArg, args);
            cache.set(key, result);
            return result;
        }
    });
}

// Usage
const expensiveCalculation = createCached((n) => {
    console.log('Computing...');
    let result = 0;
    for (let i = 0; i < n * 1000000; i++) {
        result += Math.sqrt(i);
    }
    return result;
});

expensiveCalculation(10); // Cache miss, Computing...
expensiveCalculation(10); // Cache hit (instant)
expensiveCalculation(20); // Cache miss, Computing...
expensiveCalculation(10); // Cache hit (instant)

// Avec gestion du cache
function createCachedWithControl(fn) {
    const cache = new Map();

    const proxy = new Proxy(fn, {
        apply(target, thisArg, args) {
            const key = JSON.stringify(args);
            if (cache.has(key)) return cache.get(key);

            const result = Reflect.apply(target, thisArg, args);
            cache.set(key, result);
            return result;
        }
    });

    // Ajouter des méthodes de contrôle
    proxy.clearCache = () => cache.clear();
    proxy.cacheSize = () => cache.size;
    proxy.hasCache = (...args) => cache.has(JSON.stringify(args));

    return proxy;
}
```

## Reflect - L'API miroir

`Reflect` fournit des méthodes équivalentes aux opérations interceptées par Proxy :

```javascript
const obj = { a: 1, b: 2 };

// Équivalences
obj.a                          // Reflect.get(obj, 'a')
obj.a = 10                     // Reflect.set(obj, 'a', 10)
'a' in obj                     // Reflect.has(obj, 'a')
delete obj.a                   // Reflect.deleteProperty(obj, 'a')
Object.keys(obj)               // Reflect.ownKeys(obj)
Object.getPrototypeOf(obj)     // Reflect.getPrototypeOf(obj)

// Pourquoi utiliser Reflect dans les handlers ?
const proxy = new Proxy(obj, {
    get(target, prop, receiver) {
        // Reflect préserve le bon 'this' avec receiver
        return Reflect.get(target, prop, receiver);
    }
});
```

## Patterns avancés

### Virtual properties
```javascript
function withVirtualProperties(obj, virtuals) {
    return new Proxy(obj, {
        get(target, prop) {
            if (virtuals[prop]) {
                return virtuals[prop].call(target);
            }
            return Reflect.get(target, prop);
        },
        ownKeys(target) {
            return [...Reflect.ownKeys(target), ...Object.keys(virtuals)];
        }
    });
}

// Usage
const person = withVirtualProperties(
    { firstName: 'John', lastName: 'Doe', birthYear: 1990 },
    {
        fullName() {
            return `${this.firstName} ${this.lastName}`;
        },
        age() {
            return new Date().getFullYear() - this.birthYear;
        }
    }
);

console.log(person.fullName); // "John Doe"
console.log(person.age);      // 34 (ou l'âge actuel)
```

### Auto-vivification (création automatique)
```javascript
function createAutoVivifying() {
    const handler = {
        get(target, prop) {
            if (!(prop in target)) {
                target[prop] = new Proxy({}, handler);
            }
            return target[prop];
        }
    };
    return new Proxy({}, handler);
}

// Usage - pas besoin de créer les objets intermédiaires
const data = createAutoVivifying();

data.user.profile.settings.theme = 'dark';
// Crée automatiquement: data.user, data.user.profile, data.user.profile.settings

console.log(data.user.profile.settings.theme); // "dark"
```

### API fluide avec Proxy
```javascript
function createFluentAPI(actions) {
    const calls = [];

    const proxy = new Proxy({}, {
        get(target, prop) {
            if (prop === 'execute') {
                return () => {
                    let result;
                    for (const { action, args } of calls) {
                        result = actions[action](...args, result);
                    }
                    calls.length = 0;
                    return result;
                };
            }

            return (...args) => {
                calls.push({ action: prop, args });
                return proxy;
            };
        }
    });

    return proxy;
}

// Usage
const math = createFluentAPI({
    start: (n) => n,
    add: (n, prev) => prev + n,
    multiply: (n, prev) => prev * n,
    subtract: (n, prev) => prev - n
});

const result = math
    .start(5)
    .add(3)
    .multiply(2)
    .subtract(4)
    .execute(); // ((5 + 3) * 2) - 4 = 12
```

## Tests
```bash
node ex12/test.js
```

## Concepts
- Proxy et handlers
- Traps (get, set, has, deleteProperty, apply, construct, etc.)
- Reflect API
- Métaprogrammation
- Property interception
- Revocable proxies

## Bonus
- Implémenter un `createTyped(schema)` qui valide les types TypeScript-like
- Créer un `createLogged(obj)` qui log toutes les opérations sur un objet
- Implémenter `createSandbox(obj)` qui isole les modifications (comme un "draft")
- Créer un système de "revocable" objects qui peuvent être désactivés
