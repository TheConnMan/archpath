// Unified component data - single source of truth
export const components = [
  { id: 'web-server', name: 'Web Server', category: 'compute' },
  { id: 'app-server', name: 'App Server', category: 'compute' },
  { id: 'lambda', name: 'Serverless', category: 'compute' },
  { id: 'database', name: 'Database', category: 'database' },
  { id: 'cache', name: 'Cache', category: 'database' },
  { id: 'search-engine', name: 'Search Engine', category: 'database' },
  { id: 'file-storage', name: 'File Storage', category: 'storage' },
  { id: 'cdn', name: 'CDN', category: 'storage' },
  { id: 'object-storage', name: 'Object Storage', category: 'storage' },
  { id: 'load-balancer', name: 'Load Balancer', category: 'network' },
  { id: 'api-gateway', name: 'API Gateway', category: 'network' },
  { id: 'dns', name: 'DNS', category: 'network' },
  { id: 'message-queue', name: 'Message Queue', category: 'messaging' },
  { id: 'websockets', name: 'WebSockets', category: 'messaging' },
  { id: 'event-streaming', name: 'Event Streaming', category: 'messaging' },
  { id: 'monitoring', name: 'Monitoring', category: 'analytics' },
  { id: 'logging', name: 'Logging', category: 'analytics' },
  { id: 'analytics', name: 'Analytics', category: 'analytics' },
  { id: 'auth-service', name: 'Auth Service', category: 'security' },
  { id: 'firewall', name: 'Firewall', category: 'security' },
  { id: 'encryption', name: 'Encryption', category: 'security' }
];

// Create lookup object for easy component access
export const componentData = components.reduce((acc, component) => {
  acc[component.id] = component;
  return acc;
}, {});

// Category definitions
export const categories = [
  { id: 'all', name: 'All', components: [] },
  { id: 'compute', name: 'Compute', components: ['web-server', 'app-server', 'lambda'] },
  { id: 'database', name: 'Database', components: ['database', 'cache', 'search-engine'] },
  { id: 'storage', name: 'Storage', components: ['file-storage', 'cdn', 'object-storage'] },
  { id: 'network', name: 'Network', components: ['load-balancer', 'api-gateway', 'dns'] },
  { id: 'messaging', name: 'Messaging', components: ['message-queue', 'websockets', 'event-streaming'] },
  { id: 'analytics', name: 'Analytics', components: ['monitoring', 'logging', 'analytics'] },
  { id: 'security', name: 'Security', components: ['auth-service', 'firewall', 'encryption'] }
];