# Pattern : Binary Search

## 🎯 Concept
Recherche dichotomique dans un espace trié pour trouver un élément ou une condition en O(log n).

## 📋 Quand l'Utiliser
✅ Array/Liste triée
✅ Trouver un élément dans un range
✅ Trouver le premier/dernier élément satisfaisant une condition
✅ Recherche dans un espace de solutions (binary search on answer)

## ⏱️ Complexité
- **Temps** : O(log n)
- **Espace** : O(1)

## 🔑 Template

```javascript
// Template classique
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);

        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;
}
```

## 💻 Exemples

### Binary Search (LeetCode 704)
```javascript
function search(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);

        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;
}
```

### First Bad Version (LeetCode 278)
```javascript
function firstBadVersion(n) {
    let left = 1;
    let right = n;

    while (left < right) {
        const mid = Math.floor(left + (right - left) / 2);

        if (isBadVersion(mid)) {
            right = mid; // Chercher à gauche
        } else {
            left = mid + 1; // Chercher à droite
        }
    }

    return left;
}
```

### Search Insert Position (LeetCode 35)
```javascript
function searchInsert(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);

        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return left;
}
```

### Find Peak Element (LeetCode 162)
```javascript
function findPeakElement(nums) {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        const mid = Math.floor(left + (right - left) / 2);

        if (nums[mid] > nums[mid + 1]) {
            right = mid; // Peak à gauche
        } else {
            left = mid + 1; // Peak à droite
        }
    }

    return left;
}
```

### Search in Rotated Sorted Array (LeetCode 33)
```javascript
function search(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);

        if (nums[mid] === target) return mid;

        // Partie gauche triée
        if (nums[left] <= nums[mid]) {
            if (target >= nums[left] && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        // Partie droite triée
        else {
            if (target > nums[mid] && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }

    return -1;
}
```

### Find First and Last Position (LeetCode 34)
```javascript
function searchRange(nums, target) {
    const findFirst = () => {
        let left = 0, right = nums.length - 1;
        let result = -1;

        while (left <= right) {
            const mid = Math.floor(left + (right - left) / 2);

            if (nums[mid] === target) {
                result = mid;
                right = mid - 1; // Continuer à gauche
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return result;
    };

    const findLast = () => {
        let left = 0, right = nums.length - 1;
        let result = -1;

        while (left <= right) {
            const mid = Math.floor(left + (right - left) / 2);

            if (nums[mid] === target) {
                result = mid;
                left = mid + 1; // Continuer à droite
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return result;
    };

    return [findFirst(), findLast()];
}
```

### Sqrt(x) (LeetCode 69)
```javascript
function mySqrt(x) {
    if (x < 2) return x;

    let left = 1;
    let right = Math.floor(x / 2);

    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        const square = mid * mid;

        if (square === x) {
            return mid;
        } else if (square < x) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return right;
}
```

## 🎯 Problèmes LeetCode
- ✅ Binary Search (704) ⭐⭐⭐⭐⭐
- ✅ First Bad Version (278)
- ✅ Search Insert Position (35)
- 🟨 Search in Rotated Sorted Array (33) ⭐⭐⭐⭐⭐
- 🟨 Find First and Last Position (34) ⭐⭐⭐⭐
- 🟨 Find Peak Element (162)
- ✅ Sqrt(x) (69)

**Temps d'apprentissage** : 2-3 heures
