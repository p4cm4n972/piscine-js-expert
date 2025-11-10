# Pattern : Tree DFS (Depth-First Search)

## 🎯 Concept
Parcourir un arbre en profondeur d'abord (pre-order, in-order, post-order).

## 📋 Quand l'Utiliser
✅ Parcours d'arbre binaire
✅ Trouver un chemin/somme
✅ Calculer hauteur/diamètre
✅ Vérifier propriétés BST

## ⏱️ Complexité
- **Temps** : O(n)
- **Espace** : O(h) - call stack (h=hauteur)

## 🔑 Templates

```javascript
// Pre-order (Root → Left → Right)
function preorder(root) {
    if (!root) return;
    console.log(root.val); // Process
    preorder(root.left);
    preorder(root.right);
}

// In-order (Left → Root → Right)
function inorder(root) {
    if (!root) return;
    inorder(root.left);
    console.log(root.val); // Process
    inorder(root.right);
}

// Post-order (Left → Right → Root)
function postorder(root) {
    if (!root) return;
    postorder(root.left);
    postorder(root.right);
    console.log(root.val); // Process
}
```

## 💻 Exemples

### Max Depth (LeetCode 104)
```javascript
function maxDepth(root) {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
```

### Path Sum (LeetCode 112)
```javascript
function hasPathSum(root, targetSum) {
    if (!root) return false;
    if (!root.left && !root.right) return root.val === targetSum;

    return hasPathSum(root.left, targetSum - root.val) ||
           hasPathSum(root.right, targetSum - root.val);
}
```

### Invert Tree (LeetCode 226)
```javascript
function invertTree(root) {
    if (!root) return null;

    [root.left, root.right] = [root.right, root.left];
    invertTree(root.left);
    invertTree(root.right);

    return root;
}
```

## 🎯 Problèmes LeetCode
- ✅ Max Depth (104)
- ✅ Path Sum (112)
- ✅ Invert Binary Tree (226) ⭐⭐⭐⭐⭐
- 🟨 Diameter of Binary Tree (543)
- 🟨 Lowest Common Ancestor (236)

**Temps d'apprentissage** : 3 heures
