/* ************************************************************************** */
/*                                                                            */
/*   11-balanced-tree.js                                                      */
/*                                                                            */
/*   LeetCode #110 - Balanced Binary Tree                                     */
/*   https://leetcode.com/problems/balanced-binary-tree/                      */
/*                                                                            */
/* ************************************************************************** */

/**
 * DIFFICULTÉ: Easy ⭐
 * TEMPS ATTENDU: 15 minutes
 * FRÉQUENCE: ⭐⭐⭐ (posé chez Amazon, Meta, Microsoft)
 *
 * PATTERNS: Tree, DFS, Recursion, Height
 * COMPLEXITÉ CIBLE: O(n) temps, O(h) espace
 */

/*
** ÉNONCÉ :
**
** Étant donné un arbre binaire, déterminer s'il est height-balanced.
**
** Un arbre binaire height-balanced est défini comme :
** Un arbre binaire dans lequel la différence de hauteur entre le sous-arbre
** gauche et le sous-arbre droit de CHAQUE nœud ne dépasse jamais 1.
**
** EXEMPLES :
**
** Input: root = [3,9,20,null,null,15,7]
**        3
**       / \
**      9  20
**        /  \
**       15   7
** Output: true
** Explication: Hauteur gauche = 1, hauteur droite = 2, |1-2| = 1 ✅
**
** Input: root = [1,2,2,3,3,null,null,4,4]
**          1
**         / \
**        2   2
**       / \
**      3   3
**     / \
**    4   4
** Output: false
** Explication: Sous-arbre gauche de 1 a hauteur 3, droit a hauteur 1, |3-1| = 2 ❌
**
** Input: root = []
** Output: true
** Explication: Arbre vide est considéré balancé
**
** CONTRAINTES :
** - Le nombre de nœuds dans l'arbre est dans [0, 5000]
** - -10^4 <= Node.val <= 10^4
*/

// Définition de TreeNode
class TreeNode {
	constructor(val = 0, left = null, right = null) {
		this.val = val;
		this.left = left;
		this.right = right;
	}
}

/**
 * APPROCHE 1 : Top-Down (NAÏVE - O(n²))
 *
 * Idée : Pour chaque nœud, calculer la hauteur de ses sous-arbres
 *
 * Problème : Recalcule la hauteur plusieurs fois
 *
 * Complexité :
 * - Temps : O(n²) → Hauteur recalculée pour chaque nœud
 * - Espace : O(h) → Call stack
 */
function isBalancedNaive(root) {
	if (root === null) return true;

	// Calculer les hauteurs
	const leftHeight = height(root.left);
	const rightHeight = height(root.right);

	// Vérifier la condition de balance pour ce nœud
	if (Math.abs(leftHeight - rightHeight) > 1) {
		return false;
	}

	// Vérifier récursivement les sous-arbres
	return isBalancedNaive(root.left) && isBalancedNaive(root.right);
}

// Helper pour calculer la hauteur
function height(node) {
	if (node === null) return 0;
	return 1 + Math.max(height(node.left), height(node.right));
}

/**
 * APPROCHE 2 : Bottom-Up (OPTIMALE ✅)
 *
 * Idée : Calculer hauteur ET vérifier balance en un seul parcours
 *        Retourner -1 si débalancé (signal d'erreur)
 *
 * Algorithme :
 * 1. Post-order traversal (gauche → droite → racine)
 * 2. À chaque nœud :
 *    - Calculer hauteur gauche et droite
 *    - Si un sous-arbre est débalancé (hauteur = -1) → propager -1
 *    - Si |hauteur_gauche - hauteur_droite| > 1 → retourner -1
 *    - Sinon retourner 1 + max(hauteur_gauche, hauteur_droite)
 * 3. L'arbre est balancé si hauteur finale != -1
 *
 * Exemple visuel :
 **        3 (h=2)
 **       / \
 **  (h=0)9  20(h=1)
 **         /  \
 **    (h=0)15 7(h=0)
 *
 * Post-order :
 * 1. height(9) = 0
 * 2. height(15) = 0
 * 3. height(7) = 0
 * 4. height(20) = 1 + max(0,0) = 1, |0-0| ≤ 1 ✅
 * 5. height(3) = 1 + max(0,1) = 2, |0-1| ≤ 1 ✅
 *
 * Complexité :
 * - Temps : O(n) → Visite chaque nœud une seule fois
 * - Espace : O(h) → Call stack (h = hauteur)
 */
function isBalanced(root) {
	return checkHeight(root) !== -1;
}

function checkHeight(node) {
	// Cas de base : arbre vide a hauteur 0
	if (node === null) {
		return 0;
	}

	// Calculer hauteur du sous-arbre gauche
	const leftHeight = checkHeight(node.left);
	if (leftHeight === -1) {
		return -1; // Sous-arbre gauche débalancé
	}

	// Calculer hauteur du sous-arbre droit
	const rightHeight = checkHeight(node.right);
	if (rightHeight === -1) {
		return -1; // Sous-arbre droit débalancé
	}

	// Vérifier si ce nœud est balancé
	if (Math.abs(leftHeight - rightHeight) > 1) {
		return -1; // Ce nœud est débalancé
	}

	// Retourner la hauteur de ce sous-arbre
	return 1 + Math.max(leftHeight, rightHeight);
}

/**
 * APPROCHE 3 : Avec objet (plus lisible)
 *
 * Au lieu d'utiliser -1 comme signal, utilise un objet
 */
function isBalancedWithObject(root) {
	function check(node) {
		if (node === null) {
			return { balanced: true, height: 0 };
		}

		const left = check(node.left);
		if (!left.balanced) {
			return { balanced: false, height: 0 };
		}

		const right = check(node.right);
		if (!right.balanced) {
			return { balanced: false, height: 0 };
		}

		const balanced = Math.abs(left.height - right.height) <= 1;
		const height = 1 + Math.max(left.height, right.height);

		return { balanced, height };
	}

	return check(root).balanced;
}

/*
** POURQUOI BOTTOM-UP EST MEILLEUR ?
**
** Top-Down (naïf) :
**          1
**         / \
**        2   3
**       /
**      4
**
** Pour vérifier si 1 est balancé :
** - Calcule height(2) → parcourt 2, 4
** - Calcule height(3)
** - Vérifie récursivement isBalanced(2) → RE-calcule height(4)
** - Vérifie récursivement isBalanced(3)
** → Hauteur de 4 calculée plusieurs fois !
**
** Bottom-Up (optimal) :
** - Parcourt chaque nœud UNE SEULE fois
** - Combine calcul de hauteur et vérification de balance
** - O(n) au lieu de O(n²)
*/

/*
** PATTERN : Post-Order Traversal avec Early Exit
**
** Template :
** function solve(node) {
**     if (node === null) return base_case;
**
**     const left = solve(node.left);
**     if (early_exit_condition(left)) return error_signal;
**
**     const right = solve(node.right);
**     if (early_exit_condition(right)) return error_signal;
**
**     if (node_condition_fails) return error_signal;
**
**     return compute_result(left, right);
** }
*/

/*
** VARIANTES EN INTERVIEW :
**
** 1. "Maximum Depth of Binary Tree" (LeetCode #104) - Easy
**    → Calculer uniquement la hauteur (sous-problème)
**
** 2. "Minimum Depth of Binary Tree" (LeetCode #111) - Easy
**    → Plus courte distance racine → feuille
**
** 3. "Diameter of Binary Tree" (LeetCode #543) - Easy
**    → Plus long chemin entre deux nœuds
**    → Similaire : post-order + calcul de hauteur
**
** 4. "Check if tree is a complete binary tree"
**    → Tous les niveaux remplis sauf peut-être le dernier
**
** 5. "Convert to AVL tree"
**    → Auto-balancer avec rotations
*/

/*
** PIÈGES À ÉVITER :
**
** ❌ Vérifier uniquement la racine
**    → Il faut vérifier TOUS les nœuds
**
** ❌ Oublier le cas null
**    → null a hauteur 0, pas -1
**
** ❌ Utiliser <= au lieu de < pour la différence
**    → |hauteur_gauche - hauteur_droite| > 1 est débalancé
**
** ❌ Ne pas propager le signal d'erreur
**    → Si un sous-arbre est débalancé, tout l'arbre l'est
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

		if (i < arr.length && arr[i] !== null) {
			node.left = new TreeNode(arr[i]);
			queue.push(node.left);
		}
		i++;

		if (i < arr.length && arr[i] !== null) {
			node.right = new TreeNode(arr[i]);
			queue.push(node.right);
		}
		i++;
	}

	return root;
}

// Afficher l'arbre avec les hauteurs
function printTreeWithHeights(root, prefix = '', isLeft = true) {
	if (root === null) return;

	console.log(
		prefix +
			(isLeft ? '├── ' : '└── ') +
			`${root.val} (h=${height(root)})`
	);

	if (root.left || root.right) {
		if (root.left) {
			printTreeWithHeights(
				root.left,
				prefix + (isLeft ? '│   ' : '    '),
				true
			);
		}
		if (root.right) {
			printTreeWithHeights(
				root.right,
				prefix + (isLeft ? '│   ' : '    '),
				false
			);
		}
	}
}

function runTests() {
	const tests = [
		{
			tree: [3, 9, 20, null, null, 15, 7],
			expected: true,
			description: 'Arbre balancé simple'
		},
		{
			tree: [1, 2, 2, 3, 3, null, null, 4, 4],
			expected: false,
			description: 'Arbre débalancé (différence > 1)'
		},
		{
			tree: [],
			expected: true,
			description: 'Arbre vide (balancé par convention)'
		},
		{
			tree: [1],
			expected: true,
			description: 'Un seul nœud (balancé)'
		},
		{
			tree: [1, 2, 3],
			expected: true,
			description: 'Arbre complet niveau 2'
		},
		{
			tree: [1, 2, null, 3],
			expected: false,
			description: 'Chaîne à gauche (débalancé)'
		},
		{
			tree: [1, null, 2, null, 3],
			expected: false,
			description: 'Chaîne à droite (débalancé)'
		},
		{
			tree: [1, 2, 2, 3, null, null, 3, 4, null, null, 4],
			expected: false,
			description: 'Symétrique mais débalancé'
		}
	];

	console.log('🧪 Balanced Binary Tree - Tests\n');

	tests.forEach((test, index) => {
		const root = arrayToTree(test.tree);
		const result = isBalanced(root);
		const passed = result === test.expected;

		console.log(
			`Test ${index + 1}: ${passed ? '✅' : '❌'} ${test.description}`
		);
		console.log(`  Tree: [${test.tree}]`);
		console.log(`  Balanced: ${result}`);
		console.log(`  Expected: ${test.expected}`);

		if (root && test.tree.length <= 7) {
			console.log(`  Visualisation:`);
			printTreeWithHeights(root, '    ', true);
		}
		console.log();
	});

	// Benchmark comparaison
	console.log('⚡ Benchmark (10,000 itérations):\n');
	const testTree = arrayToTree([3, 9, 20, null, null, 15, 7]);

	console.time('Bottom-Up (optimal O(n))');
	for (let i = 0; i < 10000; i++) {
		isBalanced(testTree);
	}
	console.timeEnd('Bottom-Up (optimal O(n))');

	console.time('Top-Down (naïf O(n²))');
	for (let i = 0; i < 10000; i++) {
		isBalancedNaive(testTree);
	}
	console.timeEnd('Top-Down (naïf O(n²))');
}

runTests();

/*
** APPLICATIONS RÉELLES :
**
** 1. Bases de données (B-trees)
**    → Maintenir l'équilibre pour garantir O(log n)
**
** 2. AVL Trees, Red-Black Trees
**    → Structures auto-équilibrées
**
** 3. Systèmes de fichiers
**    → Équilibrer les arbres de répertoires
**
** 4. Compilateurs
**    → AST (Abstract Syntax Tree) équilibrés
**
** 5. Jeux vidéo
**    → Spatial partitioning (Quadtrees, Octrees)
*/

/*
** CONCEPTS CLÉS POUR SENIOR :
**
** 1. Post-Order Traversal
**    Traiter les enfants avant le parent
**    → Permet de calculer bottom-up
**
** 2. Early Exit Pattern
**    Utiliser -1 (ou autre signal) pour arrêter tôt
**    → Évite de parcourir inutilement
**
** 3. Amortized Analysis
**    Bottom-up : chaque nœud visité 1 fois → O(n)
**    Top-down : certains nœuds visités multiple fois → O(n²)
**
** 4. Height vs Depth
**    Height : distance au nœud le plus éloigné (bottom-up)
**    Depth : distance depuis la racine (top-down)
**
** 5. Balance Factor
**    BF(node) = height(left) - height(right)
**    Balanced ↔ |BF| ≤ 1 pour tous les nœuds
*/

module.exports = {
	isBalanced,
	isBalancedNaive,
	isBalancedWithObject,
	TreeNode,
	arrayToTree,
	height
};
