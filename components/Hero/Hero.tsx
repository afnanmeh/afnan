"use client";

import { Container } from "@mantine/core";
import { motion } from "framer-motion";
import { NebulaHero } from "./NebulaHero";
import classes from "./Hero.module.css";
import Image from "next/image";

export function Hero() {
  return (
    <div className={classes.wrapper} id="home">
      <NebulaHero />
      <Container size="xl" className={classes.inner}>
        <motion.div
          className={classes.profileBadge}
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className={classes.profileImage}>
            <Image
              src="/afnan-profilee.png"
              alt="Afnan Mehmood"
              width={80}
              height={80}
            />
          </div>
          <div className={classes.profileText}>
            <div className={classes.profileTitle}>Software Developer</div>
            <div className={classes.profileSubtitle}>and Frontend Engineer</div>
          </div>
        </motion.div>

        <motion.div
          className={classes.heroTextWrapper}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: 0.05,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <h1 className={classes.heroText}>Afnan.</h1>
        </motion.div>

        <motion.div
          className={classes.descriptionWrapper}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className={classes.description}>
            Frontend engineering with React and Next.js. Scalable archNitecture,
            clean UI, high performance MODERN WEB DESIGN, STYLISH VISUALS, AND
            PRECISE TIMELINES. I CREATE PROJECTS built for real users and real
            growth.
          </p>
        </motion.div>
      </Container>
    </div>
  );
}
