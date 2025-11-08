# Module LeetCode - Top 75 pour Entretiens

Ce module contient une sélection des **75 problèmes LeetCode les plus fréquents en entretien**, organisés par difficulté et par pattern algorithmique.

## 🎯 Objectif

Préparer spécifiquement aux tests techniques type **CodinGame**, **LeetCode**, **HackerRank** posés lors d'entretiens pour des postes de développeur senior.

## 📊 Structure

```
module-leetcode/
├── easy/           # 15 problèmes Easy (fondations)
├── medium/         # 45 problèmes Medium (core interview)
└── hard/           # 15 problèmes Hard (FAANG+)
```

## 🏆 Méthodologie d'Entraînement

### 1. Format Interview Simulation

Chaque exercice suit le format réel d'entretien :

```javascript
/**
 * DIFFICULTÉ: Easy/Medium/Hard
 * TEMPS ATTENDU: 15-45 min selon difficulté
 * FRÉQUENCE: ⭐⭐⭐⭐⭐ (posé chez Google, Meta, Amazon, etc.)
 *
 * PATTERNS: Array, Two Pointers, Hash Table, etc.
 */
```

### 2. Progression Recommandée

**Semaine 1-2 : Easy (15 problèmes)**
- Maîtriser les patterns de base
- Temps : ~20 min par problème
- Objectif : 100% de réussite

**Semaine 3-6 : Medium (45 problèmes)**
- Patterns complexes et combinaisons
- Temps : ~30-40 min par problème
- Objectif : 80%+ de réussite

**Semaine 7-8 : Hard (15 problèmes)**
- Algorithmes avancés
- Temps : ~45-60 min par problème
- Objectif : Comprendre la logique (60%+ OK)

### 3. Système de Révision Espacée

```
Jour 0  : Premier solve
Jour 1  : Révision rapide
Jour 3  : Résoudre sans regarder la solution
Jour 7  : Optimiser (temps/espace)
Jour 14 : Expliquer à haute voix (comme en interview)
```

## 📚 Patterns Algorithmiques Couverts

### Arrays & Hashing (15 problèmes)
- Two Sum, Group Anagrams, Top K Elements, etc.

### Two Pointers (8 problèmes)
- Container With Most Water, 3Sum, Trapping Rain Water

### Sliding Window (6 problèmes)
- Longest Substring, Minimum Window Substring

### Stack (5 problèmes)
- Valid Parentheses, Min Stack, Largest Rectangle

### Binary Search (5 problèmes)
- Search in Rotated Array, Find Minimum

### Linked List (6 problèmes)
- Reverse, Detect Cycle, Merge K Lists

### Trees (10 problèmes)
- Invert Tree, Validate BST, Lowest Common Ancestor

### Graphs (8 problèmes)
- Number of Islands, Course Schedule, Word Ladder

### Dynamic Programming (12 problèmes)
- Climbing Stairs, Coin Change, Longest Increasing Subsequence

## 🎓 Comment Utiliser ce Module

### Mode Entraînement
```bash
# Lancer un problème spécifique
npm test -- easy/01-two-sum

# Lancer tous les Easy
npm test -- easy/

# Lancer par pattern
npm test -- */two-pointers*
```

### Mode Interview Simulation

1. **Timer** : Active un chronomètre (15-45 min selon difficulté)
2. **No hints** : Ne regarde PAS la solution avant le timer
3. **Parle à haute voix** : Explique ta démarche (même seul)
4. **Test cases** : Écris tes propres tests AVANT de coder
5. **Optimise** : Améliore temps/espace après le premier solve

### Checklist Interview

Pour chaque problème :
- [ ] Clarifier les contraintes (null, vide, négatifs, etc.)
- [ ] Proposer une solution naïve (brute force)
- [ ] Analyser la complexité (Big O temps/espace)
- [ ] Optimiser si possible
- [ ] Tester avec edge cases
- [ ] Expliquer le code ligne par ligne

## 📈 Métriques de Progression

Tiens un journal de tes performances :

```markdown
| Date       | Problème        | Temps | Résolu? | Complexité | Notes       |
|------------|-----------------|-------|---------|------------|-------------|
| 2025-01-08 | Two Sum         | 12min | ✅      | O(n)       | HashMap OK  |
| 2025-01-08 | Valid Anagram   | 8min  | ✅      | O(n)       | Counting    |
| 2025-01-09 | Container Water | 35min | ❌      | -          | Revoir 2ptr |
```

## 🏢 Entreprises par Difficulté

### Easy
Posés chez : Google, Amazon, Microsoft, Meta, Apple (screening)

### Medium
**Le cœur des interviews** chez toutes les FAANG et scale-ups

### Hard
Google, Meta, Amazon (senior+), startups très techniques (Palantir, etc.)

## 💡 Conseils pour Senior

1. **Ne pas juste résoudre** : Comprendre **pourquoi** cette solution
2. **Variations** : "Et si la contrainte changeait ?" (ex: stream infini)
3. **Trade-offs** : Expliquer temps vs espace
4. **Production** : "Comment scalerais-tu ça en prod ?"
5. **Communication** : Parler pendant que tu codes (crucial en remote)

## 🔥 Top 15 Must-Know (par fréquence)

1. Two Sum (Easy) - ⭐⭐⭐⭐⭐
2. Valid Parentheses (Easy) - ⭐⭐⭐⭐⭐
3. Merge Two Sorted Lists (Easy) - ⭐⭐⭐⭐⭐
4. Best Time to Buy/Sell Stock (Easy) - ⭐⭐⭐⭐⭐
5. Valid Palindrome (Easy) - ⭐⭐⭐⭐⭐
6. Invert Binary Tree (Easy) - ⭐⭐⭐⭐⭐
7. Group Anagrams (Medium) - ⭐⭐⭐⭐⭐
8. 3Sum (Medium) - ⭐⭐⭐⭐⭐
9. Container With Most Water (Medium) - ⭐⭐⭐⭐⭐
10. Longest Substring Without Repeating (Medium) - ⭐⭐⭐⭐⭐
11. LRU Cache (Medium) - ⭐⭐⭐⭐⭐
12. Course Schedule (Medium) - ⭐⭐⭐⭐⭐
13. Coin Change (Medium) - ⭐⭐⭐⭐⭐
14. Word Break (Medium) - ⭐⭐⭐⭐⭐
15. Merge K Sorted Lists (Hard) - ⭐⭐⭐⭐⭐

## 🚀 Commencer Maintenant

```bash
cd module-leetcode/easy
cat 01-two-sum.js  # Commence par le classique!
```

**Objectif final** : Résoudre n'importe quel Easy en <15 min, Medium en <30 min.

Bon courage! 💪
