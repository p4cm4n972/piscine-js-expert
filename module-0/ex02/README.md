# Ex02 - Fonctions

## Objectif
Maîtriser les différentes façons de déclarer et utiliser des fonctions.

## Types de fonctions

### Function Declaration
```javascript
function greet(name) {
    return `Hello, ${name}!`;
}
```

### Function Expression
```javascript
const greet = function(name) {
    return `Hello, ${name}!`;
};
```

### Arrow Function
```javascript
const greet = (name) => `Hello, ${name}!`;

// Forme longue
const add = (a, b) => {
    const result = a + b;
    return result;
};
```

### Paramètres par défaut
```javascript
function greet(name = 'Guest') {
    return `Hello, ${name}!`;
}
```

### Rest parameters
```javascript
function sum(...numbers) {
    return numbers.reduce((acc, n) => acc + n, 0);
}
sum(1, 2, 3, 4); // 10
```

## Instructions

### 1. `createGreeter(greeting)`
Retourne une fonction qui salue avec le greeting donné.

### 2. `sumAll(...numbers)`
Additionne tous les arguments.

### 3. `applyOperation(a, b, operation)`
Applique une fonction operation sur a et b.

### 4. `createMultiplier(factor)`
Retourne une fonction qui multiplie par factor (closure!).

## Tests
```bash
node module-0/ex02/test.js
```
