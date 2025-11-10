/**
 * Returns a greeting message
 * @param {string} name
 * @returns {string}
 */
function greet(name) {
    // Votre code ici (utilisez template literals)
}

/**
 * Formats product and price
 * @param {string} product
 * @param {number} price
 * @returns {string}
 */
function formatPrice(product, price) {
    // Votre code ici
}

/**
 * Creates an HTML card (multi-line)
 * @param {string} name
 * @param {number} age
 * @param {string} city
 * @returns {string}
 */
function createHTMLCard(name, age, city) {
    // Votre code ici (multi-lignes avec backticks)
}

/**
 * Creates URL with query parameters
 * @param {string} base
 * @param {Object} params
 * @returns {string}
 */
function createURL(base, params) {
    // Votre code ici
    // Indice: Object.entries() pour itérer sur les paramètres
}

/**
 * Tagged template that uppercases values
 * @param {string[]} strings
 * @param {...*} values
 * @returns {string}
 */
function taggedTemplate(strings, ...values) {
    // Votre code ici (tagged template function)
}

module.exports = {
    greet,
    formatPrice,
    createHTMLCard,
    createURL,
    taggedTemplate
};
