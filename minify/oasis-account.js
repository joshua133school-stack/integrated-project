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
     * Simple hash function for password (not cryptographically secure, but fine for local storage)
     */
    function hashPassword(password) {
        var hash = 0;
        for (var i = 0; i < password.length; i++) {
            var char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString(36);
    }

    /**
     * Register new user
     */
    function register(name, password) {
        currentUser = {
            id: Date.now().toString(36),
            name: name || 'Patient',
            passwordHash: password ? hashPassword(password) : '',
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
     * Validate password
     */
    function validatePassword(password) {
        if (!currentUser || !currentUser.passwordHash) return true;
        return hashPassword(password) === currentUser.passwordHash;
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
     * Check if user has completed diagnostic for a phobia type
     */
    function hasDiagnostic(type) {
        var history = getHistory(type);
        return history.length > 0;
    }

    /**
     * Record checkup result (end of experience)
     */
    function recordCheckup(type, answers, score) {
        if (!currentUser) {
            register();
        }

        var entry = {
            id: Date.now().toString(36),
            type: type,
            isCheckup: true,
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
            /* Note Icon Button - Compact */
            .oasis-account-btn {
                position: fixed;
                top: 18px;
                right: 18px;
                width: 20px;
                height: 24px;
                background: rgba(255,255,255,0.12);
                border: 1px solid rgba(255,255,255,0.2);
                border-radius: 1px;
                cursor: pointer;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 2px;
                padding: 3px 2px;
                transition: all 0.3s ease;
                z-index: 9999;
                backdrop-filter: blur(10px);
            }
            .oasis-account-btn:hover {
                background: rgba(255,255,255,0.2);
                transform: scale(1.08);
            }
            .oasis-account-btn .note-line {
                width: 10px;
                height: 1px;
                background: rgba(255,255,255,0.6);
            }
            .oasis-account-btn.checked-in {
                background: rgba(76, 175, 80, 0.2);
                border-color: rgba(76, 175, 80, 0.35);
            }
            .oasis-account-btn.checked-in .note-line {
                background: rgba(255,255,255,0.8);
            }

            /* Panel Overlay */
            .oasis-panel-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.4);
                z-index: 10000;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            .oasis-panel-overlay.active {
                opacity: 1;
                visibility: visible;
            }

            /* Note Panel - Slides from right to center, exits left */
            .oasis-note-panel {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(100vw, -50%);
                width: 90%;
                max-width: 480px;
                max-height: 85vh;
                background: rgba(255, 253, 240, 0.94);
                border-radius: 4px;
                box-shadow: 0 10px 60px rgba(0,0,0,0.25);
                z-index: 10001;
                transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                font-family: 'Crimson Text', Georgia, serif;
                overflow: hidden;
            }
            .oasis-note-panel.active {
                transform: translate(-50%, -50%);
            }
            .oasis-note-panel.closing {
                transform: translate(-150vw, -50%);
            }

            /* Lined paper effect */
            .oasis-note-paper {
                position: relative;
                padding: 30px 35px;
                background-image: repeating-linear-gradient(
                    transparent,
                    transparent 27px,
                    rgba(200, 180, 160, 0.3) 27px,
                    rgba(200, 180, 160, 0.3) 28px
                );
                background-position: 0 20px;
                min-height: 300px;
            }

            /* Red margin line */
            .oasis-note-paper::before {
                content: '';
                position: absolute;
                left: 28px;
                top: 0;
                bottom: 0;
                width: 1px;
                background: rgba(200, 100, 100, 0.3);
            }

            .oasis-note-panel h2 {
                font-size: 22px;
                font-weight: 400;
                color: #2c2c2c;
                margin: 0 0 5px 0;
                letter-spacing: 0.5px;
                line-height: 28px;
            }
            .oasis-note-panel .note-subtitle {
                font-size: 11px;
                color: #888;
                font-family: 'Roboto', sans-serif;
                text-transform: uppercase;
                letter-spacing: 2px;
                margin-bottom: 25px;
                line-height: 28px;
            }

            /* Note content styling */
            .oasis-note-field {
                margin-bottom: 20px;
                line-height: 28px;
            }
            .oasis-note-label {
                font-size: 11px;
                color: #999;
                text-transform: uppercase;
                letter-spacing: 1px;
                font-family: 'Roboto', sans-serif;
            }
            .oasis-note-value {
                font-size: 18px;
                color: #2c2c2c;
            }

            .oasis-note-input {
                width: 100%;
                padding: 8px 0;
                border: none;
                border-bottom: 1px dashed rgba(200, 180, 160, 0.5);
                background: transparent;
                font-size: 18px;
                font-family: 'Crimson Text', Georgia, serif;
                color: #2c2c2c;
                outline: none;
                line-height: 28px;
            }
            .oasis-note-input::placeholder {
                color: #bbb;
                font-style: italic;
            }

            .oasis-note-btn {
                display: block;
                width: 100%;
                padding: 12px;
                margin-top: 15px;
                background: #2c2c2c;
                color: #fff;
                border: none;
                font-size: 11px;
                font-family: 'Roboto', sans-serif;
                text-transform: uppercase;
                letter-spacing: 2px;
                cursor: pointer;
                transition: background 0.3s;
                line-height: 28px;
            }
            .oasis-note-btn:hover {
                background: #444;
            }
            .oasis-note-btn.secondary {
                background: transparent;
                color: #888;
                border: 1px solid #ddd;
            }
            .oasis-note-btn.secondary:hover {
                background: #f5f5f5;
                color: #333;
            }

            /* Session info */
            .oasis-session-info {
                border-top: 1px dashed rgba(200, 180, 160, 0.5);
                padding-top: 20px;
                margin-top: 20px;
            }
            .oasis-session-stat {
                display: flex;
                justify-content: space-between;
                line-height: 28px;
                font-size: 15px;
            }
            .oasis-session-stat span:first-child {
                color: #888;
            }
            .oasis-session-stat span:last-child {
                color: #2c2c2c;
            }

            /* Close X */
            .oasis-note-close {
                position: absolute;
                top: 12px;
                right: 15px;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #999;
                padding: 10px;
                line-height: 1;
                z-index: 10;
                transition: color 0.2s;
            }
            .oasis-note-close:hover {
                color: #333;
            }

            /* Password input */
            .oasis-note-input[type="password"] {
                letter-spacing: 2px;
            }
            .oasis-note-error {
                color: #c44;
                font-size: 12px;
                margin-top: 5px;
                font-family: 'Roboto', sans-serif;
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

            /* Checkup Panel */
            .oasis-checkup {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(250, 249, 247, 0.98);
                z-index: 10002;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: all 0.4s ease;
                font-family: 'Crimson Text', Georgia, serif;
            }
            .oasis-checkup.active {
                opacity: 1;
                visibility: visible;
            }
            .oasis-checkup-content {
                width: 100%;
                max-width: 500px;
                padding: 40px;
            }
            .oasis-checkup h2 {
                font-size: 24px;
                font-weight: 400;
                color: #2c2c2c;
                margin: 0 0 8px 0;
                letter-spacing: 1px;
            }
            .oasis-checkup .subtitle {
                font-size: 11px;
                color: #888;
                font-family: 'Roboto', sans-serif;
                text-transform: uppercase;
                letter-spacing: 2px;
                margin-bottom: 40px;
            }
            .oasis-checkup-question {
                margin-bottom: 35px;
            }
            .oasis-checkup-label {
                font-size: 16px;
                color: #2c2c2c;
                margin-bottom: 15px;
                display: block;
            }
            .oasis-checkup-slider-wrap {
                position: relative;
            }
            .oasis-checkup-slider {
                width: 100%;
                height: 4px;
                -webkit-appearance: none;
                appearance: none;
                background: #e0e0e0;
                outline: none;
                border-radius: 2px;
                cursor: pointer;
            }
            .oasis-checkup-slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 20px;
                height: 20px;
                background: #2c2c2c;
                border-radius: 50%;
                cursor: pointer;
                transition: transform 0.2s;
            }
            .oasis-checkup-slider::-webkit-slider-thumb:hover {
                transform: scale(1.1);
            }
            .oasis-checkup-slider::-moz-range-thumb {
                width: 20px;
                height: 20px;
                background: #2c2c2c;
                border-radius: 50%;
                cursor: pointer;
                border: none;
            }
            .oasis-checkup-range {
                display: flex;
                justify-content: space-between;
                margin-top: 8px;
                font-size: 11px;
                color: #999;
                font-family: 'Roboto', sans-serif;
            }
            .oasis-checkup-btn {
                width: 100%;
                padding: 16px;
                background: #2c2c2c;
                color: #fff;
                border: none;
                font-size: 13px;
                font-family: 'Roboto', sans-serif;
                text-transform: uppercase;
                letter-spacing: 2px;
                cursor: pointer;
                margin-top: 20px;
                transition: background 0.3s;
            }
            .oasis-checkup-btn:hover {
                background: #444;
            }
            .oasis-checkup-skip {
                display: block;
                text-align: center;
                margin-top: 20px;
                color: #999;
                font-size: 12px;
                cursor: pointer;
                font-family: 'Roboto', sans-serif;
                text-decoration: none;
            }
            .oasis-checkup-skip:hover {
                color: #666;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Create account UI elements
     */
    function createAccountUI() {
        // Note icon button (scroll with lines)
        var btn = document.createElement('div');
        btn.className = 'oasis-account-btn';
        btn.id = 'oasis-account-btn';
        btn.innerHTML = '<div class="note-line"></div><div class="note-line"></div><div class="note-line"></div><div class="note-line"></div><div class="note-line"></div>';
        btn.onclick = togglePanel;
        document.body.appendChild(btn);

        // Overlay
        var overlay = document.createElement('div');
        overlay.className = 'oasis-panel-overlay';
        overlay.id = 'oasis-overlay';
        overlay.onclick = closePanels;
        document.body.appendChild(overlay);

        // Note panel (unified for register/check-in/dashboard)
        var notePanel = document.createElement('div');
        notePanel.className = 'oasis-note-panel';
        notePanel.id = 'oasis-note-panel';
        document.body.appendChild(notePanel);

        // Checkup panel
        var checkup = document.createElement('div');
        checkup.className = 'oasis-checkup';
        checkup.id = 'oasis-checkup';
        document.body.appendChild(checkup);
    }

    // Checkup questions for each phobia type
    var checkupQuestions = {
        airplane: [
            'How anxious do you feel about flying right now?',
            'How confident are you about taking a flight soon?',
            'How relaxed did this experience make you feel?'
        ],
        injection: [
            'How anxious do you feel about needles right now?',
            'How confident are you about receiving an injection?',
            'How helpful was this experience?'
        ],
        thunder: [
            'How anxious do you feel about thunderstorms?',
            'How calm would you feel during a storm now?',
            'How much did this experience help you?'
        ],
        darkness: [
            'How comfortable do you feel in darkness now?',
            'How confident are you being alone in the dark?',
            'How relaxing was this experience?'
        ],
        heights: [
            'How anxious do you feel about heights right now?',
            'How confident are you at elevated places?',
            'How calming was this experience?'
        ]
    };

    var currentCheckupType = null;

    /**
     * Show checkup test at end of experience
     */
    function showCheckup(type, onComplete) {
        currentCheckupType = type;
        var questions = checkupQuestions[type] || checkupQuestions.airplane;
        var checkupEl = document.getElementById('oasis-checkup');

        var html = '<div class="oasis-checkup-content">';
        html += '<h2>Session Complete</h2>';
        html += '<div class="subtitle">Quick Check-in</div>';

        questions.forEach(function(q, i) {
            html += '<div class="oasis-checkup-question">';
            html += '<label class="oasis-checkup-label">' + q + '</label>';
            html += '<div class="oasis-checkup-slider-wrap">';
            html += '<input type="range" class="oasis-checkup-slider" id="checkup-q' + i + '" min="0" max="100" value="50">';
            html += '<div class="oasis-checkup-range"><span>Not at all</span><span>Very much</span></div>';
            html += '</div></div>';
        });

        html += '<button class="oasis-checkup-btn" onclick="OasisAccount.submitCheckup()">Submit</button>';
        html += '<a class="oasis-checkup-skip" onclick="OasisAccount.closeCheckup()">Skip</a>';
        html += '</div>';

        checkupEl.innerHTML = html;
        checkupEl.classList.add('active');

        // Store callback
        checkupEl._onComplete = onComplete;
    }

    /**
     * Submit checkup results
     */
    function submitCheckup() {
        var checkupEl = document.getElementById('oasis-checkup');
        var sliders = checkupEl.querySelectorAll('.oasis-checkup-slider');
        var answers = [];
        var total = 0;

        sliders.forEach(function(slider) {
            var val = parseInt(slider.value);
            answers.push(val);
            total += val;
        });

        var avgScore = Math.round(total / answers.length);
        recordCheckup(currentCheckupType, answers, avgScore);

        closeCheckup();
    }

    /**
     * Close checkup panel
     */
    function closeCheckup() {
        var checkupEl = document.getElementById('oasis-checkup');
        checkupEl.classList.remove('active');
        if (checkupEl._onComplete) {
            checkupEl._onComplete();
            checkupEl._onComplete = null;
        }
        currentCheckupType = null;
    }

    /**
     * Update header UI based on login state
     */
    function updateHeaderUI() {
        var btn = document.getElementById('oasis-account-btn');
        if (btn) {
            if (isLoggedIn) {
                btn.classList.add('checked-in');
                btn.title = currentUser.name + ' (Checked In)';
            } else {
                btn.classList.remove('checked-in');
                btn.title = 'Register / Check-in';
            }
        }
    }

    /**
     * Toggle panel - shows register, check-in, or session view
     */
    function togglePanel() {
        var panel = document.getElementById('oasis-note-panel');
        var overlay = document.getElementById('oasis-overlay');

        if (panel.classList.contains('active')) {
            closePanels();
            return;
        }

        // Render appropriate content
        if (isLoggedIn) {
            renderSessionView();
        } else if (currentUser) {
            // User exists but not checked in
            renderCheckInView();
        } else {
            // New user
            renderRegisterView();
        }

        overlay.classList.add('active');
        panel.classList.add('active');
    }

    /**
     * Render register view (new user)
     */
    function renderRegisterView() {
        var panel = document.getElementById('oasis-note-panel');
        panel.innerHTML = `
            <button class="oasis-note-close" onclick="OasisAccount.closePanels()">&times;</button>
            <div class="oasis-note-paper">
                <h2>Register</h2>
                <div class="note-subtitle">New Patient File</div>

                <div class="oasis-note-field">
                    <div class="oasis-note-label">Name</div>
                    <input type="text" class="oasis-note-input" id="oasis-name-input" placeholder="Enter your name...">
                </div>

                <div class="oasis-note-field">
                    <div class="oasis-note-label">Password</div>
                    <input type="password" class="oasis-note-input" id="oasis-password-input" placeholder="Create a password...">
                </div>

                <div id="oasis-register-error" class="oasis-note-error" style="display:none;"></div>

                <button class="oasis-note-btn" onclick="OasisAccount.submitRegister()">Create File</button>
                <button class="oasis-note-btn secondary" onclick="OasisAccount.switchToCheckIn()">Already Registered</button>
            </div>
        `;
    }

    /**
     * Render check-in view (returning user not logged in)
     */
    function renderCheckInView() {
        var panel = document.getElementById('oasis-note-panel');
        var hasPassword = currentUser && currentUser.passwordHash;

        panel.innerHTML = `
            <button class="oasis-note-close" onclick="OasisAccount.closePanels()">&times;</button>
            <div class="oasis-note-paper">
                <h2>Check-in</h2>
                <div class="note-subtitle">Welcome Back</div>

                <div class="oasis-note-field">
                    <div class="oasis-note-label">Patient</div>
                    <div class="oasis-note-value">${currentUser.name}</div>
                </div>

                ${hasPassword ? `
                <div class="oasis-note-field">
                    <div class="oasis-note-label">Password</div>
                    <input type="password" class="oasis-note-input" id="oasis-checkin-password" placeholder="Enter password...">
                </div>
                <div id="oasis-checkin-error" class="oasis-note-error" style="display:none;"></div>
                ` : ''}

                <div class="oasis-session-info">
                    <div class="oasis-session-stat">
                        <span>Sessions</span>
                        <span>${currentUser.history ? currentUser.history.length : 0}</span>
                    </div>
                </div>

                <button class="oasis-note-btn" onclick="OasisAccount.checkIn()">Check In</button>
                <button class="oasis-note-btn secondary" onclick="OasisAccount.switchToRegister()">New Patient</button>
            </div>
        `;
    }

    /**
     * Render session view (logged in user)
     */
    function renderSessionView() {
        var panel = document.getElementById('oasis-note-panel');
        var analytics = getAnalytics();

        var html = `
            <button class="oasis-note-close" onclick="OasisAccount.closePanels()">&times;</button>
            <div class="oasis-note-paper">
                <h2>${currentUser.name}</h2>
                <div class="note-subtitle">Patient ID: ${currentUser.id}</div>
        `;

        if (!analytics) {
            html += `
                <div class="oasis-note-field" style="margin-top: 30px;">
                    <div class="oasis-note-value" style="font-size: 15px; color: #888; font-style: italic;">
                        No sessions recorded yet.<br>
                        Complete an experience to begin.
                    </div>
                </div>
            `;
        } else {
            // Session stats
            html += `
                <div class="oasis-session-info">
                    <div class="oasis-session-stat">
                        <span>Total Sessions</span>
                        <span>${analytics.totalSessions}</span>
                    </div>
            `;

            // Phobia names
            var phobiaNames = {
                airplane: 'Flying',
                injection: 'Needles',
                thunder: 'Thunder',
                darkness: 'Darkness',
                heights: 'Heights'
            };

            // Show each tracked phobia
            Object.keys(analytics.byPhobia).forEach(function(type) {
                var data = analytics.byPhobia[type];
                var name = phobiaNames[type] || type;
                var trendIcon = data.trend === 'improving' ? '↓' : (data.trend === 'increasing' ? '↑' : '→');

                html += `
                    <div class="oasis-session-stat">
                        <span>${name}</span>
                        <span>${data.sessions}x ${trendIcon}</span>
                    </div>
                `;
            });

            html += '</div>';
        }

        html += `
                <button class="oasis-note-btn secondary" onclick="OasisAccount.checkOut()" style="margin-top: 30px;">Check Out</button>
            </div>
        `;

        panel.innerHTML = html;
    }

    /**
     * Open login panel (legacy support)
     */
    function openLogin() {
        togglePanel();
    }

    /**
     * Open dashboard (legacy support)
     */
    function openDashboard() {
        togglePanel();
    }

    /**
     * Close all panels (exits to left)
     */
    function closePanels() {
        var panel = document.getElementById('oasis-note-panel');
        var overlay = document.getElementById('oasis-overlay');

        // Add closing class for left exit animation
        panel.classList.add('closing');
        panel.classList.remove('active');
        overlay.classList.remove('active');

        // Remove closing class after animation
        setTimeout(function() {
            panel.classList.remove('closing');
        }, 400);
    }

    /**
     * Switch to register view
     */
    function switchToRegister() {
        currentUser = null;
        isLoggedIn = false;
        try { localStorage.removeItem(STORAGE_KEY); } catch(e) {}
        renderRegisterView();
    }

    /**
     * Switch to check-in view
     */
    function switchToCheckIn() {
        // If they say "already registered" but no user, just show register
        if (!currentUser) {
            renderRegisterView();
            return;
        }
        renderCheckInView();
    }

    /**
     * Submit registration
     */
    function submitRegister() {
        var nameInput = document.getElementById('oasis-name-input');
        var passwordInput = document.getElementById('oasis-password-input');
        var errorEl = document.getElementById('oasis-register-error');

        var name = nameInput ? nameInput.value.trim() : '';
        var password = passwordInput ? passwordInput.value : '';

        if (!name) {
            if (errorEl) {
                errorEl.textContent = 'Please enter your name';
                errorEl.style.display = 'block';
            }
            return;
        }

        if (!password) {
            if (errorEl) {
                errorEl.textContent = 'Please create a password';
                errorEl.style.display = 'block';
            }
            return;
        }

        register(name, password);
    }

    /**
     * Check in (login)
     */
    function checkIn() {
        var passwordInput = document.getElementById('oasis-checkin-password');
        var errorEl = document.getElementById('oasis-checkin-error');

        // If user has a password, validate it
        if (currentUser && currentUser.passwordHash) {
            var password = passwordInput ? passwordInput.value : '';

            if (!validatePassword(password)) {
                if (errorEl) {
                    errorEl.textContent = 'Incorrect password';
                    errorEl.style.display = 'block';
                }
                return;
            }
        }

        isLoggedIn = true;
        updateHeaderUI();
        closePanels();
    }

    /**
     * Check out (logout)
     */
    function checkOut() {
        isLoggedIn = false;
        updateHeaderUI();
        closePanels();
    }

    /**
     * Submit login form (legacy)
     */
    function submitLogin() {
        submitRegister();
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
        recordCheckup: recordCheckup,
        hasDiagnostic: hasDiagnostic,
        getHistory: getHistory,
        getAnalytics: getAnalytics,
        openLogin: openLogin,
        openDashboard: openDashboard,
        closePanels: closePanels,
        submitLogin: submitLogin,
        submitRegister: submitRegister,
        checkIn: checkIn,
        checkOut: checkOut,
        switchToRegister: switchToRegister,
        switchToCheckIn: switchToCheckIn,
        showCheckup: showCheckup,
        submitCheckup: submitCheckup,
        closeCheckup: closeCheckup
    };
})();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', OasisAccount.init);
} else {
    OasisAccount.init();
}

// Setup checkup trigger on close button
(function() {
    var checkupShown = false;
    var experienceTypes = {
        'airplane': 'airplane',
        'injection': 'injection',
        'thunder': 'thunder',
        'darkness': 'darkness',
        'heights': 'heights',
        'ocean': 'heights'
    };

    function getExperienceFromHash() {
        var hash = window.location.hash.replace('#!/', '').replace('#!/', '').toLowerCase();
        for (var key in experienceTypes) {
            if (hash.indexOf(key) !== -1) {
                return experienceTypes[key];
            }
        }
        return null;
    }

    function setupCloseButtonIntercept() {
        // Wait for close button to exist
        var checkInterval = setInterval(function() {
            var closeBtn = document.querySelector('#about-close-bt, .close-pos');
            if (closeBtn && !closeBtn._checkupSetup) {
                closeBtn._checkupSetup = true;

                closeBtn.addEventListener('click', function(e) {
                    var experience = getExperienceFromHash();

                    // Show checkup if we're in an experience and haven't shown it yet
                    if (experience && !checkupShown && typeof OasisAccount !== 'undefined') {
                        e.stopPropagation();
                        e.preventDefault();
                        checkupShown = true;

                        OasisAccount.showCheckup(experience, function() {
                            // After checkup, allow normal close behavior
                            checkupShown = false;
                            // Trigger the original close action
                            if (typeof Address !== 'undefined' && Address.goHome) {
                                Address.goHome();
                            }
                        });
                        return false;
                    }
                }, true);

                clearInterval(checkInterval);
            }
        }, 500);
    }

    // Reset checkup flag when navigating to home
    window.addEventListener('hashchange', function() {
        var hash = window.location.hash;
        if (!hash || hash === '#!' || hash === '#!/') {
            checkupShown = false;
        }
    });

    // Setup after a short delay to ensure DOM is ready
    setTimeout(setupCloseButtonIntercept, 1000);
})();
