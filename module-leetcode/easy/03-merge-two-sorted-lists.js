/* ************************************************************************** */
/*                                                                            */
/*   03-merge-two-sorted-lists.js                                             */
/*                                                                            */
/*   LeetCode #21 - Merge Two Sorted Lists                                    */
/*   https://leetcode.com/problems/merge-two-sorted-lists/                    */
/*                                                                            */
/* ************************************************************************** */

/**
 * DIFFICULTÉ: Easy ⭐
 * TEMPS ATTENDU: 15-20 minutes
 * FRÉQUENCE: ⭐⭐⭐⭐⭐ (posé chez Amazon, Meta, Microsoft, Apple)
 *
 * PATTERNS: Linked List, Two Pointers, Recursion
 * COMPLEXITÉ CIBLE: O(n+m) temps, O(1) espace (itératif) / O(n+m) (récursif)
 */

/*
** ÉNONCÉ :
**
** Fusionner deux listes chaînées triées en une seule liste triée.
** La nouvelle liste doit être construite en épissant les nœuds
** des deux premières listes.
**
** EXEMPLES :
**
** Input: list1 = [1,2,4], list2 = [1,3,4]
** Output: [1,1,2,3,4,4]
**
** Input: list1 = [], list2 = []
** Output: []
**
** Input: list1 = [], list2 = [0]
** Output: [0]
**
** CONTRAINTES :
** - Le nombre de nœuds dans les deux listes est dans [0, 50]
** - -100 <= Node.val <= 100
** - list1 et list2 sont triées en ordre croissant
*/

// Définition de la structure ListNode
class ListNode {
	constructor(val = 0, next = null) {
		this.val = val;
		this.next = next;
	}
}

/**
 * APPROCHE 1 : Itérative avec Dummy Node (RECOMMANDÉE)
 *
 * Idée : Utiliser un nœud "dummy" (factice) pour simplifier le code
 *
 * Algorithme :
 * 1. Créer un dummy node et un pointeur current
 * 2. Tant que les deux listes ont des éléments :
 *    - Comparer les valeurs de list1 et list2
 *    - Attacher le plus petit à current
 *    - Avancer dans la liste choisie
 * 3. Attacher le reste de la liste non vide
 * 4. Retourner dummy.next (ignore le dummy)
 *
 * Exemple visuel :
 * list1: 1 → 2 → 4
 * list2: 1 → 3 → 4
 *
 * Étapes :
 * dummy → 1 (list2) → 1 (list1) → 2 → 3 → 4 → 4
 *
 * Complexité :
 * - Temps : O(n + m) où n,m = longueurs des listes
 * - Espace : O(1) → Pas d'allocation, réutilise les nœuds
 */
function mergeTwoLists(list1, list2) {
	// Dummy node pour simplifier le code
	const dummy = new ListNode();
	let current = dummy;

	// Parcourir tant que les deux listes ont des éléments
	while (list1 !== null && list2 !== null) {
		if (list1.val <= list2.val) {
			current.next = list1;
			list1 = list1.next;
		} else {
			current.next = list2;
			list2 = list2.next;
		}
		current = current.next;
	}

	// Attacher le reste de la liste non vide (s'il y en a)
	current.next = list1 !== null ? list1 : list2;

	return dummy.next;
}

/**
 * APPROCHE 2 : Récursive (ÉLÉGANTE)
 *
 * Idée : Choisir le plus petit head, puis récursivement merger le reste
 *
 * Cas de base :
 * - Si list1 est null → retourner list2
 * - Si list2 est null → retourner list1
 *
 * Cas récursif :
 * - Si list1.val <= list2.val :
 *   → list1.next = mergeTwoLists(list1.next, list2)
 *   → retourner list1
 * - Sinon :
 *   → list2.next = mergeTwoLists(list1, list2.next)
 *   → retourner list2
 *
 * Complexité :
 * - Temps : O(n + m)
 * - Espace : O(n + m) → Call stack de récursion
 */
function mergeTwoListsRecursive(list1, list2) {
	// Cas de base
	if (list1 === null) return list2;
	if (list2 === null) return list1;

	// Cas récursif
	if (list1.val <= list2.val) {
		list1.next = mergeTwoListsRecursive(list1.next, list2);
		return list1;
	} else {
		list2.next = mergeTwoListsRecursive(list1, list2.next);
		return list2;
	}
}

/*
** POURQUOI DUMMY NODE ?
**
** Sans dummy node, il faut gérer le premier élément séparément :
**
** ❌ Version sans dummy (plus complexe) :
** let result = null;
** let current = null;
** if (list1.val <= list2.val) {
**     result = list1;
**     current = list1;
**     list1 = list1.next;
** } else { ... }
**
** ✅ Avec dummy node (simple) :
** const dummy = new ListNode();
** let current = dummy;
** → Pas de cas spécial pour le premier élément !
*/

/*
** VARIANTES EN INTERVIEW :
**
** 1. "Merger K listes triées" → LeetCode #23 (Hard)
**    → Utiliser Min Heap ou Divide & Conquer
**
** 2. "Merger sans créer de nouveaux nœuds"
**    → C'est déjà le cas ! On réutilise les nœuds existants
**
** 3. "Merger en ordre décroissant"
**    → Inverser la condition (list1.val >= list2.val)
*/

// ============================================================================
// HELPERS & TESTS
// ============================================================================

// Créer une liste à partir d'un tableau
function arrayToList(arr) {
	if (arr.length === 0) return null;

	const dummy = new ListNode();
	let current = dummy;

	for (const val of arr) {
		current.next = new ListNode(val);
		current = current.next;
	}

	return dummy.next;
}

// Convertir une liste en tableau (pour affichage)
function listToArray(head) {
	const result = [];
	let current = head;

	while (current !== null) {
		result.push(current.val);
		current = current.next;
	}

	return result;
}

function runTests() {
	const tests = [
		{
			list1: [1, 2, 4],
			list2: [1, 3, 4],
			expected: [1, 1, 2, 3, 4, 4],
			description: 'Deux listes normales'
		},
		{
			list1: [],
			list2: [],
			expected: [],
			description: 'Deux listes vides'
		},
		{
			list1: [],
			list2: [0],
			expected: [0],
			description: 'Une liste vide'
		},
		{
			list1: [1, 2, 3],
			list2: [4, 5, 6],
			expected: [1, 2, 3, 4, 5, 6],
			description: 'Aucun entrelacement'
		},
		{
			list1: [5],
			list2: [1, 2, 4],
			expected: [1, 2, 4, 5],
			description: 'Premier élément plus grand'
		}
	];

	console.log('🧪 Merge Two Sorted Lists - Tests\n');

	tests.forEach((test, index) => {
		const l1 = arrayToList(test.list1);
		const l2 = arrayToList(test.list2);
		const result = mergeTwoLists(l1, l2);
		const resultArray = listToArray(result);

		const passed = JSON.stringify(resultArray) === JSON.stringify(test.expected);

		console.log(
			`Test ${index + 1}: ${passed ? '✅' : '❌'} ${test.description}`
		);
		console.log(`  list1: [${test.list1}]`);
		console.log(`  list2: [${test.list2}]`);
		console.log(`  Output: [${resultArray}]`);
		console.log(`  Expected: [${test.expected}]\n`);
	});
}

runTests();

/*
** CONCEPTS CLÉS POUR SENIOR :
**
** 1. Dummy Node Pattern
**    → Simplifie le code en évitant les cas spéciaux
**    → Utilisé dans beaucoup de problèmes de linked lists
**
** 2. In-place modification
**    → Pas de new ListNode() pour chaque élément
**    → Réutilise les nœuds existants → O(1) espace
**
** 3. Trade-off Itératif vs Récursif
**    Itératif : O(1) espace mais plus verbeux
**    Récursif : O(n) espace mais plus élégant
**    → En interview, montrer les deux approches !
*/

