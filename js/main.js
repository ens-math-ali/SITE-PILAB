// --- Disable Browser Zoom (mouse wheel + keyboard) ---
window.addEventListener('wheel', (e) => {
    if (e.ctrlKey) {
        e.preventDefault();
    }
}, { passive: false });

window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '0')) {
        e.preventDefault();
    }
});

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

        // Update Logo (Skipped since we use a static PNG)
        const logoImgs = document.querySelectorAll('.logo-img');
        logoImgs.forEach(img => {
            // CSS handles dark mode visibility
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

    // --- Search Logic ---
    const searchDB = [
        // S1
        { name: "Analyse 1", id: "s1-analyse1", sem: "S1" },
        { name: "Statistiques descriptives", id: "s1-statistiques", sem: "S1" },
        { name: "Algèbre 1", id: "s1-algebre1", sem: "S1" },
        { name: "Algèbre 2", id: "s1-algebre2", sem: "S1" },
        { name: "Thermodynamique", id: "s1-thermo", sem: "S1" },
        { name: "Informatique 1", id: "s1-info1", sem: "S1" },
        // S2
        { name: "Analyse 2", id: "s2-analyse2", sem: "S2" },
        { name: "Analyse 3", id: "s2-analyse3", sem: "S2" },
        { name: "Algèbre 3", id: "s2-algebre3", sem: "S2" },
        { name: "Optique", id: "s2-optique", sem: "S2" },
        { name: "Electrostatique", id: "s2-electro", sem: "S2" },
        { name: "Informatique 2", id: "s2-info2", sem: "S2" },
        // S3
        { name: "Analyse 4", id: "s3-analyse4", sem: "S3" },
        { name: "Analyse 5", id: "s3-analyse5", sem: "S3" },
        { name: "Algèbre 4", id: "s3-algebre4", sem: "S3" },
        { name: "Science éducation", id: "s3-sc", sem: "S3" },
        { name: "Mécanique", id: "s3-mecanique", sem: "S3" },
        { name: "Informatique 3 (C)", id: "s3-info3", sem: "S3" },
        // S4
        { name: "Analyse 6", id: "s4-analyse6", sem: "S4" },
        { name: "Analyse numérique", id: "s4-numerique", sem: "S4" },
        { name: "Probabilités", id: "s4-proba", sem: "S4" },
        { name: "Algèbre 5", id: "s4-algebre5", sem: "S4" },
        { name: "Didactique", id: "s4-dida", sem: "S4" },
        { name: "Informatique 4 (C)", id: "s4-info4", sem: "S4" },
        // S5
        { name: "Topologie", id: "s5-topologie", sem: "S5" },
        { name: "Structures algébriques", id: "s5-algebrique", sem: "S5" },
        { name: "Mesure et intégration", id: "s5-mesure", sem: "S5" },
        { name: "Déontologie", id: "s5-diontologie", sem: "S5" },
        { name: "Didactique", id: "s5-didactique", sem: "S5" },
        // S6
        { name: "Calcul différentiel", id: "s6-diff", sem: "S6" },
        { name: "Analyse complexe", id: "s6-complexe", sem: "S6" },
        { name: "Algèbre et géométrie", id: "s6-geo", sem: "S6" },
        { name: "Approches et méthodes", id: "s6-methodes", sem: "S6" },
        { name: "Épistémologie", id: "s6-epi", sem: "S6" },
        // Examens
        { name: "Examens S1", id: "e1", sem: "Examens" },
        { name: "Examens S2", id: "e2", sem: "Examens" },
        { name: "Examens S3", id: "e3", sem: "Examens" },
        { name: "Examens S4", id: "e4", sem: "Examens" },
        { name: "Examens S5", id: "e5", sem: "Examens" },
        { name: "Examens S6", id: "e6", sem: "Examens" },
        // Concours
        { name: "Concours 2024", id: "24", sem: "Concours" },
        { name: "Concours 2023", id: "23", sem: "Concours" },
        { name: "Concours 2022", id: "22", sem: "Concours" },
        { name: "Concours 2021", id: "21", sem: "Concours" },
        { name: "Concours 2020", id: "20", sem: "Concours" },
        { name: "Concours 2019", id: "19", sem: "Concours" },
        { name: "Concours 2018", id: "18", sem: "Concours" },
        { name: "Concours 2017", id: "17", sem: "Concours" },
        { name: "Concours 2016", id: "16", sem: "Concours" }
    ];

    const searchInput = document.getElementById('global-search');
    const searchResults = document.getElementById('search-results');

    if (searchInput && searchResults) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            searchResults.innerHTML = '';

            if (query.length < 2) {
                searchResults.classList.remove('active');
                return;
            }

            const results = searchDB.filter(item =>
                item.name.toLowerCase().includes(query) ||
                item.sem.toLowerCase().includes(query) ||
                (item.sem.toLowerCase() + " " + item.name.toLowerCase()).includes(query)
            ).slice(0, 5);

            if (results.length > 0) {
                results.forEach(item => {
                    const li = document.createElement('li');
                    li.className = 'search-result-item';
                    li.innerHTML = `<a href="pdf.html?u=${item.id}"><strong>${item.name}</strong> <small style="float:right; opacity:0.6">${item.sem}</small></a>`;
                    searchResults.appendChild(li);
                });
                searchResults.classList.add('active');
            } else {
                searchResults.innerHTML = '<li class="search-result-item"><a href="#" style="pointer-events: none;">Aucun résultat</a></li>';
                searchResults.classList.add('active');
            }
        });

        // Close search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.remove('active');
            }
        });
    }

    // --- Page Transitions ---
    // Using native CSS View Transitions API (@view-transition { navigation: auto; })
    // No JS interception required for modern browsers.

    // --- Service Worker Registration ---
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(reg => console.log('Service Worker registered', reg))
                .catch(err => console.log('Service Worker registration failed', err));
        });
    }

    console.log('πLab Main JS Loaded');
});
