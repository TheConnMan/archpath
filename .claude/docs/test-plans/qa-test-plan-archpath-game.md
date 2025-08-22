# QA Test Plan: ArchPath Educational Game
**Project:** ArchPath - Architecture Learning Game
**URL:** http://localhost:5173
**Last Updated:** 2025-08-22

## Requirements Summary

ArchPath is an educational game where users:
1. Select a tech company (Netflix, Slack, Uber, Spotify, Instagram)
2. Progress through 4 scaling phases (MVP → Scale1 → Scale2 → Enterprise)
3. Select appropriate architectural components for each phase
4. Receive scores based on component choices with detailed feedback

### Core Features to Test
- Company selection workflow
- Phase progression system (4 phases)
- Component selection mechanics
- Scoring and feedback system
- UI/UX quality and responsiveness
- Data persistence (localStorage)
- Edge cases and error handling

## Test Strategy & Distribution

### Parallel Execution Plan
- **Number of QA Test Runners:** 5 (maximum parallel execution for comprehensive coverage)
- **Execution Time:** Estimated 15-20 minutes total
- **Coverage Goal:** 100% of user journeys and critical paths

## Port Assignment for Parallel Execution
- **Runner 1:** Port 4000 - UI/UX & Visual Design Testing
- **Runner 2:** Port 4100 - Core Game Mechanics & Functional Testing
- **Runner 3:** Port 4200 - End-to-End Integration Testing
- **Runner 4:** Port 4300 - Edge Cases & Error Handling
- **Runner 5:** Port 4400 - Cross-browser & Performance Testing

## Test Groups for Parallel Execution

### Group 1: UI/UX & Visual Design Testing (Port 4000)
**Focus:** Visual design quality, layout consistency, responsiveness

#### Test Cases:
1. **Visual Design Consistency**
   - Verify clean, flat design without emojis
   - Check color consistency across all screens
   - Validate typography and spacing
   - Ensure consistent button styles

2. **Layout & Responsiveness**
   - Test on desktop (1920x1080, 1366x768)
   - Test on tablet (768x1024)
   - Test on mobile (375x667, 414x896)
   - Verify component alignment at all breakpoints

3. **Component Visual States**
   - Hover states for interactive elements
   - Active/selected states for components
   - Disabled states where applicable
   - Focus states for keyboard navigation

4. **Animation & Transitions**
   - Smooth phase transitions
   - Component selection animations
   - Score display animations
   - Loading states if any

### Group 2: Core Game Mechanics Testing (Port 4100)
**Focus:** Component selection, scoring logic, phase mechanics

#### Test Cases:
1. **Component Selection Mechanics**
   - Add single component
   - Add multiple components from different categories
   - Remove components
   - Category filtering functionality
   - Maximum component limits per phase

2. **Scoring System Validation**
   - Score calculation for correct components
   - Score penalties for incorrect components
   - Score breakdown display
   - Feedback message accuracy
   - Total score accumulation

3. **Phase Progression Logic**
   - Automatic advancement after component selection
   - Phase state management
   - Progress indicators
   - Phase-specific component availability

4. **Game State Management**
   - Reset game functionality
   - Return to company selection
   - Phase navigation (if available)

### Group 3: End-to-End Integration Testing (Port 4200)
**Focus:** Complete user journeys for each company

#### Test Cases:
1. **Netflix Journey**
   - Select Netflix → Complete all 4 phases
   - Verify Netflix-specific components
   - Check scoring relevance to video streaming

2. **Slack Journey**
   - Select Slack → Complete all 4 phases
   - Verify Slack-specific components
   - Check scoring relevance to messaging platform

3. **Uber Journey**
   - Select Uber → Complete all 4 phases
   - Verify Uber-specific components
   - Check scoring relevance to ride-sharing

4. **Spotify Journey**
   - Select Spotify → Complete all 4 phases
   - Verify Spotify-specific components
   - Check scoring relevance to music streaming

5. **Instagram Journey**
   - Select Instagram → Complete all 4 phases
   - Verify Instagram-specific components
   - Check scoring relevance to social media

### Group 4: Edge Cases & Error Handling (Port 4300)
**Focus:** Boundary conditions, error scenarios, unusual interactions

#### Test Cases:
1. **Empty Selection Scenarios**
   - Submit phase with no components
   - Skip phases
   - Complete game with minimal selections

2. **Rapid Interaction Testing**
   - Double-click components rapidly
   - Rapid phase progression
   - Multiple simultaneous selections
   - Fast category switching

3. **Browser Navigation**
   - Browser back button behavior
   - Browser forward button behavior
   - Page refresh during game
   - Tab switching and return

4. **Data Persistence Edge Cases**
   - Clear localStorage mid-game
   - Corrupt localStorage data
   - Browser privacy mode
   - Multiple tabs open

5. **Input Validation**
   - Maximum component selection limits
   - Keyboard navigation edge cases
   - Touch interaction on non-touch devices

### Group 5: Cross-browser & Performance Testing (Port 4400)
**Focus:** Browser compatibility, performance metrics, accessibility

#### Test Cases:
1. **Browser Compatibility**
   - Chrome (latest version)
   - Firefox (latest version)
   - Safari (if available)
   - Edge (latest version)

2. **Performance Metrics**
   - Initial load time
   - Phase transition speed
   - Component selection responsiveness
   - Memory usage over extended play

3. **Accessibility Testing**
   - Keyboard navigation through all elements
   - Screen reader compatibility
   - Color contrast ratios
   - Focus indicators
   - Alt text for images

4. **LocalStorage Functionality**
   - Save game progress
   - Restore game on refresh
   - Cross-session persistence
   - Storage quota handling

## Coordination Plan

### Execution Strategy
1. All 5 QA test runners execute simultaneously
2. Each runner focuses on their assigned test group
3. Real-time issue reporting as problems are found
4. Continuous monitoring of all test execution
5. Immediate escalation of critical issues

### Communication Protocol
- Each runner provides structured feedback
- Issues categorized by severity (Critical/High/Medium/Low)
- Screenshots/recordings for visual issues
- Specific reproduction steps for all bugs

## Expected Deliverables

### From Each Test Runner:
1. Test execution summary
2. List of passed/failed test cases
3. Detailed bug reports with:
   - Issue description
   - Steps to reproduce
   - Expected vs actual behavior
   - Severity rating
   - Screenshots where applicable

### Aggregated Report Will Include:
1. Overall quality assessment
2. Critical issues requiring immediate attention
3. UI/UX improvement recommendations
4. Performance optimization suggestions
5. Accessibility compliance status
6. Browser compatibility matrix
7. Test coverage metrics

## Success Criteria

### Must Pass (Critical):
- All companies selectable and playable
- Phase progression works for all paths
- Scoring system calculates correctly
- No crashes or blocking errors
- Core UI elements visible and functional

### Should Pass (High):
- Responsive design works on all tested devices
- All feedback messages display correctly
- LocalStorage persistence functions
- Smooth animations and transitions
- Consistent visual design throughout

### Nice to Have (Medium/Low):
- Perfect accessibility compliance
- Sub-second response times
- Advanced keyboard shortcuts
- Enhanced error recovery

## Risk Areas

### High Risk:
- Scoring calculation logic
- Phase state management
- Component selection limits
- LocalStorage corruption

### Medium Risk:
- Browser compatibility issues
- Responsive design breakpoints
- Animation performance
- Concurrent user interactions

### Low Risk:
- Visual polish items
- Minor UI inconsistencies
- Non-critical accessibility items

## Test Environment

- **URL:** http://localhost:5173
- **Framework:** Svelte + Vite
- **Styling:** Tailwind CSS
- **Testing Approach:** Manual black-box testing
- **Focus:** User experience and functionality

## Quality Gates

Before marking testing complete:
- [ ] All 5 test groups executed
- [ ] Critical issues identified and documented
- [ ] Each company journey tested end-to-end
- [ ] Cross-browser testing completed
- [ ] Performance baselines established
- [ ] Accessibility audit performed
- [ ] Edge cases thoroughly tested