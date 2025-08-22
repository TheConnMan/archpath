<script>
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  const companies = [
    {
      id: 'netflix',
      name: 'Netflix',
      description: 'Video streaming platform',
      difficulty: 'Easy',
      logo: '🎬',
      color: 'bg-red-600',
      phases: ['DVD Monolith', 'Cloud Migration', 'Microservices', 'Global AI'],
      users: '230M+ subscribers',
      challenge: 'Scale video streaming globally'
    },
    {
      id: 'slack',
      name: 'Slack', 
      description: 'Real-time workplace communication',
      difficulty: 'Easy',
      logo: '💬',
      color: 'bg-purple-600',
      phases: ['MVP Chat', 'WebSocket Scaling', 'Enterprise', 'Shared Channels'],
      users: '18M+ daily users',
      challenge: 'Handle millions of concurrent connections'
    },
    {
      id: 'uber',
      name: 'Uber',
      description: 'Ride-sharing platform',
      difficulty: 'Hard',
      logo: '🚗',
      color: 'bg-black',
      phases: ['Monolith MVP', 'Geographic Scale', 'Microservices', 'Global Platform'], 
      users: '10,000+ cities',
      challenge: 'Real-time location matching at scale'
    },
    {
      id: 'spotify',
      name: 'Spotify',
      description: 'Music streaming & recommendations',
      difficulty: 'Medium',
      logo: '🎵',
      color: 'bg-green-600',
      phases: ['Music MVP', 'Mobile & ML', 'Microservices', 'AI Platform'],
      users: '400M+ users',
      challenge: 'Personalize music for millions of users'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      description: 'Photo & video social platform',
      difficulty: 'Medium',
      logo: '📸',
      color: 'bg-pink-600',
      phases: ['Django MVP', 'Scale Monolith', 'Facebook Integration', 'AI Platform'],
      users: '2B+ daily users',
      challenge: 'Scale Django to billions of users'
    }
  ];
  
  function selectCompany(company) {
    dispatch('companySelect', { company });
  }
  
  function getDifficultyColor(difficulty) {
    switch(difficulty) {
      case 'Easy': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'Hard': return 'text-red-400';
      default: return 'text-dark-muted';
    }
  }
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {#each companies as company}
    <div 
      class="card hover:bg-slate-700 cursor-pointer transition-all duration-200 hover:scale-105"
      on:click={() => selectCompany(company)}
      on:keydown={(e) => e.key === 'Enter' && selectCompany(company)}
      role="button"
      tabindex="0"
    >
      <!-- Company Header -->
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-center space-x-3">
          <div class="text-3xl">{company.logo}</div>
          <div>
            <h3 class="text-xl font-bold">{company.name}</h3>
            <p class="text-dark-muted text-sm">{company.description}</p>
          </div>
        </div>
        <span class="text-xs px-2 py-1 rounded-full bg-dark-bg {getDifficultyColor(company.difficulty)}">
          {company.difficulty}
        </span>
      </div>
      
      <!-- Company Stats -->
      <div class="mb-4 space-y-2">
        <div class="text-sm">
          <span class="text-dark-muted">Scale:</span>
          <span class="ml-2 font-mono">{company.users}</span>
        </div>
        <div class="text-sm">
          <span class="text-dark-muted">Challenge:</span>
          <span class="ml-2">{company.challenge}</span>
        </div>
      </div>
      
      <!-- Architecture Phases -->
      <div class="mb-4">
        <p class="text-xs text-dark-muted mb-2">Architecture Evolution:</p>
        <div class="flex flex-wrap gap-1">
          {#each company.phases as phase, index}
            <span class="text-xs px-2 py-1 rounded bg-dark-bg text-dark-muted">
              {index + 1}. {phase}
            </span>
          {/each}
        </div>
      </div>
      
      <!-- CTA -->
      <div class="pt-4 border-t border-dark-border">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-blue-400">Start Challenge →</span>
          <div class="flex space-x-1">
            {#each Array(4) as _, i}
              <div class="w-2 h-2 rounded-full bg-dark-border"></div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  {/each}
</div>

<!-- Info Section -->
<div class="mt-12 text-center">
  <div class="card max-w-2xl mx-auto">
    <h3 class="text-lg font-semibold mb-3">How to Play</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
      <div class="space-y-2">
        <div class="text-2xl">1️⃣</div>
        <h4 class="font-medium">Choose Components</h4>
        <p class="text-dark-muted">Select the right services for each scaling phase</p>
      </div>
      <div class="space-y-2">
        <div class="text-2xl">2️⃣</div>
        <h4 class="font-medium">Avoid Over-Engineering</h4>
        <p class="text-dark-muted">Start simple, scale when needed</p>
      </div>
      <div class="space-y-2">
        <div class="text-2xl">3️⃣</div>
        <h4 class="font-medium">Learn & Improve</h4>
        <p class="text-dark-muted">Get feedback and learn from real architectures</p>
      </div>
    </div>
  </div>
</div>