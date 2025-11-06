# Ex06 - Async Control Flow

## Objectif
Implémenter des utilitaires de contrôle de flux asynchrone avancés.

## Contexte
En programmation asynchrone, il est souvent nécessaire de contrôler l'exécution de multiples opérations async : limiter la concurrence, retenter en cas d'échec, exécuter en séquence, etc. Ces patterns sont essentiels pour les applications robustes.

## Instructions

Implémentez les fonctions suivantes :

### 1. `retry(fn, options)`
Réexécute une fonction async en cas d'échec.

```javascript
retry(
    () => fetch('/api/data'),
    {
        maxAttempts: 3,
        delay: 1000,        // ms entre tentatives
        backoff: 2,         // multiplicateur (1000, 2000, 4000)
        shouldRetry: (err) => err.statusCode === 503
    }
)
```

### 2. `timeout(promise, ms)`
Rejette une promise si elle ne se résout pas dans le délai imparti.

```javascript
timeout(
    fetch('/slow-api'),
    5000  // 5 secondes max
)
```

### 3. `parallel(tasks, concurrency)`
Exécute des tâches asynchrones avec limite de concurrence.

```javascript
parallel(
    [task1, task2, task3, task4, task5],
    2  // Max 2 tâches simultanées
)
```

### 4. `waterfall(tasks)`
Exécute des tâches en séquence, passant le résultat à la suivante.

```javascript
waterfall([
    () => fetch('/user/1'),
    (user) => fetch(`/posts/${user.id}`),
    (posts) => posts.map(p => p.title)
])
```

### 5. `promisify(fn)`
Convertit une fonction callback-style en promise.

```javascript
const readFileAsync = promisify(fs.readFile);
await readFileAsync('file.txt', 'utf8');
```

## Contraintes
- Gestion robuste des erreurs
- Pas de librairies externes
- Performance optimale
- Support de l'annulation (bonus)

## Exemples détaillés

### retry - Tentatives avec backoff exponentiel
```javascript
let attempts = 0;
const unreliableAPI = async () => {
    attempts++;
    if (attempts < 3) throw new Error('Service unavailable');
    return 'Success!';
};

const result = await retry(unreliableAPI, {
    maxAttempts: 5,
    delay: 100,
    backoff: 2  // 100ms, 200ms, 400ms, 800ms
});
console.log(result); // 'Success!' (après 3 tentatives)
```

### timeout - Limite de temps
```javascript
const slowOperation = () => new Promise(resolve => {
    setTimeout(() => resolve('Done'), 5000);
});

try {
    await timeout(slowOperation(), 1000);
} catch (err) {
    console.log(err.message); // 'Operation timed out after 1000ms'
}
```

### parallel - Concurrence limitée
```javascript
// Traiter 100 URLs, mais max 5 en parallèle
const urls = [...]; // 100 URLs

const results = await parallel(
    urls.map(url => () => fetch(url)),
    5  // Concurrence max: 5
);

// Comparaison :
// Promise.all : 100 requêtes simultanées (peut surcharger)
// parallel(5) : jamais plus de 5 simultanées (contrôlé)
```

### waterfall - Pipeline asynchrone
```javascript
const processUser = await waterfall([
    // Étape 1 : Récupérer user
    async () => {
        const user = await db.getUser(123);
        return user;
    },
    // Étape 2 : Enrichir avec posts
    async (user) => {
        const posts = await db.getPosts(user.id);
        return { ...user, posts };
    },
    // Étape 3 : Calculer statistiques
    async (userData) => {
        const stats = await calculateStats(userData.posts);
        return { ...userData, stats };
    }
]);
```

### promisify - Callback vers Promise
```javascript
// Ancienne API callback
function readFile(path, encoding, callback) {
    fs.readFile(path, encoding, (err, data) => {
        if (err) callback(err);
        else callback(null, data);
    });
}

// Conversion en promise
const readFileAsync = promisify(readFile);

// Utilisation moderne
const content = await readFileAsync('config.json', 'utf8');
```

## Cas d'usage réels

### API avec retry et timeout
```javascript
async function fetchWithRetry(url) {
    return retry(
        () => timeout(fetch(url), 5000),
        { maxAttempts: 3, delay: 1000 }
    );
}
```

### Batch processing avec concurrence
```javascript
async function processLargeDataset(items) {
    return parallel(
        items.map(item => () => processItem(item)),
        10  // 10 workers
    );
}
```

### Pipeline de traitement
```javascript
const result = await waterfall([
    () => downloadImage(url),
    (img) => resizeImage(img, 800, 600),
    (resized) => addWatermark(resized),
    (final) => uploadToS3(final)
]);
```

## Tests
```bash
node ex06/test.js
```

## Concepts
- Concurrency vs Parallelism
- Backpressure
- Circuit breaker pattern
- Exponential backoff
- Callback to Promise conversion
- Task queuing

## Bonus
- Implémenter `throttle(fn, limit)` - Rate limiting
- Implémenter `debounce(fn, delay)` - Debouncing async
- Implémenter `queue()` - File d'attente avec priorité
- Support de AbortController pour annulation
