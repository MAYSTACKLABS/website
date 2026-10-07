import { MessageCircle } from "lucide-react";
import { site } from "../../config/site.ts";

export default function QuickContact() {
    return <div className="quick-contact">
        <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer" aria-label="Chat with Maystack on WhatsApp"><MessageCircle aria-hidden="true" /></a>
    </div>;
}
