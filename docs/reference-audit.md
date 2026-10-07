# Reference audit — 7 October 2026

Primary specification: https://storytelling.noomoagency.com/

Inspected live HTML, entry.BEbxiOYI.css, index.CeGRoErV.css, FZFS71Nt.js, and CbdjwYMp.js, plus desktop/mobile browser sessions. Screenshots are captured under /tmp/portfolio-review. The reference downloads large assets; initial captures show its lavender preloader and must not be mistaken for the completed hero.

## Extracted design system
- Background: lavender loader gradient #cebdf8 → #e2dbf8; atmospheric lavender/light blue scene opening, dark blue sequences.
- Actual tokens: ink #29345a; blue #3762be, #88aeff, #062969, #143a8a, #00276e; rose-purple #6248a4; dark #060b1d and #051125.
- Type: TTNeoris regular sans; TheSeasons italic serif. Hero serif is 19.5vw desktop / 18.8vw mobile, regular weight, line-height 1. Near-white text gradient #fffcff → #e3f0ff. Sans headers 66px desktop / 38px mobile; body 26 / 16–18px.
- Full-screen composition, fixed canvas and text layers; long narrative scroll divided into 21 scene sections. Spacious staggered line layouts, centered serif interludes, edge-aligned detail text. 38–54px desktop edge padding, 20px mobile.
- Fixed compact brand at upper left; translucent pill navigation upper right; full-screen mobile navigation. Glass controls have low-opacity white fills, blur, and alternating gradient borders.
- Lavender preloader with pixel sprite. Feathered radial mask reveals scene. Hero has click-to-start cursor on desktop and explicit tap-to-explore pill on mobile. Centered bottom scroll hint.
- GSAP/ScrollTrigger: scrubbed scale/opacity/blur character and line reveals; short stagger; desktop blur 8px, mobile no blur. Text enters, holds, and leaves in harmony with scene progression. Footer enters with blur and y=15.
- WebGL: Three.js, GLTF scene/camera animation tracks, separate /timelines/cam.glb and /timelines/cam-mob.glb. Proprietary phoenix, feathers, refracting crystals and environmental meshes. Custom materials include ice/displacement/normal maps, reflection layers, particles, water, emission, noise and sun shaders. Work labels sit beside moving 3D crystals, rather than a card grid.
- Case hover projected positions derive from scene progress. Persistent reimagine control changes scene appearance. Cursor prompts reflect entry and case context. Footer switches to white on navy.
- Performance: mobile reflections 512 vs 1024; reduced water opacity; desktop-only text blur; conditional MSAA for low DPR and small render surfaces; explicit scene quality and DPR toggles.

## Translation
Original continuous glass ribbon represents a line of code, then unfolds into modular UI planes and interface arrangements. Camera, color, geometry and DOM chapter timings share GSAP progression. No reference models, fonts, logos, texture files, or copy are reused. Open-license Cormorant Garamond italic and DM Sans substitute for proprietary fonts and are hosted locally. Existing vertical bar/afnan loader identity is retained in lavender, followed by the hero reveal. Work is presented as practice explorations because the repository contains no named projects; actual source work links to the existing GitHub profile. All original biography, service categories, core skills, office address, email and social links are preserved.

## Browser comparison and limits

Desktop (1280×800) and mobile (390×844) inspection reached the live reference but its WebGL scene did not complete the preloader under Chrome/SwiftShader, even after a three-minute wait. Separate synchronous compilation, lower DPR, and scene-store diagnostics did not yield a reliable full-scene capture. The public `og_image.jpg` was inspected as additional authored visual evidence: a lavender/pink iridescent composition, sans lead-in, and an enormous white italic serif headline. CSS and public scripts remain the evidence for the camera paths, chapter timings, materials and responsive behaviors above; their full visual execution was not verified. No claim of pixel-perfect or complete live-motion equivalence is made.

The rebuilt portfolio was captured in Chrome at 1440×1000 and 390×844. All seven chapters, native practice dialogs, mobile menu, canvas presence, horizontal overflow and reduced-motion loading were checked. Screenshot review led to moving the mobile ribbon below the headline, moving work scene geometry away from copy, dissolving the ribbon on contact, increasing interface texture contrast, and adding real component graphics to the modular scene.

## Final production verification

- `npm run build`: passed, including Next.js lint and TypeScript validation; homepage statically generated. Initial route JavaScript: 143 KB according to Next.js build output. WebGL loads separately.
- `npm run type-check` and `npm run lint`: passed; no lint warnings.
- Production Chrome tests at 320, 768, 1024 and 1440px: no horizontal overflow, loaded fonts, active Three.js canvas, completed loader at 100, working palette control, and no uncaught browser errors.
- Desktop and mobile practice dialogs and mobile navigation: opened and closed successfully.
- Changing reduced motion while running: scene reinitialized, smooth scrolling removed, dark navigation theme correctly updated in the work chapter.
- WebGL disabled: CSS scene fallback appeared and loader completed.
- JavaScript disabled: main headline visible and loader hidden.
- Native image optimization uses Sharp. Preview served on port 3100; no deployment performed.

## Requested visual revision

The generated UI and component image textures were removed entirely. Later chapters now use faceted crystal modules and interlocking reflective contours, while retaining the hero's ribbon and layout. The atmosphere, reflective materials, fallback, dialogs, favicon and loader shift gently toward blush pink.

The loader's competing initial and completion bar tweens are explicitly stopped before the reveal. Bar height animates directly, preserving fully rounded top corners. Progress finishes smoothly at 100, input is blocked during entry, and normal scrolling resumes afterward. Production output uses `.next-production` so a running development server cannot overwrite the preview's files.

The subsequent requested revision removes both the crystal modules and interlocking contours entirely. Those chapters retain their typography, pink atmosphere, and scroll transitions, with no replacement objects. The original hero ribbon remains.

## Labs reference — hero revision

Inspected https://labs.noomoagency.com/, its published preview imagery, page markup and public scene implementation. The live headless session stalled at its loading screen, so motion details were verified from the public implementation rather than claimed as observed interactions. The scene uses a broad translucent scalloped jellyfish bell, fine trailing tentacles, flowing oral arms, pink/purple transmission materials, an idle animation and scroll-driven model/camera tracks. Its default customization colors include #e392fe and #d357fe; transmission uses chromatic aberration and a small offscreen buffer.

The portfolio translates the organic silhouette and translucent pink treatment into an original procedural bell, scalloped rim, trailing filaments and four folded arms. No Noomo model, branding, text or texture is reused. GPU vertex deformation creates a gentle membrane pulse and flowing tendrils; GSAP integrates the creature with existing scroll poses and the reimagine interaction. Mobile reduces geometry and rendering frequency. Reduced motion freezes deformation. The rejected crystal and contour elements remain removed.

## Glass manta revision

Revisited Labs and inspected its published jellyfish imagery and transmission implementation. Translate its rose/lilac refractive material, spectral edge highlights, layered interior and organic motion into an original manta ray. The portfolio now uses Three.js physical transmission with IOR, volume attenuation, dispersion, thin-film iridescence, clearcoat, generated reflection lighting and procedural thickness/striation maps. Closed parametric wings enclose fan-shaped cartilage and branching capillaries. A shared custom vertex field synchronizes wing surfaces, internal structures and the tail; finite-difference normals follow deformation. No reference mesh or branded asset is reused. Live headless rendering of the reference remains loader-limited; material details are supported by published imagery and implementation inspection.

The revised manta silhouette uses broad elliptical wing edges with rounded tips, increased hero scale, and a slow traveling flap. Spanwise rotation preserves wing reach while flexing the wing tips; a smaller chordwise wave adds trailing-edge flow. The same deformation applies to the internal structures.

## Persistent glass ribbon revision

Removed the manta completely. Revisited Labs imagery and implementation: soft tinted transmission, bright spectral rim reflections, organic depth and layered internal highlights guide the original ribbon. One swept mesh morphs through five matching-topology path poses and returns from AM to its flowing form. GSAP drives shape, position, rotation, width, stretch, camera and color. A small refraction capture includes atmosphere and an internal filament; custom shading uses refracted sampling, chromatic separation, Fresnel edge reflections, soft studio highlights and iridescent color. Refraction is screen-space and does not capture DOM text. Foreground/behind passes share a world-space depth plane, allowing the same ribbon to cross DOM content without duplicating WebGL renderers. Original HTML/CSS interface studies give the ribbon visual screens to frame and weave around; these are practice illustrations, not fabricated client projects. Reduced motion freezes waves and changes chapter poses without animation.

Ribbon verification: production compilation, lint and type validation pass. Browser captures cover desktop (1440×1000), mobile (390×844), interface framing, work weaving, AM and contact return. No shader errors or horizontal overflow were reported. Glass normals are smoothed per pose, its ends are closed, and resizing across the mobile breakpoint recreates the scene with the appropriate geometry and paths.

Ribbon polish: increased hero scale and strip width, strengthened glass opacity and rose contrast, removed periodic surface striations, increased geometry density and enabled antialiasing. Surface normals follow sweep derivatives instead of triangle averages; gentler twist avoids sharp folds in broad bends. Refraction capture is higher resolution with multisampling. Loader bars are actual instanced cylindrical meshes with separate hemispherical caps, synchronized to the existing DOM/GSAP height animation. The canvas stays inside the loader through its exit, then returns to the foreground ribbon layer. Desktop/mobile checks report no shader errors or overflow; reduced motion stays static after entry.

Theme revision: softened the ribbon back to a more translucent material, with subdued absorption and highlights. Main content now sits above both ribbon passes. Reimagine switches the site between pink and a light parrot-green palette with sea-green glass, including typography, atmospheric lighting, dark chapters, interface studies, dialogs and focus colors. A separate GSAP theme control prevents scroll timelines from resetting the selected palette.

## Six themes and narrative morphs

The hero uses a new asymmetrical curled ribbon. The curiosity chapter morphs it into a lightbulb and filament; Code becomes components forms a five-petal flower with a stem and leaf. Subsequent poses retain the UI frame, screen weave, AM and continuous return. Only adjacent pose attributes are uploaded for interpolation. Dense arc-length sampling keeps the swept surface evenly sampled. The interface chapter now has an original detailed workspace composition. Work and contact use opaque #050506, with text and screens above the foreground ribbon. The original instanced 3D rose loader cylinders and rounded caps are retained.

Reimagine cycles Rose, Parrot, Sky, Peach, Lilac and Sand. Desktop/mobile production checks confirm all six palettes, the chapter poses, 3D loader, correct text layering, solid backgrounds, no horizontal overflow and no browser or shader errors. Reduced-motion screenshots remain static. Production build, including lint and type validation, passes.

## Horizontal work and flat loader revision

Section 04 now scrolls from right to left in a pinned viewport on desktop and mobile. Reduced motion uses native horizontal scrolling. The root clips horizontal overflow without creating another scrolling container. Mouse focus does not reposition panels; keyboard focus advances the narrative. Dark-scene foreground composition includes the full ribbon, including negative-depth segments, with a restrained studio fill. Work panels and contact links/details have glass surfaces over the opaque black chapter backgrounds. The loader 3D scene has been removed; bars are flat pale pink with rounded tops and the existing GSAP animation. The hero uses a new open S-shaped flowing path.

Final checks for this revision: production build and type validation passed. Desktop/mobile browser tests confirm no horizontal page overflow, hidden work-strip scrollbars, functioning practice dialogs, resize recovery and native scrolling after a live reduced-motion change. Mobile WebGL renders the new ribbon with no browser/shader errors; dark backgrounds remain rgb(5, 5, 6). Computed loader bar styles confirm no background image and no box shadow.

## Horizontal hero and portrait revision

The hero ribbon is a broad left-to-right wave, with shallow vertical curvature and a centered camera composition; mobile uses a lower scale to keep its horizontal silhouette in the viewport. Story, flower, frame and work poses retain their existing scroll transitions. The portrait uses the supplied public/afnan-dp.jpg through Next.js image optimization. Accessible inline SVG GitHub and LinkedIn links are visible in the desktop and mobile header, using the existing real profile URLs and glass controls.

## Original ribbon shape restored

Recovered the first living glass ribbon's ten control points and original desktop/mobile hero position, scale and camera rotation from the earlier implementation. Restored that flowing loop silhouette rather than approximating it. Current smooth normals, dense geometry, softer glass material, chapter morphs, themes, flat loader, portrait and header links remain in place.

Hero veil refinement: the restored curve has a broader 0.82 half-width, a thinner 0.045 cross-section and gentler twist. Increased hero scale and a separate hero stretch extend its silhouette; mobile uses a smaller stretch to fit the viewport. The starting ScrollTrigger pose and reduced-motion return use the same hero controls, preserving continuous transitions.

The subsequent explicit revert restores the first ribbon's complete hero geometry: ten original control points, 0.34 half-width, 0.045 thickness, original 3.2π twist field, unit stretch and original camera framing. This supersedes the veil width and gentler twist. The larger portrait and polished glass shading are retained.

## Loader contrast and entry stability

Flat loader bars now use #c692b5 against a lighter blush background, begin at an 8% height, and retain fully rounded tops without gradients or shadows. Progress digits reserve a stable width. The page reserves its scrollbar gutter while scroll input is locked. Hero reveal waits for the two actual font faces rather than a timeout; the final ScrollTrigger refresh runs after scroll locking is removed. Desktop/mobile production checks with delayed font downloads show identical hero and header geometry before and after entry, zero post-entry layout-shift entries, and no browser errors or horizontal overflow. Production build passes.

## Section 04 refinement and entry timing

Inspected the GSAP dynamic morphing demo and its linked source, https://codepen.io/GreenSock/pen/qBedXpg. The source animates two SVG layers using arrays of ten edge heights, staggered point and layer timing, midpoint cubic Bezier controls and power2.inOut easing. WorkMorph implements that observed approach as a reversible section-entry curtain; mobile uses six points and reduced motion removes the curtain. No MorphSVG dependency is needed.

The work ribbon now forms an original broad returning loop. Three original CSS/SVG interface studies replace the simple card compositions: a product workspace with metrics, release chart, website preview and task states; an AI workspace with context, response and recommendations; and a creative website with an orbital illustration and project thumbnails. The first practice is titled SaaS products and websites. Rendered copy and metadata no longer contain em dashes.

The foreground canvas stays at the portfolio root behind the loader and renders immediately, removing the former delayed reparenting and clearing behavior. A genuine WebGL test with delayed fonts confirmed visible ribbon pixels before entry completed, with no shader or browser errors. Desktop/mobile production tests confirmed changing morph paths, all three dialog titles, no card or page overflow, and reduced-motion curtain removal. Production build and type validation passed.

## Purple loader and eye pose

Loader bars now use light purple #b7a0dd. Section 04 morphs the same ribbon topology into a large almond-shaped eye: a continuous lid contour flows into a circular iris and coiled pupil. The pose uses gentle deformation and an untwisted cross-section for a readable silhouette, with desktop/mobile scales tuned separately. All other chapter shapes and glass materials remain unchanged.

Verification: production WebGL screenshots at 390px and 1440px show the large eye behind protected typography; neither viewport has horizontal page overflow. Computed loader bars are rgb(183, 160, 221). No browser or shader errors were reported. Production build, including lint and type validation, passes.

## Eye proportions and lashes

The eye outline is about 13% narrower and 27% taller, with a larger circular iris. Six upper and three lower glass lashes are swept into the same continuous curve. Their widths taper toward the tips using the curve’s arc-length mapping, preserving the existing shared topology and scroll morph without adding separate scene objects.

## Eye highlight refinement

Removed all lower lashes while retaining the six tapered upper lashes. Neutral studio-panel, strip and rim reflections are stronger for the eye pose, with a smooth shape-dependent shader weight so the shine appears continuously during the morph. Glass tint, opacity and other chapter materials remain unchanged.
