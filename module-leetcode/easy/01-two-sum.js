/* ************************************************************************** */
/*                                                                            */
/*   01-two-sum.js                                                            */
/*                                                                            */
/*   LeetCode #1 - Two Sum                                                    */
/*   https://leetcode.com/problems/two-sum/                                   */
/*                                                                            */
/* ************************************************************************** */

/**
 * DIFFICULTÉ: Easy ⭐
 * TEMPS ATTENDU: 10-15 minutes
 * FRÉQUENCE: ⭐⭐⭐⭐⭐ (posé chez Google, Amazon, Meta, Microsoft, Apple)
 *
 * PATTERNS: Array, Hash Table
 * COMPLEXITÉ CIBLE: O(n) temps, O(n) espace
 */

/*
** ÉNONCÉ :
**
** Étant donné un tableau d'entiers `nums` et un entier `target`,
** retourne les indices des deux nombres qui additionnés donnent `target`.
**
** Vous pouvez supposer que chaque input a exactement UNE solution,
** et vous ne pouvez pas utiliser le même élément deux fois.
**
** Vous pouvez retourner la réponse dans n'importe quel ordre.
**
** EXEMPLES :
**
** Input: nums = [2,7,11,15], target = 9
** Output: [0,1]
** Explication: nums[0] + nums[1] == 2 + 7 == 9
**
** Input: nums = [3,2,4], target = 6
** Output: [1,2]
**
** Input: nums = [3,3], target = 6
** Output: [0,1]
**
** CONTRAINTES :
** - 2 <= nums.length <= 10^4
** - -10^9 <= nums[i] <= 10^9
** - -10^9 <= target <= 10^9
** - Une seule solution valide existe
*/

/**
 * APPROCHE 1 : Brute Force (NAÏVE - à mentionner en interview)
 *
 * Idée : Tester toutes les paires possibles
 *
 * Complexité :
 * - Temps : O(n²) → Boucles imbriquées
 * - Espace : O(1) → Pas de structure additionnelle
 *
 * ❌ Problème : Trop lent pour grandes entrées (10^4 éléments)
 */
function twoSumBruteForce(nums, target) {
	for (let i = 0; i < nums.length; i++) {
		for (let j = i + 1; j < nums.length; j++) {
			if (nums[i] + nums[j] === target) {
				return [i, j];
			}
		}
	}
	return [];
}

/**
 * APPROCHE 2 : Hash Map (OPTIMALE ✅)
 *
 * Idée : Mémoriser les éléments vus dans une Map
 *        Pour chaque élément, chercher si (target - élément) existe déjà
 *
 * Algorithme :
 * 1. Créer une Map vide
 * 2. Pour chaque nombre à l'index i :
 *    - Calculer complement = target - nums[i]
 *    - Si complement existe dans la Map → retourner [map.get(complement), i]
 *    - Sinon, stocker nums[i] dans la Map avec son index
 *
 * Exemple visuel pour nums = [2,7,11,15], target = 9 :
 *
 * i=0, num=2 : complement = 9-2 = 7
 *              Map vide → pas trouvé
 *              Stocker Map{2: 0}
 *
 * i=1, num=7 : complement = 9-7 = 2
 *              Map{2: 0} → 2 existe !
 *              Retourner [0, 1] ✅
 *
 * Complexité :
 * - Temps : O(n) → Un seul parcours
 * - Espace : O(n) → Map de taille n dans le pire cas
 */
function twoSum(nums, target) {
	const map = new Map();

	for (let i = 0; i < nums.length; i++) {
		const complement = target - nums[i];

		if (map.has(complement)) {
			return [map.get(complement), i];
		}

		map.set(nums[i], i);
	}

	// Ne devrait jamais arriver selon les contraintes
	return [];
}

/*
** POURQUOI CETTE SOLUTION EST OPTIMALE ?
**
** 1. Trade-off temps vs espace
**    - Brute force : O(n²) temps, O(1) espace
**    - Hash Map : O(n) temps, O(n) espace
**    → En pratique, O(n) espace acceptable pour gagner O(n²) → O(n) temps
**
** 2. Hash Map = lookup O(1) en moyenne
**    - map.has() et map.get() sont en O(1)
**    - Clé du problème : transformer "chercher dans un tableau" (O(n))
**      en "chercher dans une Map" (O(1))
**
** 3. One-pass solution
**    - Pas besoin de deux parcours (construction Map puis recherche)
**    - On construit et on cherche en même temps
*/

/*
** VARIANTES POSSIBLES EN INTERVIEW :
**
** 1. "Et si le tableau était trié ?"
**    → Utiliser Two Pointers (left, right)
**    → O(n) temps, O(1) espace (mieux !)
**
** 2. "Retourner tous les paires (pas les indices) ?"
**    → Même approche, stocker les valeurs pas les indices
**
** 3. "Et s'il y avait plusieurs solutions ?"
**    → Retourner un tableau de paires
**
** 4. "Peut-on faire en O(1) espace ?"
**    → Non, impossible en O(n) temps sans stockage (sauf si trié)
*/

/*
** PIÈGES À ÉVITER :
**
** ❌ Utiliser le même élément deux fois
**    nums = [3, 3], target = 6
**    → [0, 1] ✅ (deux éléments différents)
**    → [0, 0] ❌ (même élément)
**
** ❌ Retourner les valeurs au lieu des indices
**    Output: [2, 7] ❌
**    Output: [0, 1] ✅
**
** ❌ Oublier de vérifier si complement existe avant d'ajouter
**    → Risque de retourner [i, i]
*/

/*
** QUESTIONS À POSER EN INTERVIEW :
**
** 1. Les nombres peuvent-ils être négatifs ? (Oui)
** 2. Le tableau est-il trié ? (Non précisé)
** 3. Peut-il y avoir des doublons ? (Oui)
** 4. Que retourner si aucune solution ? (Garantie qu'il y en a une)
** 5. Contraintes de mémoire ? (O(n) acceptable)
*/

// ============================================================================
// TESTS
// ============================================================================

function runTests() {
	const tests = [
		{
			nums: [2, 7, 11, 15],
			target: 9,
			expected: [0, 1],
			description: 'Cas basique'
		},
		{
			nums: [3, 2, 4],
			target: 6,
			expected: [1, 2],
			description: 'Paire non consécutive'
		},
		{
			nums: [3, 3],
			target: 6,
			expected: [0, 1],
			description: 'Doublons'
		},
		{
			nums: [-1, -2, -3, -4, -5],
			target: -8,
			expected: [2, 4],
			description: 'Nombres négatifs'
		},
		{
			nums: [0, 4, 3, 0],
			target: 0,
			expected: [0, 3],
			description: 'Target = 0'
		}
	];

	console.log('🧪 Two Sum - Tests\n');

	tests.forEach((test, index) => {
		const result = twoSum(test.nums, test.target);
		const passed =
			result.length === 2 &&
			test.nums[result[0]] + test.nums[result[1]] === test.target;

		console.log(
			`Test ${index + 1}: ${passed ? '✅' : '❌'} ${test.description}`
		);
		console.log(`  Input: nums=${JSON.stringify(test.nums)}, target=${test.target}`);
		console.log(`  Output: [${result}]`);
		console.log(
			`  Vérif: nums[${result[0]}] + nums[${result[1]}] = ${test.nums[result[0]]} + ${test.nums[result[1]]} = ${test.nums[result[0]] + test.nums[result[1]]}\n`
		);
	});
}

// Exécuter les tests
runTests();

/*
** POUR ALLER PLUS LOIN :
**
** 1. Résoudre "3Sum" (LeetCode #15) - Medium
**    → Extension avec 3 nombres
**
** 2. Résoudre "4Sum" (LeetCode #18) - Medium
**    → Généralisation à K nombres
**
** 3. Résoudre "Two Sum II" (LeetCode #167) - Easy
**    → Tableau trié → utiliser Two Pointers
*/

module.exports = { twoSum, twoSumBruteForce };
