# ArchPath - Claude Development Documentation

**Educational system design game built with Claude Code assistance**

## 📋 Project Overview

ArchPath is an interactive educational game that teaches system architecture through the real evolution stories of major tech companies. Users learn by making architectural decisions as companies scale from MVP to enterprise.

### Key Metrics
- **5 Tech Companies**: Netflix, Slack, Uber, Spotify, Instagram
- **21 Components**: Categorized across compute, database, storage, network, messaging, analytics, security
- **4 Scaling Phases**: MVP → First Scale → Growth Scale → Enterprise
- **120+ Test Scenarios**: Comprehensive Playwright test coverage
- **4 Core Components**: Consolidated from 6+ during development

## 🎯 Educational Goals

**Transform system design learning from pattern memorization to architectural understanding:**

1. **Real Company Stories**: Based on actual architectural evolution
2. **Contextual Learning**: Business drivers behind technical decisions
3. **Progressive Complexity**: Start simple, scale appropriately
4. **Architectural Reasoning**: Deep explanations of component choices

## 🏗️ Technical Architecture

### Frontend Stack
- **Framework**: Svelte 5 with modern reactive features
- **Styling**: TailwindCSS v3.4 (dark mode, responsive)
- **Build Tool**: Vite 7 (fast development, optimized builds)
- **Deployment**: GitHub Pages with automated deployment

### Component Architecture
```
src/
├── lib/
│   ├── App.svelte              # Main application component
│   ├── GameView.svelte         # Consolidated game interface
│   ├── ComponentPalette.svelte # Component selection UI
│   ├── componentData.js        # Unified component data
│   └── gameData.js            # Scoring & architectural rationale
├── app.css                    # Global styles
└── main.js                    # Application entry point
```

### Key Design Decisions

**Component Consolidation**:
- Merged `GameArea` + `PhaseArea` → `GameView` (eliminated coordinator complexity)
- Unified component data in `componentData.js` (eliminated 40+ lines duplication)
- Simplified scoring system from 276 → 217 lines

**Educational Focus**:
- Component tooltips with real-world examples
- Post-phase architectural rationale with detailed explanations
- Historical context about actual company scaling challenges

**User Experience**:
- Dark mode for engineer-friendly interface
- Clean, flat design (removed emojis, bright colors per user feedback)
- Responsive design across all devices

## 📊 Game Data Structure

### Component Data
```javascript
{
  id: 'web-server',
  name: 'Web Server',
  category: 'compute',
  tooltip: 'Serves static content (HTML, CSS, JS) to users. Examples: nginx, Apache.'
}
```

### Phase Requirements (per company)
```javascript
netflix: {
  mvp: {
    required: ['web-server', 'database'],
    beneficial: ['file-storage'],
    avoid: ['cdn', 'cache', 'load-balancer']
  }
}
```

### Architectural Rationale
```javascript
netflix: {
  mvp: {
    title: "Simple Content Delivery Foundation",
    explanation: "Netflix started as DVD-by-mail...",
    keyInsights: ["Web Server handles basic catalog browsing..."],
    architecturalPrinciples: ["Start simple: Minimum viable infrastructure..."]
  }
}
```

## 🧪 Testing Strategy

### Comprehensive Test Coverage (120+ scenarios)
- **Game Flow Tests**: Company selection, phase completion, navigation
- **Component Tests**: Selection, removal, category filtering, tooltips
- **Scoring Tests**: Perfect scores, partial scores, over-engineering penalties
- **Company Tests**: All 5 companies, unique challenges, progression
- **UI/UX Tests**: Responsive design, accessibility, dark mode consistency

### Test Infrastructure
```bash
npm run test        # Run all Playwright tests
npm run test:ui     # Interactive test runner
npm run test:headed # Run tests with browser visible
```

## 🎨 Design System

### Color Palette (Dark Mode)
- **Background**: Gray-900 (#111827)
- **Text**: Gray-100 (#f3f4f6)
- **Cards**: Gray-800 with gray-700 borders
- **Success**: Green-400/500 tones
- **Interactive**: Blue-400/500 accents

### Component Categories
- **Compute**: Orange-500 (web servers, app servers, serverless)
- **Database**: Purple-500 (databases, cache, search)
- **Storage**: Green-500 (file storage, CDN, object storage)
- **Network**: Blue-500 (load balancers, API gateways, DNS)
- **Messaging**: Red-500 (queues, WebSockets, event streaming)
- **Analytics**: Emerald-500 (monitoring, logging, analytics)
- **Security**: Amber-500 (auth, firewall, encryption)

## 🚀 Deployment

### GitHub Pages Setup
```bash
# Automated deployment
npm run deploy  # Builds and deploys to gh-pages branch

# Manual process
npm run build   # Creates optimized dist/ folder
gh-pages -d dist # Deploys to GitHub Pages
```

### Configuration
- **Base Path**: `/archpath/` (configured in `vite.config.js`)
- **Live URL**: https://theconnman.github.io/archpath/
- **Auto-deployment**: via `gh-pages` package

## 📈 Development Journey

### Major Milestones
1. **Initial Setup**: Svelte + TailwindCSS foundation
2. **Game Mechanics**: Component selection, scoring system
3. **Design Overhaul**: Clean, flat dark mode (user feedback driven)
4. **Code Consolidation**: 50%+ code reduction, eliminated over-engineering
5. **Educational Enhancement**: Tooltips and architectural rationale
6. **Testing**: Comprehensive Playwright test suite
7. **Deployment**: GitHub Pages with automated deployment

### User Feedback Integration
- **"Too many emojis, too bright"** → Clean flat design with subdued colors
- **"Need to understand why"** → Added architectural rationale explanations
- **"Over-engineered code"** → Major consolidation reducing complexity

## 🛠️ Development Commands

```bash
# Development
npm run dev          # Start development server (localhost:5173)
npm install          # Install dependencies

# Building
npm run build        # Production build
npm run preview      # Preview production build locally

# Testing
npm run test         # Run Playwright tests (headless)
npm run test:ui      # Interactive test UI
npm run test:headed  # Run tests with visible browser

# Deployment
npm run deploy       # Build and deploy to GitHub Pages
git push origin main # Push code changes to GitHub
```

## 📚 Educational Content

### Company Challenges Covered
- **Netflix**: DVD → Streaming → Global video delivery → AI recommendations
- **Slack**: Team chat → WebSocket scaling → Enterprise features → Global platform
- **Uber**: Local rideshare → Geographic scaling → Microservices → Global platform
- **Spotify**: Music streaming → Mobile + ML → Microservices → AI platform
- **Instagram**: Photo sharing → Feed scaling → Stories/video → Billions of users

### Learning Outcomes
Users understand:
- Why CDNs matter for video delivery (Netflix scale1)
- When WebSockets become critical (Slack MVP)
- How load balancers enable horizontal scaling
- Why caching reduces database load at scale
- When microservices architecture makes sense
- How monitoring becomes essential at scale

## 🔮 Future Enhancements

### Priority Features
1. **Onboarding Tutorial**: First-time user guidance (UX Priority 3)
2. **More Companies**: Twitter, Airbnb, Stripe, etc.
3. **Advanced Scoring**: Time-based challenges, efficiency metrics
4. **Social Features**: Share architectures, compare solutions

### Technical Improvements
- **Performance**: Further optimization for mobile devices
- **Accessibility**: Enhanced screen reader support
- **Internationalization**: Multi-language support
- **Analytics**: User behavior tracking for educational insights

## 🤝 Contributing Guidelines

### Code Style
- **Svelte**: Use composition API patterns, reactive statements
- **CSS**: TailwindCSS classes, avoid custom CSS when possible
- **JavaScript**: ES6+, functional programming patterns
- **Testing**: Test-driven development, comprehensive coverage

### Adding New Companies
1. Add company data to `src/lib/gameData.js`
2. Add architectural rationale explanations
3. Create phase-specific challenges
4. Add comprehensive test scenarios
5. Update README and documentation

### Educational Content Guidelines
- Base on real company engineering blogs and public information
- Focus on architectural reasoning, not just component lists
- Include business context for technical decisions
- Provide progressive complexity across phases

---

**ArchPath represents a new approach to system design education - learning through real stories of how the world's most successful tech companies solved their scaling challenges.**