<script>
  import GameHeader from './lib/GameHeader.svelte';
  import FlavorSelector from './lib/FlavorSelector.svelte';
  import CompanySelector from './lib/CompanySelector.svelte';
  import GameView from './lib/GameView.svelte';
  import { currentFlavor } from './lib/flavorStore.js';

  // Game state
  let selectedCompany = null;
  let currentPhase = 'mvp';
  let gameStarted = false;
  let flavorSelected = false;

  // Check if flavor was already selected from localStorage
  currentFlavor.subscribe(flavor => {
    if (flavor && flavor !== 'generic') {
      flavorSelected = true;
    }
  });

  function handleFlavorSelect(event) {
    currentFlavor.set(event.detail.flavor);
    flavorSelected = true;
  }

  function handleCompanySelect(event) {
    selectedCompany = event.detail.company;
    gameStarted = true;
  }

  function handleBackToMenu() {
    selectedCompany = null;
    gameStarted = false;
    currentPhase = 'mvp';
  }

  function handleBackToFlavors() {
    flavorSelected = false;
    selectedCompany = null;
    gameStarted = false;
    currentPhase = 'mvp';
  }
</script>

<main class="min-h-screen bg-gray-900 text-gray-100">
  <GameHeader />

  <div class="container mx-auto px-4 py-8">
    {#if !flavorSelected}
      <!-- Flavor Selection Screen -->
      <FlavorSelector on:flavorSelect={handleFlavorSelect} />
    {:else if !gameStarted}
      <!-- Company Selection Screen -->
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-8">
          <h1 class="text-5xl font-bold mb-4 text-gray-100">ArchPath</h1>
          <p class="text-xl text-gray-300 mb-2">Learn architectural evolution of tech companies</p>
          <p class="text-gray-400 mb-4">
            Test your system design knowledge by categorizing components into scaling phases
          </p>
          <!-- Flavor change option -->
          <button 
            class="text-sm text-gray-400 hover:text-gray-300 underline"
            on:click={handleBackToFlavors}
          >
            Change Technology Stack
          </button>
        </div>

        <CompanySelector on:companySelect={handleCompanySelect} />
      </div>
    {:else}
      <!-- Game View -->
      <GameView
        company={selectedCompany}
        phase={currentPhase}
        on:backToMenu={handleBackToMenu}
        bind:currentPhase
      />
    {/if}
  </div>
</main>
