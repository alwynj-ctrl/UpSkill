# Emphorus Logo Component Documentation

## Overview

The Emphorus Logo is a beautiful hexagonal icon with a gradient color scheme that matches the Emphorus brand. It features a hexagon outline with an inner diamond/gem and a connecting stem.

## 📁 Files

- **EmphorusLogo.tsx** - React/TypeScript component
- **Inline SVG** - Available in HTML, JS, and CSS versions

## 🎨 Logo Design

The logo consists of:
- **Hexagonal outline** - Main shape with gradient stroke
- **Inner gem/diamond** - Central focal point
- **Connecting stem** - Links to the base
- **Subtle background** - Semi-transparent hexagon fill
- **Gradient colors** - Emphorus brand colors (slate to peachy pink)

## 🚀 Usage

### In React/Next.js

```tsx
import { EmphorusLogo } from '@/components/emphorus-footer-credit';

export function MyComponent() {
  return (
    <div>
      {/* Default size */}
      <EmphorusLogo />
      
      {/* Custom size */}
      <EmphorusLogo width={100} height={33} />
      
      {/* With custom className */}
      <EmphorusLogo className="my-custom-class" />
    </div>
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | number | `60` | Width of the logo in pixels |
| `height` | number | `20` | Height of the logo in pixels |
| `className` | string | `''` | Custom CSS class for styling |

### In HTML

```html
<svg width="50" height="16" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Emphorus Logo">
  <defs>
    <linearGradient id="emphorus-logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4a5568" />
      <stop offset="20%" stop-color="#6b7280" />
      <stop offset="40%" stop-color="#8b7a8b" />
      <stop offset="60%" stop-color="#b88a8a" />
      <stop offset="80%" stop-color="#d4958d" />
      <stop offset="100%" stop-color="#e8a798" />
    </linearGradient>
  </defs>
  <path d="M256 50 L406 140 L406 320 L256 410 L106 320 L106 140 Z" fill="url(#emphorus-logo-gradient)" opacity="0.2" />
  <path d="M256 80 L380 150 L380 290 L256 360 L132 290 L132 150 Z" stroke="url(#emphorus-logo-gradient)" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M256 220 L290 256 L256 292 L222 256 Z" fill="url(#emphorus-logo-gradient)" />
  <path d="M256 292 L256 340" stroke="url(#emphorus-logo-gradient)" stroke-width="12" stroke-linecap="round" />
</svg>
```

## 🎨 Styling

### Default Styles (Included in emphorus-credit.css)

```css
.emphorus-logo-container {
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  margin-left: 2px;
}

.emphorus-logo {
  display: inline-block;
  vertical-align: middle;
  filter: drop-shadow(0 0 3px rgba(232, 167, 152, 0.3));
  animation: emphorus-logo-glow 3s ease infinite;
}

@keyframes emphorus-logo-glow {
  0%, 100% {
    filter: drop-shadow(0 0 3px rgba(232, 167, 152, 0.3));
  }
  50% {
    filter: drop-shadow(0 0 5px rgba(232, 167, 152, 0.5));
  }
}
```

### Customizing the Logo

#### Change Size

```css
.emphorus-logo {
  width: 80px !important;
  height: 26px !important;
}
```

#### Change Glow Effect

```css
.emphorus-logo {
  filter: drop-shadow(0 0 8px rgba(232, 167, 152, 0.8));
}
```

#### Disable Animation

```css
.emphorus-logo {
  animation: none !important;
}
```

#### Change Colors

You can modify the gradient stops in the SVG:

```html
<linearGradient id="emphorus-logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" stop-color="#YOUR_COLOR_1" />
  <stop offset="50%" stop-color="#YOUR_COLOR_2" />
  <stop offset="100%" stop-color="#YOUR_COLOR_3" />
</linearGradient>
```

## 📐 Recommended Sizes

| Context | Width | Height | Use Case |
|---------|-------|--------|----------|
| **Tiny** | 30px | 10px | Compact footers |
| **Small** | 50px | 16px | Default footer credit |
| **Medium** | 80px | 26px | Larger footer areas |
| **Large** | 120px | 40px | Headers, hero sections |
| **Extra Large** | 200px | 66px | Standalone branding |

**Note:** Maintain the aspect ratio of approximately 3:1 (width:height) for best results.

## 🎯 Use Cases

### 1. Footer Credits (Default)
```tsx
<EmphorusCredit showLogo={true} logoWidth={50} logoHeight={16} />
```

### 2. Standalone Logo
```tsx
<div className="my-brand-section">
  <EmphorusLogo width={120} height={40} />
  <p>Powered by Emphorus</p>
</div>
```

### 3. Navigation Bar
```tsx
<nav>
  <a href="/" className="logo-link">
    <EmphorusLogo width={80} height={26} />
  </a>
  {/* Other nav items */}
</nav>
```

### 4. Loading Screen
```tsx
<div className="loader-container">
  <EmphorusLogo width={100} height={33} className="pulse-animation" />
  <p>Loading...</p>
</div>
```

## 🌈 Brand Colors

The gradient uses Emphorus's brand colors:

```css
#4a5568 → Dark Slate Grey
#6b7280 → Medium Grey
#8b7a8b → Mauve
#b88a8a → Dusty Rose
#d4958d → Coral
#e8a798 → Peachy Pink
```

## ♿ Accessibility

The logo includes:
- `aria-label="Emphorus Logo"` for screen readers
- Semantic SVG markup
- Sufficient color contrast for visibility

## 📱 Responsive Considerations

For responsive designs, you can use CSS to adjust logo size:

```css
/* Mobile */
@media (max-width: 768px) {
  .emphorus-logo {
    width: 40px;
    height: 13px;
  }
}

/* Desktop */
@media (min-width: 769px) {
  .emphorus-logo {
    width: 60px;
    height: 20px;
  }
}
```

## 🎨 Design Guidelines

1. **Maintain aspect ratio** - Always keep approximately 3:1 ratio
2. **Use on dark backgrounds** - Logo is optimized for dark/night sky backgrounds
3. **Provide space** - Leave adequate whitespace around the logo
4. **Don't distort** - Never stretch or squash the logo
5. **Keep gradient** - The gradient is part of the brand identity

## 📄 License

This logo is part of the Emphorus brand identity. Use it only for Emphorus projects and attributions.

---

**Created by Emphorus Digital Solutions**  
Website: [emphorus.in](https://www.emphorus.in)

