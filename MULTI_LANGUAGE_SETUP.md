# Multi-Language Support Implementation

## ✅ What's Been Implemented

Your website now supports **2 languages: English (EN) and Korean (한국어)**

### Files Added:
1. **`i18n.js`** - Internationalization library
2. **`i18n-styles.css`** - Language switcher styling
3. **`translations/en.json`** - English translations
4. **`translations/ko.json`** - Korean translations
5. **`I18N_USAGE_GUIDE.md`** - Complete usage documentation
6. **`example-i18n-usage.js`** - Code examples for your JavaScript files

### Files Modified:
- **`index.html`** - Added language switcher and translation attributes

## 🎯 Features

- ✅ Language switcher in top-right corner (EN / 한국어)
- ✅ Automatic language detection from localStorage
- ✅ Language preference persistence across page reloads
- ✅ Support for HTML content translation
- ✅ Dynamic JavaScript content translation
- ✅ Custom events for language change detection
- ✅ Responsive design for mobile and desktop

## 🚀 How to Use

### 1. HTML Elements (Already Done)
The HTML has been updated with `data-i18n` attributes:
```html
<h1 data-i18n="about.heading">Oasis</h1>
<button data-i18n="injection.button">Start Injection</button>
```

### 2. JavaScript Updates (You Need to Do This)
Update your `minify/minify.js` file to use i18n for dynamic text:

**Before:**
```javascript
btn.textContent = 'Start Injection Simulation';
```

**After:**
```javascript
btn.textContent = i18n.t('injection.button');
```

See `example-i18n-usage.js` for 10+ detailed examples!

## 📋 Next Steps

### Step 1: Update Your JavaScript
Go through your `minify/minify.js` and update text strings to use `i18n.t()`:

Common patterns to update:
- `textContent = "text"` → `textContent = i18n.t('key')`
- `innerHTML = "<div>text</div>"` → Use `data-i18n` attributes + `i18n.translatePage()`

### Step 2: Add Missing Translations
As you update your JavaScript, you may find text that's not in the translation files yet:

1. Open `translations/en.json`
2. Add your new translation key
3. Open `translations/ko.json`
4. Add the Korean translation
5. Use it with `i18n.t('your.new.key')`

### Step 3: Test
1. Open your website
2. Click the language switcher (EN / 한국어)
3. Verify all text changes
4. Check that the language persists after page reload

## 📚 Documentation

- **`I18N_USAGE_GUIDE.md`** - Complete API reference and usage guide
- **`example-i18n-usage.js`** - 10+ code examples showing how to update your JS

## 🔍 Key Locations to Update

Based on your `minify.js`, these areas need translation updates:

1. **Injection simulation** (lines ~918, 940, 978, 987)
   - "Injecting...", "Start Injection Simulation", "mm"

2. **Knife drop** (lines ~1771, 1773)
   - "Drop Again", success messages

3. **Footer elements** (lines ~3490, 3547, 3550-3551)
   - "about oasis", "screen saver", "share", "fullscreen", "exit fullscreen"

4. **Share box** (line ~3490)
   - "facebook", "twitter", "google plus", "pinterest", "tumblr"

5. **Screensaver** (line ~3528)
   - "FOR MACINTOSH", "FOR WINDOWS", Flash Player message

## 💡 Quick Tips

1. **After creating HTML dynamically**, call `i18n.translatePage()`
2. **For text content**, use `i18n.t('key')`
3. **For HTML with tags**, use `data-i18n` + `data-i18n-html` attributes
4. **Listen for changes** with `document.addEventListener('languageChanged', ...)`

## 🎨 Customization

### Add More Languages
1. Create `translations/es.json` (Spanish, for example)
2. Update `i18n.js`: `supportedLanguages: ['en', 'ko', 'es']`
3. Add button: `<button data-lang="es">ES</button>`

### Style the Language Switcher
Edit `i18n-styles.css` to customize:
- Button colors
- Position
- Hover effects
- Mobile responsiveness

## ✨ Example Usage in Your Code

```javascript
// Simple text
btn.textContent = i18n.t('injection.button');

// HTML creation with i18n
container.innerHTML = `
    <div data-i18n="footer.about">about oasis</div>
    <button data-i18n="screensaver.forMac">FOR MACINTOSH</button>
`;
i18n.translatePage();

// Get current language
const currentLang = i18n.getCurrentLanguage(); // 'en' or 'ko'

// Switch language programmatically
i18n.switchLanguage('ko');

// React to language changes
document.addEventListener('languageChanged', (e) => {
    console.log('Language changed to:', e.detail.lang);
});
```

## 🐛 Troubleshooting

**Problem:** Language doesn't switch
- Check browser console for errors
- Verify translation JSON files are accessible
- Make sure `i18n.js` loads before `minify.js`

**Problem:** Some text doesn't translate
- Check if the element has `data-i18n` attribute
- Call `i18n.translatePage()` after adding new DOM elements
- For JS-generated content, use `i18n.t()` directly

**Problem:** Translation key not found
- Check the key exists in both `en.json` and `ko.json`
- Verify the key path is correct (e.g., 'about.title' not 'aboutTitle')

## 📞 Support

For detailed examples and API documentation, see:
- `I18N_USAGE_GUIDE.md` - Complete guide
- `example-i18n-usage.js` - Code examples

## 🎉 Summary

You now have a fully functional multi-language system! The HTML is ready to go. You just need to update your JavaScript files to use `i18n.t()` for dynamic content. Follow the examples in `example-i18n-usage.js` to get started.

Happy translating! 🌍
