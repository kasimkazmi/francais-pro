# 🤝 Contributing to Français Pro

Thank you for your interest in contributing to Français Pro! We welcome contributions from developers, language experts, and French enthusiasts.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Guidelines](#contributing-guidelines)
- [Types of Contributions](#types-of-contributions)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)

## 📜 Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

- **Be Respectful** - Treat everyone with respect and kindness
- **Be Inclusive** - Welcome contributors from all backgrounds
- **Be Constructive** - Provide helpful feedback and suggestions
- **Be Patient** - Understand that everyone is learning
- **Be Professional** - Maintain professional communication

## 🚀 Getting Started

### Prerequisites

- **Node.js** - Version 18.0 or higher
- **npm** - Version 9.0 or higher
- **Git** - Latest version
- **Code Editor** - VS Code recommended

### Development Setup

1. **Fork the Repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/francais-pro.git
   cd francais-pro
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment**
   ```bash
   # Copy environment template
   cp .env.example .env.local
   
   # Add your Firebase configuration
   # (Contact maintainers for Firebase credentials)
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Verify Setup**
   - Open http://localhost:3000
   - Check that the application loads correctly
   - Test basic functionality

## 🎯 Types of Contributions

### 🐛 Bug Fixes

- Fix existing issues
- Improve error handling
- Resolve TypeScript errors
- Fix responsive design issues

### ✨ New Features

- Add new learning modules
- Implement new cultural content
- Create new UI components
- Add new audio features

### 📚 Content Contributions

- **French Language Content**
  - Grammar explanations
  - Vocabulary lists
  - Conversation scenarios
  - Cultural information

- **Audio Content**
  - Pronunciation recordings
  - Audio quality improvements
  - Text-to-speech optimization

- **Cultural Content**
  - Art movements and artists
  - Historical information
  - Literary works and authors
  - French traditions and customs

### 🎨 UI/UX Improvements

- Design improvements
- Accessibility enhancements
- Mobile responsiveness
- Dark mode improvements

### 📖 Documentation

- Wiki improvements
- Code documentation
- User guides
- API documentation

### 🧪 Testing

- Unit tests
- Integration tests
- End-to-end tests
- Performance testing

## 🔧 Development Guidelines

### Branch Naming

Use descriptive branch names:
```bash
# Feature branches
feature/audio-improvements
feature/new-grammar-module
feature/mobile-navigation

# Bug fix branches
fix/pronunciation-issues
fix/leaderboard-bugs
fix/type-errors

# Content branches
content/french-arts-update
content/vocabulary-expansion
content/cultural-content
```

### Commit Messages

Follow conventional commit format:
```
type(scope): description

feat(audio): add pronunciation speed control
fix(ui): resolve mobile navigation issues
docs(readme): update installation instructions
content(vocabulary): add business French terms
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes
- `refactor` - Code refactoring
- `test` - Test additions/changes
- `content` - Content updates
- `chore` - Maintenance tasks

### Code Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components
│   ├── content/        # Content-specific components
│   └── layout/         # Layout components
├── lib/                # Utility functions and configurations
├── data/               # JSON data files
├── contexts/           # React contexts
└── hooks/              # Custom React hooks
```

## 🧪 Testing Guidelines

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run linting
npm run lint

# Run type checking
npm run type-check
```

### Test Requirements

- **Unit Tests** - Test individual functions and components
- **Integration Tests** - Test component interactions
- **Accessibility Tests** - Ensure WCAG compliance
- **Performance Tests** - Check for performance regressions

### Test Coverage

- Aim for 80%+ test coverage
- Test critical user flows
- Test error handling
- Test edge cases

## 📝 Pull Request Process

### Before Submitting

1. **Check Existing Issues** - Ensure no duplicate work
2. **Create Issue** - Discuss major changes first
3. **Update Documentation** - Keep docs in sync
4. **Add Tests** - Include relevant tests
5. **Run Linting** - Fix all linting issues
6. **Test Thoroughly** - Test on multiple devices/browsers

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update
- [ ] Content update

## Testing
- [ ] Tests pass locally
- [ ] Tested on mobile
- [ ] Tested on desktop
- [ ] Accessibility tested

## Screenshots
(if applicable)

## Related Issues
Closes #issue-number
```

### Review Process

1. **Automated Checks** - CI/CD pipeline runs
2. **Code Review** - Maintainer reviews code
3. **Testing** - Manual testing if needed
4. **Approval** - Maintainer approves PR
5. **Merge** - PR is merged to main

## 🎨 Coding Standards

### TypeScript

- Use strict TypeScript configuration
- Define proper interfaces and types
- Avoid `any` type usage
- Use proper error handling

### React/Next.js

- Use functional components with hooks
- Follow Next.js 15 best practices
- Use proper component composition
- Implement proper error boundaries

### CSS/Styling

- Use Tailwind CSS classes
- Follow responsive design principles
- Maintain consistent spacing and colors
- Use CSS variables for theming

### Performance

- Optimize images and assets
- Use proper caching strategies
- Implement lazy loading where appropriate
- Monitor bundle size

## 📚 Content Guidelines

### French Language Content

- **Accuracy** - Ensure all French content is accurate
- **Native Speaker Review** - Have native speakers review content
- **Cultural Sensitivity** - Respect French culture and traditions
- **Current Usage** - Use modern, commonly used French

### Audio Content

- **Quality** - High-quality audio recordings
- **Consistency** - Consistent pronunciation and pace
- **Accessibility** - Clear and understandable speech
- **Format** - Use appropriate audio formats

### Cultural Content

- **Historical Accuracy** - Verify historical information
- **Cultural Respect** - Present culture respectfully
- **Diverse Perspectives** - Include diverse viewpoints
- **Educational Value** - Ensure educational benefit

## 🔍 Code Review Guidelines

### For Contributors

- **Self-Review** - Review your own code before submitting
- **Test Thoroughly** - Test all functionality
- **Document Changes** - Explain complex changes
- **Respond to Feedback** - Address review comments promptly

### For Reviewers

- **Be Constructive** - Provide helpful feedback
- **Check Functionality** - Test the changes
- **Verify Standards** - Ensure code follows standards
- **Approve Promptly** - Don't let PRs sit too long

## 🚀 Deployment

### Staging Environment

- All PRs are automatically deployed to staging
- Test thoroughly on staging before merging
- Report staging issues immediately

### Production Deployment

- Only maintainers can deploy to production
- Deployments happen after PR approval
- Monitor deployment for issues

## 📞 Getting Help

### Communication Channels

- **GitHub Issues** - Bug reports and feature requests
- **GitHub Discussions** - General questions and ideas
- **Pull Request Comments** - Code-specific discussions

### Contact Maintainers

- **Technical Issues** - Create GitHub issue
- **Content Questions** - Use GitHub discussions
- **Urgent Issues** - Contact maintainers directly

## 🎉 Recognition

Contributors will be recognized in:
- **README** - Listed as contributors
- **Release Notes** - Mentioned in releases
- **Community** - Recognized in community discussions

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

**Ready to contribute?** 🚀

[Find Good First Issues →](https://github.com/your-username/francais-pro/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) | [Join Discussions →](https://github.com/your-username/francais-pro/discussions) | [Read Code of Conduct →](CODE_OF_CONDUCT.md)
