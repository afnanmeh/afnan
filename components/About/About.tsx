"use client";

import { Container, Title, Text, Grid, Card } from "@mantine/core";
import { motion } from "framer-motion";
import { IconMail } from "@tabler/icons-react";
import Image from "next/image";
import classes from "./About.module.css";

export function About() {
  return (
    <div className={classes.wrapper} id="about">
      <Container size="xl">
        <div className={classes.contentWrapper}>
          <div className={classes.imageWrapper}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <Image
                src="/afnan-profilee.png"
                alt="Afnan Mehmood"
                width={1200}
                height={1400}
                className={classes.profileImage}
                priority
              />
            </motion.div>
          </div>

          <div className={classes.rightContent}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <h2 className={classes.title}>
                ABOUT <span className={classes.titleHighlight}>ME</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, margin: "-60px" }}
            >
              <Text className={classes.description} size="lg">
                As a passionate Frontend Engineer, I've been building
                high-performance, scalable SaaS frontends with React, Next.js,
                and Vue, delivering AI-powered tools, interactive dashboards,
                and optimized web applications that drive user engagement and
                measurable growth.
              </Text>
              <Text className={classes.description} size="lg" mt="md">
                I implement projects of any scale, from small portfolio sites to
                web and mobile applications. My approach combines modern design,
                thoughtful structure and user-friendliness of the interface so
                that each project works for the result.
              </Text>
            </motion.div>
          </div>
        </div>
      </Container>
    </div>
  );
}
