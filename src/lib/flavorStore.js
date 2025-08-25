import { writable } from 'svelte/store';

// Create flavor store with persistence
function createFlavorStore() {
  // Try to get saved flavor from localStorage, default to 'generic'
  const savedFlavor = typeof window !== 'undefined' 
    ? localStorage.getItem('archpath-flavor') || 'generic'
    : 'generic';

  const { subscribe, set } = writable(savedFlavor);

  return {
    subscribe,
    set: (flavor) => {
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('archpath-flavor', flavor);
      }
      set(flavor);
    },
    reset: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('archpath-flavor');
      }
      set('generic');
    }
  };
}

export const currentFlavor = createFlavorStore();