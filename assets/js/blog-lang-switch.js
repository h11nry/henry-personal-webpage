// Language Switch Functionality for Blog Posts
'use strict';

document.addEventListener('DOMContentLoaded', function() {
    const langSwitch = document.getElementById('langSwitch');
    const langEnSpan = document.querySelector('.lang-en');
    const langZhSpan = document.querySelector('.lang-zh');

    // Get current language from localStorage or default to 'en'
    let currentLang = localStorage.getItem('language') || 'en';

    // Function to update all text content based on language
    function updateLanguage(lang) {
        // Update all elements with data-en and data-zh attributes
        const elements = document.querySelectorAll('[data-en][data-zh]');
        
        elements.forEach(element => {
            const enText = element.getAttribute('data-en');
            const zhText = element.getAttribute('data-zh');
            
            if (lang === 'zh' && zhText) {
                element.textContent = zhText;
            } else if (lang === 'en' && enText) {
                element.textContent = enText;
            }
        });
        
        // Update language switch button state
        if (lang === 'zh') {
            langEnSpan.classList.remove('active');
            langZhSpan.classList.add('active');
        } else {
            langEnSpan.classList.add('active');
            langZhSpan.classList.remove('active');
        }
        
        // Save language preference
        localStorage.setItem('language', lang);
        currentLang = lang;
    }

    // Add click event to language switch button
    if (langSwitch) {
        langSwitch.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Check which part was clicked
            const clickedElement = e.target;
            
            if (clickedElement.classList.contains('lang-en')) {
                updateLanguage('en');
            } else if (clickedElement.classList.contains('lang-zh')) {
                updateLanguage('zh');
            } else {
                // If clicked on the button itself or separator, toggle
                const newLang = currentLang === 'en' ? 'zh' : 'en';
                updateLanguage(newLang);
            }
        });
        
        // Initialize with saved language
        updateLanguage(currentLang);
    }
});
