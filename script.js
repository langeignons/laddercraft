document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".site-header");
    const toggleHeaderBtn = document.getElementById("toggle-header-btn");

    // ------------------------------
    // Toggle du header (slide up/down)
    // ------------------------------
    if (header && toggleHeaderBtn) {
        let headerVisible = true;

        toggleHeaderBtn.addEventListener("click", () => {
            headerVisible = !headerVisible;
            header.classList.toggle("header-hidden", !headerVisible);

            const span = toggleHeaderBtn.querySelector("span");
            if (span) {
                span.textContent = headerVisible ? "Masquer le menu" : "Afficher le menu";
            }
        });
    }

    // ------------------------------
    // Carrousel des grades (mobile)
    // ------------------------------
    const gradeWrapper = document.querySelector(".grades-wrapper");
    const gradeCards = document.querySelectorAll(".grade-card");
    const prevBtn = document.querySelector(".grade-nav-prev");
    const nextBtn = document.querySelector(".grade-nav-next");

    if (gradeWrapper && gradeCards.length > 0 && prevBtn && nextBtn) {
        let currentIndex = 0;

        function updateActiveCard() {
            // Sur mobile, le CSS n'affiche que .active
            // Sur desktop, toutes les cartes sont visibles (media query)
            gradeCards.forEach((card, index) => {
                if (index === currentIndex) {
                    card.classList.add("active");
                } else {
                    card.classList.remove("active");
                }
            });
        }

        function showNext() {
            currentIndex = (currentIndex + 1) % gradeCards.length;
            updateActiveCard();
        }

        function showPrev() {
            currentIndex = (currentIndex - 1 + gradeCards.length) % gradeCards.length;
            updateActiveCard();
        }

        nextBtn.addEventListener("click", showNext);
        prevBtn.addEventListener("click", showPrev);

        // Swipe mobile (optionnel mais sympa)
        let startX = null;

        gradeWrapper.addEventListener("touchstart", (e) => {
            const touch = e.touches[0];
            startX = touch.clientX;
        });

        gradeWrapper.addEventListener("touchend", (e) => {
            if (startX === null) return;
            const touch = e.changedTouches[0];
            const deltaX = touch.clientX - startX;

            if (Math.abs(deltaX) > 40) {
                if (deltaX < 0) {
                    showNext();
                } else {
                    showPrev();
                }
            }
            startX = null;
        });

        // Init (important pour mobile)
        updateActiveCard();
    }
});
