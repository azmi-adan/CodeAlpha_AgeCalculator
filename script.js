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
            about: "About Chronos",
            copiedToClipboard: "Age results copied to clipboard!",
            in: "in",
            Sunday: "Sunday",
            Monday: "Monday",
            Tuesday: "Tuesday",
            Wednesday: "Wednesday",
            Thursday: "Thursday",
            Friday: "Friday",
            Saturday: "Saturday",
            January: "January",
            February: "February",
            March: "March",
            April: "April",
            May: "May",
            June: "June",
            July: "July",
            August: "August",
            September: "September",
            October: "October",
            November: "November",
            December: "December",
            settingsSaved: "Settings saved successfully!"
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
        const month = parseInt(monthInput.value); // JavaScript months are 0-indexed
        const year = parseInt(yearInput.value);
        
        if (isNaN(day) || isNaN(month + 1) || isNaN(year)) {
            showError(translate('invalidDate'));
            return;
        }
        
        // Validate date - Create date object properly
        const birthDate = new Date(year, month, day);
        
        // Check if the date is valid (handles invalid dates like Feb 30)
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
        
        // Calculate age using proper algorithm
        const ageResult = calculateExactAge(birthDate, today);
        
        // Display results with rolling animation
        animateValue(yearsDisplay, 0, ageResult.years, 1000);
        animateValue(monthsDisplay, 0, ageResult.months, 1000);
        animateValue(daysDisplay, 0, ageResult.days, 1000);
        
        // Calculate and display additional info
        displayAdditionalInfo(birthDate);
        
        // Check if today is birthday
        checkBirthday(birthDate);
    }
    
    // Fixed age calculation function
    function calculateExactAge(birthDate, currentDate) {
        let years = currentDate.getFullYear() - birthDate.getFullYear();
        let months = currentDate.getMonth() - birthDate.getMonth();
        let days = currentDate.getDate() - birthDate.getDate();
        
        // Adjust for negative days
        if (days < 0) {
            months--;
            // Get the last day of the previous month
            const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
            days += lastMonth.getDate();
        }
        
        // Adjust for negative months
        if (months < 0) {
            years--;
            months += 12;
        }
        
        // Ensure non-negative values
        years = Math.max(0, years);
        months = Math.max(0, months);
        days = Math.max(0, days);
        
        return { years, months, days };
    }
    
    // Rolling number animation function
    function animateValue(element, start, end, duration) {
        if (start === end) {
            element.textContent = end;
            return;
        }
        
        const range = Math.abs(end - start);
        let current = start;
        const increment = end > start ? 1 : -1;
        const stepTime = Math.max(Math.floor(duration / range), 10);
        
        const timer = setInterval(function() {
            current += increment;
            element.textContent = current;
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
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
        
        // Calculate days lived (more accurate calculation)
        const diffTime = today.getTime() - birthDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        daysLivedDisplay.textContent = diffDays.toLocaleString();
        
        // Calculate next birthday
        const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
        
        // If birthday has passed this year, set to next year
        if (nextBirthday <= today) {
            nextBirthday.setFullYear(today.getFullYear() + 1);
        }
        
        const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysUntilBirthday === 0) {
            nextBirthdayDisplay.textContent = `${translate('happyBirthday')} 🎉`;
        } else {
            nextBirthdayDisplay.textContent = `${monthsOfYear[nextBirthday.getMonth()]} ${nextBirthday.getDate()}, ${nextBirthday.getFullYear()} (${translate('in')} ${daysUntilBirthday} ${translate('days')})`;
        }
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
                if (document.getElementById('animation-toggle') && document.getElementById('animation-toggle').checked) {
                    birthdayMessage.style.animation = 'birthdayPulse 2s infinite';
                }
            }
        }
    }
    
    function createConfetti() {
        // Only create confetti if animations are enabled
        if (!document.getElementById('animation-toggle') || !document.getElementById('animation-toggle').checked) return;
        
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
                if (confetti.parentNode) {
                    confetti.remove();
                }
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
        if (document.getElementById('animation-toggle') && document.getElementById('animation-toggle').checked) {
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
        const resultCard = document.querySelector('.result-card');
        if (resultCard) {
            resultCard.classList.remove('birthday');
        }
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
        const headerTitle = document.querySelector('.app-header h1');
        if (headerTitle) {
            headerTitle.innerHTML = `<i class="fas fa-calculator"></i> ${lang.title}`;
        }
        
        const tagline = document.querySelector('.tagline');
        if (tagline) {
            tagline.textContent = lang.tagline;
        }
        
        const dayLabel = document.querySelector('label[for="day"]');
        if (dayLabel) {
            dayLabel.innerHTML = `<i class="fas fa-calendar-day"></i> ${lang.day}`;
        }
        
        const monthLabel = document.querySelector('label[for="month"]');
        if (monthLabel) {
            monthLabel.innerHTML = `<i class="fas fa-calendar-week"></i> ${lang.month}`;
        }
        
        const yearLabel = document.querySelector('label[for="year"]');
        if (yearLabel) {
            yearLabel.innerHTML = `<i class="fas fa-calendar-year"></i> ${lang.year}`;
        }
        
        if (calculateBtn) {
            calculateBtn.innerHTML = `<span>${lang.calculate}</span> <i class="fas fa-arrow-right"></i>`;
        }
        
        if (resetBtn) {
            resetBtn.innerHTML = `<i class="fas fa-redo"></i> <span>${lang.reset}</span>`;
        }
        
        const resultTitle = document.querySelector('.result-content h3');
        if (resultTitle) {
            resultTitle.textContent = lang.yourAge;
        }
        
        const ageUnits = document.querySelectorAll('.age-unit small');
        if (ageUnits.length >= 3) {
            ageUnits[0].textContent = lang.years;
            ageUnits[1].textContent = lang.months;
            ageUnits[2].textContent = lang.days;
        }
        
        const infoCards = document.querySelectorAll('.info-card h4');
        if (infoCards.length >= 3) {
            infoCards[0].textContent = lang.nextBirthday;
            infoCards[1].textContent = lang.birthDay;
            infoCards[2].textContent = lang.daysLived;
        }
        
        // Update modals
        const settingsModalTitle = document.querySelector('#settings-modal h2');
        if (settingsModalTitle) {
            settingsModalTitle.innerHTML = `<i class="fas fa-cog"></i> ${lang.settings}`;
        }
        
        const infoModalTitle = document.querySelector('#info-modal h2');
        if (infoModalTitle) {
            infoModalTitle.innerHTML = `<i class="fas fa-info-circle"></i> ${lang.about}`;
        }
        
        if (saveSettingsBtn) {
            saveSettingsBtn.textContent = lang.save;
        }
    }
    
    function translate(key) {
        const language = languageSelector ? languageSelector.value : 'en';
        const lang = translations[language] || translations['en'];
        return lang[key] || key;
    }
    
    function saveSettings() {
        const activeTheme = document.querySelector('.theme-option.active');
        const theme = activeTheme ? activeTheme.getAttribute('data-theme') : 'default';
        const font = fontSelector ? fontSelector.value : 'Montserrat';
        const animationsEnabled = animationToggle ? animationToggle.checked : true;
        const language = languageSelector ? languageSelector.value : 'en';
        
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
        const themeOption = document.querySelector(`.theme-option[data-theme="${savedTheme}"]`);
        if (themeOption) {
            themeOption.classList.add('active');
        }
        
        // Load font
        const savedFont = localStorage.getItem('chronosFont') || 'Montserrat';
        if (fontSelector) {
            fontSelector.value = savedFont;
        }
        document.documentElement.style.setProperty('--font-family', savedFont);
        
        // Load animations setting
        const savedAnimations = localStorage.getItem('chronosAnimations');
        if (animationToggle && savedAnimations !== null) {
            animationToggle.checked = savedAnimations === 'true';
        }
        
        // Load language
        const savedLanguage = localStorage.getItem('chronosLanguage') || 'en';
        if (languageSelector) {
            languageSelector.value = savedLanguage;
        }
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
        
        const birthDate = new Date(year, parseInt(month) - 1, day);
        const today = new Date();
        
        // Calculate age using the fixed function
        const ageResult = calculateExactAge(birthDate, today);
        
        // Get additional info
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const birthDay = daysOfWeek[birthDate.getDay()];
        
        const diffTime = today.getTime() - birthDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
        if (nextBirthday <= today) {
            nextBirthday.setFullYear(today.getFullYear() + 1);
        }
        const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        
        // Create share text with all age information
        const shareText = `🌟 ${translate('yourAge')} 🌟\n\n` +
                         `📅 ${ageResult.years} ${translate('years')}, ${ageResult.months} ${translate('months')}, ${ageResult.days} ${translate('days')}\n\n` +
                         `🎂 ${translate('birthDay')}: ${birthDay}\n` +
                         `⏳ ${translate('daysLived')}: ${diffDays.toLocaleString()}\n` +
                         `🎈 ${translate('nextBirthday')}: ${daysUntilBirthday} ${translate('days')}`;
        
        if (navigator.share) {
            // Mobile share
            navigator.share({
                title: 'My Age Calculation',
                text: shareText
            }).catch(err => {
                console.log('Error sharing:', err);
                copyToClipboard(shareText);
            });
        } else {
            // Desktop fallback - copy to clipboard
            copyToClipboard(shareText);
        }
    }
    
    function copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                alert(translate('copiedToClipboard'));
            }).catch(err => {
                console.log('Error copying:', err);
                fallbackCopyToClipboard(text);
            });
        } else {
            fallbackCopyToClipboard(text);
        }
    }
    
    function fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert(translate('copiedToClipboard'));
    }

    // Initialize
    loadSettings();
    if (fontSelector) {
        fontSelector.addEventListener('change', changeFont);
    }
});