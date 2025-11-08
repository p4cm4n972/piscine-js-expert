# 📐 Mémo : Patterns Mathématiques en Algorithmique

## 🔢 1. Manipulation de Chiffres (Base 10)

### Extraire le dernier chiffre
```javascript
let dernier = n % 10;
// Exemple: 1234 % 10 = 4
```

### Retirer le dernier chiffre
```javascript
n = Math.floor(n / 10);
// Exemple: Math.floor(1234 / 10) = 123
```

### Inverser un nombre
```javascript
let rev = 0;
while (n > 0) {
    let digit = n % 10;
    rev = rev * 10 + digit;
    n = Math.floor(n / 10);
}
// Exemple: 1234 → 4321
```

### Compter les chiffres
```javascript
let count = 0;
while (n > 0) {
    count++;
    n = Math.floor(n / 10);
}
// Ou: count = Math.floor(Math.log10(n)) + 1
```

### Somme des chiffres
```javascript
let sum = 0;
while (n > 0) {
    sum += n % 10;
    n = Math.floor(n / 10);
}
// Exemple: 1234 → 1+2+3+4 = 10
```

---

## 🎯 2. Nombres Premiers

### Vérifier si premier (méthode optimisée)
```javascript
function isPrime(n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;

    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
}
```

### Crible d'Ératosthène (tous les premiers jusqu'à n)
```javascript
function sieveOfEratosthenes(n) {
    const primes = new Array(n + 1).fill(true);
    primes[0] = primes[1] = false;

    for (let i = 2; i * i <= n; i++) {
        if (primes[i]) {
            for (let j = i * i; j <= n; j += i) {
                primes[j] = false;
            }
        }
    }
    return primes.map((isPrime, num) => isPrime ? num : null)
                 .filter(x => x !== null);
}
```

---

## 🔄 3. PGCD et PPCM

### PGCD - Plus Grand Commun Diviseur (Algorithme d'Euclide)
```javascript
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}
// Exemple: gcd(48, 18) = 6
```

### PPCM - Plus Petit Commun Multiple
```javascript
function lcm(a, b) {
    return (a * b) / gcd(a, b);
}
// Exemple: lcm(12, 18) = 36
```

---

## 💾 4. Manipulation de Bits

### Vérifier si puissance de 2
```javascript
(n > 0) && (n & (n - 1)) === 0
// Exemple: 8 → true, 10 → false
```

### Compter les bits à 1
```javascript
function countBits(n) {
    let count = 0;
    while (n > 0) {
        count += n & 1;
        n >>= 1;
    }
    return count;
}
// Ou: n.toString(2).split('1').length - 1
```

### Inverser les bits
```javascript
function reverseBits(n) {
    let result = 0;
    for (let i = 0; i < 32; i++) {
        result = (result << 1) | (n & 1);
        n >>= 1;
    }
    return result >>> 0;
}
```

### Opérations utiles
```javascript
// XOR swap (sans variable temporaire)
a ^= b; b ^= a; a ^= b;

// Trouver le bit de poids faible
n & -n

// Retirer le bit de poids faible
n & (n - 1)
```

---

## 📊 5. Puissances et Racines

### Puissance rapide (exponentiation)
```javascript
function power(x, n) {
    if (n === 0) return 1;
    if (n < 0) return 1 / power(x, -n);

    let half = power(x, Math.floor(n / 2));
    if (n % 2 === 0) return half * half;
    return half * half * x;
}
// Complexité: O(log n)
```

### Racine carrée entière
```javascript
function sqrt(n) {
    if (n < 2) return n;
    let left = 1, right = Math.floor(n / 2);

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (mid * mid === n) return mid;
        if (mid * mid < n) left = mid + 1;
        else right = mid - 1;
    }
    return right;
}
```

---

## 🔁 6. Fibonacci

### Itératif (optimal)
```javascript
function fibonacci(n) {
    if (n <= 1) return n;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        [a, b] = [b, a + b];
    }
    return b;
}
```

### Récursif avec mémoïsation
```javascript
function fib(n, memo = {}) {
    if (n <= 1) return n;
    if (memo[n]) return memo[n];
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    return memo[n];
}
```

---

## 🎲 7. Factorielle et Combinatoire

### Factorielle
```javascript
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
// Ou itératif
function factorial(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
}
```

### Coefficient binomial C(n, k)
```javascript
function binomial(n, k) {
    if (k > n - k) k = n - k; // Optimisation
    let result = 1;
    for (let i = 0; i < k; i++) {
        result *= (n - i);
        result /= (i + 1);
    }
    return result;
}
```

### Permutations et Combinaisons
```javascript
// Permutations: P(n,k) = n!/(n-k)!
function permutations(n, k) {
    return factorial(n) / factorial(n - k);
}

// Combinaisons: C(n,k) = n!/(k!(n-k)!)
function combinations(n, k) {
    return factorial(n) / (factorial(k) * factorial(n - k));
}
```

---

## 📈 8. Arithmétique Modulaire

### Addition modulaire
```javascript
(a + b) % m
```

### Multiplication modulaire
```javascript
(a * b) % m
```

### Puissance modulaire
```javascript
function modPower(base, exp, mod) {
    let result = 1;
    base = base % mod;
    while (exp > 0) {
        if (exp % 2 === 1) result = (result * base) % mod;
        exp = Math.floor(exp / 2);
        base = (base * base) % mod;
    }
    return result;
}
```

---

## 🔍 9. Patterns de Recherche

### Binary Search (recherche dichotomique)
```javascript
function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
```

### Two Pointers
```javascript
// Palindrome
function isPalindrome(s) {
    let left = 0, right = s.length - 1;
    while (left < right) {
        if (s[left] !== s[right]) return false;
        left++;
        right--;
    }
    return true;
}
```

---

## 🎯 10. Complexités à Connaître

| Opération | Complexité | Exemple |
|-----------|------------|---------|
| Accès tableau | O(1) | `arr[i]` |
| Recherche linéaire | O(n) | `arr.indexOf()` |
| Recherche binaire | O(log n) | Binary search |
| Tri rapide moyen | O(n log n) | QuickSort |
| Tri à bulles | O(n²) | BubbleSort |
| Fibonacci récursif | O(2ⁿ) | Sans mémo |
| Fibonacci itératif | O(n) | Avec boucle |

---

## 💡 Formules Mathématiques Utiles

### Séries arithmétiques
```
Somme 1 à n: n(n+1)/2
Somme carrés: n(n+1)(2n+1)/6
```

### Séries géométriques
```
Somme 2⁰ à 2ⁿ⁻¹: 2ⁿ - 1
Somme aʳ: a(rⁿ-1)/(r-1)
```

### Logarithmes
```
log₂(n) = nombre de bits
log₁₀(n) = nombre de chiffres - 1
```

---

## 🚀 Patterns de Résolution

### 1. **Décomposition en base 10**
- Problème implique des chiffres → `% 10` et `/ 10`
- Exemples: palindrome, somme chiffres, inverser nombre

### 2. **Divisibilité**
- Multiple de n → `x % n === 0`
- Pair/impair → `x % 2 === 0`

### 3. **Puissances de 2**
- Bit manipulation → `&`, `|`, `^`, `<<`, `>>`
- Vérifier puissance → `(n & (n-1)) === 0`

### 4. **Optimisation √n**
- Facteurs vont par paires → boucler jusqu'à `√n`
- Exemples: isPrime, factorisation

### 5. **Récursion vs Itération**
- Récursion → Plus élégant, risque stack overflow
- Itération → Plus performant, moins de mémoire

---

## 📚 Ressources pour Approfondir

- **Livres**: "Introduction to Algorithms" (CLRS)
- **Sites**: LeetCode, HackerRank, Project Euler
- **Vidéos**: MIT OpenCourseWare - Mathematics for CS

---

**💪 La clé : Pratique, pratique, pratique !**

_Créé pour la Piscine JS Expert - Module 0 & suivants_
