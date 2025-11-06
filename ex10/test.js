const { inherit, getPrototypeChain, deepClone } = require('./index.js');

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

console.log('Testing Prototypes...\n');

// Test inherit
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
Dog.prototype.bark = function() {
    return `${this.name} barks`;
};

const dog = new Dog('Rex', 'Labrador');
assert(dog.name === 'Rex', 'inherit: property set correctly');
assert(dog.bark() === 'Rex barks', 'inherit: own method works');
assert(dog.speak() === 'Rex makes a sound', 'inherit: parent method works');
assert(dog instanceof Dog, 'inherit: instanceof Dog');
assert(dog instanceof Animal, 'inherit: instanceof Animal');

// Test getPrototypeChain
const chain = getPrototypeChain(dog);
assert(chain.length >= 3, 'chain: has at least 3 prototypes');
assert(chain.includes(Dog.prototype), 'chain: includes Dog.prototype');
assert(chain.includes(Animal.prototype), 'chain: includes Animal.prototype');

// Test deepClone
const obj = { a: 1, nested: { b: 2 } };
const cloned = deepClone(obj);
assert(cloned.a === 1 && cloned.nested.b === 2, 'deepClone: copies values');
cloned.nested.b = 99;
assert(obj.nested.b === 2, 'deepClone: is deep (not shallow)');

console.log('\n' + '='.repeat(50));
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log('='.repeat(50));

process.exit(failed > 0 ? 1 : 0);
