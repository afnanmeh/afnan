import type { Metadata } from "next";
import { ProjectsPage } from "@/components/projects/ProjectsPage";

export const metadata: Metadata = {
  title: "Projects | Afnan Mehmood",
  description: "Selected work across ContentStudio, Replug, and Usermaven. Website contributions for all three products, and web application work for ContentStudio and Replug.",
  openGraph: {
    title: "Selected projects — Afnan Mehmood",
    description: "Three products. Websites, applications, and thoughtful frontend experiences.",
  },
};

export default function Page() {
  return <ProjectsPage />;
}
