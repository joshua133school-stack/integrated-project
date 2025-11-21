/**
 * Simple i18n (Internationalization) System
 * Supports multi-language translation for HTML and JavaScript content
 */

const i18n = {
    currentLang: 'en',
    translations: {},
    defaultLang: 'en',
    supportedLanguages: ['en', 'ko'],

    /**
     * Initialize the i18n system
     * @param {string} defaultLang - Default language (e.g., 'en', 'ko')
     */
    async init(defaultLang = 'en') {
        this.defaultLang = defaultLang;

        // Get language from localStorage or use default
        this.currentLang = localStorage.getItem('language') || defaultLang;

        // Load translations
        await this.loadTranslations(this.currentLang);

        // Translate the page
        this.translatePage();

        // Attach event listeners for language switchers
        this.attachLanguageSwitchers();

        // Update HTML lang attribute
        document.documentElement.setAttribute('lang', this.currentLang);
    },

    /**
     * Load translation file for a specific language
     * @param {string} lang - Language code
     */
    async loadTranslations(lang) {
        try {
            const response = await fetch(`/translations/${lang}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load translations for ${lang}`);
            }
            this.translations = await response.json();
            return true;
        } catch (error) {
            console.error('Error loading translations:', error);

            // Fallback to default language if current lang fails
            if (lang !== this.defaultLang) {
                console.log(`Falling back to ${this.defaultLang}`);
                const response = await fetch(`/translations/${this.defaultLang}.json`);
                this.translations = await response.json();
                this.currentLang = this.defaultLang;
            }
            return false;
        }
    },

    /**
     * Get translation for a key
     * @param {string} key - Translation key (e.g., 'about.title')
     * @param {object} params - Optional parameters for interpolation
     * @returns {string} Translated text
     */
    t(key, params = {}) {
        const keys = key.split('.');
        let value = this.translations;

        // Navigate through nested object
        for (const k of keys) {
            value = value?.[k];
            if (!value) {
                console.warn(`Translation key not found: ${key}`);
                return key;
            }
        }

        // Replace parameters if provided
        if (typeof value === 'string' && Object.keys(params).length > 0) {
            Object.keys(params).forEach(param => {
                value = value.replace(new RegExp(`{{${param}}}`, 'g'), params[param]);
            });
        }

        return value;
    },

    /**
     * Translate all elements with data-i18n attribute
     */
    translatePage() {
        // Translate elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.t(key);

            // Check if element should use innerHTML (for HTML content)
            if (el.hasAttribute('data-i18n-html')) {
                el.innerHTML = translation;
            } else {
                el.textContent = translation;
            }
        });

        // Translate elements with data-i18n-placeholder attribute
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            el.placeholder = this.t(key);
        });

        // Translate elements with data-i18n-title attribute
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            el.title = this.t(key);
        });

        // Update active language button
        this.updateLanguageButtons();
    },

    /**
     * Switch to a different language
     * @param {string} lang - Language code
     */
    async switchLanguage(lang) {
        if (!this.supportedLanguages.includes(lang)) {
            console.error(`Language ${lang} is not supported`);
            return;
        }

        if (lang === this.currentLang) {
            return;
        }

        this.currentLang = lang;
        localStorage.setItem('language', lang);

        await this.loadTranslations(lang);
        this.translatePage();

        // Update HTML lang attribute
        document.documentElement.setAttribute('lang', lang);

        // Trigger custom event for language change
        const event = new CustomEvent('languageChanged', { detail: { lang } });
        document.dispatchEvent(event);
    },

    /**
     * Attach click event listeners to language switcher buttons
     */
    attachLanguageSwitchers() {
        document.querySelectorAll('[data-lang]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = btn.getAttribute('data-lang');
                this.switchLanguage(lang);
            });
        });
    },

    /**
     * Update active state of language buttons
     */
    updateLanguageButtons() {
        document.querySelectorAll('[data-lang]').forEach(btn => {
            const lang = btn.getAttribute('data-lang');
            if (lang === this.currentLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    },

    /**
     * Get current language
     * @returns {string} Current language code
     */
    getCurrentLanguage() {
        return this.currentLang;
    },

    /**
     * Check if a language is supported
     * @param {string} lang - Language code
     * @returns {boolean}
     */
    isLanguageSupported(lang) {
        return this.supportedLanguages.includes(lang);
    }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        i18n.init();
    });
} else {
    // DOM is already ready
    i18n.init();
}

// Make i18n globally available
window.i18n = i18n;
