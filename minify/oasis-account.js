/**
 * Oasis Account System
 * User authentication, diagnostic tracking, and personal dashboard
 * Design: Doctor's note aesthetic - minimal, clean, professional
 */

var OasisAccount = (function() {
    'use strict';

    var STORAGE_KEY = 'oasis_user';
    var HISTORY_KEY = 'oasis_history';

    // Current user state
    var currentUser = null;
    var isLoggedIn = false;

    /**
     * Initialize account system
     */
    function init() {
        loadUser();
        injectStyles();
        createAccountUI();
        updateHeaderUI();
    }

    /**
     * Load user from localStorage
     */
    function loadUser() {
        try {
            var data = localStorage.getItem(STORAGE_KEY);
            if (data) {
                currentUser = JSON.parse(data);
                isLoggedIn = true;
            }
        } catch (e) {
            console.warn('Failed to load user data');
        }
    }

    /**
     * Save user to localStorage
     */
    function saveUser() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(currentUser));
        } catch (e) {
            console.warn('Failed to save user data');
        }
    }

    /**
     * Register new user
     */
    function register(name, email) {
        currentUser = {
            id: Date.now().toString(36),
            name: name || 'Patient',
            email: email || '',
            created: new Date().toISOString(),
            history: []
        };
        isLoggedIn = true;
        saveUser();
        updateHeaderUI();
        closePanels();
        return currentUser;
    }

    /**
     * Login (simple - just load existing or create)
     */
    function login(name) {
        if (currentUser) {
            isLoggedIn = true;
            updateHeaderUI();
            closePanels();
            return currentUser;
        }
        return register(name);
    }

    /**
     * Logout
     */
    function logout() {
        isLoggedIn = false;
        updateHeaderUI();
        closePanels();
    }

    /**
     * Record diagnostic result
     */
    function recordDiagnostic(type, answers, score) {
        if (!currentUser) {
            register();
        }

        var entry = {
            id: Date.now().toString(36),
            type: type,
            date: new Date().toISOString(),
            answers: answers || [],
            score: score || 0,
            severity: getSeverity(score)
        };

        if (!currentUser.history) {
            currentUser.history = [];
        }

        currentUser.history.push(entry);
        saveUser();

        return entry;
    }

    /**
     * Get severity level from score
     */
    function getSeverity(score) {
        if (score <= 25) return { level: 'minimal', label: 'Minimal', color: '#4CAF50' };
        if (score <= 50) return { level: 'mild', label: 'Mild', color: '#8BC34A' };
        if (score <= 75) return { level: 'moderate', label: 'Moderate', color: '#FF9800' };
        return { level: 'significant', label: 'Significant', color: '#f44336' };
    }

    /**
     * Get history for a specific phobia type
     */
    function getHistory(type) {
        if (!currentUser || !currentUser.history) return [];
        if (!type) return currentUser.history;
        return currentUser.history.filter(function(h) { return h.type === type; });
    }

    /**
     * Get analytics summary
     */
    function getAnalytics() {
        if (!currentUser || !currentUser.history || currentUser.history.length === 0) {
            return null;
        }

        var history = currentUser.history;
        var byType = {};

        history.forEach(function(h) {
            if (!byType[h.type]) {
                byType[h.type] = [];
            }
            byType[h.type].push(h);
        });

        var analytics = {
            totalSessions: history.length,
            byPhobia: {},
            recentActivity: history.slice(-5).reverse(),
            joinDate: currentUser.created
        };

        Object.keys(byType).forEach(function(type) {
            var entries = byType[type];
            var scores = entries.map(function(e) { return e.score; });
            var latest = entries[entries.length - 1];
            var first = entries[0];

            analytics.byPhobia[type] = {
                sessions: entries.length,
                latestScore: latest.score,
                firstScore: first.score,
                improvement: first.score - latest.score,
                trend: first.score > latest.score ? 'improving' : (first.score < latest.score ? 'increasing' : 'stable'),
                avgScore: Math.round(scores.reduce(function(a, b) { return a + b; }, 0) / scores.length)
            };
        });

        return analytics;
    }

    /**
     * Inject CSS styles
     */
    function injectStyles() {
        var style = document.createElement('style');
        style.id = 'oasis-account-styles';
        style.textContent = `
            /* Account Button in Header */
            .oasis-account-btn {
                position: fixed;
                top: 20px;
                right: 20px;
                width: 36px;
                height: 36px;
                border-radius: 50%;
                background: rgba(255,255,255,0.1);
                border: 1px solid rgba(255,255,255,0.2);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                z-index: 9999;
                backdrop-filter: blur(10px);
            }
            .oasis-account-btn:hover {
                background: rgba(255,255,255,0.2);
                transform: scale(1.05);
            }
            .oasis-account-btn svg {
                width: 18px;
                height: 18px;
                fill: #fff;
                opacity: 0.8;
            }
            .oasis-account-btn.logged-in {
                background: rgba(76, 175, 80, 0.3);
                border-color: rgba(76, 175, 80, 0.5);
            }

            /* Panel Overlay */
            .oasis-panel-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.6);
                backdrop-filter: blur(8px);
                z-index: 10000;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            .oasis-panel-overlay.active {
                opacity: 1;
                visibility: visible;
            }

            /* Login Panel - Doctor's Note Style */
            .oasis-login-panel {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0.95);
                background: #faf9f7;
                width: 340px;
                padding: 40px;
                border-radius: 2px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                z-index: 10001;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                font-family: 'Crimson Text', Georgia, serif;
            }
            .oasis-login-panel.active {
                opacity: 1;
                visibility: visible;
                transform: translate(-50%, -50%) scale(1);
            }
            .oasis-login-panel h2 {
                font-size: 24px;
                font-weight: 400;
                color: #2c2c2c;
                margin: 0 0 8px 0;
                letter-spacing: 1px;
            }
            .oasis-login-panel .subtitle {
                font-size: 12px;
                color: #888;
                margin-bottom: 30px;
                font-family: 'Roboto', sans-serif;
                text-transform: uppercase;
                letter-spacing: 2px;
            }
            .oasis-login-panel input {
                width: 100%;
                padding: 12px 0;
                border: none;
                border-bottom: 1px solid #ddd;
                background: transparent;
                font-size: 16px;
                font-family: 'Crimson Text', Georgia, serif;
                color: #333;
                margin-bottom: 20px;
                outline: none;
                transition: border-color 0.3s;
            }
            .oasis-login-panel input:focus {
                border-bottom-color: #333;
            }
            .oasis-login-panel input::placeholder {
                color: #aaa;
            }
            .oasis-login-panel button {
                width: 100%;
                padding: 14px;
                background: #2c2c2c;
                color: #fff;
                border: none;
                font-size: 13px;
                font-family: 'Roboto', sans-serif;
                text-transform: uppercase;
                letter-spacing: 2px;
                cursor: pointer;
                transition: background 0.3s;
                margin-top: 10px;
            }
            .oasis-login-panel button:hover {
                background: #444;
            }
            .oasis-login-panel .close-btn {
                position: absolute;
                top: 15px;
                right: 15px;
                width: 24px;
                height: 24px;
                background: none;
                border: none;
                cursor: pointer;
                padding: 0;
                opacity: 0.4;
                transition: opacity 0.3s;
            }
            .oasis-login-panel .close-btn:hover {
                opacity: 1;
            }

            /* Dashboard Panel - Doctor's Note Style */
            .oasis-dashboard {
                position: fixed;
                top: 0;
                right: -420px;
                width: 400px;
                height: 100%;
                background: #faf9f7;
                z-index: 10001;
                transition: right 0.4s ease;
                overflow-y: auto;
                font-family: 'Crimson Text', Georgia, serif;
            }
            .oasis-dashboard.active {
                right: 0;
            }
            .oasis-dashboard-header {
                padding: 40px 30px 20px;
                border-bottom: 1px solid #eee;
            }
            .oasis-dashboard-header h2 {
                font-size: 22px;
                font-weight: 400;
                color: #2c2c2c;
                margin: 0;
                letter-spacing: 1px;
            }
            .oasis-dashboard-header .patient-id {
                font-size: 11px;
                color: #888;
                font-family: 'Roboto', sans-serif;
                text-transform: uppercase;
                letter-spacing: 2px;
                margin-top: 5px;
            }
            .oasis-dashboard-close {
                position: absolute;
                top: 20px;
                right: 20px;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #999;
                padding: 5px;
            }
            .oasis-dashboard-close:hover {
                color: #333;
            }

            /* Dashboard Content */
            .oasis-dashboard-content {
                padding: 30px;
            }
            .oasis-stat-card {
                margin-bottom: 25px;
            }
            .oasis-stat-label {
                font-size: 10px;
                color: #888;
                font-family: 'Roboto', sans-serif;
                text-transform: uppercase;
                letter-spacing: 2px;
                margin-bottom: 5px;
            }
            .oasis-stat-value {
                font-size: 32px;
                color: #2c2c2c;
                font-weight: 300;
            }
            .oasis-stat-unit {
                font-size: 14px;
                color: #888;
                margin-left: 5px;
            }

            /* Phobia Progress Cards */
            .oasis-phobia-card {
                background: #fff;
                padding: 20px;
                margin-bottom: 15px;
                border-left: 3px solid #ddd;
            }
            .oasis-phobia-card.improving {
                border-left-color: #4CAF50;
            }
            .oasis-phobia-card.stable {
                border-left-color: #2196F3;
            }
            .oasis-phobia-card.increasing {
                border-left-color: #FF9800;
            }
            .oasis-phobia-name {
                font-size: 16px;
                color: #2c2c2c;
                margin-bottom: 10px;
                text-transform: capitalize;
            }
            .oasis-phobia-stats {
                display: flex;
                justify-content: space-between;
                font-size: 12px;
                color: #888;
                font-family: 'Roboto', sans-serif;
            }
            .oasis-phobia-trend {
                display: flex;
                align-items: center;
                gap: 5px;
            }
            .oasis-trend-arrow {
                font-size: 14px;
            }
            .oasis-trend-arrow.up { color: #f44336; }
            .oasis-trend-arrow.down { color: #4CAF50; }
            .oasis-trend-arrow.stable { color: #2196F3; }

            /* Progress Bar */
            .oasis-progress-bar {
                height: 4px;
                background: #eee;
                margin-top: 12px;
                position: relative;
                overflow: hidden;
            }
            .oasis-progress-fill {
                height: 100%;
                background: #2c2c2c;
                transition: width 0.5s ease;
            }

            /* Recent Activity */
            .oasis-activity-list {
                margin-top: 30px;
            }
            .oasis-activity-title {
                font-size: 10px;
                color: #888;
                font-family: 'Roboto', sans-serif;
                text-transform: uppercase;
                letter-spacing: 2px;
                margin-bottom: 15px;
            }
            .oasis-activity-item {
                display: flex;
                justify-content: space-between;
                padding: 12px 0;
                border-bottom: 1px solid #f0f0f0;
                font-size: 14px;
            }
            .oasis-activity-type {
                color: #2c2c2c;
                text-transform: capitalize;
            }
            .oasis-activity-date {
                color: #aaa;
                font-size: 12px;
                font-family: 'Roboto', sans-serif;
            }

            /* Empty State */
            .oasis-empty-state {
                text-align: center;
                padding: 40px 20px;
                color: #888;
            }
            .oasis-empty-state p {
                font-size: 14px;
                line-height: 1.6;
            }

            /* Logout Button */
            .oasis-logout-btn {
                width: 100%;
                padding: 14px;
                background: transparent;
                color: #888;
                border: 1px solid #ddd;
                font-size: 11px;
                font-family: 'Roboto', sans-serif;
                text-transform: uppercase;
                letter-spacing: 2px;
                cursor: pointer;
                margin-top: 30px;
                transition: all 0.3s;
            }
            .oasis-logout-btn:hover {
                background: #f5f5f5;
                color: #333;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Create account UI elements
     */
    function createAccountUI() {
        // Account button
        var btn = document.createElement('div');
        btn.className = 'oasis-account-btn';
        btn.id = 'oasis-account-btn';
        btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>';
        btn.onclick = togglePanel;
        document.body.appendChild(btn);

        // Overlay
        var overlay = document.createElement('div');
        overlay.className = 'oasis-panel-overlay';
        overlay.id = 'oasis-overlay';
        overlay.onclick = closePanels;
        document.body.appendChild(overlay);

        // Login panel
        var loginPanel = document.createElement('div');
        loginPanel.className = 'oasis-login-panel';
        loginPanel.id = 'oasis-login-panel';
        loginPanel.innerHTML = `
            <button class="close-btn" onclick="OasisAccount.closePanels()">
                <svg viewBox="0 0 24 24" width="24" height="24"><path fill="#333" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            </button>
            <h2>Patient Record</h2>
            <div class="subtitle">Oasis Therapy</div>
            <input type="text" id="oasis-name-input" placeholder="Your name">
            <button onclick="OasisAccount.submitLogin()">Begin Session</button>
        `;
        document.body.appendChild(loginPanel);

        // Dashboard panel
        var dashboard = document.createElement('div');
        dashboard.className = 'oasis-dashboard';
        dashboard.id = 'oasis-dashboard';
        document.body.appendChild(dashboard);
    }

    /**
     * Update header UI based on login state
     */
    function updateHeaderUI() {
        var btn = document.getElementById('oasis-account-btn');
        if (btn) {
            if (isLoggedIn) {
                btn.classList.add('logged-in');
                btn.title = currentUser.name;
            } else {
                btn.classList.remove('logged-in');
                btn.title = 'Sign in';
            }
        }
    }

    /**
     * Toggle panel (login or dashboard)
     */
    function togglePanel() {
        if (isLoggedIn) {
            openDashboard();
        } else {
            openLogin();
        }
    }

    /**
     * Open login panel
     */
    function openLogin() {
        document.getElementById('oasis-overlay').classList.add('active');
        document.getElementById('oasis-login-panel').classList.add('active');
    }

    /**
     * Open dashboard
     */
    function openDashboard() {
        renderDashboard();
        document.getElementById('oasis-overlay').classList.add('active');
        document.getElementById('oasis-dashboard').classList.add('active');
    }

    /**
     * Close all panels
     */
    function closePanels() {
        document.getElementById('oasis-overlay').classList.remove('active');
        document.getElementById('oasis-login-panel').classList.remove('active');
        document.getElementById('oasis-dashboard').classList.remove('active');
    }

    /**
     * Submit login form
     */
    function submitLogin() {
        var nameInput = document.getElementById('oasis-name-input');
        var name = nameInput ? nameInput.value.trim() : '';
        login(name || 'Patient');
    }

    /**
     * Render dashboard content
     */
    function renderDashboard() {
        var dashboard = document.getElementById('oasis-dashboard');
        var analytics = getAnalytics();

        var html = `
            <button class="oasis-dashboard-close" onclick="OasisAccount.closePanels()">&times;</button>
            <div class="oasis-dashboard-header">
                <h2>${currentUser.name}</h2>
                <div class="patient-id">ID: ${currentUser.id}</div>
            </div>
            <div class="oasis-dashboard-content">
        `;

        if (!analytics) {
            html += `
                <div class="oasis-empty-state">
                    <p>No sessions recorded yet.<br>Complete a diagnostic to begin tracking your progress.</p>
                </div>
            `;
        } else {
            // Total sessions stat
            html += `
                <div class="oasis-stat-card">
                    <div class="oasis-stat-label">Total Sessions</div>
                    <div class="oasis-stat-value">${analytics.totalSessions}</div>
                </div>
            `;

            // Phobia progress cards
            var phobiaNames = {
                airplane: 'Fear of Flying',
                injection: 'Fear of Needles',
                thunder: 'Fear of Thunder',
                darkness: 'Fear of Darkness',
                heights: 'Fear of Heights',
                ocean: 'Fear of Water'
            };

            Object.keys(analytics.byPhobia).forEach(function(type) {
                var data = analytics.byPhobia[type];
                var name = phobiaNames[type] || type;
                var trendIcon = data.trend === 'improving' ? '↓' : (data.trend === 'increasing' ? '↑' : '→');
                var trendClass = data.trend === 'improving' ? 'down' : (data.trend === 'increasing' ? 'up' : 'stable');

                html += `
                    <div class="oasis-phobia-card ${data.trend}">
                        <div class="oasis-phobia-name">${name}</div>
                        <div class="oasis-phobia-stats">
                            <span>${data.sessions} session${data.sessions !== 1 ? 's' : ''}</span>
                            <div class="oasis-phobia-trend">
                                <span class="oasis-trend-arrow ${trendClass}">${trendIcon}</span>
                                <span>${Math.abs(data.improvement)}% ${data.trend}</span>
                            </div>
                        </div>
                        <div class="oasis-progress-bar">
                            <div class="oasis-progress-fill" style="width: ${100 - data.latestScore}%"></div>
                        </div>
                    </div>
                `;
            });

            // Recent activity
            if (analytics.recentActivity.length > 0) {
                html += `<div class="oasis-activity-list">
                    <div class="oasis-activity-title">Recent Activity</div>`;

                analytics.recentActivity.forEach(function(item) {
                    var date = new Date(item.date);
                    var dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    var typeName = phobiaNames[item.type] || item.type;

                    html += `
                        <div class="oasis-activity-item">
                            <span class="oasis-activity-type">${typeName}</span>
                            <span class="oasis-activity-date">${dateStr}</span>
                        </div>
                    `;
                });

                html += '</div>';
            }
        }

        html += `
                <button class="oasis-logout-btn" onclick="OasisAccount.logout(); OasisAccount.closePanels();">End Session</button>
            </div>
        `;

        dashboard.innerHTML = html;
    }

    /**
     * Format date for display
     */
    function formatDate(isoString) {
        var date = new Date(isoString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    // Public API
    return {
        init: init,
        register: register,
        login: login,
        logout: logout,
        isLoggedIn: function() { return isLoggedIn; },
        getUser: function() { return currentUser; },
        recordDiagnostic: recordDiagnostic,
        getHistory: getHistory,
        getAnalytics: getAnalytics,
        openLogin: openLogin,
        openDashboard: openDashboard,
        closePanels: closePanels,
        submitLogin: submitLogin
    };
})();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', OasisAccount.init);
} else {
    OasisAccount.init();
}
