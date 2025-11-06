# Ex08 - Module Pattern & Encapsulation

## Objectif
Maîtriser les closures pour créer des modules avec données privées et API publique.

## Contexte
Avant ES6 modules, le Module Pattern était la méthode standard pour encapsuler le code et créer des données privées en JavaScript. Même aujourd'hui, comprendre les closures est essentiel pour la gestion de l'état et l'encapsulation.

## Instructions

### 1. `createCounter()`
Créer un compteur avec état privé.

```javascript
const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.decrement(); // 1
counter.getValue();  // 1
counter.reset();     // 0
```

### 2. `createBankAccount(initialBalance)`
Compte bancaire avec solde privé.

```javascript
const account = createBankAccount(1000);
account.deposit(500);   // Balance: 1500
account.withdraw(200);  // Balance: 1300
account.getBalance();   // 1300
account.getHistory();   // [{type: 'deposit', amount: 500}, ...]
// account.balance est inaccessible (privé)
```

### 3. `createStack()`
Stack (LIFO) avec données privées.

```javascript
const stack = createStack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.pop();        // 3
stack.peek();       // 2
stack.size();       // 2
stack.isEmpty();    // false
```

### 4. `createEventEmitter()`
Event emitter simple avec listeners privés.

```javascript
const emitter = createEventEmitter();
emitter.on('data', (data) => console.log(data));
emitter.emit('data', 'Hello'); // Logs: Hello
emitter.off('data', handler);
```

## Concepts

### Closure
Une fonction qui "se souvient" de son scope lexical :
```javascript
function outer() {
    const secret = 42;  // Variable privée
    return function inner() {
        return secret;  // Accès à la variable du scope parent
    };
}

const getSecret = outer();
getSecret(); // 42
```

### Module Pattern
```javascript
const Module = (function() {
    // Privé
    let privateVar = 0;

    function privateMethod() {
        return privateVar;
    }

    // API publique
    return {
        publicMethod() {
            privateVar++;
            return privateMethod();
        }
    };
})();
```

## Tests
```bash
node ex08/test.js
```
