# Ex20 - Generators & Iterators

## Objectif
Maîtriser les générateurs et le protocole d'itération pour créer des séquences lazy (paresseuses), gérer des flux de données complexes et implémenter des patterns de contrôle de flux.

## Contexte
Les générateurs sont des fonctions qui peuvent être pausées et reprises. Combinés avec le protocole d'itération, ils permettent de créer des séquences infinies, du lazy evaluation (évaluation paresseuse), et des patterns de coroutines.

```javascript
// Générateur basique
function* countUp() {
    let i = 0;
    while (true) {
        yield i++;  // Pause et retourne la valeur
    }
}

const counter = countUp();
console.log(counter.next().value); // 0
console.log(counter.next().value); // 1
console.log(counter.next().value); // 2
// Lazy: les valeurs sont calculées à la demande!
```

## Instructions

### 1. `range(start, end, step)`
Générateur de plages numériques.

### 2. `take(iterable, n)`
Prendre les n premiers éléments d'un itérable.

### 3. `map(iterable, fn)` / `filter(iterable, predicate)`
Transformations lazy sur itérables.

### 4. `flatten(iterable, depth)`
Aplatir des structures imbriquées.

### 5. `createPipeline(...transforms)`
Composer des transformations lazy.

## Exemples

### Iterator Protocol
```javascript
// Un objet est itérable s'il a une méthode [Symbol.iterator]
// qui retourne un objet avec une méthode next()

// Itérateur manuel
const myIterator = {
    current: 0,
    last: 5,

    next() {
        if (this.current <= this.last) {
            return { value: this.current++, done: false };
        }
        return { value: undefined, done: true };
    }
};

// Objet itérable
const myIterable = {
    [Symbol.iterator]() {
        return {
            current: 0,
            last: 5,
            next() {
                if (this.current <= this.last) {
                    return { value: this.current++, done: false };
                }
                return { value: undefined, done: true };
            }
        };
    }
};

for (const n of myIterable) {
    console.log(n); // 0, 1, 2, 3, 4, 5
}
```

### Générateurs - Syntaxe de base
```javascript
// function* crée un générateur
function* simpleGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

const gen = simpleGenerator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }

// Spread operator et for...of fonctionnent
console.log([...simpleGenerator()]); // [1, 2, 3]

// yield* délègue à un autre itérable
function* delegating() {
    yield* [1, 2, 3];
    yield* 'abc';
    yield* new Set([4, 5]);
}
console.log([...delegating()]); // [1, 2, 3, 'a', 'b', 'c', 4, 5]
```

### range - Générateur de plages
```javascript
function* range(start, end, step = 1) {
    if (step === 0) throw new Error('Step cannot be zero');

    if (step > 0) {
        for (let i = start; i <= end; i += step) {
            yield i;
        }
    } else {
        for (let i = start; i >= end; i += step) {
            yield i;
        }
    }
}

// Usage
console.log([...range(1, 5)]);      // [1, 2, 3, 4, 5]
console.log([...range(0, 10, 2)]);  // [0, 2, 4, 6, 8, 10]
console.log([...range(5, 1, -1)]);  // [5, 4, 3, 2, 1]

// Lazy evaluation - pas de problème mémoire!
for (const n of range(1, 1000000)) {
    if (n > 5) break;  // On arrête tôt
    console.log(n);
}
```

### take - Limiter les éléments
```javascript
function* take(iterable, n) {
    let count = 0;
    for (const item of iterable) {
        if (count >= n) return;
        yield item;
        count++;
    }
}

// Séquence infinie
function* naturals() {
    let n = 0;
    while (true) yield n++;
}

// Prendre les 5 premiers
console.log([...take(naturals(), 5)]); // [0, 1, 2, 3, 4]

// Combiner avec range
console.log([...take(range(100, 1000), 3)]); // [100, 101, 102]
```

### map, filter, reduce - Lazy operations
```javascript
function* map(iterable, fn) {
    for (const item of iterable) {
        yield fn(item);
    }
}

function* filter(iterable, predicate) {
    for (const item of iterable) {
        if (predicate(item)) {
            yield item;
        }
    }
}

// reduce n'est pas lazy mais consomme un itérable
function reduce(iterable, fn, initial) {
    let acc = initial;
    let first = initial === undefined;

    for (const item of iterable) {
        if (first) {
            acc = item;
            first = false;
        } else {
            acc = fn(acc, item);
        }
    }
    return acc;
}

// Usage - chaînage lazy
const result = reduce(
    filter(
        map(range(1, 100), x => x * 2),  // [2, 4, 6, ..., 200]
        x => x > 50 && x < 100           // [52, 54, ..., 98]
    ),
    (a, b) => a + b,
    0
);
console.log(result); // 1800

// Aucun tableau intermédiaire n'est créé!
```

### flatten - Aplatir les structures
```javascript
function* flatten(iterable, depth = 1) {
    for (const item of iterable) {
        if (depth > 0 && item?.[Symbol.iterator] && typeof item !== 'string') {
            yield* flatten(item, depth - 1);
        } else {
            yield item;
        }
    }
}

const nested = [[1, 2], [3, [4, 5]], [6]];

console.log([...flatten(nested)]);      // [1, 2, 3, [4, 5], 6]
console.log([...flatten(nested, 2)]);   // [1, 2, 3, 4, 5, 6]
console.log([...flatten(nested, Infinity)]); // [1, 2, 3, 4, 5, 6]

// Avec générateurs imbriqués
function* nestedGen() {
    yield* [1, 2];
    yield [3, 4];
    yield* function* () {
        yield 5;
        yield [6, 7];
    }();
}

console.log([...flatten(nestedGen(), 2)]); // [1, 2, 3, 4, 5, 6, 7]
```

### createPipeline - Composition lazy
```javascript
function createPipeline(...transforms) {
    return function* (iterable) {
        let result = iterable;

        for (const transform of transforms) {
            result = transform(result);
        }

        yield* result;
    };
}

// Helpers pour le pipeline
const double = (iter) => map(iter, x => x * 2);
const onlyEven = (iter) => filter(iter, x => x % 2 === 0);
const firstN = (n) => (iter) => take(iter, n);

// Créer un pipeline
const pipeline = createPipeline(
    double,           // x => x * 2
    onlyEven,         // garder les pairs
    double,           // x => x * 2
    firstN(5)         // prendre 5
);

console.log([...pipeline(range(1, 100))]);
// [8, 16, 24, 32, 40]
// Explication: 1*2=2(pair)*2=8, 2*2=4(pair)*2=16, etc.
```

### Communication bidirectionnelle
```javascript
// next() peut envoyer une valeur AU générateur
function* conversation() {
    const name = yield 'What is your name?';
    const age = yield `Hello ${name}! How old are you?`;
    return `${name} is ${age} years old`;
}

const talk = conversation();
console.log(talk.next().value);      // 'What is your name?'
console.log(talk.next('Alice').value); // 'Hello Alice! How old are you?'
console.log(talk.next(30).value);    // 'Alice is 30 years old'

// Exemple: Accumulator
function* accumulator(initial = 0) {
    let total = initial;
    while (true) {
        const value = yield total;
        if (value === null) return total; // return pour terminer
        total += value;
    }
}

const acc = accumulator(10);
console.log(acc.next().value);   // 10
console.log(acc.next(5).value);  // 15
console.log(acc.next(3).value);  // 18
console.log(acc.next(null));     // { value: 18, done: true }
```

### Async Generators
```javascript
// async function* pour les séquences asynchrones
async function* fetchPages(baseUrl, maxPages) {
    for (let page = 1; page <= maxPages; page++) {
        const response = await fetch(`${baseUrl}?page=${page}`);
        const data = await response.json();

        if (data.length === 0) return; // Plus de données

        yield data;
    }
}

// Utilisation avec for await...of
async function processAllPages() {
    for await (const pageData of fetchPages('/api/items', 10)) {
        console.log('Processing page:', pageData.length, 'items');
    }
}

// Async take
async function* asyncTake(asyncIterable, n) {
    let count = 0;
    for await (const item of asyncIterable) {
        if (count >= n) return;
        yield item;
        count++;
    }
}
```

### Générateur comme State Machine
```javascript
function* trafficLight() {
    while (true) {
        yield 'red';
        yield 'green';
        yield 'yellow';
    }
}

const light = trafficLight();
console.log(light.next().value); // 'red'
console.log(light.next().value); // 'green'
console.log(light.next().value); // 'yellow'
console.log(light.next().value); // 'red'

// State machine plus complexe
function* orderStateMachine() {
    let state = 'created';

    while (state !== 'completed' && state !== 'cancelled') {
        const action = yield state;

        switch (state) {
            case 'created':
                if (action === 'PAY') state = 'paid';
                else if (action === 'CANCEL') state = 'cancelled';
                break;
            case 'paid':
                if (action === 'SHIP') state = 'shipped';
                else if (action === 'REFUND') state = 'cancelled';
                break;
            case 'shipped':
                if (action === 'DELIVER') state = 'completed';
                break;
        }
    }

    return state;
}

const order = orderStateMachine();
console.log(order.next().value);      // 'created'
console.log(order.next('PAY').value); // 'paid'
console.log(order.next('SHIP').value); // 'shipped'
console.log(order.next('DELIVER'));   // { value: 'completed', done: true }
```

### Tree Traversal avec Generators
```javascript
function* preOrder(node) {
    if (!node) return;
    yield node.value;
    yield* preOrder(node.left);
    yield* preOrder(node.right);
}

function* inOrder(node) {
    if (!node) return;
    yield* inOrder(node.left);
    yield node.value;
    yield* inOrder(node.right);
}

function* postOrder(node) {
    if (!node) return;
    yield* postOrder(node.left);
    yield* postOrder(node.right);
    yield node.value;
}

function* bfs(root) {
    const queue = [root];
    while (queue.length > 0) {
        const node = queue.shift();
        if (!node) continue;
        yield node.value;
        queue.push(node.left, node.right);
    }
}

// Usage
const tree = {
    value: 1,
    left: {
        value: 2,
        left: { value: 4 },
        right: { value: 5 }
    },
    right: {
        value: 3,
        left: { value: 6 },
        right: { value: 7 }
    }
};

console.log([...preOrder(tree)]);  // [1, 2, 4, 5, 3, 6, 7]
console.log([...inOrder(tree)]);   // [4, 2, 5, 1, 6, 3, 7]
console.log([...bfs(tree)]);       // [1, 2, 3, 4, 5, 6, 7]
```

### Séquences infinies utiles
```javascript
// Fibonacci infini
function* fibonacci() {
    let [a, b] = [0, 1];
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

console.log([...take(fibonacci(), 10)]);
// [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

// Nombres premiers (crible paresseux)
function* primes() {
    const seen = [];
    let n = 2;

    while (true) {
        if (seen.every(p => n % p !== 0)) {
            seen.push(n);
            yield n;
        }
        n++;
    }
}

console.log([...take(primes(), 10)]);
// [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]

// Cycle infini
function* cycle(iterable) {
    const saved = [];
    for (const item of iterable) {
        saved.push(item);
        yield item;
    }
    while (true) {
        yield* saved;
    }
}

console.log([...take(cycle(['a', 'b', 'c']), 7)]);
// ['a', 'b', 'c', 'a', 'b', 'c', 'a']
```

## Tests
```bash
node ex20/test.js
```

## Concepts
- Iterator Protocol
- Generator functions (function*)
- yield et yield*
- Lazy evaluation
- Async generators
- Coroutines
- Bidirectional communication
- Séquences infinies
