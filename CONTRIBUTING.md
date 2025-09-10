# Contributing to Français Pro

Thank you for your interest in contributing to Français Pro! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### **Ways to Contribute**
- 🐛 **Bug Reports**: Found a bug? Let us know!
- 💡 **Feature Requests**: Have an idea? Share it!
- 🔧 **Code Contributions**: Submit pull requests
- 📚 **Documentation**: Help improve our docs
- 🌍 **Translations**: Add support for more languages
- 🎨 **UI/UX**: Improve the user experience
- 🧪 **Testing**: Help us test new features

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+
- npm or yarn
- Git
- Basic knowledge of React/Next.js

### **Setup Development Environment**

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/francais-pro.git
   cd francais-pro
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/francais-pro.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Add your Firebase configuration
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

## 📝 Development Workflow

### **1. Create a Branch**
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### **2. Make Changes**
- Write clean, readable code
- Follow the existing code style
- Add comments for complex logic
- Update documentation if needed

### **3. Test Your Changes**
```bash
# Run linting
npm run lint

# Run type checking
npm run type-check

# Test your changes manually
npm run dev
```

### **4. Commit Your Changes**
```bash
git add .
git commit -m "feat: add new feature description"
```

**Commit Message Format:**
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### **5. Push and Create Pull Request**
```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## 🎯 Contribution Guidelines

### **Code Style**
- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Keep components small and focused

### **Component Guidelines**
- Use functional components with hooks
- Follow the existing component structure
- Use Shadcn/ui components when possible
- Implement proper error boundaries
- Add loading states for async operations

### **File Organization**
- Place components in appropriate directories
- Use descriptive file names
- Group related files together
- Follow the existing folder structure

### **Testing**
- Test your changes thoroughly
- Add unit tests for new functions
- Test on different screen sizes
- Verify accessibility features

## 🐛 Bug Reports

### **Before Reporting**
1. Check if the bug has already been reported
2. Try to reproduce the bug
3. Check the latest version

### **Bug Report Template**
```markdown
**Bug Description**
A clear description of what the bug is.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment**
- OS: [e.g., Windows, macOS, Linux]
- Browser: [e.g., Chrome, Firefox, Safari]
- Version: [e.g., 22]

**Additional Context**
Any other context about the problem.
```

## 💡 Feature Requests

### **Before Requesting**
1. Check if the feature has already been requested
2. Consider if it aligns with the project goals
3. Think about implementation complexity

### **Feature Request Template**
```markdown
**Feature Description**
A clear description of the feature.

**Problem it Solves**
What problem does this feature solve?

**Proposed Solution**
How would you like to see this implemented?

**Alternatives Considered**
Any alternative solutions you've considered.

**Additional Context**
Any other context about the feature request.
```

## 🔧 Pull Request Process

### **Before Submitting**
- [ ] Code follows the project's style guidelines
- [ ] Self-review of your code
- [ ] Tests pass locally
- [ ] Documentation updated if needed
- [ ] No merge conflicts

### **Pull Request Template**
```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Manual testing completed
- [ ] Cross-browser testing (if applicable)

## Screenshots
If applicable, add screenshots.

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No merge conflicts
```

## 🌍 Translation Guidelines

### **Adding New Languages**
1. Create language file in `src/data/locales/`
2. Follow the existing structure
3. Use proper French translations
4. Test with different content lengths

### **Translation Files**
- Keep consistent terminology
- Use formal language for educational content
- Include pronunciation guides
- Add cultural context where appropriate

## 🎨 UI/UX Guidelines

### **Design Principles**
- Keep it simple and clean
- Use consistent spacing and typography
- Ensure accessibility compliance
- Mobile-first responsive design

### **Component Guidelines**
- Use Shadcn/ui components
- Follow the existing color scheme
- Implement proper hover states
- Add loading and error states

## 📚 Documentation

### **Code Documentation**
- Add JSDoc comments for functions
- Document complex algorithms
- Include usage examples
- Keep comments up to date

### **User Documentation**
- Write clear, concise descriptions
- Include screenshots when helpful
- Use simple language
- Keep it up to date

## 🏷️ Labels

We use labels to categorize issues and PRs:

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements to documentation
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `question` - Further information is requested

## 🎉 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation
- Community highlights

## 📞 Getting Help

### **Questions?**
- Open a GitHub Discussion
- Join our Discord server
- Email: contributors@francais-pro.com

### **Need Help Getting Started?**
- Check out our [Getting Started Guide](README.md)
- Look at existing issues labeled `good first issue`
- Ask questions in GitHub Discussions

## 📋 Code of Conduct

### **Our Pledge**
We are committed to providing a welcoming and inclusive environment for all contributors.

### **Expected Behavior**
- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what's best for the community

### **Unacceptable Behavior**
- Harassment or discrimination
- Trolling or inflammatory comments
- Personal attacks or political discussions
- Spam or off-topic discussions

## 🚀 Release Process

### **Version Numbering**
We use [Semantic Versioning](https://semver.org/):
- `MAJOR` - Breaking changes
- `MINOR` - New features (backward compatible)
- `PATCH` - Bug fixes (backward compatible)

### **Release Schedule**
- **Major releases**: Quarterly
- **Minor releases**: Monthly
- **Patch releases**: As needed

---

Thank you for contributing to Français Pro! Together, we can make French learning accessible to everyone. 🇫🇷
