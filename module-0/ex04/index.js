/**
 * Doubles all numbers in array
 * @param {number[]} arr
 * @returns {number[]}
 */
function doubleNumbers(arr) {
    // Votre code ici (utilisez map)
}

/**
 * Filters even numbers
 * @param {number[]} arr
 * @returns {number[]}
 */
function filterEven(arr) {
    // Votre code ici (utilisez filter)
}

/**
 * Sums all numbers in array
 * @param {number[]} arr
 * @returns {number}
 */
function sumArray(arr) {
    // Votre code ici (utilisez reduce)
}

/**
 * Extracts names from array of user objects
 * @param {Array<{name: string}>} users
 * @returns {string[]}
 */
function getNames(users) {
    // Votre code ici
}

/**
 * Counts occurrences by property value
 * @param {Array<Object>} arr
 * @param {string} prop
 * @returns {Object} { value: count }
 */
function countByProperty(arr, prop) {
    // Votre code ici (utilisez reduce)
    // Exemple: [{age: 20}, {age: 20}, {age: 30}], 'age' -> {20: 2, 30: 1}
}

module.exports = {
    doubleNumbers,
    filterEven,
    sumArray,
    getNames,
    countByProperty
};
