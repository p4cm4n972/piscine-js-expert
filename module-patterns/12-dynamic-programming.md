# Pattern : Dynamic Programming

## 🎯 Concept
Résoudre des problèmes en décomposant en sous-problèmes et en mémorisant les résultats pour éviter les calculs redondants.

## 📋 Quand l'Utiliser
✅ Optimisation (min/max)
✅ Compter le nombre de façons
✅ Sous-séquences/sous-chaînes
✅ Problèmes avec choix multiples
✅ Problème avec sous-structure optimale

## ⏱️ Complexité
- **Temps** : O(n²) ou O(n×m) généralement
- **Espace** : O(n) ou O(n×m)

## 🔑 Templates

### Template 1D
```javascript
function dp1D(n) {
    const dp = new Array(n + 1).fill(0);

    // Cas de base
    dp[0] = 1;

    // Remplir le tableau
    for (let i = 1; i <= n; i++) {
        dp[i] = /* relation de récurrence */;
    }

    return dp[n];
}
```

### Template 2D
```javascript
function dp2D(s1, s2) {
    const m = s1.length;
    const n = s2.length;
    const dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));

    // Cas de base
    for (let i = 0; i <= m; i++) dp[i][0] = 0;
    for (let j = 0; j <= n; j++) dp[0][j] = 0;

    // Remplir la table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i-1] === s2[j-1]) {
                dp[i][j] = /* si match */;
            } else {
                dp[i][j] = /* si pas match */;
            }
        }
    }

    return dp[m][n];
}
```

## 💻 Exemples

### Climbing Stairs (LeetCode 70)
```javascript
function climbStairs(n) {
    if (n <= 2) return n;

    const dp = new Array(n + 1);
    dp[1] = 1;
    dp[2] = 2;

    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}

// Optimisation O(1) espace
function climbStairsOptimized(n) {
    if (n <= 2) return n;

    let prev1 = 2;
    let prev2 = 1;

    for (let i = 3; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}
```

### House Robber (LeetCode 198)
```javascript
function rob(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];

    const dp = new Array(nums.length);
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);

    for (let i = 2; i < nums.length; i++) {
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
    }

    return dp[nums.length - 1];
}
```

### Coin Change (LeetCode 322)
```javascript
function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (i >= coin) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    return dp[amount] === Infinity ? -1 : dp[amount];
}
```

### Longest Increasing Subsequence (LeetCode 300)
```javascript
function lengthOfLIS(nums) {
    if (nums.length === 0) return 0;

    const dp = new Array(nums.length).fill(1);

    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }

    return Math.max(...dp);
}
```

### Longest Common Subsequence (LeetCode 1143)
```javascript
function longestCommonSubsequence(text1, text2) {
    const m = text1.length;
    const n = text2.length;
    const dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[m][n];
}
```

### Edit Distance (LeetCode 72)
```javascript
function minDistance(word1, word2) {
    const m = word1.length;
    const n = word2.length;
    const dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));

    // Cas de base
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(
                    dp[i - 1][j],     // Delete
                    dp[i][j - 1],     // Insert
                    dp[i - 1][j - 1]  // Replace
                );
            }
        }
    }

    return dp[m][n];
}
```

### Word Break (LeetCode 139)
```javascript
function wordBreak(s, wordDict) {
    const wordSet = new Set(wordDict);
    const dp = new Array(s.length + 1).fill(false);
    dp[0] = true;

    for (let i = 1; i <= s.length; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && wordSet.has(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }

    return dp[s.length];
}
```

### Partition Equal Subset Sum (LeetCode 416)
```javascript
function canPartition(nums) {
    const sum = nums.reduce((a, b) => a + b, 0);

    if (sum % 2 !== 0) return false;

    const target = sum / 2;
    const dp = new Array(target + 1).fill(false);
    dp[0] = true;

    for (const num of nums) {
        for (let i = target; i >= num; i--) {
            dp[i] = dp[i] || dp[i - num];
        }
    }

    return dp[target];
}
```

### Unique Paths (LeetCode 62)
```javascript
function uniquePaths(m, n) {
    const dp = Array(m).fill(0).map(() => Array(n).fill(0));

    // Cas de base
    for (let i = 0; i < m; i++) dp[i][0] = 1;
    for (let j = 0; j < n; j++) dp[0][j] = 1;

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }

    return dp[m - 1][n - 1];
}
```

## 🧠 Méthode de Résolution

1. **Identifier le sous-problème**
   - Quelle est la question plus petite ?
   - Quelle est la relation de récurrence ?

2. **Définir l'état**
   - dp[i] = ?
   - dp[i][j] = ?

3. **Cas de base**
   - dp[0] = ?
   - dp[0][0] = ?

4. **Transition d'état**
   - Comment dp[i] dépend de dp[i-1], dp[i-2], etc. ?

5. **Ordre de calcul**
   - Bottom-up ou Top-down (memoization)

## 🎯 Problèmes LeetCode

### Easy
- ✅ Climbing Stairs (70) ⭐⭐⭐⭐⭐
- ✅ House Robber (198) ⭐⭐⭐⭐⭐

### Medium
- 🟨 Coin Change (322) ⭐⭐⭐⭐⭐
- 🟨 Longest Increasing Subsequence (300) ⭐⭐⭐⭐⭐
- 🟨 Longest Common Subsequence (1143) ⭐⭐⭐⭐⭐
- 🟨 Word Break (139) ⭐⭐⭐⭐
- 🟨 Unique Paths (62) ⭐⭐⭐⭐
- 🟨 Partition Equal Subset Sum (416)

### Hard
- 🟥 Edit Distance (72) ⭐⭐⭐⭐⭐

**Temps d'apprentissage** : 10-15 heures (le plus important!)
