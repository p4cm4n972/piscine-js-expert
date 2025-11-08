/* ************************************************************************** */
/*                                                                            */
/*   05-valid-palindrome.js                                                   */
/*                                                                            */
/*   LeetCode #125 - Valid Palindrome                                         */
/*   https://leetcode.com/problems/valid-palindrome/                          */
/*                                                                            */
/* ************************************************************************** */

/**
 * DIFFICULTÉ: Easy ⭐
 * TEMPS ATTENDU: 10-15 minutes
 * FRÉQUENCE: ⭐⭐⭐⭐⭐ (posé chez Meta, Amazon, Microsoft, Bloomberg)
 *
 * PATTERNS: Two Pointers, String
 * COMPLEXITÉ CIBLE: O(n) temps, O(1) espace
 */

/*
** ÉNONCÉ :
**
** Une phrase est un palindrome si, après conversion de toutes les lettres
** en minuscules et suppression de tous les caractères non-alphanumériques,
** elle se lit de la même manière de gauche à droite et de droite à gauche.
**
** Les caractères alphanumériques incluent les lettres et les chiffres.
**
** Étant donné une chaîne s, retourner true si c'est un palindrome,
** sinon false.
**
** EXEMPLES :
**
** Input: s = "A man, a plan, a canal: Panama"
** Output: true
** Explication: "amanaplanacanalpanama" est un palindrome
**
** Input: s = "race a car"
** Output: false
** Explication: "raceacar" n'est pas un palindrome
**
** Input: s = " "
** Output: true
** Explication: "" (vide après nettoyage) est un palindrome
**
** CONTRAINTES :
** - 1 <= s.length <= 2 * 10^5
** - s contient uniquement des caractères ASCII imprimables
*/

/**
 * APPROCHE 1 : Clean then Compare (Simple mais O(n) espace)
 *
 * Idée : Nettoyer la string puis comparer avec son inverse
 *
 * Étapes :
 * 1. Convertir en lowercase
 * 2. Garder uniquement alphanumériques
 * 3. Comparer avec reverse
 *
 * Complexité :
 * - Temps : O(n)
 * - Espace : O(n) → Crée nouvelle string nettoyée
 */
function isPalindromeSimple(s) {
	// Nettoyer : lowercase + garder alphanumériques
	const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');

	// Comparer avec reverse
	return cleaned === cleaned.split('').reverse().join('');
}

/**
 * APPROCHE 2 : Two Pointers (OPTIMALE ✅)
 *
 * Idée : Deux pointeurs (gauche et droite) se rapprochant
 *        Comparer les caractères alphanumériques uniquement
 *
 * Algorithme :
 * 1. left = 0, right = s.length - 1
 * 2. Tant que left < right :
 *    - Sauter les non-alphanumériques à gauche
 *    - Sauter les non-alphanumériques à droite
 *    - Comparer s[left] et s[right] (ignorer la casse)
 *    - Si différents → return false
 *    - left++, right--
 * 3. return true
 *
 * Exemple visuel pour "A man, a plan, a canal: Panama" :
 *
 * A m a n , _ a _ p l a n , _ a _ c a n a l : _ P a n a m a
 * ↑                                                       ↑
 * left                                                  right
 *
 * Comparer 'A' et 'a' (même après lowercase) ✅
 * left++, right--
 * ...continuer jusqu'à ce que left >= right
 *
 * Complexité :
 * - Temps : O(n) → Un parcours
 * - Espace : O(1) → Pas de nouvelle string
 */
function isPalindrome(s) {
	let left = 0;
	let right = s.length - 1;

	while (left < right) {
		// Sauter les non-alphanumériques à gauche
		while (left < right && !isAlphanumeric(s[left])) {
			left++;
		}

		// Sauter les non-alphanumériques à droite
		while (left < right && !isAlphanumeric(s[right])) {
			right--;
		}

		// Comparer (ignorer la casse)
		if (s[left].toLowerCase() !== s[right].toLowerCase()) {
			return false;
		}

		left++;
		right--;
	}

	return true;
}

// Helper : vérifier si un caractère est alphanumérique
function isAlphanumeric(char) {
	const code = char.charCodeAt(0);
	return (
		(code >= 48 && code <= 57) || // 0-9
		(code >= 65 && code <= 90) || // A-Z
		(code >= 97 && code <= 122) // a-z
	);
}

/**
 * APPROCHE 3 : Two Pointers avec Regex (hybride)
 *
 * Utilise regex pour vérification mais garde Two Pointers
 */
function isPalindromeHybrid(s) {
	let left = 0;
	let right = s.length - 1;

	while (left < right) {
		while (left < right && !/[a-z0-9]/i.test(s[left])) {
			left++;
		}

		while (left < right && !/[a-z0-9]/i.test(s[right])) {
			right--;
		}

		if (s[left].toLowerCase() !== s[right].toLowerCase()) {
			return false;
		}

		left++;
		right--;
	}

	return true;
}

/*
** POURQUOI TWO POINTERS EST OPTIMAL ?
**
** 1. O(1) espace
**    Pas besoin de créer une nouvelle string
**    Important pour des strings de 200,000 caractères
**
** 2. Early exit
**    Dès qu'on trouve une différence, on arrête
**    Pas besoin de nettoyer toute la string
**
** 3. Single pass
**    Un seul parcours de la string
*/

/*
** PATTERN : Two Pointers
**
** Utilisé quand :
** - Besoin de comparer début et fin
** - Recherche de paires
** - Palindromes
** - Tri/fusion de tableaux triés
**
** Template :
** let left = 0, right = arr.length - 1;
** while (left < right) {
**     // Logique de comparaison
**     // Conditions de mouvement
**     left++; // ou right--; selon condition
** }
*/

/*
** VARIANTES EN INTERVIEW :
**
** 1. "Valid Palindrome II" (LeetCode #680)
**    → Palindrome en supprimant AU PLUS un caractère
**    → Technique : quand mismatch, tester sans left OU sans right
**
** 2. "Palindrome Permutation" (LeetCode #266)
**    → Une permutation peut-elle former un palindrome ?
**    → Compter les occurrences : max 1 caractère avec count impair
**
** 3. "Longest Palindromic Substring" (LeetCode #5) - Medium
**    → Trouver le plus long sous-palindrome
**    → Expand around center
**
** 4. Ignorer uniquement la ponctuation (pas les chiffres)
**    → Adapter isAlphanumeric
*/

/*
** PIÈGES À ÉVITER :
**
** ❌ Oublier d'ignorer la casse
**    'A' !== 'a' → false, mais 'A'.toLowerCase() === 'a' ✅
**
** ❌ Ne pas gérer les caractères Unicode correctement
**    /[^a-z0-9]/g ne gère que ASCII
**    Pour Unicode : /[^\p{L}\p{N}]/gu (ES2018+)
**
** ❌ Utiliser replace() sans vérifier la performance
**    Sur 200,000 chars, créer nouvelle string = coûteux
**
** ❌ Oublier la condition left < right dans les while internes
**    → Risque de dépassement d'index
*/

// ============================================================================
// TESTS
// ============================================================================

function runTests() {
	const tests = [
		{
			input: 'A man, a plan, a canal: Panama',
			expected: true,
			description: 'Palindrome classique avec ponctuation'
		},
		{
			input: 'race a car',
			expected: false,
			description: 'Non palindrome'
		},
		{
			input: ' ',
			expected: true,
			description: 'Espace seul (vide après nettoyage)'
		},
		{
			input: 'a',
			expected: true,
			description: 'Un seul caractère'
		},
		{
			input: 'ab',
			expected: false,
			description: 'Deux caractères différents'
		},
		{
			input: 'aa',
			expected: true,
			description: 'Deux caractères identiques'
		},
		{
			input: '0P',
			expected: false,
			description: 'Chiffre et lettre'
		},
		{
			input: 'Madam',
			expected: true,
			description: 'Palindrome simple avec casse mixte'
		},
		{
			input: '.,',
			expected: true,
			description: 'Uniquement ponctuation (vide après nettoyage)'
		},
		{
			input: 'A man, a plan, a cat, a ham, a yak, a yam, a hat, a canal-Panama!',
			expected: true,
			description: 'Palindrome long et complexe'
		}
	];

	console.log('🧪 Valid Palindrome - Tests\n');

	tests.forEach((test, index) => {
		const result = isPalindrome(test.input);
		const passed = result === test.expected;

		console.log(
			`Test ${index + 1}: ${passed ? '✅' : '❌'} ${test.description}`
		);
		console.log(`  Input: "${test.input}"`);
		console.log(`  Output: ${result}`);
		console.log(`  Expected: ${test.expected}\n`);
	});

	// Benchmark comparaison
	console.log('⚡ Benchmark (100,000 itérations):\n');
	const testStr = 'A man, a plan, a canal: Panama';

	console.time('Two Pointers (optimal)');
	for (let i = 0; i < 100000; i++) {
		isPalindrome(testStr);
	}
	console.timeEnd('Two Pointers (optimal)');

	console.time('Clean then Compare');
	for (let i = 0; i < 100000; i++) {
		isPalindromeSimple(testStr);
	}
	console.timeEnd('Clean then Compare');
}

runTests();

/*
** APPLICATIONS RÉELLES :
**
** 1. Validation de données
**    → Vérifier si un code produit est valide (symétrie)
**
** 2. Détection de patterns
**    → ADN/ARN sequences (bioinformatique)
**
** 3. Cryptographie
**    → Certains algorithmes utilisent des palindromes
**
** 4. Analyse de texte
**    → Trouver des mots palindromes dans un corpus
*/

/*
** CONCEPTS CLÉS POUR SENIOR :
**
** 1. Trade-off simplicité vs performance
**    Simple : replace + reverse (facile à lire, O(n) espace)
**    Optimal : Two Pointers (complexe, O(1) espace)
**
** 2. Early termination
**    Dès qu'on trouve une différence, arrêter
**    Important pour grandes inputs
**
** 3. Character encoding
**    ASCII vs Unicode
**    charCodeAt() vs codePointAt()
*/

module.exports = { isPalindrome, isPalindromeSimple, isPalindromeHybrid };
