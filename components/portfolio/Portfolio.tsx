"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import Lenis from "lenis";
import type { World } from "./World";
import { themes } from "./Themes";
import { DetailedInterface } from "./DetailedInterface";
import { WorkStudy } from "./WorkStudy";
import { WorkMorph } from "./WorkMorph";
import { CursorMagnifier } from "./CursorMagnifier";
import { ThemePortrait } from "./ThemePortrait";
import { ThemePicker } from "./ThemePicker";
import { LoaderComposition } from "./LoaderComposition";
import { ProjectGlimpses } from "./ProjectGlimpses";

gsap.registerPlugin(useGSAP, ScrollTrigger, Flip);
const links = [
  { href: "#story", label: "The story" },
  { href: "/projects", label: "Projects" },
  { href: "#about", label: "About me" },
  { href: "#contact", label: "Let’s talk" },
];
const practices = [
  {
    number: "01",
    title: "SaaS products and websites",
    kind: "Complexity, made clear",
    description:
      "High-performance, scalable SaaS frontends. Interactive dashboards, charts, role-based workflows, and application logic built around the people using them.",
    tags: ["React", "Next.js", "Zustand", "REST APIs", "ECharts", "Recharts"],
    detail:
      "At ContentStudio I work with UX/UI designers to turn complex products into clear ones: reusable components, predictable state with Zustand, role-based workflows, and data visualization with ECharts, Chart.js, and Recharts. Every interaction should help a user move forward.",
  },
  {
    number: "02",
    title: "AI-powered tools",
    kind: "Useful intelligence. Thoughtful interfaces.",
    description:
      "50+ AI-powered tools built and shipped on OpenAI APIs, turning complex capabilities into approachable, user-friendly experiences that drive organic growth.",
    tags: ["OpenAI APIs", "TypeScript", "API integration", "UI / UX"],
    detail:
      "I’ve developed and deployed more than 50 AI-powered tools using OpenAI APIs, driving significant organic traffic growth. Good tools make powerful technology feel approachable: thoughtful interaction design, clear feedback, and frontends that connect reliably to the services behind them.",
  },
  {
    number: "03",
    title: "Web experiences",
    kind: "From first impression to lasting impact",
    description:
      "Websites and applications that combine modern design, thoughtful structure, stylish visuals, and performance. Built for real users and real growth.",
    tags: ["Next.js", "Vue", "Tailwind CSS", "Technical SEO", "WCAG"],
    detail:
      "I’ve delivered multiple high-traffic websites that increased engagement and conversions. Responsive design, WCAG accessibility, technical on-page SEO with Next.js, performance, and smooth CI/CD deployment are part of the process from the beginning.",
  },
];

const chapters = [
  "Beginning",
  "A line of code",
  "The building blocks",
  "The interface",
  "The possibilities",
  "The person",
  "Your next chapter",
];
function Star({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16 0c0 10-6 16-16 16 10 0 16 6 16 16 0-10 6-16 16-16C22 16 16 10 16 0Z"
        fill="currentColor"
      />
    </svg>
  );
}
function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function Portfolio() {
  const root = useRef<HTMLDivElement>(null),
    canvas = useRef<HTMLCanvasElement>(null),
    world = useRef<World | null>(null);
  const loader = useRef<HTMLDivElement>(null),
    progress = useRef<HTMLSpanElement>(null),
    menu = useRef<HTMLDialogElement>(null),
    details = useRef<HTMLDialogElement>(null);
  const [ready, setReady] = useState(false),
    [assetsReady, setAssetsReady] = useState(false),
    [minimumElapsed, setMinimumElapsed] = useState(false),
    [entered, setEntered] = useState(false),
    [fallback, setFallback] = useState(false);
  const [chapter, setChapter] = useState(0),
    [selected, setSelected] = useState(0),
    [themeIndex, setThemeIndex] = useState(themes.findIndex((theme) => theme.id === "sand"));
  const reduced = useRef(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const progressTween = useRef<gsap.core.Tween | null>(null);
  const loadingFill = useRef<HTMLSpanElement>(null);
  const loadingCount = useRef({ value: 0 });

  useEffect(() => {
    let cancelled = false;
    const minimumTimer = window.setTimeout(() => {
      if (!cancelled) setMinimumElapsed(true);
    }, 1500);

    const fonts = Promise.all([
      document.fonts.load('400 16px "Story Sans"'),
      document.fonts.load('italic 400 16px "Story Serif"'),
    ]).then(() => document.fonts.ready);
    // All portrait layers are eager, including the About section and every
    // theme. Decode them now so later theme switches reuse prepared images.
    const images = Array.from(root.current?.querySelectorAll<HTMLImageElement>("img") ?? []);
    Promise.all([
      fonts.catch(() => undefined),
      ...images.map((image) => image.decode().catch(() => undefined)),
    ]).then(() => {
      if (!cancelled) setAssetsReady(true);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(minimumTimer);
    };
  }, []);

  useEffect(() => {
    let cancelled = false,
      generation = 0;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const viewport = matchMedia("(max-width: 767px)");
    const initialize = () => {
      const ticket = ++generation;
      world.current?.dispose();
      world.current = null;
      reduced.current = preference.matches;
      setReduceMotion(preference.matches);
      import("./World")
        .then(({ createWorld }) => {
          if (
            cancelled ||
            ticket !== generation ||
            !canvas.current ||
            !root.current
          )
            return;
          try {
            world.current = createWorld(
              canvas.current,
              root.current,
              reduced.current,
              () => {
                if (!cancelled) setReady(true);
              },
            );
          } catch {
            if (!cancelled) {
              setFallback(true);
              setReady(true);
            }
          }
        })
        .catch(() => {
          if (!cancelled) {
            setFallback(true);
            setReady(true);
          }
        });
    };
    initialize();
    preference.addEventListener("change", initialize);
    viewport.addEventListener("change", initialize);
    return () => {
      cancelled = true;
      preference.removeEventListener("change", initialize);
      viewport.removeEventListener("change", initialize);
      world.current?.dispose();
      world.current = null;
    };
  }, []);

  useEffect(() => {
    if (entered) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previous;
    };
  }, [entered]);

  useGSAP(
    () => {
      const count = loadingCount.current;
      count.value = 0;
      gsap.set(".hero-portrait", { autoAlpha: 0 });
      progressTween.current = gsap.to(count, {
        value: 92,
        duration: 1.5,
        ease: "none",
        onUpdate: () => {
          if (progress.current)
            progress.current.textContent = String(
              Math.round(count.value),
            ).padStart(2, "0");
          if (loadingFill.current)
            loadingFill.current.style.transform = `scaleX(${count.value / 100})`;
        },
      });
    },
    { scope: root },
  );

  useGSAP(
    () => {
      if (!ready || !assetsReady || !minimumElapsed) return;
      let stopped = false;
      let intro: gsap.core.Timeline | undefined;
      const reveal = () => {
        if (stopped) return;
        const quick = reduced.current;
        progressTween.current?.kill();
        const source = root.current?.querySelector(".loader-portrait")?.getBoundingClientRect();
        const destination = root.current?.querySelector(".hero-portrait")?.getBoundingClientRect();
        const flight = source && destination ? {
          x: destination.left - source.left,
          y: destination.top - source.top,
          scaleX: destination.width / source.width,
          scaleY: destination.height / source.height,
        } : { x: 0, y: 0, scaleX: 1, scaleY: 1 };
        const tl = (intro = gsap.timeline());
        tl.to(loadingCount.current, {
          value: 100,
          duration: quick ? 0 : 0.18,
          onUpdate: () => {
            if (progress.current)
              progress.current.textContent = String(
                Math.round(loadingCount.current.value),
              ).padStart(2, "0");
            if (loadingFill.current)
              loadingFill.current.style.transform = `scaleX(${loadingCount.current.value / 100})`;
          },
        })
          .to(
            ".loader-content, .loader-top",
            { opacity: 0, y: quick ? 0 : -16, duration: quick ? 0 : 0.2 },
          )
          .to(
            ".loader-portrait",
            {
              ...flight,
              duration: quick ? 0 : 0.6,
              ease: "power3.inOut",
            },
            "<",
          )
          .to(".loader-surface", { opacity: 0, duration: quick ? 0 : 0.5 }, "<")
          .set(".hero-portrait", { autoAlpha: 1 })
          .to(loader.current, { autoAlpha: 0, duration: 0.1, onComplete: () => setEntered(true) })
          .from(
            ".hero-prelude > *, .hero-title, .hero-caption, .hero-bottom",
            {
              opacity: 0,
              y: quick ? 0 : 35,
              stagger: quick ? 0 : 0.12,
              duration: quick ? 0.1 : 1.2,
              ease: "power3.out",
            },
            "-=.6",
          );
      };
      const frame = requestAnimationFrame(reveal);
      return () => {
        stopped = true;
        cancelAnimationFrame(frame);
        intro?.kill();
      };
    },
    { dependencies: [ready, assetsReady, minimumElapsed], scope: root, revertOnUpdate: true },
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
          mobile: "(max-width: 767px)",
        },
        (context) => {
          const { motion, mobile } = context.conditions!;
          if (motion) {
            gsap.utils
              .toArray<HTMLElement>(".reveal:not(#work .reveal)")
              .forEach((el) => {
                gsap.from(el, {
                  y: mobile ? 20 : 40,
                  opacity: 0,
                  filter: mobile ? "none" : "blur(5px)",
                  duration: 1.1,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: el,
                    start: "top 92%",
                    toggleActions: "play none none reverse",
                  },
                });
              });
            gsap.to(".hero-content", {
              y: mobile ? -35 : -90,
              opacity: 0,
              ease: "none",
              scrollTrigger: {
                trigger: "#home",
                start: "top top",
                end: "bottom 30%",
                scrub: 1,
              },
            });
            gsap.utils
              .toArray<HTMLElement>(
                ".chapter-heading:not(#work .chapter-heading)",
              )
              .forEach((el) => {
                gsap.fromTo(
                  el,
                  { y: mobile ? 12 : 40 },
                  {
                    y: mobile ? -12 : -40,
                    ease: "none",
                    scrollTrigger: {
                      trigger: el.closest("section"),
                      start: "top bottom",
                      end: "bottom top",
                      scrub: 1.2,
                    },
                  },
                );
              });
          }
          const work = root.current?.querySelector<HTMLElement>("#work");
          const viewport = work?.querySelector<HTMLElement>(".work-viewport");
          const track = work?.querySelector<HTMLElement>(".work-track");
          let horizontal: gsap.core.Tween | undefined;
          let removeFocus: (() => void) | undefined;
          if (motion && work && viewport && track) {
            work.dataset.horizontal = "true";
            const distance = () =>
              Math.max(0, track.scrollWidth - viewport.clientWidth);
            const card = track.querySelector<HTMLElement>(".practice-0")!;
            const preview = card.querySelector<HTMLElement>(".project-glimpses")!;
            const gallery = preview.querySelector<HTMLElement>(".bento-gallery")!;
            const camera = preview.querySelector<HTMLElement>(".bento-camera")!;
            const tiles = Array.from(gallery.querySelectorAll<HTMLElement>(".bento-tile"));
            const currentProject = preview.querySelector<HTMLElement>(".bento-current")!;
            const original = Array.from(card.children).filter((child) => child !== preview);
            const playhead = { progress: 0 };
            const clamp = gsap.utils.clamp(0, 1);
            const ease = gsap.parseEase("power2.inOut");
            let center = 0, extra = 0, total = 0, zoom = 0, hold = 0, fade = 0, scale = 1, column = 0, row = 0;
            let cardZoom: gsap.core.Tween | undefined;
            let bentoFlip: gsap.core.Timeline | undefined;
            let flipContext: gsap.Context | undefined;
            let currentTitle = "";
            const leftWithinTrack = (node: HTMLElement) => {
              let left = 0;
              let element: HTMLElement | null = node;
              while (element && element !== track) {
                left += element.offsetLeft;
                element = element.offsetParent as HTMLElement | null;
              }
              return left;
            };
            const measure = () => {
              center = Math.max(0, Math.min(distance(), leftWithinTrack(card) + card.offsetWidth / 2 - viewport.clientWidth / 2));
              zoom = viewport.clientHeight * 0.42;
              hold = viewport.clientHeight * 0.48;
              fade = viewport.clientHeight * 0.18;
              extra = zoom * 2 + hold * 3 + fade * 2;
              total = distance() + extra;
              scale = Math.max(1, Math.min(viewport.clientWidth * 0.94 / card.offsetWidth, viewport.clientHeight * 0.8 / card.offsetHeight));
              column = camera.clientWidth + 8;
              row = (camera.clientHeight + 8) / 2;
            };
            gsap.set(track, { x: 0 });
            gsap.set(card, { scale: 1, transformOrigin: "50% 50%", zIndex: 6 });
            gsap.set(preview, { opacity: 0 });
            gsap.set(original, { opacity: 1 });
            const moveTrack = gsap.quickSetter(track, "x", "px");
            const moveCameraX = gsap.quickSetter(camera, "x", "px");
            const moveCameraY = gsap.quickSetter(camera, "y", "px");
            const showPreview = gsap.quickSetter(preview, "opacity");
            const showOriginal = gsap.quickSetter(original, "opacity");
            const buildBento = () => {
              const oldZoom = cardZoom?.progress() ?? 0;
              cardZoom?.progress(0);
              flipContext?.revert();
              flipContext = gsap.context(() => {
                gallery.classList.add("bento-gallery-expanded");
                const finalState = Flip.getState(tiles);
                gallery.classList.remove("bento-gallery-expanded");
                bentoFlip = Flip.to(finalState, { simple: true, scale: true, paused: true, duration: 1, ease: "none" });
                bentoFlip.progress(0.00001).progress(0);
              }, root);
              cardZoom?.progress(oldZoom);
            };
            const renderJourney = () => {
              const travel = playhead.progress * total;
              const local = travel - center;
              const story = hold * 3 + fade * 2;
              const expanded = local < 0 || local > extra ? 0 : local < zoom ? ease(clamp(local / zoom)) : local > zoom + story ? 1 - ease(clamp((local - zoom - story) / zoom)) : 1;
              const opacity = clamp(expanded * 1.5);
              const time = clamp((local - zoom) / story);
              const reveal = ease(clamp((time - 0.12) / 0.2));
              const restore = ease(clamp((time - 0.88) / 0.12));
              const toReplug = ease(clamp((time - 0.42) / 0.13));
              const toUsermaven = ease(clamp((time - 0.65) / 0.13));
              moveTrack(-(local < 0 ? travel : local > extra ? travel - extra : center));
              cardZoom?.progress(expanded);
              showPreview(opacity);
              showOriginal(1 - opacity);
              bentoFlip?.progress(reveal * (1 - restore));
              moveCameraX(-column * toReplug * (1 - restore));
              moveCameraY(row * (-toReplug + 2 * toUsermaven) * (1 - restore));
              const title = time < 0.25 || time > 0.94 ? "Three products. One perspective." : time < 0.49 ? "ContentStudio" : time < 0.72 ? "Replug" : "Usermaven";
              if (title !== currentTitle) { currentProject.textContent = title; currentTitle = title; }
            };
            measure();
            cardZoom = gsap.fromTo(card, { scale: 1 }, { scale: () => scale, duration: 1, paused: true, ease: "none" });
            gsap.set(camera, { x: 0, y: 0 });
            buildBento();
            horizontal = gsap.to(playhead, {
              progress: 1,
              duration: 1,
              ease: "none",
              onUpdate: renderJourney,
              scrollTrigger: {
                id: "work-project-journey",
                trigger: viewport,
                start: "top top",
                end: () => `+=${distance() + extra}`,
                pin: viewport,
                pinType: "fixed",
                scrub: 0.8,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onRefreshInit: () => { measure(); cardZoom?.invalidate(); buildBento(); },
                onRefresh: () => { measure(); renderJourney(); },
              },
            });
            // Move the scroll narrative to focused panels for keyboard navigation.
            const focusPanel = (event: FocusEvent) => {
              const panel = (event.target as HTMLElement).closest<HTMLElement>(
                ".practice",
              );
              const trigger = horizontal?.scrollTrigger;
              if (panel && trigger && panel.matches(":focus-visible")) {
                const target = Math.max(0, Math.min(distance(), leftWithinTrack(panel) - viewport.clientWidth * 0.085));
                viewport.scrollLeft = 0;
                window.scrollTo({
                  top: trigger.start + target + (target > center ? extra : 0),
                  behavior: "instant",
                });
              }
            };
            track.addEventListener("focusin", focusPanel);
            removeFocus = () => {
              track.removeEventListener("focusin", focusPanel);
              flipContext?.revert();
            };
          }
          const sections = gsap.utils.toArray<HTMLElement>("main > section");
          sections.forEach((el, i) =>
            ScrollTrigger.create({
              trigger: el,
              start: "top center",
              end: "bottom center",
              onToggle: (self) => {
                if (self.isActive) setChapter(i);
              },
            }),
          );
          return () => {
            removeFocus?.();
            if (work) delete work.dataset.horizontal;
          };
        },
      );
      const cursor = root.current?.querySelector(".cursor") as HTMLElement;
      const lens = root.current?.querySelector(".cursor-lens") as HTMLElement;
      const moveX = gsap.quickTo(cursor, "x", {
          duration: 0.35,
          ease: "power3",
        }),
        moveY = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" });
      const lensX = gsap.quickTo(lens, "x", { duration: 0.35, ease: "power3" });
      const lensY = gsap.quickTo(lens, "y", { duration: 0.35, ease: "power3" });
      const mouse = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        moveX(e.clientX);
        moveY(e.clientY);
        lensX(e.clientX);
        lensY(e.clientY);
        cursor.dataset.visible = "true";
        lens.dataset.visible = "true";
        cursor.dataset.hover = String(
          !!(e.target as HTMLElement).closest("a,button"),
        );
      };
      const leave = () => {
        cursor.dataset.visible = "false";
        lens.dataset.visible = "false";
      };
      window.addEventListener("pointermove", mouse, { passive: true });
      document.addEventListener("pointerleave", leave);
      return () => {
        mm.revert();
        window.removeEventListener("pointermove", mouse);
        document.removeEventListener("pointerleave", leave);
        gsap.killTweensOf(cursor);
        gsap.killTweensOf(lens);
      };
    },
    { scope: root },
  );

  useEffect(() => {
    const themeName = themes[themeIndex].id;
    document.documentElement.dataset.theme = themeName;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", themes[themeIndex].bottom);
    return () => {
      delete document.documentElement.dataset.theme;
    };
  }, [themeIndex]);

  useEffect(() => {
    if (!entered) return;
    world.current?.render();
    // Refresh after the scroll-lock cleanup restores the final viewport layout.
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [entered]);

  useEffect(() => {
    if (!entered || reduceMotion || matchMedia("(pointer: coarse)").matches)
      return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    const anchor = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (a?.hash && document.querySelector(a.hash)) {
        e.preventDefault();
        lenis.scrollTo(a.hash);
        history.replaceState(null, "", a.hash);
        if (a.classList.contains("skip-link"))
          document
            .querySelector<HTMLElement>(a.hash)
            ?.focus({ preventScroll: true });
      }
    };
    const element = root.current;
    element?.addEventListener("click", anchor);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      element?.removeEventListener("click", anchor);
    };
  }, [entered, reduceMotion]);

  const dark = chapter === 4 || chapter === 6;
  const openPractice = (index: number) => {
    setSelected(index);
    details.current?.showModal();
  };
  const selectTheme = (index: number) => {
    if (index === themeIndex) return;
    world.current?.reimagine(themes[index].id);
    setThemeIndex(index);
  };

  return (
    <div
      ref={root}
      className="portfolio"
      data-theme={themes[themeIndex].id}
      data-dark={dark}
      data-chapter={chapter}
      data-entered={entered}
    >
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="world" aria-hidden="true">
        <canvas ref={canvas} />
        {fallback && (
          <div className="world-fallback">
            <svg className="fallback-ribbon" viewBox="0 0 400 440" fill="none">
              <path
                d="M30 50C160-10 360 130 270 180S20 210 105 305S350 370 330 420"
                stroke="#c1a0c4"
                strokeWidth="32"
                strokeOpacity=".45"
                strokeLinecap="round"
              />
              <path
                d="M30 44C160-16 360 124 270 174S20 204 105 299S350 364 330 414"
                stroke="#f8eff8"
                strokeWidth="2"
                strokeOpacity=".7"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}
      </div>
      <div ref={loader} className="loader" aria-hidden="true">
        <LoaderComposition />
        <div className="loader-top">
          <span className="loader-logo">afnan<span>.</span></span>
          <span className="loader-note">FRONTEND ENGINEER<br />DESIGNER & CURIOUS HUMAN</span>
        </div>
        <div className="loader-content">
          <span className="loader-invitation">A DIFFERENT KIND OF PORTFOLIO</span>
          <p className="loader-heading">From logic<br />to <i>feeling.</i></p>
          <p className="loader-caption">A little logic. A lot of possibility.</p>
          <div className="loader-footer">
            <div className="loader-status">
              <span className="loader-status-label">Shaping the experience</span>
              <span className="loader-percentage"><span ref={progress}>00</span><span>%</span></span>
            </div>
            <div className="loader-progress">
              <span ref={loadingFill} />
            </div>
          </div>
        </div>
      </div>
      <noscript>
        <style>{`.loader{display:none!important}.world{display:none}.portfolio{background:#e5dcc2}.work,.contact{background:#050506}`}</style>
      </noscript>
      <header className="site-header">
        <a href="#home" className="wordmark" aria-label="Afnan Mehmood, home">
          afnan<span>.</span>
        </a>
        <span className="header-role">ENGINEERING × DESIGN</span>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((l) => l.href === "/projects" ? (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ) : (
            <a key={l.href} href={l.href}>
              {l.label}
              {l.href === "#contact" && <Arrow />}
            </a>
          ))}
        </nav>
        <div className="header-socials">
          <a
            className="glass"
            href="https://github.com/D4-afnan"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Afnan on GitHub"
            title="GitHub"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0 1 12 6.82c.85 0 1.7.11 2.5.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
            </svg>
          </a>
          <a
            className="glass"
            href="https://linkedin.com/in/afnan-mehmood"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Afnan on LinkedIn"
            title="LinkedIn"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.65"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <path d="M7.5 10.5V17M11.5 17v-6.5M11.5 13.2c0-3.2 5-3.3 5 0V17" />
              <circle
                cx="7.5"
                cy="7.5"
                r="1"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          </a>
        </div>
        <ThemePicker themeIndex={themeIndex} onSelect={selectTheme} />
        <button
          className="menu-button glass"
          onClick={() => menu.current?.showModal()}
          aria-label="Open navigation"
        >
          Menu <span>＋</span>
        </button>
      </header>
      <main id="main" tabIndex={-1}>
        <section id="home" className="hero" aria-label="Introduction">
          <div className="hero-content">
            <div className="hero-prelude">
              <p className="eyebrow">
                <span className="tiny-star">✳</span> THE PORTFOLIO OF AFNAN
                MEHMOOD
              </p>
              <h1>
                From a line <i>of</i> code
                <br />
                to something you <i>feel.</i>
              </h1>
            </div>
            <div className="hero-portrait">
              <ThemePortrait
                themeIndex={themeIndex}
                alt="Afnan Mehmood’s avatar"
                sizes="(max-width: 767px) 250px, (max-width: 1100px) 390px, 485px"
                priority
              />
            </div>
            <div className="hero-title" aria-hidden="true">
              experiences
            </div>
            <div className="hero-caption">
              <p>
                Frontend Engineer
                <br />
                UI/UX Engineer <span>+</span> Designer
              </p>
              <span className="caption-line" />
              <p>
                Thoughtful by design.
                <br />
                Precise by development.
              </p>
            </div>
            <div className="hero-bottom">
              <span>BASED IN PAKISTAN · BUILDING FOR THE WEB</span>
              <a href="#story" className="explore-link">
                <Star /> Scroll to explore <span aria-hidden="true">↓</span>
              </a>
              <span className="hero-coordinate">01 / 07</span>
            </div>
          </div>
        </section>
        <section id="story" className="story chapter">
          <div className="chapter-inner">
            <div className="story-copy">
              <p className="eyebrow reveal">01 / THE STARTING POINT</p>
              <h2 className="chapter-heading reveal">
                Every great
                <br />
                experience starts
                <br />
                with a <i>little curiosity.</i>
              </h2>
              <span className="fine-line reveal" />
              <p className="body-copy reveal">
                I’m Afnan. I connect the precision of frontend engineering with
                the intuition of design, turning complex ideas into interfaces
                that feel effortless.
              </p>
            </div>
            <div className="floating-note reveal">
              <Star />
              <span>
                A thought becomes a line.
                <br />A line becomes a possibility.
              </span>
            </div>
          </div>
        </section>
        <section id="components" className="components chapter">
          <div className="chapter-inner">
            <div className="left-copy">
              <p className="eyebrow reveal">02 / CODE BECOMES COMPONENTS</p>
              <h2 className="chapter-heading reveal">
                Small details.
                <br />
                <i>Beautiful</i>
                <br />
                systems.
              </h2>
              <p className="body-copy reveal">
                A component is more than a piece of code. It’s a considered
                interaction, a reusable idea, a building block for something
                bigger.
              </p>
              <div className="inline-skills reveal">
                <span>React</span>
                <span>Next.js</span>
                <span>Vue</span>
                <span>TypeScript</span>
                <span>Tailwind CSS</span>
              </div>
            </div>
            <div className="scene-label reveal">
              <span className="label-dot" /> REUSABLE. RESPONSIVE. PURPOSEFUL.
            </div>
          </div>
        </section>
        <section id="interfaces" className="interfaces chapter">
          <div className="chapter-inner">
            <div className="interface-study">
              <DetailedInterface />
            </div>
            <div className="right-copy">
              <p className="eyebrow reveal">
                03 / COMPONENTS BECOME INTERFACES
              </p>
              <h2 className="chapter-heading reveal">
                Make the complex
                <br />
                feel <i>simple.</i>
              </h2>
              <p className="body-copy reveal">
                Thoughtful structure. Modern design. User-friendly interfaces. I
                build high-performance, scalable frontends that put people
                first.
              </p>
              <div className="inline-skills reveal">
                <span>UI / UX</span>
                <span>Design systems</span>
                <span>Accessibility</span>
              </div>
            </div>
            <div className="floating-note reveal">
              <Star />
              <span>
                Made to look right.
                <br />
                Built to work beautifully.
              </span>
            </div>
          </div>
        </section>
        <section id="work" className="work chapter">
          <div className="work-viewport">
            <WorkMorph />
            <div className="work-inner work-track">
              <div className="work-heading">
                <p className="eyebrow reveal">
                  04 / INTERFACES BECOME EXPERIENCES
                </p>
                <h2 className="chapter-heading reveal">
                  Where ideas
                  <br />
                  come <i>to life.</i>
                </h2>
                <p className="reveal work-intro">
                  A look into the experiences I build.
                  <br />
                  Explore a practice, or find my code on{" "}
                  <a
                    href="https://github.com/D4-afnan"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub <Arrow />
                  </a>
                  .
                </p>
              </div>
              <div className="practice-list">
                {practices.map((p, i) => {
                  const content = <>
                    <span className="practice-number">{p.number}</span>
                    <span>
                      <span className="practice-kind">{p.kind}</span>
                      <span className="practice-title">{p.title}</span>
                      <span className="practice-link">
                        {i === 1 ? "Explore the practice" : "View the projects"} <Arrow />
                      </span>
                    </span>
                    <WorkStudy variant={i} />
                    <span className="practice-star">
                      <Star />
                    </span>
                  </>;
                  return i === 1 ? (
                    <button key={p.number} className={`practice practice-${i} reveal`} onClick={() => openPractice(i)}>{content}</button>
                  ) : (
                    <Link key={p.number} href="/projects" className={`practice practice-${i} reveal`}>{content}{i === 0 && <ProjectGlimpses />}</Link>
                  );
                })}
              </div>
            </div>
            <span className="work-footnote">
              DESIGN WITH INTENTION. DEVELOP WITH PRECISION.
            </span>
          </div>
        </section>
        <section id="about" className="about chapter">
          <div className="about-inner">
            <p className="eyebrow reveal">05 / THE PERSON BEHIND THE PIXELS</p>
            <h2 className="chapter-heading reveal">
              Engineer by logic.
              <br />
              Designer <i>at heart.</i>
            </h2>
            <div className="about-content">
              <div className="portrait reveal">
                <div className="portrait-photo">
                  <ThemePortrait
                    themeIndex={themeIndex}
                    alt="Afnan’s personal avatar"
                    sizes="(max-width: 767px) 230px, 320px"
                  />
                </div>
                <span>
                  Afnan Mehmood <Star />
                </span>
              </div>
              <div className="about-copy">
                <p className="body-copy reveal">
                  Since 2021 I’ve been a Software Developer at D4 Interactive,
                  building ContentStudio: high-performance, scalable SaaS
                  frontends with React, Next.js, and Vue, 50+ AI-powered tools
                  on OpenAI APIs, interactive dashboards, and optimized web
                  applications that drive user engagement and measurable
                  growth.
                </p>
                <p className="body-copy reveal">
                  From small portfolio sites to web and mobile applications, my
                  approach combines modern design, thoughtful structure, and
                  user-friendliness so that each project works for the result.
                </p>
                <a className="text-link reveal" href="mailto:d4afnan@gmail.com">
                  Let’s create something together <Arrow />
                </a>
              </div>
            </div>
            <div className="expertise reveal">
              <div>
                <span>THE CRAFT</span>
                <p>
                  JavaScript ES6+ · TypeScript · React · Next.js · Vue
                  <br />
                  Tailwind CSS · Mantine UI · UI/UX · Responsive design · WCAG
                </p>
              </div>
              <div>
                <span>UNDER THE SURFACE</span>
                <p>
                  Zustand · REST APIs · OpenAI APIs · MongoDB · Strapi
                  <br />
                  ECharts · Chart.js · Recharts · Python · C++
                  <br />
                  Technical SEO · Core Web Vitals · Git · Docker · CI/CD
                </p>
              </div>
              <div>
                <span>THE PATH</span>
                <p>
                  Software Developer · D4 Interactive (ContentStudio)
                  <br />
                  Nov 2021 – present · Rawalpindi
                  <br />
                  BS Computer Science · IIU Islamabad · 2018–2022 · CGPA 3.60
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="contact chapter">
          <div className="contact-inner">
            <p className="eyebrow reveal">06 / THE NEXT CHAPTER IS YOURS</p>
            <h2 className="chapter-heading reveal">
              Have a little
              <br />
              <i>something</i> in mind?
            </h2>
            <p className="body-copy reveal">
              Ready to bring your ideas to life?
              <br />
              Let’s discuss your next project.
            </p>
            <a href="mailto:d4afnan@gmail.com" className="email-link reveal">
              d4afnan@gmail.com <Arrow />
            </a>
            <div className="contact-bottom">
              <div>
                <span className="small-label">FIND ME ELSEWHERE</span>
                <div className="socials">
                  <a
                    href="https://github.com/D4-afnan"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub <Arrow />
                  </a>
                  <a
                    href="https://linkedin.com/in/afnan-mehmood"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn <Arrow />
                  </a>
                  <a
                    href="https://instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram <Arrow />
                  </a>
                </div>
              </div>
              <div className="office">
                <span className="small-label">
                  RAWALPINDI / ISLAMABAD, PAKISTAN
                </span>
                <p>
                  88 Chinar Rd, I-10/3
                  <br />
                  Islamabad, 44000, Pakistan
                </p>
                <a className="phone-link" href="tel:+923135599281">
                  +92 313 5599281 ↗
                </a>
              </div>
              <a href="#home" className="back-top">
                Back to the beginning ↑
              </a>
            </div>
            <footer>
              <span>© {new Date().getFullYear()} Afnan Mehmood</span>
              <span>Designed & developed with curiosity.</span>
            </footer>
          </div>
        </section>
      </main>
      <div className="chapter-track" aria-hidden="true">
        <span>{String(chapter + 1).padStart(2, "0")}</span>
        <div>
          {chapters.map((c, i) => (
            <a
              tabIndex={-1}
              title={c}
              key={c}
              href={
                [
                  "#home",
                  "#story",
                  "#components",
                  "#interfaces",
                  "#work",
                  "#about",
                  "#contact",
                ][i]
              }
              className={chapter === i ? "active" : ""}
            />
          ))}
        </div>
        <span>07</span>
      </div>
      <CursorMagnifier />
      <div className="cursor" aria-hidden="true">
        <Star />
      </div>
      <dialog
        ref={menu}
        aria-label="Navigation"
        data-lenis-prevent
        className="menu-dialog"
        onClick={(e) => {
          if (e.target === menu.current) menu.current.close();
        }}
      >
        <div className="menu-top">
          <span className="wordmark">afnan.</span>
          <button
            className="glass"
            onClick={() => menu.current?.close()}
            aria-label="Close navigation"
          >
            Close ×
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {links.map((l, i) => l.href === "/projects" ? (
            <Link key={l.href} href={l.href} onClick={() => menu.current?.close()}><span>0{i + 1}</span>{l.label}<Arrow /></Link>
          ) : (
            <a key={l.href} href={l.href} onClick={() => menu.current?.close()}>
              <span>0{i + 1}</span>
              {l.label}
              <Arrow />
            </a>
          ))}
        </nav>
        <a className="menu-email" href="mailto:d4afnan@gmail.com">
          d4afnan@gmail.com ↗
        </a>
      </dialog>
      <dialog
        ref={details}
        aria-labelledby="practice-title"
        data-lenis-prevent
        className="practice-dialog"
        onClick={(e) => {
          if (e.target === details.current) details.current.close();
        }}
      >
        <div className="detail-top">
          <span className="eyebrow">
            THE PRACTICE / {practices[selected].number}
          </span>
          <button
            className="glass"
            onClick={() => details.current?.close()}
            aria-label="Close practice"
          >
            Close ×
          </button>
        </div>
        <Star className="detail-star" />
        <p className="practice-kind">{practices[selected].kind}</p>
        <h2 id="practice-title">{practices[selected].title}</h2>
        <p className="body-copy">{practices[selected].description}</p>
        <p className="body-copy">{practices[selected].detail}</p>
        <div className="inline-skills">
          {practices[selected].tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <a
          href="https://github.com/D4-afnan"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link"
        >
          Explore my code on GitHub <Arrow />
        </a>
        <a href="mailto:d4afnan@gmail.com" className="text-link">
          Discuss a project <Arrow />
        </a>
      </dialog>
    </div>
  );
}
