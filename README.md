# ArchPath 🏗️

**Learn architectural evolution through the real stories of tech companies**

ArchPath is an interactive educational game where you learn system design by following the architectural evolution of major tech companies from MVP to enterprise scale. Explore **11 companies** across Tech, Finance, and Ecommerce industries. Understand not just *what* components to use, but *why* they matter at each stage.

## 🎯 What You'll Learn

- **Real Architecture Patterns**: Based on actual company evolution across multiple industries
- **Scaling Decisions**: Why companies choose specific components at different scales  
- **Architectural Reasoning**: Deep explanations of architectural trade-offs
- **Industry Diversity**: Learn from Tech, Finance, and Ecommerce scaling challenges
- **Best Practices**: Learn from 11 major companies including Netflix, Stripe, Shopify, and more

## 🚀 Play Now

**Live Game**: [https://theconnman.github.io/archpath/](https://theconnman.github.io/archpath/)

## 🎮 How to Play

1. **Choose a Company**: Select from 11 companies across Tech, Finance, and Ecommerce
2. **Build Architecture**: Pick components for each scaling phase
3. **Learn the Why**: Get detailed explanations of architectural decisions
4. **Progress Through Phases**: MVP → First Scale → Growth Scale → Enterprise

## 🏢 Featured Companies

### Tech Companies
- **Netflix** (Easy): Video streaming platform evolution
- **Slack** (Easy): Real-time workplace communication scaling  
- **Uber** (Hard): Ride-sharing platform challenges
- **Spotify** (Medium): Music streaming and recommendations
- **Instagram** (Medium): Photo sharing to billions of users

### Finance Companies
- **Stripe** (Medium): Payment processing from simple API to $1T platform
- **Monzo** (Hard): Digital banking with 2,800 microservices architecture
- **Robinhood** (Hard): Trading platform handling volatile market spikes

### Ecommerce Companies
- **Shopify** (Hard): Multi-tenant platform serving millions of merchants
- **DoorDash** (Hard): Real-time logistics coordinating three-sided marketplace
- **Etsy** (Medium): Creative marketplace with personalized discovery

## ✨ Key Features

### Educational Focus
- **Component Tooltips**: Real-world examples (nginx, PostgreSQL, AWS S3)
- **Architectural Rationale**: Learn why specific components work at each scale
- **Historical Context**: Actual scaling challenges these companies faced

### Game Mechanics
- **Phase-by-Phase Learning**: 4 distinct scaling stages per company
- **Smart Scoring**: Rewards good choices, penalizes over-engineering
- **Educational Feedback**: Detailed explanations, not just points

### Technical Excellence
- **Responsive Design**: Works on all devices
- **Dark Mode**: Engineer-friendly interface
- **Comprehensive Testing**: 120+ test scenarios
- **Fast Performance**: Optimized Svelte + Vite build

## 🛠️ Development

### Quick Start
```bash
# Clone the repository
git clone https://github.com/TheConnMan/archpath.git
cd archpath

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview production build
npm run test         # Run Playwright tests
npm run test:ui      # Run tests with UI
npm run deploy       # Deploy to GitHub Pages
```

### Tech Stack
- **Frontend**: Svelte 5 + Vite
- **Styling**: TailwindCSS (dark mode, responsive)
- **Testing**: Playwright (120+ scenarios)
- **Deployment**: GitHub Pages
- **Architecture**: Component-based, consolidated state management

## 🧪 Testing

Comprehensive test suite covering:
- Complete game flow (company selection → phase completion)
- Component interaction (selection, removal, tooltips)
- Scoring system (perfect scores, penalties, accumulation)
- UI/UX (responsive design, accessibility, dark mode)
- All companies (unique challenges, progression)

```bash
npm run test        # Run all tests
npm run test:ui     # Interactive test runner
```

## 🎯 Educational Philosophy

ArchPath transforms system design learning from **pattern memorization** to **architectural understanding**:

- **Real Stories**: Based on actual company architecture evolution
- **Contextual Learning**: Understand business drivers behind technical decisions
- **Progressive Complexity**: Start simple, scale appropriately
- **Architectural Reasoning**: Learn the "why" behind every component choice

## 🤝 Contributing

We welcome contributions! Areas where you can help:

- **New Companies**: Add more tech company evolution stories
- **Educational Content**: Improve architectural explanations
- **Features**: Onboarding tutorial, advanced scoring, etc.
- **Testing**: Expand test coverage
- **Documentation**: Improve guides and explanations

## 📜 License

MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- Built with love using Svelte and TailwindCSS
- Architecture patterns inspired by real tech company engineering blogs
- Educational approach guided by UX research and testing

---

**Ready to learn system design through real company stories?**  
🎮 **[Start Playing →](https://theconnman.github.io/archpath/)**