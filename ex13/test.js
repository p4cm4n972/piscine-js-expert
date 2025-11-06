const { measurePerformance, slowFunction, fastFunction } = require('./index.js');

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

console.log('Testing Performance...\n');

const testData = Array.from({ length: 1000 }, (_, i) => i);

const slowTime = measurePerformance(() => slowFunction(testData), 1000);
const fastTime = measurePerformance(() => fastFunction(testData), 1000);

console.log(`Slow: ${slowTime.toFixed(2)}ms`);
console.log(`Fast: ${fastTime.toFixed(2)}ms`);
console.log(`Speedup: ${(slowTime / fastTime).toFixed(2)}x`);

assert(fastTime < slowTime, 'optimization: fast version is faster');

// Verify correctness
const slowResult = slowFunction([1, 2, 3, 4, 5]);
const fastResult = fastFunction([1, 2, 3, 4, 5]);
assert(JSON.stringify(slowResult) === JSON.stringify(fastResult), 'optimization: results match');

console.log('\n' + '='.repeat(50));
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log('='.repeat(50));

process.exit(failed > 0 ? 1 : 0);
