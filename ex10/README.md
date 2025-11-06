# Ex10 - Prototype Chain & Inheritance

## Objectif
Comprendre le système de prototypes de JavaScript et implémenter l'héritage prototypal.

## Instructions

### 1. `inherit(Child, Parent)`
Implémenter l'héritage prototypal sans class.

### 2. Créer une hiérarchie : Animal -> Dog -> Labrador
```javascript
function Animal(name) {
    this.name = name;
}
Animal.prototype.speak = function() {
    return `${this.name} makes a sound`;
};

function Dog(name, breed) {
    Animal.call(this, name);
    this.breed = breed;
}
inherit(Dog, Animal);

Dog.prototype.speak = function() {
    return `${this.name} barks`;
};

const dog = new Dog('Rex', 'Labrador');
dog.speak(); // 'Rex barks'
dog instanceof Dog; // true
dog instanceof Animal; // true
```

### 3. `getPrototypeChain(obj)`
Retourne la chaîne de prototypes d'un objet.

### 4. `deepClone(obj)`
Clone profond incluant la chaîne de prototypes.

## Tests
```bash
node ex10/test.js
```
