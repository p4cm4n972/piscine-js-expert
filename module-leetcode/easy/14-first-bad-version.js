/* ************************************************************************** */
/*                                                                            */
/*   14-first-bad-version.js                                                  */
/*                                                                            */
/*   LeetCode #278 - First Bad Version                                        */
/*   https://leetcode.com/problems/first-bad-version/                         */
/*                                                                            */
/* ************************************************************************** */

/**
 * DIFFICULTÉ: Easy ⭐
 * TEMPS ATTENDU: 10 minutes
 * FRÉQUENCE: ⭐⭐⭐ (posé chez Meta, Amazon, Microsoft)
 *
 * PATTERNS: Binary Search
 * COMPLEXITÉ CIBLE: O(log n) temps, O(1) espace
 */

/*
** ÉNONCÉ :
**
** Vous êtes product manager et actuellement en train de mener une équipe
** pour développer un nouveau produit. Malheureusement, la dernière version
** de votre produit échoue au test de qualité.
**
** Comme chaque version est développée basée sur la version précédente,
** toutes les versions après une mauvaise version sont également mauvaises.
**
** Supposons que vous avez n versions [1, 2, ..., n] et vous voulez trouver
** la première mauvaise qui cause toutes les suivantes à être mauvaises.
**
** Vous avez accès à une API bool isBadVersion(version) qui retourne si
** version est mauvaise. Implémentez une fonction pour trouver la première
** mauvaise version. Vous devez minimiser le nombre d'appels à l'API.
**
** EXEMPLES :
**
** Input: n = 5, bad = 4
** [good, good, good, bad, bad]
**        1     2     3    4    5
** Output: 4
**
** Input: n = 1, bad = 1
** Output: 1
**
** CONTRAINTES :
** - 1 <= bad <= n <= 2^31 - 1
*/

/**
 * APPROCHE 1 : Linear Search (NAÏVE - TLE)
 *
 * Idée : Tester chaque version séquentiellement
 *
 * ❌ Problème : O(n) appels API → Time Limit Exceeded
 */
function firstBadVersionLinear(n, isBadVersion) {
	for (let i = 1; i <= n; i++) {
		if (isBadVersion(i)) {
			return i;
		}
	}
	return n;
}

/**
 * APPROCHE 2 : Binary Search (OPTIMALE ✅)
 *
 * Idée : Puisque [good...good, bad...bad], on peut faire binary search
 *        pour trouver la frontière good/bad
 *
 * Algorithme :
 * 1. left = 1, right = n
 * 2. Tant que left < right :
 *    - mid = left + (right - left) / 2
 *    - Si isBadVersion(mid) :
 *      → mid ou avant est la première bad
 *      → right = mid (pas mid - 1 ! mid peut être la réponse)
 *    - Sinon :
 *      → mid est good, chercher après
 *      → left = mid + 1
 * 3. Retourner left
 *
 * Pourquoi left < right et pas left <= right ?
 * → On cherche la FRONTIÈRE, pas une valeur exacte
 * → Quand left == right, on a trouvé la frontière
 *
 * Exemple visuel pour n=5, bad=4 :
 * [G, G, G, B, B]
 *  1  2  3  4  5
 *
 * Itération 1: left=1, right=5, mid=3
 *              isBadVersion(3) = false → left=4
 *
 * Itération 2: left=4, right=5, mid=4
 *              isBadVersion(4) = true → right=4
 *
 * left == right == 4 → Return 4 ✅
 *
 * Complexité :
 * - Temps : O(log n) → Binary search
 * - Espace : O(1) → Variables constantes
 * - Appels API : O(log n) → Optimal
 */
function solution(isBadVersion) {
	return function (n) {
		let left = 1;
		let right = n;

		while (left < right) {
			// Éviter overflow (important pour n = 2^31 - 1)
			const mid = Math.floor(left + (right - left) / 2);

			if (isBadVersion(mid)) {
				// mid est bad, chercher à gauche (inclure mid)
				right = mid;
			} else {
				// mid est good, chercher à droite (exclure mid)
				left = mid + 1;
			}
		}

		return left; // ou right (ils sont égaux)
	};
}

/*
** POURQUOI left < right ET PAS left <= right ?
**
** Binary Search a DEUX variantes :
**
** 1. Chercher une valeur exacte (problème #704 Binary Search)
**    → Condition : left <= right
**    → Retourne mid quand trouvé
**    → Retourne -1 si non trouvé
**
** 2. Chercher une frontière/insertion point (ce problème)
**    → Condition : left < right
**    → Converge vers la frontière
**    → Toujours trouve une réponse valide
**
** Exemple :
** [G, G, B, B]
**  1  2  3  4
**
** With left <= right:
** left=3, right=3, mid=3 → isBadVersion(3)=true → right=2
** left > right → loop exits, mais on a perdu la réponse!
**
** With left < right:
** left=3, right=3 → loop exits immédiatement
** Return 3 ✅
*/

/*
** INVARIANT DE BOUCLE :
**
** Propriété maintenue à chaque itération :
** - Toutes versions < left sont good
** - Toutes versions >= right pourraient être bad
** - La première bad version est dans [left, right]
**
** Terminaison : left == right → première bad version trouvée
*/

/*
** VARIANTES EN INTERVIEW :
**
** 1. "Search Insert Position" (LeetCode #35) - Easy
**    → Trouver où insérer dans tableau trié
**    → Même pattern (chercher frontière)
**
** 2. "Find Smallest Letter Greater Than Target" (LeetCode #744) - Easy
**    → Chercher la frontière dans alphabet circulaire
**
** 3. "Koko Eating Bananas" (LeetCode #875) - Medium
**    → Binary search sur la réponse
**
** 4. "Capacity To Ship Packages Within D Days" (LeetCode #1011) - Medium
**    → Binary search pour minimiser capacité
**
** 5. git bisect
**    → Trouver le commit qui a introduit un bug
**    → Exactement ce problème !
*/

/*
** PIÈGES À ÉVITER :
**
** ❌ Utiliser right = mid - 1 quand isBadVersion(mid) = true
**    → mid PEUT être la première bad version
**
** ❌ Utiliser left <= right
**    → Peut causer boucle infinie ou réponse incorrecte
**
** ❌ Retourner mid au lieu de left
**    → mid n'existe plus quand la boucle se termine
**
** ❌ Calculer mid avec (left + right) / 2
**    → Overflow si left + right > 2^31 - 1
*/

// ============================================================================
// TESTS
// ============================================================================

function runTests() {
	const tests = [
		{
			n: 5,
			bad: 4,
			expected: 4,
			description: 'Cas classique (bad au milieu-fin)'
		},
		{
			n: 1,
			bad: 1,
			expected: 1,
			description: 'Une seule version (bad)'
		},
		{
			n: 10,
			bad: 1,
			expected: 1,
			description: 'Première version est bad'
		},
		{
			n: 10,
			bad: 10,
			expected: 10,
			description: 'Dernière version est bad'
		},
		{
			n: 100,
			bad: 50,
			expected: 50,
			description: 'Bad au milieu exact'
		},
		{
			n: 2126753390,
			bad: 1702766719,
			expected: 1702766719,
			description: 'Très grand n (test overflow)'
		}
	];

	console.log('🧪 First Bad Version - Tests\n');

	tests.forEach((test, index) => {
		// Créer la fonction isBadVersion pour ce test
		const isBadVersion = (version) => version >= test.bad;

		const firstBadVersion = solution(isBadVersion);
		const result = firstBadVersion(test.n);
		const passed = result === test.expected;

		console.log(
			`Test ${index + 1}: ${passed ? '✅' : '❌'} ${test.description}`
		);
		console.log(`  n = ${test.n}, first bad = ${test.bad}`);
		console.log(`  Output: ${result}`);
		console.log(`  Expected: ${test.expected}\n`);
	});

	// Trace de l'algorithme
	console.log('📊 Trace de Binary Search pour n=10, bad=7:\n');

	let apiCalls = 0;
	const isBadVersion = (version) => {
		apiCalls++;
		const result = version >= 7;
		console.log(
			`  API call ${apiCalls}: isBadVersion(${version}) = ${result}`
		);
		return result;
	};

	let left = 1;
	let right = 10;
	let iteration = 0;

	console.log(`Versions: [G, G, G, G, G, G, B, B, B, B]`);
	console.log(`           1  2  3  4  5  6  7  8  9  10\n`);

	while (left < right) {
		iteration++;
		const mid = Math.floor(left + (right - left) / 2);

		console.log(`Iteration ${iteration}:`);
		console.log(`  left = ${left}, right = ${right}, mid = ${mid}`);

		if (isBadVersion(mid)) {
			right = mid;
			console.log(`  → Bad version, search left (right = ${mid})`);
		} else {
			left = mid + 1;
			console.log(`  → Good version, search right (left = ${mid + 1})`);
		}
		console.log();
	}

	console.log(`Result: ${left}`);
	console.log(`Total API calls: ${apiCalls} (vs ${10} for linear search)\n`);
}

runTests();

/*
** APPLICATIONS RÉELLES :
**
** 1. git bisect
**    → Trouver le commit qui a introduit un bug
**    → git bisect start/bad/good
**
** 2. Version control systems
**    → Identifier quand une régression a été introduite
**
** 3. Débogage de production
**    → Trouver la version déployée qui a cassé
**
** 4. A/B Testing
**    → Trouver le seuil où un changement devient détectable
**
** 5. Stress testing
**    → Trouver la capacité max avant échec
*/

/*
** CONCEPTS CLÉS POUR SENIOR :
**
** 1. Binary Search sur la réponse
**    Pas seulement pour chercher dans tableau trié
**    → Peut chercher dans espace de solutions monotone
**
** 2. Monotonicity
**    Propriété clé pour binary search
**    → [good, good, ..., bad, bad] est monotone
**
** 3. Convergence
**    left et right convergent vers la frontière
**    → Invariant : réponse toujours dans [left, right]
**
** 4. Overflow handling
**    mid = left + (right - left) / 2
**    → Critique pour grandes valeurs (2^31 - 1)
**
** 5. Template variants
**    Connaître les 2 templates de binary search
**    → Exact match : left <= right
**    → Boundary search : left < right
*/

