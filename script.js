document.addEventListener('DOMContentLoaded', function() {
    // Splash screen timeout
    setTimeout(function() {
        const splashScreen = document.querySelector('.splash-screen');
        splashScreen.style.opacity = '0';
        splashScreen.style.visibility = 'hidden';
        
        // Show main app with animation
        const appContainer = document.querySelector('.app-container');
        appContainer.classList.add('loaded');
        
        // Set current year in footer
        document.getElementById('current-year').textContent = new Date().getFullYear();
        
        // Load saved settings
        loadSettings();
    }, 2500);

    // DOM Elements
    const dayInput = document.getElementById('day');
    const monthInput = document.getElementById('month');
    const yearInput = document.getElementById('year');
    const calculateBtn = document.getElementById('calculate-btn');
    const resetBtn = document.getElementById('reset-btn');
    const yearsDisplay = document.getElementById('years');
    const monthsDisplay = document.getElementById('months');
    const daysDisplay = document.getElementById('days');
    const nextBirthdayDisplay = document.getElementById('next-birthday');
    const birthDayDisplay = document.getElementById('birth-day');
    const daysLivedDisplay = document.getElementById('days-lived');

    // Modal Elements
    const settingsBtn = document.getElementById('settings-btn');
    const infoBtn = document.getElementById('info-btn');
    const shareBtn = document.getElementById('share-btn');
    const settingsModal = document.getElementById('settings-modal');
    const infoModal = document.getElementById('info-modal');
    const shareModal = document.getElementById('share-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const saveSettingsBtn = document.querySelector('.save-settings');

    // Theme Elements
    const themeOptions = document.querySelectorAll('.theme-option');
    const fontSelector = document.getElementById('font-selector');
    const animationToggle = document.getElementById('animation-toggle');
    const languageSelector = document.getElementById('language-selector');

    // Translations
    const translations = {
        en: {
            title: "Chronos Age Calculator",
            tagline: "Precision time measurement for professionals",
            day: "Day",
            month: "Month",
            year: "Year",
            calculate: "Calculate Age",
            reset: "Reset",
            yourAge: "Your Age Is",
            years: "Years",
            months: "Months",
            days: "Days",
            nextBirthday: "Next Birthday",
            birthDay: "Birth Day",
            daysLived: "Days Lived",
            happyBirthday: "Happy Birthday!",
            invalidDate: "Please enter a valid date",
            futureDate: "Birth date cannot be in the future",
            settings: "Settings",
            save: "Save Settings",
            about: "About Chronos"
        },
        es: {
            title: "Calculadora de Edad Chronos",
            tagline: "Medición de tiempo precisa para profesionales",
            day: "Día",
            month: "Mes",
            year: "Año",
            calculate: "Calcular Edad",
            reset: "Reiniciar",
            yourAge: "Tu Edad Es",
            years: "Años",
            months: "Meses",
            days: "Días",
            nextBirthday: "Próximo Cumpleaños",
            birthDay: "Día de Nacimiento",
            daysLived: "Días Vividos",
            happyBirthday: "¡Feliz Cumpleaños!",
            invalidDate: "Por favor ingrese una fecha válida",
            futureDate: "La fecha de nacimiento no puede ser en el futuro",
            settings: "Configuraciones",
            save: "Guardar Configuraciones",
            about: "Acerca de Chronos"
        },
        fr: {
            title: "Calculateur d'Âge Chronos",
            tagline: "Mesure de temps précise pour les professionnels",
            day: "Jour",
            month: "Mois",
            year: "Année",
            calculate: "Calculer l'Âge",
            reset: "Réinitialiser",
            yourAge: "Votre Âge Est",
            years: "Ans",
            months: "Mois",
            days: "Jours",
            nextBirthday: "Prochain Anniversaire",
            birthDay: "Jour de Naissance",
            daysLived: "Jours Vécus",
            happyBirthday: "Joyeux Anniversaire!",
            invalidDate: "Veuillez entrer une date valide",
            futureDate: "La date de naissance ne peut pas être dans le futur",
            settings: "Paramètres",
            save: "Enregistrer les Paramètres",
            about: "À Propos de Chronos"
        },
        de: {
            title: "Chronos Altersrechner",
            tagline: "Präzise Zeitmessung für Profis",
            day: "Tag",
            month: "Monat",
            year: "Jahr",
            calculate: "Alter Berechnen",
            reset: "Zurücksetzen",
            yourAge: "Ihr Alter Ist",
            years: "Jahre",
            months: "Monate",
            days: "Tage",
            nextBirthday: "Nächster Geburtstag",
            birthDay: "Geburtstag",
            daysLived: "Gelebte Tage",
            happyBirthday: "Alles Gute zum Geburtstag!",
            invalidDate: "Bitte geben Sie ein gültiges Datum ein",
            futureDate: "Geburtsdatum kann nicht in der Zukunft liegen",
            settings: "Einstellungen",
            save: "Einstellungen Speichern",
            about: "Über Chronos"
        },
        sw: {
            title: "Kikokotoo cha Umri cha Chronos",
            tagline: "Kipimo cha wakati sahihi kwa wataalamu",
            day: "Siku",
            month: "Mwezi",
            year: "Mwaka",
            calculate: "Hesabu Umri",
            reset: "Weka Upya",
            yourAge: "Umri Wako Ni",
            years: "Miaka",
            months: "Miezi",
            days: "Siku",
            nextBirthday: "Siku ya Kuzaliwa Inayofuata",
            birthDay: "Siku ya Kuzaliwa",
            daysLived: "Siku Zilizoishi",
            happyBirthday: "Heri ya Siku ya Kuzaliwa!",
            invalidDate: "Tafadhali ingiza tarehe sahihi",
            futureDate: "Tarehe ya kuzaliwa haiwezi kuwa baadaye",
            settings: "Mipangilio",
            save: "Hifadhi Mipangilio",
            about: "Kuhusu Chronos"
        },
        hi: {
            title: "क्रोनोस आयु कैलकुलेटर",
            tagline: "पेशेवरों के लिए सटीक समय मापन",
            day: "दिन",
            month: "महीना",
            year: "साल",
            calculate: "आयु की गणना करें",
            reset: "रीसेट",
            yourAge: "आपकी आयु है",
            years: "साल",
            months: "महीने",
            days: "दिन",
            nextBirthday: "अगला जन्मदिन",
            birthDay: "जन्म दिवस",
            daysLived: "जीवित दिन",
            happyBirthday: "जन्मदिन मुबारक हो!",
            invalidDate: "कृपया एक वैध तिथि दर्ज करें",
            futureDate: "जन्म तिथि भविष्य में नहीं हो सकती",
            settings: "सेटिंग्स",
            save: "सेटिंग्स सहेजें",
            about: "क्रोनोस के बारे में"
        },
        ar: {
            title: "حاسبة العمر كرونوس",
            tagline: "قياس الوقت الدقيق للمحترفين",
            day: "يوم",
            month: "شهر",
            year: "سنة",
            calculate: "حساب العمر",
            reset: "إعادة تعيين",
            yourAge: "عمرك هو",
            years: "سنوات",
            months: "أشهر",
            days: "أيام",
            nextBirthday: "عيد الميلاد القادم",
            birthDay: "يوم الميلاد",
            daysLived: "الأيام المعاشة",
            happyBirthday: "عيد ميلاد سعيد!",
            invalidDate: "الرجاء إدخال تاريخ صحيح",
            futureDate: "لا يمكن أن يكون تاريخ الميلاد في المستقبل",
            settings: "الإعدادات",
            save: "حفظ الإعدادات",
            about: "حول كرونوس"
        },
        so: {
            title: "Xisaabiyaha Da'da Chronos",
            tagline: "Qiyaasta waqtiga u gaar ah xirfadlayaasha",
            day: "Maalin",
            month: "Bil",
            year: "Sannad",
            calculate: "Xisaabi Da'da",
            reset: "Dib u dejiso",
            yourAge: "Da'daadu Waa",
            years: "Sanno",
            months: "Bilood",
            days: "Maalmood",
            nextBirthday: "Maalintii Dhalashada Xigta",
            birthDay: "Maalintii Dhalashada",
            daysLived: "Maalmood La Nool",
            happyBirthday: "Dhalasho Wacan!",
            invalidDate: "Fadlan geli taariikh sax ah",
            futureDate: "Taariikhda dhalashadu kama noqon kartaa mustaqbal",
            settings: "Dejinta",
            save: "Keydso Dejinta",
            about: "Ku saabsan Chronos"
        }
    };

    // Event Listeners
    calculateBtn.addEventListener('click', calculateAge);
    resetBtn.addEventListener('click', resetCalculator);
    settingsBtn.addEventListener('click', () => showModal(settingsModal));
    infoBtn.addEventListener('click', () => showModal(infoModal));
    shareBtn.addEventListener('click', shareAge);
    closeModalBtns.forEach(btn => btn.addEventListener('click', closeModal));
    saveSettingsBtn.addEventListener('click', saveSettings);
    themeOptions.forEach(option => option.addEventListener('click', changeTheme));
    languageSelector.addEventListener('change', changeLanguage);
    
    // Allow Enter key to trigger calculation
    [dayInput, monthInput, yearInput].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateAge();
            }
        });
    });

    // Functions
    function calculateAge() {
        // Validate inputs
        const day = parseInt(dayInput.value);
        const month = parseInt(monthInput.value);
        const year = parseInt(yearInput.value);
        
        if (isNaN(day) || isNaN(month) || isNaN(year)) {
            showError(translate('invalidDate'));
            return;
        }
        
        // Validate date
        const birthDate = new Date(year, month, day);
        if (birthDate.getDate() !== day || birthDate.getMonth() !== month || birthDate.getFullYear() !== year) {
            showError(translate('invalidDate'));
            return;
        }
        
        // Check if date is in the future
        const today = new Date();
        if (birthDate > today) {
            showError(translate('futureDate'));
            return;
        }
        
        // Clear any previous errors
        clearErrors();
        
        // Calculate age
        let ageYears = today.getFullYear() - birthDate.getFullYear();
        let ageMonths = today.getMonth() - birthDate.getMonth();
        let ageDays = today.getDate() - birthDate.getDate();
        
        // Adjust for negative months/days
        if (ageDays < 0) {
            ageMonths--;
            const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            ageDays += lastMonth.getDate();
        }
        
        if (ageMonths < 0) {
            ageYears--;
            ageMonths += 12;
        }
        
        // Display results
        yearsDisplay.textContent = ageYears;
        monthsDisplay.textContent = ageMonths;
        daysDisplay.textContent = ageDays;
        
        // Calculate and display additional info
        displayAdditionalInfo(birthDate);
        
        // Check if today is birthday
        checkBirthday(birthDate);
    }
    
    function displayAdditionalInfo(birthDate) {
        const today = new Date();
        const daysOfWeek = [
            translate('Sunday'),
            translate('Monday'),
            translate('Tuesday'),
            translate('Wednesday'),
            translate('Thursday'),
            translate('Friday'),
            translate('Saturday')
        ];
        
        const monthsOfYear = [
            translate('January'),
            translate('February'),
            translate('March'),
            translate('April'),
            translate('May'),
            translate('June'),
            translate('July'),
            translate('August'),
            translate('September'),
            translate('October'),
            translate('November'),
            translate('December')
        ];
        
        // Display birth day of week
        birthDayDisplay.textContent = daysOfWeek[birthDate.getDay()];
        
        // Calculate days lived
        const diffTime = Math.abs(today - birthDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        daysLivedDisplay.textContent = diffDays.toLocaleString();
        
        // Calculate next birthday
        const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
        if (nextBirthday < today) {
            nextBirthday.setFullYear(today.getFullYear() + 1);
        }
        
        const daysUntilBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
        nextBirthdayDisplay.textContent = `${monthsOfYear[nextBirthday.getMonth()]} ${nextBirthday.getDate()}, ${nextBirthday.getFullYear()} (${translate('in')} ${daysUntilBirthday} ${translate('days')})`;
    }
    
    function checkBirthday(birthDate) {
        const today = new Date();
        const resultCard = document.querySelector('.result-card');
        
        // Remove any existing birthday classes
        resultCard.classList.remove('birthday');
        
        // Check if today is birthday
        if (today.getDate() === birthDate.getDate() && today.getMonth() === birthDate.getMonth()) {
            resultCard.classList.add('birthday');
            createConfetti();
            
            // Add birthday message
            const existingMessage = document.querySelector('.birthday-message');
            if (!existingMessage) {
                const birthdayMessage = document.createElement('div');
                birthdayMessage.className = 'birthday-message';
                birthdayMessage.innerHTML = `<i class="fas fa-birthday-cake"></i> ${translate('happyBirthday')}`;
                document.querySelector('.result-content').appendChild(birthdayMessage);
                
                // Add celebration animation
                if (document.getElementById('animation-toggle').checked) {
                    birthdayMessage.style.animation = 'birthdayPulse 2s infinite';
                }
            }
        }
    }
    
    function createConfetti() {
        // Only create confetti if animations are enabled
        if (!document.getElementById('animation-toggle').checked) return;
        
        const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.animationDelay = (Math.random() * 2) + 's';
            document.body.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }
    
    function showError(message) {
        // Clear any existing errors first
        clearErrors();
        
        // Find the first empty or invalid input
        let errorElement = null;
        
        if (!dayInput.value || isNaN(dayInput.value)) {
            errorElement = dayInput;
        } else if (!monthInput.value || isNaN(monthInput.value)) {
            errorElement = monthInput;
        } else if (!yearInput.value || isNaN(yearInput.value)) {
            errorElement = yearInput;
        } else {
            // If all inputs have values but date is invalid
            errorElement = dayInput;
        }
        
        // Create error message element
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        
        // Insert error message after the input
        errorElement.parentNode.appendChild(errorMessage);
        
        // Highlight the input with error
        errorElement.style.borderColor = 'var(--warning-color)';
        errorElement.focus();
        
        // Shake animation for error
        if (document.getElementById('animation-toggle').checked) {
            errorElement.style.animation = 'shake 0.5s';
            setTimeout(() => {
                errorElement.style.animation = '';
            }, 500);
        }
    }
    
    function clearErrors() {
        // Remove all error messages
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        
        // Reset input borders
        [dayInput, monthInput, yearInput].forEach(input => {
            input.style.borderColor = '#ddd';
        });
        
        // Remove birthday message if exists
        const birthdayMessage = document.querySelector('.birthday-message');
        if (birthdayMessage) {
            birthdayMessage.remove();
        }
    }
    
    function resetCalculator() {
        // Clear inputs
        dayInput.value = '';
        monthInput.value = '';
        yearInput.value = '';
        
        // Reset displays
        yearsDisplay.textContent = '--';
        monthsDisplay.textContent = '--';
        daysDisplay.textContent = '--';
        nextBirthdayDisplay.textContent = '--';
        birthDayDisplay.textContent = '--';
        daysLivedDisplay.textContent = '--';
        
        // Clear errors
        clearErrors();
        
        // Remove birthday celebration
        document.querySelector('.result-card').classList.remove('birthday');
    }
    
    function showModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
    
    function changeTheme() {
        const theme = this.getAttribute('data-theme');
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update active state for theme options
        themeOptions.forEach(option => {
            option.classList.remove('active');
        });
        this.classList.add('active');
    }
    
    function changeFont() {
        const font = fontSelector.value;
        document.documentElement.style.setProperty('--font-family', font);
    }
    
    function changeLanguage() {
        const language = languageSelector.value;
        applyTranslations(language);
    }
    
    function applyTranslations(language) {
        const lang = translations[language] || translations['en'];
        
        // Update UI elements
        document.querySelector('.app-header h1').innerHTML = `<i class="fas fa-calculator"></i> ${lang.title}`;
        document.querySelector('.tagline').textContent = lang.tagline;
        
        document.querySelector('label[for="day"]').innerHTML = `<i class="fas fa-calendar-day"></i> ${lang.day}`;
        document.querySelector('label[for="month"]').innerHTML = `<i class="fas fa-calendar-week"></i> ${lang.month}`;
        document.querySelector('label[for="year"]').innerHTML = `<i class="fas fa-calendar-year"></i> ${lang.year}`;
        
        document.getElementById('calculate-btn').innerHTML = `<span>${lang.calculate}</span> <i class="fas fa-arrow-right"></i>`;
        document.getElementById('reset-btn').innerHTML = `<i class="fas fa-redo"></i> <span>${lang.reset}</span>`;
        
        document.querySelector('.result-content h3').textContent = lang.yourAge;
        document.querySelector('.age-unit:nth-child(1) small').textContent = lang.years;
        document.querySelector('.age-unit:nth-child(2) small').textContent = lang.months;
        document.querySelector('.age-unit:nth-child(3) small').textContent = lang.days;
        
        document.querySelector('.info-card:nth-child(1) h4').textContent = lang.nextBirthday;
        document.querySelector('.info-card:nth-child(2) h4').textContent = lang.birthDay;
        document.querySelector('.info-card:nth-child(3) h4').textContent = lang.daysLived;
        
        // Update modals
        document.querySelector('#settings-modal h2').innerHTML = `<i class="fas fa-cog"></i> ${lang.settings}`;
        document.querySelector('#info-modal h2').innerHTML = `<i class="fas fa-info-circle"></i> ${lang.about}`;
        document.querySelector('.save-settings').textContent = lang.save;
    }
    
    function translate(key) {
        const language = languageSelector.value;
        const lang = translations[language] || translations['en'];
        return lang[key] || key;
    }
    
    function saveSettings() {
        const theme = document.querySelector('.theme-option.active').getAttribute('data-theme');
        const font = fontSelector.value;
        const animationsEnabled = animationToggle.checked;
        const language = languageSelector.value;
        
        localStorage.setItem('chronosTheme', theme);
        localStorage.setItem('chronosFont', font);
        localStorage.setItem('chronosAnimations', animationsEnabled);
        localStorage.setItem('chronosLanguage', language);
        
        // Apply settings
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.style.setProperty('--font-family', font);
        applyTranslations(language);
        
        // Show confirmation
        alert(translate('settingsSaved'));
        closeModal();
    }
    
    function loadSettings() {
        // Load theme
        const savedTheme = localStorage.getItem('chronosTheme') || 'default';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // Set active theme option
        document.querySelector(`.theme-option[data-theme="${savedTheme}"]`).classList.add('active');
        
        // Load font
        const savedFont = localStorage.getItem('chronosFont') || 'Montserrat';
        fontSelector.value = savedFont;
        document.documentElement.style.setProperty('--font-family', savedFont);
        
        // Load animations setting
        const savedAnimations = localStorage.getItem('chronosAnimations');
        if (savedAnimations !== null) {
            animationToggle.checked = savedAnimations === 'true';
        }
        
        // Load language
        const savedLanguage = localStorage.getItem('chronosLanguage') || 'en';
        languageSelector.value = savedLanguage;
        applyTranslations(savedLanguage);
    }
    
    function shareAge() {
        const day = dayInput.value;
        const month = monthInput.value;
        const year = yearInput.value;
        
        if (!day || !month || !year) {
            showError(translate('invalidDate'));
            return;
        }
        
        const birthDate = new Date(year, month, day);
        const today = new Date();
        
        // Calculate age
        let ageYears = today.getFullYear() - birthDate.getFullYear();
        let ageMonths = today.getMonth() - birthDate.getMonth();
        let ageDays = today.getDate() - birthDate.getDate();
        
        if (ageDays < 0) {
            ageMonths--;
            const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            ageDays += lastMonth.getDate();
        }
        
        if (ageMonths < 0) {
            ageYears--;
            ageMonths += 12;
        }
        
        const shareText = `${translate('yourAge')}: ${ageYears} ${translate('years')}, ${ageMonths} ${translate('months')}, ${ageDays} ${translate('days')}`;
        
        if (navigator.share) {
            // Mobile share
            navigator.share({
                title: 'Chronos Age Calculator',
                text: shareText,
                url: window.location.href
            }).catch(err => {
                console.log('Error sharing:', err);
            });
        } else if (navigator.clipboard) {
            // Desktop fallback - copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                alert(translate('copiedToClipboard'));
            }).catch(err => {
                console.log('Error copying:', err);
            });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = shareText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert(translate('copiedToClipboard'));
        }
    }

    // Initialize
    loadSettings();
    fontSelector.addEventListener('change', changeFont);
});