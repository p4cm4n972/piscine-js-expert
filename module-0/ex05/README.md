# Ex05 - Objects

## Objectif
Maîtriser la manipulation d'objets JavaScript.

## Bases des objets

```javascript
// Création
const person = {
    name: 'Alice',
    age: 25,
    city: 'Paris'
};

// Accès
person.name        // 'Alice'
person['age']      // 25

// Modification
person.age = 26;

// Ajout
person.job = 'Developer';

// Suppression
delete person.city;

// Vérification
'name' in person   // true
person.hasOwnProperty('name') // true
```

## Destructuring

```javascript
const { name, age } = person;
// name = 'Alice', age = 25

// Avec rename
const { name: userName } = person;

// Avec défaut
const { job = 'Unknown' } = person;
```

## Instructions

### 1. `getProperty(obj, key)`
Retourne la valeur d'une propriété.

### 2. `mergeObjects(obj1, obj2)`
Fusionne deux objets (obj2 override obj1).

### 3. `pick(obj, keys)`
Extrait certaines propriétés d'un objet.

### 4. `invertObject(obj)`
Inverse clés et valeurs.

## Tests
```bash
node module-0/ex05/test.js
```
