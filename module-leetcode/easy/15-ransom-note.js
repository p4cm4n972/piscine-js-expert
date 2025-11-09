/* ************************************************************************** */
/*                                                                            */
/*   15-ransom-note.js                                                        */
/*                                                                            */
/*   LeetCode #383 - Ransom Note                                              */
/*   https://leetcode.com/problems/ransom-note/                               */
/*                                                                            */
/* ************************************************************************** */

/**
 * DIFFICULTÉ: Easy ⭐
 * TEMPS ATTENDU: 10 minutes
 * FRÉQUENCE: ⭐⭐⭐ (posé chez Amazon, Microsoft, Meta)
 *
 * PATTERNS: Hash Table, String, Counting
 * COMPLEXITÉ CIBLE: O(m+n) temps, O(1) espace (alphabet fixe)
 */

/*
** ÉNONCÉ :
**
** Étant donné deux chaînes ransomNote et magazine, retourner true si
** ransomNote peut être construit en utilisant les lettres de magazine,
** sinon false.
**
** Chaque lettre dans magazine peut être utilisée une seule fois dans ransomNote.
**
** EXEMPLES :
**
** Input: ransomNote = "a", magazine = "b"
** Output: false
** Explication: "a" n'est pas dans "b"
**
** Input: ransomNote = "aa", magazine = "ab"
** Output: false
** Explication: Seulement un 'a' disponible, mais besoin de deux
**
** Input: ransomNote = "aa", magazine = "aab"
** Output: true
** Explication: Deux 'a' disponibles
**
** CONTRAINTES :
** - 1 <= ransomNote.length, magazine.length <= 10^5
** - ransomNote et magazine contiennent uniquement des lettres minuscules anglaises
*/

/**
 * APPROCHE 1 : Hash Map (Standard)
 *
 * Idée : Compter les lettres disponibles dans magazine
 *        Puis vérifier si toutes les lettres de ransomNote sont disponibles
 *
 * Algorithme :
 * 1. Compter toutes les lettres de magazine dans une Map
 * 2. Pour chaque lettre de ransomNote :
 *    - Si pas disponible ou count = 0 → return false
 *    - Décrémenter le count
 * 3. Return true
 *
 * Complexité :
 * - Temps : O(m + n) où m = magazine.length, n = ransomNote.length
 * - Espace : O(1) → Max 26 lettres (alphabet anglais)
 */
function canConstructMap(ransomNote, magazine) {
	const available = new Map();

	// Compter les lettres disponibles
	for (const char of magazine) {
		available.set(char, (available.get(char) || 0) + 1);
	}

	// Vérifier si on peut construire ransomNote
	for (const char of ransomNote) {
		const count = available.get(char) || 0;
		if (count === 0) {
			return false; // Lettre pas disponible
		}
		available.set(char, count - 1);
	}

	return true;
}

/**
 * APPROCHE 2 : Array Counter (OPTIMALE ✅)
 *
 * Idée : Utiliser un array de 26 éléments (a-z)
 *        Plus rapide que Map pour accès par index
 *
 * Algorithme :
 * 1. Créer count[26] = 0
 * 2. Pour chaque char de magazine : count[char - 'a']++
 * 3. Pour chaque char de ransomNote : count[char - 'a']--
 *    - Si count < 0 → return false
 * 4. Return true
 *
 * Complexité : Identique à Map mais constantes meilleures
 */
function canConstruct(ransomNote, magazine) {
	const count = new Array(26).fill(0);
	const aCode = 'a'.charCodeAt(0);

	// Compter les lettres disponibles
	for (const char of magazine) {
		count[char.charCodeAt(0) - aCode]++;
	}

	// Vérifier disponibilité
	for (const char of ransomNote) {
		const index = char.charCodeAt(0) - aCode;
		if (count[index] === 0) {
			return false;
		}
		count[index]--;
	}

	return true;
}

/**
 * APPROCHE 3 : Object Counter (Alternative simple)
 *
 * Même logique que Map mais avec Object
 */
function canConstructObject(ransomNote, magazine) {
	const count = {};

	for (const char of magazine) {
		count[char] = (count[char] || 0) + 1;
	}

	for (const char of ransomNote) {
		if (!count[char] || count[char] === 0) {
			return false;
		}
		count[char]--;
	}

	return true;
}

/**
 * APPROCHE 4 : Early Exit Optimization
 *
 * Optimisation : Vérifier d'abord si ransomNote > magazine
 */
function canConstructOptimized(ransomNote, magazine) {
	// Impossible si ransomNote plus long que magazine
	if (ransomNote.length > magazine.length) {
		return false;
	}

	const count = new Array(26).fill(0);
	const aCode = 'a'.charCodeAt(0);

	for (const char of magazine) {
		count[char.charCodeAt(0) - aCode]++;
	}

	for (const char of ransomNote) {
		const index = char.charCodeAt(0) - aCode;
		if (count[index] === 0) {
			return false;
		}
		count[index]--;
	}

	return true;
}

/*
** PATTERN : Frequency Counter
**
** Template classique :
**
** 1. Créer un compteur (Map/Array/Object)
** 2. Compter les éléments disponibles
** 3. Vérifier si les besoins peuvent être satisfaits
**
** Variantes :
** - Anagram check (même count pour les deux)
** - Subset check (ce problème)
** - Intersection (lettres communes)
*/

/*
** OPTIMISATIONS POSSIBLES :
**
** 1. Early exit si ransomNote.length > magazine.length
**    → Impossible de construire
**
** 2. Array au lieu de Map
**    → Accès O(1) garanti vs O(1) amortized
**
** 3. Single pass (complexe)
**    → Compter pendant qu'on vérifie
**    → Pas vraiment plus rapide en pratique
*/

/*
** VARIANTES EN INTERVIEW :
**
** 1. "Find All Anagrams" (LeetCode #438) - Medium
**    → Trouver tous les anagrammes dans une string
**
** 2. "Minimum Window Substring" (LeetCode #76) - Hard
**    → Plus petite fenêtre contenant tous les caractères
**
** 3. "Word Pattern" (LeetCode #290) - Easy
**    → Matching de patterns avec bijection
**
** 4. Ransom Note avec caractères spéciaux
**    → Map nécessaire (Array ne suffit plus)
**
** 5. Ransom Note case-insensitive
**    → Normaliser avec toLowerCase()
*/

/*
** PIÈGES À ÉVITER :
**
** ❌ Oublier que chaque lettre ne peut être utilisée qu'une fois
**    → Il faut décrémenter le count !
**
** ❌ Comparer ransomNote et magazine directement
**    → "aa" peut être construit depuis "aab" mais pas depuis "ab"
**
** ❌ Utiliser indexOf() ou includes()
**    → O(m*n) au lieu de O(m+n)
**
** ❌ Ne pas gérer le cas où count devient négatif
**    → Vérifier count === 0 avant de décrémenter
*/

// ============================================================================
// TESTS
// ============================================================================

function runTests() {
	const tests = [
		{
			ransomNote: 'a',
			magazine: 'b',
			expected: false,
			description: 'Lettre non disponible'
		},
		{
			ransomNote: 'aa',
			magazine: 'ab',
			expected: false,
			description: 'Pas assez de lettres'
		},
		{
			ransomNote: 'aa',
			magazine: 'aab',
			expected: true,
			description: 'Exactement assez de lettres'
		},
		{
			ransomNote: 'a',
			magazine: 'a',
			expected: true,
			description: 'Cas simple (égaux)'
		},
		{
			ransomNote: '',
			magazine: 'abc',
			expected: true,
			description: 'Ransom note vide (toujours possible)'
		},
		{
			ransomNote: 'abc',
			magazine: 'aabbcc',
			expected: true,
			description: 'Lettres avec surplus'
		},
		{
			ransomNote: 'abc',
			magazine: 'ab',
			expected: false,
			description: 'Magazine trop court'
		},
		{
			ransomNote: 'aabbcc',
			magazine: 'abcabc',
			expected: true,
			description: 'Lettres exactement suffisantes'
		}
	];

	console.log('🧪 Ransom Note - Tests\n');

	tests.forEach((test, index) => {
		const result = canConstruct(test.ransomNote, test.magazine);
		const passed = result === test.expected;

		console.log(
			`Test ${index + 1}: ${passed ? '✅' : '❌'} ${test.description}`
		);
		console.log(`  ransomNote: "${test.ransomNote}"`);
		console.log(`  magazine: "${test.magazine}"`);
		console.log(`  Can construct: ${result}`);
		console.log(`  Expected: ${test.expected}\n`);
	});

	// Benchmark comparaison
	console.log('⚡ Benchmark (100,000 itérations):\n');
	const ransomNote = 'abcdefghijklmnopqrstuvwxyz';
	const magazine = 'zyxwvutsrqponmlkjihgfedcba';

	console.time('Array Counter (optimal)');
	for (let i = 0; i < 100000; i++) {
		canConstruct(ransomNote, magazine);
	}
	console.timeEnd('Array Counter (optimal)');

	console.time('Map Counter');
	for (let i = 0; i < 100000; i++) {
		canConstructMap(ransomNote, magazine);
	}
	console.timeEnd('Map Counter');

	console.time('Object Counter');
	for (let i = 0; i < 100000; i++) {
		canConstructObject(ransomNote, magazine);
	}
	console.timeEnd('Object Counter');

	// Visualisation
	console.log('\n📊 Visualisation pour "abc" et "aabbcc":\n');

	const count = new Array(26).fill(0);
	const aCode = 'a'.charCodeAt(0);
	const mag = 'aabbcc';
	const ransom = 'abc';

	console.log('Étape 1: Compter les lettres de magazine');
	for (const char of mag) {
		count[char.charCodeAt(0) - aCode]++;
	}
	console.log(`  a: ${count[0]}, b: ${count[1]}, c: ${count[2]}`);

	console.log('\nÉtape 2: Consommer pour ransomNote');
	for (const char of ransom) {
		const index = char.charCodeAt(0) - aCode;
		console.log(`  Need '${char}': available = ${count[index]}`);
		count[index]--;
		console.log(`    → remaining = ${count[index]}`);
	}

	console.log(`\nRésultat: Toutes les lettres disponibles ✅`);
}

runTests();

/*
** APPLICATIONS RÉELLES :
**
** 1. Validation de formulaires
**    → Vérifier si tous les champs requis sont remplis
**
** 2. Jeux de lettres (Scrabble)
**    → Vérifier si un mot peut être formé avec les lettres
**
** 3. Inventaire / Stock management
**    → Vérifier si une commande peut être satisfaite
**
** 4. Resource allocation
**    → Vérifier disponibilité des ressources
**
** 5. Text analysis
**    → Détecter subset relationships
*/

/*
** CONCEPTS CLÉS POUR SENIOR :
**
** 1. Frequency Counter Pattern
**    Pattern fondamental en algorithmique
**    → Compter puis comparer
**
** 2. Array vs Map vs Object
**    Array : O(1) garanti, mais uniquement pour alphabets fixes
**    Map : O(1) amortized, pour tout type de clé
**    Object : O(1) amortized, pour strings uniquement
**
** 3. Space Complexity
**    O(1) car alphabet fixe (26 lettres)
**    → Même avec Map, max 26 entrées
**
** 4. Early Exit Optimization
**    Vérifier longueurs avant processing
**    → Peut économiser beaucoup de temps
**
** 5. Character Encoding
**    charCodeAt() - 'a'.charCodeAt(0)
**    → Convertir lettre en index 0-25
*/

module.exports = {
	canConstruct,
	canConstructMap,
	canConstructObject,
	canConstructOptimized
};
