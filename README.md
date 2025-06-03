# Quiz Master

A modern, interactive quiz application built with React and TypeScript that allows users to create, manage, and take quizzes with a beautiful user interface.

![Quiz Master](./public/quiz-preview.png)

## Features

- 🎯 Create and manage custom quizzes
- 📝 Multiple choice questions support
- 🎨 Modern and responsive UI with beautiful animations
- ⚡ Real-time progress tracking
- 🔄 Redux state management
- 📱 Mobile-friendly design

## Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Styling**: 
  - Tailwind CSS
  - Shadcn UI Components
  - Framer Motion for animations
- **UI Components**:
  - Radix UI primitives
  - Lucide React icons
- **Development Tools**:
  - ESLint for code linting
  - PostCSS for CSS processing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd quiz_app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and visit `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint for code linting
- `npm run preview` - Preview production build locally

## Project Structure

```
quiz_app/
├── src/
│   ├── components/     # Reusable UI components
│   ├── home/          # Home page components
│   ├── redux/         # Redux store and slices
│   ├── lib/           # Utility functions
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
├── public/            # Static assets
└── ...config files    # Various configuration files
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Shadcn UI](https://ui.shadcn.com/) - Re-usable components built with Radix UI and Tailwind CSS
- [Framer Motion](https://www.framer.com/motion/) - A production-ready motion library for React
