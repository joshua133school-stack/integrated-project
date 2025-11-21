# i18n (Internationalization) Usage Guide

## Overview
This guide shows you how to use the i18n system to support multiple languages (English and Korean) in your website.

## Files Structure
```
/integrated-project
  ├── i18n.js              # i18n library
  ├── i18n-styles.css      # Language switcher styles
  ├── translations/
  │   ├── en.json          # English translations
  │   └── ko.json          # Korean translations
  └── index.html           # Updated with i18n support
```

## How to Use in HTML

### Method 1: Using `data-i18n` attribute (for text content)
```html
<h1 data-i18n="about.title">Oasis</h1>
<button data-i18n="injection.button">Start Injection Simulation</button>
```

### Method 2: Using `data-i18n-html` attribute (for HTML content)
```html
<h2 data-i18n="about.description" data-i18n-html>
  The <strong>oasis</strong> project is...
</h2>
```

### Method 3: For placeholder and title attributes
```html
<input type="text" data-i18n-placeholder="common.searchPlaceholder">
<button data-i18n-title="common.closeTooltip">X</button>
```

## How to Use in JavaScript

### Basic Usage - Translate a string
```javascript
// Get a simple translation
const buttonText = i18n.t('injection.button');
btn.textContent = buttonText;

// Or directly:
btn.textContent = i18n.t('knife.dropAgain');
```

### Before (Original Code):
```javascript
btn.textContent = 'Start Injection Simulation';
depthValue.textContent = depth.toFixed(1) + 'mm';
result.innerHTML = '<p class="success-message">✓ The knife landed safely on its back!</p>';
```

### After (With i18n):
```javascript
btn.textContent = i18n.t('injection.button');
depthValue.textContent = depth.toFixed(1) + i18n.t('injection.depth');
result.innerHTML = '<p class="success-message">' + i18n.t('knife.successMessage') + '</p>';
```

### Example: Updating Footer Elements
```javascript
// Original code in minify.js
x.innerHTML = '<div id="foot-touch">about oasis</div>';

// Updated with i18n
x.innerHTML = '<div id="foot-touch" data-i18n="footer.touch">about oasis</div>';
i18n.translatePage(); // Re-translate after DOM update
```

### Example: Dynamic Content Creation
```javascript
// When creating HTML dynamically, use i18n.t()
container.innerHTML = `
    <button id="start-btn">${i18n.t('injection.button')}</button>
    <div class="depth-display">${i18n.t('injection.depth')}</div>
`;
```

### Example: Handling Language Change Events
```javascript
// Listen for language changes
document.addEventListener('languageChanged', function(event) {
    console.log('Language changed to:', event.detail.lang);

    // Update any dynamic content that wasn't auto-translated
    updateMyCustomContent();
});
```

### Example: Re-translate After DOM Updates
```javascript
// After adding new elements to the DOM
function addNewContent() {
    const newElement = document.createElement('div');
    newElement.setAttribute('data-i18n', 'common.loading');
    newElement.textContent = 'Loading...';
    document.body.appendChild(newElement);

    // Re-translate the page to pick up new elements
    i18n.translatePage();
}
```

## Updating Your JavaScript Files

### Common Patterns to Update:

#### 1. Button Text
```javascript
// Before:
btn.textContent = 'Drop Again';
btn.textContent = 'Injecting...';

// After:
btn.textContent = i18n.t('knife.dropAgain');
btn.textContent = i18n.t('injection.injecting');
```

#### 2. innerHTML with Static Text
```javascript
// Before:
footer.innerHTML = '<div>about oasis</div>';

// After:
footer.innerHTML = '<div data-i18n="footer.about">about oasis</div>';
i18n.translatePage();
```

#### 3. Template Literals
```javascript
// Before:
container.innerHTML = \`
    <h2>Screen Saver</h2>
    <button>FOR MACINTOSH</button>
    <button>FOR WINDOWS</button>
\`;

// After:
container.innerHTML = \`
    <h2 data-i18n="footer.screensaver">Screen Saver</h2>
    <button data-i18n="screensaver.forMac">FOR MACINTOSH</button>
    <button data-i18n="screensaver.forWin">FOR WINDOWS</button>
\`;
i18n.translatePage();
```

## API Reference

### `i18n.t(key, params)`
Get a translated string.
- **key**: Translation key (e.g., 'about.title')
- **params**: Optional parameters for interpolation

```javascript
i18n.t('about.title') // Returns: "Oasis" or "오아시스"
```

### `i18n.switchLanguage(lang)`
Switch to a different language.
```javascript
i18n.switchLanguage('ko'); // Switch to Korean
i18n.switchLanguage('en'); // Switch to English
```

### `i18n.translatePage()`
Re-translate all elements with `data-i18n` attributes.
```javascript
i18n.translatePage();
```

### `i18n.getCurrentLanguage()`
Get the current language code.
```javascript
const currentLang = i18n.getCurrentLanguage(); // Returns: 'en' or 'ko'
```

## Adding New Translations

1. Open `/translations/en.json` and add your new key:
```json
{
  "mySection": {
    "newText": "Hello World"
  }
}
```

2. Open `/translations/ko.json` and add the Korean translation:
```json
{
  "mySection": {
    "newText": "안녕하세요"
  }
}
```

3. Use it in your code:
```javascript
const text = i18n.t('mySection.newText');
```

## Testing

1. Open your website
2. Click the language switcher buttons (EN / 한국어) in the top-right corner
3. Verify that all text changes to the selected language
4. Check browser localStorage to confirm language preference is saved
5. Refresh the page to ensure the language persists

## Tips

- Always add both English and Korean translations
- Use descriptive keys (e.g., 'injection.button' not 'btn1')
- Group related translations together
- Call `i18n.translatePage()` after dynamically adding HTML with `data-i18n` attributes
- Use `data-i18n-html` when your translation contains HTML tags
