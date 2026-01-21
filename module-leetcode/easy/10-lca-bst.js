/* ************************************************************************** */
/*                                                                            */
/*   10-lca-bst.js                                                            */
/*                                                                            */
/*   LeetCode #235 - Lowest Common Ancestor of a Binary Search Tree           */
/*   https://leetcode.com/problems/lowest-common-ancestor-of-a-bst/          */
/*                                                                            */
/* ************************************************************************** */

/**
 * DIFFICULTÉ: Easy ⭐
 * TEMPS ATTENDU: 20 minutes
 * FRÉQUENCE: ⭐⭐⭐⭐ (posé chez Meta, Amazon, Microsoft, LinkedIn)
 *
 * PATTERNS: Tree, BST, Recursion
 * COMPLEXITÉ CIBLE: O(h) temps, O(1) espace (itératif) / O(h) (récursif)
 */

/*
** ÉNONCÉ :
**
** Étant donné un arbre binaire de recherche (BST), trouver le plus bas
** ancêtre commun (LCA) de deux nœuds donnés dans le BST.
**
** Selon la définition du LCA : "Le plus bas ancêtre commun est défini entre
** deux nœuds p et q comme le nœud le plus bas dans T qui a à la fois p et q
** comme descendants (où nous autorisons un nœud à être un descendant de lui-même)."
**
** EXEMPLES :
**
** Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
**        6
**      /   \
**     2     8
**    / \   / \
**   0   4 7   9
**      / \
**     3   5
** Output: 6
** Explication: Le LCA de 2 et 8 est 6
**
** Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
** Output: 2
** Explication: Le LCA de 2 et 4 est 2 (un nœud peut être son propre ancêtre)
**
** CONTRAINTES :
** - Tous les Node.val sont uniques
** - p != q
** - p et q existent dans le BST
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
 * APPROCHE 1 : Exploiter les propriétés BST (OPTIMALE ✅)
 *
 * Idée : Utiliser la propriété BST (left < node < right)
 *
 * Propriété clé du BST :
 * - Si p.val < node.val ET q.val < node.val → LCA est à gauche
 * - Si p.val > node.val ET q.val > node.val → LCA est à droite
 * - Sinon → node actuel est le LCA (split point)
 *
 * Algorithme :
 * 1. Commencer à la racine
 * 2. Tant que pas trouvé :
 *    - Si p et q < node → aller à gauche
 *    - Si p et q > node → aller à droite
 *    - Sinon → split point trouvé (LCA)
 *
 * Exemple visuel pour p=2, q=8, root=6 :
 *        6  ← Start
 *      /   \
 *     2     8
 *
 * p=2 < 6 ET q=8 > 6 → Split! → Return 6
 *
 * Exemple pour p=2, q=4, root=6 :
 *        6
 *      /
 *     2  ← Split point (2 est ancêtre de 4 et de lui-même)
 *      \
 *       4
 *
 * Complexité :
 * - Temps : O(h) où h = hauteur (pire cas O(n) si arbre dégénéré)
 * - Espace : O(1) → Pas de récursion
 */
function lowestCommonAncestor(root, p, q) {
	let current = root;

	while (current !== null) {
		// Les deux dans le sous-arbre gauche
		if (p.val < current.val && q.val < current.val) {
			current = current.left;
		}
		// Les deux dans le sous-arbre droit
		else if (p.val > current.val && q.val > current.val) {
			current = current.right;
		}
		// Split point trouvé
		else {
			return current;
		}
	}

	return null; // Ne devrait jamais arriver selon les contraintes
}

/**
 * APPROCHE 2 : Récursive (plus élégante)
 *
 * Même logique mais récursive
 */
function lowestCommonAncestorRecursive(root, p, q) {
	// Les deux à gauche
	if (p.val < root.val && q.val < root.val) {
		return lowestCommonAncestorRecursive(root.left, p, q);
	}

	// Les deux à droite
	if (p.val > root.val && q.val > root.val) {
		return lowestCommonAncestorRecursive(root.right, p, q);
	}

	// Split point
	return root;
}

/**
 * APPROCHE 3 : Solution générique (fonctionne aussi pour Binary Tree)
 *
 * Ne profite PAS des propriétés BST
 * Complexité : O(n) car doit parcourir tout l'arbre
 *
 * NOTE : Pour un Binary Tree (pas BST), voir LeetCode #236
 */
function lowestCommonAncestorGeneric(root, p, q) {
	if (root === null || root === p || root === q) {
		return root;
	}

	const left = lowestCommonAncestorGeneric(root.left, p, q);
	const right = lowestCommonAncestorGeneric(root.right, p, q);

	// Si p et q dans des sous-arbres différents → root est LCA
	if (left !== null && right !== null) {
		return root;
	}

	// Sinon retourner celui qui n'est pas null
	return left !== null ? left : right;
}

/*
** POURQUOI LA PROPRIÉTÉ BST EST CRUCIALE ?
**
** BST Property : left.val < node.val < right.val
**
** Cela nous permet de :
** 1. Savoir dans quelle direction chercher sans parcourir tout l'arbre
** 2. Identifier le split point en O(h) au lieu de O(n)
**
** Exemple :
**        6
**      /   \
**     2     8
**
** Chercher LCA(2, 8) :
** - À 6 : 2 < 6 < 8 → Split! O(1)
**
** Sans BST property (binary tree normal) :
** - Il faudrait parcourir les deux sous-arbres → O(n)
*/

/*
** PATTERN : LCA (Lowest Common Ancestor)
**
** Deux types de problèmes :
**
** 1. BST (ce problème) - O(h)
**    → Utiliser la propriété d'ordre
**    → Descendre uniquement d'un côté à la fois
**
** 2. Binary Tree (LeetCode #236) - O(n)
**    → Parcourir les deux sous-arbres
**    → Utiliser post-order traversal
*/

/*
** VARIANTES EN INTERVIEW :
**
** 1. "Lowest Common Ancestor of a Binary Tree" (LeetCode #236) - Medium
**    → Pas de propriété BST, O(n) nécessaire
**
** 2. "Lowest Common Ancestor III" (LeetCode #1650) - Medium
**    → Nœuds peuvent ne pas exister dans l'arbre
**
** 3. "Lowest Common Ancestor IV" (LeetCode #1676) - Medium
**    → Trouver LCA de plusieurs nœuds (pas juste 2)
**
** 4. "Distance entre deux nœuds"
**    → Utiliser LCA pour calculer la distance
**    → distance(p, q) = depth(p) + depth(q) - 2*depth(LCA)
**
** 5. "Vérifier si un nœud est ancêtre d'un autre"
**    → Utiliser propriétés BST
*/

/*
** PIÈGES À ÉVITER :
**
** ❌ Parcourir tout l'arbre (ignorer la propriété BST)
**    → O(n) au lieu de O(h)
**
** ❌ Oublier qu'un nœud peut être son propre ancêtre
**    → LCA(2, 4) peut être 2 lui-même
**
** ❌ Utiliser p === root au lieu de p.val === root.val
**    → Comparaison de références vs valeurs
**
** ❌ Ne pas gérer le cas où p et q sont égaux
**    → Selon contraintes, p != q, mais bon de vérifier
*/

// ============================================================================
// HELPERS & TESTS
// ============================================================================

// Créer un BST à partir d'un tableau (level-order)
function arrayToBST(arr) {
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

// Trouver un nœud par valeur
function findNode(root, val) {
	if (root === null) return null;
	if (root.val === val) return root;

	const left = findNode(root.left, val);
	if (left !== null) return left;

	return findNode(root.right, val);
}

function runTests() {
	const tests = [
		{
			tree: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5],
			p: 2,
			q: 8,
			expected: 6,
			description: 'LCA de deux nœuds dans sous-arbres différents'
		},
		{
			tree: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5],
			p: 2,
			q: 4,
			expected: 2,
			description: 'Un nœud est ancêtre de l\'autre'
		},
		{
			tree: [2, 1],
			p: 2,
			q: 1,
			expected: 2,
			description: 'Arbre simple (parent-enfant)'
		},
		{
			tree: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5],
			p: 3,
			q: 5,
			expected: 4,
			description: 'Deux feuilles avec LCA intermédiaire'
		},
		{
			tree: [6, 2, 8, 0, 4, 7, 9],
			p: 0,
			q: 9,
			expected: 6,
			description: 'Feuilles extrêmes gauche et droite'
		}
	];

	console.log('🧪 Lowest Common Ancestor of BST - Tests\n');

	tests.forEach((test, index) => {
		const root = arrayToBST(test.tree);
		const pNode = findNode(root, test.p);
		const qNode = findNode(root, test.q);
		const result = lowestCommonAncestor(root, pNode, qNode);

		const passed = result.val === test.expected;

		console.log(
			`Test ${index + 1}: ${passed ? '✅' : '❌'} ${test.description}`
		);
		console.log(`  Tree: [${test.tree}]`);
		console.log(`  p = ${test.p}, q = ${test.q}`);
		console.log(`  LCA: ${result.val}`);
		console.log(`  Expected: ${test.expected}\n`);
	});

	// Visualisation de l'algorithme
	console.log('📊 Trace de l\'algorithme pour LCA(2, 8) :\n');
	const root = arrayToBST([6, 2, 8, 0, 4, 7, 9]);
	const p = findNode(root, 2);
	const q = findNode(root, 8);

	let current = root;
	let step = 1;
	while (current !== null) {
		console.log(`Step ${step}: current = ${current.val}`);
		console.log(
			`  p(${p.val}) < ${current.val}? ${p.val < current.val}`
		);
		console.log(
			`  q(${q.val}) > ${current.val}? ${q.val > current.val}`
		);

		if (p.val < current.val && q.val < current.val) {
			console.log(`  → Both left, go to left child\n`);
			current = current.left;
		} else if (p.val > current.val && q.val > current.val) {
			console.log(`  → Both right, go to right child\n`);
			current = current.right;
		} else {
			console.log(`  → Split point found! LCA = ${current.val}\n`);
			break;
		}
		step++;
	}
}

runTests();

/*
** APPLICATIONS RÉELLES :
**
** 1. Systèmes de fichiers
**    → Trouver le dossier parent commun le plus proche
**
** 2. Version control (Git)
**    → Trouver le commit ancêtre commun (merge base)
**
** 3. Hiérarchies organisationnelles
**    → Trouver le manager commun le plus bas
**
** 4. Taxonomie / Classification
**    → Trouver la catégorie commune (biologiste, produits e-commerce)
**
** 5. Réseaux / Routing
**    → Trouver le nœud de jonction dans un réseau
*/

/*
** CONCEPTS CLÉS POUR SENIOR :
**
** 1. Exploiter les invariants de structure
**    BST property nous donne O(h) au lieu de O(n)
**    → Toujours vérifier si une propriété peut être exploitée
**
** 2. Itératif vs Récursif
**    Itératif : O(1) espace
**    Récursif : O(h) espace (call stack)
**    → Pour BST balancé, h = log(n), acceptable
**
** 3. Split point concept
**    Le LCA est le premier nœud où p et q divergent
**    → Visualiser comme un "Y" inversé
**
** 4. BST operations time complexity
**    Balanced BST : O(log n)
**    Worst case (skewed) : O(n)
**    → Importance des arbres auto-équilibrés (AVL, Red-Black)
*/

	lowestCommonAncestor,
	lowestCommonAncestorRecursive,
	lowestCommonAncestorGeneric,
	TreeNode,
	arrayToBST,
	findNode
};
