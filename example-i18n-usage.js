/**
 * Example: How to Update Your JavaScript to Use i18n
 *
 * This file shows examples of common patterns found in your minify.js
 * and how to update them to support multi-language.
 */

// ============================================
// EXAMPLE 1: Simple Button Text
// ============================================

// BEFORE:
function startInjection_OLD() {
    btn.textContent = 'Injecting...';
    // ... rest of code
}

// AFTER:
function startInjection() {
    btn.textContent = i18n.t('injection.injecting');
    // ... rest of code
}


// ============================================
// EXAMPLE 2: Text with Variables/Numbers
// ============================================

// BEFORE:
function updateDepth_OLD(depth) {
    depthValue.textContent = depth.toFixed(1) + 'mm';
}

// AFTER:
function updateDepth(depth) {
    depthValue.textContent = depth.toFixed(1) + i18n.t('injection.depth');
}


// ============================================
// EXAMPLE 3: innerHTML with HTML Content
// ============================================

// BEFORE:
function showResult_OLD() {
    result.innerHTML = '<p class="success-message">✓ The knife landed safely on its back!</p><p>This demonstrates that knives don\'t always fall point-first. The flat surface provides stability.</p>';
}

// AFTER:
function showResult() {
    result.innerHTML = `
        <p class="success-message">${i18n.t('knife.successMessage')}</p>
        <p>${i18n.t('knife.successDescription')}</p>
    `;
}


// ============================================
// EXAMPLE 4: Creating DOM Elements with Text
// ============================================

// BEFORE:
function createFooter_OLD() {
    const footer = document.createElement('div');
    footer.innerHTML = `
        <div id="foot-touch">about oasis</div>
        <div id="foot-share">share</div>
        <div id="foot-full">fullscreen</div>
    `;
    return footer;
}

// AFTER (Method 1: Using i18n.t() in template):
function createFooter_v1() {
    const footer = document.createElement('div');
    footer.innerHTML = `
        <div id="foot-touch">${i18n.t('footer.touch')}</div>
        <div id="foot-share">${i18n.t('footer.share')}</div>
        <div id="foot-full">${i18n.t('footer.fullscreen')}</div>
    `;
    return footer;
}

// AFTER (Method 2: Using data-i18n attributes):
function createFooter_v2() {
    const footer = document.createElement('div');
    footer.innerHTML = `
        <div id="foot-touch" data-i18n="footer.touch">about oasis</div>
        <div id="foot-share" data-i18n="footer.share">share</div>
        <div id="foot-full" data-i18n="footer.fullscreen">fullscreen</div>
    `;

    // Re-translate to pick up the new elements
    i18n.translatePage();
    return footer;
}


// ============================================
// EXAMPLE 5: Dynamic Footer Share Box
// ============================================

// BEFORE:
function createShareBox_OLD() {
    const box = document.createElement('div');
    box.innerHTML = `
        <ul id="foot-share-box">
            <li id="foot-share-0">facebook</li>
            <li id="foot-share-1">twitter</li>
            <li id="foot-share-2">google plus</li>
            <li id="foot-share-3">pinterest</li>
            <li id="foot-share-4">tumblr</li>
        </ul>
    `;
    document.body.appendChild(box);
}

// AFTER:
function createShareBox() {
    const box = document.createElement('div');
    box.innerHTML = `
        <ul id="foot-share-box">
            <li id="foot-share-0" data-i18n="share.facebook">facebook</li>
            <li id="foot-share-1" data-i18n="share.twitter">twitter</li>
            <li id="foot-share-2" data-i18n="share.googlePlus">google plus</li>
            <li id="foot-share-3" data-i18n="share.pinterest">pinterest</li>
            <li id="foot-share-4" data-i18n="share.tumblr">tumblr</li>
        </ul>
    `;
    document.body.appendChild(box);

    // Important: Call translatePage after adding to DOM
    i18n.translatePage();
}


// ============================================
// EXAMPLE 6: Fullscreen Text Toggle
// ============================================

// BEFORE:
function onFullscreenChange_OLD() {
    if (document.webkitIsFullScreen) {
        fullscreenBtn.innerHTML = "exit fullscreen";
    } else {
        fullscreenBtn.innerHTML = "fullscreen";
    }
}

// AFTER:
function onFullscreenChange() {
    if (document.webkitIsFullScreen) {
        fullscreenBtn.textContent = i18n.t('footer.exitFullscreen');
    } else {
        fullscreenBtn.textContent = i18n.t('footer.fullscreen');
    }
}


// ============================================
// EXAMPLE 7: Conditional Footer Content
// ============================================

// BEFORE:
function initFooter_OLD() {
    if (CMDetect.isMobile) {
        x.innerHTML = '<div id="foot-touch">about oasis</div>';
    } else {
        x.innerHTML = `
            <div id="foot-web-about">about oasis</div>
            <div id="foot-dot-big">•</div>
            <div id="foot-web-screen">screen saver</div>
        `;
    }
}

// AFTER:
function initFooter() {
    if (CMDetect.isMobile) {
        x.innerHTML = '<div id="foot-touch" data-i18n="footer.touch">about oasis</div>';
    } else {
        x.innerHTML = `
            <div id="foot-web-about" data-i18n="footer.about">about oasis</div>
            <div id="foot-dot-big">•</div>
            <div id="foot-web-screen" data-i18n="footer.screensaver">screen saver</div>
        `;
    }

    // Re-translate after DOM update
    i18n.translatePage();
}


// ============================================
// EXAMPLE 8: Screensaver Content
// ============================================

// BEFORE:
function createScreensaver_OLD() {
    container.innerHTML = `
        <ul>
            <li id="ss-button-mac">FOR MACINTOSH</li>
            <li id="ss-button-win">FOR WINDOWS</li>
        </ul>
        <p>You need <a href="http://www.adobe.com/go/getflashplayer" target="_blank">Adobe Flash Player</a> 10.1 or higher to install this screensaver.</p>
    `;
}

// AFTER:
function createScreensaver() {
    container.innerHTML = `
        <ul>
            <li id="ss-button-mac" data-i18n="screensaver.forMac">FOR MACINTOSH</li>
            <li id="ss-button-win" data-i18n="screensaver.forWin">FOR WINDOWS</li>
        </ul>
        <p data-i18n-html="screensaver.flashRequired">
            You need <a href="http://www.adobe.com/go/getflashplayer" target="_blank">Adobe Flash Player</a> 10.1 or higher to install this screensaver.
        </p>
    `;

    i18n.translatePage();
}


// ============================================
// EXAMPLE 9: Handling Language Change Events
// ============================================

// Listen for language changes and update custom content
document.addEventListener('languageChanged', function(event) {
    console.log('Language changed to:', event.detail.lang);

    // Update any dynamically generated content that wasn't auto-translated
    updateCustomContent();

    // Update meta tags if needed
    updateMetaTags(event.detail.lang);
});

function updateCustomContent() {
    // Re-fetch or regenerate content that depends on language
    // Example: update dynamically loaded poster titles
    const posters = document.querySelectorAll('.poster-title');
    posters.forEach(poster => {
        const key = poster.getAttribute('data-i18n-key');
        if (key) {
            poster.textContent = i18n.t(key);
        }
    });
}

function updateMetaTags(lang) {
    // Update HTML lang attribute
    document.documentElement.setAttribute('lang', lang);

    // Optionally update meta descriptions, titles, etc.
    if (lang === 'ko') {
        document.title = '오아시스 - Form Follows Function';
    } else {
        document.title = 'Oasis - Form Follows Function';
    }
}


// ============================================
// EXAMPLE 10: Best Practice Pattern
// ============================================

// Complete example showing best practices
function initializeComponent() {
    // 1. Create HTML structure with data-i18n attributes
    const component = document.createElement('div');
    component.className = 'my-component';
    component.innerHTML = `
        <h2 data-i18n="component.title">Title</h2>
        <p data-i18n="component.description">Description</p>
        <button id="action-btn" data-i18n="component.actionButton">Click Me</button>
    `;

    // 2. Add to DOM
    document.body.appendChild(component);

    // 3. Translate the new content
    i18n.translatePage();

    // 4. Set up event listeners
    const btn = document.getElementById('action-btn');
    btn.addEventListener('click', handleAction);

    // 5. Listen for language changes to update dynamic content
    document.addEventListener('languageChanged', () => {
        // Update any content that couldn't use data-i18n
        updateDynamicContent();
    });
}


// ============================================
// QUICK REFERENCE
// ============================================

/*
Common i18n Methods:

1. i18n.t(key)
   - Get translation for a key
   - Example: i18n.t('about.title')

2. i18n.switchLanguage(lang)
   - Switch to different language
   - Example: i18n.switchLanguage('ko')

3. i18n.translatePage()
   - Re-translate all elements with data-i18n
   - Call after adding new DOM elements

4. i18n.getCurrentLanguage()
   - Get current language code
   - Returns: 'en' or 'ko'

HTML Attributes:
- data-i18n="key"              -> Sets textContent
- data-i18n-html               -> Sets innerHTML (use with data-i18n)
- data-i18n-placeholder="key"  -> Sets placeholder
- data-i18n-title="key"        -> Sets title attribute
- data-lang="en"               -> Language switcher button
*/
