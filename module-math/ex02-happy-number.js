/**
 * Exercice : Happy Number
 *
 * Déterminer si un nombre est "heureux"
 * Un nombre est heureux si en répétant la somme des carrés de ses chiffres,
 * on arrive à 1. Sinon, on boucle infiniment.
 *
 * @param {number} n
 * @return {boolean}
 */
function isHappy(n) {
  let nn = 0;
    nn = sumOfSquares(n);
  console.log(nn);


   
}

// Fonction helper : calcule la somme des carrés des chiffres
function sumOfSquares(n) {
  let sum = 0;  
  while( n > 0) {
    let digit = n%10 ;
    sum += digit * digit;
    n = Math.floor(n/10);
  }
return sum;
}

function memo(s) {
  const seen = new Set();
  while(s !== 1 && !seen.has(s)) {
    seen.add(n);
    s = sumOfSquares(s);
  }
  return s === 1;
}

// Tests
console.log('Test 1:', isHappy(19), '→ Attendu: true');
console.log('Test 2:', isHappy(2), '→ Attendu: false');
console.log('Test 3:', isHappy(1), '→ Attendu: true');
console.log('Test 4:', isHappy(7), '→ Attendu: true');
console.log('Test 5:', isHappy(100), '→ Attendu: true');

// Tests automatiques
function runTests() {
    const tests = [
        { input: 19, expected: true },
        { input: 2, expected: false },
        { input: 1, expected: true },
        { input: 7, expected: true },
        { input: 100, expected: true },
    ];

    let passed = 0;
    let failed = 0;

    tests.forEach(({ input, expected }) => {
        const result = isHappy(input);
        if (result === expected) {
            console.log(`✅ isHappy(${input}) = ${result}`);
            passed++;
        } else {
            console.log(`❌ isHappy(${input}) = ${result}, attendu: ${expected}`);
            failed++;
        }
    });

    console.log(`\n${passed}/${tests.length} tests passés`);
}

console.log('\n--- Tests automatiques ---');
runTests();
