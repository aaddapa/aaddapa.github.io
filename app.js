(() => {
    const year = document.getElementById("year");
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    const revealItems = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.18,
                rootMargin: "0px 0px -60px 0px"
            }
        );

        revealItems.forEach((item, index) => {
            item.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
            revealObserver.observe(item);
        });
    } else {
        revealItems.forEach((item) => item.classList.add("is-visible"));
    }

    const navLinks = [...document.querySelectorAll(".nav a")];
    const sections = [...document.querySelectorAll("main section[id]")];

    const updateActiveLink = () => {
        const current = sections.reduce((activeId, section) => {
            const top = section.getBoundingClientRect().top;
            return top <= window.innerHeight * 0.35 ? section.id : activeId;
        }, sections[0]?.id);

        navLinks.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${current}`;
            link.classList.toggle("active", isActive);
            if (isActive) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    };

    updateActiveLink();
    window.addEventListener("scroll", updateActiveLink, { passive: true });
})();
