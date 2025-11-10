# ex07 - Conditions & Boucles

## 🎯 Objectif

Maîtriser les structures de contrôle (if/else, switch) et les boucles (for, while, for...of, for...in) en JavaScript.

## 📝 Exercice

Implémentez les fonctions suivantes utilisant différentes structures de contrôle.

### Fonctions à implémenter

#### 1. `getGrade(score)`
Retourne une note (A, B, C, D, F) basée sur le score:
- A: 90-100
- B: 80-89
- C: 70-79
- D: 60-69
- F: 0-59
```javascript
getGrade(95) // "A"
getGrade(75) // "C"
```

#### 2. `fizzBuzz(n)`
Retourne un tableau de 1 à n avec:
- "Fizz" pour les multiples de 3
- "Buzz" pour les multiples de 5
- "FizzBuzz" pour les multiples de 3 et 5
- Le nombre sinon
```javascript
fizzBuzz(15) // [1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"]
```

#### 3. `sumRange(start, end)`
Retourne la somme de tous les nombres entre start et end (inclus).
```javascript
sumRange(1, 5) // 15 (1+2+3+4+5)
```

#### 4. `countOccurrences(arr, target)`
Compte le nombre de fois qu'un élément apparaît dans un tableau.
```javascript
countOccurrences([1, 2, 2, 3, 2], 2) // 3
```

#### 5. `getObjectKeys(obj)`
Retourne un tableau des clés d'un objet (utilisez for...in).
```javascript
getObjectKeys({a: 1, b: 2, c: 3}) // ["a", "b", "c"]
```

## 🧪 Test

```bash
node test.js
```

## 💡 Indices

- `if/else`, `switch`
- `for`, `while`, `for...of`, `for...in`
- Opérateur modulo `%` pour les multiples
