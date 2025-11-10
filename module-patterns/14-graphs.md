# Pattern : Graphs

## 🎯 Concept
Parcourir et manipuler des graphes avec DFS (Depth-First Search) et BFS (Breadth-First Search).

## 📋 Quand l'Utiliser
✅ Parcours de graphe (DFS/BFS)
✅ Détection de cycles
✅ Plus court chemin
✅ Composantes connexes
✅ Topological sort
✅ Problèmes de réseau/connectivité

## ⏱️ Complexité
- **Temps** : O(V + E) - V sommets, E arêtes
- **Espace** : O(V) - visited set

## 🔑 Templates

### DFS Récursif
```javascript
function dfs(graph, node, visited = new Set()) {
    if (visited.has(node)) return;

    visited.add(node);
    console.log(node); // Process

    for (const neighbor of graph[node]) {
        dfs(graph, neighbor, visited);
    }
}
```

### DFS Itératif
```javascript
function dfsIterative(graph, start) {
    const stack = [start];
    const visited = new Set([start]);

    while (stack.length > 0) {
        const node = stack.pop();
        console.log(node); // Process

        for (const neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                stack.push(neighbor);
            }
        }
    }
}
```

### BFS
```javascript
function bfs(graph, start) {
    const queue = [start];
    const visited = new Set([start]);

    while (queue.length > 0) {
        const node = queue.shift();
        console.log(node); // Process

        for (const neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
}
```

## 💻 Exemples

### Number of Islands (LeetCode 200)
```javascript
function numIslands(grid) {
    if (!grid || grid.length === 0) return 0;

    const m = grid.length;
    const n = grid[0].length;
    let count = 0;

    function dfs(i, j) {
        if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === '0') {
            return;
        }

        grid[i][j] = '0'; // Marquer comme visité

        dfs(i + 1, j);
        dfs(i - 1, j);
        dfs(i, j + 1);
        dfs(i, j - 1);
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1') {
                count++;
                dfs(i, j);
            }
        }
    }

    return count;
}
```

### Clone Graph (LeetCode 133)
```javascript
function cloneGraph(node) {
    if (!node) return null;

    const visited = new Map();

    function dfs(node) {
        if (visited.has(node)) {
            return visited.get(node);
        }

        const clone = new Node(node.val);
        visited.set(node, clone);

        for (const neighbor of node.neighbors) {
            clone.neighbors.push(dfs(neighbor));
        }

        return clone;
    }

    return dfs(node);
}
```

### Course Schedule (LeetCode 207)
```javascript
function canFinish(numCourses, prerequisites) {
    const graph = Array(numCourses).fill(0).map(() => []);
    const visited = new Array(numCourses).fill(0);

    // Construire le graphe
    for (const [course, prereq] of prerequisites) {
        graph[course].push(prereq);
    }

    function hasCycle(course) {
        if (visited[course] === 1) return true;  // Cycle détecté
        if (visited[course] === 2) return false; // Déjà vérifié

        visited[course] = 1; // En cours de visite

        for (const prereq of graph[course]) {
            if (hasCycle(prereq)) return true;
        }

        visited[course] = 2; // Complètement visité
        return false;
    }

    for (let i = 0; i < numCourses; i++) {
        if (hasCycle(i)) return false;
    }

    return true;
}
```

### Course Schedule II (LeetCode 210)
```javascript
function findOrder(numCourses, prerequisites) {
    const graph = Array(numCourses).fill(0).map(() => []);
    const indegree = new Array(numCourses).fill(0);

    // Construire le graphe et calculer les indegrees
    for (const [course, prereq] of prerequisites) {
        graph[prereq].push(course);
        indegree[course]++;
    }

    // BFS avec topological sort
    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (indegree[i] === 0) {
            queue.push(i);
        }
    }

    const result = [];

    while (queue.length > 0) {
        const course = queue.shift();
        result.push(course);

        for (const next of graph[course]) {
            indegree[next]--;
            if (indegree[next] === 0) {
                queue.push(next);
            }
        }
    }

    return result.length === numCourses ? result : [];
}
```

### Pacific Atlantic Water Flow (LeetCode 417)
```javascript
function pacificAtlantic(heights) {
    if (!heights || heights.length === 0) return [];

    const m = heights.length;
    const n = heights[0].length;
    const pacific = Array(m).fill(0).map(() => Array(n).fill(false));
    const atlantic = Array(m).fill(0).map(() => Array(n).fill(false));

    function dfs(i, j, ocean) {
        ocean[i][j] = true;

        const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

        for (const [di, dj] of directions) {
            const ni = i + di;
            const nj = j + dj;

            if (ni >= 0 && ni < m && nj >= 0 && nj < n &&
                !ocean[ni][nj] && heights[ni][nj] >= heights[i][j]) {
                dfs(ni, nj, ocean);
            }
        }
    }

    // DFS depuis les bords Pacific
    for (let i = 0; i < m; i++) dfs(i, 0, pacific);
    for (let j = 0; j < n; j++) dfs(0, j, pacific);

    // DFS depuis les bords Atlantic
    for (let i = 0; i < m; i++) dfs(i, n - 1, atlantic);
    for (let j = 0; j < n; j++) dfs(m - 1, j, atlantic);

    // Trouver les cellules accessibles aux deux océans
    const result = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (pacific[i][j] && atlantic[i][j]) {
                result.push([i, j]);
            }
        }
    }

    return result;
}
```

### Shortest Path in Binary Matrix (LeetCode 1091)
```javascript
function shortestPathBinaryMatrix(grid) {
    const n = grid.length;

    if (grid[0][0] === 1 || grid[n-1][n-1] === 1) return -1;

    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1],  [1, 0],  [1, 1]
    ];

    const queue = [[0, 0, 1]]; // [row, col, distance]
    grid[0][0] = 1; // Marquer comme visité

    while (queue.length > 0) {
        const [row, col, dist] = queue.shift();

        if (row === n - 1 && col === n - 1) return dist;

        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;

            if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < n &&
                grid[newRow][newCol] === 0) {
                queue.push([newRow, newCol, dist + 1]);
                grid[newRow][newCol] = 1;
            }
        }
    }

    return -1;
}
```

### Surrounded Regions (LeetCode 130)
```javascript
function solve(board) {
    if (!board || board.length === 0) return;

    const m = board.length;
    const n = board[0].length;

    function dfs(i, j) {
        if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] !== 'O') {
            return;
        }

        board[i][j] = 'T'; // Temporaire

        dfs(i + 1, j);
        dfs(i - 1, j);
        dfs(i, j + 1);
        dfs(i, j - 1);
    }

    // Marquer les 'O' connectés aux bords
    for (let i = 0; i < m; i++) {
        dfs(i, 0);
        dfs(i, n - 1);
    }
    for (let j = 0; j < n; j++) {
        dfs(0, j);
        dfs(m - 1, j);
    }

    // Convertir
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === 'O') {
                board[i][j] = 'X';
            } else if (board[i][j] === 'T') {
                board[i][j] = 'O';
            }
        }
    }
}
```

### Graph Valid Tree (LeetCode 261)
```javascript
function validTree(n, edges) {
    if (edges.length !== n - 1) return false;

    const graph = Array(n).fill(0).map(() => []);
    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }

    const visited = new Set();

    function dfs(node) {
        visited.add(node);

        for (const neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                dfs(neighbor);
            }
        }
    }

    dfs(0);

    return visited.size === n;
}
```

## 🧠 Représentation des Graphes

### Liste d'adjacence
```javascript
const graph = {
    0: [1, 2],
    1: [0, 3, 4],
    2: [0],
    3: [1],
    4: [1]
};
```

### Matrice d'adjacence
```javascript
const graph = [
    [0, 1, 1, 0, 0],
    [1, 0, 0, 1, 1],
    [1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0]
];
```

## 🎯 Problèmes LeetCode

### Medium
- 🟨 Number of Islands (200) ⭐⭐⭐⭐⭐
- 🟨 Clone Graph (133) ⭐⭐⭐⭐
- 🟨 Course Schedule (207) ⭐⭐⭐⭐⭐
- 🟨 Course Schedule II (210) ⭐⭐⭐⭐⭐
- 🟨 Pacific Atlantic Water Flow (417) ⭐⭐⭐⭐
- 🟨 Shortest Path in Binary Matrix (1091)
- 🟨 Surrounded Regions (130)
- 🟨 Graph Valid Tree (261)

### Hard
- 🟥 Word Ladder (127)
- 🟥 Alien Dictionary (269)

**Temps d'apprentissage** : 5-7 heures
