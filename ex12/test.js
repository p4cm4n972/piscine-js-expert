const { createValidator, createObservable, createReadOnly, createNegativeArray } = require('./index.js');

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

console.log('Testing Proxy & Reflect...\n');

// Test validator
const schema = {
    age: (val) => typeof val === 'number' && val >= 0
};
const user = createValidator({}, schema);
user.age = 25;
assert(user.age === 25, 'validator: accepts valid value');

try {
    user.age = -5;
    assert(false, 'validator: should throw on invalid value');
} catch (err) {
    assert(true, 'validator: throws on invalid value');
}

// Test observable
let observed = null;
const data = createObservable({ count: 0 }, (prop, value) => {
    observed = { prop, value };
});
data.count = 42;
assert(observed && observed.prop === 'count' && observed.value === 42, 'observable: callback called');

// Test readonly
const ro = createReadOnly({ x: 1 });
assert(ro.x === 1, 'readonly: can read');
try {
    ro.x = 2;
    assert(false, 'readonly: should prevent write');
} catch (err) {
    assert(true, 'readonly: prevents write');
}

// Test negative array
const arr = createNegativeArray([1, 2, 3, 4, 5]);
assert(arr[-1] === 5, 'negativeArray: arr[-1]');
assert(arr[-2] === 4, 'negativeArray: arr[-2]');
assert(arr[0] === 1, 'negativeArray: arr[0] still works');

console.log('\n' + '='.repeat(50));
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log('='.repeat(50));

process.exit(failed > 0 ? 1 : 0);
