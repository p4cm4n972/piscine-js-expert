# Ex12 - Scope Chain & Lexical Environment

## Objectif
Comprendre en profondeur comment JavaScript résout les variables à travers la chaîne de scopes et les environnements lexicaux.

## Contexte
Chaque fonction en JavaScript crée un **Lexical Environment** qui contient :
- Un **Environment Record** : stocke les variables locales
- Une référence vers le **outer environment** : le scope parent

```javascript
// Visualisation de la scope chain
const global = 'global';

function outer() {
    const outerVar = 'outer';

    function inner() {
        const innerVar = 'inner';
        console.log(innerVar);   // → Environment Record de inner
        console.log(outerVar);   // → outer environment (outer)
        console.log(global);     // → outer environment → global
    }

    inner();
}

// Scope chain de inner():
// inner Environment → outer Environment → Global Environment → null
```

## Instructions

### 1. `createScope(parent)`
Simuler un système de scope avec résolution de variables.

### 2. `analyzeScopes(code)`
Analyser un code et identifier les scopes.

### 3. `findFreeVariables(fn)`
Trouver les variables libres d'une fonction.

### 4. `createSandbox(allowedGlobals)`
Exécuter du code avec un scope global limité.

## Exemples

### createScope - Simulation de scope
```javascript
function createScope(parent = null) {
    const variables = new Map();

    return {
        declare(name, value = undefined) {
            if (variables.has(name)) {
                throw new Error(`Variable '${name}' already declared`);
            }
            variables.set(name, { value });
        },

        assign(name, value) {
            if (variables.has(name)) {
                variables.get(name).value = value;
                return;
            }
            if (parent) {
                parent.assign(name, value);
                return;
            }
            throw new Error(`Variable '${name}' is not defined`);
        },

        lookup(name) {
            if (variables.has(name)) {
                return variables.get(name).value;
            }
            if (parent) {
                return parent.lookup(name);
            }
            throw new Error(`Variable '${name}' is not defined`);
        },

        createChild() {
            return createScope(this);
        }
    };
}

// Usage
const globalScope = createScope();
globalScope.declare('x', 10);

const functionScope = globalScope.createChild();
functionScope.declare('x', 100); // Shadow

console.log(functionScope.lookup('x')); // 100 (local)
```

### Shadowing et Hoisting
```javascript
// Shadowing
let x = 'global';

function shadow() {
    let x = 'local';
    console.log(x); // 'local'
}

// Hoisting avec var
function hoistingExample() {
    console.log(varVariable);    // undefined (hoisted)
    var varVariable = 'var';
}

// Temporal Dead Zone avec let/const
function tdz() {
    // console.log(x); // ReferenceError
    let x = 10;
    console.log(x); // 10
}
```

### Block scope et loops
```javascript
// Problème avec var
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
}
// Output: 3, 3, 3

// Solution avec let
for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
}
// Output: 0, 1, 2
```

### Closure et mémoire
```javascript
// Attention aux références gardées
function createOptimized() {
    const bigData = new Array(1000000);
    const result = process(bigData);
    // bigData peut être garbage collected

    return function() {
        return result; // Seul result est capturé
    };
}
```

## Tests
```bash
node ex12/test.js
```

## Concepts
- Lexical Environment
- Environment Record
- Scope chain
- Hoisting
- Temporal Dead Zone
- Block scope vs function scope
