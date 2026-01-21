# Ex14 - Prototype Chain & Inheritance

## Objectif
Comprendre le système de prototypes de JavaScript et implémenter l'héritage prototypal - le mécanisme fondamental qui sous-tend tout l'héritage en JS, même avec les classes ES6.

## Contexte
JavaScript utilise l'héritage prototypal (prototypal inheritance), différent de l'héritage classique (class-based) des langages comme Java ou C++.

Chaque objet JavaScript a une propriété interne `[[Prototype]]` qui référence un autre objet (son prototype). Quand on accède à une propriété qui n'existe pas sur l'objet, JavaScript remonte la chaîne de prototypes jusqu'à trouver la propriété ou atteindre `null`.

```javascript
// Chaîne de prototypes d'un tableau
const arr = [1, 2, 3];
// arr -> Array.prototype -> Object.prototype -> null

// Accès à une méthode
arr.map(x => x * 2);  // map est sur Array.prototype
arr.toString();        // toString est sur Object.prototype
```

## Instructions

Implémentez les fonctions suivantes :

### 1. `inherit(Child, Parent)`
Établit l'héritage prototypal entre deux constructeurs.

### 2. Hiérarchie Animal -> Dog -> Labrador
Créer une chaîne d'héritage complète avec méthodes.

### 3. `getPrototypeChain(obj)`
Retourne un tableau avec tous les prototypes d'un objet.

### 4. `deepClone(obj)`
Clone profond qui préserve la chaîne de prototypes.

### 5. `mixin(target, ...sources)`
Copie les méthodes de plusieurs objets vers un objet cible.

### 6. `createObject(proto, properties)`
Équivalent simplifié de Object.create().

## Exemples

### inherit - Héritage prototypal
```javascript
function Animal(name) {
    this.name = name;
}
Animal.prototype.speak = function() {
    return `${this.name} makes a sound`;
};
Animal.prototype.eat = function(food) {
    return `${this.name} eats ${food}`;
};

function Dog(name, breed) {
    Animal.call(this, name);  // Appel du constructeur parent
    this.breed = breed;
}

// Établir l'héritage
inherit(Dog, Animal);

// Surcharger une méthode
Dog.prototype.speak = function() {
    return `${this.name} barks: Woof!`;
};

// Ajouter une méthode spécifique
Dog.prototype.fetch = function() {
    return `${this.name} fetches the ball`;
};

// Test
const rex = new Dog('Rex', 'German Shepherd');

rex.speak();           // "Rex barks: Woof!"
rex.eat('kibble');     // "Rex eats kibble" (hérité de Animal)
rex.fetch();           // "Rex fetches the ball"

rex instanceof Dog;    // true
rex instanceof Animal; // true
rex instanceof Object; // true

// La chaîne de prototypes
// rex -> Dog.prototype -> Animal.prototype -> Object.prototype -> null
```

### Hiérarchie complète Animal -> Dog -> Labrador
```javascript
function Labrador(name, color) {
    Dog.call(this, name, 'Labrador');
    this.color = color;
}

inherit(Labrador, Dog);

Labrador.prototype.swim = function() {
    return `${this.name} the ${this.color} Labrador swims`;
};

const buddy = new Labrador('Buddy', 'golden');

buddy.speak();  // "Buddy barks: Woof!" (hérité de Dog)
buddy.eat('treats'); // "Buddy eats treats" (hérité de Animal)
buddy.swim();   // "Buddy the golden Labrador swims"

buddy instanceof Labrador; // true
buddy instanceof Dog;      // true
buddy instanceof Animal;   // true
```

### getPrototypeChain - Inspection de la chaîne
```javascript
const buddy = new Labrador('Buddy', 'golden');
const chain = getPrototypeChain(buddy);

// [Labrador.prototype, Dog.prototype, Animal.prototype, Object.prototype, null]
console.log(chain.length); // 5

// Chaque élément est le prototype du précédent
chain[0] === Labrador.prototype; // true
chain[1] === Dog.prototype;      // true
chain[2] === Animal.prototype;   // true
chain[3] === Object.prototype;   // true
chain[4] === null;               // true

// Pour un objet simple
const obj = { a: 1 };
getPrototypeChain(obj); // [Object.prototype, null]

// Pour un tableau
getPrototypeChain([1, 2]); // [Array.prototype, Object.prototype, null]
```

### deepClone - Clone avec prototypes
```javascript
const original = new Dog('Original', 'Poodle');
original.tricks = ['sit', 'roll'];

const clone = deepClone(original);

// Clone indépendant
clone.name = 'Clone';
clone.tricks.push('shake');

console.log(original.name);   // "Original" (non modifié)
console.log(original.tricks); // ['sit', 'roll'] (non modifié)
console.log(clone.tricks);    // ['sit', 'roll', 'shake']

// Préserve la chaîne de prototypes
clone instanceof Dog;    // true
clone instanceof Animal; // true
clone.speak();           // "Clone barks: Woof!"

// Gère les objets imbriqués
const nested = {
    level1: {
        level2: {
            value: 42
        }
    }
};
const clonedNested = deepClone(nested);
clonedNested.level1.level2.value = 100;
console.log(nested.level1.level2.value); // 42 (non modifié)
```

### mixin - Composition de comportements
```javascript
const canSwim = {
    swim() {
        return `${this.name} is swimming`;
    },
    dive() {
        return `${this.name} dives deep`;
    }
};

const canFly = {
    fly() {
        return `${this.name} is flying`;
    },
    land() {
        return `${this.name} lands gracefully`;
    }
};

function Duck(name) {
    this.name = name;
}
Duck.prototype.quack = function() {
    return `${this.name}: Quack!`;
};

// Ajouter plusieurs comportements
mixin(Duck.prototype, canSwim, canFly);

const donald = new Duck('Donald');

donald.quack(); // "Donald: Quack!"
donald.swim();  // "Donald is swimming"
donald.fly();   // "Donald is flying"
donald.dive();  // "Donald dives deep"

// Les mixins permettent l'héritage multiple (impossible avec les classes)
```

### createObject - Object.create simplifié
```javascript
const personProto = {
    greet() {
        return `Hello, I'm ${this.name}`;
    },
    getAge() {
        return this.age;
    }
};

const john = createObject(personProto, {
    name: 'John',
    age: 30
});

john.greet();  // "Hello, I'm John"
john.getAge(); // 30

// Vérification
Object.getPrototypeOf(john) === personProto; // true
john.hasOwnProperty('name'); // true
john.hasOwnProperty('greet'); // false (sur le prototype)
```

## Comprendre Object.prototype

```javascript
// Toutes ces méthodes viennent de Object.prototype
const obj = { a: 1 };

obj.hasOwnProperty('a');     // true
obj.toString();              // "[object Object]"
obj.valueOf();               // { a: 1 }
obj.isPrototypeOf({});       // false

// On peut les surcharger
obj.toString = function() {
    return `Custom: a=${this.a}`;
};
obj.toString(); // "Custom: a=1"
```

## Patterns avancés

### Factory avec prototype
```javascript
function createPerson(name, age) {
    const person = Object.create(createPerson.prototype);
    person.name = name;
    person.age = age;
    return person;
}

createPerson.prototype.greet = function() {
    return `Hi, I'm ${this.name}`;
};

// Peut être appelé sans 'new'
const alice = createPerson('Alice', 25);
alice.greet(); // "Hi, I'm Alice"
```

### Héritage parasitaire (parasitic inheritance)
```javascript
function createEmployee(name, role) {
    // Commence avec un objet Person
    const employee = createPerson(name, 30);

    // Ajoute des propriétés
    employee.role = role;

    // Ajoute des méthodes (parasitic)
    employee.work = function() {
        return `${this.name} is working as ${this.role}`;
    };

    return employee;
}

const dev = createEmployee('Bob', 'Developer');
dev.greet(); // "Hi, I'm Bob" (hérité)
dev.work();  // "Bob is working as Developer" (ajouté)
```

## Différence avec les classes ES6

```javascript
// Sous le capot, les classes utilisent les prototypes !
class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
        return `${this.name} speaks`;
    }
}

// Est équivalent à :
function AnimalOld(name) {
    this.name = name;
}
AnimalOld.prototype.speak = function() {
    return `${this.name} speaks`;
};

// Les deux produisent la même chaîne de prototypes
const a1 = new Animal('A');
const a2 = new AnimalOld('A');

Object.getPrototypeOf(a1).constructor === Animal;    // true
Object.getPrototypeOf(a2).constructor === AnimalOld; // true
```

## Tests
```bash
node ex14/test.js
```

## Concepts
- `[[Prototype]]` et `__proto__`
- `Object.getPrototypeOf()` / `Object.setPrototypeOf()`
- `Object.create()`
- `Constructor.prototype`
- `instanceof` operator
- Prototype chain lookup
- Property shadowing
- Mixins et composition

## Bonus
- Implémenter `instanceOf(obj, Constructor)` sans utiliser `instanceof`
- Créer un système de multiple inheritance avec résolution de conflits
- Implémenter `Object.assign` en utilisant les prototypes
- Créer une fonction `seal(obj)` qui empêche l'ajout de propriétés tout en gardant la chaîne de prototypes
