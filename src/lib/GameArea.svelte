<script>
  import { createEventDispatcher } from 'svelte';
  import ComponentPalette from './ComponentPalette.svelte';
  import PhaseArea from './PhaseArea.svelte';
  
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
  
  function handleComponentSelect(event) {
    const component = event.detail.component;
    if (!selectedComponents.includes(component.id)) {
      selectedComponents = [...selectedComponents, component.id];
    }
  }
  
  function handleComponentRemove(event) {
    const componentId = event.detail.componentId;
    selectedComponents = selectedComponents.filter(id => id !== componentId);
  }
  
  function handleSubmitPhase() {
    // Simple scoring for now - will be enhanced later
    score += selectedComponents.length * 10;
    phaseComplete = true;
    
    setTimeout(() => {
      if (phases.findIndex(p => p.id === currentPhase) < phases.length - 1) {
        const currentIndex = phases.findIndex(p => p.id === currentPhase);
        currentPhase = phases[currentIndex + 1].id;
        selectedComponents = [];
        phaseComplete = false;
      }
    }, 2000);
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
        <span class="text-3xl">{company.logo}</span>
        <div>
          <h1 class="text-2xl font-bold">{company.name} Architecture Challenge</h1>
          <p class="text-dark-muted">{company.description}</p>
        </div>
      </div>
    </div>
    
    <div class="text-right">
      <div class="text-sm text-dark-muted">Phase Score</div>
      <div class="text-2xl font-mono font-bold text-blue-400">{score}</div>
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
              {phase.id === currentPhase ? 'bg-blue-600 text-white' : 
               phases.findIndex(p => p.id === currentPhase) > index ? 'bg-green-600 text-white' :
               'bg-dark-surface text-dark-muted border border-dark-border'}"
            >
              {index + 1}
            </div>
            {#if index < phases.length - 1}
              <div class="w-8 h-0.5 mx-2 
                {phases.findIndex(p => p.id === currentPhase) > index ? 'bg-green-600' : 'bg-dark-border'}"
              ></div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
    
    <div class="card">
      <p class="text-dark-muted mb-2">{currentPhaseData.description}</p>
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
    
    <!-- Phase Area (Main Content) -->
    <div class="lg:col-span-3">
      <PhaseArea 
        {selectedComponents}
        {currentPhase}
        {company}
        {phaseComplete}
        on:componentRemove={handleComponentRemove}
        on:submitPhase={handleSubmitPhase}
      />
    </div>
  </div>
</div>