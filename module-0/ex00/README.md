# Ex00 - Types & Variables

## Objectif
Maîtriser les types primitifs JavaScript et la déclaration de variables.

## Types Primitifs JavaScript

```javascript
// Number (pas de distinction int/float)
const age = 25;
const price = 19.99;
const negative = -42;

// String
const name = "Alice";
const message = 'Hello';
const template = `Bonjour ${name}`;

// Boolean
const isActive = true;
const isValid = false;

// Undefined (variable déclarée mais non assignée)
let x;
console.log(x); // undefined

// Null (absence intentionnelle de valeur)
const user = null;

// Symbol (valeur unique)
const id = Symbol('id');

// BigInt (très grands nombres)
const big = 9007199254740991n;
```

## var vs let vs const

```javascript
// var : function-scoped, éviter !
var oldWay = 'déprécié';

// let : block-scoped, réassignable
let count = 0;
count = 1; // OK

// const : block-scoped, non réassignable
const PI = 3.14159;
PI = 3; // ❌ Erreur !

// Mais const avec objet/array permet la mutation
const arr = [1, 2, 3];
arr.push(4); // ✅ OK
arr = []; // ❌ Erreur !
```

## Instructions

Implémentez les fonctions suivantes :

### 1. `getType(value)`
Retourne le type de la valeur (string, number, boolean, etc.)

### 2. `convertToNumber(value)`
Convertit une valeur en nombre (gérer les cas impossibles)

### 3. `isStrictEqual(a, b)`
Compare deux valeurs avec === (strict equality)

### 4. `isLooseEqual(a, b)`
Compare deux valeurs avec == (loose equality)

## Tests
```bash
node module-0/ex00/test.js
```

## Concepts
- Types primitifs
- Déclaration de variables
- Type coercion
- Strict vs loose equality
