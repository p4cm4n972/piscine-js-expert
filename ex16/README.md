# Ex16 - Design Patterns OOP

## Objectif
Implémenter les design patterns classiques en JavaScript : Singleton, Factory, Observer, Strategy, Decorator.

## Contexte
Les design patterns sont des solutions éprouvées à des problèmes récurrents. En JavaScript, leur implémentation diffère souvent des langages classiques grâce aux fonctions first-class et aux closures.

## Instructions

### 1. Singleton
Une seule instance possible.

### 2. Factory
Création d'objets sans spécifier la classe exacte.

### 3. Observer
Notification de changements aux abonnés.

### 4. Strategy
Algorithmes interchangeables.

### 5. Decorator
Ajouter des comportements dynamiquement.

## Exemples

### Singleton
```javascript
// Avec closure
const Singleton = (function() {
    let instance;

    function createInstance() {
        return {
            data: [],
            add(item) { this.data.push(item); },
            getAll() { return [...this.data]; }
        };
    }

    return {
        getInstance() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

const s1 = Singleton.getInstance();
const s2 = Singleton.getInstance();
console.log(s1 === s2); // true

// Avec classe ES6
class Database {
    static #instance;

    constructor() {
        if (Database.#instance) {
            return Database.#instance;
        }
        this.connection = null;
        Database.#instance = this;
    }

    connect(url) {
        this.connection = url;
    }
}

const db1 = new Database();
const db2 = new Database();
console.log(db1 === db2); // true
```

### Factory
```javascript
// Simple Factory
function createUser(type, data) {
    const creators = {
        admin: () => ({
            ...data,
            role: 'admin',
            permissions: ['read', 'write', 'delete']
        }),
        editor: () => ({
            ...data,
            role: 'editor',
            permissions: ['read', 'write']
        }),
        viewer: () => ({
            ...data,
            role: 'viewer',
            permissions: ['read']
        })
    };

    if (!creators[type]) {
        throw new Error(`Unknown user type: ${type}`);
    }

    return creators[type]();
}

const admin = createUser('admin', { name: 'Alice' });
const viewer = createUser('viewer', { name: 'Bob' });

// Abstract Factory
function createUIFactory(theme) {
    const themes = {
        dark: {
            createButton: (text) => ({ text, bg: '#333', color: '#fff' }),
            createInput: () => ({ bg: '#222', border: '#444' })
        },
        light: {
            createButton: (text) => ({ text, bg: '#fff', color: '#333' }),
            createInput: () => ({ bg: '#fff', border: '#ccc' })
        }
    };

    return themes[theme];
}

const darkUI = createUIFactory('dark');
const button = darkUI.createButton('Click me');
```

### Observer
```javascript
function createObservable(initialValue) {
    let value = initialValue;
    const observers = new Set();

    return {
        get value() { return value; },
        set value(newValue) {
            const oldValue = value;
            value = newValue;
            observers.forEach(fn => fn(newValue, oldValue));
        },
        subscribe(fn) {
            observers.add(fn);
            return () => observers.delete(fn);
        }
    };
}

const counter = createObservable(0);
const unsubscribe = counter.subscribe((newVal, oldVal) => {
    console.log(`Changed: ${oldVal} → ${newVal}`);
});

counter.value = 1; // Log: Changed: 0 → 1
counter.value = 2; // Log: Changed: 1 → 2
unsubscribe();
counter.value = 3; // (pas de log)
```

### Strategy
```javascript
// Stratégies de validation
const validators = {
    required: (value) => value !== '' && value !== null && value !== undefined,
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    minLength: (min) => (value) => value.length >= min,
    maxLength: (max) => (value) => value.length <= max
};

function createValidator(rules) {
    return function validate(value) {
        const errors = [];
        for (const [name, validator] of Object.entries(rules)) {
            if (!validator(value)) {
                errors.push(name);
            }
        }
        return { valid: errors.length === 0, errors };
    };
}

const emailValidator = createValidator({
    required: validators.required,
    email: validators.email
});

console.log(emailValidator('test@example.com')); // { valid: true, errors: [] }
console.log(emailValidator('invalid'));          // { valid: false, errors: ['email'] }
```

### Decorator
```javascript
// Fonction decorator
function withLogging(fn) {
    return function(...args) {
        console.log(`Calling ${fn.name} with:`, args);
        const result = fn.apply(this, args);
        console.log(`Result:`, result);
        return result;
    };
}

function withTiming(fn) {
    return function(...args) {
        const start = performance.now();
        const result = fn.apply(this, args);
        console.log(`${fn.name} took ${performance.now() - start}ms`);
        return result;
    };
}

// Composition de decorators
function add(a, b) { return a + b; }
const enhancedAdd = withLogging(withTiming(add));
enhancedAdd(2, 3);

// Class decorator (avec Proxy)
function readonly(target) {
    return new Proxy(target, {
        set() {
            throw new Error('Object is read-only');
        }
    });
}

const config = readonly({ apiUrl: 'https://api.example.com' });
// config.apiUrl = 'other'; // Error!
```

## Tests
```bash
node ex16/test.js
```

## Concepts
- Creational patterns
- Structural patterns
- Behavioral patterns
- Composition over inheritance
