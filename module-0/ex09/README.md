# ex09 - Template Literals

## 🎯 Objectif

Maîtriser les template literals (backticks) pour créer des chaînes de caractères dynamiques et multi-lignes.

## 📝 Exercice

Implémentez les fonctions suivantes utilisant les template literals.

### Fonctions à implémenter

#### 1. `greet(name)`
Retourne un message de bienvenue.
```javascript
greet("Alice") // "Hello, Alice! Welcome to JavaScript."
```

#### 2. `formatPrice(product, price)`
Retourne une chaîne formatée avec le produit et le prix.
```javascript
formatPrice("Laptop", 999.99) // "Product: Laptop - Price: $999.99"
```

#### 3. `createHTMLCard(name, age, city)`
Crée une carte HTML multi-lignes avec les informations.
```javascript
createHTMLCard("Alice", 25, "Paris")
// Retourne:
// <div class="card">
//   <h2>Alice</h2>
//   <p>Age: 25</p>
//   <p>City: Paris</p>
// </div>
```

#### 4. `createURL(base, params)`
Crée une URL avec des paramètres query string.
```javascript
createURL("https://api.example.com/users", {id: 123, filter: "active"})
// "https://api.example.com/users?id=123&filter=active"
```

#### 5. `taggedTemplate(strings, ...values)`
Fonction de tagged template qui met les valeurs en majuscules.
```javascript
const result = taggedTemplate`Hello ${"world"}! Welcome to ${"javascript"}.`
// "Hello WORLD! Welcome to JAVASCRIPT."
```

## 🧪 Test

```bash
node test.js
```

## 💡 Indices

- Backticks: `` `texte ${expression}` ``
- Multi-lignes: utilisez les backticks directement
- Tagged templates: `function tag(strings, ...values)`
- `Object.entries()` pour les paramètres URL
