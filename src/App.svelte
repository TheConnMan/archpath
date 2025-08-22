<script>
  import GameHeader from './lib/GameHeader.svelte';
  import CompanySelector from './lib/CompanySelector.svelte';
  import GameView from './lib/GameView.svelte';

  // Game state
  let selectedCompany = null;
  let currentPhase = 'mvp';
  let gameStarted = false;

  function handleCompanySelect(event) {
    selectedCompany = event.detail.company;
    gameStarted = true;
  }

  function handleBackToMenu() {
    selectedCompany = null;
    gameStarted = false;
    currentPhase = 'mvp';
  }
</script>

<main class="min-h-screen bg-gray-900 text-gray-100">
  <GameHeader />

  <div class="container mx-auto px-4 py-8">
    {#if !gameStarted}
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h1 class="text-5xl font-bold mb-4 text-gray-100">ArchPath</h1>
          <p class="text-xl text-gray-300 mb-2">Learn architectural evolution of tech companies</p>
          <p class="text-gray-400">
            Test your system design knowledge by categorizing components into scaling phases
          </p>
        </div>

        <CompanySelector on:companySelect={handleCompanySelect} />
      </div>
    {:else}
      <GameView
        company={selectedCompany}
        phase={currentPhase}
        on:backToMenu={handleBackToMenu}
        bind:currentPhase
      />
    {/if}
  </div>
</main>
