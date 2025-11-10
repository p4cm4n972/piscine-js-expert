# ex06 - Strings

## 🎯 Objectif

Maîtriser les méthodes de manipulation de chaînes de caractères en JavaScript.

## 📝 Exercice

Implémentez les fonctions suivantes pour manipuler des strings.

### Fonctions à implémenter

#### 1. `reverseString(str)`
Retourne une chaîne inversée.
```javascript
reverseString("hello") // "olleh"
```

#### 2. `isPalindrome(str)`
Vérifie si une chaîne est un palindrome (ignore la casse).
```javascript
isPalindrome("Racecar") // true
isPalindrome("hello") // false
```

#### 3. `countVowels(str)`
Compte le nombre de voyelles (a, e, i, o, u) dans une chaîne.
```javascript
countVowels("hello world") // 3
```

#### 4. `capitalizeWords(str)`
Met en majuscule la première lettre de chaque mot.
```javascript
capitalizeWords("hello world") // "Hello World"
```

#### 5. `truncate(str, maxLength)`
Tronque une chaîne à maxLength caractères et ajoute "..." si nécessaire.
```javascript
truncate("hello world", 8) // "hello..."
truncate("hello", 10) // "hello"
```

## 🧪 Test

```bash
node test.js
```

## 💡 Indices

- String methods: `split()`, `join()`, `toLowerCase()`, `slice()`, `trim()`
- Array methods: `reverse()`, `map()`
- Regex: `/[aeiou]/gi`
