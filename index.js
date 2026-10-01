document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    const setScrolled = () => navbar.classList.toggle("scrolled", window.scrollY > 18);
    setScrolled();
    window.addEventListener("scroll", setScrolled, { passive: true });

    hamburger?.addEventListener("click", () => {
        const active = navLinks.classList.toggle("nav-active");
        hamburger.setAttribute("aria-expanded", String(active));
        hamburger.setAttribute("aria-label", active ? "Close navigation" : "Open navigation");
        const icon = hamburger.querySelector("i");
        icon.classList.toggle("fa-bars", !active);
        icon.classList.toggle("fa-xmark", active);
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("nav-active");
            hamburger?.setAttribute("aria-expanded", "false");
            hamburger?.setAttribute("aria-label", "Open navigation");
            const icon = hamburger?.querySelector("i");
            icon?.classList.add("fa-bars");
            icon?.classList.remove("fa-xmark");
        });
    });

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -35px 0px" });

    document.querySelectorAll(".hidden").forEach(element => observer.observe(element));
});