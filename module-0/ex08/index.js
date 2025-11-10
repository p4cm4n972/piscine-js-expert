/**
 * Merges multiple arrays into one
 * @param {...Array} arrays
 * @returns {Array}
 */
function mergeArrays(...arrays) {
    // Votre code ici (utilisez spread)
}

/**
 * Clones an object (shallow copy)
 * @param {Object} obj
 * @returns {Object} New object
 */
function cloneObject(obj) {
    // Votre code ici (utilisez spread)
}

/**
 * Adds a property to object (immutably)
 * @param {Object} obj
 * @param {string} key
 * @param {*} value
 * @returns {Object} New object with added property
 */
function addProperty(obj, key, value) {
    // Votre code ici (utilisez spread)
}

/**
 * Removes a property from object (immutably)
 * @param {Object} obj
 * @param {string} key
 * @returns {Object} New object without the property
 */
function removeProperty(obj, key) {
    // Votre code ici (utilisez destructuring + rest)
}

/**
 * Returns first element and rest of array
 * @param {Array} arr
 * @returns {{first: *, rest: Array}}
 */
function getFirstAndRest(arr) {
    // Votre code ici (utilisez destructuring)
}

module.exports = {
    mergeArrays,
    cloneObject,
    addProperty,
    removeProperty,
    getFirstAndRest
};
