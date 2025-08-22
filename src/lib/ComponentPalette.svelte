<script>
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  const components = [
    // Compute
    { id: 'web-server', name: 'Web Server', category: 'compute', icon: '🌐', color: 'bg-compute' },
    { id: 'app-server', name: 'App Server', category: 'compute', icon: '⚙️', color: 'bg-compute' },
    { id: 'lambda', name: 'Serverless', category: 'compute', icon: '⚡', color: 'bg-compute' },
    
    // Database
    { id: 'database', name: 'Database', category: 'database', icon: '🗄️', color: 'bg-database' },
    { id: 'cache', name: 'Cache', category: 'database', icon: '⚡', color: 'bg-database' },
    { id: 'search-engine', name: 'Search Engine', category: 'database', icon: '🔍', color: 'bg-database' },
    
    // Storage
    { id: 'file-storage', name: 'File Storage', category: 'storage', icon: '📁', color: 'bg-storage' },
    { id: 'cdn', name: 'CDN', category: 'storage', icon: '🌐', color: 'bg-storage' },
    { id: 'object-storage', name: 'Object Storage', category: 'storage', icon: '📦', color: 'bg-storage' },
    
    // Networking  
    { id: 'load-balancer', name: 'Load Balancer', category: 'network', icon: '⚖️', color: 'bg-network' },
    { id: 'api-gateway', name: 'API Gateway', category: 'network', icon: '🚪', color: 'bg-network' },
    { id: 'dns', name: 'DNS', category: 'network', icon: '🌐', color: 'bg-network' },
    
    // Messaging
    { id: 'message-queue', name: 'Message Queue', category: 'messaging', icon: '📬', color: 'bg-messaging' },
    { id: 'websockets', name: 'WebSockets', category: 'messaging', icon: '🔌', color: 'bg-messaging' },
    { id: 'event-streaming', name: 'Event Streaming', category: 'messaging', icon: '🌊', color: 'bg-messaging' },
    
    // Analytics
    { id: 'monitoring', name: 'Monitoring', category: 'analytics', icon: '📊', color: 'bg-analytics' },
    { id: 'logging', name: 'Logging', category: 'analytics', icon: '📝', color: 'bg-analytics' },
    { id: 'analytics', name: 'Analytics', category: 'analytics', icon: '📈', color: 'bg-analytics' },
    
    // Security
    { id: 'auth-service', name: 'Auth Service', category: 'security', icon: '🔐', color: 'bg-security' },
    { id: 'firewall', name: 'Firewall', category: 'security', icon: '🛡️', color: 'bg-security' },
    { id: 'encryption', name: 'Encryption', category: 'security', icon: '🔒', color: 'bg-security' },
  ];
  
  const categories = [
    { id: 'compute', name: 'Compute', icon: '⚙️' },
    { id: 'database', name: 'Database', icon: '🗄️' },
    { id: 'storage', name: 'Storage', icon: '📦' },
    { id: 'network', name: 'Network', icon: '🌐' },
    { id: 'messaging', name: 'Messaging', icon: '📬' },
    { id: 'analytics', name: 'Analytics', icon: '📊' },
    { id: 'security', name: 'Security', icon: '🔒' },
  ];
  
  let selectedCategory = null;
  
  function selectComponent(component) {
    dispatch('componentSelect', { component });
  }
  
  $: filteredComponents = selectedCategory 
    ? components.filter(c => c.category === selectedCategory)
    : components;
</script>

<div class="card">
  <h3 class="font-semibold mb-4 flex items-center space-x-2">
    <span>🧩</span>
    <span>Components</span>
  </h3>
  
  <!-- Category Filter -->
  <div class="mb-4">
    <div class="flex flex-wrap gap-2">
      <button
        class="text-xs px-2 py-1 rounded transition-colors
          {selectedCategory === null ? 'bg-blue-600 text-white' : 'bg-dark-bg text-dark-muted hover:text-dark-text'}"
        on:click={() => selectedCategory = null}
      >
        All
      </button>
      {#each categories as category}
        <button
          class="text-xs px-2 py-1 rounded transition-colors flex items-center space-x-1
            {selectedCategory === category.id ? 'bg-blue-600 text-white' : 'bg-dark-bg text-dark-muted hover:text-dark-text'}"
          on:click={() => selectedCategory = category.id}
        >
          <span>{category.icon}</span>
          <span>{category.name}</span>
        </button>
      {/each}
    </div>
  </div>
  
  <!-- Components Grid -->
  <div class="space-y-2 max-h-96 overflow-y-auto">
    {#each filteredComponents as component}
      <div
        class="component-chip {component.color} text-white border-white cursor-pointer"
        on:click={() => selectComponent(component)}
        on:keydown={(e) => e.key === 'Enter' && selectComponent(component)}
        role="button"
        tabindex="0"
      >
        <div class="flex items-center space-x-2">
          <span>{component.icon}</span>
          <span>{component.name}</span>
        </div>
      </div>
    {/each}
  </div>
  
  <div class="mt-4 text-xs text-dark-muted">
    💡 Click components to add them to the current phase
  </div>
</div>