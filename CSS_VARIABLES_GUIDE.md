# CSS Variables & Customization Guide

## Header System CSS Variables

All variables are defined in `:root` of `/public/css/headers.css`

### Height Variables

```css
/* Mobile devices (≤ 767px) */
--header-height-mobile: 60vh;
--header-height-content-mobile: 50vh;

/* Tablet devices (768px - 1199px) */
--header-height-tablet: 70vh;
--header-height-content-tablet: 55vh;

/* Desktop devices (≥ 1200px) */
--header-height-desktop: 80vh;
--header-height-content-desktop: 60vh;
```

**Usage:**
```css
@media (max-width: 767px) {
  .page-header {
    min-height: var(--header-height-mobile);
  }
}
```

**Customization:**
To increase mobile header height from 60vh to 70vh:
```css
:root {
  --header-height-mobile: 70vh;
}
```

---

### Padding/Spacing Variables

```css
/* Mobile padding (includes navbar offset) */
--header-padding-mobile: clamp(2rem, 8vw, 4rem);

/* Tablet padding */
--header-padding-tablet: clamp(3rem, 10vw, 6rem);

/* Desktop padding */
--header-padding-desktop: clamp(4rem, 12vw, 8rem);
```

**What `clamp()` does:**
- Minimum: 2rem (mobile), 3rem (tablet), 4rem (desktop)
- Preferred: 8vw (mobile), 10vw (tablet), 12vw (desktop)
- Maximum: 4rem (mobile), 6rem (tablet), 8rem (desktop)

**Example:** On mobile at 375px viewport:
- 8vw = 30px
- `clamp(2rem, 8vw, 4rem)` = 2rem (32px, because 30px < 32px)

On mobile at 500px viewport:
- 8vw = 40px
- `clamp(2rem, 8vw, 4rem)` = 4rem (64px, because 40px > 64px)

**Customization:**
To add more space, increase the maximum value:
```css
:root {
  --header-padding-desktop: clamp(4rem, 12vw, 10rem); /* was 8rem */
}
```

---

### Navigation Awareness Variables

```css
/* Navbar height estimation */
--navbar-height: 50px;

/* Navbar padding/logo space */
--navbar-padding: 20px;
```

**Usage:**
Mobile headers add extra space to account for fixed navbar:
```css
.page-header {
  padding-top: max(var(--header-padding-mobile), 
                   calc(var(--navbar-height) + 2rem));
}
```

**Why:** Prevents header content from being hidden under fixed navbar

**Customization:**
If navbar height changes:
```css
:root {
  --navbar-height: 60px; /* if navbar increased */
}
```

---

## Common Customizations

### 1. Change All Header Heights

**Before:**
```css
:root {
  --header-height-mobile: 60vh;
  --header-height-tablet: 70vh;
  --header-height-desktop: 80vh;
}
```

**After (smaller headers):**
```css
:root {
  --header-height-mobile: 50vh;      /* was 60vh */
  --header-height-tablet: 60vh;      /* was 70vh */
  --header-height-desktop: 70vh;     /* was 80vh */
}
```

---

### 2. Reduce Mobile Header Height to Match Desktop

```css
:root {
  --header-height-mobile: 80vh;      /* same as desktop */
  --header-height-tablet: 80vh;      /* same as desktop */
  --header-height-desktop: 80vh;     /* unchanged */
}
```

**Effect:** All devices show same header height (responsive padding still applied)

---

### 3. Increase Spacing for Large Screens

```css
:root {
  --header-padding-desktop: clamp(4rem, 12vw, 12rem); /* was 8rem */
}
```

**Effect:** Desktop headers can now use up to 12rem (192px) padding

---

### 4. Adjust Responsive Scaling

The second value in `clamp()` controls how much the value scales with viewport:

```css
/* More responsive (scales more with viewport) */
--header-padding-desktop: clamp(4rem, 15vw, 8rem); /* was 12vw */

/* Less responsive (stays closer to minimum) */
--header-padding-desktop: clamp(4rem, 8vw, 8rem); /* was 12vw */
```

---

## Modifying Related Variables

### Font Sizing (in style.css)

Header titles use responsive fonts defined in style.css:
```css
h1 {
  font-size: clamp(1.6rem, 6vw, 4.2rem);
}
```

The `6vw` value controls scaling. Increase for bigger titles:
```css
h1 {
  font-size: clamp(1.6rem, 8vw, 4.2rem); /* more responsive */
}
```

### Gap/Spacing Variables (in headers.css)

Contact section spacing:
```css
.page-header__contact-section {
  gap: clamp(1.5rem, 4vw, 2.5rem);
}
```

Change to add more space between contact items:
```css
gap: clamp(2rem, 5vw, 3.5rem); /* more spacing */
```

---

## Responsive Values Explained

### Understanding `clamp(min, preferred, max)`

| Viewport | Calculation | Result |
|----------|-------------|--------|
| 320px | 8vw = 25.6px | min (32px) |
| 375px | 8vw = 30px | min (32px) |
| 480px | 8vw = 38.4px | 38.4px (preferred) |
| 640px | 8vw = 51.2px | max (64px) |
| 768px | 8vw = 61.4px | max (64px) |

**Pattern:** Clamp flows from min → preferred → max as viewport grows

---

## Breakpoint Reference

Breakpoints used throughout the system:

```css
/* Mobile */
@media (max-width: 767px) { }

/* Tablet and up */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 1200px) { }

/* Large desktop */
@media (min-width: 1600px) { }
```

To change breakpoints, find and replace in:
- `/public/css/headers.css`
- `/public/css/nav.css`
- Other page CSS files

---

## Tools for Experimentation

### Testing Custom Values

Use browser DevTools:
1. Open Inspector (F12)
2. Find `.page-header` element
3. Modify CSS variables in real-time:
   ```css
   :root {
     --header-height-mobile: 70vh; /* test new value */
   }
   ```
4. Resize viewport to see changes
5. Copy working values back to headers.css

### Calculate clamp() Values

Online calculator: [https://www.css-tricks.com/linearly-scale-font-size-with-css-clamp/](https://www.css-tricks.com/linearly-scale-font-size-with-css-clamp/)

Formula: `clamp(MIN, preferred, MAX)`

Where preferred uses viewport units:
- `vw` = viewport width percentage
- `vh` = viewport height percentage
- `vmin` = smaller of width/height
- `vmax` = larger of width/height

Example calculation for 6vw padding between 2rem and 8rem:
- At 320px: 6vw = 19.2px → use 2rem (32px)
- At 768px: 6vw = 46px → use 46px
- At 1400px: 6vw = 84px → use 8rem (128px)

---

## Verification After Changes

After modifying CSS variables:

1. **Test on multiple devices:**
   - Mobile: 375px (iPhone SE)
   - Tablet: 768px (iPad)
   - Desktop: 1200px+ (standard monitor)

2. **Check all pages:**
   - [ ] Home page
   - [ ] Work page
   - [ ] Contact page
   - [ ] Services page
   - [ ] Project page

3. **Verify responsive:**
   - [ ] No text overflow
   - [ ] Titles remain centered
   - [ ] Spacing looks balanced
   - [ ] Mobile has extra padding from navbar

4. **Check consistency:**
   - [ ] All pages same height on same device
   - [ ] No jarring changes at breakpoints
   - [ ] Smooth scaling with viewport

---

## Advanced: Creating New Variants

### Add a Compact Header Variant

```css
:root {
  /* New compact height option */
  --header-height-compact-mobile: 40vh;
  --header-height-compact-tablet: 50vh;
  --header-height-compact-desktop: 60vh;
}

/* New variant class */
.page-header--compact {
  @media (max-width: 767px) {
    min-height: var(--header-height-compact-mobile);
  }
  @media (min-width: 768px) {
    min-height: var(--header-height-compact-tablet);
  }
  @media (min-width: 1200px) {
    min-height: var(--header-height-compact-desktop);
  }
}
```

Usage:
```handlebars
<div class="page-header page-header--image page-header--compact">
  <!-- compact header -->
</div>
```

---

## Quick Reference Table

| Variable | Mobile | Tablet | Desktop | Purpose |
|----------|--------|--------|---------|---------|
| `--header-height-*` | 60vh | 70vh | 80vh | Header height |
| `--header-padding-*` | 2-4rem | 3-6rem | 4-8rem | Content padding |
| `--navbar-height` | 50px | 50px | 50px | Account for navbar |

---

## Troubleshooting

**Header too short on mobile?**
→ Increase `--header-height-mobile`

**Too much padding?**
→ Decrease second value in `clamp()` (preferred value)

**Title too small?**
→ Check `clamp()` in h1 font-size (style.css)

**Spacing inconsistent?**
→ Verify gap variables are applied to all similar elements

**Navbar overlap?**
→ Check `--navbar-height` and padding-top calculation

---

## Final Checklist

- [ ] Modified only CSS variables in `:root`
- [ ] Did NOT change class names
- [ ] Tested on 3+ devices/sizes
- [ ] All pages look consistent
- [ ] No text overflow or cutoff
- [ ] Mobile spacing looks good
- [ ] Verified at breakpoints (768px, 1200px)
