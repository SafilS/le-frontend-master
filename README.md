# LE-Crown Interior Design

A luxury interior design website built with React and Vite, showcasing premium interior design services.

## Features

- Responsive design for all device sizes
- Interactive UI with smooth animations
- Image optimization for fast loading
- Performance-optimized components
- Modular architecture for easy maintenance

## Performance Optimizations

This project has been optimized for maximum performance:

- **Component Optimization**: Memoization, code splitting, and lazy loading
- **Image Optimization**: Lazy loading, responsive images, and blur-up effect
- **Animation Optimization**: Hardware-accelerated animations with reduced complexity
- **Build Optimization**: Proper chunk splitting, minification, and asset handling
- **Context Optimization**: Efficient state management with proper caching

For detailed information about performance optimizations, see [PERFORMANCE_OPTIMIZATIONS.md](./PERFORMANCE_OPTIMIZATIONS.md).

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm 8.x or higher

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/crown-interior-design.git
   cd crown-interior-design
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Build for production
   ```bash
   npm run build
   ```

## Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite 6
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router 7
- **HTTP Client**: Axios

## Project Structure

```
crown-interior-design/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable components
│   ├── context/        # React context providers
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Main application component
│   ├── main.jsx        # Application entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
└── vite.config.js      # Vite configuration
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
