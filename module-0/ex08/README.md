# ex08 - Spread & Rest

## 🎯 Objectif

Maîtriser les opérateurs spread (`...`) et rest pour manipuler arrays et objects de manière immutable.

## 📝 Exercice

Implémentez les fonctions suivantes utilisant les opérateurs spread et rest.

### Fonctions à implémenter

#### 1. `mergeArrays(...arrays)`
Fusionne plusieurs tableaux en un seul.
```javascript
mergeArrays([1, 2], [3, 4], [5, 6]) // [1, 2, 3, 4, 5, 6]
```

#### 2. `cloneObject(obj)`
Clone un objet de manière shallow (copie superficielle).
```javascript
cloneObject({a: 1, b: 2}) // {a: 1, b: 2} (nouveau objet)
```

#### 3. `addProperty(obj, key, value)`
Retourne un nouvel objet avec la propriété ajoutée (immutable).
```javascript
addProperty({a: 1}, 'b', 2) // {a: 1, b: 2}
```

#### 4. `removeProperty(obj, key)`
Retourne un nouvel objet sans la propriété spécifiée.
```javascript
removeProperty({a: 1, b: 2, c: 3}, 'b') // {a: 1, c: 3}
```

#### 5. `getFirstAndRest(arr)`
Retourne un objet `{first, rest}` avec le premier élément et le reste du tableau.
```javascript
getFirstAndRest([1, 2, 3, 4]) // {first: 1, rest: [2, 3, 4]}
```

## 🧪 Test

```bash
node test.js
```

## 💡 Indices

- Spread: `...` pour décomposer arrays/objects
- Rest: `...` dans les paramètres de fonction ou destructuring
- Destructuring: `const {a, ...rest} = obj`
- Ne modifiez jamais l'objet/array original!
