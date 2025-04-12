# Vetra Photography Club

A visually striking, highly interactive website for a photography club featuring smooth page transitions, interactive elements, and an AI assistant.

## 🌟 Features

- **Modern Design**: Dark theme with layered depth, smooth animations, and minimalist aesthetics
- **Time Machine Transitions**: macOS-inspired page transitions with 3D transforms
- **Interactive Elements**: 3D cards, parallax effects, hover animations
- **Three.js Integration**: Background particle effects and interactive experiments
- **Vetra AI Assistant**: Interactive chatbot with smooth typing animations
- **Responsive Layout**: Mobile-friendly design that works on all devices

## 📂 Project Structure

```
/
├── public/                # Main HTML pages
│   ├── index.html        # Landing page
│   ├── meetups.html      # Events listing
│   ├── tips.html         # Photography tips
│   ├── fun.html          # Interactive experiments
│   └── contact.html      # Contact form
│
├── css/                   # Styling
│   ├── style.css         # Base styles
│   └── timeMachine.css   # Transition effects
│
├── js/                    # JavaScript functionality
│   ├── main.js           # Core functionality
│   ├── transitions.js    # Page transitions
│   └── vetraAI.js        # AI assistant
│
├── assets/                # Static resources
│   ├── fonts/            # Custom fonts
│   ├── images/           # Images and photos
│   └── icons/            # UI icons
│
└── README.md             # Documentation
```

## 🚀 Deployment Instructions

### Option 1: DigitalOcean App Platform

1. **Create a GitHub Repository**:
   - Push all project files to a GitHub repository

2. **Set Up on DigitalOcean**:
   - Log in to your DigitalOcean account
   - Navigate to "Apps" and click "Create App"
   - Select GitHub as the source and choose your repository
   - Select the branch you want to deploy (usually `main`)
   - Choose "Static Site" as the app type
   - Configure your app settings:
     - Set the source directory to `/` (root directory)
     - Set the output directory to `/public`
   - Click "Next" and review your app settings
   - Click "Create Resources" to deploy your app

3. **Access Your Site**:
   - Once deployment is complete, DigitalOcean will provide a URL
   - Your site is now live!

### Option 2: Local Development

1. **Using a Simple HTTP Server**:
   
   If you have Python installed, you can run a simple HTTP server:
   ```
   # Navigate to your project folder
   cd /path/to/vetra

   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```

   Then open `http://localhost:8000` in your browser.

2. **Using Live Server (VS Code Extension)**:
   - Install the "Live Server" extension in VS Code
   - Right-click on `index.html` and select "Open with Live Server"

## 🛠️ Customization

### Changing Colors

The primary color scheme can be modified in `css/style.css`:

```css
:root {
  --primary-color: #121212;      /* Main background */
  --secondary-color: #232323;    /* Cards and elements */
  --accent-color: #1e90ff;       /* Accent color (blue) */
  /* Other variables */
}
```

### Adding Pages

To add a new page:

1. Copy an existing HTML file in the `/public` directory
2. Update the content and title
3. Add a link to the new page in the navigation menu in all HTML files

## 📝 Browser Support

This site works best in modern browsers that support:
- CSS Grid and Flexbox
- CSS Variables
- WebGL (for Three.js)
- ES6 JavaScript

Tested and optimized for:
- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+

## 👩‍💻 Development Notes

### Performance Optimization

- Three.js animations use requestAnimationFrame for smoother performance
- Images should be optimized before adding to the site
- Consider lazy loading large images for better performance

### Future Enhancements

- Add actual photo galleries with lightbox functionality
- Implement a backend for user accounts and meetup registration
- Connect the Vetra AI assistant to an actual AI API (OpenAI, etc.)
- Add more interactive photography tools and experiments 