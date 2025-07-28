# CyberTech Solutions - Modern Tech Company Website

A complete multi-page website for a modern tech company with a clean, hacker-inspired design. Built with pure HTML, CSS, and JavaScript - no frameworks required.

## ✨ Features

### 🎨 Design & UI
- **Dark mode by default** with toggle to light mode
- **Hacker-inspired aesthetic** with terminal-style elements
- **Modern UI** with smooth transitions and hover effects
- **Fully responsive** design for all devices
- **Accessible** with keyboard navigation and screen reader support

### 📱 Pages & Sections
- **Home** - Hero section with typing animation and company overview
- **About** - Company story, mission, values, and team profiles
- **Services** - Detailed service offerings with interactive cards
- **Projects** - Portfolio with filterable project cards and modals
- **Testimonials** - Client feedback with auto-playing slider
- **Contact** - Contact form with validation and company info

### ⚡ Interactive Features
- **Typing text effect** in hero section
- **Smooth scroll animations** (custom AOS implementation)
- **Testimonial slider** with autoplay and manual controls
- **Project filtering** by category
- **Contact form validation** with real-time feedback
- **FAQ accordion** for common questions
- **Modal windows** for project details and maps
- **Back to top button** with scroll progress
- **Matrix rain effect** in hero background
- **Theme toggle** with localStorage persistence

### 🛠 Technical Features
- **Pure HTML, CSS & JavaScript** - No dependencies
- **Mobile-first responsive design**
- **Optimized performance** with lazy loading
- **SEO-friendly** with proper meta tags
- **Accessibility compliant** (WCAG guidelines)
- **Cross-browser compatible**
- **Progressive enhancement**

## 🚀 Quick Start

1. **Clone or download** the project files
2. **Open** `index.html` in your web browser
3. **Navigate** through the different pages
4. **Toggle** between light and dark themes using the button in the top-right

That's it! No build process or dependencies required.

## 📁 Project Structure

```
cybertech-website/
├── index.html              # Home page
├── about.html              # About us page
├── services.html           # Services page
├── projects.html           # Projects portfolio
├── testimonials.html       # Client testimonials
├── contact.html            # Contact page
├── css/
│   └── style.css           # Main stylesheet (all styles)
├── js/
│   └── script.js           # Main JavaScript file (all functionality)
├── assets/
│   └── favicon.ico         # Website favicon
└── README.md               # This file
```

## 🎯 Key Components

### Theme System
- **Dark mode default** with sleek hacker aesthetic
- **Light mode toggle** for accessibility
- **Persistent preference** stored in localStorage
- **Smooth transitions** between themes

### Navigation
- **Sticky navbar** with scroll effects
- **Mobile hamburger menu** for responsive design
- **Smooth scrolling** to page sections
- **Active page highlighting**

### Hero Section
- **Animated typing text** with multiple phrases
- **Terminal window** with code animation
- **Matrix rain effect** background
- **Call-to-action buttons**

### Forms & Validation
- **Real-time validation** with helpful error messages
- **Custom checkbox styling**
- **Loading states** for form submission
- **Success feedback** with smooth transitions

### Animations
- **Scroll-triggered animations** (custom AOS implementation)
- **Hover effects** on cards and buttons
- **Smooth transitions** throughout the site
- **Performance optimized** with Intersection Observer

## 🎨 Customization

### Colors & Themes
The website uses CSS custom properties (variables) for easy theming:

```css
:root {
  --accent-primary: #00ff88;    /* Main accent color */
  --accent-secondary: #00ccff;  /* Secondary accent */
  --bg-primary: #0a0a0b;        /* Main background */
  --text-primary: #ffffff;      /* Primary text */
  /* ... more variables */
}
```

### Typography
- **JetBrains Mono** for terminal/code elements
- **Inter** for body text and UI elements
- Loaded from Google Fonts

### Content
All content can be easily updated by editing the HTML files:
- Company information in `about.html`
- Service details in `services.html`
- Project portfolio in `projects.html`
- Contact information throughout the site

## 🔧 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

Modern browsers with support for:
- CSS Grid & Flexbox
- CSS Custom Properties
- Intersection Observer API
- ES6+ JavaScript features

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

## ⚡ Performance Features

- **Lazy loading** for images
- **Optimized animations** with `transform` and `opacity`
- **Debounced scroll events** for better performance
- **Minimal DOM manipulation**
- **CSS-only animations** where possible

## 🎯 SEO & Accessibility

### SEO Features
- Semantic HTML structure
- Proper heading hierarchy
- Meta descriptions and keywords
- Open Graph tags ready
- Structured data markup ready

### Accessibility
- **ARIA labels** for interactive elements
- **Keyboard navigation** support
- **Focus management** for modals and menus
- **Screen reader** compatible
- **High contrast** mode support
- **Reduced motion** preference support

## 🛠 Development

### Extending Functionality
The modular JavaScript structure makes it easy to add new features:

```javascript
// Example: Adding a new component
class NewComponent {
    constructor() {
        this.init();
    }
    
    init() {
        // Component initialization
    }
}

// Initialize in the DOMContentLoaded event
window.newComponent = new NewComponent();
```

### CSS Organization
The CSS is organized in logical sections:
- Base styles and variables
- Layout components
- Individual page sections
- Responsive design
- Utility classes

### Adding New Pages
1. Create new HTML file following the existing structure
2. Update navigation links in all pages
3. Add page-specific styles if needed
4. Test responsive behavior

## 🔄 Updates & Maintenance

### Version Control
- Use semantic versioning for releases
- Tag major feature additions
- Document breaking changes

### Performance Monitoring
- Check Core Web Vitals regularly
- Optimize images and assets
- Monitor JavaScript performance
- Test on various devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test across browsers
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎉 Credits

- **Design inspiration**: Hacker/terminal aesthetics
- **Fonts**: Google Fonts (JetBrains Mono, Inter)
- **Icons**: Unicode emojis for universal compatibility
- **No external libraries** - Everything built from scratch

---

**Built with ❤️ and ☕ by the CyberTech team**

For questions or support, contact: hello@cybertech.dev