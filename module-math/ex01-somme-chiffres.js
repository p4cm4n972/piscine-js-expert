/**
 * Exercice : Somme des chiffres jusqu'à un seul chiffre
 *
 * @param {number} num
 * @return {number}
 */
function addDigits(num) {
  let sum = 0;
  while(num > 0) {
    let x = num % 10;
    sum += x;
    num = Math.floor(num / 10);

  }
  if(sum >= 10) {
    return addDigits(sum);
  }
  return sum;

}

// Tests
console.log('Test 1:', addDigits(38), '→ Attendu: 2');
console.log('Test 2:', addDigits(0), '→ Attendu: 0');
console.log('Test 3:', addDigits(123), '→ Attendu: 6');
console.log('Test 4:', addDigits(9875), '→ Attendu: 2');
console.log('Test 5:', addDigits(9), '→ Attendu: 9');
console.log('Test 6:', addDigits(199), '→ Attendu: 1');

// Fonction de test automatique
function runTests() {
    const tests = [
        { input: 38, expected: 2 },
        { input: 0, expected: 0 },
        { input: 123, expected: 6 },
        { input: 9875, expected: 2 },
        { input: 9, expected: 9 },
        { input: 199, expected: 1 },
    ];

    let passed = 0;
    let failed = 0;

    tests.forEach(({ input, expected }) => {
        const result = addDigits(input);
        if (result === expected) {
            console.log(`✅ addDigits(${input}) = ${result}`);
            passed++;
        } else {
            console.log(`❌ addDigits(${input}) = ${result}, attendu: ${expected}`);
            failed++;
        }
    });

    console.log(`\n${passed}/${tests.length} tests passés`);
}

console.log('\n--- Tests automatiques ---');
runTests();
