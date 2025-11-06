/**
 * Generator that produces a range of numbers
 *
 * @param {number} start - Start value (inclusive)
 * @param {number} end - End value (exclusive)
 * @param {number} step - Step size (default 1)
 */
function* range(start, end, step = 1) {
    // Votre code ici
}

/**
 * Infinite generator of Fibonacci numbers
 */
function* fibonacci() {
    // Votre code ici
}

/**
 * Takes the first n elements from an iterator
 *
 * @param {Iterator} iterator - Source iterator
 * @param {number} n - Number of elements to take
 */
function* take(iterator, n) {
    // Votre code ici
}

/**
 * Maps a function over an iterator (lazy)
 *
 * @param {Iterator} iterator - Source iterator
 * @param {Function} fn - Mapping function
 */
function* map(iterator, fn) {
    // Votre code ici
}

/**
 * Filters an iterator with a predicate (lazy)
 *
 * @param {Iterator} iterator - Source iterator
 * @param {Function} predicate - Filter predicate
 */
function* filter(iterator, predicate) {
    // Votre code ici
}

/**
 * Zips multiple iterators together
 * Stops when the shortest iterator is exhausted
 *
 * @param {...Iterator} iterators - Iterators to zip
 */
function* zip(...iterators) {
    // Votre code ici
}

/**
 * Async queue that can be consumed with for-await-of
 */
class AsyncQueue {
    constructor() {
        this.queue = [];
        this.resolvers = [];
        this.closed = false;
    }

    /**
     * Adds an item to the queue
     */
    async enqueue(item) {
        // Votre code ici
    }

    /**
     * Closes the queue (no more items will be added)
     */
    close() {
        // Votre code ici
    }

    /**
     * Makes AsyncQueue an async iterable
     */
    async *[Symbol.asyncIterator]() {
        // Votre code ici
    }
}

// Export
module.exports = {
    range,
    fibonacci,
    take,
    map,
    filter,
    zip,
    AsyncQueue
};
