# Ex04 - Array Methods (map, filter, reduce)

## Objectif
Maîtriser les méthodes fonctionnelles essentielles des tableaux.

## Les 3 méthodes fondamentales

### map - Transformation
```javascript
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);
// [2, 4, 6]
```

### filter - Filtrage
```javascript
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4]
```

### reduce - Réduction
```javascript
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((acc, n) => acc + n, 0);
// 10
```

## Instructions

### 1. `doubleNumbers(arr)`
Double tous les nombres d'un tableau.

### 2. `filterEven(arr)`
Retourne seulement les nombres pairs.

### 3. `sumArray(arr)`
Somme tous les nombres.

### 4. `getNames(users)`
Extrait les noms d'un tableau d'objets users.

### 5. `countByProperty(arr, prop)`
Compte les occurrences d'une propriété.

## Tests
```bash
node module-0/ex04/test.js
```
