import { useEffect } from "react";

function setMeta(key: string, content: string) {
    const attribute = key.startsWith("og:") ? "property" : "name";
    let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
    if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attribute, key);
        document.head.append(tag);
    }
    tag.content = content;
}

/** Sets the page title, description, social tags and canonical URL. */
export function usePageMeta(title: string, description: string) {
    useEffect(() => {
        const url = `${location.origin}${location.pathname}`;
        document.title = title;
        setMeta("description", description);
        setMeta("og:title", title);
        setMeta("og:description", description);
        setMeta("og:url", url);
        setMeta("twitter:title", title);
        setMeta("twitter:description", description);
        document.head
            .querySelector<HTMLLinkElement>('link[rel="canonical"]')
            ?.setAttribute("href", url);
    }, [title, description]);
}
