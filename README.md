# Afnan Mehmood | From code to experience

An original immersive portfolio derived from the design system of [Noomo Storytelling](https://storytelling.noomoagency.com/). Blush-pink atmosphere, oversized italic typography, glass forms, spacious narrative chapters, and solid black transitions. The reference's branding, proprietary fonts, models, textures, and copy are not reused.

## Run

```sh
npm install
npm run dev
npm run type-check
npm run lint
npm run build
npm start
```

The default development address is http://localhost:3000. Use `npm run dev -- --port 3100` when that port is occupied.

## Architecture

- `components/portfolio/Portfolio.tsx`: semantic content, GSAP React contexts, loader/hero sequence, narrative motion, navigation, accessible native dialogs, and desktop Lenis scrolling.
- `components/portfolio/World.ts`: dynamically loaded Three.js renderer, persistent glass ribbon, refraction capture and DOM depth composition, atmospheric scene transitions, atmospheric shader, GSAP camera/geometry transitions, and resource disposal.
- `app/globals.css`: responsive composition and typography. Mobile places visual scenes above copy rather than shrinking a desktop layout.
- `docs/reference-audit.md`: observed reference tokens, implementation findings, and verification limitations.

The existing portfolio has no named project case studies or dated employment entries. The work chapter therefore presents the existing SaaS, AI-tool, and web-experience practices with expandable details and links to the real GitHub profile. No client names or outcomes are invented.

## Performance and access

Three.js is split into a separate lazy-loaded chunk. Original geometry is generated locally; no model downloads are required. Latin WOFF2 fonts total approximately 38 KB and have adjacent OFL licenses. DPR caps at 1.65 desktop, 1.25 mobile, and 0.9 for software rendering. Mobile/weak/software devices use screen-space glass refraction at reduced capture resolution and fewer geometry segments, and a 30 FPS rendering limit. Rendering pauses in hidden tabs. Geometry, materials, textures, GSAP contexts, scroll instances, and listeners are disposed.

Reduced motion disables the continuous scene loop, parallax, blur reveals, and smooth scrolling; scene changes snap at chapter boundaries. The preference updates live. WebGL failure has a CSS fallback, content remains usable without JavaScript, keyboard users have a skip link and native dialog focus management, and touch navigation is explicit.

## Identity

Afnan Mehmood · Frontend Engineer + UI/UX Engineer + Designer

- Email: d4afnan@gmail.com
- Phone: +92 3135599281
- Rawalpindi / Islamabad, Pakistan
- [GitHub](https://github.com/D4-afnan)
- [LinkedIn](https://linkedin.com/in/afnan-mehmood)

The ribbon lives in `components/portfolio/GlassRibbon.ts`. One swept mesh shares topology across flowing, lightbulb, flower, rounded-frame, eye and AM shapes. GPU interpolation and traveling waves keep changes continuous. A small offscreen buffer captures atmosphere and an inner filament for chromatically separated screen-space refraction. Analytical studio highlights and thin-film color shifts provide the original glass treatment. Positive-depth segments are copied to a foreground canvas; negative-depth segments stay behind the DOM. This uses one WebGL renderer. DOM text is not included in the refraction buffer. `World.ribbon` exposes `shape`, `flow`, `twist`, `width` and `stretch` as direct GSAP targets.

Ribbon shape targets: `0` flow, `1` lightbulb, `2` five-petal flower, `3` rounded UI frame, `4` eye, `5` AM, `6` return to flow. Only two adjacent poses are uploaded to GPU attributes at a time, keeping the shader within mobile attribute limits. The portfolio's ScrollTrigger timelines own these controls during scrolling; independent interactions can tween `flow` without competing with chapter morphs. Refraction is captured at 512 px width on software GPUs and mobile, and up to 1024 px on desktop. One WebGL renderer produces both DOM depth layers.

Loader bars are flat, light purple DOM shapes with fully rounded tops and no WebGL meshes, gradients or shadows. They retain the GSAP height animation and progress sequence. Ribbon normals follow sweep derivatives, with multisample antialiasing and continuous highlights.

“Reimagine the feeling” cycles through six complete palettes: Rose, Parrot, Sky, Peach, Lilac and Sand. Each has coordinated typography, atmosphere, interface and glass colors. DOM theme tokens and the WebGL atmosphere/material transition together. The theme is independent of scroll poses and survives scene recreation at responsive breakpoints and motion-preference changes. Both ribbon layers sit behind protected text and interface compositions. The work and contact backgrounds are opaque #050506 in every palette. The interface chapter uses an original detailed workspace illustration with navigation, metrics, charts, activity and design tokens.

Section 04 is a pinned horizontal narrative: vertical scrolling moves the track from right to left. Reduced motion uses a native horizontal strip without pinning. Page overflow is clipped on the horizontal axis; the work strip hides its scrollbar. Dark-scene compositing keeps the entire ribbon visible over opaque black, with a soft studio fill. Practice panels and contact details use translucent glass surfaces, blur and fine borders.

Section 04 uses a large glass eye formed from one continuous ribbon and three original, detailed interface studies built in SVG and CSS: SaaS products and websites, an AI assistant, and a creative website. `WorkStudy.tsx` owns these compositions. `WorkMorph.tsx` translates the layered SVG curtain in the [GSAP dynamic morphing demo](https://demos.gsap.com/demo/dynamic-morphing/) into a scroll-triggered reveal, with responsive point counts and reduced-motion support. The foreground ribbon renders behind the loader from its first frame, so entry reveals the existing scene without a canvas reparenting delay.
