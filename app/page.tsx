"use client";

import { Container } from "@mantine/core";
import { Header } from "@/components/Header/Header";
import { Hero } from "@/components/Hero/Hero";
import { About } from "@/components/About/About";
import { Experience } from "@/components/Experience/Experience";
import { Skills } from "@/components/Skills/Skills";
import { Contact } from "@/components/Contact/Contact";
import { Footer } from "@/components/Footer/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Contact />
      <Footer />
    </>
  );
}
