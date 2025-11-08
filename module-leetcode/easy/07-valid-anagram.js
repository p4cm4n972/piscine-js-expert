/* ************************************************************************** */
/*                                                                            */
/*   07-valid-anagram.js                                                      */
/*                                                                            */
/*   LeetCode #242 - Valid Anagram                                            */
/*   https://leetcode.com/problems/valid-anagram/                             */
/*                                                                            */
/* ************************************************************************** */

/**
 * DIFFICULTÉ: Easy ⭐
 * TEMPS ATTENDU: 10 minutes
 * FRÉQUENCE: ⭐⭐⭐⭐ (posé chez Amazon, Meta, Microsoft, Bloomberg)
 *
 * PATTERNS: Hash Table, String, Sorting
 * COMPLEXITÉ CIBLE: O(n) temps, O(1) espace (alphabet fixe)
 */

/*
** ÉNONCÉ :
**
** Étant donné deux chaînes s et t, retourner true si t est un anagramme de s,
** sinon false.
**
** Un anagramme est un mot formé en réarrangeant les lettres d'un autre mot,
** en utilisant toutes les lettres originales exactement une fois.
**
** EXEMPLES :
**
** Input: s = "anagram", t = "nagaram"
** Output: true
**
** Input: s = "rat", t = "car"
** Output: false
**
** CONTRAINTES :
** - 1 <= s.length, t.length <= 5 * 10^4
** - s et t contiennent uniquement des lettres minuscules anglaises
*/

/**
 * APPROCHE 1 : Sorting (Simple)
 *
 * Idée : Si deux mots sont anagrammes, leurs lettres triées sont identiques
 *
 * Algorithme :
 * 1. Trier s et t
 * 2. Comparer les strings triées
 *
 * Exemple :
 * s = "anagram" → sorted = "aaagmnr"
 * t = "nagaram" → sorted = "aaagmnr"
 * → Identiques ✅
 *
 * Complexité :
 * - Temps : O(n log n) → Tri
 * - Espace : O(n) → Création de nouvelles strings
 */
function isAnagramSort(s, t) {
	if (s.length !== t.length) return false;

	const sortedS = s.split('').sort().join('');
	const sortedT = t.split('').sort().join('');

	return sortedS === sortedT;
}

/**
 * APPROCHE 2 : Hash Table / Counting (OPTIMALE ✅)
 *
 * Idée : Compter les occurrences de chaque lettre
 *        Les deux strings doivent avoir les mêmes counts
 *
 * Algorithme :
 * 1. Vérifier que les longueurs sont égales
 * 2. Créer un compteur (Map ou Object)
 * 3. Incrémenter pour chaque char de s
 * 4. Décrémenter pour chaque char de t
 * 5. Vérifier que tous les counts sont à 0
 *
 * Exemple pour s = "anagram", t = "nagaram" :
 * Après s : {a: 3, n: 1, g: 1, r: 1, m: 1}
 * Après t : {a: 0, n: 0, g: 0, r: 0, m: 0}
 * → Tous à 0 ✅
 *
 * Complexité :
 * - Temps : O(n) → Deux parcours
 * - Espace : O(1) → Max 26 lettres (alphabet anglais)
 */
function isAnagram(s, t) {
	// Longueurs différentes → pas anagrammes
	if (s.length !== t.length) return false;

	const count = new Map();

	// Compter les lettres de s
	for (const char of s) {
		count.set(char, (count.get(char) || 0) + 1);
	}

	// Décrémenter avec les lettres de t
	for (const char of t) {
		if (!count.has(char)) {
			return false; // Lettre dans t mais pas dans s
		}

		count.set(char, count.get(char) - 1);

		if (count.get(char) < 0) {
			return false; // Trop d'occurrences de cette lettre dans t
		}
	}

	// Vérifier que tous les counts sont à 0
	for (const val of count.values()) {
		if (val !== 0) return false;
	}

	return true;
}

/**
 * APPROCHE 3 : Array Counter (plus rapide que Map)
 *
 * Utilise un array de 26 éléments (a-z)
 * Légèrement plus rapide que Map pour accès par index
 */
function isAnagramArray(s, t) {
	if (s.length !== t.length) return false;

	const count = new Array(26).fill(0);
	const aCode = 'a'.charCodeAt(0);

	for (let i = 0; i < s.length; i++) {
		count[s.charCodeAt(i) - aCode]++;
		count[t.charCodeAt(i) - aCode]--;
	}

	return count.every((c) => c === 0);
}

/**
 * APPROCHE 4 : Single Loop Optimization
 *
 * Combine comptage et vérification en un seul parcours
 */
function isAnagramOptimized(s, t) {
	if (s.length !== t.length) return false;

	const count = {};

	for (let i = 0; i < s.length; i++) {
		count[s[i]] = (count[s[i]] || 0) + 1;
		count[t[i]] = (count[t[i]] || 0) - 1;
	}

	for (const key in count) {
		if (count[key] !== 0) return false;
	}

	return true;
}

/*
** QUELLE APPROCHE CHOISIR ?
**
** 1. Sorting : O(n log n)
**    ✅ Code simple (1 ligne)
**    ❌ Pas optimal
**    → Bon pour prototyping rapide
**
** 2. Hash Map : O(n)
**    ✅ Optimal
**    ✅ Lisible
**    ❌ Overhead de Map
**    → RECOMMANDÉ pour interview
**
** 3. Array Counter : O(n)
**    ✅ Plus rapide que Map
**    ✅ O(1) espace garanti
**    ❌ Fonctionne uniquement pour alphabets fixes
**    → Bon si performance critique
*/

/*
** PATTERN : Frequency Counter
**
** Utilisé pour :
** - Anagrammes
** - Trouver des duplicatas
** - Comparer deux collections
** - Groupe Anagrams (LeetCode #49)
**
** Template :
** const freq = new Map();
** for (const item of array) {
**     freq.set(item, (freq.get(item) || 0) + 1);
** }
*/

/*
** VARIANTES EN INTERVIEW :
**
** 1. "Group Anagrams" (LeetCode #49) - Medium
**    → Regrouper tous les anagrammes ensemble
**    → Utiliser sorted string comme clé de hashmap
**
** 2. "Find All Anagrams in String" (LeetCode #438) - Medium
**    → Trouver tous les anagrammes d'un pattern dans une string
**    → Sliding window + frequency counter
**
** 3. "Valid Anagram avec Unicode"
**    → Gérer des caractères non-ASCII
**    → Map fonctionne, Array ne marche plus
**
** 4. "Anagram avec caractères supplémentaires autorisés"
**    → t peut avoir des lettres en plus de s
**    → Modifier la logique de comparaison
*/

/*
** PIÈGES À ÉVITER :
**
** ❌ Ne pas vérifier les longueurs d'abord
**    → Optimisation simple qui évite du travail inutile
**
** ❌ Oublier de gérer la casse
**    → "Anagram" vs "nagaram" → pas anagrammes si case-sensitive
**
** ❌ Utiliser Object.keys().length pour vérifier
**    → Plus lent que vérifier les valeurs directement
**
** ❌ Ne pas considérer les caractères spéciaux
**    → Dépend des contraintes (ici, uniquement lowercase a-z)
*/

// ============================================================================
// TESTS
// ============================================================================

function runTests() {
	const tests = [
		{
			s: 'anagram',
			t: 'nagaram',
			expected: true,
			description: 'Anagramme classique'
		},
		{
			s: 'rat',
			t: 'car',
			expected: false,
			description: 'Pas anagramme (lettres différentes)'
		},
		{
			s: 'a',
			t: 'a',
			expected: true,
			description: 'Un seul caractère identique'
		},
		{
			s: 'ab',
			t: 'ba',
			expected: true,
			description: 'Deux caractères inversés'
		},
		{
			s: 'abc',
			t: 'abcd',
			expected: false,
			description: 'Longueurs différentes'
		},
		{
			s: 'aacc',
			t: 'ccaa',
			expected: true,
			description: 'Duplicatas réarrangés'
		},
		{
			s: 'aabb',
			t: 'abab',
			expected: true,
			description: 'Même fréquence, ordre différent'
		}
	];

	console.log('🧪 Valid Anagram - Tests\n');

	tests.forEach((test, index) => {
		const result = isAnagram(test.s, test.t);
		const passed = result === test.expected;

		console.log(
			`Test ${index + 1}: ${passed ? '✅' : '❌'} ${test.description}`
		);
		console.log(`  s: "${test.s}"`);
		console.log(`  t: "${test.t}"`);
		console.log(`  Output: ${result}`);
		console.log(`  Expected: ${test.expected}\n`);
	});

	// Benchmark comparaison
	console.log('⚡ Benchmark (100,000 itérations):\n');
	const s = 'anagram';
	const t = 'nagaram';

	console.time('Hash Map (optimal)');
	for (let i = 0; i < 100000; i++) {
		isAnagram(s, t);
	}
	console.timeEnd('Hash Map (optimal)');

	console.time('Array Counter');
	for (let i = 0; i < 100000; i++) {
		isAnagramArray(s, t);
	}
	console.timeEnd('Array Counter');

	console.time('Sorting');
	for (let i = 0; i < 100000; i++) {
		isAnagramSort(s, t);
	}
	console.timeEnd('Sorting');
}

runTests();

/*
** APPLICATIONS RÉELLES :
**
** 1. Jeux de mots (Scrabble, mots croisés)
**    → Trouver tous les mots possibles avec des lettres
**
** 2. Détection de plagiat
**    → Identifier des phrases réarrangées
**
** 3. Recherche de permutations
**    → Combinatoire, cryptanalyse
**
** 4. Auto-complétion / suggestions
**    → Suggérer des mots avec les mêmes lettres
*/

/*
** CONCEPTS CLÉS POUR SENIOR :
**
** 1. Time-Space Tradeoff
**    Sorting : O(n log n) temps, O(n) espace (selon implémentation)
**    Counting : O(n) temps, O(1) espace (alphabet fixe)
**
** 2. Hash Table Performance
**    Map.get/set : O(1) average, O(n) worst case
**    Array access : O(1) garanti
**    → Array plus rapide pour alphabets connus
**
** 3. Early Termination
**    Vérifier longueurs d'abord
**    Return false dès qu'une incohérence trouvée
*/

module.exports = { isAnagram, isAnagramSort, isAnagramArray, isAnagramOptimized };
