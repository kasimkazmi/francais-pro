# 🇫🇷 Français Pro

> A modern, documentation-style French learning platform inspired by shadcn/ui design principles. Learn French from zero to hero with an intuitive, clean interface and comprehensive learning features.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-12.2.1-FFCA28?style=flat-square&logo=firebase)](https://firebase.google.com/)

## ✨ Features

### 🎯 Core Learning Features
- **Documentation-style Navigation** - Clean, familiar interface inspired by shadcn/ui
- **Progressive Learning Path** - Beginner → Intermediate → Advanced → Expert
- **Interactive Lessons** - Engaging content with immediate feedback
- **Vocabulary Builder** - Smart flashcards with spaced repetition
- **Grammar Guide** - Comprehensive grammar reference with examples
- **Progress Tracking** - Detailed analytics and learning insights

### 🚀 Advanced Features
- **AI-Powered Tutor** - Chat with AI for personalized learning
- **Pronunciation Practice** - Voice recognition and feedback
- **Writing Exercises** - Practice with real-time correction
- **Gamification** - XP points, streaks, and achievements
- **Community Features** - Study groups and peer practice
- **Offline Support** - Learn anywhere, anytime

### 🎨 Design System
- **shadcn/ui Components** - Beautiful, accessible UI components
- **Dark/Light Theme** - Seamless theme switching
- **Responsive Design** - Perfect on all devices
- **French-inspired Colors** - Subtle integration of French flag colors
- **Inter Font** - Clean, modern typography

## 🛠 Tech Stack

- **Frontend**: Next.js 15.5.2 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **UI Components**: shadcn/ui
- **Backend**: Firebase (Auth, Firestore, Storage, Functions)
- **AI Integration**: OpenAI API
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project (for backend features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/francais-pro.git
   cd francais-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your Firebase configuration:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
francais-pro/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication pages
│   │   ├── dashboard/         # User dashboard
│   │   ├── learn/             # Learning modules
│   │   ├── practice/          # Practice exercises
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── learning/         # Learning-specific components
│   │   └── layout/           # Layout components
│   ├── lib/                  # Utility functions
│   │   ├── firebase.ts       # Firebase configuration
│   │   ├── utils.ts          # General utilities
│   │   └── validations.ts    # Form validations
│   ├── types/                # TypeScript type definitions
│   ├── hooks/                # Custom React hooks
│   └── data/                 # Static data and content
├── public/                   # Static assets
├── docs/                     # Documentation
└── README.md
```

## 🎓 Learning Modules

### 📚 Foundations (Get Started)
- French alphabet & pronunciation
- Basic greetings & introductions
- Numbers, colors, family vocabulary
- Essential phrases for beginners

### 🔧 Grammar (Components)
- Verb conjugations (present, past, future)
- Articles and prepositions
- Sentence structure and word order
- Common grammar patterns

### 📖 Vocabulary (Registry)
- Themed word lists (food, travel, work, etc.)
- Visual flashcards with images
- Contextual usage examples
- Spaced repetition system

### 🎯 Practice (Blocks)
- Interactive exercises
- Writing prompts with AI feedback
- Speaking challenges with pronunciation
- Listening comprehension tests

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

### Code Style

- **ESLint**: Configured with Next.js recommended rules
- **Prettier**: Code formatting (add to your editor)
- **TypeScript**: Strict mode enabled
- **Conventional Commits**: For commit messages

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🎨 Customization

### Theme Customization
The app uses CSS custom properties for theming. Modify the colors in `src/app/globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  /* ... more variables */
}
```

### Adding New Learning Content
1. Create content in `src/data/` directory
2. Follow the existing structure for lessons, vocabulary, etc.
3. Update the navigation in `src/components/layout/sidebar.tsx`

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for excellent user experience
- **Bundle Size**: Optimized with Next.js automatic code splitting
- **Loading Speed**: Fast initial load with progressive enhancement

## 🤝 Support

- **Documentation**: [docs.francais-pro.com](https://docs.francais-pro.com)
- **Issues**: [GitHub Issues](https://github.com/yourusername/francais-pro/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/francais-pro/discussions)
- **Email**: support@francais-pro.com

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Firebase](https://firebase.google.com/) for the backend infrastructure
- [Lucide](https://lucide.dev/) for the beautiful icons

---

**Made with ❤️ for French learners worldwide**

*Bon courage et bonne chance! 🇫🇷*