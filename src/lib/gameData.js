// Simplified game data and scoring for ArchPath
// Consolidated from the complex 276-line scoring system

// Phase requirements per company - simplified structure
export const phaseRequirements = {
  netflix: {
    mvp: {
      required: ['web-server', 'database'],
      beneficial: ['file-storage'],
      avoid: ['cdn', 'cache', 'load-balancer', 'analytics', 'monitoring']
    },
    scale1: {
      required: ['web-server', 'database', 'file-storage', 'cdn'],
      beneficial: ['cache', 'load-balancer', 'monitoring'],
      avoid: ['message-queue', 'api-gateway', 'search-engine']
    },
    scale2: {
      required: ['web-server', 'database', 'file-storage', 'cdn', 'cache', 'load-balancer'],
      beneficial: ['monitoring', 'analytics', 'api-gateway', 'message-queue'],
      avoid: ['lambda', 'websockets', 'event-streaming']
    },
    enterprise: {
      required: ['web-server', 'database', 'file-storage', 'cdn', 'cache', 'load-balancer', 'monitoring', 'analytics'],
      beneficial: ['api-gateway', 'message-queue', 'auth-service', 'firewall', 'search-engine'],
      avoid: []
    }
  },
  slack: {
    mvp: {
      required: ['web-server', 'database', 'websockets'],
      beneficial: ['cache'],
      avoid: ['cdn', 'load-balancer', 'analytics']
    },
    scale1: {
      required: ['web-server', 'database', 'websockets', 'cache', 'load-balancer'],
      beneficial: ['monitoring', 'message-queue'],
      avoid: ['search-engine', 'analytics', 'api-gateway']
    },
    scale2: {
      required: ['web-server', 'database', 'websockets', 'cache', 'load-balancer', 'monitoring'],
      beneficial: ['message-queue', 'api-gateway', 'search-engine', 'analytics'],
      avoid: ['lambda', 'event-streaming']
    },
    enterprise: {
      required: ['web-server', 'database', 'websockets', 'cache', 'load-balancer', 'monitoring', 'message-queue'],
      beneficial: ['api-gateway', 'search-engine', 'analytics', 'auth-service', 'firewall'],
      avoid: []
    }
  },
  uber: {
    mvp: {
      required: ['web-server', 'database'],
      beneficial: ['cache'],
      avoid: ['load-balancer', 'message-queue', 'analytics']
    },
    scale1: {
      required: ['web-server', 'database', 'cache', 'load-balancer'],
      beneficial: ['monitoring', 'api-gateway'],
      avoid: ['search-engine', 'websockets', 'lambda']
    },
    scale2: {
      required: ['web-server', 'database', 'cache', 'load-balancer', 'api-gateway', 'message-queue'],
      beneficial: ['monitoring', 'analytics', 'search-engine'],
      avoid: ['websockets', 'event-streaming']
    },
    enterprise: {
      required: ['web-server', 'database', 'cache', 'load-balancer', 'api-gateway', 'message-queue', 'monitoring'],
      beneficial: ['analytics', 'search-engine', 'auth-service', 'firewall', 'lambda'],
      avoid: []
    }
  },
  spotify: {
    mvp: {
      required: ['web-server', 'database'],
      beneficial: ['file-storage', 'cache'],
      avoid: ['search-engine', 'analytics', 'cdn']
    },
    scale1: {
      required: ['web-server', 'database', 'file-storage', 'cache'],
      beneficial: ['search-engine', 'cdn', 'monitoring'],
      avoid: ['message-queue', 'lambda', 'websockets']
    },
    scale2: {
      required: ['web-server', 'database', 'file-storage', 'cache', 'search-engine', 'cdn'],
      beneficial: ['monitoring', 'analytics', 'api-gateway', 'load-balancer'],
      avoid: ['websockets', 'event-streaming']
    },
    enterprise: {
      required: ['web-server', 'database', 'file-storage', 'cache', 'search-engine', 'cdn', 'analytics'],
      beneficial: ['monitoring', 'api-gateway', 'load-balancer', 'auth-service', 'lambda'],
      avoid: []
    }
  },
  instagram: {
    mvp: {
      required: ['web-server', 'database'],
      beneficial: ['file-storage', 'cache'],
      avoid: ['cdn', 'search-engine', 'analytics']
    },
    scale1: {
      required: ['web-server', 'database', 'file-storage', 'cache', 'cdn'],
      beneficial: ['load-balancer', 'monitoring'],
      avoid: ['search-engine', 'message-queue', 'websockets']
    },
    scale2: {
      required: ['web-server', 'database', 'file-storage', 'cache', 'cdn', 'load-balancer'],
      beneficial: ['monitoring', 'analytics', 'search-engine', 'message-queue'],
      avoid: ['lambda', 'websockets']
    },
    enterprise: {
      required: ['web-server', 'database', 'file-storage', 'cache', 'cdn', 'load-balancer', 'monitoring', 'analytics'],
      beneficial: ['search-engine', 'message-queue', 'auth-service', 'firewall', 'api-gateway'],
      avoid: []
    }
  }
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
    feedback.push(`Missing ${missingRequired.length} essential component(s): ${missingRequired.join(', ')}`);
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
    breakdown
  };
}

// Phase descriptions for each company
export function getPhaseDescription(phase, companyId) {
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
    },
    uber: {
      mvp: "Simple ride matching for one city. What basic components are needed for location-based matching?",
      scale1: "Expanding to 50 cities, drivers and riders growing fast. What components help scale geographically?",
      scale2: "1000+ cities, real-time pricing, driver optimization. What's needed for complex operations?",
      enterprise: "Global platform with multiple services (food, freight). What enterprise architecture is required?"
    },
    spotify: {
      mvp: "Music streaming for desktop users. What components are needed to stream music files?",
      scale1: "Mobile app launch, millions of songs. What components help scale music delivery and discovery?",
      scale2: "Personalized playlists, social features. What's needed for recommendation and social systems?",
      enterprise: "AI-powered recommendations, podcast platform. What enterprise features support content variety?"
    },
    instagram: {
      mvp: "Photo sharing app for mobile. What basic components are needed for image upload and sharing?",
      scale1: "Millions of users, photo feeds getting slow. What components help scale image delivery?",
      scale2: "Stories, video, messaging features. What's needed to support multiple content types?",
      enterprise: "Billions of users, AI content moderation. What enterprise-scale components are required?"
    }
  };
  
  return descriptions[companyId]?.[phase] || `Choose the right components for ${phase} phase.`;
}