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

    let { email, message } = req.body;

    email = email.trim();
    message = message.trim();

    if (!email || !message) return res.status(400).json({ error: "Champs vides, email et message sont requis" });
    if (message.length > 1024) return res.status(400).json({ error: "Message trop long" });

    email = sanitize(email.trim());
    message = sanitize(message.trim());

    try {
        const { data, error } = await resend.emails.send({
            from: "Portfolio <send@valentinhrnd.fr>",
            to: "contact.valentinh@gmail.com",
            replyTo: email,
            subject: "<Portfolio> Formulaire de Contact",
            text: message,
            html: `
                <div style="font-family: sans-serif; padding: 20px;">
                    <h2 style="color: #333;">Nouvelle demande de contact</h2>
                    <p><strong>De :</strong> ${email}</p>
                    <p><strong>Message :</strong></p>
                    <div style="background: #f4f4f4; padding: 15px; border-radius: 5px;">
                        ${message.replace(/\n/g, '<br>')}
                    </div>
                </div>
            `,
        });

    if (error) {
        console.error("RESEND ERROR:", error);
        return res.status(400).json({ error });
    }

    console.log(`EMAIL SENT : ${data.id}`);
    return res.status(200).json({ success: true, id: data.id });

    } catch (err) {
        console.error("SERVER ERROR:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}
