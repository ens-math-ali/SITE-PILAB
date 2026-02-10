document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const themeIcon = document.getElementById('theme-icon');

    // Constants
    const THEME_KEY = 'pilab-theme';

    // Helper Functions
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);

        // Update Icon
        if (themeIcon) {
            themeIcon.src = theme === 'dark' ? 'images/sun.svg' : 'images/moon.svg';
        }

        // Update Logo
        const logoImgs = document.querySelectorAll('.logo-img');
        logoImgs.forEach(img => {
            img.src = theme === 'dark' ? 'images/logo-dark.svg' : 'images/logo.svg';
        });
    };

    // Initialization
    const savedTheme = localStorage.getItem(THEME_KEY) || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);

    // Event Listeners
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem(THEME_KEY)) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // --- Page Transitions ---
    // Using native CSS View Transitions API (@view-transition { navigation: auto; })
    // No JS interception required for modern browsers.

    console.log('πLab Main JS Loaded');
});
