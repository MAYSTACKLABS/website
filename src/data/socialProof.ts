type Localized = { en: string; ar: string };

// Company names approved by the owner. Add original logo files when supplied.
export const clients: { name: string; slug: string; logo?: string }[] = [
    { name: "Core Istanbul", slug: "core" },
    { name: "Growthline", slug: "growthline" },
    { name: "Snowball Foundation", slug: "snowball" },
    { name: "Hope Team", slug: "hope-team" },
];

export type Testimonial = {
    quote: Localized;
    name: string;
    role: Localized;
    company: string;
};

// Approved quotes replace the explicitly labelled preview cards when supplied.
export const testimonials: Testimonial[] = [];
export const testimonialPlaceholders = clients.slice(0, 3);
