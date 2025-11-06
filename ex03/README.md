# Ex03 - Functors & Maybe Monad

## Objectif
Implémenter le pattern Maybe (Option) Monad pour gérer les valeurs nullables de manière fonctionnelle.

## Contexte
Le Maybe Monad est un pattern fonctionnel qui encapsule une valeur qui peut être présente (Just/Some) ou absente (Nothing/None). Il permet d'éviter les vérifications null/undefined répétitives et les erreurs de type "Cannot read property 'x' of null".

## Instructions

Implémentez la classe `Maybe` avec :

### Constructeurs
- `Maybe.of(value)` - Crée un Maybe avec une valeur
- `Maybe.nothing()` - Crée un Maybe vide

### Méthodes
- `map(fn)` - Applique fn si la valeur existe
- `flatMap(fn)` - Applique fn (qui retourne un Maybe) et aplatit
- `filter(predicate)` - Retourne Nothing si predicate est faux
- `getOrElse(defaultValue)` - Extrait la valeur ou retourne default
- `isNothing()` - Vérifie si c'est Nothing
- `isJust()` - Vérifie si c'est Just

## Contraintes
- Immutable : toute opération retourne un nouveau Maybe
- Type-safe : gérer null et undefined
- Chainable : toutes les méthodes doivent retourner un Maybe
- Lazy evaluation si possible

## Exemples

### Problème sans Maybe (code fragile)
```javascript
function getUserEmail(userId) {
    const user = getUser(userId);
    if (!user) return null;

    const profile = user.profile;
    if (!profile) return null;

    const email = profile.email;
    if (!email) return null;

    return email.toLowerCase();
}
```

### Solution avec Maybe (code sûr)
```javascript
function getUserEmail(userId) {
    return Maybe.of(getUser(userId))
        .map(user => user.profile)
        .map(profile => profile.email)
        .map(email => email.toLowerCase())
        .getOrElse('no-email@example.com');
}
```

### Chaînage avancé
```javascript
const parseNumber = (str) => {
    const n = parseInt(str);
    return isNaN(n) ? Maybe.nothing() : Maybe.of(n);
};

Maybe.of('42')
    .flatMap(parseNumber)      // Maybe(42)
    .map(n => n * 2)           // Maybe(84)
    .filter(n => n > 50)       // Maybe(84) - passe le filtre
    .getOrElse(0);             // 84

Maybe.of('not a number')
    .flatMap(parseNumber)      // Maybe.nothing()
    .map(n => n * 2)           // Maybe.nothing() - map ignoré
    .getOrElse(0);             // 0
```

### Cas d'usage réel
```javascript
// Validation de formulaire
const validateAge = (age) =>
    Maybe.of(age)
        .filter(a => a >= 18)
        .filter(a => a < 120)
        .map(a => ({ valid: true, age: a }))
        .getOrElse({ valid: false, error: 'Invalid age' });

// Navigation sûre dans objets profonds
const getStreetName = (user) =>
    Maybe.of(user)
        .map(u => u.address)
        .map(addr => addr.street)
        .map(street => street.name)
        .getOrElse('Unknown street');

// Chaînage de opérations risquées
const processData = (data) =>
    Maybe.of(data)
        .map(parse)
        .map(validate)
        .map(transform)
        .filter(isValid)
        .getOrElse(defaultData);
```

## Tests
```bash
node ex03/test.js
```

## Concepts
- Monads
- Functors
- Null safety
- Railway-oriented programming
- Functional error handling
- Composition

## Bonus
Implémenter aussi :
- `Either` monad (Left/Right pour gestion d'erreurs)
- `fold(onNothing, onJust)` - Pattern matching
- `orElse(alternativeMaybe)` - Fournir un Maybe alternatif
