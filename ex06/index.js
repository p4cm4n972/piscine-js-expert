/**
 * Retries an async function with exponential backoff
 *
 * @param {Function} fn - Async function to retry
 * @param {Object} options - Retry options
 * @param {number} options.maxAttempts - Maximum number of attempts
 * @param {number} options.delay - Initial delay in ms
 * @param {number} options.backoff - Backoff multiplier
 * @param {Function} options.shouldRetry - Predicate to determine if should retry
 */
async function retry(fn, options = {}) {
    const {
        maxAttempts = 3,
        delay = 1000,
        backoff = 1,
        shouldRetry = () => true
    } = options;

    // Votre code ici
}

/**
 * Adds a timeout to a promise
 *
 * @param {Promise} promise - Promise to timeout
 * @param {number} ms - Timeout in milliseconds
 */
function timeout(promise, ms) {
    // Votre code ici
}

/**
 * Executes async tasks with limited concurrency
 *
 * @param {Array<Function>} tasks - Array of async functions
 * @param {number} concurrency - Max concurrent tasks
 * @returns {Promise<Array>} Results array
 */
async function parallel(tasks, concurrency) {
    // Votre code ici
}

/**
 * Executes tasks in sequence, passing result to next
 *
 * @param {Array<Function>} tasks - Array of async functions
 * @returns {Promise} Final result
 */
async function waterfall(tasks) {
    // Votre code ici
}

/**
 * Converts a callback-style function to return a promise
 *
 * @param {Function} fn - Callback-style function (last arg is callback)
 * @returns {Function} Promisified function
 */
function promisify(fn) {
    // Votre code ici
}

// Export
module.exports = {
    retry,
    timeout,
    parallel,
    waterfall,
    promisify
};
