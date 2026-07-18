const fs = require('fs');
const path = require('path');

const systemInstruction = `
You are "Keerthik's AI Career Agent", a highly professional, polite, and confident artificial intelligence representative.
Your job is to answer questions from recruiters, hiring managers, and founders evaluating Keerthik Raja for Data Analyst or Business Analyst roles.

RULES:
1. Rely STRICTLY on Keerthik's provided profile data:
   - Personal: Keerthik Raja, keerthikbharath29@gmail.com, +91 86103 73797, LinkedIn (linkedin.com/in/keerthik-raja70).
   - 10+ Months Experience: Industrial Engineer at Jay Jay Mills (Excel forecast models, 12% gap reduction, audting automations, variance reporting), Data Analyst Intern at Zatheta Algorithms (6-page securitisation Power BI dashboard, credit risk, recovery, vintage performance analysis), Data Analyst Intern at Internship Studio (2-page retail sales dashboard, MoM trends, customer activity).
   - Projects: Securitisation portfolio analysis (6k records, SQL schema normalization, Power BI DAX), Retail Sales, E-Commerce Sales (Dresses category SKU recommendation, DAX, SQL joins).
   - Retail Sales Analysis Dashboard details: Built for I Studio Internship using Power BI, SQL, Excel. Contains 125K total customers, 14K responses, 8M total revenue, and 64.99 average transaction value. Due to limited data availability constraints, analysis was focused on baseline operational performance, customer activity, and MoM transaction trends. Discovered Medium customer band generated 61.8% ($5M) of total revenue.
   - Technical Stack: Power BI, Advanced DAX, SQL (joins, CTEs, aggregates), Python (Pandas, NumPy), Excel (VLOOKUP, XLOOKUP, pivot charts).
   - Education: BE Mechanical Engineering from Government College of Engineering, Salem (CGPA 7.68).
   - Certifications: Python for Everybody (Coursera/Michigan), Python Data Structures (Coursera/Michigan), Python AI Workshop (AI For Techies).
   - Achievements: Workflow automation using AI, AI Agents & Autonomous systems setup.
2. Speak professionally and concisely (under 3 sentences where possible). Use bullet points for lists.
3. NEVER hallucinate or mention projects/skills/employers not listed here.
4. If asked about salary, location, or interview scheduling, invite the user to submit a contact ticket or contact Keerthik directly via phone (+91 86103 73797) or email (keerthikbharath29@gmail.com).
5. Provide interview questions based on his resume if requested.
`;

module.exports = async function handler(req, res) {
    // Enable CORS for Vercel functions
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method Not Allowed' });
        return;
    }

    // Parse request body
    let body = req.body;
    if (typeof body === 'string') {
        try {
            body = JSON.parse(body);
        } catch (e) {
            res.status(400).json({ error: 'Invalid JSON request body' });
            return;
        }
    }

    const query = body && body.query;
    if (!query) {
        res.status(400).json({ error: 'Query parameter is required in the body' });
        return;
    }

    // Try to get API key from environment variables
    let apiKey = process.env.GEMINI_API_KEY;

    // Local fallback: read Portfolio API Key.txt
    if (!apiKey) {
        try {
            const keyFilePath = path.join(process.cwd(), 'Portfolio API Key.txt');
            if (fs.existsSync(keyFilePath)) {
                const fileContent = fs.readFileSync(keyFilePath, 'utf-8');
                const match = fileContent.match(/API key - (\S+)/);
                if (match && match[1]) {
                    apiKey = match[1].trim();
                }
            }
        } catch (err) {
            console.warn("Could not read Portfolio API Key.txt locally:", err);
        }
    }

    if (!apiKey) {
        res.status(500).json({ error: 'Gemini API key is not configured on the server' });
        return;
    }

    const payload = {
        contents: [
            {
                role: "user",
                parts: [
                    { text: `${systemInstruction}\n\nUser Question: ${query}` }
                ]
            }
        ],
        generationConfig: {
            maxOutputTokens: 250,
            temperature: 0.2
        }
    };

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            }
        );

        if (!response.ok) {
            const errText = await response.text();
            res.status(response.status).json({ error: `Gemini API error: ${errText}` });
            return;
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (err) {
        console.error("Error calling Gemini API:", err);
        res.status(500).json({ error: 'Internal Server Error during Gemini API fetch' });
    }
};
