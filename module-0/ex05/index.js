/**
 * Gets a property value from object
 * @param {Object} obj
 * @param {string} key
 * @returns {*}
 */
function getProperty(obj, key) {
    // Votre code ici
}

/**
 * Merges two objects (obj2 overrides obj1)
 * @param {Object} obj1
 * @param {Object} obj2
 * @returns {Object} New merged object
 */
function mergeObjects(obj1, obj2) {
    // Votre code ici (utilisez spread ou Object.assign)
}

/**
 * Picks specified keys from object
 * @param {Object} obj
 * @param {string[]} keys
 * @returns {Object} New object with only specified keys
 */
function pick(obj, keys) {
    // Votre code ici
}

/**
 * Inverts object (keys become values, values become keys)
 * @param {Object} obj
 * @returns {Object}
 */
function invertObject(obj) {
    // Votre code ici
}

module.exports = {
    getProperty,
    mergeObjects,
    pick,
    invertObject
};
