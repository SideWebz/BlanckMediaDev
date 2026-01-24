# Header System - Quick Reference

## Basic Usage

### Image Header (Home, Work pages)
```handlebars
<div class="page-header page-header--image" 
     style="background-image: url('/images/your-image.png');">
  <div class="page-header__content">
    <h1 class="page-header__title">Page Title</h1>
  </div>
</div>
```

### Text-Only Header (Contact, Services, Project pages)
```handlebars
<div class="page-header page-header--no-image">
  <div class="container">
    <div class="page-header__content">
      <h1 class="page-header__title">Page Title</h1>
      <p class="page-header__subtitle">Optional subtitle</p>
    </div>
  </div>
</div>
```

### Header with Icon/Arrow
```handlebars
<h1 class="page-header__title page-header__title--with-icon">
  Title with Icon
</h1>
```
Then in page-specific CSS:
```css
.page-header__title--with-icon::before {
  background-image: url('/svg/icon.svg');
}
```

---

## Responsive Heights

| Breakpoint | Variable | Height |
|-----------|----------|--------|
| Mobile (≤767px) | `--header-height-mobile` | 60vh |
| Tablet (768-1199px) | `--header-height-tablet` | 70vh |
| Desktop (≥1200px) | `--header-height-desktop` | 80vh |

Edit in `:root` of `headers.css`

---

## Common Components

### Contact Information
```handlebars
<div class="page-header__contact-section">
  <div class="page-header__contact-item">
    <div class="page-header__contact-person">
      <img src="..." class="page-header__contact-image">
      <div>
        <h3 class="page-header__contact-name">Name</h3>
        <p class="page-header__contact-role">Role</p>
      </div>
    </div>
    <div class="page-header__contact-info">
      <p>email@example.com</p>
      <p>+32 123 456 789</p>
    </div>
  </div>
</div>
```

### Tab Buttons in Header
```handlebars
<div class="page-header__actions page-header__actions--mobile-stack">
  <button class="page-header__tab-button active" data-tab="tab1">Tab 1</button>
  <button class="page-header__tab-button" data-tab="tab2">Tab 2</button>
  <button class="page-header__tab-button" data-tab="tab3">Tab 3</button>
</div>
```

### Left-Aligned Content (Contact page style)
```handlebars
<div class="page-header__content page-header__content--left">
  <h1 class="page-header__title page-header__title--left">Title</h1>
  <!-- content -->
</div>
```

---

## CSS Classes Hierarchy

```
.page-header                          ← Main container
├── .page-header--image               ← Variant: with background
├── .page-header--no-image            ← Variant: text only
├── .page-header__content             ← Content wrapper
│   ├── .page-header__title           ← Main title
│   ├── .page-header__subtitle        ← Optional subtitle
│   ├── .page-header__actions         ← Button container
│   │   └── .page-header__tab-button  ← Individual button
│   └── .page-header__contact-section ← Contact wrapper
│       └── .page-header__contact-item ← Single contact
│           ├── .page-header__contact-person
│           │   ├── .page-header__contact-image
│           │   ├── .page-header__contact-name
│           │   └── .page-header__contact-role
│           └── .page-header__contact-info
```

---

## Customization Examples

### Change Mobile Header Height
```css
:root {
  --header-height-mobile: 70vh; /* was 60vh */
}
```

### Add Custom Spacing
```handlebars
<div class="page-header" style="padding: 100px 20px;">
  <!-- Custom padding override -->
</div>
```

### Add Background Overlay
Already included! `.page-header::before` provides `rgba(0,0,0,0.2-0.4)` gradient.
Remove with:
```css
.page-header.my-header::before {
  display: none;
}
```

### Custom Title Color
```css
.page-header--special .page-header__title {
  color: #orange;
}
```

---

## BEM Naming Convention

All classes follow **Block Element Modifier** (BEM):
- **Block**: `.page-header`
- **Element**: `.page-header__content`, `.page-header__title`
- **Modifier**: `.page-header--image`, `.page-header__actions--mobile-stack`

Benefits:
- Consistent naming across project
- Easy to find and modify styles
- Clear parent-child relationships
- No naming conflicts

---

## Mobile-First Responsive Pattern

```css
/* Mobile (default) */
.page-header {
  min-height: var(--header-height-mobile);
}

/* Tablet and up */
@media (min-width: 768px) {
  .page-header {
    min-height: var(--header-height-tablet);
  }
}

/* Desktop */
@media (min-width: 1200px) {
  .page-header {
    min-height: var(--header-height-desktop);
  }
}
```

---

## Important Notes

✅ **DO:**
- Use semantic class names from headers.css
- Leverage CSS variables for consistency
- Use `clamp()` for responsive sizing
- Follow BEM naming for custom additions

❌ **DON'T:**
- Use inline styles for layout/height
- Create page-specific header styles
- Add `mt-` or `mb-` utility classes to headers
- Override header heights in page CSS files

---

## Debugging

### Header not centered?
Check: Does parent have `display: flex`? `.page-header__content` has it.

### Title too small on mobile?
Check: `font-size` uses `clamp(1.6rem, 6vw, 4.2rem)` - adjust the `6vw` value.

### Spacing seems off?
Check: `--header-padding-*` variables, contact gap spacing values.

### Contact items not stacking on mobile?
Check: `.page-header__contact-item` has `flex-direction: column` on mobile, `flex-direction: row` on tablet+.

### Buttons not wrapping on mobile?
Check: `.page-header__actions--mobile-stack` class applied? It sets `flex-direction: column` on mobile.

---

## See Also

- 📄 [HEADER_REFACTOR_GUIDE.md](./HEADER_REFACTOR_GUIDE.md) - Full documentation
- 📋 `/public/css/headers.css` - Source code with detailed comments
- 🎯 Implementation examples in:
  - `/views/home.handlebars`
  - `/views/work.handlebars`
  - `/views/contact.handlebars`
  - `/views/services.handlebars`
  - `/views/project.handlebars`
