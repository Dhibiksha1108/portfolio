/* Scroll Reveal */

const sections =
document.querySelectorAll(
"section"
);

window.addEventListener(
"scroll",
revealSections
);

function revealSections(){

    sections.forEach((section) => {

        const sectionTop =
        section.getBoundingClientRect().top;

        if(sectionTop <
        window.innerHeight - 120){

            section.classList.add(
            "show"
            );
        }

    });

}

/* Initial Reveal */

revealSections();
/* Active Navbar */

const navLinks =
document.querySelectorAll(
".nav-links a"
);

window.addEventListener(
"scroll",
() => {

    let current = "";

    sections.forEach((section) => {

        const sectionTop =
        section.offsetTop;

        if(pageYOffset >=
        sectionTop - 200){

            current =
            section.getAttribute("id");
        }

    });

    navLinks.forEach((link) => {

        link.classList.remove(
        "active"
        );

        if(link.getAttribute("href")
        == `#${current}`){

            link.classList.add(
            "active"
            );
        }

    });

});
/* Independent Galleries */

const galleries =
document.querySelectorAll(
".project-gallery"
);

galleries.forEach((gallery) => {

    const images =
    gallery.querySelectorAll("img");

    let current = 0;

    /* Show first image */

    images[current]
    .classList.add(
    "active-image"
    );

    /* Slider */

    setInterval(() => {

        images[current]
        .classList.remove(
        "active-image"
        );

        current =
        (current + 1)
        % images.length;

        images[current]
        .classList.add(
        "active-image"
        );

    }, 1800);

});
/* Mobile Menu */

const menuToggle =
document.querySelector(
".menu-toggle"
);

const mobilenav =
document.querySelector(
".nav-links"
);

menuToggle.addEventListener(
"click",
() => {

    mobilenav.classList.toggle(
    "active"
    );

});
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json"
            }
        });

        if (response.ok) {
            status.textContent = "Message sent successfully!";
            form.reset();
        } else {
            status.textContent = "Something went wrong. Please try again.";
        }

    } catch (error) {
        status.textContent = "Something went wrong. Please try again.";
    }
});
const contactForm = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    const formData = new FormData(contactForm);

    try {
        const response = await fetch(contactForm.action, {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json"
            }
        });

        if (response.ok) {

            contactForm.reset();

            submitBtn.textContent = "✓ Message Sent";

            formStatus.style.display = "flex";

            setTimeout(() => {
                formStatus.style.display = "none";
                submitBtn.textContent = "Send Message";
                submitBtn.disabled = false;
            }, 4000);

        } else {

            submitBtn.textContent = "Try Again";
            submitBtn.disabled = false;

        }

    } catch (error) {

        submitBtn.textContent = "Try Again";
        submitBtn.disabled = false;

    }
});