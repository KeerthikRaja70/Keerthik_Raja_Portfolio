/**
 * KEERTHIK RAJA - DATA ANALYST PORTFOLIO ENGINE
 * Vanilla JS (ES6) - Zero External Libraries
 */

// 1. GLOBAL CONFIGURATION & STATE
// Gemini API is now proxied securely through the backend /api/gemini endpoint


let profileData = null;
let currentTheme = 'dark';
let activeProjectIndex = 0;
let activeProjectImageIndex = 0;

// ==========================================
// 2. SYSTEM BOOT & PRELOADER ANIMATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    initPreloader();
    setupCursorGlow();
    setupScrollEffects();
    setupMobileMenu();
    setupThemeToggle();
    setupClipboardCopy();
    loadProfileData();
});

function initPreloader() {
    const preloader = document.getElementById("preloader");
    const progressBar = document.getElementById("loader-progress-bar");
    const progressText = document.getElementById("loader-text");
    const consoleLogs = document.getElementById("loader-console");
    
    const logs = [
        "&gt; Initializing analytical engine...",
        "&gt; Mounting database schemas...",
        "&gt; Parsing SQL queries (6,000 securitisation rows mapped)...",
        "&gt; Synthesizing custom DAX calculations...",
        "&gt; Integrating Python Pandas & NumPy libraries...",
        "&gt; Mapping Gemini AI Assistant knowledge model...",
        "&gt; System check: 100% OK. Establishing connection...",
        "&gt; Welcome back, Keerthik Raja. Access granted."
    ];
    
    let progress = 0;
    let logIndex = 0;
    
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 8) + 3;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `Loading System: ${progress}%`;
        
        // Render logs relative to progress
        if (progress > (logIndex + 1) * (100 / logs.length) && logIndex < logs.length) {
            const line = document.createElement("div");
            line.className = "loader-console-line";
            line.innerHTML = logs[logIndex];
            consoleLogs.appendChild(line);
            consoleLogs.scrollTop = consoleLogs.scrollHeight;
            logIndex++;
        }
        
        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                preloader.style.opacity = 0;
                setTimeout(() => {
                    preloader.style.display = "none";
                    triggerHeroAnimations();
                }, 500);
            }, 800);
        }
    }, 80);
}

function triggerHeroAnimations() {
    // Animate stats numbers in the Hero Section
    const counters = document.querySelectorAll(".counter-num");
    counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        let current = 0;
        const increment = target / 60; // 60fps animate over 1s
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        updateCounter();
    });
}

// ==========================================
// 3. CURSOR SPOTLIGHT & SCROLL EFFECT LOGIC
// ==========================================
function setupCursorGlow() {
    const glow = document.getElementById("cursor-glow");
    window.addEventListener("mousemove", e => {
        glow.style.setProperty("--x", `${e.clientX}px`);
        glow.style.setProperty("--y", `${e.clientY}px`);
    });
}

function setupScrollEffects() {
    const scrollBar = document.getElementById("scroll-progress");
    const header = document.querySelector("header");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");
    
    window.addEventListener("scroll", () => {
        // 1. Scroll progress bar
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        const currentScroll = window.scrollY;
        const scrollPercentage = (currentScroll / totalScroll) * 100;
        scrollBar.style.width = `${scrollPercentage}%`;
        
        // 2. Header blur shadow toggle
        if (window.scrollY > 50) {
            header.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.3)";
        } else {
            header.style.boxShadow = "none";
        }
        
        // 3. Active menu highlights based on viewport position
        let currentSectionId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute("id");
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });
}

function setupMobileMenu() {
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    
    menuToggle.addEventListener("click", () => {
        const expanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", !expanded);
        navMenu.classList.toggle("active");
        menuToggle.querySelector("i").className = expanded ? "bx bx-menu" : "bx bx-x";
    });
    
    // Close mobile menu on clicking any navigation item
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.querySelector("i").className = "bx bx-menu";
        });
    });
}

function setupThemeToggle() {
    const toggleBtn = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    
    toggleBtn.addEventListener("click", () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);
        themeIcon.className = currentTheme === 'dark' ? "bx bx-moon" : "bx bx-sun";
    });
}

// ==========================================
// 4. DATA MODEL INITIALIZATION & RENDERING
// ==========================================
async function loadProfileData() {
    try {
        const response = await fetch("assets/json/profile.json");
        if (!response.ok) throw new Error("Local profile fetch error");
        profileData = await response.json();
    } catch (e) {
        console.warn("Could not fetch profile.json, compiling local backup context", e);
        // Failover backup structured profile
        profileData = getBackupProfile();
    }
    
    initializePortfolioContent();
}

function initializePortfolioContent() {
    renderSkillsDeck();
    renderExperienceTimeline();
    renderProjectsGrid();
    renderCertifications();
    renderAchievements();
    setupModals();
    setupProjectFilters();
    setupAIAssistant();
}

// Render Skills grid system
function renderSkillsDeck() {
    const deck = document.getElementById("skills-deck");
    deck.innerHTML = "";
    
    for (const [category, skillArray] of Object.entries(profileData.skills)) {
        const catBox = document.createElement("div");
        catBox.className = "skills-category-box";
        
        const catTitle = document.createElement("h3");
        catTitle.className = "skills-category-title";
        catTitle.textContent = category;
        catBox.appendChild(catTitle);
        
        const badgesWrap = document.createElement("div");
        badgesWrap.className = "skills-badges-wrap";
        
        skillArray.forEach(skill => {
            const badge = document.createElement("button");
            badge.className = "skill-badge";
            badge.setAttribute("role", "button");
            badge.innerHTML = `<i class="bx bx-bolt-circle"></i> ${skill.name}`;
            
            badge.addEventListener("click", () => {
                // Remove active classes
                document.querySelectorAll(".skill-badge").forEach(b => b.classList.remove("active"));
                badge.classList.add("active");
                inspectSkill(category, skill);
            });
            badgesWrap.appendChild(badge);
        });
        
        catBox.appendChild(badgesWrap);
        deck.appendChild(catBox);
    }
    
    // Auto-inspect the first skill (Power BI)
    const firstCat = Object.keys(profileData.skills)[0];
    const firstSkill = profileData.skills[firstCat][0];
    inspectSkill(firstCat, firstSkill);
    const firstBadge = deck.querySelector(".skill-badge");
    if (firstBadge) firstBadge.classList.add("active");
}

function inspectSkill(category, skill) {
    document.getElementById("inspect-category").textContent = category;
    document.getElementById("inspect-name").textContent = skill.name;
    document.getElementById("inspect-desc").textContent = skill.desc;
    document.getElementById("inspect-level").textContent = skill.level;
    document.getElementById("inspect-score-num").textContent = `${skill.score}%`;
    document.getElementById("inspect-progress").style.width = `${skill.score}%`;
}

// Render work experience timeline
function renderExperienceTimeline() {
    const timeline = document.getElementById("experience-timeline");
    timeline.innerHTML = "";
    
    profileData.experience.forEach(exp => {
        const item = document.createElement("div");
        item.className = "timeline-item";
        
        const marker = document.createElement("div");
        marker.className = "timeline-marker";
        item.appendChild(marker);
        
        const content = document.createElement("div");
        content.className = "timeline-content";
        
        const header = document.createElement("div");
        header.className = "timeline-header";
        
        const titleWrap = document.createElement("div");
        const role = document.createElement("h4");
        role.className = "timeline-role";
        role.textContent = exp.role;
        
        const org = document.createElement("div");
        org.className = "timeline-org";
        org.textContent = exp.company;
        titleWrap.appendChild(role);
        titleWrap.appendChild(org);
        
        const period = document.createElement("span");
        period.className = "timeline-period";
        period.textContent = exp.period;
        
        header.appendChild(titleWrap);
        header.appendChild(period);
        content.appendChild(header);
        
        const list = document.createElement("ul");
        list.className = "timeline-bullets";
        exp.highlights.forEach(hl => {
            const li = document.createElement("li");
            li.textContent = hl;
            list.appendChild(li);
        });
        
        content.appendChild(list);
        item.appendChild(content);
        timeline.appendChild(item);
    });
}

// Render dynamic project cards
function renderProjectsGrid(filterTech = "all", searchText = "") {
    const grid = document.getElementById("projects-grid");
    grid.innerHTML = "";
    
    profileData.projects.forEach((proj, index) => {
        // Tech filtering check
        const matchTech = filterTech === "all" || 
            proj.technologies.some(t => t.toLowerCase() === filterTech.toLowerCase());
            
        // Search text matching check
        const matchSearch = searchText === "" ||
            proj.title.toLowerCase().includes(searchText.toLowerCase()) ||
            proj.client.toLowerCase().includes(searchText.toLowerCase()) ||
            proj.details.description.toLowerCase().includes(searchText.toLowerCase()) ||
            proj.technologies.some(t => t.toLowerCase().includes(searchText.toLowerCase()));
            
        if (!matchTech || !matchSearch) return;
        
        const card = document.createElement("div");
        card.className = "project-card";
        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");
        card.setAttribute("aria-label", `View details for project: ${proj.title}`);
        
        const imgWrap = document.createElement("div");
        imgWrap.className = "project-card-image-wrap";
        
        if (proj.isConfidential) {
            imgWrap.innerHTML = `
                <div class="confidential-overlay">
                    <i class="bx bx-shield-quarter"></i>
                    <h4>Confidential Case Study</h4>
                    <p>Visual assets suppressed under NDAs</p>
                </div>
            `;
        } else {
            imgWrap.innerHTML = `<img src="${proj.images[0]}" alt="${proj.title} cover" class="project-card-img" loading="lazy">`;
        }
        card.appendChild(imgWrap);
        
        const body = document.createElement("div");
        body.className = "project-card-body";
        
        const meta = document.createElement("div");
        meta.className = "project-card-meta";
        meta.innerHTML = `
            <span class="project-card-client">${proj.client}</span>
            <span class="badge-status" style="font-size: 0.65rem;">Active Target</span>
        `;
        body.appendChild(meta);
        
        const title = document.createElement("h3");
        title.className = "project-card-title";
        title.textContent = proj.title;
        body.appendChild(title);
        
        const desc = document.createElement("p");
        desc.className = "project-card-desc";
        desc.textContent = proj.details.description.length > 120 ? 
            `${proj.details.description.substring(0, 117)}...` : 
            proj.details.description;
        body.appendChild(desc);
        
        const tags = document.createElement("div");
        tags.className = "project-card-tags";
        proj.technologies.forEach(tech => {
            const tag = document.createElement("span");
            tag.className = "tech-tag";
            tag.textContent = tech;
            tags.appendChild(tag);
        });
        body.appendChild(tags);
        
        const footer = document.createElement("div");
        footer.className = "project-card-footer";
        
        // Define simulated business outcomes based on achievements
        let outcomeText = "Insight Adopted";
        if (proj.title.includes("E-Commerce")) outcomeText = "12% Category Growth";
        if (proj.title.includes("Securitisation")) outcomeText = "6k Accounts Audited";
        if (proj.title.includes("Retail")) outcomeText = "Seasonal Shifts Found";
        
        footer.innerHTML = `
            <span class="project-card-impact"><i class="bx bx-trending-up"></i> ${outcomeText}</span>
            <span class="project-card-link">Analyze Details <i class="bx bx-right-arrow-alt"></i></span>
        `;
        body.appendChild(footer);
        card.appendChild(body);
        
        // Click to open detailed case study modal
        card.addEventListener("click", () => openProjectModal(index));
        card.addEventListener("keydown", e => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openProjectModal(index);
            }
        });
        
        grid.appendChild(card);
    });
    
    if (grid.children.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
                <i class="bx bx-search-alt" style="font-size: 3rem; margin-bottom: 1rem; color: var(--gold-primary);"></i>
                <p>No analytical projects match the active search parameters.</p>
            </div>
        `;
    }
}

function setupProjectFilters() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const searchInput = document.getElementById("project-search-input");
    
    let activeFilter = "all";
    
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            activeFilter = btn.getAttribute("data-filter");
            renderProjectsGrid(activeFilter, searchInput.value);
        });
    });
    
    searchInput.addEventListener("input", () => {
        renderProjectsGrid(activeFilter, searchInput.value);
    });
}

// Render dynamic certifications
function renderCertifications() {
    const grid = document.getElementById("certs-grid");
    grid.innerHTML = "";
    
    profileData.certifications.forEach((cert, index) => {
        const card = document.createElement("div");
        card.className = "cert-card";
        
        card.innerHTML = `
            <div>
                <div class="cert-card-header">
                    <i class="bx bx-medal cert-card-icon"></i>
                    <div>
                        <h4 class="cert-card-title">${cert.title}</h4>
                        <span class="cert-card-issuer">${cert.issuer}</span>
                    </div>
                </div>
                <div class="cert-card-meta">
                    <div>Issued: <strong>${cert.issued}</strong></div>
                    <div>Platform: <strong>${cert.platform}</strong></div>
                </div>
            </div>
            <button class="btn btn-secondary btn-verify-trigger" style="width:100%; margin-top: 1rem; padding: 6px 12px; font-size: 0.75rem;">
                <i class="bx bx-shield-quarter"></i> Inspect Credential
            </button>
        `;
        
        card.querySelector(".btn-verify-trigger").addEventListener("click", () => {
            openCertLightbox(index);
        });
        grid.appendChild(card);
    });
}

// Render emerging operational achievements
function renderAchievements() {
    const grid = document.getElementById("achievements-grid");
    grid.innerHTML = "";
    
    profileData.achievements.forEach(ach => {
        const card = document.createElement("div");
        card.className = "achievement-card";
        
        card.innerHTML = `
            <i class="bx bx-network-chart achievement-icon"></i>
            <div>
                <h4 class="achievement-title">${ach.title}</h4>
                <p class="achievement-desc">${ach.desc}</p>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ==========================================
// 5. MODALS, GALLERIES & INTERACTIVE LIGHTBOX
// ==========================================
function setupModals() {
    const projectModal = document.getElementById("project-modal");
    const certModal = document.getElementById("cert-lightbox");
    
    // Close on overlay clicks
    projectModal.addEventListener("click", e => {
        if (e.target === projectModal) closeProjectModal();
    });
    certModal.addEventListener("click", e => {
        if (e.target === certModal) closeCertLightbox();
    });
    
    // Close on button clicks
    document.getElementById("modal-close").addEventListener("click", closeProjectModal);
    document.getElementById("cert-lightbox-close").addEventListener("click", closeCertLightbox);
    
    // Gallery Carousel Navigation
    document.getElementById("modal-carousel-prev").addEventListener("click", () => {
        navigateProjectImage(-1);
    });
    document.getElementById("modal-carousel-next").addEventListener("click", () => {
        navigateProjectImage(1);
    });
    
    // Interactive Zoom Toggle on Active Image click
    const viewport = document.getElementById("modal-gallery-viewport");
    viewport.addEventListener("click", e => {
        // Prevent click if clicking carousel arrows
        if (e.target.closest(".carousel-btn")) return;
        viewport.classList.toggle("zoomed");
    });
}

function openProjectModal(index) {
    activeProjectIndex = index;
    activeProjectImageIndex = 0;
    
    const proj = profileData.projects[index];
    const modal = document.getElementById("project-modal");
    
    // Render static fields
    document.getElementById("modal-title").textContent = proj.title;
    document.getElementById("modal-badge").textContent = proj.client;
    document.getElementById("modal-desc").textContent = proj.details.description;
    
    document.getElementById("modal-val-role").textContent = proj.details.role;
    document.getElementById("modal-val-duration").textContent = proj.details.duration;
    document.getElementById("modal-val-source").textContent = proj.details.dataSource;
    document.getElementById("modal-val-objective").textContent = proj.details.objective;
    
    // Render outcomes list
    const insightsList = document.getElementById("modal-insights-list");
    insightsList.innerHTML = "";
    proj.details.achievements.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        insightsList.appendChild(li);
    });
    
    // Render tech tag badges
    const techWrap = document.getElementById("modal-tech-badges");
    techWrap.innerHTML = "";
    proj.technologies.forEach(t => {
        const badge = document.createElement("span");
        badge.className = "tech-tag";
        badge.textContent = t;
        techWrap.appendChild(badge);
    });
    
    // Render image gallery
    const viewport = document.getElementById("modal-gallery-viewport");
    viewport.classList.remove("zoomed"); // Reset zoom state
    
    const activeImg = document.getElementById("modal-active-img");
    const prevBtn = document.getElementById("modal-carousel-prev");
    const nextBtn = document.getElementById("modal-carousel-next");
    const thumbsWrap = document.getElementById("modal-gallery-thumbs");
    
    if (proj.isConfidential) {
        // Suppress image carousel structure for confidential items
        activeImg.src = "";
        activeImg.style.display = "none";
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
        thumbsWrap.innerHTML = "";
        
        viewport.innerHTML = `
            <div class="confidential-overlay" style="position:static; height: 100%; min-height: 280px;">
                <i class="bx bx-lock-alt" style="font-size: 4rem;"></i>
                <h4 style="margin-top:1rem;">Access Restricted</h4>
                <p style="font-size: 0.8rem; max-width: 250px;">Visual dashboards are suppressed under confidentiality agreements.</p>
            </div>
        `;
    } else {
        // Re-inject regular image gallery view structure
        viewport.innerHTML = `
            <img src="${proj.images[0]}" alt="${proj.title}" id="modal-active-img">
            <button class="carousel-btn prev" id="modal-carousel-prev" aria-label="Previous Slide"><i class="bx bx-chevron-left"></i></button>
            <button class="carousel-btn next" id="modal-carousel-next" aria-label="Next Slide"><i class="bx bx-chevron-right"></i></button>
        `;
        
        // Rebind buttons since HTML was rewritten
        document.getElementById("modal-carousel-prev").addEventListener("click", () => navigateProjectImage(-1));
        document.getElementById("modal-carousel-next").addEventListener("click", () => navigateProjectImage(1));
        
        // Render thumbnails row
        thumbsWrap.innerHTML = "";
        proj.images.forEach((img, idx) => {
            const thumb = document.createElement("img");
            thumb.src = img;
            thumb.className = `gallery-thumb ${idx === 0 ? 'active' : ''}`;
            thumb.alt = `thumb ${idx + 1}`;
            
            thumb.addEventListener("click", () => {
                activeProjectImageIndex = idx;
                updateModalImage();
            });
            thumbsWrap.appendChild(thumb);
        });
        
        // Toggle visibility of sliders
        const pBtn = document.getElementById("modal-carousel-prev");
        const nBtn = document.getElementById("modal-carousel-next");
        if (proj.images.length <= 1) {
            pBtn.style.display = "none";
            nBtn.style.display = "none";
        } else {
            pBtn.style.display = "flex";
            nBtn.style.display = "flex";
        }
    }
    
    modal.classList.add("active");
    document.body.style.overflow = "hidden"; // Block page scroll behind modal
}

function closeProjectModal() {
    const modal = document.getElementById("project-modal");
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
}

function updateModalImage() {
    const proj = profileData.projects[activeProjectIndex];
    const activeImg = document.getElementById("modal-active-img");
    activeImg.src = proj.images[activeProjectImageIndex];
    
    // Update thumbnail active styles
    const thumbs = document.querySelectorAll(".gallery-thumb");
    thumbs.forEach((t, idx) => {
        t.classList.remove("active");
        if (idx === activeProjectImageIndex) t.classList.add("active");
    });
}

function navigateProjectImage(direction) {
    const proj = profileData.projects[activeProjectIndex];
    if (proj.isConfidential) return;
    
    activeProjectImageIndex += direction;
    if (activeProjectImageIndex < 0) {
        activeProjectImageIndex = proj.images.length - 1;
    } else if (activeProjectImageIndex >= proj.images.length) {
        activeProjectImageIndex = 0;
    }
    
    updateModalImage();
}

// Lightbox for credentials
function openCertLightbox(index) {
    const cert = profileData.certifications[index];
    const modal = document.getElementById("cert-lightbox");
    
    document.getElementById("cert-lightbox-title").textContent = cert.title;
    document.getElementById("cert-lightbox-issuer").textContent = cert.issuer;
    document.getElementById("cert-lightbox-img").src = cert.image;
    document.getElementById("cert-val-platform").textContent = cert.platform;
    document.getElementById("cert-val-issued").textContent = cert.issued;
    document.getElementById("cert-val-id").textContent = cert.id;
    
    const verifyBtn = document.getElementById("cert-val-verify-btn");
    if (cert.verifyUrl === "#") {
        verifyBtn.style.display = "none";
    } else {
        verifyBtn.style.display = "inline-flex";
        verifyBtn.href = cert.verifyUrl;
    }
    
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeCertLightbox() {
    const modal = document.getElementById("cert-lightbox");
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
}

// ==========================================
// 6. SUPPORT TICKET CONSOLE FORM HANDLING
// ==========================================
function setupClipboardCopy() {
    const copyEmail = document.getElementById("copy-email-btn");
    const copyPhone = document.getElementById("copy-phone-btn");
    const emailVal = document.getElementById("email-text").textContent;
    const phoneVal = document.getElementById("phone-text").textContent;
    
    copyEmail.addEventListener("click", () => {
        navigator.clipboard.writeText(emailVal).then(() => {
            const icon = copyEmail.querySelector("i");
            icon.className = "bx bx-check";
            icon.style.color = "#00ff00";
            setTimeout(() => {
                icon.className = "bx bx-copy";
                icon.style.color = "";
            }, 2000);
        });
    });
    
    copyPhone.addEventListener("click", () => {
        navigator.clipboard.writeText(phoneVal).then(() => {
            const icon = copyPhone.querySelector("i");
            icon.className = "bx bx-check";
            icon.style.color = "#00ff00";
            setTimeout(() => {
                icon.className = "bx bx-copy";
                icon.style.color = "";
            }, 2000);
        });
    });
    
    // Contact ticket form submission
    const form = document.getElementById("contact-ticket-form");
    form.addEventListener("submit", e => {
        e.preventDefault();
        
        const submitBtn = form.querySelector("button[type='submit']");
        const origHtml = submitBtn.innerHTML;
        submitBtn.innerHTML = `<div class="skeleton-typing" style="justify-content:center"><span class="skeleton-dot"></span><span class="skeleton-dot"></span><span class="skeleton-dot"></span></div>`;
        submitBtn.disabled = true;
        
        fetch(form.action, {
            method: form.method,
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert("Ticket Submitted Successfully! I will get in touch shortly.");
                form.reset();
            } else {
                alert("Submit error. Please try reaching out directly via WhatsApp or Email.");
            }
        })
        .catch(err => {
            console.error("Form submit error:", err);
            alert("Connection error. Check your network or contact me directly.");
        })
        .finally(() => {
            submitBtn.innerHTML = origHtml;
            submitBtn.disabled = false;
        });
    });
}

// ==========================================
// 7. SIGNATURE FLOATING AI CAREER ASSISTANT
// ==========================================
function setupAIAssistant() {
    const trigger = document.getElementById("ai-assistant-trigger");
    const panel = document.getElementById("ai-chat-panel");
    const closeBtn = document.getElementById("ai-chat-close");
    const form = document.getElementById("ai-chat-form");
    const chatInput = document.getElementById("ai-chat-input");
    const chatBody = document.getElementById("ai-chat-body");
    const suggestionsWrap = document.getElementById("ai-chat-suggestions");
    
    // Toggle assistant panel open/close
    trigger.addEventListener("click", () => {
        panel.classList.toggle("active");
        if (panel.classList.contains("active")) {
            chatInput.focus();
        }
    });
    
    closeBtn.addEventListener("click", () => {
        panel.classList.remove("active");
    });
    
    // Handle suggestion chip clicks
    suggestionsWrap.addEventListener("click", e => {
        const chip = e.target.closest(".suggestion-chip");
        if (!chip) return;
        submitUserQuery(chip.textContent);
    });
    
    form.addEventListener("submit", e => {
        e.preventDefault();
        const query = chatInput.value.trim();
        if (query === "") return;
        submitUserQuery(query);
    });
}

function submitUserQuery(query) {
    const chatBody = document.getElementById("ai-chat-body");
    const chatInput = document.getElementById("ai-chat-input");
    
    // Append User Message
    const userMsg = document.createElement("div");
    userMsg.className = "chat-msg user";
    userMsg.textContent = query;
    chatBody.appendChild(userMsg);
    chatInput.value = "";
    
    // Auto-scroll chat body
    chatBody.scrollTop = chatBody.scrollHeight;
    
    // Render Bot Typing Skeleton
    const botLoadingMsg = document.createElement("div");
    botLoadingMsg.className = "chat-msg bot typing-loader";
    botLoadingMsg.innerHTML = `<div class="skeleton-typing"><span class="skeleton-dot"></span><span class="skeleton-dot"></span><span class="skeleton-dot"></span></div>`;
    chatBody.appendChild(botLoadingMsg);
    chatBody.scrollTop = chatBody.scrollHeight;
    
    // Dispatch query to Gemini API
    queryGeminiAPI(query, botLoadingMsg);
}

async function queryGeminiAPI(query, loadingEl) {
    const chatBody = document.getElementById("ai-chat-body");
    
    // Setup request safety timeout of 10 seconds
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    try {
        const response = await fetch(
            `/api/gemini`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: query }),
                signal: controller.signal
            }
        );
        
        clearTimeout(timeoutId);
        
        if (response.status === 429) {
            // Trigger fallback immediately
            throw new Error("Rate limit exceeded");
        }
        
        if (!response.ok) {
            throw new Error(`API returned HTTP ${response.status}`);
        }
        
        const resData = await response.json();
        
        // Remove typing loader
        loadingEl.remove();
        
        let answerText = "";
        if (resData.candidates && resData.candidates[0].content && resData.candidates[0].content.parts) {
            answerText = resData.candidates[0].content.parts[0].text;
        } else {
            answerText = "System could not process response. Using local profile database fallback: Keerthik Raja has expertise in SQL, Power BI (DAX), Python, and Excel. Contact him directly at keerthikbharath29@gmail.com.";
        }
        
        appendBotMessage(answerText);
        
    } catch (err) {
        clearTimeout(timeoutId);
        console.warn("Gemini API call encountered an error, triggering rule-based local failover", err);
        
        // Remove typing loader
        loadingEl.remove();
        
        // Resolve response locally using rule-based keyword matching
        const fallbackText = getLocalFallbackResponse(query);
        appendBotMessage(fallbackText);
    }
}

function appendBotMessage(text) {
    const chatBody = document.getElementById("ai-chat-body");
    const botMsg = document.createElement("div");
    botMsg.className = "chat-msg bot";
    
    // Simple markdown link parser to convert [link](url)
    let parsedText = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" style="text-decoration:underline;color:var(--gold-primary)">$1</a>');
    // Replace newlines with <br>
    parsedText = parsedText.replace(/\n/g, '<br>');
    
    botMsg.innerHTML = parsedText;
    chatBody.appendChild(botMsg);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Rule-based keyword fallback matcher (never fails, even if API key is invalid or offline)
function getLocalFallbackResponse(query) {
    const q = query.toLowerCase();
    
    if (q.includes("who is") || q.includes("summary") || q.includes("about keerthik")) {
        return `Keerthik Raja is a Data Analyst with an Industrial Engineering background. He has 10+ months of experience in SQL, Power BI, Python, and Excel. Contact him at [Email](mailto:keerthikbharath29@gmail.com).`;
    }
    
    if (q.includes("why hire") || q.includes("different") || q.includes("suitable") || q.includes("recommend")) {
        return `Keerthik brings a unique combination of Industrial Engineering process-improvement thinking and advanced Data Analytics skills. He has built automated audit systems and forecasting models that closed a 12% shift shortfall.`;
    }
    
    if (q.includes("power bi") || q.includes("dax") || q.includes("dashboard")) {
        return `Keerthik knows advanced DAX, Power Query, and interactive dashboard design. He built a 6-page Securitisation Portfolio dashboard (Credit risk, recovery, vintage analysis) and a 2-page Retail Sales Analysis dashboard.`;
    }
    
    if (q.includes("sql") || q.includes("queries") || q.includes("database")) {
        return `Keerthik is highly proficient in SQL. He regularly uses Joins, CTEs, Subqueries, aggregations, and schema normalizations to sanitize and restructure raw data files (such as his 6,000+ record securitisation database).`;
    }
    
    if (q.includes("python") || q.includes("pandas") || q.includes("numpy")) {
        return `Yes, Keerthik knows Python. He uses Pandas and NumPy for Exploratory Data Analysis (EDA), numerical operations, and dataset transformations. He is certified in 'Python Data Structures' by University of Michigan.`;
    }
    
    if (q.includes("experience") || q.includes("work") || q.includes("history")) {
        return `Keerthik has worked as an Industrial Engineer at Jay Jay Mills (10 months) and completed Data Analyst Internships at Zatheta Algorithms (securitisation portfolios) and Internship Studio (retail transactions).`;
    }
    
    if (q.includes("forecasting") || q.includes("forecast") || q.includes("variance")) {
        return `Keerthik built shift-level production forecast models in Excel at Jay Jay Mills, consistently closing an average production gap of 12% by the next shift using real-time variance analysis reports.`;
    }
    
    if (q.includes("certification") || q.includes("course")) {
        return `He holds verified certifications: "Python for Everybody" and "Python Data Structures" from University of Michigan, and a "Python Using AI" workshop certificate from AI For Techies.`;
    }
    
    if (q.includes("contact") || q.includes("phone") || q.includes("email") || q.includes("hire him")) {
        return `You can contact Keerthik Raja directly via phone (+91 86103 73797) or email (keerthikbharath29@gmail.com). You can also submit a contact ticket in the Support section below!`;
    }
    
    if (q.includes("retail") || q.includes("retail sales")) {
        return `For the Retail Sales Analysis Dashboard, Keerthik designed a 2-page Power BI dashboard. Due to limited data availability constraints, analysis was focused on baseline operational performance, customer activity, and MoM transaction trends. Key metrics tracked include: 125K total customers, 14K responses, $8M total revenue, and 64.99 average transaction value.`;
    }
    
    if (q.includes("interview") || q.includes("questions")) {
        return `Here are some interview questions based on Keerthik's resume:<br>1. "How did you design your forecast models in Excel to close the 12% shortfall at Jay Jay Mills?"<br>2. "Explain how you modeled the credit risk and vintage analyses in your Securitisation Dashboard."<br>3. "Walk us through a complex SQL query you wrote to clean the e-commerce transaction logs."`;
    }
    
    return `Keerthik Raja is a Data Analyst skilled in Power BI (DAX), SQL (CTEs/Joins), Python (Pandas), and Excel (Forecasting). For details on this question, please submit a Contact Ticket or reach out to him directly at +91 86103 73797.`;
}

// ==========================================
// 8. LOCAL BACKUP PROFILE DATA COMPILER
// ==========================================
function getBackupProfile() {
    return {
        "personal": {
            "name": "Keerthik Raja",
            "role": "Data Analyst",
            "email": "keerthikbharath29@gmail.com",
            "phone": "86103 73797",
            "linkedin": "https://www.linkedin.com/in/keerthik-raja70",
            "location": "Erode, Tamil Nadu, India",
            "summary": "Results-driven Data Analyst with an Industrial Engineering background and 10+ months of hands-on experience."
        },
        "experience": [
            {
                "role": "Data Analyst Intern",
                "company": "Zatheta Algorhithms Private Limited",
                "period": "May 2026 – Jun 2026",
                "highlights": [
                    "Built a 6-page interactive Power BI dashboard to analyze securitisation portfolios, covering Credit Risk, Recovery, and Vintage Performance Analysis.",
                    "Created interactive reports using Power BI, Power Query, and DAX calculations."
                ]
            },
            {
                "role": "Data Analyst Intern",
                "company": "Internship Studio",
                "period": "May 2026 – Jun 2026",
                "highlights": [
                    "Developed a 2-page interactive Power BI dashboard for Retail Sales Data Analysis.",
                    "Transformed retail sales data into business insights, enabling performance tracking."
                ]
            },
            {
                "role": "Industrial Engineer",
                "company": "Jay Jay Mills",
                "period": "Apr 2025 – Feb 2026",
                "highlights": [
                    "Built Excel production forecast models that closed an average 12% shortfall by the following shift.",
                    "Automated operator audits using lookup models, reducing daily assignment mismatches."
                ]
            }
        ],
        "projects": [
            {
                "title": "Securitisation Portfolio Data Analysis",
                "client": "Zatheta Internship",
                "technologies": ["SQL", "Excel", "Power BI", "DAX"],
                "details": {
                    "role": "Data Analyst Intern",
                    "duration": "1 Month",
                    "dataSource": "Securitisation Dataset (6k+ rows)",
                    "objective": "Credit Risk & Recovery Analytics",
                    "description": "Due to confidentiality agreements, dashboard visuals cannot be publicly shared. The analysis covers structured asset-backed securities portfolio health, credit risk metrics, recovery analysis, and vintage performance analysis to evaluate portfolio performance.",
                    "achievements": [
                        "Sanitized 6,000+ record securitisation database using SQL CTEs and Joins.",
                        "Built custom DAX analytics segments for portfolio tracking."
                    ]
                },
                "isConfidential": true
            },
            {
                "title": "Retail Sales Data Analysis",
                "client": "I Studio Internship",
                "technologies": ["SQL", "Excel", "Power BI", "DAX"],
                "details": {
                    "role": "Data Analyst Intern",
                    "duration": "1 Month",
                    "dataSource": "Retail Sales Data",
                    "objective": "MoM sales trend and customer response monitoring",
                    "description": "Developed a 2-page interactive Power BI dashboard for Retail Sales Data Analysis. Due to limited data availability constraints, analysis was focused on baseline operational performance, customer activity, and MoM transaction trends.",
                    "achievements": [
                        "Data Constraint Management: Structured and cleaned a restricted retail dataset, addressing limited data availability to establish baseline operational metrics.",
                        "Operational Metric Tracking: Visualized key KPIs including 125K total customers, 14K responses, 8M total revenue, and 64.99 average transaction value."
                    ]
                },
                "images": [
                    "assets/images/projects/retail/project_1_1.png",
                    "assets/images/projects/retail/project_1_2.png"
                ],
                "isConfidential": false
            },
            {
                "title": "End-to-End E-Commerce Sales Analysis Dashboard",
                "client": "Independent Project",
                "technologies": ["Excel", "SQL", "Power BI", "DAX"],
                "details": {
                    "role": "Data Analyst",
                    "duration": "2 Weeks",
                    "dataSource": "E-Commerce Dataset (1k rows)",
                    "objective": "Identify high-profit focus product categories",
                    "description": "A comprehensive end-to-end sales analysis dashboard that tracks revenue trends, discount implications, product reviews, and category-level profit margins to optimize supply chains and inventory.",
                    "achievements": [
                        "Standardized 1,000 raw transactional logs using SQL features.",
                        "Discovered that the Dresses category generated disproportionately higher revenue relative to SKU count, steering inventory priorities."
                    ]
                },
                "images": [
                    "assets/images/projects/ecommerce/dashboard_1.png",
                    "assets/images/projects/ecommerce/dashboard_2.png",
                    "assets/images/projects/ecommerce/dashboard_3.png",
                    "assets/images/projects/ecommerce/dashboard_4.png",
                    "assets/images/projects/ecommerce/dashboard_5.png"
                ],
                "isConfidential": false
            }
        ],
        "skills": {
            "Analytics & BI": [
                { "name": "Power BI", "level": "Expert", "score": 95, "desc": "Interactive reporting, dashboard layout design, cross-filtering" },
                { "name": "DAX", "level": "Advanced", "score": 90, "desc": "Calculated measures, filter logic, time intelligence" }
            ],
            "Database & Wrangling": [
                { "name": "SQL", "level": "Advanced", "score": 92, "desc": "Joins, CTEs, subqueries, schema management" }
            ]
        },
        "certifications": [
            {
                "title": "Python for Everybody",
                "issuer": "University of Michigan",
                "platform": "Coursera",
                "id": "74INF9E841LI",
                "issued": "Jan 2026",
                "image": "assets/images/certificates/Programming For Everybody.jpg",
                "verifyUrl": "https://coursera.org/verify/74INF9E841LI"
            }
        ],
        "achievements": [
            { "title": "Workflow Automation Using AI", "desc": "Built scripts utilizing AI tools to automate repetitive tasks." }
        ]
    };
}
