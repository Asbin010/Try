# 🛡️ CyberDev Portfolio - Modern Cybersecurity Portfolio Website

A full-stack, modern, and responsive portfolio website designed for cybersecurity professionals and developers. Features a dark "hacker/cyber" theme with smooth animations, secure backend, and admin dashboard.

![Portfolio Preview](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3-blue)

## ✨ Features

### 🎨 Frontend Features
- **Modern React Architecture**: Built with TypeScript, functional components, and React hooks
- **Cybersecurity Theme**: Dark mode with neon green/blue accents and "Matrix" effects
- **Smooth Animations**: Framer Motion animations with scroll-triggered effects
- **Responsive Design**: Mobile-first design that works on all devices
- **Theme Toggle**: Light/dark mode switching with persistent preferences
- **Matrix Background**: Animated digital rain effect for cyber aesthetics
- **Interactive Sections**:
  - Hero with typewriter effect and glitch animations
  - Projects showcase with hover effects and tech stack displays
  - Services section with pricing and feature lists
  - About section with skills bars and experience timeline
  - Contact form with validation and real-time feedback

### 🔧 Backend Features
- **Secure Express Server**: RESTful API with security middleware
- **Contact Form Processing**: Handles form submissions with validation
- **Email Integration**: Nodemailer support for contact notifications
- **Admin Dashboard**: Secure portal for viewing submissions
- **Database Support**: MongoDB integration for data persistence
- **Rate Limiting**: Protection against spam and abuse
- **JWT Authentication**: Secure admin access with token-based auth
- **CORS Configuration**: Proper cross-origin resource sharing setup

### 🛡️ Security Features
- **Input Validation**: Server-side validation for all form inputs
- **SQL Injection Protection**: Mongoose ODM with schema validation
- **XSS Protection**: Helmet.js security headers
- **Rate Limiting**: Multiple levels of request throttling
- **CSRF Protection**: Token-based form validation
- **Secure Headers**: Security-focused HTTP headers

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB (optional, for contact form storage)
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd cyber-portfolio
```

2. **Install dependencies**
```bash
# Install root dependencies
npm install

# Install all project dependencies
npm run install:all
```

3. **Environment Setup**
```bash
# Copy environment template
cp backend/.env.example backend/.env

# Edit the environment file
nano backend/.env
```

4. **Start development servers**
```bash
# Start both frontend and backend simultaneously
npm run dev

# Or start them separately:
# Backend: npm run server:dev
# Frontend: npm run client:dev
```

5. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Admin Dashboard: http://localhost:3000/admin

## 📁 Project Structure

```
cyber-portfolio/
├── frontend/                  # React TypeScript frontend
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   └── MatrixBackground.tsx
│   │   ├── context/          # React context providers
│   │   │   └── ThemeContext.tsx
│   │   ├── index.css         # Tailwind styles
│   │   └── App.tsx           # Main application
│   ├── tailwind.config.js    # Tailwind configuration
│   └── package.json
├── backend/                  # Node.js Express backend
│   ├── server.js            # Express server
│   ├── .env.example         # Environment template
│   └── package.json
├── package.json             # Root package.json
└── README.md               # This file
```

## ⚙️ Configuration

### Backend Environment Variables

Create `backend/.env` with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# MongoDB Database (optional)
MONGODB_URI=mongodb://localhost:27017/cyber-portfolio

# Email Configuration (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_TO=your-email@gmail.com

# Admin Authentication
ADMIN_USERNAME=admin
ADMIN_PASSWORD=cyber123
JWT_SECRET=your-super-secret-jwt-key

# Security
CORS_ORIGIN=http://localhost:3000
```

### Email Setup (Optional)

To enable email notifications for contact form submissions:

1. **Gmail Setup** (recommended):
   - Enable 2-factor authentication on your Gmail account
   - Generate an App Password: Google Account → Security → App passwords
   - Use the app password in `EMAIL_PASS`

2. **Other Email Providers**:
   - Update `EMAIL_HOST` and `EMAIL_PORT` accordingly
   - Consult your provider's SMTP settings

### MongoDB Setup (Optional)

For persistent contact form storage:

1. **Local MongoDB**:
   ```bash
   # Install MongoDB Community Edition
   # Start MongoDB service
   mongod
   ```

2. **MongoDB Atlas** (Cloud):
   - Create account at https://www.mongodb.com/cloud/atlas
   - Create cluster and get connection string
   - Update `MONGODB_URI` in `.env`

## 🎨 Customization

### Theming
The website uses a cybersecurity theme with customizable colors in `frontend/tailwind.config.js`:

```javascript
colors: {
  neon: {
    green: '#00ff88',  // Primary accent
    blue: '#00ccff',   // Secondary accent
    purple: '#cc00ff', // Tertiary accent
    red: '#ff0066',    // Alert/error color
  },
  dark: {
    bg: '#0a0a0a',     // Background
    card: '#1a1a1a',   // Card background
    hover: '#2a2a2a',  // Hover states
    text: '#e5e5e5',   // Primary text
    muted: '#888888',  // Secondary text
  }
}
```

### Content Customization

1. **Personal Information**: Update components with your details
   - `Hero.tsx`: Name, roles, description
   - `About.tsx`: Skills, experience, certifications
   - `Projects.tsx`: Your projects and tech stack
   - `Services.tsx`: Services you offer
   - `Contact.tsx`: Contact information

2. **Logo and Branding**: Replace "CyberDev" with your brand
3. **Colors and Fonts**: Modify Tailwind config for different aesthetics

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)

1. **Build the frontend**:
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify**:
   - Connect your Git repository
   - Set build command: `cd frontend && npm run build`
   - Set publish directory: `frontend/build`

3. **Deploy to Vercel**:
   - Import project from Git
   - Set framework preset to "Create React App"
   - Set root directory to `frontend`

### Backend Deployment (Railway/Render/Heroku)

1. **Prepare for deployment**:
   ```bash
   # Ensure all environment variables are set
   # Update CORS_ORIGIN to your frontend domain
   ```

2. **Deploy to Railway**:
   - Connect GitHub repository
   - Set root directory to `backend`
   - Add environment variables in dashboard

3. **Deploy to Render**:
   - Create new Web Service
   - Set build command: `cd backend && npm install`
   - Set start command: `cd backend && npm start`

### Full-Stack Deployment (Docker)

```dockerfile
# Dockerfile example
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/

# Install dependencies
RUN npm run install:all

# Copy source code
COPY . .

# Build frontend
RUN cd frontend && npm run build

# Expose port
EXPOSE 5000

# Start backend
CMD ["npm", "start"]
```

## 🔧 Development

### Available Scripts

```bash
# Root scripts
npm run dev              # Start both frontend and backend
npm run install:all      # Install all dependencies
npm run build           # Build frontend for production
npm start              # Start backend in production

# Frontend scripts (in frontend/)
npm start              # Start development server
npm run build          # Build for production
npm test              # Run tests

# Backend scripts (in backend/)
npm run dev           # Start with nodemon
npm start            # Start production server
```

### Code Quality Tools

The project includes:
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Husky for git hooks (optional)

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL
   - Check `CORS_ORIGIN` configuration

2. **Database Connection Issues**:
   - Verify MongoDB is running (if using local MongoDB)
   - Check `MONGODB_URI` format
   - The app works without MongoDB - contact forms just won't be stored

3. **Email Not Working**:
   - Verify email credentials in `.env`
   - Check firewall/antivirus blocking SMTP
   - Contact forms work without email - submissions just won't be forwarded

4. **Build Errors**:
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Check Node.js version (18+ required)
   - Ensure all dependencies are installed

### Development Tips

- Use browser dev tools to debug React components
- Check browser console for JavaScript errors
- Use network tab to debug API calls
- Backend logs show in terminal when running `npm run dev`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Search existing GitHub issues
3. Create a new issue with detailed description
4. Include environment details and error messages

## 🌟 Features Roadmap

- [ ] Blog integration
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Social media integration
- [ ] Resume/CV download
- [ ] Project filtering and search
- [ ] Testimonials section
- [ ] Performance optimization
- [ ] PWA capabilities
- [ ] Advanced animations

## 🏆 Acknowledgments

- [React](https://reactjs.org/) - Frontend framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Heroicons](https://heroicons.com/) - Icons
- [Express.js](https://expressjs.com/) - Backend framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Nodemailer](https://nodemailer.com/) - Email functionality

---

Built with ❤️ for the cybersecurity community. Keep the digital world secure! 🛡️