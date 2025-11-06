const { createCounter, createBankAccount, createStack, createEventEmitter } = require('./index.js');

let passed = 0;
let failed = 0;

function assert(condition, message) {
    if (condition) {
        console.log(`✓ ${message}`);
        passed++;
    } else {
        console.error(`✗ ${message}`);
        failed++;
    }
}

console.log('Testing Module Pattern...\n');

// Test Counter
const counter = createCounter();
assert(counter.getValue() === 0, 'counter: initial value is 0');
counter.increment();
assert(counter.getValue() === 1, 'counter: increment works');
counter.increment();
counter.increment();
assert(counter.getValue() === 3, 'counter: multiple increments');
counter.decrement();
assert(counter.getValue() === 2, 'counter: decrement works');
counter.reset();
assert(counter.getValue() === 0, 'counter: reset works');

const counter2 = createCounter(10);
assert(counter2.getValue() === 10, 'counter: custom initial value');

// Test Bank Account
const account = createBankAccount(1000);
assert(account.getBalance() === 1000, 'bank: initial balance');
account.deposit(500);
assert(account.getBalance() === 1500, 'bank: deposit works');
account.withdraw(300);
assert(account.getBalance() === 1200, 'bank: withdraw works');
account.withdraw(2000);
assert(account.getBalance() === 1200, 'bank: insufficient funds prevents withdrawal');

const history = account.getHistory();
assert(history.length === 2, 'bank: history tracks successful transactions');

// Test Stack
const stack = createStack();
assert(stack.isEmpty(), 'stack: initially empty');
assert(stack.size() === 0, 'stack: initial size is 0');
stack.push(1);
stack.push(2);
stack.push(3);
assert(stack.size() === 3, 'stack: size after pushes');
assert(stack.peek() === 3, 'stack: peek returns top without removing');
assert(stack.pop() === 3, 'stack: pop returns and removes top');
assert(stack.size() === 2, 'stack: size after pop');
assert(!stack.isEmpty(), 'stack: not empty after items added');

// Test Event Emitter
const emitter = createEventEmitter();
let called = 0;
const handler = (data) => { called++; };
emitter.on('test', handler);
emitter.emit('test', 'data');
assert(called === 1, 'emitter: handler called on emit');
emitter.emit('test', 'data');
assert(called === 2, 'emitter: handler called multiple times');
emitter.off('test', handler);
emitter.emit('test', 'data');
assert(called === 2, 'emitter: handler not called after off');

console.log('\n' + '='.repeat(50));
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log('='.repeat(50));

process.exit(failed > 0 ? 1 : 0);
