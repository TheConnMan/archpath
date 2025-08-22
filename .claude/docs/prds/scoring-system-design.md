# ArchPath Scoring System & Service Equivalency

## Core Scoring Philosophy

**Fair Assessment Across Cloud Providers:** Players shouldn't be penalized for AWS vs Azure vs GCP knowledge
**Architectural Thinking Over Memorization:** Reward understanding of concepts, not specific product names
**Progressive Complexity:** Avoid over-engineering in early phases, reward appropriate scaling decisions

## Service Equivalency Groups

### Compute Services
```json
{
  "web-server": {
    "category": "compute",
    "equivalents": ["apache", "nginx", "nodejs", "express", "flask", "django", "tomcat"],
    "cloud_services": ["ec2", "azure-vm", "gce", "app-service", "elastic-beanstalk"]
  },
  "serverless": {
    "category": "compute", 
    "equivalents": ["lambda", "azure-functions", "cloud-functions", "vercel", "netlify-functions"],
    "cloud_services": ["aws-lambda", "azure-functions", "gcp-cloud-functions"]
  },
  "container-platform": {
    "category": "compute",
    "equivalents": ["docker", "kubernetes", "k8s", "ecs", "aks", "gke"],
    "cloud_services": ["aws-ecs", "aws-eks", "azure-aks", "gcp-gke"]
  }
}
```

### Database Services
```json
{
  "relational-database": {
    "category": "database",
    "equivalents": ["mysql", "postgresql", "postgres", "sql-server", "oracle"],
    "cloud_services": ["rds", "aurora", "azure-sql", "cloud-sql", "planetscale"]
  },
  "nosql-database": {
    "category": "database", 
    "equivalents": ["mongodb", "dynamodb", "cosmosdb", "firestore", "cassandra"],
    "cloud_services": ["aws-dynamodb", "azure-cosmosdb", "gcp-firestore"]
  },
  "cache": {
    "category": "database",
    "equivalents": ["redis", "memcached", "elasticache", "azure-cache"],
    "cloud_services": ["aws-elasticache", "azure-redis", "gcp-memorystore"]
  },
  "search-engine": {
    "category": "database",
    "equivalents": ["elasticsearch", "opensearch", "solr", "algolia"],
    "cloud_services": ["aws-opensearch", "azure-search", "gcp-search"]
  }
}
```

### Storage Services  
```json
{
  "object-storage": {
    "category": "storage",
    "equivalents": ["s3", "blob-storage", "cloud-storage", "minio"],
    "cloud_services": ["aws-s3", "azure-blob", "gcp-cloud-storage"]
  },
  "file-storage": {
    "category": "storage",
    "equivalents": ["efs", "azure-files", "filestore", "nfs"],
    "cloud_services": ["aws-efs", "azure-files", "gcp-filestore"]
  },
  "cdn": {
    "category": "storage",
    "equivalents": ["cloudfront", "azure-cdn", "cloudflare", "fastly"],
    "cloud_services": ["aws-cloudfront", "azure-cdn", "gcp-cdn"]
  }
}
```

### Networking Services
```json
{
  "load-balancer": {
    "category": "networking",
    "equivalents": ["alb", "nlb", "azure-lb", "gcp-lb", "nginx-lb", "haproxy"],
    "cloud_services": ["aws-alb", "azure-load-balancer", "gcp-load-balancer"]
  },
  "api-gateway": {
    "category": "networking", 
    "equivalents": ["api-gateway", "azure-api-management", "kong", "zuul"],
    "cloud_services": ["aws-api-gateway", "azure-api-management", "gcp-api-gateway"]
  },
  "dns": {
    "category": "networking",
    "equivalents": ["route53", "azure-dns", "cloud-dns", "cloudflare-dns"],
    "cloud_services": ["aws-route53", "azure-dns", "gcp-cloud-dns"]
  }
}
```

### Messaging Services
```json
{
  "message-queue": {
    "category": "messaging",
    "equivalents": ["sqs", "service-bus", "pub-sub", "rabbitmq", "kafka"],
    "cloud_services": ["aws-sqs", "azure-service-bus", "gcp-pub-sub"]
  },
  "event-streaming": {
    "category": "messaging",
    "equivalents": ["kinesis", "event-hubs", "kafka", "pulsar"],
    "cloud_services": ["aws-kinesis", "azure-event-hubs", "gcp-pub-sub"]
  },
  "websockets": {
    "category": "messaging", 
    "equivalents": ["socket.io", "websockets", "signalr", "api-gateway-websockets"],
    "cloud_services": ["aws-api-gateway-websocket", "azure-web-pubsub", "gcp-websocket"]
  }
}
```

## Scoring Algorithm

### Phase-Based Scoring Matrix

```javascript
const scoringMatrix = {
  mvp: {
    required: ["web-server", "database"], // Minimum viable - 50 points each
    recommended: ["cache", "file-storage"], // Good to have - 30 points each  
    advanced: ["load-balancer", "cdn"], // Unnecessary in MVP - 10 points each
    excessive: ["message-queue", "search-engine"] // Over-engineering - 0 points
  },
  scale1: {
    required: ["load-balancer", "cache"], // Now essential - 50 points
    recommended: ["cdn", "message-queue"], // Helps scaling - 30 points
    advanced: ["search-engine", "analytics"], // Nice to have - 20 points
    excessive: ["data-warehouse", "ml-pipeline"] // Still early - 0 points
  },
  scale2: {
    required: ["cdn", "message-queue", "monitoring"], // Must have - 50 points
    recommended: ["search-engine", "analytics"], // Important - 30 points
    advanced: ["data-warehouse", "ml-pipeline"], // Legitimate now - 20 points
    excessive: ["blockchain", "quantum-computing"] // Joke entries - 0 points
  }
};
```

### Scoring Calculation

```javascript
function calculateScore(selectedComponents, phase, company) {
  let score = 0;
  let feedback = [];
  
  const matrix = scoringMatrix[phase];
  const companyConfig = companies[company].phases[phase];
  
  // Required components - high points, penalty if missing
  matrix.required.forEach(component => {
    if (hasEquivalent(selectedComponents, component)) {
      score += 50;
      feedback.push(`✓ ${component} - Essential for this phase`);
    } else {
      score -= 25; // Penalty for missing critical components
      feedback.push(`✗ Missing ${component} - Critical for ${phase}`);
    }
  });
  
  // Recommended components - good points
  matrix.recommended.forEach(component => {
    if (hasEquivalent(selectedComponents, component)) {
      score += 30;
      feedback.push(`✓ ${component} - Smart choice for scaling`);
    }
  });
  
  // Advanced components - small points
  matrix.advanced.forEach(component => {
    if (hasEquivalent(selectedComponents, component)) {
      score += 20;
      feedback.push(`✓ ${component} - Forward thinking`);
    }
  });
  
  // Excessive components - no points (but not penalty to avoid being too harsh)
  matrix.excessive.forEach(component => {
    if (hasEquivalent(selectedComponents, component)) {
      feedback.push(`? ${component} - Might be over-engineering for this phase`);
    }
  });
  
  return { score: Math.max(0, score), feedback, maxScore: matrix.required.length * 50 };
}
```

### Service Matching Logic

```javascript
function hasEquivalent(selectedComponents, targetService) {
  const serviceGroup = serviceEquivalency[targetService];
  if (!serviceGroup) return false;
  
  return selectedComponents.some(selected => {
    // Exact match
    if (selected === targetService) return true;
    
    // Generic equivalent match
    if (serviceGroup.equivalents.includes(selected.toLowerCase())) return true;
    
    // Cloud service match  
    if (serviceGroup.cloud_services.includes(selected.toLowerCase())) return true;
    
    // Handle common variations
    const normalized = normalizeServiceName(selected);
    return serviceGroup.equivalents.includes(normalized) || 
           serviceGroup.cloud_services.includes(normalized);
  });
}

function normalizeServiceName(serviceName) {
  return serviceName
    .toLowerCase()
    .replace(/aws-/, '')
    .replace(/azure-/, '')
    .replace(/gcp-/, '')
    .replace(/google-/, '')
    .replace(/-/g, '')
    .replace(/\s+/g, '');
}
```

## Bonus Multipliers

### Speed Bonus
```javascript
const speedBonus = {
  under5seconds: 2.0,   // "Lightning fast!"
  under10seconds: 1.5,  // "Quick thinking!"  
  under20seconds: 1.2,  // "Good pace"
  over20seconds: 1.0    // No bonus
};
```

### Streak Multiplier
```javascript
const streakMultiplier = {
  3: 1.1,   // "Getting warmed up"
  5: 1.2,   // "On a roll!" 
  8: 1.3,   // "Unstoppable!"
  10: 1.5   // "Architecture master!"
};
```

### Efficiency Bonus (Minimalist Approach)
```javascript
// Bonus for using minimum viable components
function calculateEfficiencyBonus(selectedComponents, phase) {
  const matrix = scoringMatrix[phase];
  const optimalCount = matrix.required.length + Math.floor(matrix.recommended.length / 2);
  const actualCount = selectedComponents.length;
  
  if (actualCount === optimalCount) return 1.3; // "Perfect efficiency!"
  if (actualCount <= optimalCount + 1) return 1.1; // "Nice restraint"
  return 1.0; // No bonus for over-engineering
}
```

## Company-Specific Scoring Variations

### Netflix Scaling Priorities
```json
{
  "netflix": {
    "mvp": {
      "critical": ["video-storage", "streaming-server"], // Netflix-specific needs
      "weight_multiplier": {
        "cdn": 2.0, // Extra important for Netflix
        "video-encoding": 1.5
      }
    }
  }
}
```

### Slack Communication Focus  
```json
{
  "slack": {
    "scale1": {
      "critical": ["websockets", "message-queue"],
      "weight_multiplier": {
        "real-time-messaging": 2.0,
        "notification-service": 1.5
      }
    }
  }
}
```

## Grading Feedback System

### Instant Feedback Categories
```javascript
const feedbackTypes = {
  excellent: "🎯 Spot on! That's exactly what {company} used.",
  good: "👍 Smart choice. {service} handles {use_case} well.",
  acceptable: "✅ That works, though {alternative} might be more common.",
  questionable: "🤔 {service} could work, but might be over-engineered for {phase}.",
  missing: "❌ You're missing {critical_service} - essential for {reason}.",
  educational: "💡 Did you know? {company} actually used {service} because {reason}."
};
```

### Detailed Explanations
```javascript
const explanations = {
  "netflix-mvp-cdn": "Netflix didn't use a CDN initially - they started with basic file serving. CDNs became critical when they had millions of users streaming globally.",
  "slack-websockets": "Slack's real-time messaging was built on WebSockets from day one. Without this, messages wouldn't appear instantly.",
  "uber-geospatial": "Uber's location matching required specialized geospatial databases like PostGIS to efficiently find nearby drivers."
};
```

## Implementation Notes

### MVP Scoring (Simple)
- Exact string matching with predefined correct answers
- Basic point system (correct = 10 points, wrong = 0 points)
- No cloud provider equivalency yet

### Phase 2 Scoring (Equivalency)
- Implement service equivalency matching
- Add bonus multipliers
- Detailed feedback with explanations

### Phase 3 Scoring (AI-Enhanced)
- LLM evaluation for edge cases
- Natural language component descriptions
- Dynamic difficulty adjustment

### Local Storage Schema
```javascript
const playerProgress = {
  currentLevel: "netflix-mvp",
  scores: {
    "netflix-mvp": { score: 150, maxScore: 200, attempts: 2 },
    "netflix-scale1": { score: 180, maxScore: 250, attempts: 1 }
  },
  achievements: ["first-perfect", "speed-demon", "minimalist"],
  totalPlayTime: 1440, // seconds
  streak: 5
};
```

This scoring system ensures fairness across cloud provider knowledge while rewarding good architectural thinking and appropriate technology choices for each scaling phase.