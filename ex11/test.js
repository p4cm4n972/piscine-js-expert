const { Person, Rectangle } = require('./index.js');

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

console.log('Testing ES6+ Classes...\n');

// Test Person (implement based on your requirements)
// Test Rectangle
const rect = new Rectangle(5, 10);
assert(rect.area === 50, 'Rectangle: area calculation');
assert(rect.perimeter === 30, 'Rectangle: perimeter calculation');

const square = Rectangle.fromSquare(4);
assert(square.area === 16, 'Rectangle: static fromSquare');

console.log('\n' + '='.repeat(50));
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log('='.repeat(50));

process.exit(failed > 0 ? 1 : 0);
