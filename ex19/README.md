# Ex19 - Symbols & Well-Known Symbols

## Objectif
Maîtriser les Symbols ES6 et les Well-Known Symbols pour personnaliser le comportement des objets avec le moteur JavaScript.

## Contexte
Les Symbols sont des primitives uniques et immuables, introduites en ES6. Les Well-Known Symbols permettent de modifier les comportements internes de JavaScript (itération, conversion, comparaison, etc.).

```javascript
// Symbol basique - garantit l'unicité
const id1 = Symbol('id');
const id2 = Symbol('id');
console.log(id1 === id2); // false - chaque Symbol est unique!

// Symbol comme clé de propriété "privée"
const privateKey = Symbol('secret');
const obj = {
    [privateKey]: 'hidden value',
    public: 'visible'
};
console.log(Object.keys(obj)); // ['public'] - Symbol non énuméré
```

## Instructions

### 1. `createPrivateStore()`
Créer un système de données privées avec Symbols.

### 2. `makeIterable(obj)`
Rendre un objet itérable avec `Symbol.iterator`.

### 3. `customStringTag(obj, tag)`
Personnaliser `[object Tag]` avec `Symbol.toStringTag`.

### 4. `createEnum(...values)`
Créer des enums avec Symbols uniques.

### 5. `implementToPrimitive(obj, hints)`
Contrôler la conversion avec `Symbol.toPrimitive`.

## Exemples

### Symbols basiques et Registry
```javascript
// Création de Symbols
const sym1 = Symbol('description');
const sym2 = Symbol('description');
console.log(sym1 === sym2); // false

// Symbol.for() - Registry global
const globalSym1 = Symbol.for('app.id');
const globalSym2 = Symbol.for('app.id');
console.log(globalSym1 === globalSym2); // true

// Retrouver la clé d'un Symbol global
console.log(Symbol.keyFor(globalSym1)); // 'app.id'
console.log(Symbol.keyFor(sym1));       // undefined (pas dans le registry)

// Propriétés Symbol
const SECRET = Symbol('secret');
const user = {
    name: 'Alice',
    [SECRET]: 'password123'
};

console.log(user.name);        // 'Alice'
console.log(user[SECRET]);     // 'password123'
console.log(Object.keys(user)); // ['name']
console.log(Object.getOwnPropertySymbols(user)); // [Symbol(secret)]
```

### createPrivateStore - Données vraiment privées
```javascript
function createPrivateStore() {
    const privateData = Symbol('privateData');

    return {
        set(obj, key, value) {
            if (!obj[privateData]) {
                obj[privateData] = {};
            }
            obj[privateData][key] = value;
        },

        get(obj, key) {
            return obj[privateData]?.[key];
        },

        has(obj, key) {
            return obj[privateData]?.hasOwnProperty(key) ?? false;
        },

        delete(obj, key) {
            if (obj[privateData]) {
                delete obj[privateData][key];
            }
        },

        // Expose le Symbol pour les cas avancés
        get symbol() {
            return privateData;
        }
    };
}

// Usage
const privateStore = createPrivateStore();
const user = { name: 'Alice' };

privateStore.set(user, 'password', 'secret123');
privateStore.set(user, 'token', 'abc-xyz');

console.log(user.name);                    // 'Alice'
console.log(privateStore.get(user, 'password')); // 'secret123'
console.log(Object.keys(user));            // ['name'] - données privées invisibles

// Même JSON.stringify ignore les Symbols
console.log(JSON.stringify(user)); // '{"name":"Alice"}'
```

### Symbol.iterator - Objets itérables
```javascript
function makeIterable(obj, iteratorFn) {
    obj[Symbol.iterator] = iteratorFn;
    return obj;
}

// Exemple: Range itérable
function createRange(start, end, step = 1) {
    return makeIterable({ start, end, step }, function* () {
        for (let i = this.start; i <= this.end; i += this.step) {
            yield i;
        }
    });
}

const range = createRange(1, 5);
console.log([...range]); // [1, 2, 3, 4, 5]

for (const n of range) {
    console.log(n); // 1, 2, 3, 4, 5
}

// Exemple: Objet avec valeurs itérables
const config = makeIterable(
    { db: 'postgres', cache: 'redis', queue: 'rabbitmq' },
    function* () {
        for (const [key, value] of Object.entries(this)) {
            if (key !== Symbol.iterator.toString()) {
                yield { key, value };
            }
        }
    }
);

for (const { key, value } of config) {
    console.log(`${key}: ${value}`);
}
// db: postgres
// cache: redis
// queue: rabbitmq
```

### Symbol.toStringTag - Personnaliser le type
```javascript
function customStringTag(obj, tag) {
    Object.defineProperty(obj, Symbol.toStringTag, {
        value: tag,
        configurable: true
    });
    return obj;
}

class MyCollection {
    get [Symbol.toStringTag]() {
        return 'MyCollection';
    }
}

const coll = new MyCollection();
console.log(Object.prototype.toString.call(coll)); // '[object MyCollection]'

// Avec la fonction helper
const api = customStringTag({}, 'APIClient');
console.log(Object.prototype.toString.call(api)); // '[object APIClient]'

// Utile pour le debugging
const cache = customStringTag(new Map(), 'LRUCache');
console.log(cache.toString()); // '[object LRUCache]'
```

### Symbol.toPrimitive - Contrôle des conversions
```javascript
function implementToPrimitive(obj, converter) {
    obj[Symbol.toPrimitive] = function(hint) {
        if (converter[hint]) {
            return converter[hint].call(this);
        }
        // Fallback par défaut
        if (hint === 'number') return NaN;
        if (hint === 'string') return '[object Object]';
        return true;
    };
    return obj;
}

// Exemple: Money avec conversions intelligentes
const money = implementToPrimitive(
    { amount: 42.50, currency: 'EUR' },
    {
        number() { return this.amount; },
        string() { return `${this.amount.toFixed(2)} ${this.currency}`; },
        default() { return this.amount; }
    }
);

console.log(+money);           // 42.5 (hint: 'number')
console.log(`${money}`);       // '42.50 EUR' (hint: 'string')
console.log(money + 10);       // 52.5 (hint: 'default')
console.log(money > 40);       // true (hint: 'number')

// Exemple: Date personnalisée
const timestamp = implementToPrimitive(
    { date: new Date('2024-01-15'), label: 'Release' },
    {
        number() { return this.date.getTime(); },
        string() { return `${this.label}: ${this.date.toLocaleDateString()}`; },
        default() { return this.date.toISOString(); }
    }
);

console.log(+timestamp);        // 1705276800000
console.log(`Event: ${timestamp}`); // 'Event: Release: 15/01/2024'
```

### createEnum - Enums avec Symbols
```javascript
function createEnum(...values) {
    const enumObj = Object.create(null);

    for (const value of values) {
        const symbol = Symbol(value);
        enumObj[value] = symbol;
        enumObj[symbol] = value; // Reverse mapping
    }

    // Rendre l'enum immuable
    Object.freeze(enumObj);

    return enumObj;
}

// Usage
const Status = createEnum('PENDING', 'ACTIVE', 'COMPLETED', 'CANCELLED');

console.log(Status.PENDING);              // Symbol(PENDING)
console.log(Status[Status.PENDING]);      // 'PENDING'
console.log(Status.PENDING === Status.PENDING); // true
console.log(Status.PENDING === Symbol('PENDING')); // false - unicité

// Utilisation dans du code
function processOrder(status) {
    switch (status) {
        case Status.PENDING:
            return 'Waiting for payment';
        case Status.ACTIVE:
            return 'Processing';
        case Status.COMPLETED:
            return 'Done';
        case Status.CANCELLED:
            return 'Cancelled';
        default:
            throw new Error('Invalid status');
    }
}

processOrder(Status.ACTIVE); // 'Processing'
// processOrder('ACTIVE');   // Error! Les strings ne matchent pas
```

### Symbol.hasInstance - Personnaliser instanceof
```javascript
class Validator {
    static [Symbol.hasInstance](obj) {
        return obj && typeof obj.validate === 'function';
    }
}

const emailValidator = {
    validate(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }
};

const notValidator = {
    check(value) { return true; }
};

console.log(emailValidator instanceof Validator); // true
console.log(notValidator instanceof Validator);   // false

// Exemple: Duck typing avec instanceof
class Iterable {
    static [Symbol.hasInstance](obj) {
        return obj != null && typeof obj[Symbol.iterator] === 'function';
    }
}

console.log([1, 2, 3] instanceof Iterable);     // true
console.log('hello' instanceof Iterable);       // true
console.log(new Set() instanceof Iterable);     // true
console.log({ a: 1 } instanceof Iterable);      // false
```

### Symbol.species - Contrôler les types dérivés
```javascript
class MyArray extends Array {
    // Les méthodes comme map, filter retourneront des Array, pas MyArray
    static get [Symbol.species]() {
        return Array;
    }
}

const myArr = new MyArray(1, 2, 3);
const mapped = myArr.map(x => x * 2);

console.log(myArr instanceof MyArray);   // true
console.log(mapped instanceof MyArray);  // false
console.log(mapped instanceof Array);    // true

// Sans Symbol.species, mapped serait aussi un MyArray
class MyArray2 extends Array {}
const myArr2 = new MyArray2(1, 2, 3);
const mapped2 = myArr2.map(x => x * 2);
console.log(mapped2 instanceof MyArray2); // true
```

### Symbol.isConcatSpreadable
```javascript
const arr = [1, 2, 3];
const pseudoArr = {
    0: 'a',
    1: 'b',
    length: 2,
    [Symbol.isConcatSpreadable]: true
};

console.log(arr.concat(pseudoArr)); // [1, 2, 3, 'a', 'b']

// Désactiver le spread pour un vrai array
const noSpread = [4, 5, 6];
noSpread[Symbol.isConcatSpreadable] = false;

console.log(arr.concat(noSpread)); // [1, 2, 3, [4, 5, 6]]
```

### Cas pratique - Plugin System avec Symbols
```javascript
// Symbols privés pour le système de plugins
const HOOKS = Symbol('hooks');
const PLUGINS = Symbol('plugins');
const CONTEXT = Symbol('context');

function createPluginSystem() {
    const system = {
        [HOOKS]: new Map(),
        [PLUGINS]: new Set(),
        [CONTEXT]: {},

        // API publique
        register(plugin) {
            if (this[PLUGINS].has(plugin.name)) {
                throw new Error(`Plugin ${plugin.name} already registered`);
            }

            this[PLUGINS].add(plugin.name);

            // Enregistrer les hooks du plugin
            if (plugin.hooks) {
                for (const [hookName, handler] of Object.entries(plugin.hooks)) {
                    this.on(hookName, handler);
                }
            }

            // Initialiser le plugin
            if (plugin.init) {
                plugin.init(this[CONTEXT]);
            }

            return this;
        },

        on(hookName, handler) {
            if (!this[HOOKS].has(hookName)) {
                this[HOOKS].set(hookName, []);
            }
            this[HOOKS].get(hookName).push(handler);
            return this;
        },

        async emit(hookName, data) {
            const handlers = this[HOOKS].get(hookName) || [];
            let result = data;

            for (const handler of handlers) {
                result = await handler(result, this[CONTEXT]);
            }

            return result;
        },

        getPlugins() {
            return [...this[PLUGINS]];
        }
    };

    return system;
}

// Usage
const app = createPluginSystem();

const loggingPlugin = {
    name: 'logger',
    hooks: {
        'request': (data) => {
            console.log('Request:', data);
            return data;
        }
    }
};

const authPlugin = {
    name: 'auth',
    init(ctx) {
        ctx.user = null;
    },
    hooks: {
        'request': async (data, ctx) => {
            data.authenticated = ctx.user !== null;
            return data;
        }
    }
};

app.register(loggingPlugin).register(authPlugin);

// Les données internes sont inaccessibles
console.log(app.hooks);    // undefined
console.log(app[HOOKS]);   // Map { ... } - seulement si on a le Symbol
```

## Well-Known Symbols - Référence

| Symbol | Description |
|--------|-------------|
| `Symbol.iterator` | Définit l'itérateur par défaut |
| `Symbol.asyncIterator` | Définit l'itérateur asynchrone |
| `Symbol.toStringTag` | Personnalise `[object Tag]` |
| `Symbol.toPrimitive` | Contrôle la conversion primitive |
| `Symbol.hasInstance` | Personnalise `instanceof` |
| `Symbol.species` | Définit le constructeur pour les méthodes dérivées |
| `Symbol.isConcatSpreadable` | Contrôle le spread dans `concat` |
| `Symbol.match` | Personnalise `String.match()` |
| `Symbol.replace` | Personnalise `String.replace()` |
| `Symbol.search` | Personnalise `String.search()` |
| `Symbol.split` | Personnalise `String.split()` |

## Tests
```bash
node ex19/test.js
```

## Concepts
- Symbol primitives
- Symbol.for() registry
- Well-Known Symbols
- Métaprogrammation du langage
- Duck typing avec Symbols
- Encapsulation avec Symbols
