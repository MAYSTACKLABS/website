# Owner refinement — 5 October 2026

- Contact: contact@maystack.net; WhatsApp +964 782 611 1334. Centralized in src/config/site.ts. Email delivery requires the owner's FormSubmit activation; QA mocks responses and does not send enquiries.
- Core Istanbul confirmed by owner; original company logos and approved testimonials are pending. No fictional logos, quotes, ratings or metrics have been published.
- Shared white lock navbar, desktop navigation, symmetric language/theme endcaps, mobile menu, and accessible email popover. Instagram is intentionally inactive until a profile is supplied.
- Shared scenic footer has one headline and no sun/moon. Mountain/cloud depth is bounded and respects reduced motion.
- Landscape scenery uses an opaque upper field and a curved occlusion mask that ends inside the foreground clouds. This is occlusion, not a cloud fade. It prevents mountain and sky fragments below the cloud edges at different widths.
- Hero expertise labels use star motifs. Both celestial bodies transition vertically behind the mountain; registered sky color properties interpolate.
- Project labels and technology chips removed; editorial project story and uniform gallery ratios retained. One PhoneMockup owns the screen aperture for cards, showcases, service previews and galleries.

## Phone asset

Built-in image-generation tool, product-mockup mode. Asset: src/assets/generated/iphone-titanium-frame.png. The asset is an AI-generated photorealistic mockup, not an official product photograph. Alpha transparency was checked.

Prompt: Generate a photorealistic black titanium iPhone with a Dynamic Island, isolated on a genuinely transparent background. Portrait upright full phone, nearly straight-on front view with a very subtle visible left metal side showing real thickness and buttons, no rotation in the image plane. Screen is a flat pure black blank rounded rectangle, no content, no reflection across the screen. Studio highlights confined to metal edges. Tight canvas around complete device with small equal margins, phone height about 94 percent of image. No floor, no shadow outside device, no glow, no text, no scenery. Website screenshots will be overlaid in CSS; keep screen rectangular, almost orthographic and perfectly vertical.

## Verification

Build and lint pass. Twenty-two interaction checks pass, including visible desktop navigation, mobile menu, language/theme persistence, accessible email menu, contact destinations, project filters and mocked form responses. Five additional motion/clipboard checks pass, including reduced motion and a manual-copy fallback for restricted clipboards. Chromium screenshots were inspected at 320, 390, 1440 and 1920 pixels, plus Arabic layouts. This does not constitute testing every browser or real email delivery. Full route exports are saved under screenshots/final-page-exports (ignored local artifacts).
