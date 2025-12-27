"use client";

import { Container, Title, Text, Card, Badge, Group } from "@mantine/core";
import { motion } from "framer-motion";
import {
  IconPalette,
  IconWorld,
  IconCube,
  IconDeviceMobile,
  IconGauge,
  IconLayoutDashboard,
} from "@tabler/icons-react";
import classes from "./Experience.module.css";

const services = [
  {
    icon: IconLayoutDashboard,
    title: "SAAS SOLUTIONS",
    tags: [
      "SAAS Applications", // live data, notifications

      "Dashboards", // live, user-driven interfaces
      "Auth & Security",
    ],

    color: "#cfff7d",
  },
  {
    icon: IconWorld,
    title: "WEBSITE DEVELOPMENT",
    tags: ["REACT", "NEXT.JS", "VUE", "TYPESCRIPT"],
    color: "#cfff7d",
  },
  {
    icon: IconCube,
    title: "STATE, DATA & APPLICATION LOGIC",
    tags: ["REST API", "ZUSTAND", "DATA MANAGEMENT"],
    color: "#cfff7d",
  },
  {
    icon: IconGauge,
    title: "PERFORMANCE, UI & UX",
    tags: ["CORE WEB VITALS", "SEO", "ACCESSIBILITY"],
    color: "#cfff7d",
  },
];

export function Experience() {
  return (
    <div className={classes.wrapper} id="experience">
      <Container size="xl">
        <div className={classes.titleWrapper}>
          <h2 className={classes.title}>
            {"services".split("").map((letter, index) => (
              <motion.span
                key={index}
                className={classes.letter}
                initial={{ opacity: 0, y: -50, scale: 0 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 10,
                  mass: 0.8,
                }}
                style={{
                  display: "inline-block",
                  position: "relative",
                }}
              >
                {letter === "i" ? (
                  <>
                    <span style={{ visibility: "hidden" }}>i</span>
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        display: "inline-block",
                      }}
                    >
                      <span style={{ color: "inherit" }}>ı</span>
                      <span
                        style={{
                          color: "#cfff7d",
                          position: "absolute",
                          top: "-0.20em",
                          left: "50%",
                          transform: "translateX(-50%)",
                          fontSize: "1.2em",
                          lineHeight: 0,
                        }}
                      >
                        .
                      </span>
                    </span>
                  </>
                ) : (
                  letter
                )}
              </motion.span>
            ))}
          </h2>
        </div>

        <div className={classes.servicesGrid}>
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{
                duration: 0.6,
                delay: 0,
                ease: "easeOut",
              }}
              viewport={{ once: false, amount: 0.9 }}
            >
              <Card className={classes.serviceCard} padding="xl" radius="lg">
                <div className={classes.serviceIcon}>
                  <service.icon size={40} stroke={1.5} />
                </div>
                <Title order={3} className={classes.serviceTitle}>
                  {service.title}
                </Title>
                <div className={classes.serviceTags}>
                  {service.tags.map((tag) => (
                    <Badge
                      key={tag}
                      className={classes.serviceTag}
                      variant="filled"
                      size="lg"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className={classes.serviceArrow}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={classes.dotsContainer}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
        >
          {Array.from({ length: 400 }).map((_, index) => {
            const randomLeft = Math.random() * 100;
            const randomDelay = Math.random() * 3;
            const randomDuration = 4 + Math.random() * 3;

            return (
              <motion.div
                key={index}
                className={classes.dot}
                initial={{ opacity: 0, y: 0 }}
                animate={{
                  opacity: [0, 0.8, 1, 0.6, 0],
                  y: [0, -400],
                }}
                transition={{
                  duration: randomDuration,
                  delay: randomDelay,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 2,
                  ease: "linear",
                }}
                style={{
                  left: `${randomLeft}%`,
                }}
              />
            );
          })}
        </motion.div>
      </Container>
    </div>
  );
}
