// Simplified game data and scoring for ArchPath
// Consolidated from the complex 276-line scoring system

// Phase requirements per company - simplified structure
export const phaseRequirements = {
  netflix: {
    mvp: {
      required: ['web-server', 'database'],
      beneficial: ['file-storage'],
      avoid: ['cdn', 'cache', 'load-balancer', 'analytics', 'monitoring'],
    },
    scale1: {
      required: ['web-server', 'database', 'file-storage', 'cdn'],
      beneficial: ['cache', 'load-balancer', 'monitoring'],
      avoid: ['message-queue', 'api-gateway', 'search-engine'],
    },
    scale2: {
      required: ['web-server', 'database', 'file-storage', 'cdn', 'cache', 'load-balancer'],
      beneficial: ['monitoring', 'analytics', 'api-gateway', 'message-queue'],
      avoid: ['lambda', 'websockets', 'event-streaming'],
    },
    enterprise: {
      required: [
        'web-server',
        'database',
        'file-storage',
        'cdn',
        'cache',
        'load-balancer',
        'monitoring',
        'analytics',
      ],
      beneficial: ['api-gateway', 'message-queue', 'auth-service', 'firewall', 'search-engine'],
      avoid: [],
    },
  },
  slack: {
    mvp: {
      required: ['web-server', 'database', 'websockets'],
      beneficial: ['cache'],
      avoid: ['cdn', 'load-balancer', 'analytics'],
    },
    scale1: {
      required: ['web-server', 'database', 'websockets', 'cache', 'load-balancer'],
      beneficial: ['monitoring', 'message-queue'],
      avoid: ['search-engine', 'analytics', 'api-gateway'],
    },
    scale2: {
      required: ['web-server', 'database', 'websockets', 'cache', 'load-balancer', 'monitoring'],
      beneficial: ['message-queue', 'api-gateway', 'search-engine', 'analytics'],
      avoid: ['lambda', 'event-streaming'],
    },
    enterprise: {
      required: [
        'web-server',
        'database',
        'websockets',
        'cache',
        'load-balancer',
        'monitoring',
        'message-queue',
      ],
      beneficial: ['api-gateway', 'search-engine', 'analytics', 'auth-service', 'firewall'],
      avoid: [],
    },
  },
  uber: {
    mvp: {
      required: ['web-server', 'database'],
      beneficial: ['cache'],
      avoid: ['load-balancer', 'message-queue', 'analytics'],
    },
    scale1: {
      required: ['web-server', 'database', 'cache', 'load-balancer'],
      beneficial: ['monitoring', 'api-gateway'],
      avoid: ['search-engine', 'websockets', 'lambda'],
    },
    scale2: {
      required: [
        'web-server',
        'database',
        'cache',
        'load-balancer',
        'api-gateway',
        'message-queue',
      ],
      beneficial: ['monitoring', 'analytics', 'search-engine'],
      avoid: ['websockets', 'event-streaming'],
    },
    enterprise: {
      required: [
        'web-server',
        'database',
        'cache',
        'load-balancer',
        'api-gateway',
        'message-queue',
        'monitoring',
      ],
      beneficial: ['analytics', 'search-engine', 'auth-service', 'firewall', 'lambda'],
      avoid: [],
    },
  },
  spotify: {
    mvp: {
      required: ['web-server', 'database'],
      beneficial: ['file-storage', 'cache'],
      avoid: ['search-engine', 'analytics', 'cdn'],
    },
    scale1: {
      required: ['web-server', 'database', 'file-storage', 'cache'],
      beneficial: ['search-engine', 'cdn', 'monitoring'],
      avoid: ['message-queue', 'lambda', 'websockets'],
    },
    scale2: {
      required: ['web-server', 'database', 'file-storage', 'cache', 'search-engine', 'cdn'],
      beneficial: ['monitoring', 'analytics', 'api-gateway', 'load-balancer'],
      avoid: ['websockets', 'event-streaming'],
    },
    enterprise: {
      required: [
        'web-server',
        'database',
        'file-storage',
        'cache',
        'search-engine',
        'cdn',
        'analytics',
      ],
      beneficial: ['monitoring', 'api-gateway', 'load-balancer', 'auth-service', 'lambda'],
      avoid: [],
    },
  },
  instagram: {
    mvp: {
      required: ['web-server', 'database'],
      beneficial: ['file-storage', 'cache'],
      avoid: ['cdn', 'search-engine', 'analytics'],
    },
    scale1: {
      required: ['web-server', 'database', 'file-storage', 'cache', 'cdn'],
      beneficial: ['load-balancer', 'monitoring'],
      avoid: ['search-engine', 'message-queue', 'websockets'],
    },
    scale2: {
      required: ['web-server', 'database', 'file-storage', 'cache', 'cdn', 'load-balancer'],
      beneficial: ['monitoring', 'analytics', 'search-engine', 'message-queue'],
      avoid: ['lambda', 'websockets'],
    },
    enterprise: {
      required: [
        'web-server',
        'database',
        'file-storage',
        'cache',
        'cdn',
        'load-balancer',
        'monitoring',
        'analytics',
      ],
      beneficial: ['search-engine', 'message-queue', 'auth-service', 'firewall', 'api-gateway'],
      avoid: [],
    },
  },
  stripe: {
    mvp: {
      required: ['web-server', 'database', 'auth-service'],
      beneficial: ['firewall', 'monitoring'],
      avoid: ['load-balancer', 'cache', 'api-gateway', 'analytics'],
    },
    scale1: {
      required: ['web-server', 'database', 'auth-service', 'firewall', 'api-gateway'],
      beneficial: ['load-balancer', 'monitoring', 'cache'],
      avoid: ['message-queue', 'analytics', 'search-engine'],
    },
    scale2: {
      required: [
        'web-server',
        'database',
        'auth-service',
        'firewall',
        'api-gateway',
        'load-balancer',
        'monitoring',
      ],
      beneficial: ['cache', 'message-queue', 'analytics'],
      avoid: ['websockets', 'cdn', 'file-storage'],
    },
    enterprise: {
      required: [
        'web-server',
        'database',
        'auth-service',
        'firewall',
        'api-gateway',
        'load-balancer',
        'monitoring',
        'analytics',
      ],
      beneficial: ['cache', 'message-queue', 'lambda', 'event-streaming'],
      avoid: [],
    },
  },
  monzo: {
    mvp: {
      required: ['web-server', 'database', 'auth-service', 'api-gateway'],
      beneficial: ['monitoring', 'firewall'],
      avoid: ['cache', 'load-balancer', 'analytics', 'websockets'],
    },
    scale1: {
      required: ['web-server', 'database', 'auth-service', 'api-gateway', 'monitoring', 'firewall'],
      beneficial: ['message-queue', 'cache'],
      avoid: ['analytics', 'search-engine', 'lambda'],
    },
    scale2: {
      required: [
        'web-server',
        'database',
        'auth-service',
        'api-gateway',
        'monitoring',
        'firewall',
        'message-queue',
      ],
      beneficial: ['cache', 'analytics', 'event-streaming'],
      avoid: ['websockets', 'cdn', 'file-storage'],
    },
    enterprise: {
      required: [
        'web-server',
        'database',
        'auth-service',
        'api-gateway',
        'monitoring',
        'firewall',
        'message-queue',
        'analytics',
      ],
      beneficial: ['cache', 'event-streaming', 'lambda', 'search-engine'],
      avoid: [],
    },
  },
  robinhood: {
    mvp: {
      required: ['web-server', 'database', 'auth-service'],
      beneficial: ['monitoring', 'cache'],
      avoid: ['load-balancer', 'api-gateway', 'analytics', 'message-queue'],
    },
    scale1: {
      required: ['web-server', 'database', 'auth-service', 'cache', 'monitoring'],
      beneficial: ['load-balancer', 'api-gateway', 'firewall'],
      avoid: ['analytics', 'search-engine', 'websockets'],
    },
    scale2: {
      required: [
        'web-server',
        'database',
        'auth-service',
        'cache',
        'monitoring',
        'load-balancer',
        'event-streaming',
      ],
      beneficial: ['api-gateway', 'firewall', 'analytics'],
      avoid: ['websockets', 'cdn', 'file-storage'],
    },
    enterprise: {
      required: [
        'web-server',
        'database',
        'auth-service',
        'cache',
        'monitoring',
        'load-balancer',
        'event-streaming',
        'analytics',
      ],
      beneficial: ['api-gateway', 'firewall', 'lambda', 'message-queue'],
      avoid: [],
    },
  },
  shopify: {
    mvp: {
      required: ['web-server', 'database'],
      beneficial: ['cache', 'file-storage'],
      avoid: ['load-balancer', 'api-gateway', 'analytics', 'cdn'],
    },
    scale1: {
      required: ['web-server', 'database', 'cache', 'load-balancer', 'api-gateway'],
      beneficial: ['monitoring', 'file-storage', 'firewall'],
      avoid: ['analytics', 'search-engine', 'message-queue'],
    },
    scale2: {
      required: [
        'web-server',
        'database',
        'cache',
        'load-balancer',
        'api-gateway',
        'monitoring',
        'message-queue',
      ],
      beneficial: ['file-storage', 'firewall', 'analytics', 'search-engine'],
      avoid: ['websockets', 'event-streaming'],
    },
    enterprise: {
      required: [
        'web-server',
        'database',
        'cache',
        'load-balancer',
        'api-gateway',
        'monitoring',
        'message-queue',
        'analytics',
      ],
      beneficial: ['file-storage', 'firewall', 'search-engine', 'auth-service', 'lambda'],
      avoid: [],
    },
  },
  doordash: {
    mvp: {
      required: ['web-server', 'database'],
      beneficial: ['cache', 'monitoring'],
      avoid: ['load-balancer', 'api-gateway', 'analytics', 'websockets'],
    },
    scale1: {
      required: ['web-server', 'database', 'cache', 'api-gateway', 'message-queue'],
      beneficial: ['load-balancer', 'monitoring', 'firewall'],
      avoid: ['analytics', 'search-engine', 'event-streaming'],
    },
    scale2: {
      required: [
        'web-server',
        'database',
        'cache',
        'api-gateway',
        'message-queue',
        'load-balancer',
        'monitoring',
      ],
      beneficial: ['analytics', 'firewall', 'search-engine', 'lambda'],
      avoid: ['websockets', 'cdn', 'file-storage'],
    },
    enterprise: {
      required: [
        'web-server',
        'database',
        'cache',
        'api-gateway',
        'message-queue',
        'load-balancer',
        'monitoring',
        'analytics',
      ],
      beneficial: ['firewall', 'search-engine', 'lambda', 'event-streaming', 'auth-service'],
      avoid: [],
    },
  },
  etsy: {
    mvp: {
      required: ['web-server', 'database'],
      beneficial: ['file-storage', 'search-engine'],
      avoid: ['cache', 'load-balancer', 'analytics', 'api-gateway'],
    },
    scale1: {
      required: ['web-server', 'database', 'file-storage', 'search-engine', 'cache'],
      beneficial: ['load-balancer', 'cdn', 'monitoring'],
      avoid: ['analytics', 'message-queue', 'api-gateway'],
    },
    scale2: {
      required: [
        'web-server',
        'database',
        'file-storage',
        'search-engine',
        'cache',
        'load-balancer',
        'cdn',
      ],
      beneficial: ['monitoring', 'analytics', 'api-gateway'],
      avoid: ['websockets', 'event-streaming', 'lambda'],
    },
    enterprise: {
      required: [
        'web-server',
        'database',
        'file-storage',
        'search-engine',
        'cache',
        'load-balancer',
        'cdn',
        'analytics',
      ],
      beneficial: ['monitoring', 'api-gateway', 'auth-service', 'firewall', 'message-queue'],
      avoid: [],
    },
  },
};

// Simplified scoring function
export function calculatePhaseScore(companyId, phaseId, selectedComponents) {
  const requirements = phaseRequirements[companyId]?.[phaseId];
  if (!requirements) {
    return { score: 0, completionRate: 0, feedback: ['Invalid phase'], breakdown: [] };
  }

  let score = 0;
  const feedback = [];
  const breakdown = [];

  // Check required components (+10 points each, -5 for missing)
  const foundRequired = selectedComponents.filter(comp => requirements.required.includes(comp));
  const missingRequired = requirements.required.filter(comp => !selectedComponents.includes(comp));

  foundRequired.forEach(comp => {
    score += 10;
    breakdown.push({ component: comp, reason: 'Required component', points: 10 });
  });

  missingRequired.forEach(comp => {
    score -= 5;
    breakdown.push({ component: comp, reason: 'Missing required component', points: -5 });
  });

  // Check beneficial components (+5 points each)
  const foundBeneficial = selectedComponents.filter(comp => requirements.beneficial.includes(comp));
  foundBeneficial.forEach(comp => {
    score += 5;
    breakdown.push({ component: comp, reason: 'Beneficial component', points: 5 });
  });

  // Check avoided components (-3 points each)
  const foundAvoided = selectedComponents.filter(comp => requirements.avoid.includes(comp));
  foundAvoided.forEach(comp => {
    score -= 3;
    breakdown.push({ component: comp, reason: 'Premature for this phase', points: -3 });
  });

  // Generate simple feedback
  if (missingRequired.length === 0) {
    feedback.push('Great job! You included all essential components.');
  } else {
    feedback.push(
      `Missing ${missingRequired.length} essential component(s): ${missingRequired.join(', ')}`
    );
  }

  if (foundBeneficial.length > 0) {
    feedback.push(`Good additions: ${foundBeneficial.join(', ')}`);
  }

  if (foundAvoided.length > 0) {
    feedback.push(`Consider removing: ${foundAvoided.join(', ')} (premature for this phase)`);
  }

  const completionRate = Math.round((foundRequired.length / requirements.required.length) * 100);

  return {
    score: Math.max(0, score),
    completionRate,
    feedback,
    breakdown,
  };
}

// Phase descriptions for each company
export function getPhaseDescription(phase, companyId) {
  const descriptions = {
    netflix: {
      mvp: 'Netflix started as a DVD-by-mail service with basic web functionality. What components did they need to launch their simple catalog and user management system?',
      scale1:
        '10M users are now streaming video. What infrastructure is needed to deliver video content reliably at this scale?',
      scale2:
        "100M+ users globally, multiple content types. The original architecture is breaking. What's needed for the next level?",
      enterprise:
        '230M+ subscribers across 190 countries with AI recommendations. What enterprise-grade components are required?',
    },
    slack: {
      mvp: 'Slack needs real-time messaging for small teams. What are the core components for a chat application?',
      scale1:
        '10K concurrent users, message history is getting slow. What components help scale real-time messaging?',
      scale2:
        "100K+ users, enterprise customers want advanced features. What's needed for the next growth phase?",
      enterprise:
        'Millions of users, shared channels across organizations. What enterprise features are required?',
    },
    uber: {
      mvp: 'Simple ride matching for one city. What basic components are needed for location-based matching?',
      scale1:
        'Expanding to 50 cities, drivers and riders growing fast. What components help scale geographically?',
      scale2:
        "1000+ cities, real-time pricing, driver optimization. What's needed for complex operations?",
      enterprise:
        'Global platform with multiple services (food, freight). What enterprise architecture is required?',
    },
    spotify: {
      mvp: 'Music streaming for desktop users. What components are needed to stream music files?',
      scale1:
        'Mobile app launch, millions of songs. What components help scale music delivery and discovery?',
      scale2:
        "Personalized playlists, social features. What's needed for recommendation and social systems?",
      enterprise:
        'AI-powered recommendations, podcast platform. What enterprise features support content variety?',
    },
    instagram: {
      mvp: 'Photo sharing app for mobile. What basic components are needed for image upload and sharing?',
      scale1:
        'Millions of users, photo feeds getting slow. What components help scale image delivery?',
      scale2:
        "Stories, video, messaging features. What's needed to support multiple content types?",
      enterprise:
        'Billions of users, AI content moderation. What enterprise-scale components are required?',
    },
    stripe: {
      mvp: 'Simple payment processing API. What core components are needed for secure payment handling?',
      scale1:
        "Supporting 120+ countries, multiple payment methods. What's needed for international expansion?",
      scale2:
        'Processing millions of transactions daily. What components handle high-volume payment processing?',
      enterprise:
        '$1 trillion payment volume annually. What enterprise-grade infrastructure is required?',
    },
    monzo: {
      mvp: 'Digital prepaid card with basic banking. What core components are needed for financial transactions?',
      scale1:
        "Full current account features, real-time notifications. What's needed for real-time banking?",
      scale2:
        'Millions of customers, complex financial products. What components support banking at scale?',
      enterprise:
        'Full-service digital bank with lending and investments. What enterprise banking features are required?',
    },
    robinhood: {
      mvp: 'Commission-free stock trading app. What basic components are needed for trade execution?',
      scale1: "Millions of users, market data streaming. What's needed to handle trading volume?",
      scale2:
        'Multi-asset platform, options trading. What components support complex trading operations?',
      enterprise:
        'Global trading platform with crypto and derivatives. What enterprise trading infrastructure is required?',
    },
    shopify: {
      mvp: 'Simple online store builder. What basic components are needed for e-commerce stores?',
      scale1:
        "Thousands of merchants, app ecosystem. What's needed for multi-tenant platform scaling?",
      scale2:
        'Black Friday traffic spikes, global merchants. What components handle massive traffic surges?',
      enterprise:
        'Millions of merchants, enterprise features. What components support platform-scale e-commerce?',
    },
    doordash: {
      mvp: 'Local food delivery matching. What basic components are needed for delivery coordination?',
      scale1:
        "Multiple cities, real-time tracking. What's needed for geographic expansion and logistics?",
      scale2:
        'AI-powered routing, dynamic pricing. What components support intelligent delivery optimization?',
      enterprise:
        'Global delivery platform with multiple verticals. What enterprise logistics infrastructure is required?',
    },
    etsy: {
      mvp: 'Handmade goods marketplace. What basic components are needed for marketplace functionality?',
      scale1:
        "Millions of unique items, search discovery. What's needed for marketplace search at scale?",
      scale2:
        'Personalized recommendations, seller tools. What components support marketplace intelligence?',
      enterprise:
        'Global creative economy platform. What enterprise marketplace infrastructure is required?',
    },
  };

  return descriptions[companyId]?.[phase] || `Choose the right components for ${phase} phase.`;
}

// Architectural rationale explanations for post-phase analysis
export const architecturalRationale = {
  netflix: {
    mvp: {
      title: 'Simple Content Delivery Foundation',
      explanation:
        'Netflix started as a DVD-by-mail service moving online. At MVP stage, the architecture needed to be simple and cost-effective.',
      keyInsights: [
        'Web Server handles basic catalog browsing and user accounts',
        'Database stores user profiles, preferences, and content metadata',
        'File Storage (optional) for initial small video library',
        'Avoided CDN/caching - premature optimization for small user base',
        'No load balancer needed - single server could handle early traffic',
      ],
      architecturalPrinciples: [
        'Start simple: Minimum viable infrastructure',
        'Avoid over-engineering: No complex scaling before you need it',
        'Focus on core business logic: Content catalog and user management',
      ],
      architectureLinks: [
        {
          title: "Netflix Tech Blog - Architecture Evolution",
          url: "https://netflixtechblog.com/tagged/architecture"
        }
      ],
    },
    scale1: {
      title: 'Video Streaming at Scale',
      explanation:
        'With 10M+ users streaming video, Netflix needed infrastructure to deliver large files globally with good performance.',
      keyInsights: [
        'CDN becomes critical for video delivery - reduces bandwidth costs',
        'File Storage scaled up for massive video library',
        'Cache improves metadata access and reduces database load',
        'Load Balancer distributes traffic across multiple web servers',
        'Monitoring essential to track video quality and delivery issues',
      ],
      architecturalPrinciples: [
        'Content delivery optimization: CDN for global video streaming',
        'Performance monitoring: Track user experience quality',
        'Horizontal scaling: Multiple servers behind load balancer',
      ],
      architectureLinks: [
        {
          title: "Netflix CDN Strategy",
          url: "https://netflixtechblog.com/serving-100-gbps-from-an-open-connect-appliance-cdb51dda3b99"
        }
      ],
    },
    scale2: {
      title: 'Personalization and Microservices',
      explanation:
        'With 100M+ users, Netflix needed recommendation engines, multiple content types, and resilient architecture.',
      keyInsights: [
        'API Gateway manages microservices communication',
        'Message Queues enable asynchronous processing for recommendations',
        'Analytics track user behavior for machine learning',
        'Search Engine powers content discovery',
        'Multiple caching layers optimize different data types',
      ],
      architecturalPrinciples: [
        'Microservices architecture: Independent, scalable services',
        'Data-driven decisions: Analytics for personalization',
        'Asynchronous processing: Decouple services with messaging',
      ],
    },
    enterprise: {
      title: 'Global Streaming Platform',
      explanation:
        'Netflix operates in 190+ countries with enterprise-grade security, compliance, and operational excellence.',
      keyInsights: [
        'Auth Service handles global user authentication and security',
        'Firewall and security for content protection and compliance',
        'Event Streaming processes billions of user interactions',
        'Advanced analytics for business intelligence and content decisions',
        'Multi-region redundancy and disaster recovery',
      ],
      architecturalPrinciples: [
        'Security first: Protect content and user data globally',
        'Operational excellence: Advanced monitoring and automation',
        'Business intelligence: Data drives content and technology decisions',
      ],
    },
  },
  slack: {
    mvp: {
      title: 'Real-time Messaging Foundation',
      explanation:
        "Slack's core value is real-time team communication. The MVP architecture prioritized message delivery reliability.",
      keyInsights: [
        'WebSockets enable real-time bidirectional communication',
        'Database stores messages, channels, and user data',
        'Web Server handles authentication and basic HTTP requests',
        'Cache (optional) improves message history performance',
        'Avoided CDN - not needed for text-based messaging',
      ],
      architecturalPrinciples: [
        'Real-time first: WebSocket connections for instant messaging',
        'Message persistence: Reliable storage and retrieval',
        'Simple and focused: Core messaging functionality only',
      ],
      architectureLinks: [
        {
          title: "Slack Engineering Blog",
          url: "https://slack.engineering/"
        }
      ],
    },
    scale1: {
      title: 'Concurrent Connection Scaling',
      explanation:
        'With millions of concurrent users, Slack needed to scale WebSocket connections and message throughput.',
      keyInsights: [
        'Load Balancer distributes WebSocket connections across servers',
        'Cache becomes critical for fast message history and user presence',
        'Message Queues handle high-volume message processing',
        'Monitoring tracks connection health and message delivery',
        'Database optimization for high read/write message volumes',
      ],
      architecturalPrinciples: [
        'Connection scaling: Distribute WebSocket load efficiently',
        'Message throughput: Queue-based processing for reliability',
        'Performance monitoring: Track real-time communication quality',
      ],
    },
    scale2: {
      title: 'Enterprise Features and Search',
      explanation:
        'Enterprise customers need advanced features like search, integrations, and compliance capabilities.',
      keyInsights: [
        'Search Engine enables finding messages across large message histories',
        'API Gateway manages third-party integrations and webhooks',
        'Analytics track team collaboration patterns',
        'Advanced message queuing for integration processing',
        'Security features for enterprise compliance',
      ],
      architecturalPrinciples: [
        'Enterprise readiness: Advanced search and integrations',
        'Data insights: Analytics on team communication patterns',
        'Integration platform: API-driven third-party connections',
      ],
    },
    enterprise: {
      title: 'Global Enterprise Platform',
      explanation:
        'Enterprise Slack supports large organizations with advanced security, compliance, and management features.',
      keyInsights: [
        'Auth Service provides enterprise SSO and security policies',
        'Firewall and security for data protection and compliance',
        'Advanced analytics for organization insights and administration',
        'Event processing for audit logs and compliance reporting',
        'Multi-tenant architecture for organization isolation',
      ],
      architecturalPrinciples: [
        'Enterprise security: SSO, compliance, and data protection',
        'Administrative control: Organization management and policies',
        'Audit and compliance: Complete activity tracking and reporting',
      ],
    },
  },
  stripe: {
    mvp: {
      title: 'Secure Payment API Foundation',
      explanation:
        'Stripe started with a simple goal: make online payments easy for developers. The MVP needed rock-solid security and regulatory compliance from day one.',
      keyInsights: [
        'Auth Service critical for PCI DSS compliance from launch',
        'Database stores payment transactions with ACID guarantees',
        'Web Server handles API requests with SSL/TLS encryption',
        'Firewall essential for payment security and fraud prevention',
        'Avoided complex scaling - focused on security and compliance first',
      ],
      architecturalPrinciples: [
        'Security first: PCI compliance and encryption from day one',
        'Developer experience: Simple API that abstracts payment complexity',
        'Financial consistency: ACID transactions for payment reliability',
      ],
    },
    scale1: {
      title: 'Global Payment Network',
      explanation:
        'Supporting 120+ countries required robust API management, geographic distribution, and handling multiple payment methods and currencies.',
      keyInsights: [
        'API Gateway manages different payment methods and routing',
        'Load Balancer distributes traffic across geographic regions',
        'Cache improves API response times for merchant requests',
        'Monitoring essential for payment success rates and compliance',
        'Multi-region architecture for global payment processing',
      ],
      architecturalPrinciples: [
        'Global scale: Multi-region deployment for local regulations',
        'API reliability: Gateway patterns for payment method abstraction',
        'Performance monitoring: Track success rates and response times',
      ],
    },
    scale2: {
      title: 'High-Volume Transaction Processing',
      explanation:
        'Processing millions of daily transactions required queue-based architecture, advanced analytics, and machine learning for fraud detection.',
      keyInsights: [
        'Message Queues handle asynchronous payment processing',
        'Analytics track payment patterns and detect fraud',
        'Cache layers optimize payment routing decisions',
        'Advanced monitoring for compliance and operational excellence',
        'Event-driven architecture for payment lifecycle management',
      ],
      architecturalPrinciples: [
        'Asynchronous processing: Queues for reliable payment handling',
        'Data-driven security: ML-powered fraud detection',
        'Operational excellence: Advanced monitoring and alerting',
      ],
    },
    enterprise: {
      title: 'Adaptive Financial Platform',
      explanation:
        'Processing $1 trillion annually requires sophisticated event streaming, serverless computing, and platform-level abstractions for complex financial products.',
      keyInsights: [
        'Event Streaming processes billions of financial events',
        'Lambda functions handle payment routing and business logic',
        'Advanced analytics for business intelligence and risk management',
        'Platform architecture supporting multiple financial products',
        'Real-time compliance monitoring and reporting',
      ],
      architecturalPrinciples: [
        'Platform thinking: Enable multiple financial products',
        'Event-driven architecture: Real-time financial event processing',
        'Adaptive infrastructure: Serverless for variable payment loads',
      ],
    },
  },
  monzo: {
    mvp: {
      title: 'Microservices Banking Foundation',
      explanation:
        'Monzo built a digital bank from scratch using microservices from day one, requiring API-first architecture and strong authentication.',
      keyInsights: [
        'API Gateway coordinates communication between banking services',
        'Auth Service handles customer identity and banking regulations',
        'Database stores account information with banking-grade security',
        'Monitoring essential for financial service reliability',
        'Microservices architecture from launch - no monolith migration',
      ],
      architecturalPrinciples: [
        'API-first design: All banking functions as microservices',
        'Regulatory compliance: Built-in banking regulations from start',
        'Real-time architecture: Instant notifications and balance updates',
      ],
    },
    scale1: {
      title: 'Real-time Banking Operations',
      explanation:
        'Full banking license required real-time transaction processing, regulatory compliance, and customer notification systems.',
      keyInsights: [
        'Message Queues handle real-time transaction processing',
        'Firewall and security for banking regulatory compliance',
        'Cache improves account balance and transaction history performance',
        'Advanced monitoring for banking SLA requirements',
        'Service mesh manages communication between hundreds of services',
      ],
      architecturalPrinciples: [
        'Real-time transactions: Instant balance updates and notifications',
        'Banking compliance: Regulatory requirements built into architecture',
        'Service reliability: Advanced monitoring for financial operations',
      ],
    },
    scale2: {
      title: 'Full-Service Digital Bank',
      explanation:
        'Millions of customers required sophisticated event processing, advanced analytics, and platform scalability for financial products.',
      keyInsights: [
        'Event Streaming processes real-time banking transactions',
        'Analytics track customer behavior and financial patterns',
        'Message queues handle complex financial product workflows',
        'Service mesh manages 1,600+ microservices communication',
        'Advanced caching for customer-facing application performance',
      ],
      architecturalPrinciples: [
        'Event-driven banking: Real-time transaction processing',
        'Customer insights: Analytics for personalized banking',
        'Scalable microservices: Managing hundreds of banking services',
      ],
    },
    enterprise: {
      title: 'Financial Super-App Platform',
      explanation:
        'Operating 2,800+ microservices required advanced event streaming, serverless functions, and comprehensive analytics for business and regulatory insights.',
      keyInsights: [
        'Lambda functions handle business rules and financial calculations',
        'Search Engine enables customer transaction and account queries',
        'Event Streaming manages complex financial product interactions',
        'Advanced analytics for regulatory reporting and business intelligence',
        'Automated service deployment and management at scale',
      ],
      architecturalPrinciples: [
        'Platform architecture: Supporting diverse financial products',
        'Automated operations: Managing thousands of services efficiently',
        'Comprehensive insights: Analytics for business and compliance',
      ],
    },
  },
  robinhood: {
    mvp: {
      title: 'Commission-Free Trading Foundation',
      explanation:
        'Robinhood disrupted trading with zero commissions, requiring secure authentication, real-time market data, and reliable trade execution.',
      keyInsights: [
        'Auth Service handles secure customer authentication for trading',
        'Database stores account balances and trading history',
        'Cache improves market data access and account information',
        'Web Server handles trade execution and market data API',
        'Security essential for financial account protection',
      ],
      architecturalPrinciples: [
        'Mobile-first design: Trading optimized for smartphone users',
        'Zero-commission model: Efficiency critical for business model',
        'Security first: Protect customer trading accounts and data',
      ],
    },
    scale1: {
      title: 'Market Data Streaming at Scale',
      explanation:
        'Millions of users required real-time market data, load balancing for trading spikes, and comprehensive monitoring for trading reliability.',
      keyInsights: [
        'Load Balancer distributes trading load across servers',
        'API Gateway manages market data feeds and trading APIs',
        'Firewall protects against trading manipulation and attacks',
        'Monitoring tracks trading system health and market data quality',
        'Cache optimizes frequently accessed market information',
      ],
      architecturalPrinciples: [
        'Real-time data: Streaming market information to millions',
        'Spike handling: Load balancing for market open rushes',
        'Trading reliability: Monitoring for consistent trade execution',
      ],
    },
    scale2: {
      title: 'Multi-Asset Trading Platform',
      explanation:
        'Supporting options, crypto, and volatile trading periods required event streaming for market data and advanced analytics for risk management.',
      keyInsights: [
        'Event Streaming processes real-time market data and trades',
        'Analytics track trading patterns and risk management',
        'Advanced monitoring for trading system performance',
        'API Gateway manages different asset types and trading rules',
        'Firewall and security for multi-asset trading protection',
      ],
      architecturalPrinciples: [
        'Event-driven trading: Real-time market data processing',
        'Risk management: Analytics for trading pattern monitoring',
        'Multi-asset support: Platform flexibility for different instruments',
      ],
    },
    enterprise: {
      title: 'Global Trading Marketplace',
      explanation:
        'Global expansion and crypto trading required serverless scaling, comprehensive analytics, and advanced event processing for complex trading operations.',
      keyInsights: [
        'Lambda functions handle trading rules and risk calculations',
        'Message Queues manage complex multi-asset trading workflows',
        'Advanced analytics for regulatory reporting and risk management',
        'Event streaming for global market data and trade processing',
        'Comprehensive monitoring for global trading operations',
      ],
      architecturalPrinciples: [
        'Global trading: Multi-region support for worldwide markets',
        'Serverless scaling: Handle variable trading volumes efficiently',
        'Comprehensive analytics: Risk management and regulatory compliance',
      ],
    },
  },
  shopify: {
    mvp: {
      title: 'Simple Store Builder Foundation',
      explanation:
        'Shopify started as a simple way to create online stores, requiring basic multi-tenancy and merchant isolation from day one.',
      keyInsights: [
        'Web Server handles merchant store requests and admin interface',
        'Database stores merchant data with tenant isolation',
        'Cache improves store performance for customer browsing',
        'File Storage for product images and store assets',
        'Basic multi-tenant architecture for merchant separation',
      ],
      architecturalPrinciples: [
        'Multi-tenant design: Isolated merchant stores on shared infrastructure',
        'Merchant-focused: Simple tools for non-technical store owners',
        'Performance first: Fast store loading for customer experience',
      ],
    },
    scale1: {
      title: 'Platform Ecosystem Scaling',
      explanation:
        'Thousands of merchants and app ecosystem required robust API management, platform scalability, and comprehensive monitoring.',
      keyInsights: [
        'API Gateway manages merchant apps and third-party integrations',
        'Load Balancer distributes traffic across merchant stores',
        'Cache layers optimize store performance and API responses',
        'Monitoring tracks platform health and merchant success metrics',
        'File Storage scales for millions of product images and assets',
      ],
      architecturalPrinciples: [
        'Platform thinking: Enable third-party app ecosystem',
        'Scalable multi-tenancy: Support thousands of isolated stores',
        'Performance optimization: Fast loading for merchant success',
      ],
    },
    scale2: {
      title: 'Black Friday Traffic Architecture',
      explanation:
        'Handling massive traffic spikes required advanced queuing, sophisticated analytics, and comprehensive monitoring for peak shopping periods.',
      keyInsights: [
        'Message Queues handle order processing and inventory updates',
        'Analytics track sales performance and platform metrics',
        'Search Engine powers product discovery across merchant stores',
        'Firewall protects against traffic spikes and security threats',
        'Advanced monitoring for Black Friday performance tracking',
      ],
      architecturalPrinciples: [
        'Spike resilience: Architecture designed for peak shopping traffic',
        'Event-driven commerce: Asynchronous order and inventory processing',
        'Merchant insights: Analytics for sales optimization and growth',
      ],
    },
    enterprise: {
      title: 'Commerce Operating System',
      explanation:
        'Supporting millions of merchants requires serverless scaling, advanced authentication, and comprehensive platform management capabilities.',
      keyInsights: [
        'Lambda functions handle business logic and merchant customizations',
        'Auth Service manages merchant authentication and permissions',
        'Search Engine enables advanced product discovery and recommendations',
        'Comprehensive analytics for merchant success and platform optimization',
        'Advanced firewall and security for global commerce protection',
      ],
      architecturalPrinciples: [
        'Platform-as-a-Service: Complete commerce infrastructure for merchants',
        'Global scale: Support merchants worldwide with local performance',
        'Merchant success: Analytics and tools to drive business growth',
      ],
    },
  },
  doordash: {
    mvp: {
      title: 'Local Delivery Coordination',
      explanation:
        'DoorDash started with simple three-sided marketplace coordination: restaurants, drivers, and customers in local markets.',
      keyInsights: [
        'Web Server handles order placement and driver matching',
        'Database stores restaurants, drivers, and customer information',
        'Cache improves restaurant menu loading and driver location data',
        'Monitoring tracks delivery success rates and customer satisfaction',
        'Simple coordination logic for local delivery matching',
      ],
      architecturalPrinciples: [
        'Three-sided marketplace: Balance needs of restaurants, drivers, customers',
        'Local focus: Optimize for city-level delivery operations',
        'Real-time coordination: Match orders with available drivers quickly',
      ],
    },
    scale1: {
      title: 'Multi-City Logistics Platform',
      explanation:
        'Geographic expansion required sophisticated API management, real-time messaging, and comprehensive monitoring for delivery coordination.',
      keyInsights: [
        'API Gateway coordinates restaurant integrations and driver apps',
        'Message Queues handle order workflow and delivery tracking',
        'Load Balancer distributes traffic across city operations',
        'Monitoring tracks delivery metrics across multiple markets',
        'Cache optimizes restaurant data and driver location updates',
      ],
      architecturalPrinciples: [
        'Geographic scaling: Independent city operations with shared platform',
        'Real-time logistics: Messaging for order and delivery coordination',
        'Operational excellence: Monitoring for delivery performance optimization',
      ],
    },
    scale2: {
      title: 'AI-Powered Delivery Optimization',
      explanation:
        'Advanced routing and demand prediction required machine learning analytics, sophisticated search capabilities, and serverless processing.',
      keyInsights: [
        'Analytics power machine learning for delivery time prediction',
        'Search Engine enables restaurant discovery and recommendation',
        'Lambda functions handle dynamic pricing and route optimization',
        'Firewall protects against fraudulent orders and driver manipulation',
        'Advanced monitoring for AI model performance and accuracy',
      ],
      architecturalPrinciples: [
        'ML-driven operations: AI for routing, pricing, and demand prediction',
        'Dynamic optimization: Real-time adjustment of delivery parameters',
        'Data-driven growth: Analytics for market expansion and efficiency',
      ],
    },
    enterprise: {
      title: 'Autonomous Logistics Infrastructure',
      explanation:
        'Global delivery platform with multiple verticals requires event streaming, advanced authentication, and comprehensive platform capabilities.',
      keyInsights: [
        'Event Streaming processes millions of delivery events and logistics data',
        'Auth Service manages complex driver, merchant, and customer permissions',
        'Advanced analytics for business intelligence and operational optimization',
        'Search Engine powers advanced restaurant and product discovery',
        'Comprehensive monitoring for global delivery operations',
      ],
      architecturalPrinciples: [
        'Platform diversification: Support multiple delivery verticals',
        'Global logistics: Worldwide delivery coordination and optimization',
        'Autonomous operations: AI and automation for delivery efficiency',
      ],
    },
  },
  etsy: {
    mvp: {
      title: 'Handmade Marketplace Foundation',
      explanation:
        'Etsy started as a marketplace for unique handmade items, requiring search capabilities and file storage for creative product listings.',
      keyInsights: [
        'Search Engine essential for discovering unique handmade items',
        'File Storage handles product photos and creative content',
        'Database stores seller listings and buyer information',
        'Web Server manages marketplace browsing and transactions',
        'Focus on discovery - search more important than performance optimization',
      ],
      architecturalPrinciples: [
        'Discovery first: Search and browsing optimized for unique items',
        'Creative marketplace: Support for artisan sellers and buyers',
        'Community focus: Platform designed for creative economy',
      ],
    },
    scale1: {
      title: 'Search and Discovery at Scale',
      explanation:
        'Millions of unique items required sophisticated search, content delivery, and performance optimization for marketplace browsing.',
      keyInsights: [
        'CDN improves product image loading across global markets',
        'Load Balancer distributes traffic for marketplace browsing',
        'Cache optimizes search results and popular product categories',
        'Monitoring tracks search quality and conversion rates',
        'Advanced search algorithms for long-tail item discovery',
      ],
      architecturalPrinciples: [
        'Search optimization: Advanced algorithms for unique item discovery',
        'Global marketplace: CDN and performance for worldwide buyers',
        'Conversion focus: Optimize browsing to purchase experience',
      ],
    },
    scale2: {
      title: 'Personalized Creative Marketplace',
      explanation:
        'Personalized recommendations and seller tools required advanced analytics, API management, and comprehensive monitoring capabilities.',
      keyInsights: [
        'Analytics power personalized recommendations and seller insights',
        'API Gateway manages seller tools and third-party integrations',
        'Monitoring tracks marketplace health and seller success metrics',
        'Advanced search with personalization and recommendation features',
        'CDN optimizes creative content delivery globally',
      ],
      architecturalPrinciples: [
        'Personalization engine: ML-driven recommendations for buyers',
        'Seller empowerment: Tools and analytics for creative entrepreneurs',
        'Marketplace intelligence: Data insights for growth and optimization',
      ],
    },
    enterprise: {
      title: 'Global Creative Economy Platform',
      explanation:
        'Supporting millions of buyers requires sophisticated authentication, advanced messaging, and comprehensive platform management for creative commerce.',
      keyInsights: [
        'Auth Service manages buyer and seller authentication globally',
        'Message Queues handle order processing and seller notifications',
        'Firewall protects against fraud and marketplace manipulation',
        'Advanced analytics for marketplace insights and trend analysis',
        'API Gateway enables seller tool ecosystem and integrations',
      ],
      architecturalPrinciples: [
        'Creative economy: Platform supporting millions of unique items',
        'Global commerce: Worldwide marketplace for creative goods',
        'Community platform: Tools and insights for creative entrepreneurship',
      ],
    },
  },
};

// Get architectural rationale for a specific company and phase
export function getArchitecturalRationale(companyId, phase) {
  return architecturalRationale[companyId]?.[phase] || null;
}
