# Pattern : In-Place Reversal of Linked List

## 🎯 Concept
Inverser une linked list ou une partie sans utiliser d'espace supplémentaire.

## 📋 Quand l'Utiliser
✅ Inverser une linked list
✅ Inverser une sous-partie [m, n]
✅ Inverser par groupes de k
✅ Rotation de linked list

## ⏱️ Complexité
- **Temps** : O(n)
- **Espace** : O(1)

## 🔑 Template

```javascript
function reverseLinkedList(head) {
    let prev = null;
    let current = head;
    
    while (current) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    
    return prev; // Nouvelle tête
}
```

## 🎯 Problèmes LeetCode
- ✅ Reverse Linked List (206) ⭐⭐⭐⭐⭐
- 🟨 Reverse Linked List II (92) ⭐⭐⭐⭐
- 🟥 Reverse Nodes in k-Group (25) ⭐⭐⭐⭐⭐

**Temps d'apprentissage** : 2 heures
