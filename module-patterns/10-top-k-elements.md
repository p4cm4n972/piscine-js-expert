# Pattern : Top K Elements

## 🎯 Concept
Trouver les K plus grands/petits éléments en utilisant une heap (tas) pour optimiser la complexité.

## 📋 Quand l'Utiliser
✅ Trouver les K plus grands/petits éléments
✅ K éléments les plus fréquents
✅ Kième élément le plus grand
✅ Médiane d'un stream

## ⏱️ Complexité
- **Temps** : O(n log k)
- **Espace** : O(k)

## 🔑 Template

```javascript
// Min Heap avec array
class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(val) {
        this.heap.push(val);
        this.bubbleUp(this.heap.length - 1);
    }

    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);
        return min;
    }

    peek() {
        return this.heap[0];
    }

    size() {
        return this.heap.length;
    }

    bubbleUp(index) {
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (this.heap[parent] <= this.heap[index]) break;

            [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
            index = parent;
        }
    }

    bubbleDown(index) {
        while (true) {
            let smallest = index;
            const left = 2 * index + 1;
            const right = 2 * index + 2;

            if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
                smallest = left;
            }
            if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
                smallest = right;
            }

            if (smallest === index) break;

            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
}
```

## 💻 Exemples

### Kth Largest Element (LeetCode 215)
```javascript
function findKthLargest(nums, k) {
    const minHeap = new MinHeap();

    for (const num of nums) {
        minHeap.push(num);

        if (minHeap.size() > k) {
            minHeap.pop();
        }
    }

    return minHeap.peek();
}
```

### Top K Frequent Elements (LeetCode 347)
```javascript
function topKFrequent(nums, k) {
    // Compter les fréquences
    const freq = new Map();
    for (const num of nums) {
        freq.set(num, (freq.get(num) || 0) + 1);
    }

    // Min heap basée sur la fréquence
    const heap = [];

    for (const [num, count] of freq) {
        heap.push([count, num]);

        if (heap.length > k) {
            heap.sort((a, b) => a[0] - b[0]);
            heap.shift();
        }
    }

    return heap.map(([_, num]) => num);
}
```

### Kth Smallest Element in Sorted Matrix (LeetCode 378)
```javascript
function kthSmallest(matrix, k) {
    const n = matrix.length;
    const minHeap = [];

    // Ajouter la première colonne
    for (let i = 0; i < Math.min(n, k); i++) {
        minHeap.push([matrix[i][0], i, 0]);
    }

    let result = 0;
    minHeap.sort((a, b) => a[0] - b[0]);

    for (let i = 0; i < k; i++) {
        const [val, row, col] = minHeap.shift();
        result = val;

        if (col + 1 < n) {
            minHeap.push([matrix[row][col + 1], row, col + 1]);
            minHeap.sort((a, b) => a[0] - b[0]);
        }
    }

    return result;
}
```

### Find K Closest Elements (LeetCode 658)
```javascript
function findClosestElements(arr, k, x) {
    let left = 0;
    let right = arr.length - k;

    while (left < right) {
        const mid = Math.floor(left + (right - left) / 2);

        if (x - arr[mid] > arr[mid + k] - x) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    return arr.slice(left, left + k);
}
```

### K Closest Points to Origin (LeetCode 973)
```javascript
function kClosest(points, k) {
    // Max heap avec distances
    const maxHeap = [];

    for (const [x, y] of points) {
        const dist = x * x + y * y;
        maxHeap.push([dist, [x, y]]);

        if (maxHeap.length > k) {
            maxHeap.sort((a, b) => b[0] - a[0]);
            maxHeap.shift();
        }
    }

    return maxHeap.map(([_, point]) => point);
}
```

### Last Stone Weight (LeetCode 1046)
```javascript
function lastStoneWeight(stones) {
    // Max heap
    const maxHeap = [...stones];
    maxHeap.sort((a, b) => b - a);

    while (maxHeap.length > 1) {
        const first = maxHeap.shift();
        const second = maxHeap.shift();

        if (first !== second) {
            maxHeap.push(first - second);
            maxHeap.sort((a, b) => b - a);
        }
    }

    return maxHeap.length === 0 ? 0 : maxHeap[0];
}
```

## 🎯 Problèmes LeetCode
- 🟨 Kth Largest Element in Array (215) ⭐⭐⭐⭐⭐
- 🟨 Top K Frequent Elements (347) ⭐⭐⭐⭐⭐
- 🟨 K Closest Points to Origin (973) ⭐⭐⭐⭐
- 🟨 Kth Smallest in Sorted Matrix (378)
- 🟨 Find K Closest Elements (658)
- ✅ Last Stone Weight (1046)

**Temps d'apprentissage** : 3-4 heures
