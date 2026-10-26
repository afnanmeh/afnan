"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/content/projects";
import { themes } from "@/components/portfolio/Themes";
import { ThemePicker } from "@/components/portfolio/ThemePicker";
import styles from "./Projects.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);
const homeLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/#about", label: "About me" },
  { href: "/#contact", label: "Let’s talk" },
];

function Arrow() { return <span aria-hidden="true">↗</span>; }

export function ProjectsPage() {
  const root = useRef<HTMLDivElement>(null);
  const [themeIndex, setThemeIndex] = useState(themes.findIndex((theme) => theme.id === "sand"));
  const [activeProject, setActiveProject] = useState("contentstudio");
  const [screens, setScreens] = useState<Record<string, "website" | "app">>({});

  useEffect(() => {
    document.documentElement.dataset.theme = themes[themeIndex].id;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", themes[themeIndex].bottom);
    return () => { document.documentElement.dataset.theme = "sand"; };
  }, [themeIndex]);

  useGSAP(() => {
    const changeScreen = (id: string, screen: "website" | "app") => {
      setScreens((current) => current[id] === screen ? current : { ...current, [id]: screen });
    };
    root.current?.querySelectorAll<HTMLElement>("[data-project]").forEach((article) => {
      ScrollTrigger.create({
        trigger: article,
        start: "top 45%",
        end: "bottom 45%",
        onToggle: (self) => { if (self.isActive) setActiveProject(article.id); },
      });
      const appStep = article.querySelector("[data-application-step]");
      if (appStep) ScrollTrigger.create({
        trigger: appStep,
        start: "top 60%",
        onEnter: () => changeScreen(article.id, "app"),
        onLeaveBack: () => changeScreen(article.id, "website"),
      });
    });

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-hero-reveal]", { opacity: 0, y: 26, duration: 0.9, stagger: 0.08, ease: "power3.out" });
      gsap.from("[data-preview]", { opacity: 0, y: 50, rotation: 4, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.12 });
      root.current?.querySelectorAll<HTMLElement>("[data-project]").forEach((article) => {
        const heading = article.querySelector("[data-project-heading]");
        const visual = article.querySelector("[data-project-visual]");
        gsap.from(heading, { opacity: 0, y: 38, duration: 0.85, ease: "power3.out", scrollTrigger: { trigger: heading, start: "top 90%", once: true } });
        gsap.fromTo(visual, { y: 24, rotation: -1.5 }, { y: 0, rotation: 0, ease: "none", scrollTrigger: { trigger: article, start: "top bottom", end: "top 20%", scrub: 0.7 } });
        article.querySelectorAll<HTMLElement>("[data-feature]").forEach((feature) => {
          gsap.from(feature, { opacity: 0, y: 18, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: feature, start: "top 94%", once: true } });
        });
      });
    });
    return () => media.revert();
  }, { scope: root });

  const setScreen = (id: string, screen: "website" | "app") => setScreens((current) => ({ ...current, [id]: screen }));

  return (
    <div ref={root} className={`portfolio ${styles.page}`} data-theme={themes[themeIndex].id} data-entered="true">
      <a href="#projects-main" className="skip-link">Skip to projects</a>
      <header className={`site-header ${styles.header}`}>
        <Link href="/" className="wordmark" aria-label="Afnan Mehmood, home">afnan<span>.</span></Link>
        <span className="header-role">ENGINEERING × DESIGN</span>
        <nav className="desktop-nav" aria-label="Main navigation">
          {homeLinks.map((link) => <Link key={link.href} href={link.href} aria-current={link.href === "/projects" ? "page" : undefined}>{link.label}</Link>)}
        </nav>
        <div className="header-socials">
          <a href="https://github.com/D4-afnan" className="glass" target="_blank" rel="noopener noreferrer" aria-label="Afnan on GitHub">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.47-1.47-1.47-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0 1 12 6.82c.85 0 1.7.11 2.5.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" /></svg>
          </a>
          <a href="https://linkedin.com/in/afnan-mehmood" className="glass" target="_blank" rel="noopener noreferrer" aria-label="Afnan on LinkedIn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M7.5 10.5V17M11.5 17v-6.5M11.5 13.2c0-3.2 5-3.3 5 0V17" /><circle cx="7.5" cy="7.5" r="1" fill="currentColor" stroke="none" /></svg>
          </a>
        </div>
        <ThemePicker themeIndex={themeIndex} onSelect={setThemeIndex} />
        <details className={styles.mobileNav}>
          <summary className="menu-button glass">Menu <span>＋</span></summary>
          <nav aria-label="Mobile navigation">{homeLinks.map((link) => <Link key={link.href} href={link.href} onClick={(event) => event.currentTarget.closest("details")?.removeAttribute("open")}>{link.label}<Arrow /></Link>)}</nav>
        </details>
      </header>

      <main id="projects-main" tabIndex={-1}>
        <section className={styles.hero} aria-labelledby="projects-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow} data-hero-reveal>SELECTED WORK / PRODUCTS I’VE CONTRIBUTED TO</p>
            <h1 id="projects-title" data-hero-reveal>Built for the<br /><i>real world.</i></h1>
            <p className={styles.heroDescription} data-hero-reveal>From a product’s first impression to the application people use every day. A closer look at my work across ContentStudio, Replug, and Usermaven.</p>
            <div className={styles.heroStats} data-hero-reveal>
              <span><b>03</b>Products</span><span><b>03</b>Websites</span><span><b>02</b>Web applications</span>
            </div>
            <a href="#contentstudio" className={styles.explore} data-hero-reveal>Explore the projects <span aria-hidden="true">↓</span></a>
          </div>
          <div className={styles.heroPreview} aria-hidden="true">
            {projects.map((project) => <div key={project.id} className={styles.previewCard} data-preview style={{ "--project-color": project.color } as CSSProperties}>
              <div className={styles.previewLabel}><span>{project.number} / {project.name}</span><Arrow /></div>
              <Image src={project.websiteImage} alt="" width={1440} height={1000} sizes="(max-width: 767px) 70vw, 32vw" priority={project.id === "contentstudio"} />
            </div>)}
          </div>
          <span className={styles.heroFootnote}>WEBSITES. APPLICATIONS. THE DETAILS IN BETWEEN.</span>
        </section>

        <nav className={styles.projectIndex} aria-label="Project index">
          <span>THE PROJECTS</span>
          {projects.map((project) => <a key={project.id} href={`#${project.id}`} aria-current={activeProject === project.id ? "location" : undefined}><span>{project.number}</span>{project.name}<Arrow /></a>)}
        </nav>

        {projects.map((project) => {
          const appActive = screens[project.id] === "app" && Boolean(project.appImage);
          return (
            <article key={project.id} id={project.id} className={styles.project} data-project style={{ "--project-color": project.color, "--project-tint": project.tint } as CSSProperties}>
              <header className={styles.projectHeading} data-project-heading>
                <div><p className={styles.eyebrow}>{project.number} / {project.category}</p><h2>{project.name}<span>.</span></h2></div>
                <div className={styles.projectLead}><p>{project.headline}</p><div className={styles.scope}>{project.scope.map((scope) => <span key={scope}>{scope}</span>)}</div></div>
              </header>

              <div className={styles.storyGrid}>
                <div className={styles.visualColumn}>
                  <figure className={styles.visualSticky} data-project-visual>
                    <div className={styles.browserBar}><span className={styles.browserDots}><i /><i /><i /></span><span>{new URL(project.website).hostname}</span><a href={appActive ? project.app : project.website} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.name} ${appActive ? "application" : "website"}`}><Arrow /></a></div>
                    <div className={styles.visualFrame}>
                      <div className={styles.screenPanel} aria-hidden={appActive} style={{ opacity: appActive ? 0 : 1 }}>
                        <Image src={project.websiteImage} alt={project.websiteImageLabel} fill sizes="(max-width: 900px) 90vw, 55vw" />
                      </div>
                      {project.appImage && <div className={`${styles.screenPanel} ${styles.appPanel}`} aria-hidden={!appActive} style={{ opacity: appActive ? 1 : 0 }}>
                        <Image src={project.appImage} alt={`${project.name} application imagery from its official product resources`} fill sizes="(max-width: 900px) 90vw, 55vw" />
                      </div>}
                    </div>
                    <figcaption className={styles.visualCaption}>
                      <div className={styles.previewSwitch} role="group" aria-label={`${project.name} preview`}>
                        <button aria-pressed={!appActive} onClick={() => setScreen(project.id, "website")}>{project.id === "replug" ? "Overview" : "Website"}</button>
                        {project.appImage && <button aria-pressed={appActive} onClick={() => setScreen(project.id, "app")}>Application</button>}
                      </div>
                      <span>{appActive ? "Official product imagery" : project.id === "replug" ? "Official video preview" : "Live website capture"}</span>
                    </figcaption>
                  </figure>
                </div>

                <div className={styles.storyCopy}>
                  <section className={styles.storyStep}>
                    <p className={styles.smallLabel}>THE PRODUCT</p>
                    <h3>{project.summary}</h3>
                    <p>{project.contribution}</p>
                    <dl className={styles.projectFacts}><div><dt>My involvement</dt><dd>{project.scope.join(" & ")}</dd></div><div><dt>Built for</dt><dd>{project.audience}</dd></div></dl>
                    <div className={styles.visitLinks}><a href={project.website} target="_blank" rel="noopener noreferrer">Visit website <Arrow /></a>{project.appImage && <a href={project.app} target="_blank" rel="noopener noreferrer">Open app <Arrow /></a>}</div>
                  </section>

                  <section className={styles.storyStep}>
                    <p className={styles.smallLabel}>THE WEBSITE</p>
                    <h3>{project.websiteTitle}</h3>
                    <p>{project.websiteDescription}</p>
                  </section>

                  {project.appDescription && <section className={styles.storyStep} data-application-step>
                    <p className={styles.smallLabel}>THE WEB APPLICATION</p>
                    <h3>A workspace for the work itself.</h3>
                    <p>{project.appDescription}</p>
                  </section>}

                  <section className={styles.capabilities}>
                    <p className={styles.smallLabel}>INSIDE THE PRODUCT</p>
                    <h3>What the platform brings together.</h3>
                    <div className={styles.featureList}>{project.features.map((feature, index) => <div key={feature.title} className={styles.feature} data-feature>
                      <span>{String(index + 1).padStart(2, "0")}</span><div><h4><a href={feature.source} target="_blank" rel="noopener noreferrer">{feature.title}<Arrow /></a></h4><p>{feature.description}</p></div>
                    </div>)}</div>
                    <div className={styles.ecosystem}><p className={styles.smallLabel}>THE WIDER ECOSYSTEM</p><p>{project.ecosystem}</p><a href={project.ecosystemSource} target="_blank" rel="noopener noreferrer">Explore the platform <Arrow /></a></div>
                    <div className={styles.sources}><span>Product references</span>{project.references.map((reference) => <a href={reference.href} key={reference.href} target="_blank" rel="noopener noreferrer">{reference.label} <Arrow /></a>)}</div>
                  </section>
                </div>
              </div>
            </article>
          );
        })}

        <section className={styles.closing}>
          <p className={styles.eyebrow}>YOUR NEXT PRODUCT</p>
          <h2>Good products deserve<br /><i>thoughtful interfaces.</i></h2>
          <a href="mailto:d4afnan@gmail.com">Let’s build something useful <Arrow /></a>
          <footer><Link href="/">← Back to the portfolio</Link><span>© {new Date().getFullYear()} Afnan Mehmood</span></footer>
        </section>
      </main>
    </div>
  );
}
