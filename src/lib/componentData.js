// Unified component data - single source of truth with educational explanations
export const components = [
  {
    id: 'web-server',
    name: 'Web Server',
    category: 'compute',
    tooltip:
      'Serves static content (HTML, CSS, JS) to users. Examples: nginx, Apache. Essential for any web application.',
  },
  {
    id: 'app-server',
    name: 'App Server',
    category: 'compute',
    tooltip:
      'Runs business logic and dynamic content. Examples: Node.js, Java Spring, Python Django. Processes user requests.',
  },
  {
    id: 'lambda',
    name: 'Serverless',
    category: 'compute',
    tooltip:
      'Event-driven functions without server management. Examples: AWS Lambda, Vercel Functions. Good for sporadic workloads.',
  },
  {
    id: 'database',
    name: 'Database',
    category: 'database',
    tooltip:
      'Persistent data storage with ACID properties. Examples: PostgreSQL, MySQL. Critical for user data and transactions.',
  },
  {
    id: 'cache',
    name: 'Cache',
    category: 'database',
    tooltip:
      'Fast temporary storage for frequently accessed data. Examples: Redis, Memcached. Reduces database load.',
  },
  {
    id: 'search-engine',
    name: 'Search Engine',
    category: 'database',
    tooltip:
      'Full-text search across large datasets. Examples: Elasticsearch, Solr. Essential for content discovery.',
  },
  {
    id: 'file-storage',
    name: 'File Storage',
    category: 'storage',
    tooltip:
      'Store and serve files like images, videos, documents. Examples: AWS S3, Google Cloud Storage.',
  },
  {
    id: 'cdn',
    name: 'CDN',
    category: 'storage',
    tooltip:
      'Content Delivery Network caches content globally. Examples: CloudFlare, AWS CloudFront. Reduces latency.',
  },
  {
    id: 'object-storage',
    name: 'Object Storage',
    category: 'storage',
    tooltip:
      'Scalable storage for unstructured data. Examples: AWS S3, MinIO. Good for backups and large files.',
  },
  {
    id: 'load-balancer',
    name: 'Load Balancer',
    category: 'network',
    tooltip:
      'Distributes traffic across multiple servers. Examples: AWS ALB, nginx. Prevents server overload.',
  },
  {
    id: 'api-gateway',
    name: 'API Gateway',
    category: 'network',
    tooltip:
      'Single entry point for API requests. Handles routing, auth, rate limiting. Examples: Kong, AWS API Gateway.',
  },
  {
    id: 'dns',
    name: 'DNS',
    category: 'network',
    tooltip:
      'Domain Name System resolves domain names to IP addresses. Examples: Route 53, CloudFlare DNS.',
  },
  {
    id: 'message-queue',
    name: 'Message Queue',
    category: 'messaging',
    tooltip:
      'Async communication between services. Examples: RabbitMQ, AWS SQS. Enables loose coupling.',
  },
  {
    id: 'websockets',
    name: 'WebSockets',
    category: 'messaging',
    tooltip:
      'Real-time bidirectional communication. Essential for chat, live updates. Examples: Socket.io, native WebSocket.',
  },
  {
    id: 'event-streaming',
    name: 'Event Streaming',
    category: 'messaging',
    tooltip:
      'High-throughput event processing. Examples: Apache Kafka, AWS Kinesis. Good for real-time analytics.',
  },
  {
    id: 'monitoring',
    name: 'Monitoring',
    category: 'analytics',
    tooltip:
      'Track system health and performance metrics. Examples: DataDog, New Relic, Prometheus.',
  },
  {
    id: 'logging',
    name: 'Logging',
    category: 'analytics',
    tooltip:
      'Collect and analyze application logs. Examples: ELK Stack, Splunk. Essential for debugging.',
  },
  {
    id: 'analytics',
    name: 'Analytics',
    category: 'analytics',
    tooltip:
      'Business intelligence and user behavior tracking. Examples: Google Analytics, Mixpanel.',
  },
  {
    id: 'auth-service',
    name: 'Auth Service',
    category: 'security',
    tooltip:
      'User authentication and authorization. Examples: Auth0, AWS Cognito, OAuth providers.',
  },
  {
    id: 'firewall',
    name: 'Firewall',
    category: 'security',
    tooltip:
      'Network security filtering malicious traffic. Examples: AWS WAF, CloudFlare Security. Blocks attacks.',
  },
  {
    id: 'encryption',
    name: 'Encryption',
    category: 'security',
    tooltip:
      'Data protection at rest and in transit. Examples: TLS/SSL, AWS KMS. Required for sensitive data.',
  },
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
  {
    id: 'messaging',
    name: 'Messaging',
    components: ['message-queue', 'websockets', 'event-streaming'],
  },
  { id: 'analytics', name: 'Analytics', components: ['monitoring', 'logging', 'analytics'] },
  { id: 'security', name: 'Security', components: ['auth-service', 'firewall', 'encryption'] },
];
