# Ex07 - Generators & Iterators

## Objectif
Maîtriser les generators et le protocole d'itération pour créer des séquences personnalisées et du code asynchrone élégant.

## Contexte
Les generators (function*) sont des fonctions qui peuvent être mises en pause et reprises. Ils permettent de :
- Créer des iterators personnalisés
- Générer des séquences infinies (lazy evaluation)
- Implémenter de l'asynchronisme élégant
- Créer des state machines

## Instructions

Implémentez les fonctions/classes suivantes :

### 1. `range(start, end, step)`
Générateur qui produit une séquence de nombres.

### 2. `fibonacci()`
Générateur infini de nombres de Fibonacci.

### 3. `take(iterator, n)`
Prend les n premiers éléments d'un iterator.

### 4. `map(iterator, fn)`
Map sur un iterator (lazy).

### 5. `filter(iterator, predicate)`
Filter sur un iterator (lazy).

### 6. `zip(...iterators)`
Combine plusieurs iterators.

### 7. Classe `AsyncQueue`
File d'attente asynchrone avec generators.

## Exemples

### range - Séquence de nombres
```javascript
// Équivalent de Python's range()
for (const n of range(0, 10, 2)) {
    console.log(n); // 0, 2, 4, 6, 8
}

// Conversion en tableau
const arr = [...range(1, 5)]; // [1, 2, 3, 4]
```

### fibonacci - Séquence infinie
```javascript
const fib = fibonacci();

console.log(fib.next().value); // 0
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2
console.log(fib.next().value); // 3
console.log(fib.next().value); // 5

// Avec take pour limiter
const first10 = [...take(fibonacci(), 10)];
// [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

### take - Limiter un iterator
```javascript
// Prendre 5 premiers éléments
const iter = range(1, 100);
const first5 = [...take(iter, 5)]; // [1, 2, 3, 4, 5]

// Avec iterator infini
const infiniteOnes = (function*() {
    while (true) yield 1;
})();
const fiveOnes = [...take(infiniteOnes, 5)]; // [1, 1, 1, 1, 1]
```

### map - Transformation lazy
```javascript
const numbers = range(1, 5);
const doubled = map(numbers, x => x * 2);

for (const n of doubled) {
    console.log(n); // 2, 4, 6, 8
}

// Chaînage
const result = [...
    map(
        filter(range(1, 10), x => x % 2 === 0),
        x => x * x
    )
]; // [4, 16, 36, 64]
```

### filter - Filtrage lazy
```javascript
const numbers = range(1, 100);
const evens = filter(numbers, x => x % 2 === 0);
const firstTenEvens = [...take(evens, 10)];
// [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
```

### zip - Combiner iterators
```javascript
const a = range(1, 4);     // 1, 2, 3
const b = ['a', 'b', 'c'];
const c = [true, false, true];

const zipped = [...zip(a, b, c)];
// [[1, 'a', true], [2, 'b', false], [3, 'c', true]]

// S'arrête au plus court
const short = [...zip(range(1, 10), ['a', 'b'])];
// [[1, 'a'], [2, 'b']]
```

### AsyncQueue - File asynchrone
```javascript
const queue = new AsyncQueue();

// Producer
(async () => {
    await queue.enqueue(1);
    await queue.enqueue(2);
    await queue.enqueue(3);
    queue.close();
})();

// Consumer (avec for await)
for await (const item of queue) {
    console.log(item); // 1, 2, 3
}
```

## Cas d'usage réels

### Pagination lazy
```javascript
function* fetchPages(url) {
    let page = 1;
    while (true) {
        const data = yield fetch(`${url}?page=${page}`);
        if (data.length === 0) break;
        yield* data; // Yield each item
        page++;
    }
}

const items = [...take(fetchPages('/api/items'), 50)];
```

### State machine
```javascript
function* trafficLight() {
    while (true) {
        yield 'green';
        yield 'yellow';
        yield 'red';
    }
}

const light = trafficLight();
console.log(light.next().value); // green
console.log(light.next().value); // yellow
console.log(light.next().value); // red
console.log(light.next().value); // green (boucle)
```

### Stream processing
```javascript
function* readLines(filename) {
    // Lit un fichier ligne par ligne (lazy)
    const stream = fs.createReadStream(filename);
    let buffer = '';

    for await (const chunk of stream) {
        buffer += chunk;
        const lines = buffer.split('\n');
        buffer = lines.pop();
        yield* lines;
    }
    if (buffer) yield buffer;
}

// Traite un gros fichier sans tout charger en mémoire
for (const line of readLines('huge-file.txt')) {
    if (line.includes('ERROR')) {
        console.log(line);
    }
}
```

### Data pipeline
```javascript
const pipeline =
    map(
        filter(
            map(range(1, 1000), x => x * x),
            x => x % 2 === 0
        ),
        x => Math.sqrt(x)
    );

const results = [...take(pipeline, 10)];
```

## Protocole Iterator

Un iterator doit implémenter :
```javascript
{
    next() {
        return { value: any, done: boolean };
    }
}
```

Un iterable doit implémenter :
```javascript
{
    [Symbol.iterator]() {
        return iterator;
    }
}
```

## Tests
```bash
node ex07/test.js
```

## Concepts
- Generators (function*)
- yield / yield*
- Iterator protocol
- Iterable protocol
- Lazy evaluation
- for...of loops
- Async iterators (for await...of)

## Bonus
- Implémenter `cycle(iterator)` - Répète infiniment
- Implémenter `chain(...iterators)` - Concatène des iterators
- Implémenter `enumerate(iterator)` - Ajoute des index
- Implémenter un générateur de nombres premiers infini
