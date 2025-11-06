# Piscine JavaScript Expert

Formation intensive JavaScript de niveau avancé pour développeurs ayant des bases solides en programmation.

## Prérequis

- Maîtrise d'un langage de programmation (C, Python, etc.)
- Node.js 18+ installé

**Note:** Si vous n'êtes pas à l'aise avec JavaScript, commencez par le **Module 0** pour consolider les bases !

## Objectifs

Cette piscine vous permettra de maîtriser :
- Programmation fonctionnelle avancée
- Asynchronisme (Promises, async/await, Generators)
- Closures et portée (lexical scope)
- Prototypes et orienté objet
- Métaprogrammation (Proxy, Reflect, Symbol)
- Performance et optimisation
- Patterns avancés

## Structure

### Module 0 : Consolidation des Bases (module-0/)
**Prérequis recommandé avant les modules avancés**
- Types & Variables (ex00)
- Opérateurs & Expressions (ex01)
- Fonctions (ex02)
- Arrays Basics (ex03)
- Array Methods: map, filter, reduce (ex04)
- Objects (ex05)

### Module 1 : Functional Programming (ex00-ex04)
- Higher-order functions
- Currying et partial application
- Composition de fonctions
- Immutabilité et pure functions
- Functors et Monads

### Module 2 : Asynchronous JavaScript (ex05-ex09)
- Event loop et call stack
- Promises avancées
- async/await patterns
- Generators et iterators
- Streams et backpressure

### Module 3 : Closures & Scope (ex10-ex13)
- Lexical scope avancé
- Module pattern
- Factory functions
- Memory management
- IIFE et private variables

### Module 4 : Prototypes & OOP (ex14-ex17)
- Prototype chain
- Classes ES6+
- Mixins et composition
- Private fields (#)
- Inheritance patterns

### Module 5 : Metaprogramming (ex18-ex21)
- Proxy et Reflect
- Symbol et well-known symbols
- Property descriptors
- Getters/Setters avancés
- WeakMap/WeakSet

### Module 6 : Performance (ex22-ex25)
- Memory profiling
- Algorithmic complexity
- Memoization avancée
- Web Workers
- JIT optimization tips

### Module 7 : Projet Final (ex26)
- Implémentation d'une librairie complète

## Règles

- Pas de librairies externes (sauf pour les tests)
- Code doit passer les tests fournis
- Respecter les principes SOLID
- Performance et lisibilité
- Documentation JSDoc

## Progression recommandée

1. **Module 0** (si besoin) : Consolidation des bases
2. **Modules 1-6** : Concepts avancés dans l'ordre
3. **Module 7** : Projet final intégrant tout

## Tests

```bash
# Module 0
node module-0/ex00/test.js

# Modules avancés
node ex00/test.js

# Tous les tests
npm test
```

## Ressources

- [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS)
- [JavaScript.info - Advanced](https://javascript.info/advanced-functions)
- [Exploring JS](https://exploringjs.com/)
- [MDN Advanced Topics](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

## Notation

Chaque exercice est noté sur la base de :
- Fonctionnalité (40%)
- Performance (30%)
- Qualité du code (20%)
- Tests (10%)

Bon courage ! 🔥
