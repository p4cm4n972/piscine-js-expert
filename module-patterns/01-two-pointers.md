# Pattern : Two Pointers

## 🎯 Concept

Utiliser **deux pointeurs** qui se déplacent dans un tableau/liste selon une stratégie définie.

## 📋 Quand l'Utiliser

✅ Tableau **trié** (ou peut être trié)
✅ Chercher une **paire** d'éléments
✅ Vérifier un **palindrome**
✅ Comparer deux tableaux/strings
✅ **Partition** de tableau

❌ Tableau non trié (sauf cas spéciaux)
❌ Besoin de garder l'ordre original

## ⏱️ Complexité

- **Temps** : O(n) - un seul parcours
- **Espace** : O(1) - deux variables seulement

## 🔑 Variantes du Pattern

### 1. Opposite Directional (convergence)

Deux pointeurs aux extrémités qui se rapprochent.

```javascript
/**
 * TEMPLATE : Two Pointers Convergents
 *
 * Utilisation : Paires, palindromes, conteneurs
 */
function twoPointersConvergent(arr) {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        // Logique selon le problème
        if (condition) {
            // Traiter ou retourner
            return [left, right];
        }

        // Déplacer les pointeurs
        if (needMoveLeft) {
            left++;
        } else if (needMoveRight) {
            right--;
        } else {
            left++;
            right--;
        }
    }

    return result;
}
```

**Exemples** :
- Two Sum (tableau trié)
- Valid Palindrome
- Container With Most Water

### 2. Same Direction (fast/slow)

Deux pointeurs qui avancent dans la même direction à vitesses différentes.

```javascript
/**
 * TEMPLATE : Two Pointers Same Direction
 *
 * Utilisation : Remove duplicates, partition
 */
function twoPointersSameDirection(arr) {
    let slow = 0;

    for (let fast = 0; fast < arr.length; fast++) {
        if (condition(arr[fast])) {
            // Traiter
            arr[slow] = arr[fast];
            slow++;
        }
    }

    return slow; // ou arr.slice(0, slow)
}
```

**Exemples** :
- Remove Duplicates from Sorted Array
- Move Zeroes
- Remove Element

### 3. Multiple Arrays

Pointeurs dans différents tableaux.

```javascript
/**
 * TEMPLATE : Two Pointers Multi-Arrays
 *
 * Utilisation : Merger, intersection
 */
function twoPointersMultiArrays(arr1, arr2) {
    let i = 0;
    let j = 0;
    const result = [];

    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            result.push(arr1[i]);
            i++;
        } else if (arr1[i] > arr2[j]) {
            result.push(arr2[j]);
            j++;
        } else {
            result.push(arr1[i]); // ou les deux
            i++;
            j++;
        }
    }

    // Ajouter les restes
    while (i < arr1.length) result.push(arr1[i++]);
    while (j < arr2.length) result.push(arr2[j++]);

    return result;
}
```

**Exemples** :
- Merge Sorted Arrays
- Intersection of Two Arrays

## 💻 Exemples Détaillés

### Exemple 1 : Two Sum (Sorted Array)

```javascript
/**
 * Trouver deux nombres qui somment à target
 * Input: [1, 2, 3, 4, 6], target = 6
 * Output: [1, 3] (indices de 2 et 4)
 */
function twoSum(numbers, target) {
    let left = 0;
    let right = numbers.length - 1;

    while (left < right) {
        const sum = numbers[left] + numbers[right];

        if (sum === target) {
            return [left, right];
        } else if (sum < target) {
            left++;  // Besoin d'une somme plus grande
        } else {
            right--; // Besoin d'une somme plus petite
        }
    }

    return [-1, -1]; // Pas trouvé
}

// Trace pour [1,2,3,4,6], target=6
// left=0, right=4: 1+6=7 > 6 → right=3
// left=0, right=3: 1+4=5 < 6 → left=1
// left=1, right=3: 2+4=6 ✅
```

### Exemple 2 : Valid Palindrome

```javascript
/**
 * Vérifier si une string est un palindrome
 * Input: "A man, a plan, a canal: Panama"
 * Output: true
 */
function isPalindrome(s) {
    // Nettoyer : garder alphanumériques en lowercase
    const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');

    let left = 0;
    let right = cleaned.length - 1;

    while (left < right) {
        if (cleaned[left] !== cleaned[right]) {
            return false;
        }
        left++;
        right--;
    }

    return true;
}

// Optimisation O(1) espace : ne pas créer cleaned
function isPalindromeOptimal(s) {
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        // Sauter non-alphanumériques
        while (left < right && !isAlphanumeric(s[left])) left++;
        while (left < right && !isAlphanumeric(s[right])) right--;

        // Comparer
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }

        left++;
        right--;
    }

    return true;
}

function isAlphanumeric(char) {
    return /[a-z0-9]/i.test(char);
}
```

### Exemple 3 : 3Sum

```javascript
/**
 * Trouver tous les triplets qui somment à 0
 * Input: [-1, 0, 1, 2, -1, -4]
 * Output: [[-1, -1, 2], [-1, 0, 1]]
 */
function threeSum(nums) {
    nums.sort((a, b) => a - b); // O(n log n)
    const result = [];

    for (let i = 0; i < nums.length - 2; i++) {
        // Éviter duplicatas pour i
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        // Two Pointers pour trouver les deux autres
        let left = i + 1;
        let right = nums.length - 1;
        const target = -nums[i];

        while (left < right) {
            const sum = nums[left] + nums[right];

            if (sum === target) {
                result.push([nums[i], nums[left], nums[right]]);

                // Éviter duplicatas pour left et right
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;

                left++;
                right--;
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
    }

    return result;
}
```

### Exemple 4 : Remove Duplicates

```javascript
/**
 * Supprimer duplicatas d'un tableau trié (in-place)
 * Input: [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
 * Output: 5, arr = [0, 1, 2, 3, 4, ...]
 */
function removeDuplicates(nums) {
    if (nums.length === 0) return 0;

    let slow = 0; // Position pour écrire

    for (let fast = 1; fast < nums.length; fast++) {
        if (nums[fast] !== nums[slow]) {
            slow++;
            nums[slow] = nums[fast];
        }
    }

    return slow + 1; // Nouvelle longueur
}

// Trace pour [0,0,1,1,2]
// slow=0, fast=1: nums[1]=0 == nums[0] → skip
// slow=0, fast=2: nums[2]=1 != nums[0] → slow=1, nums[1]=1
// slow=1, fast=3: nums[3]=1 == nums[1] → skip
// slow=1, fast=4: nums[4]=2 != nums[1] → slow=2, nums[2]=2
// Result: [0,1,2,1,2], length=3
```

## 🎯 Problèmes LeetCode

### Easy
- ✅ Two Sum II (167)
- ✅ Valid Palindrome (125)
- ✅ Remove Duplicates (26)
- ✅ Move Zeroes (283)
- ✅ Merge Sorted Array (88)

### Medium
- 🟨 3Sum (15) ⭐⭐⭐⭐⭐
- 🟨 Container With Most Water (11) ⭐⭐⭐⭐⭐
- 🟨 Sort Colors (75)
- 🟨 3Sum Closest (16)
- 🟨 4Sum (18)

### Hard
- 🟥 Trapping Rain Water (42) ⭐⭐⭐⭐⭐
- 🟥 Minimum Window Substring (76)

## 🧠 Checklist de Reconnaissance

Utilise Two Pointers si :
- [ ] Le tableau est trié (ou peut l'être)
- [ ] Tu cherches une paire/triplet
- [ ] Tu compares début et fin
- [ ] Tu veux O(1) espace
- [ ] Problème de partition
- [ ] Palindrome check

## ⚠️ Pièges Courants

### 1. Oublier de trier
```javascript
// ❌ ERREUR
function twoSum(nums, target) {
    let left = 0, right = nums.length - 1;
    // ... Two Pointers sur tableau NON trié!
}

// ✅ CORRECT
function twoSum(nums, target) {
    nums.sort((a, b) => a - b); // Trier d'abord!
    let left = 0, right = nums.length - 1;
    // ...
}
```

### 2. Condition de boucle incorrecte
```javascript
// ❌ ERREUR : left <= right
while (left <= right) { // Comparera le même élément
    if (arr[left] !== arr[right]) return false;
    left++; right--;
}

// ✅ CORRECT : left < right
while (left < right) {
    if (arr[left] !== arr[right]) return false;
    left++; right--;
}
```

### 3. Ne pas gérer les duplicatas
```javascript
// Pour 3Sum, 4Sum, etc.
// ✅ Toujours skip duplicatas
if (i > 0 && nums[i] === nums[i-1]) continue;
while (left < right && nums[left] === nums[left+1]) left++;
while (left < right && nums[right] === nums[right-1]) right--;
```

### 4. Oublier les cas limites
```javascript
// ✅ Vérifier les edge cases
if (arr.length === 0) return result;
if (arr.length === 1) return arr[0];
```

## 📚 Ressources

- **Vidéo** : Abdul Bari - Two Pointer Technique
- **Article** : LeetCode Explore - Two Pointers
- **Practice** : LeetCode Tag "Two Pointers" (150+ problèmes)

## 🔥 Template à Mémoriser

```javascript
// CONVERGENT
function twoPointers(arr) {
    let left = 0, right = arr.length - 1;
    while (left < right) {
        if (condition) return [left, right];
        if (needMoveLeft) left++;
        else if (needMoveRight) right--;
        else { left++; right--; }
    }
}

// SAME DIRECTION
function twoPointersSlow(arr) {
    let slow = 0;
    for (let fast = 0; fast < arr.length; fast++) {
        if (condition) {
            arr[slow] = arr[fast];
            slow++;
        }
    }
    return slow;
}
```

**Temps d'apprentissage** : 2-3 heures
**Maîtrise** : Résoudre 10-15 problèmes
