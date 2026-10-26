import Image from "next/image";
import { projects } from "@/content/projects";

const tiles = [
  { project: projects[0], image: projects[0].websiteImage, label: "Website" },
  { project: projects[1], image: projects[1].websiteImage, label: "Overview" },
  { project: projects[0], image: projects[0].appImage!, label: "Web application" },
  { project: projects[2], image: projects[2].websiteImage, label: "Website" },
  { project: projects[1], image: projects[1].appImage!, label: "Analytics" },
  { project: projects[1], image: projects[1].appImage!, label: "Web application" },
  null,
  { project: projects[2], image: projects[2].websiteImage, label: "Website" },
];

export function ProjectGlimpses() {
  return (
    <span className="project-glimpses" aria-hidden="true">
      <span className="bento-heading"><span>SELECTED PROJECTS</span><strong className="bento-current">Three products. One perspective.</strong></span>
      <span className="bento-camera">
        <span className="bento-gallery">
          {tiles.map((tile, index) => (
            <span key={index} className={`bento-tile${tile ? "" : " bento-note"}`} data-bento-project={tile?.project.id}>
              {tile ? <>
                <Image src={tile.image} alt="" fill sizes="(max-width: 767px) 92vw, 85vw" loading="eager" />
                <span className="bento-tile-label"><b>{tile.project.name}</b><span>{tile.label}</span></span>
              </> : <><span>03</span><span>Products.<br />Real-world possibilities.</span></>}
            </span>
          ))}
        </span>
      </span>
      <span className="bento-footer"><span>WEBSITES & WEB APPLICATIONS</span><span>View all projects ↗</span></span>
    </span>
  );
}
