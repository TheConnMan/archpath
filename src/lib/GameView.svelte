<script>
  import { createEventDispatcher } from 'svelte';
  import ComponentPalette from './ComponentPalette.svelte';
  import { componentData, getFlavoredComponentName, flavorOptions } from './componentData.js';
  import { currentFlavor } from './flavorStore.js';
  import {
    calculatePhaseScore,
    getPhaseDescription,
    getArchitecturalRationale,
  } from './gameData.js';

  // Subscribe to flavor changes
  let flavor = 'generic';
  currentFlavor.subscribe(f => flavor = f);

  export let company;
  export let currentPhase;

  const dispatch = createEventDispatcher();

  const phases = [
    { id: 'mvp', name: 'MVP', description: 'Minimum viable product to launch' },
    { id: 'scale1', name: 'First Scale', description: 'First scaling challenges (10K-100K users)' },
    { id: 'scale2', name: 'Growth Scale', description: 'Major scaling point (100K-1M+ users)' },
    { id: 'enterprise', name: 'Enterprise', description: 'Enterprise features and global scale' },
  ];

  let selectedComponents = [];
  let score = 0;
  let phaseComplete = false;
  let lastPhaseResult = null;
  let showArchitecturalRationale = false;
  let showFlavorSelector = false;

  // Restore progress from localStorage on component load
  function loadProgress() {
    const savedProgress = localStorage.getItem('archpath-progress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      if (progress.company === company.id) {
        score = progress.totalScore || 0;
        completedPhases = progress.completedPhases || [];

        // If we're on the same phase as saved, restore selection
        if (progress.currentPhase === currentPhase && progress.selectedComponents) {
          selectedComponents = progress.selectedComponents;
        }

        // If this phase was completed, mark it as complete and restore its components
        if (completedPhases.includes(currentPhase)) {
          phaseComplete = true;
          // Restore the components used to complete this phase
          const phaseKey = `${company.id}-${currentPhase}`;
          const phaseComponents = progress.phaseComponents?.[phaseKey] || [];
          selectedComponents = phaseComponents;
          // Re-calculate the result for display
          lastPhaseResult = calculatePhaseScore(company.id, currentPhase, selectedComponents);
        }
      }
    }
  }

  // Load progress when component mounts or company/phase changes
  $: if (company && currentPhase) {
    loadProgress();
  }

  function handleComponentToggle(event) {
    const component = event.detail.component;
    if (selectedComponents.includes(component.id)) {
      // Remove component if already selected
      selectedComponents = selectedComponents.filter(id => id !== component.id);
    } else {
      // Add component if not selected
      selectedComponents = [...selectedComponents, component.id];
    }
  }

  function removeComponent(componentId) {
    selectedComponents = selectedComponents.filter(id => id !== componentId);
  }

  // Track completed phases properly
  let completedPhases = [];

  function submitPhase() {
    // Calculate score using the proper scoring system
    const result = calculatePhaseScore(company.id, currentPhase, selectedComponents);
    score += result.score;
    lastPhaseResult = result;
    phaseComplete = true;

    // Add to completed phases
    if (!completedPhases.includes(currentPhase)) {
      completedPhases = [...completedPhases, currentPhase];
    }

    // Save progress to localStorage
    const savedProgress = JSON.parse(localStorage.getItem('archpath-progress') || '{}');
    const phaseComponents = savedProgress.phaseComponents || {};
    const phaseKey = `${company.id}-${currentPhase}`;
    phaseComponents[phaseKey] = selectedComponents;

    const progress = {
      company: company.id,
      currentPhase,
      totalScore: score,
      completedPhases: completedPhases,
      selectedComponents: selectedComponents, // Save current selection
      phaseComponents: phaseComponents, // Save components per phase
    };
    localStorage.setItem('archpath-progress', JSON.stringify(progress));
  }

  function nextPhase() {
    if (phases.findIndex(p => p.id === currentPhase) < phases.length - 1) {
      const currentIndex = phases.findIndex(p => p.id === currentPhase);
      const nextPhaseId = phases[currentIndex + 1].id;
      
      // Carry forward current components to next phase
      const carryForwardComponents = [...selectedComponents];
      
      currentPhase = nextPhaseId;
      selectedComponents = carryForwardComponents; // Keep previous selections
      phaseComplete = false;
      lastPhaseResult = null;
      showArchitecturalRationale = false;

      // Check if next phase was already completed and restore its additional components
      const savedProgress = JSON.parse(localStorage.getItem('archpath-progress') || '{}');
      const nextPhaseKey = `${company.id}-${nextPhaseId}`;
      if (savedProgress.phaseComponents?.[nextPhaseKey]) {
        // Merge with existing phase components (union of both sets)
        const existingPhaseComponents = savedProgress.phaseComponents[nextPhaseKey];
        selectedComponents = [...new Set([...carryForwardComponents, ...existingPhaseComponents])];
      }

      // Update progress with new phase
      const progress = {
        company: company.id,
        currentPhase: nextPhaseId,
        totalScore: score,
        completedPhases: completedPhases,
        selectedComponents: selectedComponents,
        phaseComponents: savedProgress.phaseComponents || {},
      };
      localStorage.setItem('archpath-progress', JSON.stringify(progress));
    }
  }

  function handleBackToMenu() {
    dispatch('backToMenu');
  }

  function toggleArchitecturalRationale() {
    showArchitecturalRationale = !showArchitecturalRationale;
  }

  function toggleFlavorSelector() {
    showFlavorSelector = !showFlavorSelector;
  }

  function selectFlavor(flavorId) {
    currentFlavor.set(flavorId);
    showFlavorSelector = false;
  }

  function closeFlavorSelector() {
    showFlavorSelector = false;
  }

  function getCurrentFlavorName() {
    const flavorOption = flavorOptions.find(f => f.id === flavor);
    return flavorOption ? flavorOption.name : 'Generic';
  }

  function getCategoryColorForSelected(categoryId) {
    const colors = {
      compute: 'border-orange-500',
      database: 'border-purple-500',
      storage: 'border-green-500',
      network: 'border-blue-500',
      messaging: 'border-red-500',
      analytics: 'border-emerald-500',
      security: 'border-amber-500',
    };
    return colors[categoryId] || 'border-gray-500';
  }

  $: currentPhaseData = phases.find(p => p.id === currentPhase);
  $: rationaleData = getArchitecturalRationale(company.id, currentPhase);
</script>

<div class="max-w-7xl mx-auto">
  <!-- Game Header -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
    <div class="flex items-center space-x-4">
      <button class="btn-secondary text-sm" on:click={handleBackToMenu}> ← Back to Menu </button>
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 rounded-lg flex items-center justify-center">
          <span class="text-gray-200 font-semibold text-sm sm:text-lg">{company.name.charAt(0)}</span>
        </div>
        <div class="min-w-0 flex-1">
          <h1 class="text-lg sm:text-2xl font-bold truncate">{company.name} Architecture Challenge</h1>
          <p class="text-gray-400 text-sm hidden sm:block">{company.description}</p>
        </div>
      </div>
    </div>

    <div class="flex items-center space-x-4">
      <!-- Flavor Toggle Button -->
      <div class="relative">
        <button 
          class="btn-secondary text-sm flex items-center space-x-2"
          on:click={toggleFlavorSelector}
          title="Change technology stack"
        >
          <span>⚙️</span>
          <span class="hidden sm:inline">{getCurrentFlavorName()}</span>
        </button>
        
        <!-- Flavor Dropdown -->
        {#if showFlavorSelector}
          <!-- Click outside overlay -->
          <div class="fixed inset-0 z-40" on:click={closeFlavorSelector} on:keydown={closeFlavorSelector} role="button" tabindex="-1"></div>
          <div class="absolute right-0 top-full mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-50 min-w-48">
            <div class="p-2">
              <div class="text-sm font-medium text-gray-300 mb-2">Technology Stack:</div>
              {#each flavorOptions as option}
                <button 
                  class="w-full text-left px-3 py-2 rounded-md text-sm transition-colors hover:bg-gray-700 flex items-center justify-between {flavor === option.id ? 'bg-gray-700 text-white' : 'text-gray-300'}"
                  on:click={() => selectFlavor(option.id)}
                >
                  <span>{option.name}</span>
                  {#if flavor === option.id}
                    <span class="text-green-400">✓</span>
                  {/if}
                </button>
              {/each}
            </div>
          </div>
        {/if}
      </div>

      <div class="text-right">
        <div class="text-sm text-gray-400">Phase Score</div>
        <div class="text-xl sm:text-2xl font-bold text-gray-100">{score}</div>
      </div>
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
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
              {phase.id === currentPhase
                ? 'bg-gray-700 border-gray-500 text-gray-100'
                : completedPhases.includes(phase.id)
                  ? 'bg-green-700 border-green-600 text-green-100'
                  : 'bg-transparent border-gray-600 text-gray-400'} border-2"
            >
              {completedPhases.includes(phase.id) ? '✓' : index + 1}
            </div>
            {#if index < phases.length - 1}
              <div
                class="w-8 h-0.5 mx-2
                {completedPhases.includes(phases[index].id) ? 'bg-green-600' : 'bg-gray-600'}"
              ></div>
            {/if}
          </div>
        {/each}
      </div>
    </div>

    <div class="card">
      <p class="text-gray-400 mb-2">{currentPhaseData.description}</p>
      <p class="text-sm">
        <strong>Your task:</strong> Select the components {company.name} needs for this phase. Avoid
        over-engineering - start simple and scale appropriately.
      </p>
    </div>
  </div>

  <!-- Game Content -->
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
    <!-- Component Palette (Left Sidebar) -->
    <div class="lg:col-span-1">
      <ComponentPalette {selectedComponents} on:componentToggle={handleComponentToggle} />
    </div>

    <!-- Phase Area (Main Content) - Merged from PhaseArea.svelte -->
    <div class="lg:col-span-3 space-y-6">
      <!-- Challenge -->
      <div class="card">
        <h3 class="font-semibold mb-4">Challenge</h3>
        <p class="text-gray-400">{getPhaseDescription(currentPhase, company.id)}</p>
      </div>

      <!-- Selected Components -->
      <div class="card">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold">Your Architecture ({selectedComponents.length} components)</h3>
          {#if selectedComponents.length > 0}
            <button class="btn-primary" on:click={submitPhase} disabled={phaseComplete}>
              {phaseComplete ? '✅ Submitted' : 'Submit Phase'}
            </button>
          {/if}
        </div>

        {#if selectedComponents.length === 0}
          <div class="drop-zone text-center">
            <div
              class="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-3"
            >
              <span class="text-gray-400 text-2xl">+</span>
            </div>
            <p class="text-gray-400">No components selected yet</p>
            <p class="text-sm text-gray-500 mt-2">Choose components from the left panel</p>
          </div>
        {:else}
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {#each selectedComponents as componentId}
              {#if componentData[componentId]}
                <div class="component-chip selected bg-gray-600 text-white {getCategoryColorForSelected(componentData[componentId].category)}">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                      <span class="text-sm">{getFlavoredComponentName(componentId, flavor)}</span>
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
                    <span class="capitalize"
                      >{item.component.replace(/-/g, ' ')}: {item.reason}</span
                    >
                    <span
                      class="font-mono {item.points > 0
                        ? 'text-green-400'
                        : item.points < 0
                          ? 'text-red-400'
                          : 'text-slate-400'}"
                    >
                      {item.points > 0 ? '+' : ''}{item.points}
                    </span>
                  </div>
                {/each}
              </div>
            </details>
          {/if}

          <!-- Architectural Rationale -->
          {#if rationaleData}
            <div class="mt-6 border-t border-green-600 pt-4">
              <button
                class="flex items-center justify-between w-full text-left text-green-300 hover:text-green-200 transition-colors"
                on:click={toggleArchitecturalRationale}
              >
                <h4 class="font-medium text-green-400">🎯 Why This Architecture Works</h4>
                <span
                  class="text-xl transform transition-transform {showArchitecturalRationale
                    ? 'rotate-180'
                    : ''}">▼</span
                >
              </button>

              {#if showArchitecturalRationale}
                <div class="mt-4 space-y-4 text-green-300 text-sm">
                  <div>
                    <h5 class="font-medium text-green-200 mb-2">{rationaleData.title}</h5>
                    <p class="text-green-300 leading-relaxed">{rationaleData.explanation}</p>
                  </div>

                  <div>
                    <h6 class="font-medium text-green-200 mb-2">Key Architectural Insights:</h6>
                    <ul class="space-y-1 ml-4">
                      {#each rationaleData.keyInsights as insight}
                        <li class="flex items-start">
                          <span class="text-green-400 mr-2 mt-1">•</span>
                          <span>{insight}</span>
                        </li>
                      {/each}
                    </ul>
                  </div>

                  <div>
                    <h6 class="font-medium text-green-200 mb-2">
                      Architectural Principles Applied:
                    </h6>
                    <ul class="space-y-1 ml-4">
                      {#each rationaleData.architecturalPrinciples as principle}
                        <li class="flex items-start">
                          <span class="text-blue-400 mr-2 mt-1">▶</span>
                          <span>{principle}</span>
                        </li>
                      {/each}
                    </ul>
                  </div>

                  {#if rationaleData.architectureLinks}
                    <div>
                      <h6 class="font-medium text-green-200 mb-2">
                        Real Company Architecture:
                      </h6>
                      <ul class="space-y-1 ml-4">
                        {#each rationaleData.architectureLinks as link}
                          <li class="flex items-start">
                            <span class="text-green-400 mr-2 mt-1">🔗</span>
                            <a 
                              href={link.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              class="text-green-300 hover:text-green-200 underline"
                            >
                              {link.title}
                            </a>
                          </li>
                        {/each}
                      </ul>
                    </div>
                  {/if}
                </div>
              {/if}
            </div>
          {/if}

          {#if phases.findIndex(p => p.id === currentPhase) < phases.length - 1}
            <div class="mt-4">
              <button class="btn-primary w-full" on:click={nextPhase}>
                Continue to Next Phase →
              </button>
            </div>
          {:else}
            <p class="text-green-300 text-sm mt-4">
              🎉 Congratulations! You've completed all phases for {company.name}!
            </p>
          {/if}
        </div>
      {:else if phaseComplete}
        <div class="card bg-green-900 bg-opacity-20 border-green-500">
          <h3 class="font-semibold text-green-400 mb-2">Phase Complete!</h3>
          <p class="text-green-300">
            Good choices! You selected {selectedComponents.length} components for this phase. Moving
            to the next challenge...
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
