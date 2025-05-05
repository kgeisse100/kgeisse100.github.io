

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    
    // Check for saved theme preference or use default
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply saved theme
    if (currentTheme === 'light') {
        body.classList.add('light-mode');
        updateToggleButton(true);
    }
    
    // Toggle dark/light mode on button click
    darkModeToggle.addEventListener('click', () => {
        // Toggle light-mode class on body
        body.classList.toggle('light-mode');
        
        // Update button icon and text
        const isLightMode = body.classList.contains('light-mode');
        updateToggleButton(isLightMode);
        
        // Save preference to localStorage
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    });
    
    // Function to update toggle button appearance
    function updateToggleButton(isLightMode) {
        const icon = darkModeToggle.querySelector('i');
        const text = darkModeToggle.querySelector('span');
        
        if (isLightMode) {
            // Switch to sun icon for light mode
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            text.textContent = 'Light Mode';
        } else {
            // Switch to moon icon for dark mode
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            text.textContent = 'Dark Mode';
        }
    }
});
