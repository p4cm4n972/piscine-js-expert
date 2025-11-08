# Easy Problems - Fondations

Ces 15 problèmes **Easy** constituent la base indispensable pour tout entretien technique. Objectif : **100% de réussite en moins de 15 minutes par problème**.

## 📋 Liste des Problèmes

| # | Problème | Pattern | Temps | Fréquence | Fichier |
|---|----------|---------|-------|-----------|---------|
| 1 | Two Sum | Hash Table | 15min | ⭐⭐⭐⭐⭐ | `01-two-sum.js` |
| 2 | Valid Parentheses | Stack | 15min | ⭐⭐⭐⭐⭐ | `02-valid-parentheses.js` |
| 3 | Merge Two Sorted Lists | Linked List | 20min | ⭐⭐⭐⭐⭐ | `03-merge-two-sorted-lists.js` |
| 4 | Best Time to Buy/Sell Stock | Array | 15min | ⭐⭐⭐⭐⭐ | `04-best-time-stock.js` |
| 5 | Valid Palindrome | Two Pointers | 10min | ⭐⭐⭐⭐⭐ | `05-valid-palindrome.js` |
| 6 | Invert Binary Tree | Tree, DFS | 15min | ⭐⭐⭐⭐⭐ | `06-invert-binary-tree.js` |
| 7 | Valid Anagram | Hash Table | 10min | ⭐⭐⭐⭐ | `07-valid-anagram.js` |
| 8 | Binary Search | Binary Search | 10min | ⭐⭐⭐⭐ | `08-binary-search.js` |
| 9 | Flood Fill | DFS/BFS | 15min | ⭐⭐⭐⭐ | `09-flood-fill.js` |
| 10 | Lowest Common Ancestor | Tree | 20min | ⭐⭐⭐⭐ | `10-lca-bst.js` |
| 11 | Balanced Binary Tree | Tree, DFS | 15min | ⭐⭐⭐ | `11-balanced-tree.js` |
| 12 | Linked List Cycle | Two Pointers | 15min | ⭐⭐⭐⭐ | `12-linked-list-cycle.js` |
| 13 | Implement Queue using Stacks | Stack | 15min | ⭐⭐⭐ | `13-queue-using-stacks.js` |
| 14 | First Bad Version | Binary Search | 10min | ⭐⭐⭐ | `14-first-bad-version.js` |
| 15 | Ransom Note | Hash Table | 10min | ⭐⭐⭐ | `15-ransom-note.js` |

## 🎯 Patterns Couverts

### Hash Table / HashMap (4 problèmes)
Les hashmaps sont **LA** structure de données la plus utilisée en interview.
- Two Sum (#1)
- Valid Anagram (#7)
- Ransom Note (#15)

**Complexité type** : O(n) temps, O(n) espace

**Quand l'utiliser** :
- Besoin de lookup rapide (O(1))
- Compter des occurrences
- Détecter des duplicatas

### Stack (2 problèmes)
Pattern LIFO pour gérer des paires/imbrications.
- Valid Parentheses (#2)
- Implement Queue using Stacks (#13)

**Complexité type** : O(n) temps, O(n) espace

**Quand l'utiliser** :
- Validation de paires (parenthèses, balises)
- Historique/Undo (navigateur, éditeur)

### Linked List (2 problèmes)
Manipulation de pointeurs, dummy nodes.
- Merge Two Sorted Lists (#3)
- Linked List Cycle (#12)

**Patterns clés** :
- Dummy node (simplifier le code)
- Two pointers (Floyd's cycle detection)

### Two Pointers (2 problèmes)
Technique avec deux curseurs se déplaçant intelligemment.
- Valid Palindrome (#5)
- Linked List Cycle (#12)

**Complexité type** : O(n) temps, O(1) espace

**Quand l'utiliser** :
- Tableaux triés
- Palindromes
- Cycle detection

### Trees (4 problèmes)
Traversée, récursion, propriétés BST.
- Invert Binary Tree (#6)
- Lowest Common Ancestor (#10)
- Balanced Binary Tree (#11)
- Flood Fill (#9 - grid = tree implicite)

**Patterns clés** :
- DFS (récursif ou stack)
- BFS (queue)
- Propriétés BST (left < node < right)

### Binary Search (2 problèmes)
Recherche dichotomique en O(log n).
- Binary Search (#8)
- First Bad Version (#14)

**Template à connaître par cœur** :
```javascript
let left = 0, right = arr.length - 1;
while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (condition) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
}
```

## 📊 Ordre d'Apprentissage Recommandé

### Semaine 1 : Fondations (5 problèmes)
1. Two Sum (#1) - HashMap de base
2. Valid Palindrome (#5) - Two Pointers simple
3. Valid Anagram (#7) - Counting
4. Binary Search (#8) - Algorithme classique
5. Ransom Note (#15) - Révision HashMap

**Objectif** : Maîtriser HashMap, Two Pointers, Binary Search

### Semaine 2 : Structures (5 problèmes)
6. Valid Parentheses (#2) - Stack
7. Merge Two Sorted Lists (#3) - Linked List
8. Linked List Cycle (#12) - Floyd's algorithm
9. Implement Queue (#13) - Stack operations
10. First Bad Version (#14) - Binary Search variant

**Objectif** : Stack, Linked List, patterns avancés

### Semaine 3 : Trees (5 problèmes)
11. Invert Binary Tree (#6) - DFS/BFS
12. Flood Fill (#9) - DFS sur grille
13. Lowest Common Ancestor (#10) - BST properties
14. Balanced Tree (#11) - Hauteur récursive
15. Best Time to Buy Stock (#4) - Array (bonus)

**Objectif** : Récursion, arbres, DFS/BFS

## 🏆 Critères de Maîtrise

Tu as **maîtrisé** un problème Easy quand :
- [ ] Tu peux le résoudre en < 15 min sans aide
- [ ] Tu connais la complexité temps/espace
- [ ] Tu peux expliquer pourquoi cette approche est optimale
- [ ] Tu peux coder sans bugs du premier coup
- [ ] Tu connais 2-3 variantes du problème

## 💡 Conseils pour Easy

1. **Ne les sous-estime pas**
   - 50% des interviews commencent par un Easy
   - C'est ton échauffement, sois rapide et précis

2. **Template Mental**
   - HashMap → "Besoin de compter/lookup rapide ?"
   - Two Pointers → "Trié ou palindrome ?"
   - Stack → "Paires ou LIFO ?"
   - DFS/BFS → "Arbre ou graphe ?"

3. **Edge Cases Classiques**
   - Input vide : `[]`, `""`, `null`
   - Un seul élément : `[42]`, `"a"`
   - Tous identiques : `[1,1,1,1]`
   - Négatifs/zéros

4. **Communication en Interview**
   ```
   1. Clarifier (2 min) : "Puis-je supposer que...?"
   2. Brute force (1 min) : "La solution naïve serait O(n²)..."
   3. Optimiser (2 min) : "Avec une HashMap, on peut faire O(n)"
   4. Coder (8 min)
   5. Tester (2 min) : Edge cases
   ```

## 🚀 Commencer

```bash
# Tester un problème
node 01-two-sum.js

# Ou avec npm (si configuré)
npm test easy/01-two-sum

# Lancer tous les Easy
for file in *.js; do node "$file"; done
```

Bon courage! 💪
