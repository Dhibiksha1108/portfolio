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

    if(current){

        const matchingLink = Array.from(navLinks).find((link) => link.getAttribute("href") === `#${current}`);

        if(matchingLink){

            navLinks.forEach((link) => {

                link.classList.remove(
                "active"
                );

            });

            matchingLink.classList.add(
            "active"
            );
        }
    }

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
const contactForm = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");
const formStatus = document.getElementById("form-status");

if (contactForm && submitBtn) {
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

                if (formStatus) formStatus.style.display = "flex";

                setTimeout(() => {
                    if (formStatus) formStatus.style.display = "none";
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
}


/* Safe Project Carousel (supports 1 or multiple images) */
const allGalleries = document.querySelectorAll(".project-gallery");

allGalleries.forEach((gallery) => {
    const images = gallery.querySelectorAll("img");
    if (images.length > 0) {
        images[0].classList.add("active-image");
        if (images.length > 1) {
            let current = 0;
            setInterval(() => {
                images[current].classList.remove("active-image");
                current = (current + 1) % images.length;
                images[current].classList.add("active-image");
            }, 1800);
        }
    }
});

/* Project Category Filtering (projects.html) */
const filterButtons = document.querySelectorAll(".filter-btn");
const pageProjectCards = document.querySelectorAll(".projects-grid-page .project-card");
const featuredCard = document.querySelector(".featured-project-container");
const projectsSecHeader = document.querySelector(".projects-section-header");
const emptyState = document.querySelector(".filter-empty-state");

if (filterButtons.length > 0) {
    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            filterButtons.forEach((b) => {
                b.classList.remove("active");
                b.setAttribute("aria-selected", "false");
            });
            btn.classList.add("active");
            btn.setAttribute("aria-selected", "true");

            const filter = btn.getAttribute("data-filter");
            let visibleCount = 0;

            if (featuredCard) {
                const featCats = (featuredCard.getAttribute("data-category") || "").split(" ");
                if (filter === "all" || featCats.includes(filter)) {
                    featuredCard.classList.remove("filtered-out");
                    visibleCount++;
                } else {
                    featuredCard.classList.add("filtered-out");
                }
            }

            pageProjectCards.forEach((card) => {
                const categories = (card.getAttribute("data-category") || "").split(" ");
                if (filter === "all" || categories.includes(filter)) {
                    card.classList.remove("filtered-out");
                    visibleCount++;
                } else {
                    card.classList.add("filtered-out");
                }
            });

            if (projectsSecHeader) {
                if (filter !== "all" && featuredCard && featuredCard.classList.contains("filtered-out")) {
                    projectsSecHeader.style.display = "none";
                } else {
                    projectsSecHeader.style.display = "block";
                }
            }

            if (emptyState) {
                if (visibleCount === 0) {
                    emptyState.classList.add("show");
                } else {
                    emptyState.classList.remove("show");
                }
            }
        });
    });
}

/* Project Details Modal Data & Handlers */
const projectDetailsData = {
    careerlens: {
        category: "AI & ML • Full Stack • Web Development",
        title: "CareerLens AI: Career Profile Analysis & Recommendation Platform",
        desc: "An intelligent profile analysis and career recommendation engine designed specifically for Computer Science & Engineering students and tech professionals. It analyzes resumes, GitHub repositories, and target job descriptions to identify skill gaps and generate actionable career roadmaps.",
        features: [
            "NLP parsing and evidence verification across uploaded resumes and GitHub repositories.",
            "Granular skill gap identification comparing required, matching, missing, and partial skills.",
            "Benchmarked compatibility scoring against realistic tech job descriptions.",
            "Interactive career roadmaps and readiness simulation recommendations.",
            "Microservice architecture linking a React 19 frontend, Express.js REST API, and Python FastAPI NLP service."
        ],
        tech: ["React 19", "TypeScript", "Node.js", "Express.js", "Python FastAPI", "MongoDB", "Tailwind CSS"],
        actions: [
            { label: "GitHub Repo ↗", url: "https://github.com/Dhibiksha1108/CareerLens-AI.git", primary: true }
        ]
    },
    scholarship: {
        category: "Full Stack • Web Development",
        title: "Scholarship Tracker Web Application",
        desc: "A full-stack web application designed to help students discover and manage scholarship opportunities, track eligibility criteria, and bookmark applications through an interactive digital interface.",
        features: [
            "Searchable and filterable scholarship repository organized by category, deadline, and eligibility.",
            "Personalized wishlist system for tracking application milestones and deadlines.",
            "Secure user authentication with session management and user profile customization.",
            "Responsive dashboard connecting React components to a Node.js/Express backend."
        ],
        tech: ["React", "Node.js", "Express.js", "MongoDB", "REST APIs", "CSS3"],
        actions: [
            { label: "Live Demo ↗", url: "https://scholarship-tracker-seven.vercel.app", primary: true },
            { label: "GitHub Repo ↗", url: "https://github.com/Dhibiksha1108/Scholarship_Tracker", primary: false }
        ]
    },
    redundancy: {
        category: "Cloud Computing • Data Analytics",
        title: "Cloud Data Redundancy Removal System",
        desc: "A cloud-based data deduplication system engineered to detect and eliminate duplicate records and redundant files, optimizing cloud storage utilization and reducing network transfer overhead.",
        features: [
            "Hash-based duplicate detection algorithms analyzing file content rather than filenames.",
            "Automated deduplication pipeline for cloud storage repositories and datasets.",
            "Storage savings metrics and efficiency analytics calculated per redundancy cycle.",
            "Secure file handling ensuring zero data loss during redundancy resolution."
        ],
        tech: ["Python", "Cloud Storage", "Deduplication", "Hash Analysis", "File Handling"],
        actions: [
            { label: "GitHub Repo ↗", url: "https://github.com/Dhibiksha1108/CodeAlpha_CloudDataRedundancyRemovalSystem", primary: true }
        ]
    },
    examseating: {
        category: "Full Stack • Web Development",
        title: "Exam Seating Allocation System",
        desc: "An automated university examination management platform designed to organize student seating allocations into classrooms based on departmental rules and anti-cheating regulations.",
        features: [
            "Automated seating matrix generator preventing students from the same department sitting adjacent.",
            "Hall capacity mapping and multi-classroom allocation workflows.",
            "Student roster management with quick search and allocation summaries.",
            "Exportable seating charts formatted for exam day operations."
        ],
        tech: ["Java", "HTML5", "CSS3", "JavaScript", "MySQL", "JDBC"],
        actions: [
            { label: "Academic System (Completed)", url: "", primary: false }
        ]
    },
    landingpage: {
        category: "Web Development",
        title: "Responsive Modern Landing Page",
        desc: "An interactive landing page crafted with clean semantic HTML, modular CSS styling, and vanilla JavaScript interactions, optimized for high performance across all screen sizes.",
        features: [
            "Mobile-responsive drawer navigation with smooth toggle animation.",
            "Fluid layout scaling from mobile viewports to ultra-wide displays.",
            "Accessible UI components adhering to modern web design standards.",
            "Lightweight asset footprint ensuring sub-second load times."
        ],
        tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
        actions: [
            { label: "Live Demo ↗", url: "https://prodigywd01-one.vercel.app/", primary: true },
            { label: "GitHub Repo ↗", url: "https://github.com/Dhibiksha1108/Prodigy_WD_01.git", primary: false }
        ]
    },
    stopwatch: {
        category: "Web Development",
        title: "Interactive Stopwatch Application",
        desc: "A responsive digital stopwatch web application providing millisecond accuracy, lap time logging, split intervals, and clean digital UI controls.",
        features: [
            "High-precision interval timers with start, pause, reset, and lap recording.",
            "Dynamic lap time history table with split time differentials.",
            "Keyboard and touch-friendly controls with tactile active states.",
            "Persistent timer state during active browsing sessions."
        ],
        tech: ["HTML5", "CSS3", "JavaScript", "DOM Manipulation"],
        actions: [
            { label: "Live Demo ↗", url: "https://prodigy-wd-02-xi-eight.vercel.app/", primary: true },
            { label: "GitHub Repo ↗", url: "https://github.com/Dhibiksha1108/Prodigy_WD_02.git", primary: false }
        ]
    },
    tictactoe: {
        category: "Web Development",
        title: "Tic Tac Toe Web Game",
        desc: "An interactive browser-based Tic Tac Toe game featuring real-time turn tracking, winning combination detection, score persistence, and board reset capability.",
        features: [
            "Algorithmic win and draw evaluation across all 8 winning matrix combinations.",
            "Dynamic turn indicator and cumulative round score tracker.",
            "Winning tile highlight animation and instant reset controls.",
            "Mobile-optimized touch grid with responsive feedback."
        ],
        tech: ["HTML5", "CSS3", "JavaScript", "Game Logic"],
        actions: [
            { label: "Live Demo ↗", url: "https://prodigy-wd-03-seven-navy.vercel.app/", primary: true },
            { label: "GitHub Repo ↗", url: "https://github.com/Dhibiksha1108/Prodigy_WD_03.git", primary: false }
        ]
    },
    quotegen: {
        category: "Web Development",
        title: "Dynamic Quote Generator",
        desc: "A sleek quote generator web application delivering inspirational quotes on demand with dynamic DOM updates and animated transitions.",
        features: [
            "Instant randomized quote selection and smooth text transitions.",
            "Clean categorical quote rendering with author attributions.",
            "Responsive minimalist card aesthetic matching dark charcoal palette.",
            "Keyboard shortcut and button triggers for seamless quote rotation."
        ],
        tech: ["HTML5", "CSS3", "JavaScript", "Async Operations"],
        actions: [
            { label: "Live Demo ↗", url: "https://quote-generator-nu-mocha.vercel.app/", primary: true },
            { label: "GitHub Repo ↗", url: "https://github.com/Dhibiksha1108/quote-generator.git", primary: false }
        ]
    }
};

const modal = document.getElementById("project-modal");
const modalCategory = document.getElementById("modal-category");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-description");
const modalFeatures = document.getElementById("modal-features");
const modalTech = document.getElementById("modal-tech");
const modalActions = document.getElementById("modal-actions");

function openProjectModal(projectId) {
    const data = projectDetailsData[projectId];
    if (!data || !modal) return;

    modalCategory.textContent = data.category;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;

    modalFeatures.innerHTML = "";
    data.features.forEach((feat) => {
        const li = document.createElement("li");
        li.textContent = feat;
        modalFeatures.appendChild(li);
    });

    modalTech.innerHTML = "";
    data.tech.forEach((t) => {
        const span = document.createElement("span");
        span.textContent = t;
        modalTech.appendChild(span);
    });

    modalActions.innerHTML = "";
    data.actions.forEach((act) => {
        if (act.url) {
            const a = document.createElement("a");
            a.href = act.url;
            a.target = "_blank";
            a.rel = "noopener noreferrer";
            a.className = act.primary ? "proj-btn demo-btn" : "proj-btn github-btn";
            a.textContent = act.label;
            modalActions.appendChild(a);
        } else {
            const span = document.createElement("span");
            span.className = "proj-badge";
            span.textContent = act.label;
            modalActions.appendChild(span);
        }
    });

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeProjectModal() {
    if (!modal) return;
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

// Attach listeners to all detail buttons
document.querySelectorAll(".details-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const pid = btn.getAttribute("data-project-id");
        if (pid) {
            e.preventDefault();
            openProjectModal(pid);
        }
    });
});

if (modal) {
    const closeBtn = modal.querySelector(".modal-close");
    const backdrop = modal.querySelector(".modal-backdrop");
    if (closeBtn) closeBtn.addEventListener("click", closeProjectModal);
    if (backdrop) backdrop.addEventListener("click", closeProjectModal);

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            closeProjectModal();
        }
    });
}
