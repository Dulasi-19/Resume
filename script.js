document.addEventListener('DOMContentLoaded', () => {
    // Select elements
    const themeToggleBtn = document.getElementById('theme-toggle');
    const printBtn = document.getElementById('print-btn');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggleBtn.querySelector('i');

    /* ==========================================================================
       Theme Toggle System
       ========================================================================== */
    // Check saved theme or default to 'dark'
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // Toggle theme on button click
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Apply theme
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update button icon
        updateThemeIcon(newTheme);
        
        // Trigger a subtle button animation
        themeToggleBtn.classList.add('active');
        setTimeout(() => themeToggleBtn.classList.remove('active'), 200);
    });

    // Helper function to update the icon
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
            themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
            themeToggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
        } else {
            themeIcon.className = 'fas fa-moon';
            themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
            themeToggleBtn.setAttribute('aria-label', 'Switch to Dark Mode');
        }
    }

    /* ==========================================================================
       Print / PDF Export System
       ========================================================================== */
    printBtn.addEventListener('click', () => {
        // Trigger native print dialog which uses CSS @media print styles
        window.print();
    });

    /* ==========================================================================
       Ambient Glow Interactivity
       ========================================================================== */
    const blob1 = document.querySelector('.blob-1');
    const blob2 = document.querySelector('.blob-2');

    if (blob1 && blob2 && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
        document.addEventListener('mousemove', (e) => {
            // Check if element is active (visible)
            if (window.getComputedStyle(blob1).display === 'none') return;
            
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            // Calculate offsets
            const moveX1 = (mouseX - window.innerWidth / 2) * 0.03;
            const moveY1 = (mouseY - window.innerHeight / 2) * 0.03;
            
            const moveX2 = (mouseX - window.innerWidth / 2) * -0.02;
            const moveY2 = (mouseY - window.innerHeight / 2) * -0.02;

            // Apply translation smoothly
            blob1.style.transform = `translate(${moveX1}px, ${moveY1}px)`;
            blob2.style.transform = `translate(${moveX2}px, ${moveY2}px)`;
        });
    }

    /* ==========================================================================
       Staggered Skill Tag Entry Animation
       ========================================================================== */
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(10px)';
        tag.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        
        setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
        }, 100 + (index * 40));
    });
});
