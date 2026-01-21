# Ex17 - Mixins & Composition

## Objectif
Maîtriser la composition d'objets et les mixins comme alternative à l'héritage classique.

## Contexte
"Prefer composition over inheritance" - Les mixins permettent de partager des comportements entre classes sans créer de hiérarchies rigides.

## Instructions

### 1. `mixin(target, ...sources)`
Copier des méthodes de plusieurs sources.

### 2. `compose(...behaviors)`
Composer plusieurs comportements en un.

### 3. `createMixinFactory(behaviors)`
Créer des classes avec mixins dynamiques.

## Exemples

### Mixin basique
```javascript
const canFly = {
    fly() { return `${this.name} is flying`; },
    land() { return `${this.name} landed`; }
};

const canSwim = {
    swim() { return `${this.name} is swimming`; },
    dive() { return `${this.name} dived`; }
};

function mixin(target, ...sources) {
    for (const source of sources) {
        for (const key of Object.keys(source)) {
            target[key] = source[key];
        }
    }
    return target;
}

class Duck {
    constructor(name) { this.name = name; }
    quack() { return 'Quack!'; }
}

mixin(Duck.prototype, canFly, canSwim);

const donald = new Duck('Donald');
donald.fly();   // "Donald is flying"
donald.swim();  // "Donald is swimming"
donald.quack(); // "Quack!"
```

### Composition fonctionnelle
```javascript
const withPosition = (state) => ({
    getPosition: () => ({ x: state.x, y: state.y }),
    setPosition: (x, y) => { state.x = x; state.y = y; }
});

const withHealth = (state) => ({
    getHealth: () => state.health,
    damage: (amount) => { state.health -= amount; },
    heal: (amount) => { state.health += amount; }
});

const withInventory = (state) => ({
    getInventory: () => [...state.inventory],
    addItem: (item) => state.inventory.push(item),
    removeItem: (item) => {
        const idx = state.inventory.indexOf(item);
        if (idx > -1) state.inventory.splice(idx, 1);
    }
});

function createPlayer(name) {
    const state = {
        name,
        x: 0,
        y: 0,
        health: 100,
        inventory: []
    };

    return {
        name: state.name,
        ...withPosition(state),
        ...withHealth(state),
        ...withInventory(state)
    };
}

const player = createPlayer('Hero');
player.setPosition(10, 20);
player.damage(25);
player.addItem('sword');
```

### Factory avec mixins conditionnels
```javascript
function createEntity(type, name) {
    const state = { name, x: 0, y: 0, health: 100 };

    const base = {
        name: state.name,
        ...withPosition(state),
        ...withHealth(state)
    };

    const mixins = {
        player: () => ({ ...withInventory(state) }),
        enemy: () => ({
            attack: (target) => target.damage(10)
        }),
        npc: () => ({
            talk: () => `Hello, I'm ${state.name}`
        })
    };

    return { ...base, ...(mixins[type]?.() || {}) };
}

const hero = createEntity('player', 'Hero');
const goblin = createEntity('enemy', 'Goblin');
const merchant = createEntity('npc', 'Bob');
```

## Tests
```bash
node ex17/test.js
```

## Concepts
- Mixins
- Composition
- Traits
- Multiple inheritance simulation
- Conflict resolution
