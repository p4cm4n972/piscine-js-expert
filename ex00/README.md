# Ex00 - Compose & Pipe

## Objectif
Implémenter les fonctions `compose` et `pipe` pour la composition de fonctions.

## Contexte
En programmation fonctionnelle, la composition de fonctions permet de créer des fonctions complexes à partir de fonctions simples. C'est l'équivalent de l'opérateur `|` (pipe) en shell Unix.

## Instructions

Implémentez deux fonctions :

### `compose(...fns)`
Compose des fonctions de droite à gauche (comme en mathématiques).
```javascript
compose(f, g, h)(x) === f(g(h(x)))
```

### `pipe(...fns)`
Compose des fonctions de gauche à droite (comme un pipe Unix).
```javascript
pipe(f, g, h)(x) === h(g(f(x)))
```

## Contraintes
- Doit gérer un nombre variable de fonctions
- Doit gérer le cas avec 0 fonction (retourner identity)
- Doit être type-safe (gestion d'erreurs si pas une fonction)
- Performance : O(n) où n = nombre de fonctions

## Exemple
```javascript
const add5 = x => x + 5;
const multiply2 = x => x * 2;
const subtract3 = x => x - 3;

const composed = compose(subtract3, multiply2, add5);
console.log(composed(10)); // (10 + 5) * 2 - 3 = 27

const piped = pipe(add5, multiply2, subtract3);
console.log(piped(10)); // (10 + 5) * 2 - 3 = 27
```

## Tests
```bash
node ex00/test.js
```

## Concepts
- Higher-order functions
- Function composition
- Variadic functions (...args)
- Reduce
