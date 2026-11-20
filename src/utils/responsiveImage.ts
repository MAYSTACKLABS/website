// Desktop screenshots ship in two widths: `name.webp` (1600px) and `name-800.webp`.
// Data files import the large URL; this maps it to a srcset with the small sibling.
const files = import.meta.glob<string>("../assets/projects/**/*.webp", { eager: true, import: "default" });

const srcSets = new Map<string, string>();
for (const [path, url] of Object.entries(files)) {
    if (path.endsWith("-800.webp")) continue;
    const smallUrl = files[path.replace(/\.webp$/, "-800.webp")];
    if (smallUrl) srcSets.set(url, `${smallUrl} 800w, ${url} 1600w`);
}

/** Returns the srcset for a project screenshot URL, or undefined when it has a single size. */
export const screenshotSrcSet = (url: string) => srcSets.get(url);
