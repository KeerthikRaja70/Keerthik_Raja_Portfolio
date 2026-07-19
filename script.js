/**
 * KR | DATA ANALYTICS PORTFOLIO CONTROLLER
 * Vanilla JS (ES6) - Secure API proxy & BI UI interactions
 */

// GLOBAL CONFIGURATION & STATE
let profileData = null;
let currentTheme = 'dark';

// SYSTEM BOOT
document.addEventListener("DOMContentLoaded", () => {
    initPreloader();
    setupCursorGlow();
    setupScrollEffects();
    setupMobileMenu();
    setupThemeToggle();
    setupClipboardCopy();
    setupCertificateSecurity();
    loadProfileData();
});

// 1. PRELOADER ANIMATION
function initPreloader() {
    const preloader = document.getElementById("preloader");
    const progressBar = document.getElementById("loader-progress-bar");
    const progressText = document.getElementById("loader-text");
    const consoleLogs = document.getElementById("loader-console");
    
    const logs = [
        "&gt; Fetching profile.json configuration data...",
        "&gt; Verifying secure backend proxy /api/gemini connection...",
        "&gt; Loading Excel variance analysis templates...",
        "&gt; Parsing SQL Common Table Expressions & table schemas...",
        "&gt; Mounting Power BI Dax expressions...",
        "&gt; Booting interactive visual components...",
        "&gt; System check: 100% OK. Welcome Keerthik Raja."
    ];
    
    let progress = 0;
    let logIndex = 0;
    
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 8) + 4;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `Loading Dashboard: ${progress}%`;
        
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
                    triggerKPIAnimations();
                    setupSkillsAnimation();
                    // AUTO TRIGGER AI REPRESENTATIVE CHAT WIDGET
                    triggerAIChatAutoPopup();
                }, 400);
            }, 600);
        }
    }, 60);
}

// 2. CURSOR SPOTLIGHT & SCROLL EFFECT LOGIC
function setupCursorGlow() {
    const glow = document.getElementById("cursor-glow");
    window.addEventListener("mousemove", e => {
        glow.style.setProperty("--x", `${e.clientX}px`);
        glow.style.setProperty("--y", `${e.clientY}px`);
    });
}

// Scroll progress and active link trackers
function setupScrollEffects() {
    const scrollBar = document.getElementById("scroll-progress");
    const header = document.querySelector("header");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");
    
    window.addEventListener("scroll", () => {
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        const currentScroll = window.scrollY;
        const scrollPercentage = (currentScroll / totalScroll) * 100;
        if (scrollBar) scrollBar.style.width = `${scrollPercentage}%`;
        
        // Header shadow
        if (header) {
            if (window.scrollY > 30) {
                header.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.4)";
            } else {
                header.style.boxShadow = "none";
            }
        }
        
        // Active section highlighters
        let currentSectionId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
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
    
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener("click", () => {
        const expanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", !expanded);
        navMenu.classList.toggle("active");
        menuToggle.querySelector("i").className = expanded ? "bx bx-menu" : "bx bx-x";
    });
    
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
    
    if (!toggleBtn || !themeIcon) return;
    
    toggleBtn.addEventListener("click", () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);
        themeIcon.className = currentTheme === 'dark' ? "fa-solid fa-moon" : "fa-solid fa-sun";
    });
}

// 3. LOAD METADATA
async function loadProfileData() {
    try {
        const response = await fetch("assets/json/profile.json");
        if (!response.ok) throw new Error("Local profile fetch error");
        profileData = await response.json();
    } catch (e) {
        console.warn("Could not fetch profile.json, compiling local backup context", e);
        profileData = getBackupProfile();
    }
    
    initializePortfolioContent();
}

function initializePortfolioContent() {
    renderExperienceTimeline();
    renderAIAchievements();
    renderProjectsGrid();
    renderCertifications();
    setupModals();
    setupAIAssistant();
}

// 4. ANIMATE KPI TICKERS & SKILLS PROGRESS
function triggerKPIAnimations() {
    const counters = document.querySelectorAll(".counter-num");
    counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        let current = 0;
        const increment = target / 50; // duration ticks
        
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

function setupSkillsAnimation() {
    const progressSpans = document.querySelectorAll(".progress-track span");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const span = entry.target;
                const width = span.style.width;
                span.style.width = "0%";
                setTimeout(() => {
                    span.style.width = width;
                    span.style.transition = "width 1.5s cubic-bezier(0.1, 0.8, 0.2, 1)";
                }, 150);
                observer.unobserve(span);
            }
        });
    }, { threshold: 0.1 });
    
    progressSpans.forEach(span => observer.observe(span));
}

// 5. RENDERING DYNAMIC PORTFOLIO NODES
function renderExperienceTimeline() {
    const timeline = document.getElementById("experience-timeline");
    if (!timeline) return;
    timeline.innerHTML = "";
    
    profileData.experience.forEach((exp) => {
        const node = document.createElement("div");
        node.className = "timeline-node";
        
        const isIE = exp.role.includes("Industrial");
        const isElec = exp.role.includes("Electrician");
        const badgeColor = isIE ? "bg-gold" : (isElec ? "bg-gold" : "bg-blue");
        const badgeIcon = isIE ? "bx-cog" : (isElec ? "bx-wrench" : "bx-line-chart");
        
        let highlightsHtml = "";
        exp.highlights.forEach(h => {
            highlightsHtml += `
                <li class="timeline-bullet-item">
                    <i class="bx bx-check-circle timeline-bullet-icon"></i>
                    <span>${h}</span>
                </li>
            `;
        });
        
        node.innerHTML = `
            <div class="timeline-badge-icon ${badgeColor}"><i class="bx ${badgeIcon}"></i></div>
            <div class="timeline-card">
                <div class="timeline-card-header">
                    <div>
                        <h3 class="timeline-role-name">${exp.role}</h3>
                        <span class="timeline-company-name">${exp.company}</span>
                    </div>
                    <span class="timeline-date-badge">${exp.period}</span>
                </div>
                <ul class="timeline-bullets-list">
                    ${highlightsHtml}
                </ul>
            </div>
        `;
        timeline.appendChild(node);
    });
}

function renderAIAchievements() {
    const aiProjectsContainer = document.getElementById("ai-projects-container");
    const container = document.getElementById("ai-achievements-container");
    
    // Render AI & Automation projects in achievements grid
    if (aiProjectsContainer) {
        aiProjectsContainer.innerHTML = "";
        const aiProjects = profileData.projects.filter(p => p.category === "Automation" || p.category === "AI Development");
        
        aiProjects.forEach((proj) => {
            const index = profileData.projects.findIndex(p => p.title === proj.title);
            const card = document.createElement("div");
            card.className = "project-card-dashboard";
            
            card.innerHTML = `
                <div class="project-card-img-wrap">
                    <img src="${proj.image}" alt="${proj.title}" loading="lazy">
                </div>
                <div class="project-card-content">
                    <div class="project-card-hdr">
                        <span class="project-category">${proj.category}</span>
                    </div>
                    <h3 class="project-title-dash">${proj.title}</h3>
                    <p class="project-problem-text">${proj.problem}</p>
                    <div class="project-tools-used">
                        Tools: ${proj.tools.split(" | ").map(t => `<span>${t}</span>`).join("")}
                    </div>
                    <div class="project-links-row">
                        <button class="btn btn-primary btn-solution-trigger">Business Solution</button>
                        <a href="${proj.githubUrl}" target="_blank" class="btn btn-secondary"><i class="fab fa-github"></i> View GitHub</a>
                    </div>
                </div>
            `;
            
            card.querySelector(".btn-solution-trigger").addEventListener("click", () => {
                openSolutionLightbox(index);
            });
            
            aiProjectsContainer.appendChild(card);
        });
    }
    
    // Render text highlights
    if (container) {
        container.innerHTML = "";
        const icons = [
            "bx-cog",
            "bx-support",
            "bx-plug",
            "bx-rocket",
            "bx-brain"
        ];
        
        profileData.aiAchievements.forEach((ach, index) => {
            const card = document.createElement("div");
            card.className = "ai-achievement-card";
            const iconClass = icons[index % icons.length];
            
            card.innerHTML = `
                <div class="ai-ach-icon"><i class="bx ${iconClass}"></i></div>
                <div class="ai-ach-text">${ach}</div>
            `;
            container.appendChild(card);
        });
    }
}

function renderProjectsGrid() {
    const container = document.getElementById("projects-container");
    if (!container) return;
    container.innerHTML = "";
    
    // Render main business dashboards only (Retail, E-commerce, Securitisation)
    const mainProjects = profileData.projects.filter(p => p.category !== "Automation" && p.category !== "AI Development");
    
    mainProjects.forEach((proj) => {
        const index = profileData.projects.findIndex(p => p.title === proj.title);
        const card = document.createElement("div");
        card.className = "project-card-dashboard";
        
        let visualHtml = "";
        if (proj.isConfidential) {
            visualHtml = `
                <div class="confidential-card-overlay">
                    <i class="bx bx-shield-quarter"></i>
                    <span class="confidential-badge">Confidential Project</span>
                    <p style="font-size: 0.72rem; color: var(--text-muted);">Visual assets suppressed under NDAs</p>
                </div>
            `;
        } else {
            visualHtml = `
                <img src="${proj.image}" alt="${proj.title}" loading="lazy">
            `;
        }
        
        card.innerHTML = `
            <div class="project-card-img-wrap">
                ${visualHtml}
            </div>
            <div class="project-card-content">
                <div class="project-card-hdr">
                    <span class="project-category">${proj.category}</span>
                    ${proj.isConfidential ? '<span class="confidential-badge" style="font-size:0.6rem;">Confidential</span>' : ''}
                </div>
                <h3 class="project-title-dash">${proj.title}</h3>
                <p class="project-problem-text">${proj.problem}</p>
                <div class="project-tools-used">
                    Tools: ${proj.tools.split(" | ").map(t => `<span>${t}</span>`).join("")}
                </div>
                <div class="project-links-row">
                    <button class="btn btn-primary btn-solution-trigger">Business Solution</button>
                    <a href="${proj.githubUrl}" target="_blank" class="btn btn-secondary"><i class="fab fa-github"></i> View GitHub</a>
                </div>
            </div>
        `;
        
        card.querySelector(".btn-solution-trigger").addEventListener("click", () => {
            openSolutionLightbox(index);
        });
        
        container.appendChild(card);
    });
}

function renderCertifications() {
    const container = document.getElementById("certifications-container");
    if (!container) return;
    container.innerHTML = "";
    
    profileData.certifications.forEach((cert, index) => {
        const card = document.createElement("div");
        card.className = "certificate-card";
        
        let imageHtml = "";
        if (cert.image) {
            imageHtml = `<img src="${cert.image}" alt="${cert.title}">`;
            card.setAttribute("tabindex", "0");
            card.setAttribute("role", "button");
            card.setAttribute("aria-label", `View certificate for ${cert.title}`);
            card.addEventListener("click", () => openCertLightbox(index));
            card.addEventListener("keydown", e => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openCertLightbox(index);
                }
            });
        } else {
            imageHtml = `<div class="cert-placeholder-icon"><i class="bx bx-briefcase"></i></div>`;
            card.style.cursor = "default";
        }
        
        // Wrapped text details in certificate-info to force vertical block flow layout
        card.innerHTML = `
            ${imageHtml}
            <div class="certificate-info">
                <h3>${cert.title}</h3>
                <p><strong>Platform:</strong> ${cert.platform}</p>
                <p class="cert-skills-line"><strong>Skills:</strong> ${cert.skillsGained}</p>
                <p class="cert-date-line">${cert.completionDetails}</p>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// 6. LIGHTBOX MODALS
function setupModals() {
    // Cert modal Close actions
    const certModal = document.getElementById("cert-lightbox");
    if (certModal) {
        certModal.addEventListener("click", e => {
            if (e.target === certModal) closeCertLightbox();
        });
        document.getElementById("cert-lightbox-close").addEventListener("click", closeCertLightbox);
    }
    
    // Solution modal Close actions
    const solModal = document.getElementById("solution-lightbox");
    if (solModal) {
        solModal.addEventListener("click", e => {
            if (e.target === solModal) closeSolutionLightbox();
        });
        document.getElementById("solution-lightbox-close").addEventListener("click", closeSolutionLightbox);
    }
}

function openCertLightbox(index) {
    const cert = profileData.certifications[index];
    const modal = document.getElementById("cert-lightbox");
    if (!modal) return;
    
    document.getElementById("cert-lightbox-title").textContent = cert.title;
    document.getElementById("cert-lightbox-issuer").textContent = cert.issuer;
    document.getElementById("cert-lightbox-img").src = cert.image;
    document.getElementById("cert-val-platform").textContent = cert.platform;
    document.getElementById("cert-val-details").textContent = cert.completionDetails;
    document.getElementById("cert-val-skills").textContent = cert.skillsGained;
    
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeCertLightbox() {
    const modal = document.getElementById("cert-lightbox");
    if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
    }
}

function openSolutionLightbox(index) {
    const proj = profileData.projects[index];
    const modal = document.getElementById("solution-lightbox");
    if (!modal) return;
    
    document.getElementById("solution-lightbox-title").textContent = proj.title;
    document.getElementById("solution-modal-category").textContent = proj.category;
    document.getElementById("solution-github-link").href = proj.githubUrl;
    
    // Populate Business Questions
    const questionsList = document.getElementById("solution-questions-list");
    questionsList.innerHTML = "";
    proj.questions.forEach(q => {
        questionsList.innerHTML += `<li>${q}</li>`;
    });
    
    // Populate Data Findings
    const findingsList = document.getElementById("solution-findings-list");
    findingsList.innerHTML = "";
    proj.findings.forEach(f => {
        findingsList.innerHTML += `<li>${f}</li>`;
    });
    
    // Populate Business Recommendations
    const recsList = document.getElementById("solution-recommendations-list");
    recsList.innerHTML = "";
    proj.recommendations.forEach(r => {
        recsList.innerHTML += `<li>${r}</li>`;
    });
    
    // Populate visuals section
    const visualsSection = document.getElementById("solution-visuals-section");
    const visualsCarousel = document.getElementById("solution-images-carousel");
    
    if (proj.isConfidential) {
        visualsSection.style.display = "none";
    } else {
        visualsSection.style.display = "block";
        visualsCarousel.innerHTML = "";
        
        let images = [];
        if (proj.title.toLowerCase().includes("ecommerce") || proj.title.toLowerCase().includes("e-commerce")) {
            images = [
                "assets/images/projects/ecommerce/dashboard_1.png",
                "assets/images/projects/ecommerce/dashboard_2.png",
                "assets/images/projects/ecommerce/dashboard_3.png",
                "assets/images/projects/ecommerce/dashboard_4.png",
                "assets/images/projects/ecommerce/dashboard_5.png"
            ];
        } else if (proj.title.toLowerCase().includes("retail")) {
            images = [
                "assets/images/projects/retail/project_1_1.png",
                "assets/images/projects/retail/project_1_2.png"
            ];
        }
        
        images.forEach(imgSrc => {
            const img = document.createElement("img");
            img.src = imgSrc;
            img.alt = "Dashboard page";
            img.className = "solution-preview-img";
            img.style.width = "100%";
            img.style.borderRadius = "var(--br-sm)";
            img.style.border = "1px solid var(--border-color)";
            img.style.marginTop = "0.5rem";
            visualsCarousel.appendChild(img);
        });
    }
    
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeSolutionLightbox() {
    const modal = document.getElementById("solution-lightbox");
    if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
    }
}

// 7. CLIPBOARD & SUPPORT TICKET FORM ACTIONS
function setupClipboardCopy() {
    const emailCard = document.getElementById("copy-email-card");
    const phoneCard = document.getElementById("copy-phone-card");
    
    if (emailCard) {
        emailCard.addEventListener("click", () => {
            const val = document.getElementById("email-text").textContent;
            navigator.clipboard.writeText(val).then(() => {
                const icon = emailCard.querySelector(".kpi-copy-action i");
                icon.className = "bx bx-check";
                setTimeout(() => { icon.className = "bx bx-copy"; }, 2000);
            });
        });
    }
    
    if (phoneCard) {
        phoneCard.addEventListener("click", () => {
            const val = document.getElementById("phone-text").textContent;
            navigator.clipboard.writeText(val).then(() => {
                const icon = phoneCard.querySelector(".kpi-copy-action i");
                icon.className = "bx bx-check";
                setTimeout(() => { icon.className = "bx bx-copy"; }, 2000);
            });
        });
    }
    
    // Contact form ticket submit
    const form = document.getElementById("contact-ticket-form");
    if (form) {
        form.addEventListener("submit", e => {
            e.preventDefault();
            
            const btn = form.querySelector("button[type='submit']");
            const orig = btn.innerHTML;
            btn.innerHTML = `Submitting...`;
            btn.disabled = true;
            
            fetch(form.action, {
                method: form.method,
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            })
            .then(res => {
                if (res.ok) {
                    alert("Ticket Submitted Successfully! I will respond within 12 hours.");
                    form.reset();
                } else {
                    alert("Submission issue. Please reach out directly via Email or LinkedIn.");
                }
            })
            .catch(() => {
                alert("Connection issues. Please copy my details and contact me directly.");
            })
            .finally(() => {
                btn.innerHTML = orig;
                btn.disabled = false;
            });
        });
    }
}

/// 8. SIGNATURE AI ANALYST REPRESENTATIVE WIDGET
function setupAIAssistant() {
    const trigger = document.getElementById("ai-assistant-trigger");
    const panel = document.getElementById("ai-chat-panel");
    const closeBtn = document.getElementById("ai-chat-close");
    const header = document.querySelector(".ai-chat-header");
    
    // Floating bot form elements
    const form = document.getElementById("ai-chat-form");
    const input = document.getElementById("ai-chat-input");
    const suggestions = document.getElementById("ai-chat-suggestions");
    
    // Toggle active state on trigger click
    if (trigger) {
        trigger.addEventListener("click", () => {
            panel.classList.add("active");
            trigger.style.display = "none";
            if (input) input.focus();
        });
    }
    
    // Toggle active state on header click (collapsing chatbot back to trigger button)
    if (header) {
        header.addEventListener("click", (e) => {
            if (e.target.closest("#ai-chat-close")) {
                panel.classList.remove("active");
                if (trigger) trigger.style.display = "flex";
                return;
            }
            panel.classList.toggle("active");
            if (!panel.classList.contains("active")) {
                if (trigger) trigger.style.display = "flex";
            } else {
                if (trigger) trigger.style.display = "none";
                if (input) input.focus();
            }
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            panel.classList.remove("active");
            if (trigger) trigger.style.display = "flex";
        });
    }
    
    // Floating chatbot event bindings
    if (suggestions) {
        suggestions.addEventListener("click", e => {
            const chip = e.target.closest(".suggestion-chip");
            if (chip) submitUserQuery(chip.textContent, "ai-chat-body", input);
        });
    }
    
    if (form) {
        form.addEventListener("submit", e => {
            e.preventDefault();
            const val = input.value.trim();
            if (val) submitUserQuery(val, "ai-chat-body", input);
        });
    }
}

function triggerAIChatAutoPopup() {
    setTimeout(() => {
        const panel = document.getElementById("ai-chat-panel");
        const trigger = document.getElementById("ai-assistant-trigger");
        if (panel && !panel.classList.contains("active")) {
            panel.classList.add("active");
            if (trigger) trigger.style.display = "none";
        }
    }, 2500); // 2.5 seconds after boot loading is finished
}

function submitUserQuery(query, chatBodyId, inputEl) {
    const chatBody = document.getElementById(chatBodyId);
    if (!chatBody) return;
    
    const userMsg = document.createElement("div");
    userMsg.className = "chat-msg user";
    userMsg.textContent = query;
    chatBody.appendChild(userMsg);
    
    if (inputEl) inputEl.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;
    
    // Typing indicator
    const botLoading = document.createElement("div");
    botLoading.className = "chat-msg bot typing-loader";
    botLoading.innerHTML = `
        <div class="skeleton-typing">
            <span class="skeleton-dot"></span>
            <span class="skeleton-dot"></span>
            <span class="skeleton-dot"></span>
        </div>
    `;
    chatBody.appendChild(botLoading);
    chatBody.scrollTop = chatBody.scrollHeight;
    
    dispatchAPIQuery(query, botLoading, chatBodyId);
}

async function dispatchAPIQuery(query, loadingEl, chatBodyId) {
    const chatBody = document.getElementById(chatBodyId);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    
    try {
        const res = await fetch(`/api/gemini`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: query }),
            signal: controller.signal
        });
        
        clearTimeout(timeout);
        loadingEl.remove();
        
        if (res.status === 429) throw new Error("Rate Limit Exceeded");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        
        const data = await res.json();
        let text = "";
        if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts) {
            text = data.candidates[0].content.parts[0].text;
        } else {
            text = "Using local backup database: Keerthik Raja is skilled in SQL, Power BI (DAX), and Python. Contact him directly.";
        }
        
        appendBotMessage(text, chatBodyId);
    } catch (err) {
        clearTimeout(timeout);
        console.warn("API error. Using local rule fallback matcher:", err);
        loadingEl.remove();
        appendBotMessage(getLocalFallback(query), chatBodyId);
    }
}

function appendBotMessage(text, chatBodyId) {
    const chatBody = document.getElementById(chatBodyId);
    if (!chatBody) return;
    const botMsg = document.createElement("div");
    botMsg.className = "chat-msg bot";
    
    // Markdown link converter [text](url) -> HTML anchor
    let formatted = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" style="text-decoration:underline;color:var(--accent-gold)">$1</a>');
    formatted = formatted.replace(/\n/g, '<br>');
    
    botMsg.innerHTML = formatted;
    chatBody.appendChild(botMsg);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function getLocalFallback(query) {
    const q = query.toLowerCase();
    
    if (q.includes("who is") || q.includes("summary") || q.includes("about keerthik")) {
        return `Keerthik Raja is a Data Analyst with an Industrial Engineering background. He is experienced in SQL, Power BI, Python, and Excel. You can email him at [Email](mailto:keerthikbharath29@gmail.com).`;
    }
    if (q.includes("why hire") || q.includes("different") || q.includes("recommend")) {
        return `Keerthik brings a strong operations-optimization background from Industrial Engineering. He has built capacity variance forecasting models that closed 12% output gaps and automates audits using lookup matrices.`;
    }
    if (q.includes("power bi") || q.includes("dax") || q.includes("dashboard")) {
        return `Keerthik is highly proficient in Power BI, Advanced DAX, and relational modeling. He has built a Securitisation Portfolio dashboard (6k accounts, credit risk analysis), a Retail Sales Analysis dashboard, and a comprehensive E-Commerce Sales dashboard.`;
    }
    if (q.includes("sql") || q.includes("database")) {
        return `Keerthik is skilled in SQL. He uses Joins, CTEs, subqueries, and table normalization to process large raw datasets (such as his 6,000+ record securitisation database).`;
    }
    if (q.includes("python") || q.includes("pandas") || q.includes("numpy")) {
        return `Keerthik uses Python for EDA and data cleaning, relying on Pandas and NumPy. He is certified in Python Data Structures by the University of Michigan.`;
    }
    if (q.includes("automation") || q.includes("n8n")) {
        return `Keerthik built an AI Job Application Automation Workflow using n8n and AI APIs, automating job search, email pitches, and resume matching logs.`;
    }
    if (q.includes("contact") || q.includes("scheduling") || q.includes("email")) {
        return `You can reach Keerthik Raja directly via phone (+91 86103 73797) or email (keerthikbharath29@gmail.com). You can also use the contact dashboard below to submit a ticket!`;
    }
    return `Keerthik Raja is a Data Analyst specializing in Power BI dashboard development, SQL database wrangling, Excel forecasters, and n8n automations. For details, submit a contact ticket or reach him at +91 86103 73797.`;
}

// 9. LOCAL BACKUP PROFILE DATA (FAILSAFE FALLBACK)
function getBackupProfile() {
    return {
        "personal": {
            "name": "Keerthik Raja",
            "role": "Data Analyst",
            "email": "keerthikbharath29@gmail.com",
            "phone": "86103 73797",
            "linkedin": "https://linkedin.com/in/keerthik-raja70",
            "github": "https://github.com/KeerthikRaja70",
            "location": "Erode, Tamil Nadu, India",
            "summary": "Results-oriented Data Analyst with an Industrial Engineering background and hands-on experience in performance reporting, dashboard development, KPI tracking, and trend analysis. Skilled in SQL, Power BI, Excel, and Python for transforming raw data into clear insights and recommendations."
        },
        "experience": [
            {
                "role": "Industrial Engineer",
                "company": "Jay Jay Mills, Erode",
                "period": "Apr 2025 – Feb 2026",
                "highlights": [
                    "Built shift-level production forecast models in Excel to monitor performance trends and support same-day corrective action, helping reduce an average production shortfall of 12% by the following shift.",
                    "Prepared end-of-shift variance analysis reports that translated operational data into clear performance insights, enabling faster decisions by the operations team.",
                    "Identified recurring loss patterns and root causes across multiple bottlenecks, with recommendations adopted within the same week to improve output consistency.",
                    "Automated operator assignment audits using VLOOKUP and XLOOKUP across 5+ production lines, improving reporting accuracy and reducing manual checking effort."
                ]
            },
            {
                "role": "Data Analyst Intern",
                "company": "Internship Studio",
                "period": "May 2026 – Jun 2026",
                "highlights": [
                    "Developed a 2-page interactive Power BI dashboard for Retail Sales Data Analysis, highlighting customer response, revenue performance, sales trends, and customer activity.",
                    "Created KPI-driven reports using Power BI, DAX, and Power Query to help track business performance and surface trends across customer and sales data."
                ]
            },
            {
                "role": "Electrician",
                "company": "Nile Controllers",
                "period": "Jun 2021 – Dec 2022",
                "highlights": [
                    "Technical troubleshooting and electrical controls maintenance.",
                    "Equipment installation and operational problem solving."
                ]
            }
        ],
        "projects": [
            {
                "title": "Retail Sales Analysis Dashboard",
                "category": "Retail Analytics",
                "image": "assets/images/projects/retail/project_1_1.png",
                "tools": "Power BI | SQL | DAX",
                "isConfidential": false,
                "githubUrl": "https://github.com/KeerthikRaja70/retail-sales-analysis",
                "problem": "Comprehensive sales analysis to track performance, identify seasonal sales patterns, and uncover buying trends in Power BI to evaluate campaign response rates.",
                "questions": [
                    "What problem was analyzed? Optimizing store revenues and customer response metrics across product lines.",
                    "What business questions were answered?",
                    "1. Which product categories generate the highest revenue?",
                    "2. What are the monthly sales trends?"
                ],
                "findings": [
                    "Identified top-performing product categories.",
                    "Found seasonal sales patterns and monthly sales variances."
                ],
                "recommendations": [
                    "Align marketing campaigns with high-performing product categories.",
                    "Optimize inventory planning matching seasonal sales patterns."
                ]
            },
            {
                "title": "E-Commerce Sales Analysis",
                "category": "Retail Analytics",
                "image": "assets/images/projects/ecommerce/dashboard_1.png",
                "tools": "Power BI | SQL | Excel",
                "isConfidential": false,
                "githubUrl": "https://github.com/KeerthikRaja70/ecommerce-sales-analysis",
                "problem": "Analyzed e-commerce data to uncover trends in sales, products, and customer behavior.",
                "questions": [
                    "What problem was analyzed? Wrangling product review distributions and category revenue potential."
                ],
                "findings": [
                    "Top premium brands generated the highest digital conversions.",
                    "Dresses category generated disproportionately high revenue relative to SKU count."
                ],
                "recommendations": [
                    "Adopt Dresses category priority for inventory allocation decisions."
                ]
            },
            {
                "title": "AI Powered Automation",
                "category": "Automation",
                "image": "assets/images/projects/automation/workflow_1.png",
                "tools": "n8n | SQL | Python",
                "isConfidential": false,
                "githubUrl": "https://github.com/KeerthikRaja70",
                "problem": "Automation workflows using n8n to streamline data extraction, transformation, and automated email reporting using Excel sheet data.",
                "questions": [
                    "What problem was analyzed? Reducing manual reporting efforts."
                ],
                "findings": [
                    "Saved 300+ hours of operational reporting through auto-triggers."
                ],
                "recommendations": [
                    "Scale auto-email templates across other departments."
                ]
            },
            {
                "title": "Customer Support AI Agent",
                "category": "AI Development",
                "image": "assets/images/projects/automation/chatbot_agent_screenshot.jpg",
                "tools": "Python | RAG | API",
                "isConfidential": false,
                "githubUrl": "https://github.com/KeerthikRaja70",
                "problem": "RAG-based AI agent built using Python to handle intelligent customer support queries, contextual documentation retrieval, and response handling.",
                "questions": [
                    "What problem was analyzed? Providing instant, accurate replies based on product documentation databases."
                ],
                "findings": [
                    "Achieved high relevance retrieval rates using semantic embeddings."
                ],
                "recommendations": [
                    "Incorporate user feedback loops for fine-tuning embeddings."
                ]
            },
            {
                "title": "Securitisation Portfolio Analysis",
                "category": "Banking Analytics",
                "image": "assets/images/securitisation-dashboard.png",
                "tools": "Power BI | DAX | Excel",
                "isConfidential": true,
                "githubUrl": "https://github.com/KeerthikRaja70",
                "problem": "Cleaned and prepared a 6,000+ record dataset using SQL. Built interactive Power BI dashboards to analyze loan portfolio credit risk.",
                "questions": [
                    "What problem was analyzed? Loan portfolio health, default rates, and risk concentration."
                ],
                "findings": [
                    "Delinquency hotspots were isolated to specific geographical divisions."
                ],
                "recommendations": [
                    "Tighten credit underwriting standards for high-risk regions."
                ]
            }
        ],
        "aiAchievements": [
            "Built AI-powered automation workflows using n8n",
            "Developed RAG-based Customer Support AI Agent",
            "Integrated AI APIs into practical applications",
            "Built AI-assisted productivity solutions",
            "Explored Generative AI tools for automation and problem solving"
        ],
        "skills": {
            "SQL": 97,
            "Power BI": 98,
            "Python": 95,
            "Excel": 96,
            "DAX": 94,
            "Data Analysis": 92,
            "Statistics": 93,
            "Problem Solving": 93
        },
        "techStack": {
            "Database": "PostgreSQL",
            "Visualization": "Power BI",
            "Programming": "Python",
            "Data Processing": "Pandas, NumPy",
            "Automation": "n8n, APIs"
        },
        "certifications": [

            {
                "title": "Data Analytics Internship Certificate",
                "issuer": "Internship Studio",
                "platform": "Internship Studio",
                "completionDetails": "Completed: Jun 2026",
                "image": "assets/images/certificates/internship_studio_data_analytics.png",
                "skillsGained": "Retail sales analysis | Power BI reports | Power Query cleaning"
            },
            {
                "title": "Python Using AI Workshop",
                "issuer": "be10x",
                "platform": "be10x Workshop",
                "completionDetails": "Completed: 2024",
                "image": "assets/images/certificates/python_using_ai_workshop.png",
                "skillsGained": "Python scripting | AI prompt engineering | Productivity automations"
            },
            {
                "title": "Python Data Structures",
                "issuer": "University of Michigan",
                "platform": "Coursera",
                "completionDetails": "Completed: 2023",
                "image": "assets/images/certificates/Python Data Structures.png",
                "skillsGained": "Lists, Dictionaries, Tuples | Custom data pipelines | File parsing"
            },
            {
                "title": "Programming for Everybody (Python Basics)",
                "issuer": "University of Michigan",
                "platform": "Coursera",
                "completionDetails": "Completed: 2023",
                "image": "assets/images/certificates/Programming For Everybody.jpg",
                "skillsGained": "Python basics | Variables & loops | Functions & control logic"
            }
        ]
    };
}

// 10. CERTIFICATE SECURITY (PREVENT DOWNLOADS & SCREENSHOTS)
function setupCertificateSecurity() {
    // 1. Block Keyboard Shortcuts (F12, DevTools, Ctrl+S, Ctrl+P, PrintScreen)
    document.addEventListener("keydown", (e) => {
        // Prevent F12
        if (e.key === "F12") {
            e.preventDefault();
            return false;
        }
        // Prevent Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C (inspect element)
        if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C" || e.key === "i" || e.key === "j" || e.key === "c")) {
            e.preventDefault();
            return false;
        }
        // Prevent Ctrl+S (Save Page)
        if (e.ctrlKey && (e.key === "S" || e.key === "s")) {
            e.preventDefault();
            return false;
        }
        // Prevent Ctrl+P (Print Page)
        if (e.ctrlKey && (e.key === "P" || e.key === "p")) {
            e.preventDefault();
            return false;
        }
        // Prevent PrintScreen key
        if (e.key === "PrintScreen" || e.keyCode === 44) {
            e.preventDefault();
            triggerCertificateBlur();
            navigator.clipboard.writeText("Screenshot Protected");
            return false;
        }
    });

    document.addEventListener("keyup", (e) => {
        if (e.key === "PrintScreen" || e.keyCode === 44) {
            e.preventDefault();
            triggerCertificateBlur();
            navigator.clipboard.writeText("Screenshot Protected");
            return false;
        }
    });

    // Helper functions for focus defense
    function triggerCertificateBlur() {
        const certImg = document.getElementById("cert-lightbox-img");
        if (certImg) certImg.style.filter = "blur(25px)";
        
        const modalContainer = document.querySelector(".cert-lightbox-container");
        if (modalContainer) modalContainer.style.filter = "blur(15px)";
        
        const certCards = document.querySelectorAll(".certificate-card");
        certCards.forEach(card => card.style.filter = "blur(20px)");
    }

    function removeCertificateBlur() {
        const certImg = document.getElementById("cert-lightbox-img");
        if (certImg) certImg.style.filter = "none";
        
        const modalContainer = document.querySelector(".cert-lightbox-container");
        if (modalContainer) modalContainer.style.filter = "none";
        
        const certCards = document.querySelectorAll(".certificate-card");
        certCards.forEach(card => card.style.filter = "none");
    }

    // 2. Snipping Tool defense: Blur certificate cards and preview modal when window loses focus
    let isBlurred = false;

    window.addEventListener("blur", () => {
        triggerCertificateBlur();
        isBlurred = true;
    });

    window.addEventListener("focus", () => {
        // Do NOT unblur immediately to prevent Snipping Tool focus-regain bypass.
        // We wait for the user to move the mouse or click inside the window.
        isBlurred = false;
    });

    document.addEventListener("mousemove", () => {
        if (!isBlurred) {
            removeCertificateBlur();
        }
    });

    document.addEventListener("click", () => {
        if (!isBlurred) {
            removeCertificateBlur();
        }
    });
}
