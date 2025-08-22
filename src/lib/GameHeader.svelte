<script>
  import { onMount } from 'svelte';

  let score = 0;
  let streak = 0;

  // Load progress from localStorage
  onMount(() => {
    const savedProgress = localStorage.getItem('archpath-progress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      score = progress.totalScore || 0;
      streak = progress.streak || 0;
    }
  });
</script>

<header class="bg-gray-800 border-b border-gray-700">
  <div class="container mx-auto px-4 py-4">
    <div class="flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center space-x-4">
        <div class="w-8 h-8 bg-gray-700 rounded-md flex items-center justify-center">
          <span class="text-gray-100 font-bold text-sm">AP</span>
        </div>
        <span class="text-lg font-semibold text-gray-100">ArchPath</span>
      </div>

      <!-- Stats -->
      <div class="flex items-center space-x-6">
        <div class="flex items-center space-x-2">
          <span class="text-gray-400 text-sm">Score:</span>
          <span class="font-mono font-bold text-gray-200">{score.toLocaleString()}</span>
        </div>

        {#if streak > 0}
          <div class="flex items-center space-x-2">
            <span class="text-gray-400 text-sm">Streak:</span>
            <span class="font-mono font-bold text-gray-200">{streak}</span>
          </div>
        {/if}

        <!-- GitHub link -->
        <a
          href="https://github.com/TheConnMan/archpath"
          target="_blank"
          rel="noopener noreferrer"
          class="text-gray-400 hover:text-gray-200 transition-colors"
          aria-label="View on GitHub"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
</header>
