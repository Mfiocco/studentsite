// Wait until the DOM is fully loaded before running script
document.addEventListener('DOMContentLoaded', function () {
    // Get all parallax containers on the page
    const parallaxContainers = document.querySelectorAll('.parallax-container');


    // Variables for scroll optimization
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let ticking = false; // Used to limit the frequency of updates

    /**
     * Updates the position of parallax images based on scroll position
     * This function calculates how much each image should move to create the parallax effect
     */
    function updateParallax() {
        // Get current scroll position
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Process each parallax container
        parallaxContainers.forEach((container, i) => {
            // Get the container's position relative to the viewport
            const rect = container.getBoundingClientRect();

            // Get the image element inside this container
            const parallaxImage = container.querySelector('.parallax-image');

            // Only process containers that are visible in the viewport
            // This improves performance by not calculating for off-screen elements
            if (rect.bottom > 0 && rect.top < window.innerHeight) {
                // Calculate how far the container is from the top of the viewport as a percentage
                // 0 = top of viewport, 1 = bottom of viewport
                const containerTopPercentage = rect.top / window.innerHeight;

                // Calculate parallax offset:
                // -15% is the starting position (vertically centered)
                // containerTopPercentage * 30 adjusts based on scroll position
                // The multiplier (30) controls how intense the parallax effect is
                const startingPosition = -15
                const offset = startingPosition + (containerTopPercentage * 17);



                // Apply the calculated transformation to move the image
                parallaxImage.style.transform = `translateY(${offset}%)`;
            }
        });

        // Update the last scroll position
        lastScrollTop = scrollTop;

        // Reset the ticking flag so we can process the next scroll event
        ticking = false;
    }

    // Run the parallax update once on page load to set initial positions
    updateParallax();

    // Add scroll event listener with requestAnimationFrame for better performance
    // This prevents too many calculations during rapid scrolling
    document.querySelector(".right-side").addEventListener('scroll', function () {
        if (!ticking) {
            // Use requestAnimationFrame to optimize visual updates
            window.requestAnimationFrame(function () {
                updateParallax();
            });
            ticking = true;
        }
    });

    // Update parallax effect when window is resized
    // This ensures the effect remains correct after screen size changes
    window.addEventListener('resize', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                updateParallax();
            });
            ticking = true;
        }
    });
});


