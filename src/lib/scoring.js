// Scoring system for ArchPath game
// Based on service equivalency and phase appropriateness

// Service equivalency groups - cloud provider agnostic scoring
const serviceGroups = {
  'web-server': ['web-server', 'app-server'], // Web/App servers are equivalent
  'database': ['database'],
  'cache': ['cache'],
  'search-engine': ['search-engine'],
  'file-storage': ['file-storage', 'object-storage'], // File and object storage are equivalent
  'cdn': ['cdn'],
  'load-balancer': ['load-balancer'],
  'api-gateway': ['api-gateway'],
  'dns': ['dns'],
  'message-queue': ['message-queue', 'event-streaming'], // Messaging solutions are equivalent
  'websockets': ['websockets'],
  'monitoring': ['monitoring', 'logging'], // Observability tools are equivalent
  'analytics': ['analytics'],
  'auth-service': ['auth-service'],
  'firewall': ['firewall', 'encryption'], // Security tools are equivalent
  'lambda': ['lambda'] // Serverless functions
};

// Define what components are appropriate for each phase per company
const phaseRequirements = {
  netflix: {
    mvp: {
      required: ['web-server', 'database'], // Must have these
      beneficial: ['file-storage'], // Good to have
      premature: ['cdn', 'cache', 'load-balancer', 'analytics', 'monitoring'] // Too early, penalty
    },
    scale1: {
      required: ['web-server', 'database', 'file-storage', 'cdn'],
      beneficial: ['cache', 'load-balancer', 'monitoring'],
      premature: ['message-queue', 'api-gateway', 'search-engine']
    },
    scale2: {
      required: ['web-server', 'database', 'file-storage', 'cdn', 'cache', 'load-balancer'],
      beneficial: ['monitoring', 'analytics', 'api-gateway', 'message-queue'],
      premature: ['lambda', 'websockets', 'event-streaming']
    },
    enterprise: {
      required: ['web-server', 'database', 'file-storage', 'cdn', 'cache', 'load-balancer', 'monitoring', 'analytics'],
      beneficial: ['api-gateway', 'message-queue', 'auth-service', 'firewall', 'search-engine'],
      premature: [] // At enterprise scale, most components can be justified
    }
  },
  slack: {
    mvp: {
      required: ['web-server', 'database', 'websockets'],
      beneficial: ['cache'],
      premature: ['message-queue', 'load-balancer', 'cdn', 'analytics']
    },
    scale1: {
      required: ['web-server', 'database', 'websockets', 'cache'],
      beneficial: ['load-balancer', 'monitoring', 'message-queue'],
      premature: ['cdn', 'api-gateway', 'search-engine']
    },
    scale2: {
      required: ['web-server', 'database', 'websockets', 'cache', 'load-balancer', 'message-queue'],
      beneficial: ['monitoring', 'api-gateway', 'auth-service', 'analytics'],
      premature: ['lambda', 'event-streaming']
    },
    enterprise: {
      required: ['web-server', 'database', 'websockets', 'cache', 'load-balancer', 'message-queue', 'monitoring', 'auth-service'],
      beneficial: ['api-gateway', 'analytics', 'firewall', 'search-engine', 'event-streaming'],
      premature: []
    }
  },
  uber: {
    mvp: {
      required: ['web-server', 'database'],
      beneficial: ['cache', 'api-gateway'],
      premature: ['load-balancer', 'message-queue', 'cdn', 'analytics']
    },
    scale1: {
      required: ['web-server', 'database', 'cache', 'api-gateway'],
      beneficial: ['load-balancer', 'monitoring', 'message-queue'],
      premature: ['cdn', 'search-engine', 'event-streaming']
    },
    scale2: {
      required: ['web-server', 'database', 'cache', 'api-gateway', 'load-balancer', 'message-queue'],
      beneficial: ['monitoring', 'analytics', 'websockets', 'auth-service'],
      premature: ['lambda', 'cdn']
    },
    enterprise: {
      required: ['web-server', 'database', 'cache', 'api-gateway', 'load-balancer', 'message-queue', 'monitoring', 'analytics'],
      beneficial: ['websockets', 'auth-service', 'firewall', 'search-engine', 'event-streaming'],
      premature: []
    }
  },
  spotify: {
    mvp: {
      required: ['web-server', 'database', 'file-storage'],
      beneficial: ['cache', 'cdn'],
      premature: ['analytics', 'search-engine', 'message-queue']
    },
    scale1: {
      required: ['web-server', 'database', 'file-storage', 'cache', 'cdn'],
      beneficial: ['load-balancer', 'monitoring', 'analytics'],
      premature: ['message-queue', 'api-gateway', 'search-engine']
    },
    scale2: {
      required: ['web-server', 'database', 'file-storage', 'cache', 'cdn', 'load-balancer', 'analytics'],
      beneficial: ['monitoring', 'api-gateway', 'search-engine', 'message-queue'],
      premature: ['lambda', 'event-streaming']
    },
    enterprise: {
      required: ['web-server', 'database', 'file-storage', 'cache', 'cdn', 'load-balancer', 'analytics', 'search-engine'],
      beneficial: ['monitoring', 'api-gateway', 'message-queue', 'auth-service', 'firewall'],
      premature: []
    }
  },
  instagram: {
    mvp: {
      required: ['web-server', 'database', 'file-storage'],
      beneficial: ['cache', 'cdn'],
      premature: ['load-balancer', 'analytics', 'search-engine']
    },
    scale1: {
      required: ['web-server', 'database', 'file-storage', 'cache', 'cdn'],
      beneficial: ['load-balancer', 'monitoring'],
      premature: ['message-queue', 'api-gateway', 'search-engine']
    },
    scale2: {
      required: ['web-server', 'database', 'file-storage', 'cache', 'cdn', 'load-balancer'],
      beneficial: ['monitoring', 'analytics', 'api-gateway', 'message-queue'],
      premature: ['lambda', 'websockets', 'event-streaming']
    },
    enterprise: {
      required: ['web-server', 'database', 'file-storage', 'cache', 'cdn', 'load-balancer', 'monitoring', 'analytics'],
      beneficial: ['api-gateway', 'message-queue', 'auth-service', 'firewall', 'search-engine'],
      premature: []
    }
  }
};

// Normalize component ID to its service group (for equivalency)
function normalizeComponent(componentId) {
  for (const [group, components] of Object.entries(serviceGroups)) {
    if (components.includes(componentId)) {
      return group;
    }
  }
  return componentId;
}

// Calculate score for a phase submission
export function calculatePhaseScore(companyId, phaseId, selectedComponents) {
  const requirements = phaseRequirements[companyId]?.[phaseId];
  if (!requirements) {
    return { score: 0, feedback: 'Unknown company or phase', breakdown: [] };
  }

  const { required, beneficial, premature } = requirements;
  
  // Normalize selected components to handle service equivalency
  const normalizedSelected = selectedComponents.map(normalizeComponent);
  const normalizedRequired = required.map(normalizeComponent);
  const normalizedBeneficial = beneficial.map(normalizeComponent);
  const normalizedPremature = premature.map(normalizeComponent);
  
  let score = 0;
  const breakdown = [];
  
  // Check required components (100 points each)
  const foundRequired = [];
  for (const req of normalizedRequired) {
    if (normalizedSelected.includes(req)) {
      score += 100;
      foundRequired.push(req);
      breakdown.push({ component: req, points: 100, reason: 'Required component' });
    }
  }
  
  // Check beneficial components (50 points each)
  const foundBeneficial = [];
  for (const ben of normalizedBeneficial) {
    if (normalizedSelected.includes(ben) && !foundRequired.includes(ben)) {
      score += 50;
      foundBeneficial.push(ben);
      breakdown.push({ component: ben, points: 50, reason: 'Beneficial component' });
    }
  }
  
  // Check premature components (-25 points each)
  const foundPremature = [];
  for (const prem of normalizedPremature) {
    if (normalizedSelected.includes(prem)) {
      score -= 25;
      foundPremature.push(prem);
      breakdown.push({ component: prem, points: -25, reason: 'Premature for this phase' });
    }
  }
  
  // Missing required components penalty (-50 points each)
  const missingRequired = normalizedRequired.filter(req => !normalizedSelected.includes(req));
  for (const missing of missingRequired) {
    score -= 50;
    breakdown.push({ component: missing, points: -50, reason: 'Missing required component' });
  }
  
  // Bonus for minimal viable architecture (not over-engineering)
  const totalComponents = selectedComponents.length;
  const expectedComponents = required.length + Math.floor(beneficial.length / 2);
  if (totalComponents <= expectedComponents) {
    const bonus = 25;
    score += bonus;
    breakdown.push({ component: 'efficiency', points: bonus, reason: 'Lean architecture bonus' });
  }
  
  // Ensure minimum score is 0
  score = Math.max(0, score);
  
  // Generate feedback
  const feedback = generateFeedback(
    foundRequired.length,
    normalizedRequired.length,
    foundBeneficial.length,
    foundPremature.length,
    missingRequired
  );
  
  return {
    score,
    feedback,
    breakdown,
    completionRate: Math.round((foundRequired.length / normalizedRequired.length) * 100)
  };
}

function generateFeedback(foundRequired, totalRequired, foundBeneficial, foundPremature, missingRequired) {
  let feedback = [];
  
  if (foundRequired === totalRequired) {
    feedback.push("✅ All required components included!");
  } else {
    feedback.push(`⚠️ Missing ${totalRequired - foundRequired} required components`);
  }
  
  if (foundBeneficial > 0) {
    feedback.push(`👍 Good choice adding ${foundBeneficial} beneficial components`);
  }
  
  if (foundPremature > 0) {
    feedback.push(`⏰ ${foundPremature} components might be premature for this phase`);
  }
  
  if (missingRequired.length > 0) {
    const missing = missingRequired.join(', ').replace(/-/g, ' ');
    feedback.push(`💡 Consider adding: ${missing}`);
  }
  
  return feedback;
}

// Get hints for a specific phase
export function getPhaseHints(companyId, phaseId) {
  const requirements = phaseRequirements[companyId]?.[phaseId];
  if (!requirements) return [];
  
  const hints = [];
  
  if (requirements.required.length > 0) {
    hints.push(`Essential: ${requirements.required.join(', ').replace(/-/g, ' ')}`);
  }
  
  if (requirements.beneficial.length > 0) {
    hints.push(`Consider: ${requirements.beneficial.slice(0, 3).join(', ').replace(/-/g, ' ')}`);
  }
  
  if (requirements.premature.length > 0) {
    hints.push(`Avoid over-engineering with: ${requirements.premature.slice(0, 3).join(', ').replace(/-/g, ' ')}`);
  }
  
  return hints;
}