<script>
  import { createEventDispatcher } from 'svelte';
  import { flavorOptions } from './componentData.js';

  const dispatch = createEventDispatcher();

  function selectFlavor(flavor) {
    dispatch('flavorSelect', { flavor: flavor.id });
  }

  function getFlavorIcon(flavorId) {
    switch (flavorId) {
      case 'aws':
        return '☁️';
      case 'gcp':
        return '🌐';
      case 'oss':
        return '⚡';
      default:
        return '🔧';
    }
  }

  function getFlavorColor(flavorId) {
    switch (flavorId) {
      case 'aws':
        return 'from-orange-600 to-yellow-500';
      case 'gcp':
        return 'from-blue-600 to-green-500';
      case 'oss':
        return 'from-purple-600 to-indigo-500';
      default:
        return 'from-gray-600 to-gray-500';
    }
  }
</script>

<div class="max-w-4xl mx-auto">
  <div class="text-center mb-12">
    <h1 class="text-4xl font-bold mb-4 text-gray-100">Choose Your Tech Stack</h1>
    <p class="text-lg text-gray-300 mb-2">Select your preferred technology flavor</p>
    <p class="text-gray-400">
      All components will use familiar terminology from your chosen stack
    </p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
    {#each flavorOptions as flavor}
      <button
        class="flavor-card group text-left w-full h-full"
        on:click={() => selectFlavor(flavor)}
      >
        <!-- Header with Icon and Gradient -->
        <div class="relative overflow-hidden rounded-t-xl bg-gradient-to-br {getFlavorColor(flavor.id)} p-6 mb-6">
          <div class="text-6xl mb-4">{getFlavorIcon(flavor.id)}</div>
          <h3 class="font-bold text-2xl text-white mb-2">{flavor.name}</h3>
          <p class="text-white text-opacity-90">{flavor.description}</p>
        </div>

        <!-- Examples Preview -->
        <div class="px-6 mb-6">
          <p class="text-sm font-medium text-gray-300 mb-3">Example Technologies:</p>
          <div class="grid grid-cols-2 gap-2">
            {#each flavor.examples as example}
              <div class="text-xs text-gray-300 bg-gray-700 bg-opacity-50 px-3 py-2 rounded-md">
                {example}
              </div>
            {/each}
          </div>
        </div>

        <!-- Action -->
        <div class="px-6 pb-6 text-center">
          <div class="bg-gray-700 group-hover:bg-gray-600 transition-colors rounded-lg py-3 px-4">
            <span class="text-gray-200 group-hover:text-white font-medium">
              Choose {flavor.name} →
            </span>
          </div>
        </div>
      </button>
    {/each}
  </div>

  <!-- What This Means Section -->
  <div class="card max-w-3xl mx-auto">
    <h3 class="font-semibold text-lg mb-4 text-gray-100">What This Means</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
      <div>
        <h4 class="font-medium text-gray-200 mb-2">Same Game Logic</h4>
        <p class="text-gray-400">Your choice is purely cosmetic - all scoring and gameplay remain identical regardless of flavor.</p>
      </div>
      <div>
        <h4 class="font-medium text-gray-200 mb-2">Familiar Terms</h4>
        <p class="text-gray-400">Instead of generic "Database", you'll see "RDS", "CloudSQL", or "PostgreSQL" based on your choice.</p>
      </div>
      <div>
        <h4 class="font-medium text-gray-200 mb-2">Mix and Match</h4>
        <p class="text-gray-400">You can still select components from different providers - architectural correctness matters, not consistency.</p>
      </div>
      <div>
        <h4 class="font-medium text-gray-200 mb-2">Switch Anytime</h4>
        <p class="text-gray-400">Change your flavor preference during gameplay to see how different providers solve the same challenges.</p>
      </div>
    </div>
  </div>
</div>

<style>
  .flavor-card {
    @apply bg-gray-800 border border-gray-700 rounded-xl hover:border-gray-600 transition-all duration-200 hover:shadow-lg;
  }
</style>