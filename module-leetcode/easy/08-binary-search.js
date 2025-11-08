/* ************************************************************************** */
/*                                                                            */
/*   08-binary-search.js                                                      */
/*                                                                            */
/*   LeetCode #704 - Binary Search                                            */
/*   https://leetcode.com/problems/binary-search/                             */
/*                                                                            */
/* ************************************************************************** */

/**
 * DIFFICULTÉ: Easy ⭐
 * TEMPS ATTENDU: 10 minutes
 * FRÉQUENCE: ⭐⭐⭐⭐ (posé chez Meta, Google, Amazon, Microsoft)
 *
 * PATTERNS: Binary Search, Array
 * COMPLEXITÉ CIBLE: O(log n) temps, O(1) espace
 *
 * NOTE: Algorithme fondamental à connaître PAR CŒUR
 */

/*
** ÉNONCÉ :
**
** Étant donné un tableau d'entiers `nums` trié par ordre croissant
** et un entier `target`, écrire une fonction pour rechercher `target` dans `nums`.
**
** Si `target` existe, retourner son index. Sinon, retourner -1.
**
** Vous devez écrire un algorithme en O(log n) complexité temporelle.
**
** EXEMPLES :
**
** Input: nums = [-1,0,3,5,9,12], target = 9
** Output: 4
** Explication: 9 existe dans nums et son index est 4
**
** Input: nums = [-1,0,3,5,9,12], target = 2
** Output: -1
** Explication: 2 n'existe pas dans nums donc return -1
**
** CONTRAINTES :
** - 1 <= nums.length <= 10^4
** - -10^4 < nums[i], target < 10^4
** - Tous les entiers dans nums sont uniques
** - nums est trié par ordre croissant
*/

/**
 * APPROCHE 1 : Binary Search Iterative (STANDARD ✅)
 *
 * Idée : Diviser l'espace de recherche par 2 à chaque itération
 *
 * Algorithme :
 * 1. left = 0, right = nums.length - 1
 * 2. Tant que left <= right :
 *    - mid = floor((left + right) / 2)
 *    - Si nums[mid] == target → retourner mid
 *    - Si nums[mid] < target → chercher à droite (left = mid + 1)
 *    - Si nums[mid] > target → chercher à gauche (right = mid - 1)
 * 3. Retourner -1 (non trouvé)
 *
 * Exemple visuel pour nums = [-1,0,3,5,9,12], target = 9 :
 *
 * Itération 1 : left=0, right=5, mid=2 → nums[2]=3 < 9 → left=3
 * Itération 2 : left=3, right=5, mid=4 → nums[4]=9 == 9 → return 4 ✅
 *
 * Complexité :
 * - Temps : O(log n) → Divise par 2 à chaque étape
 * - Espace : O(1) → Pas de récursion
 */
function search(nums, target) {
	let left = 0;
	let right = nums.length - 1;

	while (left <= right) {
		// Calculer mid (évite overflow pour très grands tableaux)
		const mid = Math.floor(left + (right - left) / 2);

		if (nums[mid] === target) {
			return mid;
		}

		if (nums[mid] < target) {
			left = mid + 1; // Chercher dans la moitié droite
		} else {
			right = mid - 1; // Chercher dans la moitié gauche
		}
	}

	return -1; // Non trouvé
}

/**
 * APPROCHE 2 : Binary Search Recursive
 *
 * Même logique mais récursive
 *
 * Complexité :
 * - Temps : O(log n)
 * - Espace : O(log n) → Call stack
 */
function searchRecursive(nums, target, left = 0, right = nums.length - 1) {
	// Cas de base : intervalle vide
	if (left > right) {
		return -1;
	}

	const mid = Math.floor(left + (right - left) / 2);

	if (nums[mid] === target) {
		return mid;
	}

	if (nums[mid] < target) {
		return searchRecursive(nums, target, mid + 1, right);
	} else {
		return searchRecursive(nums, target, left, mid - 1);
	}
}

/*
** TEMPLATE BINARY SEARCH (à connaître par cœur) :
**
** let left = 0, right = arr.length - 1;
** while (left <= right) {
**     const mid = Math.floor(left + (right - left) / 2);
**
**     if (condition_found) {
**         return mid;
**     }
**
**     if (go_right) {
**         left = mid + 1;
**     } else {
**         right = mid - 1;
**     }
** }
** return -1; // ou autre valeur par défaut
*/

/*
** POURQUOI Math.floor(left + (right - left) / 2) ?
**
** ❌ Version naïve : mid = Math.floor((left + right) / 2)
**    → Risque d'overflow si left + right > MAX_INT
**    → En JavaScript, moins critique (Number.MAX_SAFE_INTEGER = 2^53)
**    → Mais bonne pratique de l'éviter (important en C/Java)
**
** ✅ Version safe : mid = Math.floor(left + (right - left) / 2)
**    → Équivalent à (left + right) / 2 mais sans overflow
**
** Alternative moderne :
** mid = left + ((right - left) >> 1)  // Bit shift pour division par 2
*/

/*
** INVARIANT DE BOUCLE :
**
** À chaque itération, une des trois conditions est vraie :
** 1. target est dans [left, mid-1] → right = mid - 1
** 2. target est à mid → return mid
** 3. target est dans [mid+1, right] → left = mid + 1
**
** Terminaison : left <= right devient false → target non trouvé
*/

/*
** VARIANTES EN INTERVIEW :
**
** 1. "First Bad Version" (LeetCode #278) - Easy
**    → Trouver la première version bugguée
**    → Binary search avec condition différente
**
** 2. "Search Insert Position" (LeetCode #35) - Easy
**    → Retourner l'index où insérer si non trouvé
**
** 3. "Search in Rotated Sorted Array" (LeetCode #33) - Medium
**    → Binary search sur tableau trié puis rotaté
**    → [4,5,6,7,0,1,2] target=0
**
** 4. "Find Minimum in Rotated Sorted Array" (LeetCode #153) - Medium
**
** 5. "Search a 2D Matrix" (LeetCode #74) - Medium
**    → Binary search sur matrice
*/

/*
** PIÈGES À ÉVITER :
**
** ❌ Utiliser left < right au lieu de left <= right
**    → Peut manquer le dernier élément
**
** ❌ Oublier de mettre mid + 1 ou mid - 1
**    → Boucle infinie si left = mid ou right = mid
**
** ❌ Retourner mid au lieu de -1 quand non trouvé
**
** ❌ Utiliser floor() sur un nombre négatif sans précaution
**    → Math.floor(-0.5) = -1 (pas 0)
*/

// ============================================================================
// TESTS
// ============================================================================

function runTests() {
	const tests = [
		{
			nums: [-1, 0, 3, 5, 9, 12],
			target: 9,
			expected: 4,
			description: 'Target au milieu-droit'
		},
		{
			nums: [-1, 0, 3, 5, 9, 12],
			target: 2,
			expected: -1,
			description: 'Target non existant'
		},
		{
			nums: [5],
			target: 5,
			expected: 0,
			description: 'Un seul élément (trouvé)'
		},
		{
			nums: [5],
			target: 3,
			expected: -1,
			description: 'Un seul élément (non trouvé)'
		},
		{
			nums: [-1, 0, 3, 5, 9, 12],
			target: -1,
			expected: 0,
			description: 'Target au début'
		},
		{
			nums: [-1, 0, 3, 5, 9, 12],
			target: 12,
			expected: 5,
			description: 'Target à la fin'
		},
		{
			nums: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
			target: 1,
			expected: 0,
			description: 'Premier élément'
		},
		{
			nums: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
			target: 10,
			expected: 9,
			description: 'Dernier élément'
		}
	];

	console.log('🧪 Binary Search - Tests\n');

	tests.forEach((test, index) => {
		const result = search(test.nums, test.target);
		const passed = result === test.expected;

		console.log(
			`Test ${index + 1}: ${passed ? '✅' : '❌'} ${test.description}`
		);
		console.log(`  nums: [${test.nums}]`);
		console.log(`  target: ${test.target}`);
		console.log(`  Output: ${result}`);
		console.log(`  Expected: ${test.expected}\n`);
	});

	// Démonstration du nombre d'itérations
	console.log('📊 Nombre d\'itérations vs taille du tableau:\n');

	function countIterations(nums, target) {
		let left = 0;
		let right = nums.length - 1;
		let count = 0;

		while (left <= right) {
			count++;
			const mid = Math.floor(left + (right - left) / 2);

			if (nums[mid] === target) {
				return count;
			}

			if (nums[mid] < target) {
				left = mid + 1;
			} else {
				right = mid - 1;
			}
		}

		return count;
	}

	const sizes = [10, 100, 1000, 10000, 100000, 1000000];
	sizes.forEach((size) => {
		const arr = Array.from({ length: size }, (_, i) => i);
		const iterations = countIterations(arr, size - 1); // Pire cas (dernier élément)
		console.log(
			`n = ${size.toLocaleString().padStart(10)} → ~${iterations} itérations (log₂(${size}) ≈ ${Math.ceil(Math.log2(size))})`
		);
	});
}

runTests();

/*
** COMPLEXITÉ : Pourquoi O(log n) ?
**
** À chaque itération, on divise l'espace de recherche par 2.
**
** n = 1,000,000 éléments :
** Itération 1 : 1,000,000 → 500,000
** Itération 2 : 500,000 → 250,000
** ...
** Itération 20 : 2 → 1
**
** Nombre d'itérations = log₂(n)
** log₂(1,000,000) ≈ 20 itérations !
**
** Comparaison :
** - Linear search : 1,000,000 comparaisons dans le pire cas
** - Binary search : ~20 comparaisons
** → 50,000x plus rapide !
*/

/*
** APPLICATIONS RÉELLES :
**
** 1. Bases de données (index B-tree)
**    → Recherche dans des tables indexées
**
** 2. Recherche de versions (git bisect)
**    → Trouver le commit qui a introduit un bug
**
** 3. Optimisation numérique
**    → Trouver un seuil (dichotomie)
**
** 4. Auto-complétion
**    → Recherche dans un dictionnaire trié
**
** 5. Jeux vidéo
**    → Pathfinding, collision detection
*/

/*
** CONCEPTS CLÉS POUR SENIOR :
**
** 1. Divide & Conquer
**    Binary search est l'exemple parfait de D&C
**    → Diviser le problème en sous-problèmes
**    → Résoudre récursivement
**
** 2. Logarithmic complexity
**    Comprendre pourquoi log(n) est presque constant
**    log₂(1 billion) = 30 !
**
** 3. Preconditions
**    Binary search REQUIERT un tableau trié
**    → Si pas trié, O(n log n) pour trier d'abord
**    → Puis O(log n) pour chercher
**    → Total : O(n log n) (pas mieux que linear si 1 seule recherche)
*/

module.exports = { search, searchRecursive };
