/**
 *  Light Switch @version v0.1.4
 */

(function () {
    let lightSwitch = document.getElementById('lightSwitch');
    if (!lightSwitch) {
        return;
    }

    /**
     * @function darkmode
     * @summary: changes the theme to 'dark mode' and save settings to local stroage.
     * Basically, replaces/toggles every CSS class that has '-light' class with '-dark'
     */
    function darkMode() {
        // text-bg-light: Para las entradas
        document.querySelectorAll('.bg-light, .text-bg-light').forEach((element) => {
            element.className = element.className.replace(/-light/g, '-dark');
        });

        // Paginacion
        document.querySelectorAll('[data-bs-theme]').forEach((element) => {
            element.setAttribute('data-bs-theme', 'dark');
        });

        // Links de las migas de pan y redes sociales
        document.querySelectorAll('.breadcrumb a, .col-lg-4 a').forEach((element) => {
            element.style.color = 'white';
        });

        document.body.classList.add('bg-dark');

        if (document.body.classList.contains('text-dark')) {
            document.body.classList.replace('text-dark', 'text-light');
        } else {
            document.body.classList.add('text-light');
        }

        // Tables
        var tables = document.querySelectorAll('table');
        for (var i = 0; i < tables.length; i++) {
            // add table-dark class to each table
            tables[i].classList.add('table-dark');
        }

        // set light switch input to true
        if (!lightSwitch.checked) {
            lightSwitch.checked = true;
        }
        localStorage.setItem('lightSwitch', 'dark');
    }

    /**
     * @function lightmode
     * @summary: changes the theme to 'light mode' and save settings to local stroage.
     */
    function lightMode() {
        // Para las entradas
        document.querySelectorAll('.bg-dark, .text-bg-dark').forEach((element) => {
            if (element.className.includes('carousel')) return;     // Para evitar que cambie el fondo del carousel
            element.className = element.className.replace(/-dark/g, '-light');
        });

        // Paginacion
        document.querySelectorAll('[data-bs-theme]').forEach((element) => {
            element.setAttribute('data-bs-theme', 'light');
        });

        // Links de las migas de pan y redes sociales
        document.querySelectorAll('.breadcrumb a, .col-lg-4 a').forEach((element) => {
            element.style.color = 'black';
        });

        document.body.classList.add('bg-light');

        if (document.body.classList.contains('text-light')) {
            document.body.classList.replace('text-light', 'text-dark');
        } else {
            document.body.classList.add('text-dark');
        }

        // Tables
        var tables = document.querySelectorAll('table');
        for (var i = 0; i < tables.length; i++) {
            if (tables[i].classList.contains('table-dark')) {
                tables[i].classList.remove('table-dark');
            }
        }

        if (lightSwitch.checked) {
            lightSwitch.checked = false;
        }
        localStorage.setItem('lightSwitch', 'light');
    }

    /**
     * @function onToggleMode
     * @summary: the event handler attached to the switch. calling @darkMode or @lightMode depending on the checked state.
     */
    function onToggleMode() {
        if (lightSwitch.checked) {
            darkMode();
        } else {
            lightMode();
        }
    }

    /**
     * @function getSystemDefaultTheme
     * @summary: get system default theme by media query
     */
    function getSystemDefaultTheme() {
        const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
        if (darkThemeMq.matches) {
            return 'dark';
        }
        return 'light';
    }

    function setup() {
        var settings = localStorage.getItem('lightSwitch');
        if (settings == null) {
            settings = getSystemDefaultTheme();
        }

        if (settings == 'dark') {
            lightSwitch.checked = true;
        }

        lightSwitch.addEventListener('change', onToggleMode);
        onToggleMode();
    }

    setup();
})();
