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

    // Input validation
    function validateInputs() {
        const day = parseInt(dayInput.value);
        const month = parseInt(monthInput.value);
        const year = parseInt(yearInput.value);
        
        // Basic validation
        if (isNaN(day)) {
            showError(dayInput, 'Please enter a valid day');
            return false;
        }
        
        if (day < 1 || day > 31) {
            showError(dayInput, 'Day must be between 1-31');
            return false;
        }
        
        if (isNaN(month)) {
            showError(monthInput, 'Please select a month');
            return false;
        }
        
        if (isNaN(year)) {
            showError(yearInput, 'Please enter a valid year');
            return false;
        }
        
        if (year < 1900 || year > new Date().getFullYear()) {
            showError(yearInput, 'Year must be between 1900 and current year');
            return false;
        }
        
        // Validate date (e.g., not Feb 30)
        const date = new Date(year, month, day);
        if (date.getMonth() !== month || date.getDate() !== day) {
            showError(dayInput, 'Invalid date for selected month');
            return false;
        }
        
        // Check if date is in the future
        if (date > new Date()) {
            showError(dayInput, 'Birth date cannot be in the future');
            return false;
        }
        
        return true;
    }
    
    function showError(input, message) {
        const inputGroup = input.parentElement;
        inputGroup.classList.add('error');
        
        // Remove any existing error message
        const existingError = inputGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Create and display error message
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = 'var(--warning-color)';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '5px';
        inputGroup.appendChild(errorElement);
        
        // Remove error class after animation
        setTimeout(() => {
            inputGroup.classList.remove('error');
        }, 3000);
    }
    
    // Calculate age
    function calculateAge() {
        if (!validateInputs()) return;
        
        const day = parseInt(dayInput.value);
        const month = parseInt(monthInput.value);
        const year = parseInt(yearInput.value);
        
        const birthDate = new Date(year, month, day);
        const today = new Date();
        
        // Calculate age
        let ageYears = today.getFullYear() - birthDate.getFullYear();
        let ageMonths = today.getMonth() - birthDate.getMonth();
        let ageDays = today.getDate() - birthDate.getDate();
        
        // Adjust for negative months/days
        if (ageDays < 0) {
            ageMonths--;
            // Get the last day of the previous month
            const lastDayOfMonth = new Date(
                today.getFullYear(),
                today.getMonth(),
                0
            ).getDate();
            ageDays += lastDayOfMonth;
        }
        
        if (ageMonths < 0) {
            ageYears--;
            ageMonths += 12;
        }
        
        // Calculate days lived
        const diffTime = Math.abs(today - birthDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        // Calculate next birthday
        const nextBirthday = new Date(
            today.getFullYear(),
            birthDate.getMonth(),
            birthDate.getDate()
        );
        
        if (nextBirthday < today) {
            nextBirthday.setFullYear(today.getFullYear() + 1);
        }
        
        const daysUntilBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
        
        // Get day of week for birth date
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const birthDayOfWeek = daysOfWeek[birthDate.getDay()];
        
        // Display results with animation
        animateValue(yearsDisplay, 0, ageYears, 1000);
        animateValue(monthsDisplay, 0, ageMonths, 1000);
        animateValue(daysDisplay, 0, ageDays, 1000);
        
        nextBirthdayDisplay.textContent = `${formatDate(nextBirthday)} (in ${daysUntilBirthday} days)`;
        birthDayDisplay.textContent = birthDayOfWeek;
        daysLivedDisplay.textContent = diffDays.toLocaleString();
        
        // Add celebration effect if it's the user's birthday
        if (today.getMonth() === birthDate.getMonth() && today.getDate() === birthDate.getDate()) {
            celebrateBirthday();
        }
    }
    
    // Animate number values
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Format date as "Month Day, Year"
    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
    
    // Birthday celebration effect
    function celebrateBirthday() {
        const resultCard = document.querySelector('.result-card');
        resultCard.style.background = 'linear-gradient(135deg, #f8f9fa, #e9ecef)';
        resultCard.style.animation = 'birthdayPulse 2s infinite';
        
        // Create confetti effect
        for (let i = 0; i < 50; i++) {
            createConfetti();
        }
        
        // Show birthday message
        const birthdayMessage = document.createElement('div');
        birthdayMessage.className = 'birthday-message';
        birthdayMessage.innerHTML = '<i class="fas fa-birthday-cake"></i> Happy Birthday!';
        resultCard.appendChild(birthdayMessage);
    }
    
    // Create confetti element
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        document.body.appendChild(confetti);
        
        // Animation
        const animationDuration = Math.random() * 3 + 2;
        confetti.style.animation = `confettiFall ${animationDuration}s linear forwards`;
        
        // Remove after animation
        setTimeout(() => {
            confetti.remove();
        }, animationDuration * 1000);
    }
    
    // Get random color for confetti
    function getRandomColor() {
        const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Reset form
    function resetForm() {
        dayInput.value = '';
        monthInput.value = '';
        yearInput.value = '';
        
        yearsDisplay.textContent = '--';
        monthsDisplay.textContent = '--';
        daysDisplay.textContent = '--';
        nextBirthdayDisplay.textContent = '--';
        birthDayDisplay.textContent = '--';
        daysLivedDisplay.textContent = '--';
        
        // Remove any error messages
        document.querySelectorAll('.error-message').forEach(el => el.remove());
    }
    
    // Event listeners
    calculateBtn.addEventListener('click', calculateAge);
    resetBtn.addEventListener('click', resetForm);
    
    // Add input validation on blur
    dayInput.addEventListener('blur', validateInputs);
    monthInput.addEventListener('blur', validateInputs);
    yearInput.addEventListener('blur', validateInputs);
    
    // Add keypress event for Enter key
    [dayInput, monthInput, yearInput].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateAge();
            }
        });
    });
    
    // Add animation for buttons
    calculateBtn.addEventListener('mouseenter', function() {
        this.querySelector('i').style.transform = 'translateX(5px)';
    });
    
    calculateBtn.addEventListener('mouseleave', function() {
        this.querySelector('i').style.transform = 'translateX(0)';
    });
    
    // Add styles for confetti and birthday animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            0% {
                top: -10px;
                opacity: 1;
                transform: rotate(0deg) scale(1);
            }
            100% {
                top: 100vh;
                opacity: 0;
                transform: rotate(360deg) scale(0.5);
            }
        }
        
        @keyframes birthdayPulse {
            0% {
                box-shadow: 0 0 0 0 rgba(46, 204, 113, 0.7);
            }
            70% {
                box-shadow: 0 0 0 15px rgba(46, 204, 113, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(46, 204, 113, 0);
            }
        }
        
        .confetti {
            position: fixed;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            z-index: 999;
        }
        
        .birthday-message {
            margin-top: 1rem;
            padding: 0.5rem;
            background-color: var(--success-color);
            color: white;
            border-radius: var(--border-radius);
            animation: fadeIn 0.5s ease;
        }
        
        .error {
            animation: shake 0.5s ease;
        }
        
        @keyframes shake {
            0%, 100% {
                transform: translateX(0);
            }
            20%, 60% {
                transform: translateX(-5px);
            }
            40%, 80% {
                transform: translateX(5px);
            }
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});