"use client";

import { Container, Title, Text, SimpleGrid, Card } from "@mantine/core";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  IconBrandReact,
  IconBrandNextjs,
  IconBrandJavascript,
  IconBrandTypescript,
  IconBrandVue,
  IconBrandPython,
  IconBrandDocker,
  IconBrandGit,
  IconDatabase,
  IconCode,
  IconPalette,
  IconApi,
} from "@tabler/icons-react";
import classes from "./Skills.module.css";

const skillCategories = [
  {
    number: "01",
    title: "Frontend Development",
    description:
      "Building responsive, high-performance user interfaces with React, Next.js, Vue.js, and TypeScript",
    skills: ["React.js", "Next.js", "Vue.js", "TypeScript", "JavaScript ES6+"],
    color: "#cfff7d",
  },
  {
    number: "02",
    title: "UI/UX & Styling",
    description:
      "Creating beautiful, accessible interfaces with modern CSS frameworks and design systems",
    skills: [
      "Tailwind CSS",
      "Mantine UI",
      "Responsive Design",
      "Accessibility (WCAG)",
    ],
    color: "#cfff7d",
  },
  {
    number: "03",
    title: "State & API Management",
    description:
      "Managing application state and integrating with backend services via REST APIs",
    skills: ["Zustand", "REST API Integration", "Data Fetching", "API Design"],
    color: "#cfff7d",
  },
  {
    number: "04",
    title: "Performance & SEO",
    description:
      "Optimizing web performance, Core Web Vitals, and technical SEO with Next.js",
    skills: [
      "Technical SEO",
      "Core Web Vitals",
      "Performance Optimization",
      "Analytics",
    ],
    color: "#cfff7d",
  },
  {
    number: "05",
    title: "Tools & Workflow",
    description:
      "Version control, containerization, and modern development workflows",
    skills: ["Git", "Docker", "CI/CD", "Deployment"],
    color: "#cfff7d",
  },
];

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={classes.wrapper} id="skills" ref={containerRef}>
      <Container size="xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={classes.titleSection}
        >
          <h2 className={classes.title}>
            SKILLS{" "}
            <motion.span
              style={{
                color: "#F0196D",
                display: "inline-block",
                fontSize: "9rem",
              }}
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              &
            </motion.span>{" "}
            EXPERTISE
          </h2>{" "}
          <Text className={classes.subtitle} size="xl">
            Scroll to explore my technical capabilities
          </Text>
        </motion.div>

        <div className={classes.cardsContainer}>
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.number}
              className={classes.cardWrapper}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                delay: 0,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              viewport={{ once: false, amount: 0.3, margin: "0px 0px -100px 0px" }}
              style={{
                position: "sticky",
                top: `${100 + index * 30}px`,
              }}
            >
              <Card className={classes.stackCard} padding="xl" radius="lg">
                <div className={classes.cardHeader}>
                  <div className={classes.numberBadge}>{category.number}</div>
                  <div className={classes.percentageCircle}>
                    <svg width="80" height="80" viewBox="0 0 80 80">
                      <circle
                        cx="40"
                        cy="40"
                        r="35"
                        fill="none"
                        stroke="rgba(207, 255, 125, 0.2)"
                        strokeWidth="6"
                      />
                      <motion.circle
                        cx="40"
                        cy="40"
                        r="35"
                        fill="none"
                        stroke="#cfff7d"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 35}`}
                        initial={{ strokeDashoffset: 2 * Math.PI * 35 }}
                        transition={{ duration: 1.5, delay: 0.3 }}
                        viewport={{ once: true }}
                        style={{
                          transform: "rotate(-90deg)",
                          transformOrigin: "50% 50%",
                        }}
                      />
                    </svg> 
                  </div>
                </div>

                <Title order={2} className={classes.cardTitle}>
                  {category.title}
                </Title>

                <Text className={classes.cardDescription} size="lg" mt="md">
                  {category.description}
                </Text>

                <div className={classes.skillsList}>
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      className={classes.skillTag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: skillIndex * 0.1 }}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
}
