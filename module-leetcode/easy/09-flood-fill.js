/* ************************************************************************** */
/*                                                                            */
/*   09-flood-fill.js                                                         */
/*                                                                            */
/*   LeetCode #733 - Flood Fill                                               */
/*   https://leetcode.com/problems/flood-fill/                                */
/*                                                                            */
/* ************************************************************************** */

/**
 * DIFFICULTÉ: Easy ⭐
 * TEMPS ATTENDU: 15 minutes
 * FRÉQUENCE: ⭐⭐⭐⭐ (posé chez Amazon, Meta, Google)
 *
 * PATTERNS: DFS, BFS, Matrix, Graph
 * COMPLEXITÉ CIBLE: O(n*m) temps, O(n*m) espace (pire cas)
 */

/*
** ÉNONCÉ :
**
** Une image est représentée par une grille m x n d'entiers `image`,
** où image[i][j] représente la couleur du pixel.
**
** Vous recevez également trois entiers sr, sc, et color.
** Vous devez effectuer un flood fill à partir du pixel image[sr][sc].
**
** Pour effectuer un flood fill :
** 1. Commencer par le pixel de départ
** 2. Changer sa couleur en `color`
** 3. Faire de même pour tous les pixels adjacents (4-directions) de la même
**    couleur que le pixel de départ
** 4. Répéter récursivement
**
** Retourner l'image modifiée.
**
** EXEMPLES :
**
** Input: image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2
** Output: [[2,2,2],[2,2,0],[2,0,1]]
**
** Explication :
** Avant:        Après:
** 1 1 1         2 2 2
** 1 1 0   →     2 2 0
** 1 0 1         2 0 1
**
** Départ à (1,1) avec couleur 1 → tous les 1 connectés deviennent 2
**
** Input: image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, color = 0
** Output: [[0,0,0],[0,0,0]]
** Explication: La couleur de départ est déjà 0, rien ne change
**
** CONTRAINTES :
** - m == image.length
** - n == image[i].length
** - 1 <= m, n <= 50
** - 0 <= image[i][j], color < 2^16
** - 0 <= sr < m
** - 0 <= sc < n
*/

/**
 * APPROCHE 1 : DFS Recursive (CLASSIQUE ✅)
 *
 * Idée : Parcourir récursivement tous les pixels connectés de même couleur
 *
 * Algorithme :
 * 1. Sauvegarder la couleur originale du pixel de départ
 * 2. Si couleur originale == nouvelle couleur → retourner (optimisation)
 * 3. Appeler DFS récursif :
 *    - Si hors limites ou couleur différente → retour
 *    - Changer la couleur du pixel actuel
 *    - DFS sur les 4 voisins (haut, bas, gauche, droite)
 * 4. Retourner l'image modifiée
 *
 * Exemple visuel :
 * Starting at (1,1) with original color 1, new color 2
 *
 * Step 1: (1,1) → 2       Step 2: explore voisins
 * Step 3: (0,0) → 2       Step 4: (0,1) → 2
 * ... continue pour tous les 1 connectés
 *
 * Complexité :
 * - Temps : O(n*m) → Visite chaque pixel au plus une fois
 * - Espace : O(n*m) → Call stack dans le pire cas (toute la grille)
 */
function floodFill(image, sr, sc, color) {
	const originalColor = image[sr][sc];

	// Optimisation : si couleur déjà correcte, ne rien faire
	if (originalColor === color) {
		return image;
	}

	const rows = image.length;
	const cols = image[0].length;

	function dfs(row, col) {
		// Hors limites ou couleur différente
		if (
			row < 0 ||
			row >= rows ||
			col < 0 ||
			col >= cols ||
			image[row][col] !== originalColor
		) {
			return;
		}

		// Changer la couleur
		image[row][col] = color;

		// Explorer les 4 directions
		dfs(row - 1, col); // Haut
		dfs(row + 1, col); // Bas
		dfs(row, col - 1); // Gauche
		dfs(row, col + 1); // Droite
	}

	dfs(sr, sc);
	return image;
}

/**
 * APPROCHE 2 : BFS Iterative avec Queue
 *
 * Idée : Utiliser une file pour explorer level-by-level
 *
 * Algorithme :
 * 1. Créer une queue avec le pixel de départ
 * 2. Tant que queue non vide :
 *    - Dequeue un pixel
 *    - Si déjà visité ou couleur différente → skip
 *    - Changer la couleur
 *    - Enqueue les 4 voisins valides
 *
 * Complexité : Identique à DFS
 */
function floodFillBFS(image, sr, sc, color) {
	const originalColor = image[sr][sc];

	if (originalColor === color) {
		return image;
	}

	const rows = image.length;
	const cols = image[0].length;
	const queue = [[sr, sc]];

	// Directions : haut, bas, gauche, droite
	const directions = [
		[-1, 0],
		[1, 0],
		[0, -1],
		[0, 1]
	];

	while (queue.length > 0) {
		const [row, col] = queue.shift();

		// Skip si hors limites ou couleur différente
		if (
			row < 0 ||
			row >= rows ||
			col < 0 ||
			col >= cols ||
			image[row][col] !== originalColor
		) {
			continue;
		}

		// Changer la couleur
		image[row][col] = color;

		// Ajouter les voisins
		for (const [dr, dc] of directions) {
			queue.push([row + dr, col + dc]);
		}
	}

	return image;
}

/**
 * APPROCHE 3 : DFS Iterative avec Stack
 *
 * Même logique que BFS mais avec stack (LIFO au lieu de FIFO)
 */
function floodFillStack(image, sr, sc, color) {
	const originalColor = image[sr][sc];

	if (originalColor === color) {
		return image;
	}

	const rows = image.length;
	const cols = image[0].length;
	const stack = [[sr, sc]];

	const directions = [
		[-1, 0],
		[1, 0],
		[0, -1],
		[0, 1]
	];

	while (stack.length > 0) {
		const [row, col] = stack.pop();

		if (
			row < 0 ||
			row >= rows ||
			col < 0 ||
			col >= cols ||
			image[row][col] !== originalColor
		) {
			continue;
		}

		image[row][col] = color;

		for (const [dr, dc] of directions) {
			stack.push([row + dr, col + dc]);
		}
	}

	return image;
}

/*
** POURQUOI CE PROBLÈME EST IMPORTANT ?
**
** 1. Introduction aux graphes
**    → Une grille 2D est un graphe implicite
**    → Chaque cellule = nœud, adjacences = arêtes
**
** 2. Pattern DFS/BFS sur grille
**    → Utilisé dans 20+ problèmes LeetCode
**    → Number of Islands, Surrounded Regions, etc.
**
** 3. Base pour algorithmes plus complexes
**    → Pathfinding (A*, Dijkstra)
**    → Image processing
*/

/*
** PATTERN : DFS/BFS sur Grille 2D
**
** Template DFS récursif :
** function dfs(row, col) {
**     if (hors_limites || déjà_visité || condition_stop) return;
**
**     marquer_visité(row, col);
**
**     // Explorer 4 directions
**     dfs(row-1, col); dfs(row+1, col);
**     dfs(row, col-1); dfs(row, col+1);
** }
**
** Template BFS :
** queue = [[start_row, start_col]];
** while (queue.length > 0) {
**     [row, col] = queue.shift();
**     if (conditions) continue;
**     marquer_visité(row, col);
**     ajouter_voisins_à_queue();
** }
*/

/*
** VARIANTES EN INTERVIEW :
**
** 1. "Number of Islands" (LeetCode #200) - Medium
**    → Compter le nombre de composantes connexes de 1
**    → Même DFS/BFS mais appliqué à toute la grille
**
** 2. "Surrounded Regions" (LeetCode #130) - Medium
**    → Flood fill à partir des bords pour identifier les régions
**
** 3. "Pacific Atlantic Water Flow" (LeetCode #417) - Medium
**    → DFS depuis deux bords différents
**
** 4. "Max Area of Island" (LeetCode #695) - Medium
**    → Flood fill + compter la taille
**
** 5. Flood fill avec 8 directions (diagonales incluses)
**    → Ajouter 4 directions diagonales
*/

/*
** PIÈGES À ÉVITER :
**
** ❌ Oublier de vérifier si originalColor == color
**    → Boucle infinie ! On recolorie en même couleur indéfiniment
**
** ❌ Modifier image[sr][sc] avant de sauvegarder originalColor
**    → Perd la référence de la couleur à changer
**
** ❌ Ne pas vérifier les limites en premier
**    → Index out of bounds error
**
** ❌ Utiliser image[row][col] == color pour arrêter
**    → Problème si on recolorie en même couleur
*/

// ============================================================================
// TESTS
// ============================================================================

function runTests() {
	const tests = [
		{
			image: [
				[1, 1, 1],
				[1, 1, 0],
				[1, 0, 1]
			],
			sr: 1,
			sc: 1,
			color: 2,
			expected: [
				[2, 2, 2],
				[2, 2, 0],
				[2, 0, 1]
			],
			description: 'Cas classique - flood fill complet'
		},
		{
			image: [
				[0, 0, 0],
				[0, 0, 0]
			],
			sr: 0,
			sc: 0,
			color: 0,
			expected: [
				[0, 0, 0],
				[0, 0, 0]
			],
			description: 'Couleur déjà correcte (optimisation)'
		},
		{
			image: [[0]],
			sr: 0,
			sc: 0,
			color: 2,
			expected: [[2]],
			description: 'Grille 1x1'
		},
		{
			image: [
				[1, 1, 1],
				[1, 1, 1],
				[1, 1, 1]
			],
			sr: 1,
			sc: 1,
			color: 2,
			expected: [
				[2, 2, 2],
				[2, 2, 2],
				[2, 2, 2]
			],
			description: 'Toute la grille même couleur'
		},
		{
			image: [
				[0, 0, 0],
				[0, 1, 0],
				[0, 0, 0]
			],
			sr: 1,
			sc: 1,
			color: 2,
			expected: [
				[0, 0, 0],
				[0, 2, 0],
				[0, 0, 0]
			],
			description: 'Pixel isolé'
		}
	];

	console.log('🧪 Flood Fill - Tests\n');

	tests.forEach((test, index) => {
		// Deep copy pour ne pas modifier l'original
		const imageCopy = test.image.map((row) => [...row]);
		const result = floodFill(imageCopy, test.sr, test.sc, test.color);

		const passed = JSON.stringify(result) === JSON.stringify(test.expected);

		console.log(
			`Test ${index + 1}: ${passed ? '✅' : '❌'} ${test.description}`
		);
		console.log(`  Start: (${test.sr}, ${test.sc}), Color: ${test.color}`);
		console.log(`  Input:`);
		test.image.forEach((row) => console.log(`    [${row}]`));
		console.log(`  Output:`);
		result.forEach((row) => console.log(`    [${row}]`));
		console.log();
	});
}

runTests();

/*
** APPLICATIONS RÉELLES :
**
** 1. Éditeurs d'images (Photoshop, GIMP)
**    → Outil "pot de peinture" / "fill bucket"
**
** 2. Jeux vidéo
**    → Révéler des zones (Minesweeper)
**    → Pathfinding, line of sight
**
** 3. Cartographie
**    → Identifier des régions contiguës
**
** 4. Image processing
**    → Segmentation d'image
**    → Détection de contours
**
** 5. Analyse de réseaux
**    → Identifier des clusters dans un graphe
*/

/*
** CONCEPTS CLÉS POUR SENIOR :
**
** 1. Graphe implicite
**    Grille 2D = graphe où :
**    - Nœuds = cellules
**    - Arêtes = adjacences (4 ou 8 directions)
**
** 2. DFS vs BFS sur grille
**    DFS : Call stack → peut causer stack overflow si grille énorme
**    BFS : Queue → pas de stack overflow, meilleur pour shortest path
**
** 3. In-place modification
**    On modifie directement l'image (pas de copie)
**    → O(1) espace supplémentaire (hors récursion)
**
** 4. Optimisation early return
**    if (originalColor === color) return image;
**    → Évite travail inutile + boucle infinie
*/

