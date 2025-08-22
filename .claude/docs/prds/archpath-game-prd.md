# ArchPath Game - Product Requirements Document

## Overview

**Product Name:** ArchPath  
**Target Users:** Software engineers, architects, and students learning system design  
**Project Scope:** Weekend project with incremental phases  
**Core Concept:** Educational game where players guess the architectural evolution of major tech companies by categorizing components into phases

## Problem Statement

Engineers struggle to learn system design and architectural scaling patterns in an engaging way. Existing resources are either too theoretical (books) or too complex (real system analysis). There's no gamified way to practice architectural thinking and understand how systems evolve over time.

## Solution

A dark-mode educational game where players:
1. Choose components for a company's initial MVP architecture
2. Identify the first scaling bottlenecks 
3. Select solutions for each evolution phase
4. Progress through increasingly complex architectural challenges

**Key Insight:** Focus on component **categorization** rather than diagram drawing - easier to grade and implement.

## Target Audience

**Primary:** Mid-level software engineers (2-5 years experience)
- Preparing for senior/architect roles
- Studying for system design interviews
- Want to understand how real companies scale

**Secondary:** Engineering students and bootcamp graduates
- Learning system design concepts
- Need practical examples beyond textbooks

## Core Game Mechanics

### Component Selection Interface
- **Service Palette:** Categorized components (compute, storage, database, networking, etc.)
- **Phase Buckets:** Drop zones for "MVP", "Scale Point 1", "Scale Point 2", "Enterprise"
- **Drag-Drop Categorization:** Move components between phases
- **Real-time Validation:** Immediate feedback on choices

### Game Flow
1. **Company Selection:** Choose from Slack, Netflix, Uber, etc.
2. **Phase 1 - MVP:** "What 3 core components does Slack need to launch?"
3. **Phase 2 - First Scale:** "What breaks first at 10K users?"
4. **Phase 3 - Growth Scale:** "How do we handle 100K concurrent users?"
5. **Phase 4 - Enterprise:** "What's needed for millions of users?"

### Scoring System
- **Accuracy Points:** Correct component selection (10-50 points)
- **Efficiency Bonus:** Avoiding over-engineering (bonus multiplier)
- **Speed Bonus:** Quick decisions (time-based multiplier)
- **Cloud Equivalency:** AWS RDS = PostgreSQL = Azure SQL (same points)

## Phase 1: MVP (Weekend Project)

### Core Features
- **5 Companies:** Slack, Netflix, Uber, Spotify, Instagram
- **3 Phases Each:** MVP → First Scale → Growth Scale
- **30 Components:** Mix of AWS/Azure/GCP services and generic tech
- **Dark Mode UI:** Engineer-focused aesthetic
- **Local Storage:** Progress and high scores
- **Mobile Responsive:** Touch-friendly component selection

### Technical Implementation
- **Framework:** Svelte + SvelteKit
- **Styling:** TailwindCSS with dark theme
- **State Management:** Svelte stores
- **Storage:** localStorage for game progress
- **Icons:** Official cloud provider icon sets

### UI Components
```
[Company Logo] - Netflix Architecture Challenge
┌─────────────────┬─────────────────┐
│   Components    │    Game Area    │
│                 │                 │
│ □ Web Server    │ ┌─── MVP ────┐  │
│ □ Database      │ │            │  │
│ □ CDN          │ │ [Drop Zone] │  │
│ □ Load Balancer │ │            │  │
│ □ Cache         │ └────────────┘  │
│ □ Message Queue │                 │
│ □ File Storage  │ ┌─First Scale─┐ │
│ □ Video Encoder │ │            │  │
│ □ Search Engine │ │ [Drop Zone] │  │
│ □ Analytics     │ │            │  │
│                 │ └────────────┘  │
└─────────────────┴─────────────────┘
```

### Game Data Structure
```json
{
  "companies": {
    "netflix": {
      "name": "Netflix",
      "phases": {
        "mvp": {
          "description": "DVD rental site with basic streaming",
          "correctComponents": ["web-server", "database", "file-storage"],
          "explanation": "Netflix started as a simple web app with user accounts and file serving"
        },
        "scale1": {
          "description": "10M users, streaming quality issues",
          "correctComponents": ["cdn", "load-balancer", "cache"],
          "explanation": "CDN for global delivery, LB for traffic, cache for metadata"
        }
      }
    }
  }
}
```

## Phase 2: Gamification & Polish

### Features
- **Progress Tracking:** XP system, level progression
- **Achievement System:** "Cost Optimizer", "Scale Master", etc.
- **Company Difficulty:** Easy (Slack) → Hard (Google Search)
- **Hints System:** Contextual tips for struggling players
- **Explanations:** "Why this choice?" educational content

### Enhanced Scoring
- **Star Rating:** 1-3 stars per level based on efficiency
- **Leaderboard:** Local high scores with sharing
- **Streak Counter:** Consecutive correct answers
- **Time Attack Mode:** Speed challenges

## Phase 3: Advanced Features

### New Game Modes
- **Disaster Recovery:** "Netflix goes down, what failed?"
- **Cost Optimization:** "Reduce AWS bill by 30%"
- **Security Review:** "Add security components"
- **Migration Challenge:** "Move from monolith to microservices"

### AI Integration
- **Smart Grading:** LLM evaluates alternative solutions
- **Dynamic Hints:** Context-aware help system
- **Custom Scenarios:** AI generates new companies/challenges

## Phase 4: Social & Competitive

### Multiplayer Features
- **Team Challenges:** Collaborate on complex architectures
- **Tournament Mode:** Weekly competitions
- **Company Requests:** User-submitted scenarios
- **Expert Reviews:** Industry professionals validate solutions

## Success Metrics

### MVP Success (Phase 1)
- **Engagement:** Average session > 10 minutes
- **Completion:** 70% complete at least one company
- **Learning:** Players can explain their choices
- **Technical:** No bugs, smooth performance

### Growth Metrics (Phase 2+)
- **Retention:** 30% return within a week
- **Progression:** Players unlock advanced companies
- **Social:** Score sharing on LinkedIn/Twitter
- **Educational:** Improved system design interview performance

## Technical Architecture

### Frontend Only (MVP)
```
Svelte App
├── Game Engine (component logic)
├── Company Data (JSON files)
├── Scoring System (local calculation)
├── Progress Storage (localStorage)
└── UI Components (dark theme)
```

### Future Backend (Phase 3+)
```
Frontend → API Gateway → Lambda Functions
                      ├── User Management
                      ├── Leaderboards  
                      ├── AI Grading
                      └── Content CMS
                      └── Database (user progress)
```

## Risk Assessment

### Technical Risks
- **Component Complexity:** Keep initial set simple (30 components max)
- **Grading Logic:** Start with exact matches, add AI later
- **Mobile Performance:** Test on lower-end devices

### Design Risks  
- **Over-Engineering:** Resist complex diagram features in MVP
- **Cognitive Load:** Too many choices overwhelms beginners
- **Dark Mode Only:** Ensure sufficient contrast for accessibility

### Business Risks
- **Limited Audience:** Engineers only, not mainstream
- **Competition:** AWS/Azure might build similar tools
- **Maintenance:** Company architectures change over time

## Go-to-Market Strategy

### Launch Strategy
1. **Developer Communities:** Reddit r/ExperiencedDevs, Hacker News
2. **LinkedIn Content:** "Test your system design knowledge"
3. **YouTube Demos:** Streamers playing the game
4. **Conference Talks:** Present at engineering meetups

### Content Marketing
- **Blog Series:** "How Netflix Really Scales" with game integration
- **Interview Prep:** Market as system design interview practice
- **Open Source:** Release component data for community contributions

## Acceptance Criteria

### Phase 1 MVP Complete When:
- [ ] 5 companies with 3 phases each implemented
- [ ] 30 components with proper categorization
- [ ] Drag-drop interface working on desktop/mobile
- [ ] Scoring system with cloud service equivalency
- [ ] Dark mode UI with proper contrast
- [ ] Local storage persistence
- [ ] No performance issues on standard devices
- [ ] Deployed and accessible via URL

### Quality Gates
- [ ] All lint checks pass
- [ ] Manual testing on 3 devices (desktop, tablet, phone)
- [ ] 5 beta users complete full gameplay
- [ ] Loading time < 3 seconds on average internet
- [ ] Accessibility audit passes (dark mode focus)

---

## Appendix

### Component Categories
- **Compute:** Web Server, App Server, Lambda Functions
- **Database:** SQL Database, NoSQL Database, Cache, Search Engine  
- **Storage:** File Storage, Block Storage, CDN, Backup
- **Networking:** Load Balancer, API Gateway, VPN, DNS
- **Messaging:** Message Queue, Event Bus, WebSockets
- **Analytics:** Metrics, Logging, Monitoring, Data Warehouse
- **Security:** Auth Service, Rate Limiting, WAF, Encryption
- **DevOps:** CI/CD, Container Registry, Orchestration

### Sample Company Scenarios

**Slack MVP:**
- Web Server (React/Node.js)
- Database (user accounts, channels)  
- WebSockets (real-time messaging)

**Slack Scale Point 1 (10K users):**
- Message History Database
- File Upload Storage  
- Notification Service

**Netflix MVP:**
- Web Server (catalog browsing)
- Database (user accounts, ratings)
- File Storage (video files)

**Netflix Scale Point 1 (streaming launch):**
- CDN (video delivery)
- Video Encoding Service
- Load Balancer

### Development Timeline
- **Week 1:** Core game engine, 2 companies
- **Week 2:** Polish UI, add 3 more companies  
- **Week 3:** Scoring system, local storage
- **Week 4:** Testing, deployment, beta feedback