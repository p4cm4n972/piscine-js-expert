# Ex12 - Proxy & Reflect

## Objectif
Utiliser Proxy pour intercepter et modifier le comportement des objets.

## Instructions

### 1. `createValidator(schema)`
Valide les propriétés d'un objet avec un Proxy.

```javascript
const schema = {
    age: (val) => typeof val === 'number' && val >= 0,
    name: (val) => typeof val === 'string' && val.length > 0
};

const user = createValidator({}, schema);
user.age = 25;    // OK
user.age = -5;    // Throws error
user.name = '';   // Throws error
```

### 2. `createObservable(obj, callback)`
Observe les modifications d'un objet.

```javascript
const data = createObservable({ count: 0 }, (prop, value) => {
    console.log(`${prop} changed to ${value}`);
});

data.count = 5; // Logs: count changed to 5
```

### 3. `createReadOnly(obj)`
Rend un objet immutable via Proxy.

### 4. `createNegativeArray()`
Tableau acceptant les indices négatifs (style Python).

```javascript
const arr = createNegativeArray([1, 2, 3, 4, 5]);
arr[-1]; // 5
arr[-2]; // 4
```

## Tests
```bash
node ex12/test.js
```
