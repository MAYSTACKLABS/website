import { useEffect } from "react";

type PageMetadata = {
    title: string;
    description: string;
};

function setMeta(name: string, content: string, property = false) {
    const attribute = property ? "property" : "name";
    let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);
    if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
    }
    element.content = content;
}

export function usePageMetadata({ title, description }: PageMetadata) {
    useEffect(() => {
        const pageUrl = `${window.location.origin}${window.location.pathname}`;
        document.title = title;
        setMeta("description", description);
        setMeta("og:title", title, true);
        setMeta("og:description", description, true);
        setMeta("og:url", pageUrl, true);
        setMeta("twitter:title", title);
        setMeta("twitter:description", description);

        const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
        if (canonical) canonical.href = pageUrl;
    }, [description, title]);
}
