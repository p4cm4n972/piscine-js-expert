# Ex09 - Advanced Closures & Partial Application

## Objectif
Utiliser les closures pour créer des fonctions avancées : once, debounce, throttle, memoize with TTL.

## Instructions

### 1. `once(fn)`
Garantit qu'une fonction n'est appelée qu'une seule fois.

```javascript
let count = 0;
const increment = once(() => count++);
increment(); // count = 1
increment(); // count toujours 1
increment(); // count toujours 1
```

### 2. `after(n, fn)`
N'exécute la fonction qu'après n appels.

```javascript
let result = 0;
const saveAfterThree = after(3, () => { result = 42; });
saveAfterThree(); // rien
saveAfterThree(); // rien
saveAfterThree(); // result = 42
```

### 3. `debounce(fn, delay)`
Retarde l'exécution jusqu'à ce que les appels cessent.

```javascript
const search = debounce((query) => {
    console.log('Searching:', query);
}, 300);

search('a');   // Attend
search('ab');  // Annule précédent, attend
search('abc'); // Annule précédent, attend
// Après 300ms sans nouvel appel : Searching: abc
```

### 4. `throttle(fn, limit)`
Limite la fréquence d'exécution.

```javascript
const logScroll = throttle(() => {
    console.log('Scrolling...');
}, 1000);

// Appelé très souvent, mais ne log que toutes les 1000ms
window.addEventListener('scroll', logScroll);
```

### 5. `partial(fn, ...partialArgs)`
Application partielle d'arguments.

```javascript
const add = (a, b, c) => a + b + c;
const add5 = partial(add, 5);
add5(2, 3); // 10

const greet = (greeting, name) => `${greeting}, ${name}!`;
const sayHello = partial(greet, 'Hello');
sayHello('Alice'); // 'Hello, Alice!'
```

## Tests
```bash
node ex09/test.js
```
