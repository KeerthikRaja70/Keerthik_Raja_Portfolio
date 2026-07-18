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
        scrollBar.style.width = `${scrollPercentage}%`;
        
        // Header shadow
        if (window.scrollY > 30) {
            header.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.4)";
        } else {
            header.style.boxShadow = "none";
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
    
    toggleBtn.addEventListener("click", () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);
        themeIcon.className = currentTheme === 'dark' ? "bx bx-moon" : "bx bx-sun";
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
        
        let skillsHtml = "";
        exp.highlights.forEach(s => {
            skillsHtml += `<span class="skill-tag ${isIE || isElec ? '' : 'text-blue'}">${s}</span>`;
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
                <h4 class="timeline-sub-skills-title">Core Highlights:</h4>
                <div class="timeline-skills-row">
                    ${skillsHtml}
                </div>
            </div>
        `;
        timeline.appendChild(node);
    });
}

function renderAIAchievements() {
    const container = document.getElementById("ai-achievements-container");
    if (!container) return;
    container.innerHTML = "";
    
    const icons = [
        "bx-cog",
        "bx-support",
        "bx-plug",
        "bx-bolt",
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

function renderProjectsGrid() {
    const container = document.getElementById("projects-container");
    if (!container) return;
    container.innerHTML = "";
    
    profileData.projects.forEach((proj, index) => {
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
                    <button class="btn btn-primary btn-solution-trigger" data-proj-idx="${index}">Business Solution</button>
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
        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");
        card.setAttribute("aria-label", `View certificate for ${cert.title}`);
        
        card.innerHTML = `
            <img src="${cert.image}" alt="${cert.title}">
            <h3>${cert.title}</h3>
            <p><strong>Platform:</strong> ${cert.platform}</p>
            <p style="font-size:0.75rem;margin-top:4px;"><strong>Skills:</strong> ${cert.skillsGained}</p>
            <p style="font-size:0.72rem;color:var(--text-muted);margin-top:2px;">${cert.completionDetails}</p>
        `;
        
        card.addEventListener("click", () => openCertLightbox(index));
        card.addEventListener("keydown", e => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openCertLightbox(index);
            }
        });
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

// 8. SIGNATURE AI ANALYST REPRESENTATIVE WIDGET
function setupAIAssistant() {
    const trigger = document.getElementById("ai-assistant-trigger");
    const panel = document.getElementById("ai-chat-panel");
    const closeBtn = document.getElementById("ai-chat-close");
    const form = document.getElementById("ai-chat-form");
    const input = document.getElementById("ai-chat-input");
    const suggestions = document.getElementById("ai-chat-suggestions");
    
    if (!trigger) return;
    
    trigger.addEventListener("click", () => {
        panel.classList.toggle("active");
        if (panel.classList.contains("active")) input.focus();
    });
    
    closeBtn.addEventListener("click", () => panel.classList.remove("active"));
    
    if (suggestions) {
        suggestions.addEventListener("click", e => {
            const chip = e.target.closest(".suggestion-chip");
            if (chip) submitUserQuery(chip.textContent);
        });
    }
    
    if (form) {
        form.addEventListener("submit", e => {
            e.preventDefault();
            const val = input.value.trim();
            if (val) submitUserQuery(val);
        });
    }
}

function triggerAIChatAutoPopup() {
    setTimeout(() => {
        const panel = document.getElementById("ai-chat-panel");
        if (panel && !panel.classList.contains("active")) {
            panel.classList.add("active");
        }
    }, 2500); // 2.5 seconds after boot loading is finished
}

function submitUserQuery(query) {
    const chatBody = document.getElementById("ai-chat-body");
    const input = document.getElementById("ai-chat-input");
    
    const userMsg = document.createElement("div");
    userMsg.className = "chat-msg user";
    userMsg.textContent = query;
    chatBody.appendChild(userMsg);
    input.value = "";
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
    
    dispatchAPIQuery(query, botLoading);
}

async function dispatchAPIQuery(query, loadingEl) {
    const chatBody = document.getElementById("ai-chat-body");
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
        
        appendBotMessage(text);
    } catch (err) {
        clearTimeout(timeout);
        console.warn("API error. Using local rule fallback matcher:", err);
        loadingEl.remove();
        appendBotMessage(getLocalFallback(query));
    }
}

function appendBotMessage(text) {
    const chatBody = document.getElementById("ai-chat-body");
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
            "summary": "Results-oriented Data Analyst with an Industrial Engineering background. Skilled in SQL, Power BI, Excel, and Python."
        },
        "experience": [
            {
                "role": "Industrial Engineer",
                "company": "Jay Jay Mills",
                "period": "2025 - 2026",
                "highlights": [
                    "Process optimization",
                    "Data-driven decision making",
                    "Production analysis",
                    "Operational improvement"
                ]
            },
            {
                "role": "Data Analyst Intern",
                "company": "Zetheta Algorithms Pvt Ltd",
                "period": "2026",
                "highlights": [
                    "Data cleaning",
                    "Exploratory data analysis",
                    "Power BI dashboard development",
                    "Business insights generation"
                ]
            },
            {
                "role": "Data Analyst Intern",
                "company": "Internship Studio",
                "period": "2026",
                "highlights": [
                    "Data analysis projects",
                    "Dashboard creation",
                    "Reporting",
                    "Data visualization"
                ]
            },
            {
                "role": "Electrician",
                "company": "Nile Controllers",
                "period": "2024",
                "highlights": [
                    "Technical troubleshooting",
                    "Equipment maintenance",
                    "Problem solving"
                ]
            }
        ],
        "projects": [
            {
                "title": "Securitisation Portfolio Analysis Dashboard",
                "category": "Banking Analytics",
                "image": "assets/images/securitisation-dashboard.png",
                "tools": "Power BI | DAX | Excel",
                "isConfidential": true,
                "githubUrl": "https://github.com/KeerthikRaja70/securitisation-portfolio-analysis",
                "problem": "Built an interactive banking analytics dashboard to analyze loan portfolio performance, risk segmentation, and financial metrics.",
                "questions": [
                    "What problem was analyzed? Loan portfolio health, default rates, and risk concentration across geographical sectors under bank underwriting schemas.",
                    "What business questions were answered?",
                    "1. How is the loan portfolio performing over time?",
                    "2. How is credit risk distributed?",
                    "3. What is the collection efficiency?"
                ],
                "findings": [
                    "Identified default trends in vintage cohorts.",
                    "Improved collection models to support bank transparency."
                ],
                "recommendations": [
                    "Adjust risk weights based on vintage curve default limits."
                ]
            },
            {
                "title": "E-Commerce Sales Analysis Dashboard",
                "category": "Retail Analytics",
                "image": "assets/images/projects/ecommerce/dashboard_1.png",
                "tools": "SQL | Power BI | Excel | DAX | Python",
                "isConfidential": false,
                "githubUrl": "https://github.com/KeerthikRaja70/ecommerce-sales-analysis",
                "problem": "Analyze e-commerce sales performance, customer trends, product performance, and revenue patterns to generate actionable business insights.",
                "questions": [
                    "What problem was analyzed? Wrangling product review distributions, price bands, and brand revenues to maximize digital conversions.",
                    "What business questions were answered?",
                    "1. What is the revenue contribution of each brand?",
                    "2. How do discount percentages correlate with product ratings?",
                    "3. Which keywords appear most in product reviews?",
                    "4. What is the price distribution across product categories?"
                ],
                "findings": [
                    "Levis and U.S. Polo Assn. emerged as top revenue-generating brands.",
                    "Discovered that rating distribution centers heavily on the 4-5 stars range.",
                    "Fit issues were the most common keyword in low-satisfaction product reviews."
                ],
                "recommendations": [
                    "Expand product lines for the top 5 premium brands.",
                    "Implement size guides and interactive fit tools to address product review concerns.",
                    "Adjust pricing margins for products with high discount elasticity."
                ]
            },
            {
                "title": "Retail Sales Analysis Dashboard",
                "category": "Retail Analytics",
                "image": "assets/images/projects/retail/project_1_1.png",
                "tools": "SQL | Power BI | Excel | DAX",
                "isConfidential": false,
                "githubUrl": "https://github.com/KeerthikRaja70/retail-sales-analysis",
                "problem": "Analyze retail sales performance, customer behavior, product trends, and revenue patterns to generate actionable business insights.",
                "questions": [
                    "What problem was analyzed? Optimizing store revenues and customer response metrics across product lines amid limited data constraints.",
                    "What business questions were answered?",
                    "1. Which products generate the highest revenue?",
                    "2. Which categories have the best performance?",
                    "3. What are the monthly sales trends?",
                    "4. Which customers contribute the most revenue?",
                    "5. Where are the opportunities for improvement?"
                ],
                "findings": [
                    "Identified top-performing product categories.",
                    "Found seasonal sales patterns and significant monthly drops.",
                    "Analyzed customer purchasing behaviour and campaign response rate.",
                    "Identified low-performing product segments."
                ],
                "recommendations": [
                    "Focus marketing campaigns on high-performing categories.",
                    "Optimize inventory planning based on monthly sales patterns.",
                    "Improve customer retention strategies targeting high-value buyers.",
                    "Create targeted promotions to revive low-performing segments."
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
            "SQL": 90,
            "Power BI": 90,
            "Excel": 85,
            "Python": 75,
            "Pandas": 70,
            "DAX": 85
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
                "issuer": "Tanusha Majumdar (Internship Mentor), Internship Studio",
                "platform": "Internship Studio",
                "completionDetails": "Completed: May 6th, 2026 to June 10th, 2026 (Certificate ID: ISDTAI3280639)",
                "image": "assets/images/certificates/internship_studio_data_analytics.png",
                "skillsGained": "SQL | Power BI | Excel | Data Analytics | Relational Modeling"
            },
            {
                "title": "Python Data Structures",
                "issuer": "Charles Severance (Clinical Professor, School of Information), University of Michigan",
                "platform": "Coursera",
                "completionDetails": "Completed: Feb 10, 2026 (Verify Code: HD7TKJQ2ZH1Z)",
                "image": "assets/images/certificates/Python Data Structures.png",
                "skillsGained": "Lists, Dictionaries, Tuples | XML/JSON parsing | File handling & cleaning"
            },
            {
                "title": "Python using AI Workshop Certificate",
                "issuer": "Aditya Kachave (AI For Techies)",
                "platform": "AI For Techies",
                "completionDetails": "Completed: May 10th, 2026",
                "image": "assets/images/certificates/python_using_ai_workshop.png",
                "skillsGained": "Interactive Python visualizations | AI-assisted code debugging & generation"
            },
            {
                "title": "Power BI Data Analytics Certificate",
                "issuer": "Internship Studio",
                "platform": "Zatheta Algorithms & Internship Studio",
                "completionDetails": "Completed: 2026",
                "image": "assets/images/powerbi-cert.png",
                "skillsGained": "DAX calculations | Relational modeling | Dashboard layouts"
            }
        ]
    };
}
