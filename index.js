document.addEventListener("DOMContentLoaded", () => {
    const sidemenu = document.getElementById("sidemenu");
    const openMenu = document.querySelector(".open-menu");
    const closeMenu = document.querySelector(".close-menu");

    openMenu?.addEventListener("click", () => {
        sidemenu?.classList.add("nav-active");
        openMenu.setAttribute("aria-expanded", "true");
    });

    closeMenu?.addEventListener("click", () => {
        sidemenu?.classList.remove("nav-active");
        openMenu?.setAttribute("aria-expanded", "false");
    });

    sidemenu?.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            sidemenu.classList.remove("nav-active");
            openMenu?.setAttribute("aria-expanded", "false");
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

    const sections = document.querySelectorAll("header[id], main section[id]");
    const navLinks = document.querySelectorAll("#sidemenu a");
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            navLinks.forEach(link => link.classList.toggle(
                "active-nav",
                link.getAttribute("href") === "#" + entry.target.id
            ));
        });
    }, {threshold: 0.35});
    sections.forEach(section => navObserver.observe(section));

    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");

    form?.addEventListener("submit", event => {
        event.preventDefault();

        const name = document.getElementById("contact-name")?.value.trim();
        const email = document.getElementById("contact-email")?.value.trim();
        const message = document.getElementById("contact-message")?.value.trim();

        if (!name || !email || !message) {
            if (status) status.textContent = "Please complete all fields.";
            return;
        }

        const subject = encodeURIComponent("Portfolio enquiry from " + name);
        const body = encodeURIComponent(
            "Name: " + name + "\n" +
            "Email: " + email + "\n\n" +
            message
        );

        if (status) status.textContent = "Opening your email client...";
        window.location.href = "mailto:kolusulokesh934@gmail.com?subject=" + subject + "&body=" + body;
    });
});