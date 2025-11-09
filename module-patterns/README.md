# Module Patterns Interview - Templates Essentiels

Ce module regroupe les **patterns algorithmiques les plus fréquents en interview** avec des templates prêts à l'emploi à connaître **par cœur**.

## 🎯 Objectif

Avoir des templates mentaux pour reconnaître instantanément quel pattern appliquer lors d'un problème d'interview.

## 📚 Structure

```
module-patterns/
├── 01-two-pointers.md          # Pattern Two Pointers
├── 02-sliding-window.md        # Pattern Sliding Window
├── 03-fast-slow-pointers.md    # Pattern Floyd's (Tortoise & Hare)
├── 04-merge-intervals.md       # Pattern Merge Intervals
├── 05-cyclic-sort.md           # Pattern Cyclic Sort
├── 06-in-place-reversal.md     # Pattern In-place Reversal
├── 07-tree-dfs.md              # Pattern Tree DFS
├── 08-tree-bfs.md              # Pattern Tree BFS
├── 09-binary-search.md         # Pattern Binary Search
├── 10-top-k-elements.md        # Pattern Top K Elements (Heap)
├── 11-k-way-merge.md           # Pattern K-way Merge
├── 12-dynamic-programming.md   # Pattern Dynamic Programming
├── 13-backtracking.md          # Pattern Backtracking
├── 14-graphs.md                # Pattern Graph Traversal
└── 15-cheatsheet.md            # Cheatsheet complète
```

## 🏆 Top 15 Patterns à Maîtriser

### 1. Two Pointers ⭐⭐⭐⭐⭐
**Quand l'utiliser** : Tableau trié, palindrome, paires
**Complexité** : O(n) temps, O(1) espace
**Exemples** : Valid Palindrome, 3Sum, Container With Most Water

### 2. Sliding Window ⭐⭐⭐⭐⭐
**Quand l'utiliser** : Sous-tableau/substring contigus
**Complexité** : O(n) temps
**Exemples** : Longest Substring, Max Sum Subarray

### 3. Fast & Slow Pointers (Floyd's) ⭐⭐⭐⭐⭐
**Quand l'utiliser** : Cycle detection, trouver le milieu
**Complexité** : O(n) temps, O(1) espace
**Exemples** : Linked List Cycle, Happy Number

### 4. Merge Intervals ⭐⭐⭐⭐
**Quand l'utiliser** : Intervalles qui se chevauchent
**Complexité** : O(n log n) temps
**Exemples** : Merge Intervals, Meeting Rooms

### 5. Cyclic Sort ⭐⭐⭐
**Quand l'utiliser** : Nombres dans range [1..n]
**Complexité** : O(n) temps
**Exemples** : Find Missing Number, Find Duplicate

### 6. In-place Reversal ⭐⭐⭐⭐
**Quand l'utiliser** : Inverser linked list
**Complexité** : O(n) temps, O(1) espace
**Exemples** : Reverse Linked List, Reverse Sublist

### 7. Tree DFS ⭐⭐⭐⭐⭐
**Quand l'utiliser** : Parcours d'arbre, chemins
**Complexité** : O(n) temps, O(h) espace
**Exemples** : Path Sum, Diameter of Tree

### 8. Tree BFS ⭐⭐⭐⭐⭐
**Quand l'utiliser** : Level-order traversal
**Complexité** : O(n) temps, O(w) espace
**Exemples** : Level Order, Zigzag Traversal

### 9. Binary Search ⭐⭐⭐⭐⭐
**Quand l'utiliser** : Recherche dans espace trié
**Complexité** : O(log n) temps
**Exemples** : Binary Search, Search Rotated Array

### 10. Top K Elements (Heap) ⭐⭐⭐⭐
**Quand l'utiliser** : K plus grands/petits éléments
**Complexité** : O(n log k) temps
**Exemples** : Kth Largest, Top K Frequent

### 11. K-way Merge ⭐⭐⭐
**Quand l'utiliser** : Merger K listes triées
**Complexité** : O(n log k) temps
**Exemples** : Merge K Sorted Lists

### 12. Dynamic Programming ⭐⭐⭐⭐⭐
**Quand l'utiliser** : Optimisation, comptage
**Complexité** : Variable
**Exemples** : Fibonacci, Coin Change, LIS

### 13. Backtracking ⭐⭐⭐⭐
**Quand l'utiliser** : Générer toutes les combinaisons
**Complexité** : Exponentiel
**Exemples** : Subsets, Permutations, N-Queens

### 14. Graph Traversal ⭐⭐⭐⭐
**Quand l'utiliser** : Problèmes de graphe
**Complexité** : O(V + E) temps
**Exemples** : Number of Islands, Course Schedule

### 15. Union Find ⭐⭐⭐
**Quand l'utiliser** : Composantes connexes dynamiques
**Complexité** : O(α(n)) amortized
**Exemples** : Number of Islands II, Graph Valid Tree

## 🎓 Comment Utiliser ce Module

### Phase 1 : Apprentissage (Semaine 1-2)
1. Lire chaque pattern dans l'ordre
2. Comprendre le template et quand l'utiliser
3. Résoudre 2-3 exemples par pattern

### Phase 2 : Mémorisation (Semaine 3)
1. Réécrire les templates de mémoire
2. Faire des flashcards (pattern → template)
3. Quiz : problème → quel pattern ?

### Phase 3 : Application (Semaine 4+)
1. Résoudre nouveaux problèmes
2. Identifier le pattern en <1 min
3. Appliquer le template approprié

## 🧠 Recognition Checklist

Avant de coder, demande-toi :

**Input/Structure** :
- [ ] Tableau trié ? → Two Pointers ou Binary Search
- [ ] Linked List ? → Fast/Slow Pointers ou Reversal
- [ ] Arbre ? → DFS ou BFS
- [ ] Graphe ? → DFS/BFS ou Union Find
- [ ] String ? → Two Pointers ou Sliding Window

**Objectif** :
- [ ] Trouver une paire/triplet ? → Two Pointers
- [ ] Sous-tableau max/min ? → Sliding Window
- [ ] Détecter cycle ? → Fast/Slow Pointers
- [ ] Top K éléments ? → Heap
- [ ] Toutes combinaisons ? → Backtracking
- [ ] Optimiser choix ? → Dynamic Programming

**Contraintes** :
- [ ] O(1) espace requis ? → Two Pointers, Fast/Slow
- [ ] O(log n) temps ? → Binary Search
- [ ] Range [1..n] ? → Cyclic Sort

## 📊 Fréquence par Entreprise

**Google** : DP, DFS/BFS, Binary Search, Backtracking
**Meta** : Two Pointers, Sliding Window, Tree, Graph
**Amazon** : Two Pointers, Tree, DFS/BFS, Heap
**Microsoft** : DP, Tree, Graph, Binary Search
**Apple** : Tree, DFS/BFS, Two Pointers, DP

## 🔥 Top 10 Must-Know Templates

1. **Two Pointers** (left/right)
2. **Sliding Window** (expand/shrink)
3. **Binary Search** (left/right/mid)
4. **DFS Recursif** (pre/in/post-order)
5. **BFS avec Queue** (level-order)
6. **Fast/Slow Pointers** (Floyd's)
7. **Backtracking** (explore + backtrack)
8. **DP Bottom-Up** (tabulation)
9. **Heap Operations** (heapify, push, pop)
10. **Union Find** (find, union)

## 📖 Ressources Complémentaires

- **Livre** : "Grokking the Coding Interview" (14 patterns)
- **Site** : NeetCode (grouped by patterns)
- **Vidéos** : Abdul Bari (algorithmes visuels)
- **Practice** : LeetCode Patterns (Blind 75)

## 🚀 Quick Start

```bash
# Lire le premier pattern
cat 01-two-pointers.md

# Ou ouvrir avec Neovim
nvim 01-two-pointers.md

# Pratiquer avec les exemples
node examples/two-pointers-practice.js
```

## 💡 Astuce Senior

En interview, **annonce le pattern** avant de coder :

> "Ce problème ressemble à un Two Pointers pattern parce que le tableau est trié et on cherche une paire. Je vais utiliser left et right pointers qui se rapprochent..."

Cela montre :
- ✅ Expérience (tu reconnais les patterns)
- ✅ Communication (tu expliques ta démarche)
- ✅ Structure (tu as un plan clair)

---

**Objectif final** : Reconnaître le pattern en <30 secondes et appliquer le template en <5 minutes.

Bon apprentissage! 💪
