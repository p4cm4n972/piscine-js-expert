/* ************************************************************************** */
/*                                                                            */
/*   13-queue-using-stacks.js                                                 */
/*                                                                            */
/*   LeetCode #232 - Implement Queue using Stacks                             */
/*   https://leetcode.com/problems/implement-queue-using-stacks/              */
/*                                                                            */
/* ************************************************************************** */

/**
 * DIFFICULTÉ: Easy ⭐
 * TEMPS ATTENDU: 15 minutes
 * FRÉQUENCE: ⭐⭐⭐ (posé chez Amazon, Microsoft, Bloomberg)
 *
 * PATTERNS: Stack, Queue, Design
 * COMPLEXITÉ CIBLE: O(1) amortized pour toutes les opérations
 */

/*
** ÉNONCÉ :
**
** Implémenter une file (FIFO) en utilisant uniquement deux piles (LIFO).
**
** La file implémentée doit supporter toutes les fonctions d'une file normale :
** - push(x) : Ajouter un élément à la fin de la file
** - pop() : Retirer l'élément du début de la file
** - peek() : Obtenir l'élément du début
** - empty() : Retourner si la file est vide
**
** Contraintes :
** - Vous devez utiliser UNIQUEMENT des opérations de pile standard
**   (push, pop, peek, size, isEmpty)
**
** EXEMPLES :
**
** Input:
** ["MyQueue", "push", "push", "peek", "pop", "empty"]
** [[], [1], [2], [], [], []]
**
** Output:
** [null, null, null, 1, 1, false]
**
** Explication:
** MyQueue myQueue = new MyQueue();
** myQueue.push(1); // queue is: [1]
** myQueue.push(2); // queue is: [1, 2] (leftmost is front)
** myQueue.peek();  // return 1
** myQueue.pop();   // return 1, queue is [2]
** myQueue.empty(); // return false
**
** CONTRAINTES :
** - 1 <= x <= 9
** - Au plus 100 appels seront faits à push, pop, peek, et empty
** - Tous les appels à pop et peek sont valides
*/

/**
 * APPROCHE 1 : Two Stacks avec transfert à chaque pop (NAÏVE)
 *
 * Idée : Utiliser une stack pour push, transférer vers autre stack pour pop
 *
 * Problème : Transfert à CHAQUE pop → inefficace
 *
 * Complexité :
 * - push() : O(1)
 * - pop() : O(n) → Transfert complet à chaque fois
 * - peek() : O(n)
 * - empty() : O(1)
 */
class MyQueueNaive {
	constructor() {
		this.stack1 = []; // Pour push
		this.stack2 = []; // Pour pop/peek
	}

	push(x) {
		this.stack1.push(x);
	}

	pop() {
		// Transférer tout de stack1 vers stack2
		while (this.stack1.length > 0) {
			this.stack2.push(this.stack1.pop());
		}

		// Pop de stack2 (FIFO order)
		const result = this.stack2.pop();

		// Retransférer vers stack1
		while (this.stack2.length > 0) {
			this.stack1.push(this.stack2.pop());
		}

		return result;
	}

	peek() {
		while (this.stack1.length > 0) {
			this.stack2.push(this.stack1.pop());
		}

		const result = this.stack2[this.stack2.length - 1];

		while (this.stack2.length > 0) {
			this.stack1.push(this.stack2.pop());
		}

		return result;
	}

	empty() {
		return this.stack1.length === 0;
	}
}

/**
 * APPROCHE 2 : Two Stacks avec Lazy Transfer (OPTIMALE ✅)
 *
 * Idée : Transférer uniquement quand stack2 est vide
 *
 * Structure :
 * - stack1 (input) : Pour tous les push
 * - stack2 (output) : Pour tous les pop/peek
 *
 * Invariant :
 * - stack1 contient les nouveaux éléments (ordre inverse)
 * - stack2 contient les anciens éléments (ordre FIFO)
 *
 * Algorithme :
 * - push(x) : Toujours push dans stack1
 * - pop/peek() :
 *   → Si stack2 vide : transférer TOUT de stack1 vers stack2
 *   → Puis pop/peek de stack2
 *
 * Exemple visuel :
 * push(1), push(2), push(3):
 * stack1: [1, 2, 3] (top=3)
 * stack2: []
 *
 * pop():
 * Transfert → stack1: []
 *             stack2: [3, 2, 1] (top=1)
 * Return 1
 *
 * push(4):
 * stack1: [4]
 * stack2: [3, 2]
 *
 * pop():
 * stack2 non vide → pop directement
 * Return 2
 *
 * Complexité AMORTIE :
 * - push() : O(1)
 * - pop() : O(1) amortized
 * - peek() : O(1) amortized
 * - empty() : O(1)
 *
 * Pourquoi amortized O(1) ?
 * - Chaque élément est transféré AU PLUS une fois
 * - Sur n opérations, au plus n transferts
 * - Donc O(n) / n = O(1) amortized
 */
class MyQueue {
	constructor() {
		this.stack1 = []; // Input stack
		this.stack2 = []; // Output stack
	}

	/**
	 * Push element x to the back of queue
	 * @param {number} x
	 * @return {void}
	 */
	push(x) {
		this.stack1.push(x);
	}

	/**
	 * Removes and returns the element from front of queue
	 * @return {number}
	 */
	pop() {
		this._transfer();
		return this.stack2.pop();
	}

	/**
	 * Get the front element
	 * @return {number}
	 */
	peek() {
		this._transfer();
		return this.stack2[this.stack2.length - 1];
	}

	/**
	 * Returns whether the queue is empty
	 * @return {boolean}
	 */
	empty() {
		return this.stack1.length === 0 && this.stack2.length === 0;
	}

	/**
	 * Helper: Transfer elements from stack1 to stack2 if stack2 is empty
	 * @private
	 */
	_transfer() {
		if (this.stack2.length === 0) {
			while (this.stack1.length > 0) {
				this.stack2.push(this.stack1.pop());
			}
		}
	}
}

/*
** POURQUOI LAZY TRANSFER EST OPTIMAL ?
**
** Analyse amortie :
**
** Opération      | Coût réel | Coût amorti
** ---------------|-----------|-------------
** push(1)        | 1         | 1
** push(2)        | 1         | 1
** push(3)        | 1         | 1
** pop()          | 3+1=4     | 1  (transfert de 3 éléments + pop)
** push(4)        | 1         | 1
** pop()          | 1         | 1  (pas de transfert, stack2 non vide)
** pop()          | 1         | 1
** pop()          | 1         | 1
**
** Total : 11 opérations pour 8 appels = 11/8 ≈ 1.375 ≈ O(1)
**
** Chaque élément :
** - Pushe dans stack1 une fois
** - Transféré vers stack2 au plus une fois
** - Popped de stack2 une fois
** → 3 opérations max par élément → O(1) amortized
*/

/*
** PATTERN : Amortized Analysis
**
** Techniques courantes :
**
** 1. Aggregate Method (utilisée ici)
**    → Calculer le coût total sur n opérations
**    → Diviser par n
**
** 2. Accounting Method
**    → "Payer d'avance" pour opérations futures
**    → push = 2 crédits (1 pour push, 1 pour transfert futur)
**
** 3. Potential Method
**    → Fonction de potentiel Φ(structure)
**    → Coût amorti = coût réel + ΔΦ
*/

/*
** VARIANTES EN INTERVIEW :
**
** 1. "Implement Stack using Queues" (LeetCode #225) - Easy
**    → Problème inverse (LIFO avec FIFO)
**
** 2. "Min Stack" (LeetCode #155) - Medium
**    → Stack avec getMin() en O(1)
**
** 3. "Max Stack" (LeetCode #716) - Medium
**    → Stack avec popMax()
**
** 4. "Design Circular Queue" (LeetCode #622) - Medium
**    → Queue avec taille fixe
**
** 5. Implémenter avec une seule stack
**    → Possible mais récursion (non optimal)
*/

/*
** PIÈGES À ÉVITER :
**
** ❌ Transférer à chaque pop même si stack2 non vide
**    → Perd l'optimisation O(1) amortized
**
** ❌ Oublier de vérifier si stack2 vide dans empty()
**    → Doit vérifier les DEUX stacks
**
** ❌ Ne pas comprendre amortized vs worst-case
**    → pop() peut être O(n) worst-case, mais O(1) amortized
**
** ❌ Retransférer de stack2 vers stack1 après pop
**    → Inutile et casse l'optimisation
*/

// ============================================================================
// TESTS
// ============================================================================

function runTests() {
	console.log('🧪 Implement Queue using Stacks - Tests\n');

	// Test 1: Exemple de base
	console.log('Test 1: Opérations de base');
	const q1 = new MyQueue();
	q1.push(1);
	q1.push(2);
	console.log(`  push(1), push(2)`);
	console.log(`  peek() = ${q1.peek()}, expected = 1: ${q1.peek() === 1 ? '✅' : '❌'}`);
	console.log(`  pop() = ${q1.pop()}, expected = 1: ${q1.pop() === 1 ? '✅' : '❌'}`);
	console.log(`  empty() = ${q1.empty()}, expected = false: ${q1.empty() === false ? '✅' : '❌'}`);
	console.log();

	// Test 2: Séquence complexe
	console.log('Test 2: Séquence push/pop alternée');
	const q2 = new MyQueue();
	q2.push(1);
	q2.push(2);
	q2.push(3);
	console.log(`  push(1), push(2), push(3)`);
	console.log(`  pop() = ${q2.pop()}, expected = 1: ${q2.pop() === 1 ? '✅' : '❌'}`);
	q2.push(4);
	console.log(`  push(4)`);
	console.log(`  pop() = ${q2.pop()}, expected = 2: ${q2.pop() === 2 ? '✅' : '❌'}`);
	console.log(`  peek() = ${q2.peek()}, expected = 3: ${q2.peek() === 3 ? '✅' : '❌'}`);
	console.log();

	// Test 3: Vider la queue
	console.log('Test 3: Vider complètement la queue');
	const q3 = new MyQueue();
	q3.push(1);
	q3.push(2);
	console.log(`  push(1), push(2)`);
	q3.pop();
	q3.pop();
	console.log(`  pop(), pop()`);
	console.log(`  empty() = ${q3.empty()}, expected = true: ${q3.empty() === true ? '✅' : '❌'}`);
	console.log();

	// Test 4: Test de performance
	console.log('Test 4: Performance (1000 opérations)');
	const q4 = new MyQueue();

	console.time('  1000 push + 1000 pop');
	for (let i = 0; i < 1000; i++) {
		q4.push(i);
	}
	for (let i = 0; i < 1000; i++) {
		q4.pop();
	}
	console.timeEnd('  1000 push + 1000 pop');
	console.log(`  empty() = ${q4.empty()}, expected = true: ${q4.empty() === true ? '✅' : '❌'}`);
	console.log();

	// Visualisation de l'état interne
	console.log('📊 Visualisation de l\'état interne:\n');
	const q5 = new MyQueue();

	function showState(queue, label) {
		console.log(`${label}:`);
		console.log(`  stack1 (input):  [${queue.stack1}]`);
		console.log(`  stack2 (output): [${queue.stack2}]`);
		console.log();
	}

	showState(q5, 'Initial');

	q5.push(1);
	q5.push(2);
	q5.push(3);
	showState(q5, 'After push(1), push(2), push(3)');

	q5.pop();
	showState(q5, 'After pop() → transfert + pop');

	q5.push(4);
	showState(q5, 'After push(4)');

	q5.pop();
	showState(q5, 'After pop() → direct pop from stack2');
}

runTests();

/*
** APPLICATIONS RÉELLES :
**
** 1. Task scheduling
**    → Files de tâches (thread pools)
**
** 2. Message queues
**    → RabbitMQ, Kafka, etc.
**
** 3. Breadth-First Search (BFS)
**    → Utilise une queue pour l'exploration
**
** 4. Buffering
**    → Print queues, I/O buffering
**
** 5. Undo/Redo avec contraintes
**    → Limiter l'historique (queue circulaire)
*/

/*
** CONCEPTS CLÉS POUR SENIOR :
**
** 1. FIFO vs LIFO
**    Queue (FIFO) : First In, First Out
**    Stack (LIFO) : Last In, First Out
**    → Inverser deux fois LIFO = FIFO
**
** 2. Amortized Complexity
**    Pire cas != Coût moyen sur long terme
**    → Dynamic array : push O(n) worst, O(1) amortized
**
** 3. Lazy Evaluation
**    Reporter le travail jusqu'à ce qu'il soit nécessaire
**    → Transfert uniquement si stack2 vide
**
** 4. Invariants
**    Maintenir des propriétés vraies tout le temps
**    → "stack2 contient les anciens éléments en ordre FIFO"
**
** 5. Space-Time Tradeoff
**    Utiliser O(n) espace (2 stacks) pour avoir O(1) temps
*/

