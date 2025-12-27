"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Group,
  Burger,
  Drawer,
  Stack,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { motion } from "framer-motion";
import classes from "./Header.module.css";

const links = [
  { link: "#home", label: "Home" },
  { link: "#experience", label: "Works" },
  { link: "#skills", label: "Skills" },
  { link: "#about", label: "About" },
  { link: "#contact", label: "Contact" },
];

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const items = links.map((link) => (
    <motion.a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        setActive(link.link);
        close();
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {link.label}
    </motion.a>
  ));

  return (
    <motion.header
      className={classes.header}
      style={{
        backgroundColor: scrolled ? "rgba(10, 10, 10, 0.4)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container size="xl" className={classes.inner}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <a href="#home" className={classes.logo}>
            afnan<span className={classes.logoDot}>.</span>
          </a>
        </motion.div>
        <Group gap={5} visibleFrom="xs" className={classes.centerNav}>
          {items}
        </Group>
        <Group gap="md" visibleFrom="xs">
          <motion.a
            href="#contact"
            className={classes.ctaButton}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            Let's Talk
          </motion.a>
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="xs"
          size="sm"
          color="#fff"
        />
      </Container>

      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="xs"
        zIndex={1000000}
        styles={{
          content: { backgroundColor: "#0a0a0a" },
          header: { backgroundColor: "#0a0a0a", color: "#fff" },
          title: { color: "#fff", fontSize: "1.5rem", fontWeight: 700 },
        }}
      >
        <Stack gap="md">{items}</Stack>
      </Drawer>
    </motion.header>
  );
}
