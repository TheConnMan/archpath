<script>
  import { createEventDispatcher } from 'svelte';
  import ComponentPalette from './ComponentPalette.svelte';
  import { componentData } from './componentData.js';
  import { calculatePhaseScore, getPhaseDescription } from './gameData.js';
  
  export let company;
  export let currentPhase;
  
  const dispatch = createEventDispatcher();
  
  const phases = [
    { id: 'mvp', name: 'MVP', description: 'Minimum viable product to launch' },
    { id: 'scale1', name: 'First Scale', description: 'First scaling challenges (10K-100K users)' },
    { id: 'scale2', name: 'Growth Scale', description: 'Major scaling point (100K-1M+ users)' },
    { id: 'enterprise', name: 'Enterprise', description: 'Enterprise features and global scale' }
  ];
  
  let selectedComponents = [];
  let score = 0;
  let phaseComplete = false;
  let lastPhaseResult = null;
  
  function handleComponentSelect(event) {
    const component = event.detail.component;
    if (!selectedComponents.includes(component.id)) {
      selectedComponents = [...selectedComponents, component.id];
    }
  }
  
  function removeComponent(componentId) {
    selectedComponents = selectedComponents.filter(id => id !== componentId);
  }
  
  function submitPhase() {
    // Calculate score using the proper scoring system
    const result = calculatePhaseScore(company.id, currentPhase, selectedComponents);
    score += result.score;
    lastPhaseResult = result;
    phaseComplete = true;
    
    // Save progress to localStorage
    const progress = {
      company: company.id,
      currentPhase,
      totalScore: score,
      completedPhases: [currentPhase]
    };
    localStorage.setItem('archpath-progress', JSON.stringify(progress));
    
    setTimeout(() => {
      if (phases.findIndex(p => p.id === currentPhase) < phases.length - 1) {
        const currentIndex = phases.findIndex(p => p.id === currentPhase);
        currentPhase = phases[currentIndex + 1].id;
        selectedComponents = [];
        phaseComplete = false;
        lastPhaseResult = null;
      }
    }, 3000);
  }
  
  function handleBackToMenu() {
    dispatch('backToMenu');
  }
  
  $: currentPhaseData = phases.find(p => p.id === currentPhase);
</script>

<div class="max-w-7xl mx-auto">
  <!-- Game Header -->
  <div class="flex items-center justify-between mb-6">
    <div class="flex items-center space-x-4">
      <button 
        class="btn-secondary"
        on:click={handleBackToMenu}
      >
        ← Back to Menu
      </button>
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
          <span class="text-gray-200 font-semibold text-lg">{company.name.charAt(0)}</span>
        </div>
        <div>
          <h1 class="text-2xl font-bold">{company.name} Architecture Challenge</h1>
          <p class="text-gray-400">{company.description}</p>
        </div>
      </div>
    </div>
    
    <div class="text-right">
      <div class="text-sm text-gray-400">Phase Score</div>
      <div class="text-2xl font-bold text-gray-100">{score}</div>
    </div>
  </div>
  
  <!-- Phase Progress -->
  <div class="mb-8">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-semibold">
        Phase {phases.findIndex(p => p.id === currentPhase) + 1}: {currentPhaseData.name}
      </h2>
      <div class="flex space-x-2">
        {#each phases as phase, index}
          <div class="flex items-center">
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
              {phase.id === currentPhase ? 'bg-gray-700 border-gray-500 text-gray-100' : 
               phases.findIndex(p => p.id === currentPhase) > index ? 'bg-green-700 border-green-600 text-green-100' :
               'bg-transparent border-gray-600 text-gray-400'} border-2"
            >
              {index + 1}
            </div>
            {#if index < phases.length - 1}
              <div class="w-8 h-0.5 mx-2 
                {phases.findIndex(p => p.id === currentPhase) > index ? 'bg-green-600' : 'bg-gray-600'}"
              ></div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
    
    <div class="card">
      <p class="text-gray-400 mb-2">{currentPhaseData.description}</p>
      <p class="text-sm">
        <strong>Your task:</strong> Select the components {company.name} needs for this phase.
        Avoid over-engineering - start simple and scale appropriately.
      </p>
    </div>
  </div>
  
  <!-- Game Content -->
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
    <!-- Component Palette (Left Sidebar) -->
    <div class="lg:col-span-1">
      <ComponentPalette on:componentSelect={handleComponentSelect} />
    </div>
    
    <!-- Phase Area (Main Content) - Merged from PhaseArea.svelte -->
    <div class="lg:col-span-3 space-y-6">
      <!-- Challenge -->
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
  </div>
</div>