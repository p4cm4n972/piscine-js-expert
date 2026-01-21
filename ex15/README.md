# Ex15 - ES6+ Classes & Private Fields

## Objectif
Maîtriser les classes ES6+ avec champs privés (#), static, getters/setters et les patterns modernes de POO en JavaScript.

## Contexte
Les classes ES6 sont du "sucre syntaxique" (syntactic sugar) au-dessus du système de prototypes. Elles offrent une syntaxe plus claire pour l'héritage et l'encapsulation. ES2022 a introduit les champs privés (#) pour une vraie encapsulation.

```javascript
// Avant ES6 (prototypes)
function Person(name) {
    this.name = name;
}
Person.prototype.greet = function() {
    return `Hi, I'm ${this.name}`;
};

// ES6+ (classes)
class Person {
    constructor(name) {
        this.name = name;
    }
    greet() {
        return `Hi, I'm ${this.name}`;
    }
}

// Les deux sont équivalents au niveau du prototype !
```

## Instructions

Implémentez les classes suivantes :

### 1. Classe `Person`
- Champs privés #name, #age
- Getters/setters avec validation
- Méthodes d'instance et static

### 2. Classe `Rectangle`
- Constructor avec width, height
- Getters area, perimeter
- Méthode static fromSquare(side)

### 3. Classe `BankAccount`
- Champ privé #balance
- Méthodes deposit, withdraw avec validation
- Getter balance (read-only)

### 4. Classe `EventEmitter`
- Méthodes on, off, emit, once
- Gestion des listeners avec Map

### 5. Classe `LinkedList`
- Méthodes add, remove, find, toArray
- Iterator protocol

## Exemples

### Person - Champs privés et validation
```javascript
class Person {
    // Champs privés (ES2022)
    #name;
    #age;
    #id;

    // Champ static privé
    static #idCounter = 0;

    constructor(name, age) {
        this.#name = name;
        this.age = age;  // Utilise le setter pour validation
        this.#id = ++Person.#idCounter;
    }

    // Getter
    get name() {
        return this.#name;
    }

    // Setter avec validation
    set name(value) {
        if (typeof value !== 'string' || value.length === 0) {
            throw new Error('Name must be a non-empty string');
        }
        this.#name = value;
    }

    get age() {
        return this.#age;
    }

    set age(value) {
        if (typeof value !== 'number' || value < 0 || value > 150) {
            throw new Error('Age must be between 0 and 150');
        }
        this.#age = value;
    }

    // Getter read-only
    get id() {
        return this.#id;
    }

    // Méthode d'instance
    greet() {
        return `Hi, I'm ${this.#name}, ${this.#age} years old`;
    }

    // Méthode d'instance utilisant une méthode privée
    celebrateBirthday() {
        this.#incrementAge();
        return `Happy birthday! Now ${this.#age}`;
    }

    // Méthode privée
    #incrementAge() {
        this.#age++;
    }

    // Méthode static
    static createAnonymous() {
        return new Person('Anonymous', 0);
    }

    // Getter static
    static get totalCreated() {
        return Person.#idCounter;
    }
}

// Usage
const alice = new Person('Alice', 30);
console.log(alice.name);     // "Alice"
console.log(alice.age);      // 30
console.log(alice.id);       // 1

alice.name = 'Alicia';       // OK
alice.age = 31;              // OK

// alice.#name;              // SyntaxError: Private field
// alice.age = -5;           // Error: Age must be between 0 and 150

const bob = new Person('Bob', 25);
console.log(Person.totalCreated); // 2

const anon = Person.createAnonymous();
console.log(anon.name);      // "Anonymous"
```

### Rectangle - Static factory methods
```javascript
class Rectangle {
    #width;
    #height;

    constructor(width, height) {
        this.#width = width;
        this.#height = height;
    }

    // Getters calculés
    get width() { return this.#width; }
    get height() { return this.#height; }

    get area() {
        return this.#width * this.#height;
    }

    get perimeter() {
        return 2 * (this.#width + this.#height);
    }

    get isSquare() {
        return this.#width === this.#height;
    }

    // Setters avec re-calcul implicite
    set width(value) {
        if (value <= 0) throw new Error('Width must be positive');
        this.#width = value;
    }

    set height(value) {
        if (value <= 0) throw new Error('Height must be positive');
        this.#height = value;
    }

    // Static factory methods
    static fromSquare(side) {
        return new Rectangle(side, side);
    }

    static fromDiagonal(diagonal, ratio = 1) {
        // Pour un ratio width:height donné
        const height = Math.sqrt(diagonal ** 2 / (1 + ratio ** 2));
        const width = height * ratio;
        return new Rectangle(width, height);
    }

    // Méthode d'instance
    scale(factor) {
        return new Rectangle(this.#width * factor, this.#height * factor);
    }

    toString() {
        return `Rectangle(${this.#width}x${this.#height})`;
    }
}

// Usage
const rect = new Rectangle(4, 5);
console.log(rect.area);      // 20
console.log(rect.perimeter); // 18

const square = Rectangle.fromSquare(5);
console.log(square.area);    // 25
console.log(square.isSquare); // true

const scaled = rect.scale(2);
console.log(scaled.area);    // 80
```

### BankAccount - Encapsulation stricte
```javascript
class BankAccount {
    #balance;
    #transactions = [];
    #owner;

    constructor(owner, initialBalance = 0) {
        this.#owner = owner;
        this.#balance = initialBalance;
        this.#logTransaction('OPEN', initialBalance);
    }

    get balance() {
        return this.#balance;
    }

    get owner() {
        return this.#owner;
    }

    get transactionHistory() {
        // Retourne une copie pour éviter les modifications
        return [...this.#transactions];
    }

    deposit(amount) {
        if (amount <= 0) {
            throw new Error('Deposit amount must be positive');
        }
        this.#balance += amount;
        this.#logTransaction('DEPOSIT', amount);
        return this.#balance;
    }

    withdraw(amount) {
        if (amount <= 0) {
            throw new Error('Withdrawal amount must be positive');
        }
        if (amount > this.#balance) {
            throw new Error('Insufficient funds');
        }
        this.#balance -= amount;
        this.#logTransaction('WITHDRAW', -amount);
        return this.#balance;
    }

    transfer(toAccount, amount) {
        this.withdraw(amount);
        toAccount.deposit(amount);
        this.#logTransaction('TRANSFER_OUT', -amount);
    }

    #logTransaction(type, amount) {
        this.#transactions.push({
            type,
            amount,
            balance: this.#balance,
            timestamp: new Date()
        });
    }

    // Static pour créer des comptes liés
    static createJointAccount(owners, initialBalance) {
        return new BankAccount(owners.join(' & '), initialBalance);
    }
}

// Usage
const account = new BankAccount('Alice', 1000);
account.deposit(500);       // 1500
account.withdraw(200);      // 1300

// account.#balance = 999999; // SyntaxError: impossible d'accéder
console.log(account.balance); // 1300

const bob = new BankAccount('Bob', 500);
account.transfer(bob, 300);
console.log(bob.balance);   // 800
```

### EventEmitter - Pattern classique
```javascript
class EventEmitter {
    #events = new Map();

    on(event, listener) {
        if (!this.#events.has(event)) {
            this.#events.set(event, new Set());
        }
        this.#events.get(event).add(listener);
        return this;  // Permet le chaînage
    }

    off(event, listener) {
        if (this.#events.has(event)) {
            this.#events.get(event).delete(listener);
        }
        return this;
    }

    emit(event, ...args) {
        if (!this.#events.has(event)) return false;

        for (const listener of this.#events.get(event)) {
            listener.apply(this, args);
        }
        return true;
    }

    once(event, listener) {
        const wrapper = (...args) => {
            listener.apply(this, args);
            this.off(event, wrapper);
        };
        return this.on(event, wrapper);
    }

    listenerCount(event) {
        return this.#events.has(event)
            ? this.#events.get(event).size
            : 0;
    }

    removeAllListeners(event) {
        if (event) {
            this.#events.delete(event);
        } else {
            this.#events.clear();
        }
        return this;
    }
}

// Usage
const emitter = new EventEmitter();

const onData = (data) => console.log('Received:', data);
const onError = (err) => console.error('Error:', err);

emitter
    .on('data', onData)
    .on('error', onError)
    .once('connect', () => console.log('Connected!'));

emitter.emit('connect');     // "Connected!"
emitter.emit('connect');     // (rien - once ne se déclenche qu'une fois)
emitter.emit('data', { id: 1 }); // "Received: { id: 1 }"

emitter.off('data', onData);
emitter.emit('data', { id: 2 }); // (rien)
```

### LinkedList - Avec Iterator
```javascript
class LinkedList {
    #head = null;
    #tail = null;
    #size = 0;

    // Classe interne pour les nœuds
    static #Node = class {
        constructor(value) {
            this.value = value;
            this.next = null;
        }
    };

    get size() {
        return this.#size;
    }

    get isEmpty() {
        return this.#size === 0;
    }

    add(value) {
        const node = new LinkedList.#Node(value);

        if (!this.#head) {
            this.#head = node;
            this.#tail = node;
        } else {
            this.#tail.next = node;
            this.#tail = node;
        }
        this.#size++;
        return this;
    }

    addFirst(value) {
        const node = new LinkedList.#Node(value);
        node.next = this.#head;
        this.#head = node;
        if (!this.#tail) this.#tail = node;
        this.#size++;
        return this;
    }

    remove(value) {
        if (!this.#head) return false;

        if (this.#head.value === value) {
            this.#head = this.#head.next;
            if (!this.#head) this.#tail = null;
            this.#size--;
            return true;
        }

        let current = this.#head;
        while (current.next) {
            if (current.next.value === value) {
                if (current.next === this.#tail) {
                    this.#tail = current;
                }
                current.next = current.next.next;
                this.#size--;
                return true;
            }
            current = current.next;
        }
        return false;
    }

    find(predicate) {
        let current = this.#head;
        while (current) {
            if (predicate(current.value)) {
                return current.value;
            }
            current = current.next;
        }
        return undefined;
    }

    toArray() {
        return [...this];
    }

    // Iterator protocol
    *[Symbol.iterator]() {
        let current = this.#head;
        while (current) {
            yield current.value;
            current = current.next;
        }
    }

    // Static factory
    static from(iterable) {
        const list = new LinkedList();
        for (const item of iterable) {
            list.add(item);
        }
        return list;
    }
}

// Usage
const list = new LinkedList();
list.add(1).add(2).add(3);

console.log(list.size);      // 3
console.log(list.toArray()); // [1, 2, 3]

// Iteration avec for...of
for (const value of list) {
    console.log(value);      // 1, 2, 3
}

// Spread operator fonctionne
const arr = [...list];       // [1, 2, 3]

// Find
const found = list.find(x => x > 1); // 2

// Factory method
const fromArr = LinkedList.from([4, 5, 6]);
console.log(fromArr.toArray()); // [4, 5, 6]
```

## Héritage avec extends

```javascript
class Animal {
    #name;

    constructor(name) {
        this.#name = name;
    }

    get name() {
        return this.#name;
    }

    speak() {
        return `${this.#name} makes a sound`;
    }
}

class Dog extends Animal {
    #breed;

    constructor(name, breed) {
        super(name);  // OBLIGATOIRE avant d'utiliser 'this'
        this.#breed = breed;
    }

    get breed() {
        return this.#breed;
    }

    // Override
    speak() {
        return `${this.name} barks: Woof!`;
    }

    // Appeler la méthode parent
    speakPolitely() {
        return `${super.speak()} ... softly`;
    }
}

const rex = new Dog('Rex', 'German Shepherd');
rex.speak();         // "Rex barks: Woof!"
rex.speakPolitely(); // "Rex makes a sound ... softly"
```

## Abstract classes (pattern)

```javascript
class Shape {
    constructor() {
        if (new.target === Shape) {
            throw new Error('Shape is abstract and cannot be instantiated');
        }
    }

    // Méthodes abstraites
    get area() {
        throw new Error('area must be implemented');
    }

    get perimeter() {
        throw new Error('perimeter must be implemented');
    }

    // Méthode concrète
    describe() {
        return `Shape with area ${this.area} and perimeter ${this.perimeter}`;
    }
}

class Circle extends Shape {
    #radius;

    constructor(radius) {
        super();
        this.#radius = radius;
    }

    get area() {
        return Math.PI * this.#radius ** 2;
    }

    get perimeter() {
        return 2 * Math.PI * this.#radius;
    }
}

// const shape = new Shape(); // Error: Shape is abstract
const circle = new Circle(5);
circle.describe(); // "Shape with area 78.54... and perimeter 31.42..."
```

## Tests
```bash
node ex15/test.js
```

## Concepts
- Class declarations et expressions
- constructor
- Instance methods et fields
- Static methods et fields
- Private fields (#)
- Getters et setters
- extends et super
- new.target
- Symbol.iterator

## Bonus
- Implémenter une classe `Observable` avec support pour les opérateurs RxJS-like (map, filter, subscribe)
- Créer une classe `Singleton` avec un seul instance possible
- Implémenter le pattern `Builder` avec une classe fluent
- Créer une classe `Enum` qui simule les enums TypeScript
