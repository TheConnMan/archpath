<script>
  import { createEventDispatcher } from 'svelte';
  import { componentData } from './componentData.js';
  import { getPhaseDescription } from './gameData.js';
  
  export let selectedComponents;
  export let currentPhase;
  export let company;
  export let phaseComplete;
  export let lastPhaseResult = null;
  
  const dispatch = createEventDispatcher();
  
  function removeComponent(componentId) {
    dispatch('componentRemove', { componentId });
  }
  
  function submitPhase() {
    dispatch('submitPhase');
  }
</script>

<div class="space-y-6">
  <!-- Phase Description -->
  <div class="card">
    <h3 class="font-semibold mb-2">Challenge</h3>
    <p class="text-gray-400">{getPhaseDescription(currentPhase, company.id)}</p>
  </div>
  
  <!-- Selected Components -->
  <div class="card">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-semibold">Your Architecture ({selectedComponents.length} components)</h3>
      {#if selectedComponents.length > 0}
        <button 
          class="btn-primary"
          on:click={submitPhase}
          disabled={phaseComplete}
        >
          {phaseComplete ? '✅ Submitted' : 'Submit Phase'}
        </button>
      {/if}
    </div>
    
    {#if selectedComponents.length === 0}
      <div class="drop-zone text-center">
        <div class="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-3">
          <span class="text-gray-400 text-2xl">+</span>
        </div>
        <p class="text-gray-400">No components selected yet</p>
        <p class="text-sm text-gray-500 mt-2">Choose components from the left panel</p>
      </div>
    {:else}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {#each selectedComponents as componentId}
          {#if componentData[componentId]}
            <div class="component-chip bg-blue-600 text-white border-blue-400">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <span>{componentData[componentId].icon}</span>
                  <span class="text-sm">{componentData[componentId].name}</span>
                </div>
                <button
                  class="ml-2 hover:bg-red-500 rounded p-1 transition-colors"
                  on:click={() => removeComponent(componentId)}
                  title="Remove component"
                >
                  ✕
                </button>
              </div>
            </div>
          {/if}
        {/each}
      </div>
    {/if}
  </div>
  
  <!-- Feedback (shown after submission) -->
  {#if phaseComplete && lastPhaseResult}
    <div class="card bg-green-900 bg-opacity-20 border-green-500">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-green-400">Phase Complete!</h3>
        <div class="text-right">
          <div class="text-2xl font-bold text-green-400">+{lastPhaseResult.score}</div>
          <div class="text-sm text-green-300">{lastPhaseResult.completionRate}% completion</div>
        </div>
      </div>
      
      <!-- Feedback Messages -->
      <div class="space-y-2 mb-4">
        {#each lastPhaseResult.feedback as message}
          <p class="text-green-300 text-sm">{message}</p>
        {/each}
      </div>
      
      <!-- Score Breakdown -->
      {#if lastPhaseResult.breakdown && lastPhaseResult.breakdown.length > 0}
        <details class="text-green-300 text-sm">
          <summary class="cursor-pointer hover:text-green-200 mb-2">Score Breakdown</summary>
          <div class="space-y-1 ml-4">
            {#each lastPhaseResult.breakdown as item}
              <div class="flex justify-between">
                <span class="capitalize">{item.component.replace(/-/g, ' ')}: {item.reason}</span>
                <span class="font-mono {item.points > 0 ? 'text-green-400' : item.points < 0 ? 'text-red-400' : 'text-slate-400'}">
                  {item.points > 0 ? '+' : ''}{item.points}
                </span>
              </div>
            {/each}
          </div>
        </details>
      {/if}
      
      <p class="text-green-300 text-sm mt-4">
        Moving to the next challenge...
      </p>
    </div>
  {:else if phaseComplete}
    <div class="card bg-green-900 bg-opacity-20 border-green-500">
      <h3 class="font-semibold text-green-400 mb-2">Phase Complete!</h3>
      <p class="text-green-300">
        Good choices! You selected {selectedComponents.length} components for this phase.
        Moving to the next challenge...
      </p>
    </div>
  {/if}
  
  <!-- Hints -->
  <div class="card">
    <h4 class="font-medium mb-2 text-gray-200">Hints</h4>
    <ul class="text-sm text-gray-400 space-y-1">
      <li>• Start with the minimum components needed</li>
      <li>• Consider what breaks first at scale</li>
      <li>• Think about the company's core business model</li>
      <li>• Avoid over-engineering early phases</li>
    </ul>
  </div>
</div>