# Pattern : Merge Intervals

## 🎯 Concept
Fusionner ou manipuler des intervalles qui se chevauchent.

## 📋 Quand l'Utiliser
✅ Intervalles qui se chevauchent
✅ Fusionner/insérer des intervalles
✅ Trouver des plages disponibles
✅ Meeting rooms, calendriers

## ⏱️ Complexité
- **Temps** : O(n log n) - tri initial
- **Espace** : O(n) - résultat

## 🔑 Template

```javascript
function mergeIntervals(intervals) {
    if (intervals.length <= 1) return intervals;
    
    // Trier par début
    intervals.sort((a, b) => a[0] - b[0]);
    
    const merged = [intervals[0]];
    
    for (let i = 1; i < intervals.length; i++) {
        const current = intervals[i];
        const last = merged[merged.length - 1];
        
        // Chevauche ?
        if (current[0] <= last[1]) {
            // Fusionner
            last[1] = Math.max(last[1], current[1]);
        } else {
            // Pas de chevauchement
            merged.push(current);
        }
    }
    
    return merged;
}
```

## 💻 Exemples

### Merge Intervals (LeetCode 56)
```javascript
// Input: [[1,3],[2,6],[8,10],[15,18]]
// Output: [[1,6],[8,10],[15,18]]

function merge(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    const result = [intervals[0]];
    
    for (const interval of intervals.slice(1)) {
        const last = result[result.length - 1];
        
        if (interval[0] <= last[1]) {
            last[1] = Math.max(last[1], interval[1]);
        } else {
            result.push(interval);
        }
    }
    
    return result;
}
```

### Insert Interval (LeetCode 57)
```javascript
function insert(intervals, newInterval) {
    const result = [];
    let i = 0;
    
    // Ajouter tous avant le nouvel intervalle
    while (i < intervals.length && intervals[i][1] < newInterval[0]) {
        result.push(intervals[i++]);
    }
    
    // Fusionner les chevauchements
    while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    result.push(newInterval);
    
    // Ajouter les intervalles restants
    while (i < intervals.length) {
        result.push(intervals[i++]);
    }
    
    return result;
}
```

## 🎯 Problèmes LeetCode
- ✅ Merge Intervals (56) ⭐⭐⭐⭐⭐
- 🟨 Insert Interval (57) ⭐⭐⭐⭐
- 🟨 Meeting Rooms (252)
- 🟨 Meeting Rooms II (253) ⭐⭐⭐⭐⭐
- 🟨 Non-overlapping Intervals (435)

**Temps d'apprentissage** : 2 heures
