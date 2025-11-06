# Ex02 - Memoization

## Objectif
Implémenter une fonction `memoize` pour optimiser les fonctions coûteuses par cache.

## Contexte
La mémoïsation est une technique d'optimisation qui consiste à mettre en cache les résultats d'appels de fonction coûteux. Lorsque la fonction est appelée avec les mêmes arguments, le résultat est récupéré du cache au lieu d'être recalculé.

## Instructions

Implémentez `memoize(fn, options)` qui :
- Cache les résultats des appels de fonction
- Supporte plusieurs arguments
- Supporte un résolveur de clé personnalisé
- Supporte une limite de taille de cache (LRU)
- Expose des méthodes `cache.clear()` et `cache.has()`

## Options
```javascript
{
    resolver: Function,  // Custom key resolver
    maxSize: Number     // Max cache size (LRU eviction)
}
```

## Contraintes
- Le cache doit être attaché à la fonction retournée
- Doit gérer les types de données complexes
- Performance : O(1) pour lookup
- Implémenter LRU (Least Recently Used) si maxSize défini

## Exemples

### Exemple basique
```javascript
function slowFibonacci(n) {
    if (n <= 1) return n;
    return slowFibonacci(n - 1) + slowFibonacci(n - 2);
}

const fastFib = memoize(slowFibonacci);
console.time('first');
fastFib(40); // ~1s
console.timeEnd('first');

console.time('cached');
fastFib(40); // ~0ms (cached!)
console.timeEnd('cached');
```

### Avec plusieurs arguments
```javascript
const sum = (a, b, c) => a + b + c;
const memoizedSum = memoize(sum);

memoizedSum(1, 2, 3); // Calcule
memoizedSum(1, 2, 3); // Cache
memoizedSum(1, 2, 4); // Calcule (args différents)
```

### Avec résolveur personnalisé
```javascript
// Cache uniquement basé sur le premier argument
const getUser = memoize(
    (id, options) => fetchUser(id, options),
    { resolver: (id) => id }
);

getUser(1, { verbose: true });  // Fetch
getUser(1, { verbose: false }); // Cache (même id)
```

### Avec limite de cache (LRU)
```javascript
const expensiveOp = memoize(compute, { maxSize: 3 });

expensiveOp(1); // Cache: [1]
expensiveOp(2); // Cache: [1, 2]
expensiveOp(3); // Cache: [1, 2, 3]
expensiveOp(4); // Cache: [2, 3, 4] (1 évincé - LRU)
```

### API du cache
```javascript
const fn = memoize(x => x * 2);
fn(5); // 10

fn.cache.has([5]); // true
fn.cache.clear();
fn.cache.has([5]); // false
```

## Tests
```bash
node ex02/test.js
```

## Concepts
- Caching
- LRU (Least Recently Used)
- Map/WeakMap
- JSON.stringify pour clés
- Performance optimization
- Trade-offs mémoire/temps

## Bonus
- Implémenter le support de fonctions async
- Implémenter TTL (Time To Live) pour expiration automatique
- Statistiques (hit rate, miss rate)
