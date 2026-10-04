import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function sanitize(str) {
    if (!str) return "";
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();

    let { email, message, token } = req.body;

    if (!token) return res.status(400).json({ error: "Validation anti-bot manquante" });

    const verifyResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            secret: process.env.TURNSTILE_KEY,
            response: token
        })
    });

    const turnstileResult = await verifyResponse.json();

    if (!turnstileResult.success) return res.status(400).json({ error: "Échec de la vérification anti-bot" });

    email = email.trim();
    message = message.trim();

    if (!email || !message) return res.status(400).json({ error: "Champs vides, email et message sont requis" });
    if (message.length > 1024) return res.status(400).json({ error: "Message trop long" });

    email = sanitize(email);
    message = sanitize(message);

    try {
        const discordResponse = await fetch(process.env.DISCORD_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                embeds: [{
                    title: "Nouveau contact",
                    color: 0x4d6fb7,
                    fields: [{ name: `De : ${email}`, value: message }],
                    timestamp: new Date().toISOString()
                }]
            })
        });

        if (!discordResponse.ok) throw new Error("Erreur Webhook Discord");

        return res.status(200).json({ success: true });
    } catch (err) {
        console.error("SERVER ERROR:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}
