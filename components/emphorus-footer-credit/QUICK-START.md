# 🚀 Quick Start Guide

Get the Emphorus Footer Credit component up and running in 2 minutes!

## ⚡ Super Quick (HTML Only)

**1.** Copy `emphorus-credit.css` to your project

**2.** Add this to your HTML `<head>`:
```html
<link rel="stylesheet" href="path/to/emphorus-credit.css">
```

**3.** Add this to your footer (before `</footer>`):
```html
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
```

**Done!** 🎉

---

## ⚛️ React/Next.js

**1.** Copy the `emphorus-footer-credit` folder to your components directory

**2.** Import and use:
```tsx
import EmphorusCredit from '@/components/emphorus-footer-credit';

export function Footer() {
  return (
    <footer>
      <EmphorusCredit />
    </footer>
  );
}
```

**Done!** 🎉

---

## 🔧 With JavaScript

**1.** Include both files:
```html
<link rel="stylesheet" href="emphorus-credit.css">
<script src="emphorus-credit.js"></script>
```

**2.** Add container with data attribute:
```html
<div data-emphorus-credit></div>
```

**Done!** Auto-initializes on page load! 🎉

---

## 📝 WordPress

**1.** Upload `emphorus-credit.css` to your theme folder (e.g., `/wp-content/themes/your-theme/assets/css/`)

**2.** Add to `footer.php` before `<?php wp_footer(); ?>`:
```php
<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/css/emphorus-credit.css">

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
```

**Done!** 🎉

---

## ✅ Verification Checklist

After installation, check:
- [ ] Component appears at the bottom of your footer
- [ ] Night sky with twinkling stars is visible
- [ ] Shooting star animates from left to right
- [ ] "Emphorus" text has a flowing gradient
- [ ] Heart emoji pulses/beats
- [ ] Hover effect works (component lifts up slightly)
- [ ] Clicking opens emphorus.in in a new tab

---

## 🎨 Quick Customizations

### Change Text
Find and replace in the HTML:
- `Crafted with` → Your custom text
- `Emphorus` → Your brand name

### Change URL
Change `href="https://www.emphorus.in"` to your URL

### Change Size
Add to your CSS:
```css
.emphorus-credit-wrapper {
  width: 250px !important;  /* Default: 170px */
  height: 60px !important;   /* Default: 40px */
}
```

---

## 🆘 Troubleshooting

**Component not showing?**
- ✅ Check CSS file path is correct
- ✅ Make sure CSS loads before the HTML
- ✅ Check browser console for errors

**Animations not working?**
- ✅ Clear browser cache
- ✅ Make sure CSS file is fully loaded
- ✅ Check for CSS conflicts (use browser DevTools)

**Styling looks off?**
- ✅ Check for CSS conflicts with parent elements
- ✅ Add `!important` to override styles if needed
- ✅ Ensure container has enough space

---

## 📚 Need More Help?

- 📖 Read the full [README.md](./README.md)
- 💡 Check [EXAMPLES.md](./EXAMPLES.md) for advanced usage
- 🌐 Visit [emphorus.in](https://www.emphorus.in)
- 🎨 Open [demo.html](./demo.html) in your browser to see it in action

---

**That's it!** You're all set. Enjoy your beautiful footer credit! ✨

