# Ex14 - Projet Final : Mini Framework Réactif

## Objectif
Créer un mini-framework réactif (style Vue/React) utilisant tous les concepts appris.

## Fonctionnalités

### 1. Réactivité avec Proxy
```javascript
const state = reactive({ count: 0 });
effect(() => {
    console.log('Count:', state.count);
});
state.count++; // Auto-trigger effect
```

### 2. Computed values
```javascript
const double = computed(() => state.count * 2);
```

### 3. Virtual DOM simple
```javascript
const vnode = h('div', { class: 'container' }, [
    h('h1', {}, 'Title'),
    h('p', {}, 'Content')
]);
```

### 4. Component system
```javascript
const Counter = {
    setup() {
        const count = ref(0);
        const increment = () => count.value++;
        return { count, increment };
    },
    render() {
        return h('button', { onClick: this.increment }, this.count);
    }
};
```

## Ce projet combine :
- Proxy (réactivité)
- Closures (state management)
- Generators (virtual DOM traversal)
- Async (lifecycle hooks)
- Performance (diffing algorithm)

## Tests
```bash
node ex14/test.js
```

C'est le projet final qui teste TOUS les concepts de la piscine !
