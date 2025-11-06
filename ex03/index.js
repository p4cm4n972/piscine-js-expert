/**
 * Maybe Monad - Represents a value that may or may not exist
 * Provides a safe way to handle null/undefined values functionally
 *
 * @example
 * Maybe.of(5)
 *   .map(x => x * 2)
 *   .filter(x => x > 5)
 *   .getOrElse(0); // 10
 */
class Maybe {
    constructor(value) {
        this._value = value;
    }

    /**
     * Creates a Just (Some) Maybe with a value
     * Returns Nothing if value is null or undefined
     */
    static of(value) {
        // Votre code ici
    }

    /**
     * Creates a Nothing Maybe (empty)
     */
    static nothing() {
        // Votre code ici
    }

    /**
     * Checks if this Maybe is Nothing
     */
    isNothing() {
        // Votre code ici
    }

    /**
     * Checks if this Maybe is Just (has a value)
     */
    isJust() {
        // Votre code ici
    }

    /**
     * Maps a function over the value if it exists
     * Returns Nothing if this is Nothing
     */
    map(fn) {
        // Votre code ici
    }

    /**
     * FlatMap (bind/chain) - maps a function that returns a Maybe
     * and flattens the result
     */
    flatMap(fn) {
        // Votre code ici
    }

    /**
     * Filters the value with a predicate
     * Returns Nothing if predicate returns false
     */
    filter(predicate) {
        // Votre code ici
    }

    /**
     * Extracts the value or returns a default
     */
    getOrElse(defaultValue) {
        // Votre code ici
    }

    /**
     * Pattern matching - executes onNothing or onJust based on state
     */
    fold(onNothing, onJust) {
        // Votre code ici (bonus)
    }

    /**
     * Returns this Maybe if Just, otherwise returns the alternative
     */
    orElse(alternativeMaybe) {
        // Votre code ici (bonus)
    }
}

// Export
module.exports = { Maybe };
