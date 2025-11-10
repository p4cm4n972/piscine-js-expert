# Pattern : Fast & Slow Pointers (Floyd's Cycle Detection)

## 🎯 Concept

Utiliser **deux pointeurs** qui se déplacent à des **vitesses différentes** (fast avance 2x plus vite que slow).

## 📋 Quand l'Utiliser

✅ Détecter un **cycle** dans une linked list
✅ Trouver le **milieu** d'une linked list
✅ Trouver le **kième élément** depuis la fin
✅ **Palindrome** sur linked list
✅ **Happy Number** et problèmes similaires

❌ Tableaux (utiliser Two Pointers classique)
❌ Besoin de garder l'historique

## ⏱️ Complexité

- **Temps** : O(n)
- **Espace** : O(1) - pas de structure auxiliaire

## 🔑 Template Principal

```javascript
/**
 * TEMPLATE : Fast & Slow Pointers (Tortoise & Hare)
 *
 * Utilisation : Cycle detection, trouver le milieu
 */
function fastSlowPointers(head) {
    let slow = head;
    let fast = head;

    // Fast avance de 2, slow de 1
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;

        // Si cycle détecté
        if (slow === fast) {
            return true; // ou autre traitement
        }
    }

    // Pas de cycle ou slow est au milieu
    return false; // ou return slow
}
```

## 💻 Exemples Détaillés

### Exemple 1 : Linked List Cycle (LeetCode 141)

```javascript
/**
 * Détecter si une linked list a un cycle
 */
function hasCycle(head) {
    if (!head || !head.next) return false;

    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) {
            return true; // Cycle détecté
        }
    }

    return false; // Pas de cycle
}

// Pourquoi ça marche ?
// Si cycle: fast finira par rattraper slow (comme sur une piste circulaire)
// Si pas de cycle: fast atteindra null
```

### Exemple 2 : Linked List Cycle II - Trouver le Début du Cycle (LeetCode 142)

```javascript
/**
 * Trouver le nœud où le cycle commence
 */
function detectCycle(head) {
    if (!head || !head.next) return null;

    let slow = head;
    let fast = head;
    let hasCycle = false;

    // Phase 1: Détecter le cycle
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) {
            hasCycle = true;
            break;
        }
    }

    if (!hasCycle) return null;

    // Phase 2: Trouver le début du cycle
    // Réinitialiser slow au head
    slow = head;

    // Avancer slow et fast de 1 chacun
    while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
    }

    return slow; // Point de départ du cycle
}
```

### Exemple 3 : Middle of Linked List (LeetCode 876)

```javascript
/**
 * Trouver le milieu d'une linked list
 * Si deux milieux, retourner le second
 */
function middleNode(head) {
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    return slow; // slow est au milieu
}

// Pourquoi ça marche ?
// Fast parcourt 2x plus vite que slow
// Quand fast atteint la fin, slow est au milieu
// Ex: 1→2→3→4→5, slow=3 quand fast=5
```

### Exemple 4 : Palindrome Linked List (LeetCode 234)

```javascript
/**
 * Vérifier si une linked list est un palindrome
 */
function isPalindrome(head) {
    if (!head || !head.next) return true;

    // Étape 1: Trouver le milieu avec fast/slow
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // Étape 2: Inverser la seconde moitié
    let secondHalf = reverseList(slow);

    // Étape 3: Comparer les deux moitiés
    let firstHalf = head;
    while (secondHalf) {
        if (firstHalf.val !== secondHalf.val) {
            return false;
        }
        firstHalf = firstHalf.next;
        secondHalf = secondHalf.next;
    }

    return true;
}

function reverseList(head) {
    let prev = null;
    let curr = head;

    while (curr) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }

    return prev;
}
```

### Exemple 5 : Happy Number (LeetCode 202)

```javascript
/**
 * Un nombre est "happy" si la suite de sommes de carrés
 * de ses chiffres aboutit à 1
 * Ex: 19 → 1²+9²=82 → 8²+2²=68 → ... → 1 ✅
 */
function isHappy(n) {
    function getNext(num) {
        let sum = 0;
        while (num > 0) {
            const digit = num % 10;
            sum += digit * digit;
            num = Math.floor(num / 10);
        }
        return sum;
    }

    let slow = n;
    let fast = n;

    // Fast/Slow pour détecter le cycle
    do {
        slow = getNext(slow);
        fast = getNext(getNext(fast));
    } while (slow !== fast);

    // Si slow=1, c'est un happy number
    return slow === 1;
}

// Pourquoi fast/slow ?
// Si pas happy, la suite va cycler → on détecte le cycle
// Si happy, slow et fast vont tous deux atteindre 1
```

### Exemple 6 : Remove Nth Node From End (LeetCode 19)

```javascript
/**
 * Supprimer le nième nœud depuis la fin
 */
function removeNthFromEnd(head, n) {
    const dummy = new ListNode(0);
    dummy.next = head;

    let slow = dummy;
    let fast = dummy;

    // Avancer fast de n+1 steps
    for (let i = 0; i <= n; i++) {
        fast = fast.next;
    }

    // Avancer les deux ensemble jusqu'à ce que fast atteigne la fin
    while (fast) {
        slow = slow.next;
        fast = fast.next;
    }

    // slow.next est le nœud à supprimer
    slow.next = slow.next.next;

    return dummy.next;
}
```

## 🎯 Problèmes LeetCode

### Easy
- ✅ Linked List Cycle (141) ⭐⭐⭐⭐⭐
- ✅ Middle of Linked List (876)
- ✅ Happy Number (202) ⭐⭐⭐⭐

### Medium
- 🟨 Linked List Cycle II (142) ⭐⭐⭐⭐⭐
- 🟨 Palindrome Linked List (234)
- 🟨 Remove Nth Node From End (19) ⭐⭐⭐⭐
- 🟨 Reorder List (143)
- 🟨 Find Duplicate Number (287) ⭐⭐⭐⭐

## 🧠 Checklist de Reconnaissance

Utilise Fast & Slow Pointers si :
- [ ] Linked list avec possible cycle
- [ ] Trouver le milieu d'une linked list
- [ ] Kième élément depuis la fin
- [ ] Palindrome check sur linked list
- [ ] Keywords : "cycle", "middle", "from end"
- [ ] O(1) espace requis

## ⚠️ Pièges Courants

### 1. Ne pas vérifier fast.next

```javascript
// ❌ ERREUR : ne vérifie que fast
while (fast) {
    slow = slow.next;
    fast = fast.next.next; // fast.next peut être null!
}

// ✅ CORRECT : vérifier fast ET fast.next
while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
}
```

### 2. Oublier le cas sans cycle

```javascript
// ✅ Toujours retourner false si pas de cycle
while (fast && fast.next) {
    // ...
    if (slow === fast) return true;
}
return false; // Important!
```

### 3. Mauvais placement initial

```javascript
// Pour trouver le milieu, si nombre pair de nœuds
// Choisir si tu veux le premier ou le second milieu

// Second milieu (le plus courant)
let slow = head;
let fast = head;

// Premier milieu
let slow = head;
let fast = head.next;
```

## 🔥 Templates à Mémoriser

```javascript
// CYCLE DETECTION
function hasCycle(head) {
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) return true;
    }
    return false;
}

// FIND MIDDLE
function findMiddle(head) {
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}

// NTH FROM END
function nthFromEnd(head, n) {
    let slow = head, fast = head;
    for (let i = 0; i < n; i++) fast = fast.next;
    while (fast) {
        slow = slow.next;
        fast = fast.next;
    }
    return slow;
}
```

**Temps d'apprentissage** : 2-3 heures
**Maîtrise** : Résoudre 10 problèmes
