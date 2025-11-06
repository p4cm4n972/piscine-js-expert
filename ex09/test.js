const { once, after, debounce, throttle, partial } = require('./index.js');

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

async function runTests() {
    console.log('Testing Advanced Closures...\n');

    // Test once
    let count1 = 0;
    const increment = once(() => count1++);
    increment();
    increment();
    increment();
    assert(count1 === 1, 'once: function only called once');

    let result = 0;
    const setResult = once((val) => { result = val; });
    setResult(42);
    setResult(100);
    assert(result === 42, 'once: first call sets value');

    // Test after
    let count2 = 0;
    const afterThree = after(3, () => { count2++; });
    afterThree();
    afterThree();
    assert(count2 === 0, 'after: not called before n calls');
    afterThree();
    assert(count2 === 1, 'after: called on nth call');
    afterThree();
    assert(count2 === 2, 'after: called on subsequent calls');

    // Test debounce
    let debounceCount = 0;
    const debounced = debounce(() => { debounceCount++; }, 50);
    debounced();
    debounced();
    debounced();
    assert(debounceCount === 0, 'debounce: not called immediately');
    await sleep(60);
    assert(debounceCount === 1, 'debounce: called once after delay');

    // Test throttle
    let throttleCount = 0;
    const throttled = throttle(() => { throttleCount++; }, 100);
    throttled(); // 1
    assert(throttleCount === 1, 'throttle: called immediately first time');
    throttled();
    throttled();
    assert(throttleCount === 1, 'throttle: subsequent calls ignored within limit');
    await sleep(110);
    throttled(); // 2
    assert(throttleCount === 2, 'throttle: called again after limit passed');

    // Test partial
    const add = (a, b, c) => a + b + c;
    const add5 = partial(add, 5);
    assert(add5(2, 3) === 10, 'partial: applies partial arguments');

    const multiply = (a, b, c, d) => a * b * c * d;
    const mul2and3 = partial(multiply, 2, 3);
    assert(mul2and3(4, 5) === 120, 'partial: multiple partial arguments');

    console.log('\n' + '='.repeat(50));
    console.log(`Results: ${passed} passed, ${failed} failed`);
    console.log('='.repeat(50));

    process.exit(failed > 0 ? 1 : 0);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

runTests();
