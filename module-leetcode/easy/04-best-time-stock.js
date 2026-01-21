/* ************************************************************************** */
/*                                                                            */
/*   04-best-time-stock.js                                                    */
/*                                                                            */
/*   LeetCode #121 - Best Time to Buy and Sell Stock                          */
/*   https://leetcode.com/problems/best-time-to-buy-and-sell-stock/          */
/*                                                                            */
/* ************************************************************************** */

/**
 * DIFFICULTÉ: Easy ⭐
 * TEMPS ATTENDU: 15 minutes
 * FRÉQUENCE: ⭐⭐⭐⭐⭐ (posé chez Amazon, Meta, Google, Microsoft)
 *
 * PATTERNS: Array, Greedy, Dynamic Programming
 * COMPLEXITÉ CIBLE: O(n) temps, O(1) espace
 */

/*
** ÉNONCÉ :
**
** Vous recevez un tableau `prices` où prices[i] est le prix d'une action
** donnée le jour i.
**
** Vous voulez maximiser votre profit en choisissant un seul jour pour acheter
** une action et en choisissant un jour différent dans le futur pour la vendre.
**
** Retournez le profit maximum que vous pouvez réaliser avec cette transaction.
** Si vous ne pouvez réaliser aucun profit, retournez 0.
**
** EXEMPLES :
**
** Input: prices = [7,1,5,3,6,4]
** Output: 5
** Explication: Acheter au jour 2 (prix = 1) et vendre au jour 5 (prix = 6)
**              Profit = 6-1 = 5
**              Note: Acheter à 7 puis vendre à 6 n'est pas autorisé (perte)
**
** Input: prices = [7,6,4,3,1]
** Output: 0
** Explication: Aucun profit possible (prix toujours en baisse)
**
** CONTRAINTES :
** - 1 <= prices.length <= 10^5
** - 0 <= prices[i] <= 10^4
*/

/**
 * APPROCHE 1 : Brute Force (NAÏVE - O(n²))
 *
 * Idée : Tester toutes les paires (achat, vente)
 *
 * ❌ Problème : Trop lent pour 10^5 éléments
 */
function maxProfitBruteForce(prices) {
	let maxProfit = 0;

	for (let buy = 0; buy < prices.length; buy++) {
		for (let sell = buy + 1; sell < prices.length; sell++) {
			const profit = prices[sell] - prices[buy];
			maxProfit = Math.max(maxProfit, profit);
		}
	}

	return maxProfit;
}

/**
 * APPROCHE 2 : One Pass avec Min Tracking (OPTIMALE ✅)
 *
 * Idée : Garder trace du prix minimum vu jusqu'à présent
 *        À chaque jour, calculer le profit si on vendait aujourd'hui
 *
 * Algorithme :
 * 1. Initialiser minPrice = Infinity, maxProfit = 0
 * 2. Pour chaque prix :
 *    - Calculer profit = prix_actuel - minPrice
 *    - Mettre à jour maxProfit si nécessaire
 *    - Mettre à jour minPrice si prix_actuel est plus petit
 * 3. Retourner maxProfit
 *
 * Exemple visuel pour prices = [7,1,5,3,6,4] :
 *
 * Jour 0 (prix=7) : minPrice=7, profit=0, maxProfit=0
 * Jour 1 (prix=1) : minPrice=1, profit=0, maxProfit=0
 * Jour 2 (prix=5) : minPrice=1, profit=4, maxProfit=4
 * Jour 3 (prix=3) : minPrice=1, profit=2, maxProfit=4
 * Jour 4 (prix=6) : minPrice=1, profit=5, maxProfit=5 ✅
 * Jour 5 (prix=4) : minPrice=1, profit=3, maxProfit=5
 *
 * Résultat : 5 (acheter à 1, vendre à 6)
 *
 * Complexité :
 * - Temps : O(n) → Un seul parcours
 * - Espace : O(1) → Deux variables seulement
 */
function maxProfit(prices) {
	let minPrice = Infinity;
	let maxProfit = 0;

	for (const price of prices) {
		// Calculer le profit si on vendait aujourd'hui
		const profit = price - minPrice;

		// Mettre à jour le profit maximum
		maxProfit = Math.max(maxProfit, profit);

		// Mettre à jour le prix minimum
		minPrice = Math.min(minPrice, price);
	}

	return maxProfit;
}

/**
 * APPROCHE 3 : Version alternative avec index
 *
 * Même logique mais peut être utile si on doit retourner les indices
 */
function maxProfitWithIndices(prices) {
	let minPrice = Infinity;
	let maxProfit = 0;
	let buyDay = 0;
	let sellDay = 0;

	for (let i = 0; i < prices.length; i++) {
		if (prices[i] < minPrice) {
			minPrice = prices[i];
			buyDay = i;
		}

		const profit = prices[i] - minPrice;
		if (profit > maxProfit) {
			maxProfit = profit;
			sellDay = i;
		}
	}

	return { maxProfit, buyDay, sellDay };
}

/*
** POURQUOI CETTE SOLUTION EST OPTIMALE ?
**
** 1. Observation clé :
**    Pour maximiser le profit, il faut :
**    - Acheter au prix le PLUS BAS possible
**    - Vendre au prix le PLUS HAUT possible APRÈS l'achat
**
** 2. Greedy approach :
**    On n'a pas besoin de connaître le futur
**    À chaque jour, on sait quel était le meilleur jour d'achat jusqu'à présent
**
** 3. One-pass :
**    Pas besoin de deux parcours (min puis max)
**    On fait tout en même temps !
*/

/*
** PATTERN : Kadane's Algorithm (variation)
**
** Ce problème est une variation de "Maximum Subarray" (Kadane)
**
** Relation :
** - Maximum Subarray : trouver la somme maximale de sous-tableau
** - Best Time to Buy Stock : trouver la différence maximale (future - past)
**
** Version Kadane adaptée :
** function maxProfit(prices) {
**     let maxProfit = 0;
**     let currentProfit = 0;
**
**     for (let i = 1; i < prices.length; i++) {
**         currentProfit = Math.max(0, currentProfit + prices[i] - prices[i-1]);
**         maxProfit = Math.max(maxProfit, currentProfit);
**     }
**
**     return maxProfit;
** }
*/

/*
** VARIANTES EN INTERVIEW :
**
** 1. "Best Time to Buy and Sell Stock II" (LeetCode #122)
**    → Transactions multiples autorisées
**    → Acheter et vendre le même jour possible
**
** 2. "Best Time to Buy and Sell Stock III" (LeetCode #123) - Hard
**    → Maximum 2 transactions
**    → Nécessite DP
**
** 3. "Best Time to Buy and Sell Stock IV" (LeetCode #188) - Hard
**    → Maximum k transactions
**
** 4. "Best Time with Cooldown" (LeetCode #309) - Medium
**    → 1 jour de cooldown après vente
**
** 5. "Best Time with Transaction Fee" (LeetCode #714) - Medium
**    → Frais de transaction à chaque vente
*/

/*
** PIÈGES À ÉVITER :
**
** ❌ Vendre avant d'acheter
**    prices = [7,1,5,3,6,4]
**    → Ne PAS retourner 7-1 = 6 (vente au jour 0, achat au jour 1)
**
** ❌ Utiliser min/max global sans ordre
**    max(prices) - min(prices) ❌
**    → Ne garantit pas que min vient avant max
**
** ❌ Retourner un profit négatif
**    prices = [7,6,4,3,1]
**    → Retourner 0, pas -6 !
*/

// ============================================================================
// TESTS
// ============================================================================

function runTests() {
	const tests = [
		{
			prices: [7, 1, 5, 3, 6, 4],
			expected: 5,
			description: 'Cas classique (acheter à 1, vendre à 6)'
		},
		{
			prices: [7, 6, 4, 3, 1],
			expected: 0,
			description: 'Prix décroissant (aucun profit)'
		},
		{
			prices: [1, 2, 3, 4, 5],
			expected: 4,
			description: 'Prix croissant (acheter jour 0, vendre dernier jour)'
		},
		{
			prices: [2, 4, 1],
			expected: 2,
			description: 'Max profit au début'
		},
		{
			prices: [3, 2, 6, 5, 0, 3],
			expected: 4,
			description: 'Acheter à 2, vendre à 6'
		},
		{
			prices: [1],
			expected: 0,
			description: 'Un seul jour (impossible de vendre)'
		},
		{
			prices: [2, 1, 2, 1, 0, 1, 2],
			expected: 2,
			description: 'Multiples opportunités (choisir la meilleure)'
		}
	];

	console.log('🧪 Best Time to Buy and Sell Stock - Tests\n');

	tests.forEach((test, index) => {
		const result = maxProfit(test.prices);
		const passed = result === test.expected;

		console.log(
			`Test ${index + 1}: ${passed ? '✅' : '❌'} ${test.description}`
		);
		console.log(`  Prices: [${test.prices}]`);
		console.log(`  Output: ${result}`);
		console.log(`  Expected: ${test.expected}\n`);
	});

	// Test avec indices
	console.log('📊 Exemple avec indices (Best Time to Buy and Sell Stock):\n');
	const example = [7, 1, 5, 3, 6, 4];
	const resultWithIndices = maxProfitWithIndices(example);
	console.log(`Prices: [${example}]`);
	console.log(`Acheter au jour ${resultWithIndices.buyDay} (prix = ${example[resultWithIndices.buyDay]})`);
	console.log(`Vendre au jour ${resultWithIndices.sellDay} (prix = ${example[resultWithIndices.sellDay]})`);
	console.log(`Profit maximal: ${resultWithIndices.maxProfit}\n`);
}

runTests();

/*
** APPLICATIONS RÉELLES :
**
** 1. Trading algorithmique
**    → Identifier les opportunités d'achat/vente
**
** 2. Analyse de tendances
**    → Détecter les points bas et hauts
**
** 3. Optimisation de prix dynamique
**    → E-commerce, hôtellerie (quand baisser/augmenter les prix)
**
** 4. Gestion de portfolio
**    → Timing d'entrée/sortie sur un actif
*/

/*
** CONCEPTS CLÉS POUR SENIOR :
**
** 1. Greedy vs Dynamic Programming
**    Ce problème est greedy (décision locale optimale)
**    Mais Kadane est techniquement du DP
**
** 2. State tracking
**    minPrice = "état" du meilleur achat possible jusqu'ici
**
** 3. Single-pass optimization
**    Éviter les parcours multiples inutiles
*/

