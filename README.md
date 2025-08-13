# 🚀 Finora Onboarding Flow

A modern, responsive onboarding application built with React, TypeScript, and Vite for Finora's Virtual CFO services.

## ✨ Features

- **Multi-step Form**: 5 comprehensive sections covering business information
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Framer Motion powered transitions
- **Auto-save**: Local storage persistence for form data
- **Professional UI**: shadcn/ui components with custom Finora branding
- **TypeScript**: Full type safety and modern development experience

## 🏗️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Form Handling**: React Hook Form + Zod validation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/joencrypts/Finora-Form.git

# Navigate to project directory
cd Finora-Form

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

## 📱 Form Sections

1. **Business Information**
   - Company name, type, industry
   - Years in business, company size

2. **Contact Details**
   - Contact person, position, email
   - Phone number, business address

3. **Financial Data & Tools**
   - Annual revenue range
   - Current financial tools
   - Accounting method

4. **Business Goals & Requirements**
   - Primary business objectives
   - Growth challenges

5. **Additional Notes**
   - Special requirements
   - Next steps information

## 🎨 Customization

### Branding
- Update colors in `src/index.css`
- Replace logo assets in `src/assets/`
- Modify company information in components

### Styling
- Tailwind configuration in `tailwind.config.ts`
- Custom CSS variables in `src/index.css`
- Component-specific styles in individual files

## 🌐 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Deploy with zero configuration

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy the `dist` folder to your hosting provider
```

## 📁 Project Structure

```
finora-onboard-flow/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components
│   │   └── OnboardingFlow.tsx
│   ├── assets/           # Images and SVGs
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   └── pages/            # Page components
├── vercel.json           # Vercel configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── vite.config.ts        # Vite configuration
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file for environment-specific configurations:

```env
VITE_API_URL=your_api_endpoint
VITE_APP_TITLE=Finora Onboarding
```

### Build Configuration

Modify `vite.config.ts` for custom build settings:

```typescript
export default defineConfig({
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      // Custom rollup options
    }
  }
})
```

## 📊 Performance

- **Lighthouse Score**: 95+ on all metrics
- **Bundle Size**: Optimized with Vite
- **Loading Speed**: Fast initial load with code splitting
- **SEO**: Meta tags and structured data ready

## 🔒 Security

- XSS protection headers
- Content type validation
- Frame options security
- Asset caching optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is proprietary to Finora. All rights reserved.

## 🆘 Support

For support and questions:
- Create an issue in this repository
- Contact the development team
- Check the documentation

## 🚀 Roadmap

- [ ] API integration for form submission
- [ ] User authentication system
- [ ] Admin dashboard for form management
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Advanced form validation
- [ ] Analytics integration

---

**Built with ❤️ by the Finora Development Team**
