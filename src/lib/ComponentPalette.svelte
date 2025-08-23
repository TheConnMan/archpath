<script>
  import { createEventDispatcher } from 'svelte';
  import { components, categories } from './componentData.js';

  const dispatch = createEventDispatcher();
  
  export let selectedComponents = [];

  let selectedCategory = 'all';

  function selectComponent(component) {
    dispatch('componentToggle', { component });
  }

  function setCategory(categoryId) {
    selectedCategory = categoryId;
  }

  function getCategoryColor(categoryId) {
    const colors = {
      compute: 'border-orange-500 text-orange-400',
      database: 'border-purple-500 text-purple-400',
      storage: 'border-green-500 text-green-400',
      network: 'border-blue-500 text-blue-400',
      messaging: 'border-red-500 text-red-400',
      analytics: 'border-emerald-500 text-emerald-400',
      security: 'border-amber-500 text-amber-400',
    };
    return colors[categoryId] || 'border-gray-500 text-gray-400';
  }

  $: isSelected = (componentId) => {
    return selectedComponents.includes(componentId);
  };

  $: filteredComponents =
    selectedCategory === 'all'
      ? components
      : components.filter(c => c.category === selectedCategory);
</script>

<div class="card">
  <h3 class="font-semibold text-lg mb-4 text-gray-100">Components</h3>

  <!-- Category Filters -->
  <div class="flex flex-wrap gap-2 mb-6">
    {#each categories as category}
      <button
        class="px-3 py-1 rounded-md text-sm transition-colors border {selectedCategory ===
        category.id
          ? 'bg-gray-700 border-gray-500 text-gray-100'
          : 'border-gray-600 text-gray-400 hover:border-gray-500'}"
        on:click={() => setCategory(category.id)}
      >
        {category.name}
      </button>
    {/each}
  </div>

  <!-- Components Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
    {#each filteredComponents as component}
      <button
        class="component-chip text-left {getCategoryColor(component.category)} {isSelected(component.id) ? 'selected bg-gray-600 border-current border-2' : ''}"
        on:click={() => selectComponent(component)}
        title={component.tooltip}
      >
        <div class="flex items-center justify-between">
          <span class="font-medium">{component.name}</span>
          {#if isSelected(component.id)}
            <div class="text-green-400 font-bold">✓</div>
          {:else}
            <div class="w-2 h-2 rounded-full bg-current opacity-50"></div>
          {/if}
        </div>
      </button>
    {/each}
  </div>

  <!-- Help Text -->
  <div class="text-sm text-gray-400 bg-gray-700 bg-opacity-30 p-3 rounded-md">
    Click components to add/remove them from the current phase
  </div>
</div>
