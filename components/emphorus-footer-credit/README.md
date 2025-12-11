# Emphorus Footer Credit Component 🌟

A beautiful, animated footer credit component featuring a shooting star animation across a starry night sky. Perfect for showcasing "Crafted with ♥ by Emphorus" with an elegant, eye-catching design.

## ✨ Features

- 🌌 **Starry Night Sky Background** - Twinkling stars with subtle animations
- 💫 **Shooting Star Animation** - Smooth, seamless comet/star gliding effect
- 🎨 **Gradient Brand Text** - Flowing gradient animation on brand name
- ❤️ **Heartbeat Animation** - Pulsing heart emoji
- 🖱️ **Interactive Hover Effects** - Subtle lift and glow on hover
- 🔗 **Clickable** - Opens Emphorus website in new tab
- 📱 **Responsive** - Works on all screen sizes
- 🚀 **Zero Dependencies** - Pure CSS animations
- 🎯 **Namespace Protected** - All classes prefixed with `emphorus-` to avoid conflicts

## 🚀 Quick Start

### For React/Next.js Projects

1. **Copy the component folder** to your project:
   ```
   components/
     emphorus-footer-credit/
       ├── EmphorusCredit.tsx
       └── emphorus-credit.css
   ```

2. **Import and use**:
   ```tsx
   import EmphorusCredit from '@/components/emphorus-footer-credit/EmphorusCredit';

   export function Footer() {
     return (
       <footer>
         {/* Your footer content */}
         
         <EmphorusCredit />
       </footer>
     );
   }
   ```

### For HTML/Vanilla JS Projects

#### Option 1: Pure HTML (Simplest)

1. **Copy the CSS file** to your project
2. **Add the CSS link** to your HTML:
   ```html
   <link rel="stylesheet" href="path/to/emphorus-credit.css">
   ```

3. **Copy-paste the HTML** (from `emphorus-credit.html`):
   ```html
   <div class="emphorus-credit-container">
     <a 
       href="https://www.emphorus.in"
       target="_blank"
       rel="noopener noreferrer"
       class="emphorus-credit-link"
     >
       <div class="emphorus-credit-wrapper">
         <div class="emphorus-credit-text">
           Crafted with <span class="emphorus-heart">♥</span> by <span class="emphorus-brand">Emphorus</span>
         </div>
         <div class="emphorus-motionblur">
           <div class="emphorus-motion-box">
             <div class="emphorus-fireball-core"></div>
           </div>
         </div>
       </div>
     </a>
   </div>
   ```

#### Option 2: With JavaScript (More Flexible)

1. **Include the files**:
   ```html
   <link rel="stylesheet" href="path/to/emphorus-credit.css">
   <script src="path/to/emphorus-credit.js"></script>
   ```

2. **Add a container** and **initialize**:
   ```html
   <!-- Method 1: Auto-initialize with data attributes -->
   <div data-emphorus-credit 
        data-url="https://www.emphorus.in"
        data-text="Crafted with"
        data-brand="Emphorus"></div>

   <!-- Method 2: Manual initialization -->
   <div id="emphorus-credit"></div>
   <script>
     EmphorusCredit.init('#emphorus-credit', {
       url: 'https://www.emphorus.in',
       text: 'Crafted with',
       brandName: 'Emphorus'
     });
   </script>
   ```

## 🎨 Customization

### React Props

```tsx
<EmphorusCredit 
  url="https://www.emphorus.in"        // Custom URL
  text="Crafted with"                   // Custom text
  brandName="Emphorus"                  // Custom brand name
/>
```

### CSS Variables (Optional)

You can customize colors by modifying the CSS file:

```css
/* Night sky gradient */
background: linear-gradient(135deg, #0a0e1a 0%, #1e293b 40%, #0f172a 60%, #0a0e1a 100%);

/* Brand gradient colors */
background: linear-gradient(
  90deg,
  #4a5568 0%,    /* Dark slate */
  #6b7280 20%,   /* Grey */
  #8b7a8b 40%,   /* Mauve */
  #b88a8a 60%,   /* Dusty rose */
  #d4958d 80%,   /* Coral */
  #e8a798 100%   /* Peachy pink */
);
```

## 📦 Files Included

```
emphorus-footer-credit/
├── EmphorusCredit.tsx      # React/TypeScript component
├── emphorus-credit.css      # Standalone CSS (works anywhere)
├── emphorus-credit.js       # Vanilla JavaScript helper
├── emphorus-credit.html     # HTML example/template
├── index.ts                 # Export file for React
└── README.md               # This file
```

## 🎯 Use Cases

- Footer credits for client websites
- Portfolio project attributions
- Agency branding on delivered projects
- "Powered by" sections

## 🌐 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Opera (latest)
- ⚠️ IE11 (partial support, no gradient animations)

## 📝 License

Free to use for Emphorus projects and clients.

## 🤝 Credits

Created with ♥ by Emphorus Digital Solutions
- Website: [emphorus.in](https://www.emphorus.in)

---

**Need help?** Contact Emphorus for support and customizations.

