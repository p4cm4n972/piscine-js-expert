# Ex01 - Curry

## Objectif
Implémenter une fonction `curry` qui transforme une fonction à plusieurs arguments en une séquence de fonctions à un argument.

## Contexte
Le currying est une technique de programmation fonctionnelle qui permet de créer des fonctions partiellement appliquées. C'est très utile pour créer des fonctions réutilisables et composer des fonctions.

## Instructions

Implémentez la fonction `curry(fn)` qui :
- Prend une fonction avec n paramètres
- Retourne une fonction curryfiée
- Peut être appelée avec un ou plusieurs arguments
- Retourne une nouvelle fonction si pas assez d'arguments
- Exécute la fonction originale quand tous les arguments sont fournis

## Contraintes
- Doit supporter les fonctions avec un nombre variable d'arguments
- Doit gérer `fn.length` correctement
- Doit permettre l'application partielle
- Performance optimale

## Exemples
```javascript
// Fonction normale
const add = (a, b, c) => a + b + c;

// Curryfiée
const curriedAdd = curry(add);

// Toutes ces syntaxes doivent fonctionner :
curriedAdd(1)(2)(3);        // 6
curriedAdd(1, 2)(3);        // 6
curriedAdd(1)(2, 3);        // 6
curriedAdd(1, 2, 3);        // 6

// Application partielle
const add5 = curriedAdd(5);
add5(2)(3);                 // 10

const add5and2 = curriedAdd(5, 2);
add5and2(3);                // 10
```

## Cas d'usage réel
```javascript
const map = curry((fn, arr) => arr.map(fn));
const filter = curry((fn, arr) => arr.filter(fn));

// Création de fonctions réutilisables
const double = map(x => x * 2);
const filterEven = filter(x => x % 2 === 0);

double([1, 2, 3]);          // [2, 4, 6]
filterEven([1, 2, 3, 4]);   // [2, 4]

// Composition
const doubleEvens = pipe(filterEven, double);
doubleEvens([1, 2, 3, 4, 5, 6]); // [4, 8, 12]
```

## Tests
```bash
node ex01/test.js
```

## Concepts
- Currying
- Partial application
- Closures
- Function arity (length)
- Rest parameters
