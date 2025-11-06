# Ex05 - Promise Implementation

## Objectif
Implémenter votre propre version de Promise pour comprendre en profondeur le fonctionnement de l'asynchronisme en JavaScript.

## Contexte
Les Promises sont au cœur de l'asynchronisme moderne en JavaScript. En implémentant votre propre Promise (conforme à la spécification Promises/A+), vous comprendrez :
- L'event loop
- Les microtasks
- Le chaînage asynchrone
- La gestion d'erreurs asynchrone

## Instructions

Implémentez une classe `MyPromise` avec :

### Constructeur
```javascript
new MyPromise((resolve, reject) => {
    // executor function
})
```

### Méthodes d'instance
- `then(onFulfilled, onRejected)` - Chaînage
- `catch(onRejected)` - Gestion d'erreurs
- `finally(onFinally)` - Nettoyage

### Méthodes statiques
- `MyPromise.resolve(value)` - Crée une promise résolue
- `MyPromise.reject(reason)` - Crée une promise rejetée
- `MyPromise.all(promises)` - Attend toutes les promises
- `MyPromise.race(promises)` - Première promise terminée
- `MyPromise.allSettled(promises)` - Attend toutes (succès ou échec)

## Contraintes
- États : pending, fulfilled, rejected
- Une promise ne peut changer d'état qu'une seule fois
- Les handlers then/catch doivent être appelés de manière asynchrone (microtask)
- Support du chaînage avec return de valeur ou promise
- Gestion correcte des erreurs (throw dans then)

## États d'une Promise

```
        pending
         /    \
        /      \
   fulfilled  rejected
```

Une fois fulfilled ou rejected, l'état est **immutable**.

## Exemples

### Basique
```javascript
const promise = new MyPromise((resolve, reject) => {
    setTimeout(() => resolve(42), 1000);
});

promise.then(value => {
    console.log(value); // 42 (après 1s)
});
```

### Chaînage
```javascript
new MyPromise((resolve) => resolve(5))
    .then(x => x * 2)           // 10
    .then(x => x + 3)           // 13
    .then(x => console.log(x)); // 13
```

### Chaînage avec Promise
```javascript
new MyPromise((resolve) => resolve(5))
    .then(x => new MyPromise(resolve => {
        setTimeout(() => resolve(x * 2), 100);
    }))
    .then(x => console.log(x)); // 10 (après 100ms)
```

### Gestion d'erreurs
```javascript
new MyPromise((resolve, reject) => {
    reject('Error!');
})
.then(x => console.log('Success:', x))
.catch(err => console.log('Caught:', err)); // Caught: Error!
```

### Promise.all
```javascript
MyPromise.all([
    MyPromise.resolve(1),
    MyPromise.resolve(2),
    MyPromise.resolve(3)
])
.then(values => console.log(values)); // [1, 2, 3]
```

### Promise.race
```javascript
MyPromise.race([
    new MyPromise(resolve => setTimeout(() => resolve('slow'), 100)),
    new MyPromise(resolve => setTimeout(() => resolve('fast'), 50))
])
.then(value => console.log(value)); // 'fast'
```

## Spécification Promises/A+

Points clés à respecter :
1. Une promise peut être dans 3 états : pending, fulfilled, rejected
2. `then` retourne toujours une nouvelle promise
3. Les callbacks sont appelés de manière asynchrone (microtask queue)
4. Si `then` retourne une promise, la chaîne attend sa résolution
5. Les erreurs dans les callbacks sont propagées

## Tests
```bash
node ex05/test.js
```

## Concepts
- Event loop
- Microtasks vs Macrotasks
- Promise states
- Thenable protocol
- Asynchronous error handling

## Bonus
- Implémenter `MyPromise.any()` (ES2021)
- Implémenter la détection de cycles (promise qui se résout avec elle-même)
- Optimiser avec queueMicrotask() ou process.nextTick()
