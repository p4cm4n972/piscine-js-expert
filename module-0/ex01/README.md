# Ex01 - Opérateurs & Expressions

## Objectif
Maîtriser tous les opérateurs JavaScript.

## Types d'opérateurs

### Arithmétiques
```javascript
+ - * / %    // Addition, soustraction, multiplication, division, modulo
** // Exponentiation (ES2016)
++ -- // Incrémentation, décrémentation
```

### Comparaison
```javascript
== !=   // Loose equality
=== !== // Strict equality
< > <= >= // Comparaisons
```

### Logiques
```javascript
&& || !  // AND, OR, NOT
?? // Nullish coalescing (ES2020)
```

### Ternaire
```javascript
condition ? valueIfTrue : valueIfFalse
```

## Instructions

### 1. `calculate(a, b, operator)`
Effectue une opération arithmétique.

### 2. `isInRange(value, min, max)`
Vérifie si value est entre min et max (inclusif).

### 3. `getMax(a, b)`
Retourne le plus grand nombre (avec ternaire).

### 4. `nullishDefault(value, defaultValue)`
Retourne value ou defaultValue si value est null/undefined.

## Tests
```bash
node module-0/ex01/test.js
```
