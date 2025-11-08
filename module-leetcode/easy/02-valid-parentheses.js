/* ************************************************************************** */
/*                                                                            */
/*   02-valid-parentheses.js                                                  */
/*                                                                            */
/*   LeetCode #20 - Valid Parentheses                                         */
/*   https://leetcode.com/problems/valid-parentheses/                         */
/*                                                                            */
/* ************************************************************************** */

/**
 * DIFFICULTÉ: Easy ⭐
 * TEMPS ATTENDU: 10-15 minutes
 * FRÉQUENCE: ⭐⭐⭐⭐⭐ (posé chez Meta, Amazon, Google, Bloomberg)
 *
 * PATTERNS: Stack, String
 * COMPLEXITÉ CIBLE: O(n) temps, O(n) espace
 */

/*
** ÉNONCÉ :
**
** Étant donné une chaîne `s` contenant uniquement les caractères
** '(', ')', '{', '}', '[' et ']', déterminer si la chaîne est valide.
**
** Une chaîne est valide si :
** 1. Chaque parenthèse ouvrante a une parenthèse fermante correspondante
** 2. Les parenthèses sont fermées dans le bon ordre
** 3. Chaque parenthèse fermante a une parenthèse ouvrante correspondante
**
** EXEMPLES :
**
** Input: s = "()"
** Output: true
**
** Input: s = "()[]{}"
** Output: true
**
** Input: s = "(]"
** Output: false
** Explication: '(' correspond à ')', pas à ']'
**
** Input: s = "([])"
** Output: true
** Explication: Les crochets sont correctement imbriqués
**
** CONTRAINTES :
** - 1 <= s.length <= 10^4
** - s contient uniquement '()[]{}'
*/

/**
 * APPROCHE : Stack (LIFO)
 *
 * Idée : Utiliser une pile pour vérifier l'ordre des parenthèses
 *
 * Algorithme :
 * 1. Créer une stack vide
 * 2. Pour chaque caractère :
 *    - Si c'est une ouvrante '(', '[', '{' → push dans la stack
 *    - Si c'est une fermante ')', ']', '}' :
 *      → Vérifier que la stack n'est pas vide
 *      → Pop et vérifier que c'est la bonne ouvrante
 * 3. À la fin, la stack doit être vide
 *
 * Exemple visuel pour s = "({[]})":
 *
 * char='(' : stack = ['(']
 * char='{' : stack = ['(', '{']
 * char='[' : stack = ['(', '{', '[']
 * char=']' : pop '[' → match ✅, stack = ['(', '{']
 * char='}' : pop '{' → match ✅, stack = ['(']
 * char=')' : pop '(' → match ✅, stack = []
 * Résultat : true ✅
 *
 * Complexité :
 * - Temps : O(n) → Un parcours
 * - Espace : O(n) → Stack dans le pire cas (ex: "((((((")
 */
function isValid(s) {
	const stack = [];
	const pairs = {
		')': '(',
		']': '[',
		'}': '{'
	};

	for (const char of s) {
		// Si c'est une fermante
		if (char in pairs) {
			// Stack vide OU mauvaise paire → invalide
			if (stack.length === 0 || stack.pop() !== pairs[char]) {
				return false;
			}
		} else {
			// C'est une ouvrante → empiler
			stack.push(char);
		}
	}

	// Valide seulement si toutes les parenthèses sont fermées
	return stack.length === 0;
}

/*
** POURQUOI STACK ?
**
** La pile (stack) est la structure parfaite car :
** - LIFO (Last In, First Out) : la dernière ouvrante doit être fermée en premier
** - Les parenthèses imbriquées suivent ce pattern naturellement
**
** Exemple : "({[]})"
**           ↑   ↑
**           Dernière ouvrante '[' → Première fermante ']'
*/

/*
** OPTIMISATION : Map vs Object
**
** Version actuelle utilise un objet littéral :
** const pairs = { ')': '(', ']': '[', '}': '{' };
**
** Alternative avec Map (marginalement plus rapide) :
** const pairs = new Map([[')', '('], [']', '['], ['}', '{']]);
**
** → En pratique, Object est suffisant pour 3 paires
*/

/*
** VARIANTES EN INTERVIEW :
**
** 1. "Retourner l'index de la première erreur au lieu de true/false"
**    → Ajouter un compteur dans la boucle
**
** 2. "Réparer la chaîne en ajoutant le minimum de parenthèses"
**    → Compter les ouvrantes non fermées + fermantes sans ouvrante
**
** 3. "Vérifier uniquement les parenthèses (), ignorer [] et {}"
**    → Filter la string avant : s.replace(/[^\(\)]/g, '')
*/

/*
** PIÈGES À ÉVITER :
**
** ❌ Oublier de vérifier si la stack est vide à la fin
**    s = "(((" → false (pas true!)
**
** ❌ Ne pas vérifier si stack vide avant pop
**    s = ")" → crash avec pop() sur stack vide
**
** ❌ Confondre 'in' avec 'of'
**    'char in pairs' → vérifie les CLÉS (fermantes)
**    'char of pairs' → ERREUR (pairs n'est pas itérable)
*/

// ============================================================================
// TESTS
// ============================================================================

function runTests() {
	const tests = [
		{
			input: '()',
			expected: true,
			description: 'Simple paire'
		},
		{
			input: '()[]{}',
			expected: true,
			description: 'Trois types consécutifs'
		},
		{
			input: '(]',
			expected: false,
			description: 'Mauvaise paire'
		},
		{
			input: '([)]',
			expected: false,
			description: 'Croisement invalide'
		},
		{
			input: '{[()]}',
			expected: true,
			description: 'Imbrication correcte'
		},
		{
			input: '',
			expected: true,
			description: 'String vide (edge case)'
		},
		{
			input: '(((',
			expected: false,
			description: 'Uniquement ouvrantes'
		},
		{
			input: ')))',
			expected: false,
			description: 'Uniquement fermantes'
		},
		{
			input: '(())',
			expected: true,
			description: 'Imbrication simple'
		},
		{
			input: '({[',
			expected: false,
			description: 'Pas de fermantes'
		}
	];

	console.log('🧪 Valid Parentheses - Tests\n');

	tests.forEach((test, index) => {
		const result = isValid(test.input);
		const passed = result === test.expected;

		console.log(
			`Test ${index + 1}: ${passed ? '✅' : '❌'} ${test.description}`
		);
		console.log(`  Input: "${test.input}"`);
		console.log(`  Output: ${result}`);
		console.log(`  Expected: ${test.expected}\n`);
	});
}

// Exécuter les tests
runTests();

/*
** APPLICATIONS RÉELLES :
**
** 1. Validation de code (IDE, linters)
**    → Vérifier les accolades dans du code
**
** 2. Éditeurs de texte (VS Code, Sublime)
**    → Coloration et matching des parenthèses
**
** 3. Compilateurs
**    → Parser les expressions mathématiques
**
** 4. Calculatrices
**    → Valider les formules avant évaluation
*/

/*
** POUR ALLER PLUS LOIN :
**
** 1. Résoudre "Minimum Add to Make Parentheses Valid" (LeetCode #921)
** 2. Résoudre "Generate Parentheses" (LeetCode #22) - Medium
** 3. Résoudre "Longest Valid Parentheses" (LeetCode #32) - Hard
*/

module.exports = { isValid };
