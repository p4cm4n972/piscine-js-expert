/**
 * Run all tests in sequence
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧪 Running all tests...\n');

const exercises = [];
for (let i = 0; i <= 14; i++) {
    const exDir = path.join(__dirname, `ex${String(i).padStart(2, '0')}`);
    if (fs.existsSync(exDir)) {
        exercises.push(`ex${String(i).padStart(2, '0')}`);
    }
}

let totalPassed = 0;
let totalFailed = 0;

exercises.forEach((ex, index) => {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Running ${ex}... (${index + 1}/${exercises.length})`);
    console.log('='.repeat(60));

    try {
        const output = execSync(`node ${ex}/test.js`, {
            encoding: 'utf8',
            stdio: 'pipe'
        });
        console.log(output);

        // Parse results (basic parsing)
        const match = output.match(/(\d+) passed, (\d+) failed/);
        if (match) {
            totalPassed += parseInt(match[1]);
            totalFailed += parseInt(match[2]);
        }
    } catch (error) {
        console.error(`❌ ${ex} failed with error`);
        console.error(error.stdout || error.message);
        totalFailed++;
    }
});

console.log('\n' + '='.repeat(60));
console.log('📊 FINAL RESULTS');
console.log('='.repeat(60));
console.log(`Total Passed: ${totalPassed}`);
console.log(`Total Failed: ${totalFailed}`);
console.log(`Success Rate: ${((totalPassed / (totalPassed + totalFailed)) * 100).toFixed(1)}%`);
console.log('='.repeat(60));

process.exit(totalFailed > 0 ? 1 : 0);
