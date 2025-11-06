function measurePerformance(fn, iterations = 10000) {
    // Votre code ici
}

// Optimisez cette fonction
function slowFunction(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 === 0) {
            result.push(arr[i] * 2);
        }
    }
    return result;
}

function fastFunction(arr) {
    // Votre version optimisée ici
}

module.exports = { measurePerformance, slowFunction, fastFunction };
