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
    // Normaliser pour enlever les accents et mettre en minuscules
    const normalizeStr = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    // Calculer la distance de Levenshtein (fuzzy search)
    const levenshtein = (s, t) => {
        if (!s.length) return t.length;
        if (!t.length) return s.length;
        const arr = [];
        for (let i = 0; i <= t.length; i++) {
            arr[i] = [i];
            for (let j = 1; j <= s.length; j++) {
                arr[i][j] = i === 0 ? j : Math.min(
                    arr[i - 1][j] + 1,
                    arr[i][j - 1] + 1,
                    arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
                );
            }
        }
        return arr[t.length][s.length];
    };

    const searchDB = [
        // S1
        { name: "Analyse 1", id: "s1-analyse1", sem: "S1", k: "tahlil analysis" },
        { name: "Statistiques descriptives", id: "s1-statistiques", sem: "S1", k: "ihsae stat" },
        { name: "Algèbre 1", id: "s1-algebre1", sem: "S1", k: "jabr algebra algebre" },
        { name: "Algèbre 2", id: "s1-algebre2", sem: "S1", k: "jabr algebra algebre" },
        { name: "Thermodynamique", id: "s1-thermo", sem: "S1", k: "thermo physique 7arara" },
        { name: "Informatique 1", id: "s1-info1", sem: "S1", k: "info pc dev programmation" },
        // S2
        { name: "Analyse 2", id: "s2-analyse2", sem: "S2", k: "tahlil analysis" },
        { name: "Analyse 3", id: "s2-analyse3", sem: "S2", k: "tahlil analysis" },
        { name: "Algèbre 3", id: "s2-algebre3", sem: "S2", k: "jabr algebra algebre" },
        { name: "Optique", id: "s2-optique", sem: "S2", k: "optics dao2 optique physique" },
        { name: "Electrostatique", id: "s2-electro", sem: "S2", k: "electro kahraba physique" },
        { name: "Informatique 2", id: "s2-info2", sem: "S2", k: "info pc" },
        // S3
        { name: "Analyse 4", id: "s3-analyse4", sem: "S3", k: "tahlil analysis" },
        { name: "Analyse 5", id: "s3-analyse5", sem: "S3", k: "tahlil analysis" },
        { name: "Algèbre 4", id: "s3-algebre4", sem: "S3", k: "jabr algebra algebre" },
        { name: "Science éducation", id: "s3-sc", sem: "S3", k: "tarbiya sc" },
        { name: "Mécanique", id: "s3-mecanique", sem: "S3", k: "meca mechanic physique" },
        { name: "Informatique 3 (C)", id: "s3-info3", sem: "S3", k: "info c" },
        // S4
        { name: "Analyse 6", id: "s4-analyse6", sem: "S4", k: "tahlil analysis" },
        { name: "Analyse numérique", id: "s4-numerique", sem: "S4", k: "num numerique" },
        { name: "Probabilités", id: "s4-proba", sem: "S4", k: "proba ihtimal" },
        { name: "Algèbre 5", id: "s4-algebre5", sem: "S4", k: "jabr algebra algebre" },
        { name: "Didactique", id: "s4-dida", sem: "S4", k: "dida" },
        { name: "Informatique 4 (C)", id: "s4-info4", sem: "S4", k: "info c" },
        // S5
        { name: "Topologie", id: "s5-topologie", sem: "S5", k: "topo topologia" },
        { name: "Structures algébriques", id: "s5-algebrique", sem: "S5", k: "algebrique structure jabr" },
        { name: "Mesure et intégration", id: "s5-mesure", sem: "S5", k: "mesure integration takamol" },
        { name: "Déontologie", id: "s5-diontologie", sem: "S5", k: "deonto" },
        { name: "Didactique", id: "s5-didactique", sem: "S5", k: "dida" },
        // S6
        { name: "Calcul différentiel", id: "s6-diff", sem: "S6", k: "diff hisab" },
        { name: "Analyse complexe", id: "s6-complexe", sem: "S6", k: "complexe 3o9adi" },
        { name: "Algèbre et géométrie", id: "s6-geo", sem: "S6", k: "jabr handasa algebra geometry geo algebre geometrie" },
        { name: "Approches et méthodes", id: "s6-methodes", sem: "S6", k: "methodes approches manhajiyat" },
        { name: "Épistémologie", id: "s6-epi", sem: "S6", k: "epistemo faq" },
        // Examens
        { name: "Examens S1", id: "e1", sem: "Examens", k: "mti7an examen ds" },
        { name: "Examens S2", id: "e2", sem: "Examens", k: "mti7an examen ds" },
        { name: "Examens S3", id: "e3", sem: "Examens", k: "mti7an examen ds" },
        { name: "Examens S4", id: "e4", sem: "Examens", k: "mti7an examen ds" },
        { name: "Examens S5", id: "e5", sem: "Examens", k: "mti7an examen ds" },
        { name: "Examens S6", id: "e6", sem: "Examens", k: "mti7an examen ds" },
        // Concours
        { name: "Concours 2024", id: "24", sem: "Concours", k: "match master" },
        { name: "Concours 2023", id: "23", sem: "Concours", k: "match master" },
        { name: "Concours 2022", id: "22", sem: "Concours", k: "match master" },
        { name: "Concours 2021", id: "21", sem: "Concours", k: "match master" },
        { name: "Concours 2020", id: "20", sem: "Concours", k: "match master" },
        { name: "Concours 2019", id: "19", sem: "Concours", k: "match master" },
        { name: "Concours 2018", id: "18", sem: "Concours", k: "match master" },
        { name: "Concours 2017", id: "17", sem: "Concours", k: "match master" },
        { name: "Concours 2016", id: "16", sem: "Concours", k: "match master" }
    ];

    const searchInput = document.getElementById('global-search');
    const searchResults = document.getElementById('search-results');

    if (searchInput && searchResults) {
        searchInput.addEventListener('input', (e) => {
            const rawQuery = e.target.value.trim();
            const queryWords = normalizeStr(rawQuery).split(/\s+/).filter(w => w.length > 0);
            searchResults.innerHTML = '';

            if (queryWords.length === 0 || rawQuery.length < 2) {
                searchResults.classList.remove('active');
                return;
            }

            const scoredEntries = searchDB.map(item => {
                const targetStr = normalizeStr(`${item.name} ${item.sem} ${item.k}`);
                const targetWords = targetStr.split(/\s+/).filter(w => w.length > 0);
                
                let score = 0;
                
                queryWords.forEach(qWord => {
                    // Exact inclusions (e.g., matching a full word or a prefix)
                    if (targetStr.includes(qWord)) {
                        score += 5;
                    } else {
                        // Fuzzy check (typos, similar words)
                        let bestDist = Infinity;
                        targetWords.forEach(tWord => {
                            if (Math.abs(tWord.length - qWord.length) <= 2) {
                                bestDist = Math.min(bestDist, levenshtein(qWord, tWord));
                            }
                        });
                        
                        // Allow 1 typo for medium words, 2 typos for long words
                        if (bestDist === 1 && qWord.length > 3) {
                            score += 3;
                        } else if (bestDist === 2 && qWord.length > 5) {
                            score += 1;
                        }
                    }
                });

                return { item, score };
            });

            // Filter out items with 0 score, then sort
            const results = scoredEntries
                .filter(entry => entry.score > 0)
                .sort((a, b) => b.score - a.score)
                .map(entry => entry.item)
                .slice(0, 5);

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
