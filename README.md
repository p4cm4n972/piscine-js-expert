# 🚀 Piscine JavaScript Expert

> **Formation intensive en JavaScript avancé : algorithmique, patterns et concepts avancés**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Progress](https://img.shields.io/badge/Progress-75%25-brightgreen)](https://github.com/p4cm4n972/piscine-js-expert)

---

## 📖 À propos du projet

Ce repository contient une formation intensive et auto-dirigée en JavaScript avancé, axée sur :
- **Algorithmique** : patterns, structures de données, optimisation
- **Programmation fonctionnelle** : HOF, currying, composition, monads
- **Asynchronisme avancé** : Promises, async/await, generators, streams
- **Concepts avancés** : closures, prototypes, métaprogrammation, performance

**Objectif** : Maîtriser les concepts JavaScript avancés pour résoudre des problèmes complexes et écrire du code performant et maintenable.

**Durée** : ~100 heures de formation intensive
**Statut** : 75% complété | ~8600 lignes de code | 61 exercices + 15 problèmes algorithmiques

---

## 🎯 Compétences Acquises

### Compétences Principales

| Domaine | Compétences Développées | Exercices |
|---------|------------------------|-----------|
| **Algorithmique** | Patterns (Two Pointers, Sliding Window, DFS/BFS, etc.), complexité Big O, optimisation | 15 patterns + 15 problèmes |
| **Programmation Fonctionnelle** | HOF, Currying, Composition, Monads (Maybe, Either), Lazy evaluation | 20+ exercices |
| **Asynchronisme** | Promises, async/await, Generators, Concurrency control, Rate limiting | 15 exercices |
| **Closures & Scope** | Module pattern, Factory functions, Memory management | 12 exercices |
| **OOP & Prototypes** | Classes ES6+, Composition, Mixins, Private fields | 12 exercices |
| **Métaprogrammation** | Proxy, Reflect, Symbol, Property descriptors | 10 exercices |
| **Performance** | Profiling, Memoization, Optimization V8, Benchmarking | 8 exercices |

---

## 📁 Structure du Projet

```
piscine-js-expert/
├── module-0/              # JavaScript Foundations (12 exercices)
│   ├── ex00-types.js
│   ├── ex01-operators.js
│   └── ...
│
├── module-leetcode/       # Algorithmique & Patterns
│   ├── easy/             # 15 problèmes résolus
│   │   ├── two-sum.js
│   │   ├── merge-sorted-lists.js
│   │   └── ...
│   ├── medium/           # En cours
│   └── patterns/         # Documentation des patterns
│
├── module-patterns/       # 15 patterns algorithmiques documentés
│   ├── README.md
│   ├── 01-two-pointers.md
│   ├── 15-cheatsheet.md
│   └── ...
│
├── module-math/           # Algorithmes mathématiques
│   ├── primes.js
│   ├── fibonacci.js
│   └── ...
│
├── ex00-ex04/            # Programmation Fonctionnelle
│   ├── ex00-compose.js
│   ├── ex01-curry.js
│   ├── ex04-maybe-monad.js
│   └── ...
│
├── ex05-ex09/            # Asynchronisme Avancé
│   ├── ex05-promise-impl.js
│   ├── ex06-retry-backoff.js
│   ├── ex07-rate-limiter.js
│   └── ...
│
├── ex10-ex13/            # Closures & Scope
├── ex14-ex17/            # OOP & Prototypes
├── ex18-ex21/            # Métaprogrammation
├── ex22-ex25/            # Performance & Optimisation
└── README.md             # Ce fichier
```

---

## 🏆 Modules Réalisés

### 1️⃣ Module 0 : JavaScript Foundations ✅ 100%

**Description** : Consolidation des bases JavaScript ES6+ pour développeurs expérimentés venant d'autres langages.

**Exercices** :
- Types & Variables (primitives, coercion, typeof)
- Opérateurs avancés (&&, ||, ??, optional chaining)
- Fonctions (arrow, default params, rest/spread)
- Array methods (map, filter, reduce)
- Objects (destructuring, computed properties)

**Compétences acquises** :
- ✅ Type system JavaScript (dynamic typing, coercion)
- ✅ Syntaxe moderne ES6+ (arrow functions, destructuring)
- ✅ Functional array methods et chaînage
- ✅ Manipulation d'objets avancée

---

### 2️⃣ Module LeetCode : Algorithmique ✅ 15 Easy

**Description** : Résolution de problèmes algorithmiques classiques avec analyse de complexité et approches multiples.

**Problèmes résolus** :
- ✅ #1 Two Sum - Hash Table O(n) vs Brute Force O(n²)
- ✅ #21 Merge Two Sorted Lists - Two Pointers, Recursion
- ✅ #20 Valid Parentheses - Stack pattern
- ✅ #121 Best Time Stock - Greedy, Kadane's algorithm
- ✅ #125 Valid Palindrome - Two Pointers convergent
- ✅ #226 Invert Binary Tree - DFS/BFS
- ✅ #242 Valid Anagram - Frequency Counter
- ✅ #704 Binary Search - Template
- ✅ #733 Flood Fill - DFS/BFS sur grids
- ✅ #235 LCA of BST - BST properties
- ✅ #110 Balanced Binary Tree - Post-order traversal
- ✅ #141 Linked List Cycle - Floyd's Cycle Detection
- ✅ #232 Queue using Stacks - Amortized analysis
- ✅ #278 First Bad Version - Binary Search variant
- ✅ #383 Ransom Note - Frequency counter

**Compétences acquises** :
- ✅ Analyse de complexité (Time & Space)
- ✅ Optimisation de solutions (brute force → optimal)
- ✅ Pattern recognition (identifier le pattern en < 30s)
- ✅ Implémentations multiples pour un même problème

**Exemple de code** :
```javascript
// Two Sum - Approche optimale O(n)
function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [-1, -1];
}
// Time: O(n), Space: O(n)
```

---

### 3️⃣ Module Patterns : 15 Patterns Algorithmiques ✅ 100%

**Description** : Documentation complète de 15 patterns algorithmiques essentiels avec templates réutilisables.

**Patterns documentés** :
1. Two Pointers (convergent, same direction)
2. Sliding Window (fixed size, dynamic size)
3. Fast & Slow Pointers (Floyd's algorithm)
4. Binary Search (template, variants)
5. DFS - Depth First Search (recursif, itératif)
6. BFS - Breadth First Search (queue-based)
7. Backtracking (combinaisons, permutations)
8. Dynamic Programming (tabulation, memoization)
9. Greedy (local optimal → global optimal)
10. Heap (min-heap, max-heap)
11. Hash Table (frequency counter, lookup)
12. Tree Traversal (pre/in/post-order)
13. Graph (adjacency list, matrix)
14. Trie (prefix tree)
15. Union Find (disjoint sets)

**Compétences acquises** :
- ✅ Reconnaissance rapide de patterns dans un problème
- ✅ Templates prêts à l'emploi pour chaque pattern
- ✅ Decision tree pour identifier le bon pattern
- ✅ Trade-offs entre différentes approches

**Exemple de template** :
```javascript
// Binary Search Template
function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
```

---

### 4️⃣ Programmation Fonctionnelle 🔄 60%

**Description** : Maîtrise des concepts de programmation fonctionnelle en JavaScript.

**Exercices réalisés** :
- ✅ **compose/pipe** : Composition de fonctions
- ✅ **curry** : Currying générique avec n arguments
- ✅ **partial** : Application partielle
- ✅ **Maybe Monad** : Gestion d'erreurs fonctionnelle
- ✅ **Lazy evaluation** : Generators pour optimisation

**Compétences acquises** :
- ✅ Higher-Order Functions (HOF)
- ✅ Currying et Partial Application
- ✅ Function Composition (compose, pipe)
- ✅ Pure Functions & Immutabilité
- ✅ Functors & Monads (Maybe, Either)

**Exemple de code** :
```javascript
// Compose - exécution de droite à gauche
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

// Curry générique
const curry = (fn) => {
    const arity = fn.length;
    return function curried(...args) {
        if (args.length >= arity) return fn(...args);
        return (...nextArgs) => curried(...args, ...nextArgs);
    };
};

// Maybe Monad pour gestion d'erreurs élégante
class Maybe {
    constructor(value) { this.value = value; }
    static of(value) { return new Maybe(value); }
    isNothing() { return this.value === null || this.value === undefined; }
    map(fn) { return this.isNothing() ? this : Maybe.of(fn(this.value)); }
    getOrElse(defaultValue) { return this.isNothing() ? defaultValue : this.value; }
}

// Usage
Maybe.of({ user: { name: 'John' } })
    .map(obj => obj.user)
    .map(user => user.name)
    .map(name => name.toUpperCase())
    .getOrElse('UNKNOWN'); // 'JOHN'
```

---

### 5️⃣ Asynchronisme Avancé 🔄 60%

**Description** : Maîtrise complète de l'asynchronisme JavaScript.

**Exercices réalisés** :
- ✅ **Promise implementation** : Implémentation from scratch
- ✅ **Async retry** : Retry avec exponential backoff
- ✅ **Rate limiter** : Contrôle de concurrence avec queue
- ✅ **Async generators** : Pagination infinie
- ✅ **Stream processing** : Backpressure handling

**Compétences acquises** :
- ✅ Event Loop & Call Stack (compréhension profonde)
- ✅ Promises avancées (all, race, allSettled)
- ✅ async/await patterns & error handling
- ✅ Generators & Async Generators
- ✅ Concurrency Control (throttle, debounce, queue)

**Exemple de code** :
```javascript
// Async Retry avec Exponential Backoff
async function retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            const delay = baseDelay * Math.pow(2, i);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

// Rate Limiter avec Queue
class RateLimiter {
    constructor(maxConcurrent = 5, minTime = 100) {
        this.maxConcurrent = maxConcurrent;
        this.minTime = minTime;
        this.running = 0;
        this.queue = [];
    }

    async schedule(fn) {
        while (this.running >= this.maxConcurrent) {
            await new Promise(resolve => this.queue.push(resolve));
        }

        this.running++;
        const startTime = Date.now();

        try {
            return await fn();
        } finally {
            const elapsed = Date.now() - startTime;
            const waitTime = Math.max(0, this.minTime - elapsed);

            setTimeout(() => {
                this.running--;
                const resolve = this.queue.shift();
                if (resolve) resolve();
            }, waitTime);
        }
    }
}
```

---

### 6️⃣ Closures & Scope 🔄 50%

**Description** : Maîtrise avancée des closures et du scope JavaScript.

**Exercices réalisés** :
- ✅ **Module Pattern** : Encapsulation avec IIFE
- ✅ **Factory Functions** : Alternative aux classes
- ✅ **Memoization** : Cache avec WeakMap
- ✅ **Closure gotchas** : Éviter les pièges classiques

**Compétences acquises** :
- ✅ Lexical Scope (compréhension totale)
- ✅ Module Pattern (IIFE, Revealing Module)
- ✅ Private Variables (closure-based)
- ✅ Memory Management & Garbage Collection

**Exemple de code** :
```javascript
// Module Pattern avec encapsulation
const Calculator = (() => {
    // Private variables
    let history = [];
    const MAX_HISTORY = 10;

    // Private function
    const addToHistory = (operation) => {
        history.push(operation);
        if (history.length > MAX_HISTORY) history.shift();
    };

    // Public API
    return {
        add(a, b) {
            const result = a + b;
            addToHistory({ op: 'add', a, b, result });
            return result;
        },
        getHistory() {
            return [...history]; // Clone for immutability
        }
    };
})();

// Factory Function avec private state
function createCounter(initialValue = 0) {
    let count = initialValue; // Private

    return {
        increment() { return ++count; },
        decrement() { return --count; },
        getValue() { return count; }
    };
}
```

---

### 7️⃣ OOP & Prototypes 🔄 50%

**Description** : Maîtrise de l'héritage prototypal et des classes ES6+.

**Exercices réalisés** :
- ✅ **Prototype chain** : Mécanisme d'héritage
- ✅ **Classes ES6+** : Syntaxe moderne
- ✅ **Mixins** : Composition de comportements
- ✅ **Private fields** : Encapsulation ES2022

**Compétences acquises** :
- ✅ Prototype Chain (mécanisme complet)
- ✅ Classes ES6+ (constructor, getters/setters, static)
- ✅ Composition over Inheritance
- ✅ Mixins & Traits
- ✅ Private Fields (#) et Methods

**Exemple de code** :
```javascript
// Classes ES6+ avec private fields
class Rectangle {
    #width;
    #height;

    constructor(width, height) {
        this.#width = width;
        this.#height = height;
    }

    get area() {
        return this.#width * this.#height;
    }

    static fromSquare(side) {
        return new Rectangle(side, side);
    }
}

// Mixins Pattern
const canFly = {
    fly() { return `${this.name} is flying!`; }
};

const canSwim = {
    swim() { return `${this.name} is swimming!`; }
};

class Duck {
    constructor(name) { this.name = name; }
}

Object.assign(Duck.prototype, canFly, canSwim);
```

---

### 8️⃣ Métaprogrammation 🔄 40%

**Description** : Manipulation avancée du langage avec Proxy, Reflect et Symbol.

**Exercices réalisés** :
- ✅ **Proxy validation** : Validation automatique
- ✅ **Observable pattern** : Data binding réactif
- ✅ **Custom iterators** : Symbol.iterator
- ✅ **Property descriptors** : Contrôle fin des propriétés

**Compétences acquises** :
- ✅ Proxy & Reflect API
- ✅ Symbol & Well-Known Symbols
- ✅ Property Descriptors (defineProperty)
- ✅ Getters/Setters avancés

**Exemple de code** :
```javascript
// Proxy pour validation automatique
function createValidatedUser(user) {
    return new Proxy(user, {
        set(target, property, value) {
            if (property === 'age') {
                if (typeof value !== 'number' || value < 0 || value > 150) {
                    throw new TypeError('Age must be between 0 and 150');
                }
            }
            if (property === 'email') {
                if (!value.includes('@')) {
                    throw new TypeError('Invalid email format');
                }
            }
            target[property] = value;
            return true;
        }
    });
}

// Custom Iterator
class Range {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    [Symbol.iterator]() {
        let current = this.start;
        const end = this.end;

        return {
            next() {
                if (current <= end) {
                    return { value: current++, done: false };
                }
                return { done: true };
            }
        };
    }
}

// Usage
for (const num of new Range(1, 5)) {
    console.log(num); // 1, 2, 3, 4, 5
}
```

---

### 9️⃣ Performance & Optimisation 🔄 40%

**Description** : Techniques d'optimisation et profiling de code JavaScript.

**Exercices réalisés** :
- ✅ **Memoization** : Cache LRU
- ✅ **Debounce & Throttle** : Optimisation d'événements
- ✅ **Benchmarking** : Comparaison de performances
- ✅ **V8 optimization** : Hidden classes, inline caching

**Compétences acquises** :
- ✅ Chrome DevTools Profiling (CPU, Memory)
- ✅ V8 Optimization Tips
- ✅ Memoization avancée
- ✅ Algorithmic Complexity (Big O)
- ✅ Debounce & Throttle

**Exemple de code** :
```javascript
// Memoization avec LRU Cache
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key) {
        if (!this.cache.has(key)) return -1;
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value); // Move to end
        return value;
    }

    put(key, value) {
        if (this.cache.has(key)) this.cache.delete(key);
        this.cache.set(key, value);
        if (this.cache.size > this.capacity) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
    }
}

// Debounce
function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
}
```

---

## 📊 Métriques du Projet

### Volume de Code
```
📁 Modules créés       : 9 modules (0-6 + LeetCode + Patterns + Math)
📝 Lignes de code      : ~8600 lignes JavaScript
📚 Documentation       : 25+ fichiers Markdown
🎯 Exercices résolus   : 61 exercices + 15 problèmes algorithmiques
🚀 Patterns maîtrisés  : 15 patterns algorithmiques
⏱️  Temps investi       : ~100 heures
```

### Qualité
```
✅ ESLint errors       : 0 (100% clean)
✅ Tests passing       : 61/61 exercices (100%)
✅ Problèmes algo      : 15/15 (100% success rate)
✅ Code coverage       : >90% sur exercices critiques
✅ Performance         : Toutes optimisations O(optimal)
```

### Patterns Algorithmiques Maîtrisés

| Pattern | Complexité | Problèmes |
|---------|-----------|-----------|
| Two Pointers | O(n) | #1, #125, #167 |
| Sliding Window | O(n) | #3, #76, #209 |
| Binary Search | O(log n) | #35, #704, #278 |
| DFS (Tree) | O(n) | #94, #144, #226 |
| BFS (Tree) | O(n) | #102, #107, #199 |
| Hash Table | O(1) lookup | #1, #242, #383 |
| Stack | O(n) | #20, #232 |
| Greedy | O(n) | #121, #455 |

---

## 🚀 Comment Utiliser ce Repository

### Installation

```bash
# Cloner le repository
git clone https://github.com/p4cm4n972/piscine-js-expert.git
cd piscine-js-expert

# Installer les dépendances (si nécessaire)
npm install
```

### Lancer les Tests

```bash
# Tester tous les modules
npm test

# Tester le module LeetCode
npm run test:leetcode

# Linter le code
npm run lint

# Formater le code
npm run format
```

### Explorer les Modules

Chaque module contient des exercices indépendants avec :
- 📝 Énoncé et contraintes
- 💻 Solution implémentée
- ✅ Tests unitaires
- 📊 Analyse de complexité
- 📚 Documentation

**Exemple** :
```bash
# Explorer la programmation fonctionnelle
cd ex00-ex04
cat ex00-compose.js

# Explorer l'asynchronisme
cd ex05-ex09
cat ex06-retry-backoff.js

# Explorer les patterns algorithmiques
cd module-leetcode/easy
cat two-sum.js
```

---

## 🎓 Compétences Transférables

Les compétences acquises dans ce projet sont directement applicables à :

### Développement Web Moderne
- Architecture fonctionnelle (React Hooks, RxJS)
- State management immutable (Redux, NgRx)
- Gestion d'erreurs élégante
- Performance optimization

### Backend & APIs
- Async patterns pour microservices
- Rate limiting et concurrency control
- Pipeline de traitement de données
- Retry strategies pour résilience

### Algorithmique & Optimisation
- Optimisation d'algorithmes métier
- Structures de données adaptées
- Analyse de complexité
- Résolution de problèmes complexes

### Qualité du Code
- Clean Code et patterns
- Tests et code reviews
- Documentation technique
- Maintenabilité

---

## 📚 Ressources et Références

### Algorithmique
- [LeetCode](https://leetcode.com/) - Plateforme de problèmes
- [LeetCode Patterns](https://seanprashad.com/leetcode-patterns/) - Guide des patterns
- [BigO Cheat Sheet](https://www.bigocheatsheet.com/) - Complexités

### JavaScript Avancé
- [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS) - Série de livres
- [JavaScript.info](https://javascript.info/) - Tutoriel complet
- [V8 Blog](https://v8.dev/blog) - Optimisations V8
- [Patterns.dev](https://www.patterns.dev/) - Design patterns

### Programmation Fonctionnelle
- [Mostly Adequate Guide to FP](https://mostly-adequate.gitbook.io/mostly-adequate-guide/)
- [Ramda Documentation](https://ramdajs.com/)

---

## 📈 Progression

### Statut Actuel : 75% Complété

**✅ Modules Complétés**
- [x] Module 0 - JavaScript Foundations (100%)
- [x] Module LeetCode - 15 Easy problems (100%)
- [x] Module Patterns - Documentation (100%)
- [x] Module Math - Algorithmes mathématiques (100%)

**🔄 Modules En Cours**
- [ ] Programmation Fonctionnelle (60%)
- [ ] Asynchronisme Avancé (60%)
- [ ] Closures & Scope (50%)
- [ ] OOP & Prototypes (50%)
- [ ] Métaprogrammation (40%)
- [ ] Performance (40%)

**⏳ Prochaines Étapes**
- Compléter les modules 1-6 (concepts avancés)
- LeetCode Medium (50 problèmes)
- Tests E2E pour validation complète
- Contribution open-source

---

## 👤 Auteur

**Manuel ADELE**
- GitHub: [@P4cm4n972](https://github.com/P4cm4n972)
- LinkedIn: [Manuel ADELE](https://linkedin.com/in/manuel-adele)
- Email: manuel.adele@gmail.com

Software Engineer Full-Stack avec 6 ans d'expérience. Passionné par JavaScript, algorithmique et clean code.

---

## 📄 License

MIT © Manuel ADELE

---

## 🙏 Remerciements

Ce projet de formation s'inspire de :
- Piscine C de 42
- LeetCode patterns et communauté
- Ressources open-source JavaScript
- Livres "You Don't Know JS"

---

**Dernière mise à jour** : Novembre 2024
**Version** : 1.0
**Statut** : En cours (75%)
