<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  const companies = [
    // Original Tech Companies
    {
      id: 'netflix',
      name: 'Netflix',
      description: 'Video streaming platform',
      difficulty: 'Easy',
      phases: ['DVD Monolith', 'Cloud Migration', 'Microservices', 'Global AI'],
      users: '230M+ subscribers',
      challenge: 'Scale video streaming globally',
      category: 'Tech',
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Real-time workplace communication',
      difficulty: 'Easy',
      phases: ['MVP Chat', 'WebSocket Scaling', 'Enterprise', 'Shared Channels'],
      users: '18M+ daily users',
      challenge: 'Handle millions of concurrent connections',
      category: 'Tech',
    },
    {
      id: 'uber',
      name: 'Uber',
      description: 'Ride-sharing platform',
      difficulty: 'Hard',
      phases: ['Monolith MVP', 'Geographic Scale', 'Microservices', 'Global Platform'],
      users: '10,000+ cities',
      challenge: 'Real-time location matching at scale',
      category: 'Tech',
    },
    {
      id: 'spotify',
      name: 'Spotify',
      description: 'Music streaming & recommendations',
      difficulty: 'Medium',
      phases: ['Music MVP', 'Mobile & ML', 'Microservices', 'AI Platform'],
      users: '400M+ users',
      challenge: 'Personalize music for millions of users',
      category: 'Tech',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      description: 'Photo & video social platform',
      difficulty: 'Medium',
      phases: ['Django MVP', 'Scale Monolith', 'Facebook Integration', 'AI Platform'],
      users: '2B+ daily users',
      challenge: 'Scale Django to billions of users',
      category: 'Tech',
    },
    // Finance Companies
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Payment processing platform',
      difficulty: 'Medium',
      phases: ['Simple API', 'Global Payments', 'Platform Scale', 'Adaptive Finance'],
      users: '$1T+ processed',
      challenge: 'Build global payment infrastructure',
      category: 'Finance',
    },
    {
      id: 'monzo',
      name: 'Monzo',
      description: 'Digital banking platform',
      difficulty: 'Hard',
      phases: ['Prepaid MVP', 'Banking License', 'Full Service', 'Financial Super-App'],
      users: '7M+ customers',
      challenge: 'Scale microservices banking architecture',
      category: 'Finance',
    },
    {
      id: 'robinhood',
      name: 'Robinhood',
      description: 'Commission-free trading platform',
      difficulty: 'Hard',
      phases: ['Trading MVP', 'Market Data', 'Multi-Asset', 'Global Marketplace'],
      users: '24M+ accounts',
      challenge: 'Handle volatile trading spikes',
      category: 'Finance',
    },
    // Ecommerce Companies
    {
      id: 'shopify',
      name: 'Shopify',
      description: 'Multi-tenant commerce platform',
      difficulty: 'Hard',
      phases: ['Store Builder', 'Platform Scale', 'Black Friday', 'Commerce OS'],
      users: '5.6M+ merchants',
      challenge: 'Scale multi-tenant commerce globally',
      category: 'Ecommerce',
    },
    {
      id: 'doordash',
      name: 'DoorDash',
      description: 'Real-time delivery logistics',
      difficulty: 'Hard',
      phases: ['Local Delivery', 'Multi-City', 'ML Optimization', 'Autonomous Logistics'],
      users: '32M+ users',
      challenge: 'Coordinate three-sided marketplace at scale',
      category: 'Ecommerce',
    },
    {
      id: 'etsy',
      name: 'Etsy',
      description: 'Creative marketplace platform',
      difficulty: 'Medium',
      phases: ['Handmade MVP', 'Search Scale', 'Personalization', 'Creative Economy'],
      users: '96M+ buyers',
      challenge: 'Enable discovery in long-tail marketplace',
      category: 'Ecommerce',
    },
  ];

  function selectCompany(company) {
    dispatch('companySelect', { company });
  }

  function getDifficultyColor(difficulty) {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-400 bg-green-400 bg-opacity-20';
      case 'Medium':
        return 'text-yellow-400 bg-yellow-400 bg-opacity-20';
      case 'Hard':
        return 'text-red-400 bg-red-400 bg-opacity-20';
      default:
        return 'text-gray-400 bg-gray-400 bg-opacity-20';
    }
  }

  function getCategoryColor(category) {
    switch (category) {
      case 'Tech':
        return 'text-blue-400 bg-blue-400 bg-opacity-20';
      case 'Finance':
        return 'text-emerald-400 bg-emerald-400 bg-opacity-20';
      case 'Ecommerce':
        return 'text-purple-400 bg-purple-400 bg-opacity-20';
      default:
        return 'text-gray-400 bg-gray-400 bg-opacity-20';
    }
  }

  // Group companies by category
  $: groupedCompanies = companies.reduce((groups, company) => {
    const category = company.category || 'Tech';
    if (!groups[category]) groups[category] = [];
    groups[category].push(company);
    return groups;
  }, {});

  const categoryOrder = ['Tech', 'Finance', 'Ecommerce'];
</script>

{#each categoryOrder as category}
  {#if groupedCompanies[category]}
    <div class="mb-8">
      <!-- Category Header -->
      <div class="flex items-center space-x-3 mb-6">
        <h2 class="text-2xl font-bold text-gray-100">{category} Companies</h2>
        <span class="px-3 py-1 rounded-full text-sm font-medium {getCategoryColor(category)}">
          {groupedCompanies[category].length} companies
        </span>
      </div>

      <!-- Companies Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {#each groupedCompanies[category] as company}
          <button
            class="company-card text-left w-full group"
            on:click={() => selectCompany(company)}
          >
            <!-- Header -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                  <span class="text-gray-200 font-semibold text-lg">{company.name.charAt(0)}</span>
                </div>
                <div>
                  <h3
                    class="font-semibold text-lg text-gray-100 group-hover:text-white transition-colors"
                  >
                    {company.name}
                  </h3>
                  <p class="text-sm text-gray-400">{company.description}</p>
                </div>
              </div>
              <div class="flex space-x-2">
                <span
                  class="px-2 py-1 rounded-md text-xs font-medium {getCategoryColor(
                    company.category
                  )}"
                >
                  {company.category}
                </span>
                <span
                  class="px-2 py-1 rounded-md text-xs font-medium {getDifficultyColor(
                    company.difficulty
                  )}"
                >
                  {company.difficulty}
                </span>
              </div>
            </div>

            <!-- Stats -->
            <div class="space-y-2 mb-4">
              <div class="flex justify-between text-sm">
                <span class="text-gray-400">Scale:</span>
                <span class="text-gray-200">{company.users}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-400">Challenge:</span>
                <span class="text-gray-200 ml-2">{company.challenge}</span>
              </div>
            </div>

            <!-- Architecture Evolution -->
            <div class="mb-4">
              <p class="text-sm font-medium text-gray-300 mb-2">Architecture Evolution:</p>
              <div class="grid grid-cols-2 gap-2">
                {#each company.phases as phase, index}
                  <div class="text-xs text-gray-400 bg-gray-700 bg-opacity-50 px-2 py-1 rounded">
                    {index + 1}. {phase}
                  </div>
                {/each}
              </div>
            </div>

            <!-- Action -->
            <div class="text-center pt-3 border-t border-gray-700">
              <span class="text-gray-300 group-hover:text-gray-100 transition-colors font-medium">
                Start Challenge →
              </span>
            </div>
          </button>
        {/each}
      </div>
    </div>
  {/if}
{/each}

<!-- How to Play Section -->
<div class="card max-w-4xl mx-auto">
  <h3 class="font-semibold text-lg mb-6 text-gray-100">How to Play</h3>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="text-center">
      <div class="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-3">
        <span class="text-gray-100 font-bold">1</span>
      </div>
      <h4 class="font-medium text-gray-200 mb-2">Choose Components</h4>
      <p class="text-sm text-gray-400">Select the right services for each scaling phase</p>
    </div>
    <div class="text-center">
      <div class="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-3">
        <span class="text-gray-100 font-bold">2</span>
      </div>
      <h4 class="font-medium text-gray-200 mb-2">Avoid Over-Engineering</h4>
      <p class="text-sm text-gray-400">Start simple, scale when needed</p>
    </div>
    <div class="text-center">
      <div class="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-3">
        <span class="text-gray-100 font-bold">3</span>
      </div>
      <h4 class="font-medium text-gray-200 mb-2">Learn & Improve</h4>
      <p class="text-sm text-gray-400">Get feedback and learn from real architectures</p>
    </div>
  </div>
</div>
