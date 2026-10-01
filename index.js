document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 20);
    });

    hamburger?.addEventListener("click", () => {
        const active = navLinks.classList.toggle("nav-active");
        hamburger.setAttribute("aria-label", active ? "Close navigation" : "Open navigation");
        hamburger.querySelector("i").classList.toggle("fa-bars", !active);
        hamburger.querySelector("i").classList.toggle("fa-xmark", active);
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("nav-active");
            hamburger.querySelector("i").classList.add("fa-bars");
            hamburger.querySelector("i").classList.remove("fa-xmark");
        });
    });

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    document.querySelectorAll(".hidden").forEach(element => observer.observe(element));
});