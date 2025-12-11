# Emphorus Credit Component - Usage Examples

## 📚 Table of Contents
- [React/Next.js Examples](#reactnextjs-examples)
- [HTML/CSS Examples](#htmlcss-examples)
- [JavaScript Examples](#javascript-examples)
- [WordPress Example](#wordpress-example)
- [Customization Examples](#customization-examples)

---

## React/Next.js Examples

### Basic Usage
```tsx
import EmphorusCredit from '@/components/emphorus-footer-credit';

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto py-8">
        {/* Your footer content */}
        <div className="text-center">Footer content here</div>
        
        {/* Emphorus Credit */}
        <EmphorusCredit />
      </div>
    </footer>
  );
}
```

### With Custom Props
```tsx
import EmphorusCredit from '@/components/emphorus-footer-credit';

export function Footer() {
  return (
    <footer>
      <EmphorusCredit 
        url="https://custom-url.com"
        text="Designed by"
        brandName="Your Brand"
      />
    </footer>
  );
}
```

### Conditional Rendering
```tsx
import EmphorusCredit from '@/components/emphorus-footer-credit';

export function Footer({ showCredit = true }) {
  return (
    <footer>
      {/* Footer content */}
      {showCredit && <EmphorusCredit />}
    </footer>
  );
}
```

---

## HTML/CSS Examples

### Simple Copy-Paste (No JS Required)
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website</title>
  <link rel="stylesheet" href="emphorus-credit.css">
</head>
<body>
  
  <main>
    <!-- Your website content -->
  </main>

  <footer>
    <!-- Emphorus Credit Component -->
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
  </footer>

</body>
</html>
```

### In Existing Footer
```html
<footer class="site-footer">
  <div class="footer-content">
    <div class="footer-links">
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </div>
    
    <div class="footer-social">
      <!-- Social links -->
    </div>
    
    <div class="copyright">
      <p>&copy; 2025 Your Company. All rights reserved.</p>
    </div>
  </div>

  <!-- Add Emphorus Credit -->
  <div class="emphorus-credit-container">
    <a href="https://www.emphorus.in" target="_blank" rel="noopener noreferrer" class="emphorus-credit-link">
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
</footer>
```

---

## JavaScript Examples

### Auto-Initialize with Data Attributes
```html
<link rel="stylesheet" href="emphorus-credit.css">
<script src="emphorus-credit.js"></script>

<!-- Automatically initializes on page load -->
<div data-emphorus-credit></div>

<!-- With custom options -->
<div data-emphorus-credit 
     data-url="https://www.emphorus.in"
     data-text="Designed by"
     data-brand="Emphorus"></div>
```

### Manual Initialization
```html
<link rel="stylesheet" href="emphorus-credit.css">
<script src="emphorus-credit.js"></script>

<div id="footer-credit"></div>

<script>
  // Initialize when DOM is ready
  EmphorusCredit.init('#footer-credit');
</script>
```

### With Custom Configuration
```html
<div id="footer-credit"></div>

<script>
  EmphorusCredit.init('#footer-credit', {
    url: 'https://custom-url.com',
    text: 'Built with',
    brandName: 'Custom Brand'
  });
</script>
```

### Dynamic Insertion
```html
<script>
  // Get the HTML as a string
  const creditHTML = EmphorusCredit.render({
    url: 'https://www.emphorus.in',
    text: 'Powered by',
    brandName: 'Emphorus'
  });

  // Insert it anywhere
  document.getElementById('footer').innerHTML += creditHTML;
</script>
```

---

## WordPress Example

### In footer.php
```php
<!-- Add before </body> tag -->
<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/css/emphorus-credit.css">

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

<?php wp_footer(); ?>
</body>
</html>
```

### As a Widget
```php
// In functions.php
function emphorus_credit_widget() {
  ?>
  <div class="emphorus-credit-container">
    <!-- Component HTML here -->
  </div>
  <?php
}
add_action('wp_footer', 'emphorus_credit_widget');

// Enqueue CSS
function emphorus_credit_styles() {
  wp_enqueue_style('emphorus-credit', get_template_directory_uri() . '/assets/css/emphorus-credit.css');
}
add_action('wp_enqueue_scripts', 'emphorus_credit_styles');
```

---

## Customization Examples

### Change Size
```css
/* Make it larger */
.emphorus-credit-wrapper {
  width: 250px !important;
  height: 60px !important;
}

.emphorus-credit-text {
  font-size: 14px !important;
}

/* Make it smaller */
.emphorus-credit-wrapper {
  width: 140px !important;
  height: 35px !important;
}

.emphorus-credit-text {
  font-size: 8px !important;
}
```

### Change Colors
```css
/* Custom night sky color */
.emphorus-credit-wrapper {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%) !important;
}

/* Custom brand gradient */
.emphorus-brand {
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%) !important;
}
```

### Disable Animations
```css
/* Turn off all animations */
.emphorus-credit-wrapper::before,
.emphorus-heart,
.emphorus-brand,
.emphorus-motion-box,
.emphorus-motion-box::before,
.emphorus-motion-box::after,
.emphorus-fireball-core {
  animation: none !important;
}
```

### Custom Position
```css
/* Stick to bottom right */
.emphorus-credit-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  margin: 0;
  padding: 0;
}

/* Center on page */
.emphorus-credit-container {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}
```

---

## Integration with Popular Frameworks

### Vue.js
```vue
<template>
  <footer>
    <div v-html="creditHTML"></div>
  </footer>
</template>

<script>
import '@/assets/css/emphorus-credit.css';

export default {
  data() {
    return {
      creditHTML: `
        <div class="emphorus-credit-container">
          <!-- Component HTML -->
        </div>
      `
    }
  }
}
</script>
```

### Angular
```typescript
// In component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer>
      <div [innerHTML]="creditHTML"></div>
    </footer>
  `,
  styleUrls: ['./emphorus-credit.css']
})
export class FooterComponent {
  creditHTML = `
    <div class="emphorus-credit-container">
      <!-- Component HTML -->
    </div>
  `;
}
```

---

## Tips & Best Practices

1. **Placement**: Best placed at the bottom of your footer for maximum visibility
2. **Spacing**: Add appropriate margin/padding around it to prevent crowding
3. **Responsiveness**: Component is mobile-friendly by default
4. **Performance**: Pure CSS animations - no JavaScript overhead
5. **Accessibility**: Includes proper ARIA attributes and semantic HTML
6. **SEO**: External link with `rel="noopener noreferrer"` for security

---

Need more help? Visit [emphorus.in](https://www.emphorus.in) or check the main README.

