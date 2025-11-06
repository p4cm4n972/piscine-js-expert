/**
 * Lazy - Lazy evaluation for efficient data transformation
 * Delays computation until a terminal operation is called
 * Processes elements one at a time without intermediate arrays
 *
 * @example
 * Lazy.from([1,2,3,4,5])
 *   .map(x => x * 2)
 *   .filter(x => x > 5)
 *   .take(2)
 *   .toArray(); // Only evaluates when toArray() is called
 */
class Lazy {
    constructor(generator) {
        this._generator = generator;
    }

    /**
     * Creates a Lazy sequence from an iterable
     */
    static from(iterable) {
        // Votre code ici
    }

    /**
     * Maps a function over elements (lazy)
     */
    map(fn) {
        // Votre code ici
    }

    /**
     * Filters elements with a predicate (lazy)
     */
    filter(predicate) {
        // Votre code ici
    }

    /**
     * Takes the first n elements (lazy)
     */
    take(n) {
        // Votre code ici
    }

    /**
     * Skips the first n elements (lazy)
     */
    skip(n) {
        // Votre code ici
    }

    /**
     * FlatMaps (maps and flattens) over elements (lazy)
     */
    flatMap(fn) {
        // Votre code ici
    }

    /**
     * Converts to array (terminal operation)
     */
    toArray() {
        // Votre code ici
    }

    /**
     * Reduces to a single value (terminal operation)
     */
    reduce(fn, initial) {
        // Votre code ici
    }

    /**
     * Iterates over each element (terminal operation)
     */
    forEach(fn) {
        // Votre code ici
    }

    /**
     * Returns first element (terminal operation)
     */
    first() {
        // Votre code ici
    }

    /**
     * Counts elements (terminal operation)
     */
    count() {
        // Votre code ici
    }

    /**
     * Makes the Lazy iterable
     */
    [Symbol.iterator]() {
        return this._generator();
    }
}

// Export
module.exports = { Lazy };
