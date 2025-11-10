# Pattern : Cyclic Sort

## 🎯 Concept
Placer chaque nombre à son index correct quand les nombres sont dans un range [1..n].

## 📋 Quand l'Utiliser
✅ Nombres dans un range [1..n] ou [0..n-1]
✅ Trouver un nombre manquant/dupliqué
✅ Trouver tous les manquants/dupliqués

## ⏱️ Complexité
- **Temps** : O(n)
- **Espace** : O(1)

## 🔑 Template

```javascript
function cyclicSort(nums) {
    let i = 0;
    
    while (i < nums.length) {
        const correctIndex = nums[i] - 1; // Pour [1..n]
        // const correctIndex = nums[i]; // Pour [0..n-1]
        
        if (nums[i] !== nums[correctIndex]) {
            // Swap
            [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];
        } else {
            i++;
        }
    }
    
    return nums;
}
```

## 💻 Exemples

### Find Missing Number (LeetCode 268)
```javascript
function missingNumber(nums) {
    let i = 0;
    const n = nums.length;
    
    // Cyclic sort
    while (i < n) {
        const correctIdx = nums[i];
        if (nums[i] < n && nums[i] !== nums[correctIdx]) {
            [nums[i], nums[correctIdx]] = [nums[correctIdx], nums[i]];
        } else {
            i++;
        }
    }
    
    // Trouver le manquant
    for (let i = 0; i < n; i++) {
        if (nums[i] !== i) return i;
    }
    
    return n;
}
```

### Find All Duplicates (LeetCode 442)
```javascript
function findDuplicates(nums) {
    let i = 0;
    
    while (i < nums.length) {
        const correctIdx = nums[i] - 1;
        if (nums[i] !== nums[correctIdx]) {
            [nums[i], nums[correctIdx]] = [nums[correctIdx], nums[i]];
        } else {
            i++;
        }
    }
    
    const duplicates = [];
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== i + 1) {
            duplicates.push(nums[i]);
        }
    }
    
    return duplicates;
}
```

## 🎯 Problèmes LeetCode
- ✅ Missing Number (268)
- 🟨 Find All Duplicates in Array (442)
- 🟨 Find Duplicate Number (287)
- 🟨 Find All Missing Numbers (448)

**Temps d'apprentissage** : 1-2 heures
