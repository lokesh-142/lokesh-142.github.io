document.addEventListener("DOMContentLoaded", () => {
    const sidemenu = document.getElementById("sidemenu");
    const openMenu = document.querySelector(".open-menu");
    const closeMenu = document.querySelector(".close-menu");

    openMenu?.addEventListener("click", () => {
        sidemenu.classList.add("nav-active");
        openMenu.setAttribute("aria-expanded", "true");
    });

    closeMenu?.addEventListener("click", () => {
        sidemenu.classList.remove("nav-active");
        openMenu.setAttribute("aria-expanded", "false");
    });

    sidemenu?.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            sidemenu.classList.remove("nav-active");
            openMenu.setAttribute("aria-expanded", "false");
        });
    });

    document.querySelectorAll(".tab-links").forEach(button => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".tab-links").forEach(item => item.classList.remove("active-link"));
            document.querySelectorAll(".tab-contents").forEach(item => item.classList.remove("active-tab"));
            button.classList.add("active-link");
            document.getElementById(button.dataset.tab)?.classList.add("active-tab");
        });
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, {threshold: 0.12, rootMargin: "0px 0px -30px 0px"});

    document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");

    form?.addEventListener("submit", event => {
        event.preventDefault();

        const name = document.getElementById("contact-name").value.trim();
        const email = document.getElementById("contact-email").value.trim();
        const message = document.getElementById("contact-message").value.trim();

        const subject = encodeURIComponent("Portfolio enquiry from " + name);
        const body = encodeURIComponent(
            "Name: " + name + "\n" +
            "Email: " + email + "\n\n" +
            message
        );

        window.location.href = "mailto:kolusulokesh934@gmail.com?subject=" + subject + "&body=" + body;
        status.textContent = "Opening your email client...";
    });
});