<script>
  import { createEventDispatcher } from 'svelte';
  
  export let selectedComponents;
  export let currentPhase;
  export let company;
  export let phaseComplete;
  
  const dispatch = createEventDispatcher();
  
  const componentData = {
    'web-server': { name: 'Web Server', icon: '🌐' },
    'app-server': { name: 'App Server', icon: '⚙️' },
    'lambda': { name: 'Serverless', icon: '⚡' },
    'database': { name: 'Database', icon: '🗄️' },
    'cache': { name: 'Cache', icon: '⚡' },
    'search-engine': { name: 'Search Engine', icon: '🔍' },
    'file-storage': { name: 'File Storage', icon: '📁' },
    'cdn': { name: 'CDN', icon: '🌐' },
    'object-storage': { name: 'Object Storage', icon: '📦' },
    'load-balancer': { name: 'Load Balancer', icon: '⚖️' },
    'api-gateway': { name: 'API Gateway', icon: '🚪' },
    'dns': { name: 'DNS', icon: '🌐' },
    'message-queue': { name: 'Message Queue', icon: '📬' },
    'websockets': { name: 'WebSockets', icon: '🔌' },
    'event-streaming': { name: 'Event Streaming', icon: '🌊' },
    'monitoring': { name: 'Monitoring', icon: '📊' },
    'logging': { name: 'Logging', icon: '📝' },
    'analytics': { name: 'Analytics', icon: '📈' },
    'auth-service': { name: 'Auth Service', icon: '🔐' },
    'firewall': { name: 'Firewall', icon: '🛡️' },
    'encryption': { name: 'Encryption', icon: '🔒' },
  };
  
  function removeComponent(componentId) {
    dispatch('componentRemove', { componentId });
  }
  
  function submitPhase() {
    dispatch('submitPhase');
  }
  
  function getPhaseDescription(phase, companyId) {
    const descriptions = {
      netflix: {
        mvp: "Netflix started as a DVD-by-mail service with basic web functionality. What components did they need to launch their simple catalog and user management system?",
        scale1: "10M users are now streaming video. What infrastructure is needed to deliver video content reliably at this scale?",
        scale2: "100M+ users globally, multiple content types. The original architecture is breaking. What's needed for the next level?",
        enterprise: "230M+ subscribers across 190 countries with AI recommendations. What enterprise-grade components are required?"
      },
      slack: {
        mvp: "Slack needs real-time messaging for small teams. What are the core components for a chat application?",
        scale1: "10K concurrent users, message history is getting slow. What components help scale real-time messaging?",
        scale2: "100K+ users, enterprise customers want advanced features. What's needed for the next growth phase?",
        enterprise: "Millions of users, shared channels across organizations. What enterprise features are required?"
      }
    };
    
    return descriptions[companyId]?.[phase] || `Choose the right components for ${phase} phase.`;
  }
</script>

<div class="space-y-6">
  <!-- Phase Description -->
  <div class="card">
    <h3 class="font-semibold mb-2">Challenge</h3>
    <p class="text-dark-muted">{getPhaseDescription(currentPhase, company.id)}</p>
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
        <div class="text-4xl mb-2">🧩</div>
        <p class="text-dark-muted">No components selected yet</p>
        <p class="text-sm text-dark-muted mt-2">Choose components from the left panel</p>
      </div>
    {:else}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {#each selectedComponents as componentId}
          {#if componentData[componentId]}
            <div class="component-chip bg-blue-600 text-white border-blue-400">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <span>{componentData[componentId].icon}</span>
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
  {#if phaseComplete}
    <div class="card bg-green-900 bg-opacity-20 border-green-500">
      <h3 class="font-semibold text-green-400 mb-2">🎉 Phase Complete!</h3>
      <p class="text-green-300">
        Good choices! You selected {selectedComponents.length} components for this phase.
        Moving to the next challenge...
      </p>
    </div>
  {/if}
  
  <!-- Hints -->
  <div class="card">
    <h4 class="font-medium mb-2">💡 Hints</h4>
    <ul class="text-sm text-dark-muted space-y-1">
      <li>• Start with the minimum components needed</li>
      <li>• Consider what breaks first at scale</li>
      <li>• Think about the company's core business model</li>
      <li>• Avoid over-engineering early phases</li>
    </ul>
  </div>
</div>