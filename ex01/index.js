/**
 * Transforms a function with multiple arguments into a sequence of functions
 * each taking a single argument (or multiple arguments)
 *
 * @param {Function} fn - Function to curry
 * @returns {Function} Curried function
 *
 * @example
 * const add = (a, b, c) => a + b + c;
 * const curriedAdd = curry(add);
 * curriedAdd(1)(2)(3); // 6
 * curriedAdd(1, 2)(3); // 6
 */
function curry(fn) {
    // Votre code ici
}

// Export
module.exports = { curry };
