/**
 * MyPromise - A Promises/A+ compliant implementation
 *
 * States: pending -> fulfilled/rejected
 *
 * @example
 * new MyPromise((resolve, reject) => {
 *   setTimeout(() => resolve(42), 1000);
 * }).then(value => console.log(value));
 */

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
    constructor(executor) {
        this.state = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        // Votre code ici pour resolve et reject
        // N'oubliez pas : ils ne doivent être appelables qu'une seule fois

        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    /**
     * Attache des callbacks pour la résolution et/ou le rejet
     */
    then(onFulfilled, onRejected) {
        // Votre code ici
        // Doit retourner une nouvelle MyPromise
        // Doit gérer le chaînage
    }

    /**
     * Gère uniquement les rejets
     */
    catch(onRejected) {
        return this.then(null, onRejected);
    }

    /**
     * Exécuté dans tous les cas (succès ou échec)
     */
    finally(onFinally) {
        // Votre code ici
    }

    /**
     * Crée une promise déjà résolue
     */
    static resolve(value) {
        // Votre code ici
    }

    /**
     * Crée une promise déjà rejetée
     */
    static reject(reason) {
        // Votre code ici
    }

    /**
     * Attend que toutes les promises soient résolues
     * Rejette si une seule rejette
     */
    static all(promises) {
        // Votre code ici
    }

    /**
     * Résout/rejette dès que la première promise termine
     */
    static race(promises) {
        // Votre code ici
    }

    /**
     * Attend toutes les promises (succès ou échec)
     */
    static allSettled(promises) {
        // Votre code ici
    }
}

// Export
module.exports = { MyPromise };
