# Pattern : Tree BFS (Breadth-First Search)

## 🎯 Concept
Parcourir un arbre niveau par niveau (de gauche à droite) en utilisant une queue.

## 📋 Quand l'Utiliser
✅ Parcours niveau par niveau
✅ Trouver le plus court chemin dans un arbre
✅ Vue de l'arbre (left/right side view)
✅ Zigzag level order
✅ Calculer la largeur maximale

## ⏱️ Complexité
- **Temps** : O(n)
- **Espace** : O(w) - w = largeur maximale de l'arbre

## 🔑 Template

```javascript
// BFS avec queue
function levelOrder(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(currentLevel);
    }

    return result;
}
```

## 💻 Exemples

### Level Order Traversal (LeetCode 102)
```javascript
function levelOrder(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;
        const level = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            level.push(node.val);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(level);
    }

    return result;
}
```

### Zigzag Level Order (LeetCode 103)
```javascript
function zigzagLevelOrder(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];
    let leftToRight = true;

    while (queue.length > 0) {
        const levelSize = queue.length;
        const level = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();

            if (leftToRight) {
                level.push(node.val);
            } else {
                level.unshift(node.val);
            }

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(level);
        leftToRight = !leftToRight;
    }

    return result;
}
```

### Binary Tree Right Side View (LeetCode 199)
```javascript
function rightSideView(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();

            // Dernier nœud du niveau = vue de droite
            if (i === levelSize - 1) {
                result.push(node.val);
            }

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }

    return result;
}
```

### Average of Levels (LeetCode 637)
```javascript
function averageOfLevels(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;
        let sum = 0;

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            sum += node.val;

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(sum / levelSize);
    }

    return result;
}
```

### Level Order Bottom (LeetCode 107)
```javascript
function levelOrderBottom(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;
        const level = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            level.push(node.val);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.unshift(level); // Ajouter au début
    }

    return result;
}
```

## 🎯 Problèmes LeetCode
- ✅ Binary Tree Level Order (102) ⭐⭐⭐⭐⭐
- 🟨 Zigzag Level Order (103) ⭐⭐⭐⭐
- 🟨 Binary Tree Right Side View (199) ⭐⭐⭐⭐⭐
- ✅ Average of Levels (637)
- 🟨 Level Order Bottom (107)
- 🟨 Minimum Depth (111)

**Temps d'apprentissage** : 2 heures
