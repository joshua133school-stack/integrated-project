// i18n - Internationalization utility for FAAH
// Supports English (en) and Korean (ko)

(function() {
    'use strict';

    const STORAGE_KEY = 'faah-language';
    const DEFAULT_LANG = 'en';
    const SUPPORTED_LANGS = ['en', 'ko'];

    let currentLang = DEFAULT_LANG;

    // Initialize language from storage or browser preference
    function init() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored && SUPPORTED_LANGS.includes(stored)) {
            currentLang = stored;
        } else {
            // Check browser language
            const browserLang = navigator.language.slice(0, 2);
            if (SUPPORTED_LANGS.includes(browserLang)) {
                currentLang = browserLang;
            }
        }
        document.documentElement.lang = currentLang;
        return currentLang;
    }

    // Get nested value from object using dot notation
    function getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : null;
        }, obj);
    }

    // Get translation by key (e.g., 'injection.ready')
    function t(key, lang) {
        const useLang = lang || currentLang;
        const trans = window.translations;

        if (!trans || !trans[useLang]) {
            console.warn(`i18n: Language '${useLang}' not found`);
            return key;
        }

        const value = getNestedValue(trans[useLang], key);
        if (value === null) {
            console.warn(`i18n: Key '${key}' not found for language '${useLang}'`);
            // Fallback to English
            if (useLang !== 'en') {
                const fallback = getNestedValue(trans['en'], key);
                if (fallback !== null) return fallback;
            }
            return key;
        }
        return value;
    }

    // Set current language
    function setLanguage(lang) {
        if (!SUPPORTED_LANGS.includes(lang)) {
            console.warn(`i18n: Language '${lang}' not supported`);
            return false;
        }

        currentLang = lang;
        localStorage.setItem(STORAGE_KEY, lang);
        document.documentElement.lang = lang;

        // Update all elements with data-i18n attribute
        updateAllTranslations();

        // Dispatch event for dynamic content
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: lang } }));

        return true;
    }

    // Get current language
    function getLanguage() {
        return currentLang;
    }

    // Update all elements with data-i18n attribute
    function updateAllTranslations() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translated = t(key);

            // Check if it contains HTML
            if (translated.includes('<')) {
                el.innerHTML = translated;
            } else {
                el.textContent = translated;
            }
        });

        // Update elements with data-i18n-placeholder (for inputs)
        const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
        placeholders.forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            el.placeholder = t(key);
        });

        // Update elements with data-i18n-title (for tooltips)
        const titles = document.querySelectorAll('[data-i18n-title]');
        titles.forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            el.title = t(key);
        });
    }

    // Toggle between languages
    function toggleLanguage() {
        const newLang = currentLang === 'en' ? 'ko' : 'en';
        setLanguage(newLang);
        return newLang;
    }

    // Create language switcher element
    function createLanguageSwitcher() {
        const switcher = document.createElement('div');
        switcher.id = 'language-switcher';
        switcher.innerHTML = `
            <button class="lang-btn ${currentLang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
            <span class="lang-divider">|</span>
            <button class="lang-btn ${currentLang === 'ko' ? 'active' : ''}" data-lang="ko">한국어</button>
        `;

        // Add click handlers
        switcher.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                setLanguage(lang);

                // Update active states
                switcher.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });

        return switcher;
    }

    // Add CSS for language switcher
    function addSwitcherStyles() {
        if (document.getElementById('i18n-styles')) return;

        const style = document.createElement('style');
        style.id = 'i18n-styles';
        style.textContent = `
            #language-switcher {
                position: fixed;
                top: 20px;
                left: 20px;
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 8px;
                background: rgba(255, 255, 255, 0.95);
                padding: 8px 16px;
                border-radius: 20px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }

            #language-switcher .lang-btn {
                background: none;
                border: none;
                padding: 4px 8px;
                font-size: 14px;
                font-weight: 500;
                color: #666;
                cursor: pointer;
                transition: color 0.2s ease;
                border-radius: 4px;
            }

            #language-switcher .lang-btn:hover {
                color: #333;
            }

            #language-switcher .lang-btn.active {
                color: #000;
                font-weight: 700;
            }

            #language-switcher .lang-divider {
                color: #ccc;
                font-size: 14px;
            }

            /* Dark mode support */
            @media (prefers-color-scheme: dark) {
                #language-switcher {
                    background: rgba(30, 30, 30, 0.95);
                }
                #language-switcher .lang-btn {
                    color: #aaa;
                }
                #language-switcher .lang-btn:hover {
                    color: #fff;
                }
                #language-switcher .lang-btn.active {
                    color: #fff;
                }
                #language-switcher .lang-divider {
                    color: #555;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize and mount language switcher
    function mount() {
        init();
        addSwitcherStyles();

        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                document.body.appendChild(createLanguageSwitcher());
                updateAllTranslations();
            });
        } else {
            document.body.appendChild(createLanguageSwitcher());
            updateAllTranslations();
        }
    }

    // Export to global scope
    window.i18n = {
        init: init,
        t: t,
        setLanguage: setLanguage,
        getLanguage: getLanguage,
        toggleLanguage: toggleLanguage,
        updateAllTranslations: updateAllTranslations,
        mount: mount,
        createLanguageSwitcher: createLanguageSwitcher
    };

    // Auto-mount when script loads
    mount();

})();
