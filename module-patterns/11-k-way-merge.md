# Pattern : K-Way Merge

## 🎯 Concept
Fusionner K listes triées en utilisant une min heap pour trouver le prochain plus petit élément.

## 📋 Quand l'Utiliser
✅ Fusionner K listes triées
✅ Kième plus petit élément dans K listes triées
✅ Smallest range couvrant K listes
✅ Merge K sorted arrays

## ⏱️ Complexité
- **Temps** : O(n log k) - n éléments totaux, k listes
- **Espace** : O(k) - heap de taille k

## 🔑 Template

```javascript
// Min Heap pour K-Way Merge
function kWayMerge(lists) {
    const minHeap = [];
    const result = [];

    // Initialiser le heap avec le premier élément de chaque liste
    for (let i = 0; i < lists.length; i++) {
        if (lists[i].length > 0) {
            minHeap.push({ val: lists[i][0], listIdx: i, elemIdx: 0 });
        }
    }

    // Trier le heap
    minHeap.sort((a, b) => a.val - b.val);

    while (minHeap.length > 0) {
        // Extraire le minimum
        const { val, listIdx, elemIdx } = minHeap.shift();
        result.push(val);

        // Ajouter le prochain élément de cette liste
        if (elemIdx + 1 < lists[listIdx].length) {
            minHeap.push({
                val: lists[listIdx][elemIdx + 1],
                listIdx,
                elemIdx: elemIdx + 1
            });
            minHeap.sort((a, b) => a.val - b.val);
        }
    }

    return result;
}
```

## 💻 Exemples

### Merge K Sorted Lists (LeetCode 23)
```javascript
function mergeKLists(lists) {
    if (!lists || lists.length === 0) return null;

    const minHeap = [];
    const dummy = new ListNode(0);
    let current = dummy;

    // Initialiser le heap
    for (let i = 0; i < lists.length; i++) {
        if (lists[i]) {
            minHeap.push(lists[i]);
        }
    }

    while (minHeap.length > 0) {
        // Trier et extraire le minimum
        minHeap.sort((a, b) => a.val - b.val);
        const minNode = minHeap.shift();

        current.next = minNode;
        current = current.next;

        // Ajouter le prochain nœud de cette liste
        if (minNode.next) {
            minHeap.push(minNode.next);
        }
    }

    return dummy.next;
}
```

### Kth Smallest in M Sorted Arrays
```javascript
function kthSmallest(arrays, k) {
    const minHeap = [];

    // Initialiser avec le premier élément de chaque array
    for (let i = 0; i < arrays.length; i++) {
        if (arrays[i].length > 0) {
            minHeap.push({
                val: arrays[i][0],
                arrayIdx: i,
                elemIdx: 0
            });
        }
    }

    minHeap.sort((a, b) => a.val - b.val);

    let count = 0;
    let result = 0;

    while (minHeap.length > 0 && count < k) {
        const { val, arrayIdx, elemIdx } = minHeap.shift();
        result = val;
        count++;

        if (elemIdx + 1 < arrays[arrayIdx].length) {
            minHeap.push({
                val: arrays[arrayIdx][elemIdx + 1],
                arrayIdx,
                elemIdx: elemIdx + 1
            });
            minHeap.sort((a, b) => a.val - b.val);
        }
    }

    return result;
}
```

### Smallest Range Covering Elements (LeetCode 632)
```javascript
function smallestRange(nums) {
    const minHeap = [];
    let maxVal = -Infinity;

    // Initialiser avec le premier élément de chaque liste
    for (let i = 0; i < nums.length; i++) {
        minHeap.push({
            val: nums[i][0],
            listIdx: i,
            elemIdx: 0
        });
        maxVal = Math.max(maxVal, nums[i][0]);
    }

    minHeap.sort((a, b) => a.val - b.val);

    let rangeStart = 0;
    let rangeEnd = Infinity;

    while (minHeap.length === nums.length) {
        const { val: minVal, listIdx, elemIdx } = minHeap.shift();

        // Mettre à jour le range si plus petit
        if (maxVal - minVal < rangeEnd - rangeStart) {
            rangeStart = minVal;
            rangeEnd = maxVal;
        }

        // Ajouter le prochain élément de cette liste
        if (elemIdx + 1 < nums[listIdx].length) {
            const nextVal = nums[listIdx][elemIdx + 1];
            minHeap.push({
                val: nextVal,
                listIdx,
                elemIdx: elemIdx + 1
            });
            maxVal = Math.max(maxVal, nextVal);
            minHeap.sort((a, b) => a.val - b.val);
        }
    }

    return [rangeStart, rangeEnd];
}
```

### Merge Sorted Array (LeetCode 88)
```javascript
function merge(nums1, m, nums2, n) {
    let i = m - 1;
    let j = n - 1;
    let k = m + n - 1;

    while (i >= 0 && j >= 0) {
        if (nums1[i] > nums2[j]) {
            nums1[k--] = nums1[i--];
        } else {
            nums1[k--] = nums2[j--];
        }
    }

    while (j >= 0) {
        nums1[k--] = nums2[j--];
    }
}
```

### Find K Pairs with Smallest Sums (LeetCode 373)
```javascript
function kSmallestPairs(nums1, nums2, k) {
    if (nums1.length === 0 || nums2.length === 0 || k === 0) {
        return [];
    }

    const minHeap = [];
    const result = [];

    // Initialiser avec toutes les paires [nums1[i], nums2[0]]
    for (let i = 0; i < Math.min(k, nums1.length); i++) {
        minHeap.push({
            sum: nums1[i] + nums2[0],
            i: i,
            j: 0
        });
    }

    while (k > 0 && minHeap.length > 0) {
        minHeap.sort((a, b) => a.sum - b.sum);
        const { i, j } = minHeap.shift();

        result.push([nums1[i], nums2[j]]);
        k--;

        if (j + 1 < nums2.length) {
            minHeap.push({
                sum: nums1[i] + nums2[j + 1],
                i: i,
                j: j + 1
            });
        }
    }

    return result;
}
```

## 🎯 Problèmes LeetCode
- 🟥 Merge K Sorted Lists (23) ⭐⭐⭐⭐⭐
- 🟥 Smallest Range Covering Elements (632) ⭐⭐⭐⭐
- 🟨 Find K Pairs with Smallest Sums (373)
- ✅ Merge Sorted Array (88) ⭐⭐⭐⭐

**Temps d'apprentissage** : 2-3 heures
