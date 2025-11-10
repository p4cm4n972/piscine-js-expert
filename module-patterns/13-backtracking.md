# Pattern : Backtracking

## 🎯 Concept
Explorer toutes les solutions possibles en construisant une solution étape par étape, et en revenant en arrière (backtrack) quand une contrainte est violée.

## 📋 Quand l'Utiliser
✅ Générer toutes les combinaisons/permutations
✅ Trouver toutes les solutions possibles
✅ Problèmes de décision avec contraintes
✅ Sudoku, N-Queens, etc.
✅ Sous-ensembles et partitions

## ⏱️ Complexité
- **Temps** : O(2ⁿ) ou O(n!) - exponentiel
- **Espace** : O(n) - profondeur de récursion

## 🔑 Template

```javascript
function backtrack(state, choices, constraints) {
    // Cas de base : solution complète
    if (isComplete(state)) {
        result.push([...state]);
        return;
    }

    // Explorer toutes les possibilités
    for (const choice of choices) {
        // Vérifier les contraintes
        if (isValid(state, choice, constraints)) {
            // Faire le choix
            state.push(choice);

            // Récursion
            backtrack(state, choices, constraints);

            // Backtrack : annuler le choix
            state.pop();
        }
    }
}
```

## 💻 Exemples

### Subsets (LeetCode 78)
```javascript
function subsets(nums) {
    const result = [];

    function backtrack(start, path) {
        result.push([...path]);

        for (let i = start; i < nums.length; i++) {
            path.push(nums[i]);
            backtrack(i + 1, path);
            path.pop();
        }
    }

    backtrack(0, []);
    return result;
}
```

### Permutations (LeetCode 46)
```javascript
function permute(nums) {
    const result = [];

    function backtrack(path, used) {
        if (path.length === nums.length) {
            result.push([...path]);
            return;
        }

        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;

            path.push(nums[i]);
            used[i] = true;

            backtrack(path, used);

            path.pop();
            used[i] = false;
        }
    }

    backtrack([], new Array(nums.length).fill(false));
    return result;
}
```

### Combination Sum (LeetCode 39)
```javascript
function combinationSum(candidates, target) {
    const result = [];

    function backtrack(start, path, sum) {
        if (sum === target) {
            result.push([...path]);
            return;
        }

        if (sum > target) return;

        for (let i = start; i < candidates.length; i++) {
            path.push(candidates[i]);
            backtrack(i, path, sum + candidates[i]);
            path.pop();
        }
    }

    backtrack(0, [], 0);
    return result;
}
```

### Generate Parentheses (LeetCode 22)
```javascript
function generateParenthesis(n) {
    const result = [];

    function backtrack(path, open, close) {
        if (path.length === 2 * n) {
            result.push(path);
            return;
        }

        if (open < n) {
            backtrack(path + '(', open + 1, close);
        }

        if (close < open) {
            backtrack(path + ')', open, close + 1);
        }
    }

    backtrack('', 0, 0);
    return result;
}
```

### Letter Combinations of Phone Number (LeetCode 17)
```javascript
function letterCombinations(digits) {
    if (digits.length === 0) return [];

    const phone = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    };

    const result = [];

    function backtrack(index, path) {
        if (index === digits.length) {
            result.push(path);
            return;
        }

        const letters = phone[digits[index]];
        for (const letter of letters) {
            backtrack(index + 1, path + letter);
        }
    }

    backtrack(0, '');
    return result;
}
```

### Word Search (LeetCode 79)
```javascript
function exist(board, word) {
    const m = board.length;
    const n = board[0].length;

    function backtrack(row, col, index) {
        if (index === word.length) return true;

        if (row < 0 || row >= m || col < 0 || col >= n ||
            board[row][col] !== word[index]) {
            return false;
        }

        const temp = board[row][col];
        board[row][col] = '#'; // Marquer comme visité

        const found = backtrack(row + 1, col, index + 1) ||
                     backtrack(row - 1, col, index + 1) ||
                     backtrack(row, col + 1, index + 1) ||
                     backtrack(row, col - 1, index + 1);

        board[row][col] = temp; // Backtrack

        return found;
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (backtrack(i, j, 0)) return true;
        }
    }

    return false;
}
```

### N-Queens (LeetCode 51)
```javascript
function solveNQueens(n) {
    const result = [];
    const board = Array(n).fill(0).map(() => Array(n).fill('.'));

    function isValid(row, col) {
        // Vérifier colonne
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false;
        }

        // Vérifier diagonale haut-gauche
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') return false;
        }

        // Vérifier diagonale haut-droite
        for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === 'Q') return false;
        }

        return true;
    }

    function backtrack(row) {
        if (row === n) {
            result.push(board.map(r => r.join('')));
            return;
        }

        for (let col = 0; col < n; col++) {
            if (isValid(row, col)) {
                board[row][col] = 'Q';
                backtrack(row + 1);
                board[row][col] = '.';
            }
        }
    }

    backtrack(0);
    return result;
}
```

### Palindrome Partitioning (LeetCode 131)
```javascript
function partition(s) {
    const result = [];

    function isPalindrome(str) {
        let left = 0, right = str.length - 1;
        while (left < right) {
            if (str[left] !== str[right]) return false;
            left++;
            right--;
        }
        return true;
    }

    function backtrack(start, path) {
        if (start === s.length) {
            result.push([...path]);
            return;
        }

        for (let i = start; i < s.length; i++) {
            const substring = s.slice(start, i + 1);

            if (isPalindrome(substring)) {
                path.push(substring);
                backtrack(i + 1, path);
                path.pop();
            }
        }
    }

    backtrack(0, []);
    return result;
}
```

## 🧠 Structure du Backtracking

```javascript
function backtrack() {
    // 1. Cas de base
    if (conditionArret) {
        enregistrerSolution();
        return;
    }

    // 2. Explorer les choix
    for (choix in choixPossibles) {
        // 3. Vérifier contraintes
        if (estValide(choix)) {
            // 4. Faire le choix
            faireLechoix(choix);

            // 5. Récursion
            backtrack();

            // 6. Backtrack : annuler le choix
            annulerLechoix(choix);
        }
    }
}
```

## 🎯 Problèmes LeetCode

### Medium
- 🟨 Subsets (78) ⭐⭐⭐⭐⭐
- 🟨 Permutations (46) ⭐⭐⭐⭐⭐
- 🟨 Combination Sum (39) ⭐⭐⭐⭐⭐
- 🟨 Generate Parentheses (22) ⭐⭐⭐⭐⭐
- 🟨 Letter Combinations (17) ⭐⭐⭐⭐
- 🟨 Word Search (79) ⭐⭐⭐⭐⭐
- 🟨 Palindrome Partitioning (131)

### Hard
- 🟥 N-Queens (51) ⭐⭐⭐⭐⭐
- 🟥 Sudoku Solver (37)

**Temps d'apprentissage** : 5-7 heures
