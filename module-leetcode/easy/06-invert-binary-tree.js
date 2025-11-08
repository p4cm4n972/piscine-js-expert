/* ************************************************************************** */
/*                                                                            */
/*   06-invert-binary-tree.js                                                 */
/*                                                                            */
/*   LeetCode #226 - Invert Binary Tree                                       */
/*   https://leetcode.com/problems/invert-binary-tree/                        */
/*                                                                            */
/* ************************************************************************** */

/**
 * DIFFICULTÉ: Easy ⭐
 * TEMPS ATTENDU: 10-15 minutes
 * FRÉQUENCE: ⭐⭐⭐⭐⭐ (posé chez Google, Meta, Amazon, Apple)
 *
 * PATTERNS: Tree, DFS, BFS, Recursion
 * COMPLEXITÉ CIBLE: O(n) temps, O(h) espace (h = hauteur)
 *
 * ANECDOTE : Max Howell (créateur de Homebrew) a échoué à cette question
 *            chez Google en 2015, provoquant un débat sur les interviews tech
 *            Tweet viral: "Google: 90% of our engineers use the software you wrote
 *            (Homebrew), but you can't invert a binary tree on a whiteboard so f*** off."
 */

/*
** ÉNONCÉ :
**
** Étant donné la racine d'un arbre binaire, inverser l'arbre et retourner sa racine.
**
** EXEMPLES :
**
** Input: root = [4,2,7,1,3,6,9]
**        4
**      /   \
**     2     7
**    / \   / \
**   1   3 6   9
**
** Output: [4,7,2,9,6,3,1]
**        4
**      /   \
**     7     2
**    / \   / \
**   9   6 3   1
**
** Input: root = [2,1,3]
** Output: [2,3,1]
**
** Input: root = []
** Output: []
**
** CONTRAINTES :
** - Le nombre de nœuds dans l'arbre est dans [0, 100]
** - -100 <= Node.val <= 100
*/

// Définition de la structure TreeNode
class TreeNode {
	constructor(val = 0, left = null, right = null) {
		this.val = val;
		this.left = left;
		this.right = right;
	}
}

/**
 * APPROCHE 1 : Récursive DFS (ÉLÉGANTE ✅)
 *
 * Idée : Inverser récursivement chaque sous-arbre
 *
 * Algorithme :
 * 1. Cas de base : si node est null, retourner null
 * 2. Swap les enfants gauche et droit
 * 3. Récursivement inverser le sous-arbre gauche
 * 4. Récursivement inverser le sous-arbre droit
 * 5. Retourner la racine
 *
 * Exemple visuel :
 *     4              4
 *    / \            / \
 *   2   7    →     7   2
 *  /\  /\         /\  /\
 * 1 3 6 9        9 6 3 1
 *
 * Étapes récursives :
 * 1. invertTree(4) : swap(2,7) puis inverser sous-arbres
 * 2. invertTree(2) : swap(1,3)
 * 3. invertTree(7) : swap(6,9)
 * 4. Feuilles retournent directement
 *
 * Complexité :
 * - Temps : O(n) → Visite chaque nœud une fois
 * - Espace : O(h) → Call stack récursif (h = hauteur)
 *            Worst case : O(n) pour arbre dégénéré (liste chaînée)
 *            Best case : O(log n) pour arbre équilibré
 */
function invertTree(root) {
	// Cas de base : arbre vide
	if (root === null) {
		return null;
	}

	// Swap les enfants gauche et droit
	[root.left, root.right] = [root.right, root.left];

	// Récursivement inverser les sous-arbres
	invertTree(root.left);
	invertTree(root.right);

	return root;
}

/**
 * APPROCHE 2 : Récursive avec variable temporaire (plus explicite)
 *
 * Même logique mais sans destructuring
 * Utile si interviewer n'aime pas ES6 syntaxe
 */
function invertTreeExplicit(root) {
	if (root === null) {
		return null;
	}

	// Sauvegarder temporairement left
	const temp = root.left;

	// Swap
	root.left = invertTree(root.right);
	root.right = invertTree(temp);

	return root;
}

/**
 * APPROCHE 3 : Itérative avec Queue (BFS)
 *
 * Idée : Utiliser une file pour parcourir level-by-level
 *
 * Algorithme :
 * 1. Créer une queue, ajouter root
 * 2. Tant que queue non vide :
 *    - Dequeue un nœud
 *    - Swap ses enfants
 *    - Enqueue les enfants (s'ils existent)
 * 3. Retourner root
 *
 * Complexité :
 * - Temps : O(n)
 * - Espace : O(w) où w = largeur max de l'arbre
 *            Worst case : O(n/2) ≈ O(n) pour arbre complet
 */
function invertTreeIterative(root) {
	if (root === null) {
		return null;
	}

	const queue = [root];

	while (queue.length > 0) {
		const node = queue.shift();

		// Swap enfants
		[node.left, node.right] = [node.right, node.left];

		// Ajouter enfants à la queue
		if (node.left !== null) queue.push(node.left);
		if (node.right !== null) queue.push(node.right);
	}

	return root;
}

/**
 * APPROCHE 4 : Itérative avec Stack (DFS)
 *
 * Même principe que BFS mais avec stack (LIFO au lieu de FIFO)
 */
function invertTreeStack(root) {
	if (root === null) {
		return null;
	}

	const stack = [root];

	while (stack.length > 0) {
		const node = stack.pop();

		// Swap enfants
		[node.left, node.right] = [node.right, node.left];

		// Ajouter enfants à la stack
		if (node.left !== null) stack.push(node.left);
		if (node.right !== null) stack.push(node.right);
	}

	return root;
}

/*
** QUELLE APPROCHE CHOISIR EN INTERVIEW ?
**
** 1. Récursive (RECOMMANDÉE)
**    ✅ Code le plus court et élégant (3-4 lignes)
**    ✅ Facile à expliquer
**    ❌ Risque stack overflow si arbre très profond
**
** 2. Itérative BFS
**    ✅ Pas de risque de stack overflow
**    ✅ Plus intuitif pour certains (level-by-level)
**    ❌ Plus verbeux
**
** 3. Itérative DFS
**    ✅ Même avantages que BFS
**    ✅ Peut être plus efficace en mémoire (depends de la forme)
**
** → En interview : commencer par récursif, mentionner itératif si demandé
*/

/*
** PATTERN : Tree Traversal
**
** Les 3 types de DFS :
**
** 1. Pre-order (Root → Left → Right)
**    → Utilisé ici pour inverter
**    → Utile pour copier un arbre
**
** 2. In-order (Left → Root → Right)
**    → Donne les éléments triés pour BST
**
** 3. Post-order (Left → Right → Root)
**    → Utile pour supprimer/libérer un arbre
**
** BFS (Level-order) :
** → Parcours par niveau
** → Utile pour trouver le plus court chemin
*/

/*
** VARIANTES EN INTERVIEW :
**
** 1. "Symmetric Tree" (LeetCode #101)
**    → Vérifier si un arbre est symétrique
**    → Utilise la même logique d'inversion
**
** 2. "Mirror deux arbres séparés"
**    → Créer une copie inversée sans modifier l'original
**
** 3. "Inverser uniquement certains niveaux"
**    → Par exemple, inverser les niveaux pairs seulement
**
** 4. "Vérifier si deux arbres sont mirrors"
**    → isMirror(t1, t2)
*/

// ============================================================================
// HELPERS & TESTS
// ============================================================================

// Créer un arbre à partir d'un tableau (level-order)
function arrayToTree(arr) {
	if (arr.length === 0 || arr[0] === null) return null;

	const root = new TreeNode(arr[0]);
	const queue = [root];
	let i = 1;

	while (queue.length > 0 && i < arr.length) {
		const node = queue.shift();

		// Left child
		if (i < arr.length && arr[i] !== null) {
			node.left = new TreeNode(arr[i]);
			queue.push(node.left);
		}
		i++;

		// Right child
		if (i < arr.length && arr[i] !== null) {
			node.right = new TreeNode(arr[i]);
			queue.push(node.right);
		}
		i++;
	}

	return root;
}

// Convertir un arbre en tableau (level-order)
function treeToArray(root) {
	if (root === null) return [];

	const result = [];
	const queue = [root];

	while (queue.length > 0) {
		const node = queue.shift();

		if (node === null) {
			result.push(null);
		} else {
			result.push(node.val);
			queue.push(node.left);
			queue.push(node.right);
		}
	}

	// Supprimer les null finaux
	while (result[result.length - 1] === null) {
		result.pop();
	}

	return result;
}

function runTests() {
	const tests = [
		{
			input: [4, 2, 7, 1, 3, 6, 9],
			expected: [4, 7, 2, 9, 6, 3, 1],
			description: 'Arbre complet'
		},
		{
			input: [2, 1, 3],
			expected: [2, 3, 1],
			description: 'Arbre simple'
		},
		{
			input: [],
			expected: [],
			description: 'Arbre vide'
		},
		{
			input: [1],
			expected: [1],
			description: 'Un seul nœud'
		},
		{
			input: [1, 2],
			expected: [1, null, 2],
			description: 'Enfant gauche uniquement'
		}
	];

	console.log('🧪 Invert Binary Tree - Tests\n');

	tests.forEach((test, index) => {
		const tree = arrayToTree(test.input);
		const inverted = invertTree(tree);
		const result = treeToArray(inverted);

		const passed = JSON.stringify(result) === JSON.stringify(test.expected);

		console.log(
			`Test ${index + 1}: ${passed ? '✅' : '❌'} ${test.description}`
		);
		console.log(`  Input:    [${test.input}]`);
		console.log(`  Output:   [${result}]`);
		console.log(`  Expected: [${test.expected}]\n`);
	});
}

runTests();

/*
** APPLICATIONS RÉELLES :
**
** 1. Image processing
**    → Flip horizontal (mirror image)
**
** 2. Game development
**    → Inverser les contrôles (mode mirror)
**
** 3. UI rendering
**    → RTL (Right-to-Left) layouts
**
** 4. Debugging/Visualization
**    → Afficher une structure de données sous différents angles
*/

/*
** CONCEPTS CLÉS POUR SENIOR :
**
** 1. Récursion vs Itération
**    → Tout DFS récursif peut être converti en itératif (stack)
**    → Performance similaire, trade-off : élégance vs stack safety
**
** 2. In-place modification
**    → Pas de nouveau nœud créé, on modifie l'arbre existant
**    → O(1) espace supplémentaire (hors call stack)
**
** 3. Tree invariants
**    → Certaines propriétés sont préservées (nombre de nœuds)
**    → D'autres changent (BST → plus un BST après inversion)
*/

module.exports = {
	invertTree,
	invertTreeExplicit,
	invertTreeIterative,
	invertTreeStack,
	TreeNode,
	arrayToTree,
	treeToArray
};
