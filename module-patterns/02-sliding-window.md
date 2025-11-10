# Pattern : Sliding Window

## 🎯 Concept

Utiliser une **fenêtre glissante** (sous-tableau contigu) qui s'étend ou se contracte pour trouver une solution optimale.

## 📋 Quand l'Utiliser

✅ Sous-tableau/substring **contigu**
✅ Trouver **maximum/minimum** d'une fenêtre
✅ Calculer une **somme/moyenne** sur k éléments
✅ Pattern de caractères dans une string
✅ Plus longue/courte sous-séquence

❌ Éléments non contigus
❌ Besoin de trier

## ⏱️ Complexité

- **Temps** : O(n) - un seul parcours
- **Espace** : O(1) ou O(k) selon le problème

## 🔑 Variantes du Pattern

### 1. Fixed Size Window (Fenêtre fixe)

La taille de la fenêtre est constante (k éléments).

```javascript
/**
 * TEMPLATE : Sliding Window Taille Fixe
 *
 * Utilisation : Max/min somme de k éléments consécutifs
 */
function fixedSlidingWindow(arr, k) {
    if (arr.length < k) return -1;

    // Calculer somme de la première fenêtre
    let windowSum = 0;
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }

    let maxSum = windowSum;

    // Faire glisser la fenêtre
    for (let i = k; i < arr.length; i++) {
        // Ajouter nouvel élément, retirer l'ancien
        windowSum = windowSum + arr[i] - arr[i - k];
        maxSum = Math.max(maxSum, windowSum);
    }

    return maxSum;
}
```

**Exemples** :
- Maximum Sum Subarray of Size K
- Average of Subarrays of Size K
- First Negative in Every Window

### 2. Dynamic Size Window (Fenêtre variable)

La taille de la fenêtre change selon une condition.

```javascript
/**
 * TEMPLATE : Sliding Window Taille Variable
 *
 * Utilisation : Plus longue substring sans répétition, somme <= target
 */
function dynamicSlidingWindow(arr, condition) {
    let left = 0;
    let result = 0; // ou Infinity si on cherche le minimum
    let windowData = {}; // State de la fenêtre

    for (let right = 0; right < arr.length; right++) {
        // Expand : ajouter arr[right] à la fenêtre
        windowData[arr[right]] = (windowData[arr[right]] || 0) + 1;

        // Contract : réduire fenêtre si condition violée
        while (conditionViolated(windowData)) {
            // Retirer arr[left] de la fenêtre
            windowData[arr[left]]--;
            if (windowData[arr[left]] === 0) {
                delete windowData[arr[left]];
            }
            left++;
        }

        // Mettre à jour résultat
        result = Math.max(result, right - left + 1);
    }

    return result;
}
```

**Exemples** :
- Longest Substring Without Repeating Characters
- Minimum Window Substring
- Longest Substring with K Distinct Characters

### 3. Sliding Window avec Fréquences

Utiliser un Map/Object pour tracker les fréquences.

```javascript
/**
 * TEMPLATE : Sliding Window + Frequency Counter
 *
 * Utilisation : Anagrammes, patterns de caractères
 */
function slidingWindowWithFreq(s, pattern) {
    const patternFreq = {};
    const windowFreq = {};

    // Initialiser pattern frequency
    for (const char of pattern) {
        patternFreq[char] = (patternFreq[char] || 0) + 1;
    }

    let left = 0;
    let matched = 0; // Nombre de caractères matched
    const result = [];

    for (let right = 0; right < s.length; right++) {
        const rightChar = s[right];

        // Expand
        if (rightChar in patternFreq) {
            windowFreq[rightChar] = (windowFreq[rightChar] || 0) + 1;
            if (windowFreq[rightChar] === patternFreq[rightChar]) {
                matched++;
            }
        }

        // Match trouvé
        if (matched === Object.keys(patternFreq).length) {
            result.push(left);
        }

        // Contract si window size >= pattern size
        if (right >= pattern.length - 1) {
            const leftChar = s[left];
            if (leftChar in patternFreq) {
                if (windowFreq[leftChar] === patternFreq[leftChar]) {
                    matched--;
                }
                windowFreq[leftChar]--;
            }
            left++;
        }
    }

    return result;
}
```

## 💻 Exemples Détaillés

### Exemple 1 : Maximum Sum Subarray of Size K

```javascript
/**
 * Trouver la somme maximale d'un sous-tableau de taille k
 * Input: [2, 1, 5, 1, 3, 2], k = 3
 * Output: 9 ([5, 1, 3])
 */
function maxSumSubarray(arr, k) {
    if (arr.length < k) return null;

    // Première fenêtre [0...k-1]
    let windowSum = 0;
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }

    let maxSum = windowSum;

    // Faire glisser la fenêtre
    for (let i = k; i < arr.length; i++) {
        // Slide : remove arr[i-k], add arr[i]
        windowSum = windowSum - arr[i - k] + arr[i];
        maxSum = Math.max(maxSum, windowSum);
    }

    return maxSum;
}

// Trace pour [2,1,5,1,3,2], k=3
// Window [2,1,5]: sum=8
// Window [1,5,1]: sum=7 (remove 2, add 1)
// Window [5,1,3]: sum=9 (remove 1, add 3) ✅ max
// Window [1,3,2]: sum=6 (remove 5, add 2)
```

### Exemple 2 : Longest Substring Without Repeating Characters

```javascript
/**
 * Plus longue substring sans caractères répétés
 * Input: "abcabcbb"
 * Output: 3 ("abc")
 */
function lengthOfLongestSubstring(s) {
    const seen = new Set();
    let left = 0;
    let maxLength = 0;

    for (let right = 0; right < s.length; right++) {
        // Contract jusqu'à ce qu'il n'y ait plus de répétition
        while (seen.has(s[right])) {
            seen.delete(s[left]);
            left++;
        }

        // Expand
        seen.add(s[right]);
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}

// Trace pour "abcabcbb"
// right=0: 'a', seen={a}, maxLen=1
// right=1: 'b', seen={a,b}, maxLen=2
// right=2: 'c', seen={a,b,c}, maxLen=3 ✅
// right=3: 'a', duplicate! remove 'a', seen={b,c}, add 'a', seen={b,c,a}
// right=4: 'b', duplicate! remove 'b','c', seen={a}, add 'b', seen={a,b}
// ...
```

### Exemple 3 : Minimum Window Substring (Hard)

```javascript
/**
 * Plus petite fenêtre contenant tous les caractères de t
 * Input: s = "ADOBECODEBANC", t = "ABC"
 * Output: "BANC"
 */
function minWindow(s, t) {
    if (s.length < t.length) return "";

    // Fréquences de t
    const tFreq = {};
    for (const char of t) {
        tFreq[char] = (tFreq[char] || 0) + 1;
    }

    let left = 0;
    let minLen = Infinity;
    let minStart = 0;
    let matched = 0; // Nombre de caractères uniques matched
    const windowFreq = {};

    for (let right = 0; right < s.length; right++) {
        const rightChar = s[right];

        // Expand
        if (rightChar in tFreq) {
            windowFreq[rightChar] = (windowFreq[rightChar] || 0) + 1;

            // Incrémenter matched si fréquence match
            if (windowFreq[rightChar] === tFreq[rightChar]) {
                matched++;
            }
        }

        // Contract si tous les caractères sont matched
        while (matched === Object.keys(tFreq).length) {
            // Mettre à jour résultat
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minStart = left;
            }

            // Contract
            const leftChar = s[left];
            if (leftChar in tFreq) {
                if (windowFreq[leftChar] === tFreq[leftChar]) {
                    matched--;
                }
                windowFreq[leftChar]--;
            }
            left++;
        }
    }

    return minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
}
```

### Exemple 4 : Fruits Into Baskets

```javascript
/**
 * Maximum de fruits dans 2 paniers (max 2 types différents)
 * Input: [1, 2, 1, 2, 3, 3, 3, 1]
 * Output: 5 ([2, 3, 3, 3, 3] ou similaire)
 */
function totalFruit(fruits) {
    const basket = new Map(); // type → count
    let left = 0;
    let maxFruits = 0;

    for (let right = 0; right < fruits.length; right++) {
        // Expand : ajouter fruit[right]
        basket.set(fruits[right], (basket.get(fruits[right]) || 0) + 1);

        // Contract si plus de 2 types
        while (basket.size > 2) {
            const leftFruit = fruits[left];
            basket.set(leftFruit, basket.get(leftFruit) - 1);
            if (basket.get(leftFruit) === 0) {
                basket.delete(leftFruit);
            }
            left++;
        }

        // Mettre à jour maximum
        maxFruits = Math.max(maxFruits, right - left + 1);
    }

    return maxFruits;
}
```

## 🎯 Problèmes LeetCode

### Easy
- ✅ Maximum Average Subarray I (643)
- ✅ Contains Duplicate II (219)
- ✅ Defanging an IP Address (1108)

### Medium
- 🟨 Longest Substring Without Repeating Characters (3) ⭐⭐⭐⭐⭐
- 🟨 Longest Repeating Character Replacement (424) ⭐⭐⭐⭐
- 🟨 Permutation in String (567)
- 🟨 Find All Anagrams in String (438)
- 🟨 Fruits Into Baskets (904)
- 🟨 Max Consecutive Ones III (1004)

### Hard
- 🟥 Minimum Window Substring (76) ⭐⭐⭐⭐⭐
- 🟥 Sliding Window Maximum (239) ⭐⭐⭐⭐⭐
- 🟥 Longest Substring with At Most K Distinct Characters (340)

## 🧠 Checklist de Reconnaissance

Utilise Sliding Window si :
- [ ] Le problème concerne un **sous-tableau/substring contigu**
- [ ] Tu cherches un max/min sur une fenêtre
- [ ] La fenêtre a une taille fixe (k éléments)
- [ ] Tu dois tracker des fréquences de caractères
- [ ] Keywords : "longest", "shortest", "maximum sum", "at most k"

## ⚠️ Pièges Courants

### 1. Oublier de contracter la fenêtre

```javascript
// ❌ ERREUR : toujours expand, jamais contract
for (let right = 0; right < arr.length; right++) {
    windowSum += arr[right];
    maxSum = Math.max(maxSum, windowSum); // Mauvais!
}

// ✅ CORRECT : expand puis contract
for (let right = 0; right < arr.length; right++) {
    windowSum += arr[right];
    while (windowSize > k) {
        windowSum -= arr[left];
        left++;
    }
    maxSum = Math.max(maxSum, windowSum);
}
```

### 2. Condition while vs if pour contract

```javascript
// ❌ ERREUR : if au lieu de while
if (condition) {
    left++; // Ne contracte qu'une fois!
}

// ✅ CORRECT : while pour contracter complètement
while (condition) {
    left++;
}
```

### 3. Calcul incorrect de la taille de fenêtre

```javascript
// ✅ Taille de fenêtre = right - left + 1
const windowSize = right - left + 1;
```

### 4. Ne pas gérer les edge cases

```javascript
// ✅ Vérifier longueur minimale
if (arr.length < k) return -1;
if (s.length === 0) return 0;
```

## 📊 Comparaison des Approches

```javascript
// Brute Force : O(n²) ou O(n³)
function maxSumBruteForce(arr, k) {
    let maxSum = -Infinity;
    for (let i = 0; i <= arr.length - k; i++) {
        let sum = 0;
        for (let j = i; j < i + k; j++) {
            sum += arr[j];
        }
        maxSum = Math.max(maxSum, sum);
    }
    return maxSum;
}

// Sliding Window : O(n)
function maxSumOptimal(arr, k) {
    let windowSum = arr.slice(0, k).reduce((a, b) => a + b, 0);
    let maxSum = windowSum;

    for (let i = k; i < arr.length; i++) {
        windowSum = windowSum - arr[i - k] + arr[i];
        maxSum = Math.max(maxSum, windowSum);
    }

    return maxSum;
}
```

## 🔥 Template à Mémoriser

```javascript
// FIXED SIZE WINDOW
function fixedWindow(arr, k) {
    let windowSum = 0;
    for (let i = 0; i < k; i++) windowSum += arr[i];
    let result = windowSum;

    for (let i = k; i < arr.length; i++) {
        windowSum = windowSum - arr[i - k] + arr[i];
        result = Math.max(result, windowSum);
    }
    return result;
}

// DYNAMIC SIZE WINDOW
function dynamicWindow(arr) {
    let left = 0, result = 0;
    const window = {};

    for (let right = 0; right < arr.length; right++) {
        // Expand
        window[arr[right]] = (window[arr[right]] || 0) + 1;

        // Contract
        while (condition) {
            window[arr[left]]--;
            if (window[arr[left]] === 0) delete window[arr[left]];
            left++;
        }

        // Update result
        result = Math.max(result, right - left + 1);
    }
    return result;
}
```

**Temps d'apprentissage** : 3-4 heures
**Maîtrise** : Résoudre 15-20 problèmes
