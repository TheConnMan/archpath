<script>
  import GameHeader from './lib/GameHeader.svelte';
  import CompanySelector from './lib/CompanySelector.svelte';
  import GameArea from './lib/GameArea.svelte';
  
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

<main class="min-h-screen bg-slate-900 text-slate-100">
  <GameHeader />
  
  <div class="container mx-auto px-4 py-8">
    {#if !gameStarted}
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h1 class="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            ArchPath
          </h1>
          <p class="text-xl text-slate-400 mb-2">
            Guess the architectural evolution of tech giants
          </p>
          <p class="text-slate-400">
            Test your system design knowledge by categorizing components into scaling phases
          </p>
        </div>
        
        <CompanySelector on:companySelect={handleCompanySelect} />
      </div>
    {:else}
      <GameArea 
        company={selectedCompany} 
        phase={currentPhase}
        on:backToMenu={handleBackToMenu}
        bind:currentPhase
      />
    {/if}
  </div>
</main>
