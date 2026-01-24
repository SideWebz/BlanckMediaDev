# Header System Refactor - Complete Implementation Guide

## Overview

A unified, responsive header system has been implemented across all pages to ensure:
- ✅ Consistent header heights on desktop, tablet, and mobile
- ✅ Centered page titles using modern flexbox layout
- ✅ Support for headers with additional elements (tabs, contact info, subtitles)
- ✅ Increased header height on mobile with proper spacing from navigation
- ✅ Reusable CSS variables and components to avoid duplication
- ✅ Clean, responsive, and visually balanced design

---

## New Files Created

### `/public/css/headers.css`
A comprehensive header system with CSS variables and reusable classes:

**CSS Variables:**
```css
--header-height-mobile: 60vh
--header-height-tablet: 70vh
--header-height-desktop: 80vh
--header-height-content-mobile: 50vh
--header-height-content-tablet: 55vh
--header-height-content-desktop: 60vh
--header-padding-mobile: clamp(2rem, 8vw, 4rem)
--header-padding-tablet: clamp(3rem, 10vw, 6rem)
--header-padding-desktop: clamp(4rem, 12vw, 8rem)
```

**Key Classes:**
- `.page-header` - Base header container
- `.page-header--image` - For image backgrounds
- `.page-header--no-image` - For text-only headers
- `.page-header__content` - Centered content wrapper
- `.page-header__title` - Page title with responsive sizing
- `.page-header__subtitle` - Optional subtitle
- `.page-header__contact-section` - Contact information group
- `.page-header__actions` - Tab buttons/actions in header
- `.page-header__tab-button` - Styled button for tabs

---

## Pages Updated

### 1. **Home Page** (`views/home.handlebars`)
**Before:**
```handlebars
<div class="header-image">
  <img src="./images/BlanckMediaHeader.png" alt="Header">
</div>
```

**After:**
```handlebars
<div class="page-header page-header--image" 
     style="background-image: url('./images/BlanckMediaHeader.png');">
</div>
```

**Benefits:**
- Uses CSS `background-image` instead of `<img>` for better control
- Automatic responsive height management
- Clean separation of concerns (layout in CSS, not HTML)

---

### 2. **Work Page** (`views/work.handlebars`)
**Before:**
```handlebars
<div class="header-image-2">
  <h1 class="text-center mb-15 mt-15">SELECTED WORK</h1>
</div>
```

**After:**
```handlebars
<div class="page-header page-header--image" 
     style="background-image: url('/images/header-image-blanckmedia.png');">
  <div class="page-header__content">
    <h1 class="page-header__title page-header__title--with-icon">
      SELECTED WORK
    </h1>
  </div>
</div>
```

**Benefits:**
- Title is now truly centered (horizontally and vertically)
- Arrow icon displays via `::before` pseudo-element in headers.css
- Consistent sizing with other pages
- Arrow background image defined in `work.css`

---

### 3. **Contact Page** (`views/contact.handlebars`)
**Before:**
```handlebars
<div class="header-no-image">
  <div class="container">
    <h1 class="text-start mb-5">CONTACT</h1>
    <div class="d-flex flex-column gap-5">
      <div class="d-flex flex-column flex-md-row...">
        <div class="person d-flex align-items-center gap-3">
          <img src="..." class="person-image">
          <div>
            <h3 class="mb-2 person-name">Jonathan...</h3>
            <h4 class="job-title">Producer // cinematographer</h4>
          </div>
        </div>
        <div class="contact-info">
          <p>jonathan@blanckmedia.be</p>
          <p>+32 499 16 58 18</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

**After:**
```handlebars
<div class="page-header page-header--no-image">
  <div class="container">
    <div class="page-header__content page-header__content--left">
      <h1 class="page-header__title page-header__title--left">CONTACT</h1>
      
      <div class="page-header__contact-section">
        <div class="page-header__contact-item">
          <div class="page-header__contact-person">
            <img src="..." class="page-header__contact-image">
            <div>
              <h3 class="page-header__contact-name">Jonathan Blanckaert</h3>
              <p class="page-header__contact-role">Producer // cinematographer</p>
            </div>
          </div>
          <div class="page-header__contact-info">
            <p class="mb-1">jonathan@blanckmedia.be</p>
            <p class="mb-0">+32 499 16 58 18</p>
          </div>
        </div>
        <!-- ... second person ... -->
      </div>
    </div>
  </div>
</div>
```

**Benefits:**
- Semantic, structured HTML
- Responsive contact layout (stacks on mobile, side-by-side on desktop)
- Proper spacing controlled by CSS variables
- Contact images now use `page-header__contact-image` with consistent sizing
- Left-aligned variant (`page-header__content--left`, `page-header__title--left`)

---

### 4. **Services Page** (`views/services.handlebars`)
**Before:**
```handlebars
<div class="header-no-image">
  <div class="container">
    <h1 class="text-center mt-5 mb-5">WHAT WE OFFER?</h1>
    
    <div class="mb-0">
      <div class="row g-3 justify-content-center tabs-mobile-layout">
        <div class="col-6 col-md-6 col-lg-4">
          <button class="btn-primary w-100 active-tab" data-tab="commercials">
            Commercials
          </button>
        </div>
        <!-- ... more tabs ... -->
      </div>
    </div>
  </div>
</div>

<style>
  /* Inline hacks for responsive header height */
  @media (max-width: 767px) {
    .header-no-image::before {
      padding-top: 80%;
    }
  }
</style>
```

**After:**
```handlebars
<div class="page-header page-header--no-image">
  <div class="container">
    <div class="page-header__content">
      <h1 class="page-header__title">WHAT WE OFFER?</h1>
      
      <div class="page-header__actions page-header__actions--mobile-stack">
        <button class="page-header__tab-button active" data-tab="commercials">
          Commercials
        </button>
        <button class="page-header__tab-button" data-tab="social">
          Social Media
        </button>
        <button class="page-header__tab-button" data-tab="brand">
          Brand Stories
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  .tab-panel {
    display: none;
  }
  .tab-panel.active-panel {
    display: block;
  }
</style>

<script>
  const tabs = document.querySelectorAll('.page-header__tab-button[data-tab]')
  const panels = document.querySelectorAll('.tab-panel')
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab
      tabs.forEach(t => t.classList.remove('active'))
      panels.forEach(p => p.classList.remove('active-panel'))
      tab.classList.add('active')
      document.getElementById(target).classList.add('active-panel')
      history.replaceState(null, '', `#${target}`)
    })
  })
</script>
```

**Benefits:**
- Removed inline CSS hacks
- Tabs now use `.page-header__tab-button` with consistent styling
- `.page-header__actions--mobile-stack` handles responsive wrapping
- Cleaner JavaScript using new class selectors
- Header height automatically managed by CSS variables

---

### 5. **Project Page** (`views/project.handlebars`)
**Before:**
```handlebars
<header class="project-header mb-0">
  <h1 class="PageTitleLowerCase mb-0">{{project.title}}</h1>
  {{#if project.brand}}
    <p class="project-subtitle"><strong>{{project.slug}}</strong></p>
  {{/if}}
</header>
```

**After:**
```handlebars
<header class="page-header page-header--no-image">
  <div class="page-header__content">
    <h1 class="page-header__title">{{project.title}}</h1>
    {{#if project.brand}}
      <p class="page-header__subtitle">{{project.slug}}</p>
    {{/if}}
  </div>
</header>
```

**Benefits:**
- Uses unified header system
- Subtitle properly styled with `page-header__subtitle`
- Consistent with all other page headers

---

## CSS Files Updated

### 1. **`/public/css/headers.css`** (NEW)
Complete unified header system with:
- CSS variables for all heights and spacing
- Responsive design for mobile/tablet/desktop
- Support for all header variants
- Consistent centering and alignment
- Contact information layout
- Tab/action buttons styling

### 2. **`/public/css/home.css`**
**Changes:**
- Removed `.header-image` and `.header-image img` styles (now in headers.css)
- Kept only home-page specific styles (scroll arrow animation)
- Added comment pointing to headers.css for header styling

### 3. **`/public/css/work.css`**
**Changes:**
- Removed entire `.header-image-2` block (200+ lines)
- Removed `.header-image-2 h1`, `::before`, `::after` styles
- Kept only one line: `.page-header__title--with-icon::before` background image definition
- Much cleaner and more maintainable

### 4. **`/public/css/contact.css`**
**Changes:**
- Removed `.header-no-image` styles
- Removed old `.person-image`, `.person-name`, `.job-title`, `.contact-info p` styles
- Kept only card section styles (below the header)
- Added note about header styling location

### 5. **`/public/css/sections.css`**
**Changes:**
- Removed `.project-header`, `.project-title`, `.project-subtitle` styles
- These are now in headers.css as `.page-header`, `.page-header__title`, `.page-header__subtitle`
- Kept section-specific styling for video players, cards, etc.

### 6. **`/views/layouts/main.handlebars`**
**Changes:**
- Added `<link rel="stylesheet" href="/css/headers.css">` before nav.css

---

## Responsive Behavior

### Mobile (≤ 767px)
- Header height: `60vh`
- Extra padding: `clamp(2rem, 8vw, 4rem)` + 20px navbar offset
- Titles wrap naturally
- Contact sections stack vertically
- Tab buttons stack vertically with `.page-header__actions--mobile-stack`
- Increased visual separation from navigation

### Tablet (768px - 1199px)
- Header height: `70vh`
- Padding: `clamp(3rem, 10vw, 6rem)`
- Improved spacing for medium screens
- Contact sections inline with proper alignment

### Desktop (≥ 1200px)
- Header height: `80vh` (standard height)
- Padding: `clamp(4rem, 12vw, 8rem)`
- Full responsive sizing with clamp() for smooth scaling
- All elements aligned and centered

---

## Key Features

### 1. **Consistent Heights**
```css
--header-height-mobile: 60vh;
--header-height-tablet: 70vh;
--header-height-desktop: 80vh;
```
All pages use these variables, ensuring visual consistency.

### 2. **Centered Titles**
Uses flexbox for true horizontal and vertical centering:
```css
.page-header {
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-header__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
```

### 3. **Responsive Spacing**
All spacing uses `clamp()` for fluid scaling:
```css
padding: clamp(4rem, 12vw, 8rem);
font-size: clamp(1.6rem, 6vw, 4.2rem);
```

### 4. **Support for Headers with Content**
- Contact information: `.page-header__contact-section`
- Tab buttons: `.page-header__actions`
- Subtitles: `.page-header__subtitle`
- All maintain consistent heights and spacing

### 5. **No Per-Page Hacks**
- Removed inline styles from services.handlebars
- Removed custom responsive logic scattered across files
- Centralized in headers.css with CSS variables

---

## Migration Notes

### For Developers
1. Use `.page-header` for all page headers
2. Choose variant: `.page-header--image` or `.page-header--no-image`
3. Use `.page-header__content` for centered content
4. Use semantic classes: `__title`, `__subtitle`, `__actions`, etc.
5. For custom elements, follow the `.page-header__*` naming pattern

### CSS Variables to Customize
Edit `:root` in headers.css to adjust:
- Header heights for different breakpoints
- Padding/spacing values
- Mobile navbar offset

### Colors & Fonts
All inherited from:
- `style.css` for typography
- `nav.css` for navbar related styles
- Page-specific CSS files for unique styling

---

## Files Modified Summary

| File | Changes | Impact |
|------|---------|--------|
| `/public/css/headers.css` | Created | New unified system |
| `/public/css/home.css` | Simplified | Removed 50+ lines |
| `/public/css/work.css` | Simplified | Removed 80+ lines |
| `/public/css/contact.css` | Simplified | Removed 40+ lines |
| `/public/css/sections.css` | Simplified | Removed 30+ lines |
| `/views/home.handlebars` | Updated | 1 line change |
| `/views/work.handlebars` | Updated | 5 lines changed |
| `/views/contact.handlebars` | Updated | 50+ lines refactored |
| `/views/services.handlebars` | Updated | Removed hacks, 10+ lines refactored |
| `/views/project.handlebars` | Updated | 5 lines changed |
| `/views/layouts/main.handlebars` | Updated | Added headers.css link |

---

## Testing Recommendations

### Desktop (1200px+)
- [ ] Home: Header image displays at 80vh with proper aspect ratio
- [ ] Work: Title centered with orange arrow icon
- [ ] Contact: Two contact persons side-by-side with proper alignment
- [ ] Services: Title centered with 3 tabs in one row
- [ ] Project: Title and subtitle centered

### Tablet (768px - 1199px)
- [ ] All titles still centered and readable
- [ ] Contact persons maintain proper spacing
- [ ] Tab buttons wrap responsively (2-1 or 3 in one row)
- [ ] Headers at 70vh height

### Mobile (≤ 767px)
- [ ] Header height increased to 60vh
- [ ] Titles wrap naturally and remain readable
- [ ] Contact persons stack vertically
- [ ] Tab buttons stack vertically in one column
- [ ] Extra padding below navbar prevents overlap
- [ ] All text clearly separated and readable

### Visual Consistency
- [ ] All headers have same baseline height within each breakpoint
- [ ] All titles use same font sizing with clamp()
- [ ] All spacing uses CSS variables
- [ ] Contact information properly aligned on all sizes

---

## Browser Compatibility

All features use modern CSS:
- ✅ CSS Grid & Flexbox (all modern browsers)
- ✅ CSS `clamp()` (Chrome 79+, Firefox 75+, Safari 13.1+)
- ✅ CSS Variables (all modern browsers)
- ✅ `background-image` with `::before` overlays (universal)

Graceful degradation for older browsers (older layouts will still work, just less polished).

---

## Future Enhancements

1. **Animation Options**: Add fade-in or slide-down animations to headers
2. **Dark Mode**: Extend CSS variables for dark/light theme support
3. **Additional Variants**: `.page-header--transparent`, `.page-header--sticky`, etc.
4. **Hero Sections**: Create `.page-hero` for full-viewport headers
5. **Breadcrumbs**: Add `.page-header__breadcrumb` support
6. **Search Bar**: Add `.page-header__search` variant

---

## Questions?

Refer to:
- `/public/css/headers.css` - Full documentation in comments
- Individual page files - Implementation examples
- `style.css` - Typography and color variables
