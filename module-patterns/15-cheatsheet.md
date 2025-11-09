# Cheatsheet - Patterns Interview

## 🚀 Quick Recognition Guide

### Input Type → Pattern

| Si tu vois... | Pense à... |
|---------------|------------|
| **Tableau trié** | Binary Search, Two Pointers |
| **Tableau non trié, range [1..n]** | Cyclic Sort |
| **Linked List** | Fast/Slow Pointers, Reversal |
| **Arbre/Graph** | DFS, BFS |
| **String** | Two Pointers, Sliding Window |
| **Intervalles** | Merge Intervals |
| **Top/Kth/Smallest** | Heap |
| **Optimisation/Comptage** | Dynamic Programming |
| **Toutes combinaisons** | Backtracking |

### Objectif → Pattern

| Tu veux... | Utilise... |
|------------|------------|
| Trouver paire/triplet | Two Pointers |
| Sous-array max/min | Sliding Window |
| Détecter cycle | Fast/Slow Pointers |
| Merger listes triées | K-way Merge |
| Top K éléments | Heap |
| Trouver chemin | DFS/BFS |
| Optimiser choix | DP |
| Générer permutations | Backtracking |

### Contraintes → Pattern

| Contrainte | Pattern |
|------------|---------|
| **O(1) espace** | Two Pointers, Fast/Slow |
| **O(log n) temps** | Binary Search |
| **In-place** | Cyclic Sort, Two Pointers |
| **K sorted arrays** | K-way Merge avec Heap |

## 📝 Templates Essentiels

### 1. Two Pointers (Convergent)
```javascript
let left = 0, right = arr.length - 1;
while (left < right) {
    if (condition) return result;
    if (arr[left] + arr[right] < target) left++;
    else right--;
}
```

### 2. Sliding Window (Fixed Size)
```javascript
let windowSum = 0;
for (let i = 0; i < k; i++) windowSum += arr[i];
let maxSum = windowSum;

for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k];
    maxSum = Math.max(maxSum, windowSum);
}
```

### 3. Sliding Window (Variable Size)
```javascript
let left = 0, maxLen = 0;
const freq = new Map();

for (let right = 0; right < s.length; right++) {
    freq.set(s[right], (freq.get(s[right]) || 0) + 1);

    while (windowInvalid()) {
        freq.set(s[left], freq.get(s[left]) - 1);
        left++;
    }

    maxLen = Math.max(maxLen, right - left + 1);
}
```

### 4. Fast & Slow Pointers
```javascript
let slow = head, fast = head;
while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true; // Cycle
}
return false;
```

### 5. Binary Search (Exact Match)
```javascript
let left = 0, right = arr.length - 1;
while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
}
return -1;
```

### 6. Binary Search (Boundary)
```javascript
let left = 0, right = arr.length - 1;
while (left < right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (condition(mid)) right = mid;
    else left = mid + 1;
}
return left;
```

### 7. DFS Recursif (Tree)
```javascript
function dfs(node) {
    if (node === null) return baseCase;

    // Pre-order: traiter avant enfants
    const left = dfs(node.left);
    // In-order: traiter entre enfants
    const right = dfs(node.right);
    // Post-order: traiter après enfants

    return combineResults(left, right);
}
```

### 8. BFS (Tree Level-Order)
```javascript
const queue = [root];
while (queue.length > 0) {
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
        const node = queue.shift();
        // Traiter node

        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }
}
```

### 9. DFS (Graph)
```javascript
function dfs(node, visited = new Set()) {
    if (visited.has(node)) return;

    visited.add(node);
    // Traiter node

    for (const neighbor of graph[node]) {
        dfs(neighbor, visited);
    }
}
```

### 10. BFS (Graph)
```javascript
const queue = [start];
const visited = new Set([start]);

while (queue.length > 0) {
    const node = queue.shift();
    // Traiter node

    for (const neighbor of graph[node]) {
        if (!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push(neighbor);
        }
    }
}
```

### 11. Backtracking
```javascript
function backtrack(path, choices) {
    if (isComplete(path)) {
        result.push([...path]);
        return;
    }

    for (const choice of choices) {
        if (isValid(choice)) {
            path.push(choice);
            backtrack(path, nextChoices);
            path.pop(); // BACKTRACK
        }
    }
}
```

### 12. Dynamic Programming (Bottom-Up)
```javascript
const dp = new Array(n + 1).fill(0);
dp[0] = baseCase;

for (let i = 1; i <= n; i++) {
    for (const choice of choices) {
        dp[i] = Math.min(dp[i], dp[i - choice] + 1);
    }
}

return dp[n];
```

### 13. Heap (Min Heap avec Array)
```javascript
// Push
heap.push(val);
let i = heap.length - 1;
while (i > 0) {
    const parent = Math.floor((i - 1) / 2);
    if (heap[parent] <= heap[i]) break;
    [heap[parent], heap[i]] = [heap[i], heap[parent]];
    i = parent;
}

// Pop
const min = heap[0];
heap[0] = heap.pop();
let i = 0;
while (true) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let smallest = i;

    if (left < heap.length && heap[left] < heap[smallest]) smallest = left;
    if (right < heap.length && heap[right] < heap[smallest]) smallest = right;
    if (smallest === i) break;

    [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
    i = smallest;
}
```

### 14. Union Find
```javascript
class UnionFind {
    constructor(n) {
        this.parent = Array.from({length: n}, (_, i) => i);
        this.rank = new Array(n).fill(0);
    }

    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]); // Path compression
        }
        return this.parent[x];
    }

    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX === rootY) return false;

        // Union by rank
        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        } else {
            this.parent[rootY] = rootX;
            this.rank[rootX]++;
        }

        return true;
    }
}
```

### 15. Trie (Prefix Tree)
```javascript
class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    search(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children[char]) return false;
            node = node.children[char];
        }
        return node.isEndOfWord;
    }
}
```

## ⚡ Complexités à Connaître

| Opération | Complexité |
|-----------|------------|
| Array access | O(1) |
| Array push/pop | O(1) amortized |
| Array shift/unshift | O(n) |
| Array slice/splice | O(n) |
| Binary Search | O(log n) |
| Hash Map get/set | O(1) amortized |
| Heap push/pop | O(log n) |
| Sort (comparison) | O(n log n) |
| DFS/BFS | O(V + E) |
| Union Find (optimized) | O(α(n)) ≈ O(1) |

## 🎯 Problèmes par Pattern

### Two Pointers (10)
- Two Sum II, 3Sum, 4Sum
- Container With Most Water
- Trapping Rain Water
- Valid Palindrome
- Remove Duplicates

### Sliding Window (8)
- Max Sum Subarray of Size K
- Longest Substring Without Repeating
- Minimum Window Substring
- Fruits Into Baskets

### Fast/Slow Pointers (5)
- Linked List Cycle
- Happy Number
- Middle of Linked List
- Palindrome Linked List

### Binary Search (12)
- Binary Search
- First/Last Position
- Search in Rotated Array
- Find Minimum in Rotated
- Koko Eating Bananas

### Tree DFS (15)
- Max Depth, Diameter
- Path Sum, Path Sum II
- Serialize/Deserialize
- Lowest Common Ancestor

### Tree BFS (6)
- Level Order Traversal
- Zigzag Traversal
- Right Side View
- Average of Levels

### Backtracking (10)
- Subsets, Subsets II
- Permutations
- Combination Sum
- N-Queens

### DP (20)
- Fibonacci, Climbing Stairs
- Coin Change
- Longest Common Subsequence
- 0/1 Knapsack
- House Robber

## 🧠 Mémorisation Mnémotechnique

**TWOFASTSLIDHEAP** :
- **TWO** Pointers
- **FAST** & Slow
- **SLID** ing Window
- **HEAP** (Top K)

**DBBUGRAPH** :
- **D**FS
- **B**FS
- **B**acktracking
- **U**nion Find
- **GRAPH** problems

**DyMerCyc** :
- **Dy**namic Programming
- **Mer**ge Intervals
- **Cyc**lic Sort

## 📊 Decision Tree

```
1. Array/String problem?
   ├─ Sorted? → Binary Search ou Two Pointers
   ├─ Subarray? → Sliding Window
   ├─ Range [1..n]? → Cyclic Sort
   └─ Unsorted? → Hash Map ou Sort first

2. Linked List?
   ├─ Cycle? → Fast/Slow
   ├─ Reverse? → In-place Reversal
   └─ Merge? → Two Pointers

3. Tree/Graph?
   ├─ Path/Traversal? → DFS
   ├─ Shortest path/Level? → BFS
   └─ Connectivity? → Union Find

4. Optimization?
   ├─ Overlapping subproblems? → DP
   └─ Greedy choice? → Greedy

5. Generate all?
   └─ Backtracking

6. Top K?
   └─ Heap
```

## 💡 Tips Interview

### Avant de coder :
1. **Clarifier** (2 min) : constraints, edge cases
2. **Identifier pattern** (1 min) : quel template ?
3. **Expliquer approche** (2 min) : parler avant coder
4. **Coder** (10-15 min) : template + adaptation
5. **Tester** (3 min) : edge cases

### Pendant le code :
- Annoncer le pattern : "Je vais utiliser Two Pointers..."
- Expliquer la complexité : "Ceci sera O(n) car..."
- Penser à haute voix : "Je vérifie d'abord si..."

### Phrases clés :
- "Ce pattern est approprié car..."
- "La complexité optimale pour ce cas est..."
- "Un edge case important serait..."
- "On pourrait optimiser avec..."

---

**Imprimer cette cheatsheet et l'avoir à côté pendant la pratique!**
