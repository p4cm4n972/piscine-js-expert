/* ************************************************************************** */
/*                                                                            */
/*   12-linked-list-cycle.js                                                  */
/*                                                                            */
/*   LeetCode #141 - Linked List Cycle                                        */
/*   https://leetcode.com/problems/linked-list-cycle/                         */
/*                                                                            */
/* ************************************************************************** */

/**
 * DIFFICULTÉ: Easy ⭐
 * TEMPS ATTENDU: 15 minutes
 * FRÉQUENCE: ⭐⭐⭐⭐ (posé chez Amazon, Meta, Microsoft, Apple)
 *
 * PATTERNS: Linked List, Two Pointers, Floyd's Cycle Detection
 * COMPLEXITÉ CIBLE: O(n) temps, O(1) espace
 */

/*
** ÉNONCÉ :
**
** Étant donné `head`, la tête d'une liste chaînée, déterminer si
** la liste contient un cycle.
**
** Il y a un cycle dans une liste chaînée si un nœud peut être
** atteint à nouveau en suivant continuellement le pointeur `next`.
**
** Retourner true s'il y a un cycle, false sinon.
**
** EXEMPLES :
**
** Input: head = [3,2,0,-4], pos = 1
** 3 → 2 → 0 → -4
**     ↑__________|
** Output: true
** Explication: Il y a un cycle, la queue se connecte au nœud d'index 1
**
** Input: head = [1,2], pos = 0
** 1 → 2
** ↑___|
** Output: true
**
** Input: head = [1], pos = -1
** 1
** Output: false
**
** CONTRAINTES :
** - Le nombre de nœuds dans la liste est dans [0, 10^4]
** - -10^5 <= Node.val <= 10^5
** - pos est -1 ou un index valide dans la liste
*/

// Définition de ListNode
class ListNode {
	constructor(val = 0, next = null) {
		this.val = val;
		this.next = next;
	}
}

/**
 * APPROCHE 1 : Hash Set (Simple mais O(n) espace)
 *
 * Idée : Stocker les nœuds visités dans un Set
 *        Si on revisite un nœud → cycle
 *
 * Complexité :
 * - Temps : O(n)
 * - Espace : O(n) → Set de n nœuds dans le pire cas
 */
function hasCycleHashSet(head) {
	const visited = new Set();
	let current = head;

	while (current !== null) {
		if (visited.has(current)) {
			return true; // Cycle détecté
		}
		visited.add(current);
		current = current.next;
	}

	return false; // Pas de cycle
}

/**
 * APPROCHE 2 : Floyd's Cycle Detection (Tortue et Lièvre) (OPTIMALE ✅)
 *
 * Idée : Deux pointeurs à vitesses différentes
 *        - Slow : avance de 1 nœud par itération
 *        - Fast : avance de 2 nœuds par itération
 *        Si cycle → les deux se rencontrent
 *        Si pas de cycle → fast atteint null
 *
 * Algorithme :
 * 1. Initialiser slow = head, fast = head
 * 2. Tant que fast et fast.next existent :
 *    - slow = slow.next
 *    - fast = fast.next.next
 *    - Si slow === fast → return true (cycle)
 * 3. Return false (fast a atteint la fin)
 *
 * Pourquoi ça marche ?
 * - Si cycle de longueur C :
 *   - Chaque itération, fast gagne 1 nœud sur slow
 *   - Dans un cycle, fast rattrapera forcément slow
 *   - Au plus C itérations pour se rencontrer
 *
 * Exemple visuel :
 * 1 → 2 → 3 → 4
 *     ↑_______|
 *
 * Itération 1: slow=1, fast=1
 * Itération 2: slow=2, fast=3
 * Itération 3: slow=3, fast=2
 * Itération 4: slow=4, fast=4 → RENCONTRE! ✅
 *
 * Complexité :
 * - Temps : O(n) → Au plus 2n itérations
 * - Espace : O(1) → Deux pointeurs seulement
 */
function hasCycle(head) {
	if (head === null || head.next === null) {
		return false;
	}

	let slow = head;
	let fast = head;

	while (fast !== null && fast.next !== null) {
		slow = slow.next; // Avance de 1
		fast = fast.next.next; // Avance de 2

		if (slow === fast) {
			return true; // Cycle détecté
		}
	}

	return false; // Pas de cycle
}

/**
 * APPROCHE 3 : Marquer les nœuds (Destructive, ne pas utiliser en prod!)
 *
 * Idée : Modifier les nœuds visités avec une valeur spéciale
 *
 * ❌ Problème : Modifie la structure (destructive)
 * ❌ Ne fonctionne pas si les valeurs peuvent être n'importe quoi
 */
function hasCycleDestructive(head) {
	const VISITED = Symbol('visited');
	let current = head;

	while (current !== null) {
		if (current.visited === VISITED) {
			return true;
		}
		current.visited = VISITED;
		current = current.next;
	}

	return false;
}

/*
** FLOYD'S CYCLE DETECTION : Pourquoi ça marche ?
**
** Intuition : La tortue et le lièvre (Aesop's fable)
**
** Preuve mathématique :
** - Soit C = longueur du cycle
** - Slow et fast sont tous deux dans le cycle
** - À chaque étape, distance entre eux diminue de 1
**   (fast gagne 2, slow gagne 1 → différence = 1)
** - Donc après au plus C étapes, ils se rencontrent
**
** Distance totale :
** - Fast parcourt au plus 2n nœuds
** - Slow parcourt au plus n nœuds
** - Total : O(n)
*/

/*
** VARIANTES EN INTERVIEW :
**
** 1. "Linked List Cycle II" (LeetCode #142) - Medium
**    → Retourner le nœud où commence le cycle
**    → Utiliser Floyd + mathématiques
**
** 2. "Happy Number" (LeetCode #202) - Easy
**    → Détecter un cycle dans une séquence de nombres
**    → Même algorithme Floyd's
**
** 3. "Find the Duplicate Number" (LeetCode #287) - Medium
**    → Trouver le duplicata dans un tableau [1..n]
**    → Modéliser comme linked list avec cycle
**
** 4. "Intersection of Two Linked Lists" (LeetCode #160) - Easy
**    → Utilise aussi deux pointeurs
*/

/*
** PIÈGES À ÉVITER :
**
** ❌ Ne pas vérifier fast.next avant fast.next.next
**    → NullPointerException si fast est le dernier nœud
**
** ❌ Initialiser slow et fast différemment
**    → Ils doivent commencer au même endroit (head)
**
** ❌ Utiliser slow.next.next
**    → Slow avance de 1, pas 2 !
**
** ❌ Comparer slow.val === fast.val au lieu de slow === fast
**    → Il faut comparer les références, pas les valeurs
*/

// ============================================================================
// HELPERS & TESTS
// ============================================================================

// Créer une liste avec cycle
function createCycleList(values, pos) {
	if (values.length === 0) return null;

	const head = new ListNode(values[0]);
	let current = head;
	let cycleNode = null;

	// Créer la liste
	for (let i = 1; i < values.length; i++) {
		current.next = new ListNode(values[i]);
		current = current.next;

		if (i === pos) {
			cycleNode = current;
		}
	}

	// Créer le cycle
	if (pos >= 0 && cycleNode !== null) {
		current.next = cycleNode;
	}

	// pos === 0 signifie cycle au head
	if (pos === 0) {
		current.next = head;
	}

	return head;
}

// Visualiser une liste (limite pour éviter boucle infinie)
function visualizeList(head, maxNodes = 10) {
	const values = [];
	let current = head;
	let count = 0;

	while (current !== null && count < maxNodes) {
		values.push(current.val);
		current = current.next;
		count++;
	}

	if (current !== null) {
		values.push('...(cycle)');
	}

	return values.join(' → ');
}

function runTests() {
	const tests = [
		{
			values: [3, 2, 0, -4],
			pos: 1,
			expected: true,
			description: 'Cycle au milieu'
		},
		{
			values: [1, 2],
			pos: 0,
			expected: true,
			description: 'Cycle au début'
		},
		{
			values: [1],
			pos: -1,
			expected: false,
			description: 'Un seul nœud, pas de cycle'
		},
		{
			values: [1, 2, 3, 4, 5],
			pos: -1,
			expected: false,
			description: 'Liste normale sans cycle'
		},
		{
			values: [],
			pos: -1,
			expected: false,
			description: 'Liste vide'
		},
		{
			values: [1, 2, 3, 4, 5],
			pos: 4,
			expected: true,
			description: 'Cycle à la fin (self-loop)'
		},
		{
			values: [1, 2, 3, 4, 5, 6, 7, 8],
			pos: 3,
			expected: true,
			description: 'Cycle dans une longue liste'
		}
	];

	console.log('🧪 Linked List Cycle - Tests\n');

	tests.forEach((test, index) => {
		const head = createCycleList(test.values, test.pos);
		const result = hasCycle(head);
		const passed = result === test.expected;

		console.log(
			`Test ${index + 1}: ${passed ? '✅' : '❌'} ${test.description}`
		);
		console.log(`  Values: [${test.values}], cycle at pos: ${test.pos}`);
		console.log(`  List: ${visualizeList(head)}`);
		console.log(`  Has cycle: ${result}`);
		console.log(`  Expected: ${test.expected}\n`);
	});

	// Démonstration de Floyd's algorithm
	console.log('📊 Trace de Floyd\'s Algorithm:\n');
	const cycleList = createCycleList([1, 2, 3, 4, 5], 2);

	let slow = cycleList;
	let fast = cycleList;
	let step = 0;

	console.log('Liste: 1 → 2 → 3 → 4 → 5 → (cycle to 3)\n');

	while (fast !== null && fast.next !== null && step < 10) {
		slow = slow.next;
		fast = fast.next.next;
		step++;

		console.log(`Step ${step}:`);
		console.log(`  slow = ${slow ? slow.val : 'null'}`);
		console.log(`  fast = ${fast ? fast.val : 'null'}`);

		if (slow === fast) {
			console.log(`  → CYCLE DETECTED! 🎯\n`);
			break;
		}
		console.log();
	}
}

runTests();

/*
** APPLICATIONS RÉELLES :
**
** 1. Débogage
**    → Détecter les références circulaires
**    → JSON.stringify() échoue sur les cycles
**
** 2. Garbage Collection
**    → Détecter les cycles pour libérer la mémoire
**
** 3. Analyse de graphes
**    → Détecter les cycles dans un graphe
**
** 4. Détection d'impasse (deadlock)
**    → Cycle dans le graphe de dépendances
**
** 5. Validation de structures
**    → Vérifier l'intégrité des structures de données
*/

/*
** CONCEPTS CLÉS POUR SENIOR :
**
** 1. Floyd's Cycle Detection
**    Algorithme élégant O(1) espace
**    → Applicable à tout système avec états finis
**
** 2. Two Pointers Pattern
**    Slow/Fast pointers (différentes vitesses)
**    → Vs Two Pointers classiques (même vitesse, directions opposées)
**
** 3. Space-Time Tradeoff
**    HashSet : O(n) temps, O(n) espace
**    Floyd's : O(n) temps, O(1) espace
**    → Toujours chercher à optimiser l'espace si possible
**
** 4. Reference vs Value
**    Comparer `slow === fast` (références)
**    Pas `slow.val === fast.val` (valeurs)
**
** 5. Proof of Correctness
**    Savoir POURQUOI Floyd's fonctionne
**    → Important en interview senior
*/

module.exports = { hasCycle, hasCycleHashSet, hasCycleDestructive, ListNode, createCycleList };
