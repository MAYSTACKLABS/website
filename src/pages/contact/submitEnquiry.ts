import { site } from "../../content/site.ts";

const TIMEOUT_MS = 20_000;

/** Sends the enquiry through FormSubmit to the studio inbox. Throws if delivery isn't confirmed. */
export async function submitEnquiry(answers: Record<string, string>) {
    const data = new FormData();
    Object.entries(answers).forEach(([key, value]) => data.set(key, value));
    const kind = answers.intent === "project" ? "Project enquiry" : "Website question";
    data.set("_subject", `${kind} from ${answers.name}`);
    data.set("_template", "table");
    data.set("_captcha", "false");
    data.set("_replyto", answers.email);

    const response = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
        signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    const result = await response.json();
    if (!response.ok || String(result.success) !== "true") throw new Error("Enquiry not delivered");
}
