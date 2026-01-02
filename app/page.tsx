"use client";

import { useState, useEffect } from "react";
import { Container } from "@mantine/core";
import { Header } from "@/components/Header/Header";
import { Hero } from "@/components/Hero/Hero";
import { About } from "@/components/About/About";
import { Experience } from "@/components/Experience/Experience";
import { Skills } from "@/components/Skills/Skills";
import { Contact } from "@/components/Contact/Contact";
import { Footer } from "@/components/Footer/Footer";
import { Loading } from "@/components/Loading";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [resourcesLoaded, setResourcesLoaded] = useState(false);

  useEffect(() => {
    // Preload critical resources
    const preloadResources = async () => {
      try {
        // Wait for fonts to load
        if (document.fonts) {
          await document.fonts.ready;
        }

        // Preload images
        const imageUrls = [
          "/afnan-profilee.png",
          // Add any other critical images here
        ];

        const imagePromises = imageUrls.map((url) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = resolve;
            img.src = url;
          });
        });

        await Promise.all(imagePromises);

        // Wait for any existing images in DOM
        const existingImages = document.querySelectorAll("img");
        const existingImagePromises = Array.from(existingImages).map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        });

        await Promise.all(existingImagePromises);

        // Mark resources as loaded
        setResourcesLoaded(true);
      } catch (error) {
        console.error("Error preloading resources:", error);
        setResourcesLoaded(true);
      }
    };

    preloadResources();
  }, []);

  const handleLoadingComplete = () => {
    // Only complete loading if resources are loaded
    if (resourcesLoaded) {
      setIsLoading(false);
      setShowContent(true);
    }
  };

  // Trigger loading complete when resources are ready
  useEffect(() => {
    if (resourcesLoaded && !isLoading) {
      setShowContent(true);
    }
  }, [resourcesLoaded, isLoading]);

  return (
    <div style={{ backgroundColor: "#000000", minHeight: "100vh" }}>
      {isLoading && <Loading onLoadingComplete={handleLoadingComplete} />}
      {showContent && (
        <>
          <Header />
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Contact />
          <Footer />
        </>
      )}
    </div>
  );
}
