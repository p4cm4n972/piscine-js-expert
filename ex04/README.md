# Ex04 - Lazy Evaluation & Transducers

## Objectif
Implémenter une structure de données lazy (paresseuse) avec des transducers pour optimiser les opérations sur collections.

## Contexte
L'évaluation paresseuse (lazy evaluation) retarde le calcul jusqu'à ce que le résultat soit nécessaire. Les transducers permettent de composer des transformations de manière efficace, en évitant les itérations multiples et les collections intermédiaires.

## Problème

Approche classique (inefficace) :
```javascript
const result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    .map(x => x * 2)        // Itération 1 + tableau temporaire
    .filter(x => x > 10)    // Itération 2 + tableau temporaire
    .map(x => x + 1)        // Itération 3 + tableau temporaire
    .slice(0, 3);           // Copie

// 3 itérations complètes + 3 tableaux temporaires
// Traite TOUS les éléments même si on n'en veut que 3
```

## Instructions

Implémentez une classe `Lazy` qui :

### Constructeurs
- `Lazy.from(iterable)` - Crée une séquence lazy

### Méthodes de transformation (lazy)
- `map(fn)` - Transformation
- `filter(predicate)` - Filtrage
- `take(n)` - Prend n premiers éléments
- `skip(n)` - Saute n premiers éléments
- `flatMap(fn)` - Aplatissement

### Méthodes terminales (déclenchent l'évaluation)
- `toArray()` - Convertit en tableau
- `reduce(fn, initial)` - Réduit à une valeur
- `forEach(fn)` - Itère sur chaque élément
- `first()` - Premier élément
- `count()` - Compte les éléments

## Contraintes
- Évaluation paresseuse : pas de calcul tant qu'une méthode terminale n'est pas appelée
- Une seule itération pour toutes les opérations
- Pas de collections intermédiaires
- Support des séquences infinies
- Composition efficace

## Exemples

### Lazy vs Eager
```javascript
// Eager (classique) - 3 itérations
const eager = [1,2,3,4,5]
    .map(x => { console.log('map1:', x); return x * 2; })
    .filter(x => { console.log('filter:', x); return x > 5; })
    .map(x => { console.log('map2:', x); return x + 1; });

// Lazy - 1 seule itération au moment de toArray()
const lazy = Lazy.from([1,2,3,4,5])
    .map(x => { console.log('map1:', x); return x * 2; })
    .filter(x => { console.log('filter:', x); return x > 5; })
    .map(x => { console.log('map2:', x); return x + 1; })
    .toArray(); // C'est ICI que l'évaluation se produit
```

### Optimisation avec take
```javascript
// Classique : traite TOUS les éléments
const result1 = bigArray
    .map(expensive)
    .filter(predicate)
    .slice(0, 3);  // On n'en voulait que 3 !

// Lazy : s'arrête après 3 éléments
const result2 = Lazy.from(bigArray)
    .map(expensive)     // Appelé seulement pour éléments nécessaires
    .filter(predicate)
    .take(3)            // Stop après 3
    .toArray();
```

### Séquences infinies
```javascript
// Générateur infini
function* naturals() {
    let n = 1;
    while (true) yield n++;
}

// Prend les 10 premiers nombres pairs
const evenNumbers = Lazy.from(naturals())
    .filter(n => n % 2 === 0)
    .take(10)
    .toArray(); // [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

// Sans lazy, naturals() ne terminerait jamais !
```

### Cas d'usage réel
```javascript
// Traitement de gros fichiers
const processLogFile = (filename) =>
    Lazy.from(readLinesStream(filename))
        .filter(line => line.includes('ERROR'))
        .map(line => parseLogLine(line))
        .filter(log => log.timestamp > yesterday)
        .take(100)  // Seulement 100 premières erreurs
        .toArray();

// Pagination efficace
const getPage = (items, page, size) =>
    Lazy.from(items)
        .skip(page * size)
        .take(size)
        .toArray();

// Data pipeline
const pipeline = Lazy.from(rawData)
    .map(parse)
    .filter(validate)
    .map(transform)
    .filter(isRelevant)
    .take(1000)
    .toArray();
```

## Tests
```bash
node ex04/test.js
```

## Concepts
- Lazy evaluation
- Transducers
- Generators
- Iterators protocol
- Performance optimization
- Memory efficiency
- Composition

## Bonus
- Implémenter `distinct()` - Éléments uniques
- Implémenter `zip(other)` - Combine deux séquences
- Implémenter `chunk(size)` - Groupes de n éléments
- Compteur d'opérations pour prouver la lazy evaluation
