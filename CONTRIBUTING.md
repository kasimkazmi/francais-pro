# 🤝 Contributing to Français Pro

Thank you for your interest in contributing to Français Pro! We welcome contributions from developers, designers, content creators, and anyone passionate about helping people learn French for Canadian immigration.

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 18+ and npm
- Git
- Basic knowledge of React/Next.js (for code contributions)
- French language knowledge (for content contributions)

### **Quick Start**
1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/francais-pro.git
   cd francais-pro
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start development server**:
   ```bash
   npm run dev
   ```
5. **Create a feature branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```

## 🎯 **How to Contribute**

### **🐛 Bug Reports**
- Use the GitHub issue template
- Provide clear reproduction steps
- Include screenshots if applicable
- Specify your environment (OS, browser, etc.)

### **✨ Feature Requests**
- Check existing issues first
- Use the "enhancement" label
- Describe the feature and its benefits
- Provide mockups or examples if possible

### **💻 Code Contributions**
1. **Pick an issue** or create a new one
2. **Assign yourself** to the issue
3. **Create a feature branch** from `master`
4. **Write your code** following our style guide
5. **Test your changes** thoroughly
6. **Submit a pull request**

### **📝 Content Contributions**
- **French lessons**: Add new vocabulary, grammar, or cultural content
- **Translations**: Help translate the platform to other languages
- **Documentation**: Improve guides and tutorials
- **Audio content**: Record pronunciation examples

## 📋 **Development Guidelines**

### **Code Style**
- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Use meaningful variable and function names
- Add comments for complex logic
- Write tests for new features

### **Commit Messages**
Use clear, descriptive commit messages:
```
feat: add dynamic stats system
fix: resolve audio button serialization error
docs: update README with new features
style: improve button hover animations
```

### **Pull Request Process**
1. **Update documentation** if needed
2. **Add tests** for new functionality
3. **Ensure all tests pass**
4. **Request review** from maintainers
5. **Address feedback** promptly

## 🏗️ **Project Structure**

```
src/
├── app/                 # Next.js 15 App Router pages
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components
│   ├── layout/         # Layout components
│   ├── content/        # Content-specific components
│   └── auth/           # Authentication components
├── contexts/           # React contexts for state management
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and services
├── data/               # Static data and content
└── types/              # TypeScript type definitions
```

## 🧪 **Testing**

### **Running Tests**
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### **Testing Guidelines**
- Write unit tests for utility functions
- Write integration tests for components
- Test error cases and edge cases
- Aim for 80%+ code coverage

## 📚 **Documentation**

### **Code Documentation**
- Use JSDoc comments for functions
- Document complex algorithms
- Explain business logic
- Keep README files updated

### **User Documentation**
- Write clear user guides
- Provide screenshots for UI changes
- Update API documentation
- Translate documentation when possible

## 🎨 **Design Guidelines**

### **UI/UX Principles**
- **Accessibility first**: Follow WCAG guidelines
- **Mobile responsive**: Test on various screen sizes
- **Consistent styling**: Use design system components
- **Performance**: Optimize for Core Web Vitals

### **Component Design**
- Use shadcn/ui components as base
- Follow compound component patterns
- Implement proper loading states
- Add error boundaries

## 🌍 **Internationalization**

### **Adding New Languages**
1. Create language files in `public/locales/`
2. Update language switcher component
3. Test with RTL languages if applicable
4. Update documentation

### **Content Localization**
- Use proper French formatting
- Consider cultural differences
- Test with native speakers
- Maintain consistency across languages

## 🔒 **Security**

### **Security Guidelines**
- Never commit API keys or secrets
- Validate all user inputs
- Use HTTPS for all external requests
- Follow OWASP security practices

### **Reporting Security Issues**
- Email security issues to: security@francais-pro.com
- Don't create public issues for security vulnerabilities
- We'll respond within 48 hours

## 📞 **Getting Help**

### **Community Support**
- **GitHub Discussions**: Ask questions and share ideas
- **Discord**: Join our community server
- **Issues**: Report bugs and request features
- **Email**: contributors@francais-pro.com

### **Maintainer Contact**
- **Project Lead**: [Your Name]
- **Technical Lead**: [Technical Lead Name]
- **Content Lead**: [Content Lead Name]

## 🏆 **Recognition**

### **Contributor Recognition**
- All contributors are listed in CONTRIBUTORS.md
- Significant contributors get maintainer status
- Top contributors receive special recognition
- We celebrate contributions in our community

### **Types of Contributions**
- **Code**: Bug fixes, features, optimizations
- **Content**: Lessons, translations, documentation
- **Design**: UI/UX improvements, graphics
- **Testing**: Bug reports, test cases
- **Community**: Help others, moderation

## 📋 **Issue Labels**

We use labels to categorize issues:
- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Improvements to documentation
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention is needed
- `question`: Further information is requested

## 🎉 **Thank You**

Thank you for contributing to Français Pro! Your efforts help make French learning accessible to immigrants worldwide. Together, we're building a platform that changes lives.

---

**Happy Contributing!** 🚀

*Last updated: January 2025*