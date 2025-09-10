**#** **🇫🇷 Français Pro - Learn French from Zero to Hero**

A modern, interactive French learning platform built with Next.js 15, inspired by shadcn/ui design principles. It features comprehensive progress tracking and gamified learning experiences—all within an intuitive, clean, documentation-style interface to help you learn French from zero to hero.

![Français Pro](__https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js__)
![TypeScript](__https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript__)
![Tailwind CSS](__https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css__)
![Firebase](__https://img.shields.io/badge/Firebase-10.0-orange?style=for-the-badge&logo=firebase__)
![Open Source](__https://img.shields.io/badge/Open_Source-Yes-green?style=for-the-badge&logo=github__)

**##** **🌟 Features**

**###** **📚** ****Comprehensive Learning System****
- ****Structured Learning Path****: Progressive modules from Foundations to Advanced
- ****Interactive Lessons****: Engaging content with exercises, pronunciation, and quizzes
- ****Real-time Progress Tracking****: Track your learning journey with detailed analytics
- ****Gamified Experience****: Achievements, streaks, and leaderboards to keep you motivated

**###** **🎯** ****Learning Modules****
- ****Foundations****: Alphabet, pronunciation, basic greetings, numbers
- ****Grammar****: Articles, verb tenses, gender agreement, question formation
- ****Vocabulary****: Themed word lists with audio pronunciation
- ****Practice****: Speaking exercises, writing prompts, listening comprehension
- ****Conversations****: Real-world dialogue scenarios
- ****Culture****: French culture, art, music, and traditions

**###** **🎨 Design System**
- ****shadcn/ui Components**** - Beautiful, accessible UI components
- ****Dark/Light Theme**** - Seamless theme switching
- ****Responsive Design**** - Perfect on all devices
- ****French-inspired Colors**** - Subtle integration of French flag colors
- ****Inter Font**** - Clean, modern typography
- 
**###** **🏆** ****Competitive Learning****
- ****Global Leaderboard****: Compete with learners worldwide
- ****Module Rankings****: See top performers in each learning area
- ****Achievement System****: Unlock badges for milestones and streaks
- ****Progress Visualization****: Beautiful charts and statistics



   **###** **🔐** ****User Management****
- ****Authentication****: Secure login with email/password and Google Sign-In
- ****Personalized Dashboard****: Customized learning experience
- ****Progress Sync****: Your progress is saved across all devices
- ****Profile Management****: Track your learning statistics and achievements

**###** **📱** ****Modern UI/UX****
- ****Responsive Design****: Perfect on desktop, tablet, and mobile
- ****Dark/Light Theme****: Switch between themes for comfortable learning
- ****Accessibility****: Built with accessibility best practices
- ****Fast Performance****: Optimized for speed and smooth interactions

**##** **🚀 Getting Started**

**###** **Prerequisites**
- Node.js 18+
- npm or yarn
- Firebase project (for authentication and data storage)

**###** **Installation**

1. ****Clone the repository****
   ```bash
   git clone https://github.com/yourusername/francais-pro.git
   cd francais-pro
   ```

2. ****Install dependencies****
   ```bash
   npm install
   # or
   yarn install
   ```

3. ****Set up environment variables****
   ```bash
   cp .env.example .env.local
   ```

   Fill in your Firebase configuration:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. ****Set up Firebase****
   - Create a Firebase project at [Firebase Console](__https://console.firebase.google.com__)
   - Enable Authentication (Email/Password and Google)
   - Create a Firestore database
   - Add your configuration to `.env.local`

5. ****Run the development server****
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. ****Open your browser****
   Navigate to [http://localhost:3000](__http://localhost:3000__)

**##** **📖 Project Structure**

```
francais-pro/
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── learn/             # Learning path and lessons
│   │   ├── lessons/           # All lessons overview
│   │   ├── leaderboard/       # Rankings and competition
│   │   ├── progress/          # User progress tracking
│   │   └── welcome/           # Landing page
│   ├── components/            # Reusable UI components
│   │   ├── layout/           # Header, navigation, layout
│   │   ├── ui/               # Shadcn/ui components
│   │   └── auth/             # Authentication components
│   ├── contexts/             # React contexts
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions
│   │   └── firebase/         # Firebase configuration and services
│   └── data/                 # Static content and lesson data
├── public/                   # Static assets
└── docs/                    # Documentation
```

**##** **🎮 User Flow**

**### **For New Users****
1. ****Landing Page**** → Discover the platform features
2. ****Welcome Page**** → Learn about the learning path
3. ****Sign Up**** → Create account or use Google Sign-In
4. ****Learning Path**** → Start with Foundations module
5. ****Progress Tracking**** → Monitor your advancement

**### **For Returning Users****
1. ****Sign In**** → Access your personalized dashboard
2. ****Continue Learning**** → Resume where you left off
3. ****Track Progress**** → View statistics and achievements
4. ****Compete**** → Check leaderboard rankings
5. ****Explore**** → Discover new lessons and modules

**### **Learning Journey****
```
Foundations → Grammar → Vocabulary → Practice → Conversations → Culture
     ↓           ↓          ↓          ↓           ↓           ↓
  Alphabet    Articles    Food &     Speaking   Real-world  French
  Numbers     Verbs       Drinks     Writing    Dialogues   Art & Music
  Greetings   Gender      Travel     Listening  Scenarios   Traditions
```

**##** **🛠️ Technology Stack**

**### **Frontend****
- ****Next.js 15**** - React framework with App Router
- ****TypeScript**** - Type-safe development
- ****Tailwind CSS**** - Utility-first CSS framework
- ****Shadcn/ui**** - Beautiful, accessible components
- ****Lucide React**** - Icon library

**### **Backend & Database****
- ****Firebase Authentication**** - User management
- ****Firestore**** - NoSQL database for progress tracking
- ****Firebase Hosting**** - Static site hosting

**### **Development Tools****
- ****ESLint**** - Code linting
- ****Prettier**** - Code formatting
- ****Husky**** - Git hooks
- ****TypeScript**** - Static type checking

**##** **🌍 Open Source**

**### **Why Open Source?****
Français Pro is committed to making French learning accessible to everyone. By open-sourcing this project, we:

- ****Democratize Education****: Remove barriers to quality language learning
- ****Community Collaboration****: Allow developers worldwide to contribute
- ****Transparency****: Open development process and codebase
- ****Innovation****: Foster creative solutions and improvements
- ****Learning****: Help developers learn modern web technologies

**### **Contributing****
We welcome contributions! Here's how you can help:

1. ****🐛 Bug Reports****: Found a bug? Open an issue
2. ****💡 Feature Requests****: Have an idea? Share it with us
3. ****🔧 Code Contributions****: Submit pull requests
4. ****📚 Documentation****: Help improve our docs
5. ****🌍 Translations****: Add support for more languages
6. ****🎨 UI/UX****: Improve the user experience

**### **Contribution Guidelines****
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**### **Code of Conduct****
We are committed to providing a welcoming and inclusive environment. Please read our [Code of Conduct](__CODE_OF_CONDUCT.md__) before contributing.

**##** **📊 Roadmap**

**### **Phase 1 - Core Features**** **✅**
- [x] Basic learning modules
- [x] User authentication
- [x] Progress tracking
- [x] Leaderboard system

**### **Phase 2 - Enhanced Learning**** **🚧**
- [ ] AI-powered pronunciation feedback
- [ ] Spaced repetition system
- [ ] Advanced analytics
- [ ] Mobile app (React Native)

**### **Phase 3 - Community Features**** **📋**
- [ ] Study groups
- [ ] Peer-to-peer learning
- [ ] Teacher dashboard
- [ ] Custom lesson creation

**### **Phase 4 - Advanced Features**** **📋**
- [ ] Multi-language support

**##** **🤝 Support**

**### **Community Support****
- ****GitHub Issues****: Report bugs and request features
- ****Discussions****: Ask questions and share ideas
- ****Discord****: Join our community server
- ****Email****: support@francais-pro.com

**### **Commercial Support****
For enterprise features, custom development, or commercial licensing:
- ****Email****: enterprise@francais-pro.com
- ****Website****: [francais-pro.com](__https://francais-pro.com__)

**##** **📄 License**

This project is licensed under the ****MIT License**** - see the [LICENSE](__LICENSE__) file for details.

**### **What this means:****
- ✅ ****Free to use**** for personal and commercial projects
- ✅ ****Modify and distribute**** as you wish
- ✅ ****Private use**** allowed
- ✅ ****Commercial use**** allowed
- ❌ ****No warranty**** provided
- ❌ ****No liability**** for the authors

**##** **🙏 Acknowledgments**

- ****Shadcn/ui**** - For the beautiful component library
- ****Next.js Team**** - For the amazing React framework
- ****Firebase**** - For the robust backend services
- ****Tailwind CSS**** - For the utility-first CSS framework
- ****Lucide Icons**** - For the for the beautiful icons

- ****Contributors**** - All the amazing people who contribute to this project

**##** **📈 Statistics**

![GitHub stars](__https://img.shields.io/github/stars/yourusername/francais-pro?style=social__)
![GitHub forks](__https://img.shields.io/github/forks/yourusername/francais-pro?style=social__)
![GitHub issues](__https://img.shields.io/github/issues/yourusername/francais-pro__)
![GitHub pull requests](__https://img.shields.io/github/issues-pr/yourusername/francais-pro__)

**##** **🌟 Star History**

[![Star History Chart](__https://api.star-history.com/svg?repos=yourusername/francais-pro&type=Date__)](__https://star-history.com/#yourusername/francais-pro&Date__)

---

<div align="center">

****Made with ❤️ for French learners worldwide****
[Website](__https://francais-pro.com__) • [Documentation](__https://docs.francais-pro.com__) • [Community](__https://discord.gg/francais-pro__) • [Support](__mailto:support@francais-pro.com__)

</div>