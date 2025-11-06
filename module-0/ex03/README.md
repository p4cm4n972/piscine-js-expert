# Ex03 - Arrays Basics

## Objectif
Maîtriser les méthodes de base des tableaux.

## Méthodes importantes

```javascript
// Ajouter/Retirer
push()    // Ajoute à la fin
pop()     // Retire de la fin
unshift() // Ajoute au début
shift()   // Retire du début

// Accès/Recherche
length    // Longueur du tableau
indexOf() // Index d'un élément
includes()// Contient un élément?

// Extraction/Copie
slice()   // Extrait une portion (non-mutant)
splice()  // Modifie le tableau (mutant)
concat()  // Concatène des tableaux
```

## Instructions

### 1. `getLastElement(arr)`
Retourne le dernier élément.

### 2. `addToEnd(arr, element)`
Ajoute un élément à la fin (retourne le nouveau tableau).

### 3. `removeFirst(arr)`
Retire le premier élément (retourne le nouveau tableau).

### 4. `getMiddleElements(arr)`
Retourne les éléments du milieu (sans premier et dernier).

## Tests
```bash
node module-0/ex03/test.js
```
