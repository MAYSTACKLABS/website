import { MessageCircle } from "lucide-react";
import { site } from "../../content/site.ts";
import "./WhatsAppButton.css";

/** Always within reach: a quiet round chat button in the bottom-right corner. */
export function WhatsAppButton() {
    return (
        <a
            className="whatsapp-fab"
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
        >
            <MessageCircle aria-hidden="true" />
        </a>
    );
}
