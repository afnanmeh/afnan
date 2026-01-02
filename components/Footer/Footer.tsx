"use client";

import { Container, Group, Text } from "@mantine/core";
import { motion } from "framer-motion";
import { IconArrowUpRight } from "@tabler/icons-react";
import classes from "./Footer.module.css";

const socialLinks = [
  { name: "LinkedIn", url: "https://linkedin.com/in/afnan-mehmood" },
  { name: "Github", url: "https://github.com/D4-afnan" },
  { name: "Instagram", url: "https://instagram.com/" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className={classes.footer}>
      <Container size="xl">
        <div className={classes.footerContent}>
          {/* Large 3D-style background text */}
          <div className={classes.backgroundText}>
            <motion.div
              className={classes.contactText}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ margin: "-100px" }}
            >
              @afnan
            </motion.div>
          </div>

          {/* Main content */}
          <div className={classes.mainContent}>
            {/* Top section with logo and social links */}
            <div className={classes.topSection}>
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <a href="#home" className={classes.logo}>
                  afnan<span className={classes.logoDot}>.</span>
                </a>
              </motion.div>

              <motion.div
                className={classes.socialLinks}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                viewport={{ margin: "-50px" }}
              >
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.socialLink}
                    initial={{ opacity: 0, y: 5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                    whileHover={{ y: -3, transition: { duration: 0.1 } }}
                  >
                    {link.name}
                    <IconArrowUpRight size={16} stroke={2} />
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* CTA Section */}
            <motion.div
              className={classes.ctaSection}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ margin: "-100px" }}
            >
              <motion.h2
                className={classes.ctaHeading}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                viewport={{ margin: "-50px" }}
              >
                GOT ANY QUESTIONS OR IDEAS ABOUT CREATING A WEBSITE? WRITE TO ME
                AND I WILL HELP YOU IMPLEMENT YOUR PROJECT.
              </motion.h2>
            </motion.div>

            {/* Bottom section */}
            <div className={classes.bottomSection}>
              <motion.div
                className={classes.bottomLinks}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                viewport={{ margin: "-50px" }}
              >
                <a
                  href="https://github.com/D4-afnan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.bottomLink}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/afnan-mehmood"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.bottomLink}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.bottomLink}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
                  </svg>
                </a>
              </motion.div>

              <motion.div
                className={classes.bottomInfo}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                viewport={{ margin: "-50px" }}
              >
                <Text className={classes.copyright}>
                  © {currentYear} Afnan Mehmood
                </Text>
                <a href="#" className={classes.bottomLink}>
                  Privacy
                </a>
              </motion.div>

              <motion.a
                href="mailto:d4afnan@gmail.com"
                className={classes.writeMe}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                viewport={{ margin: "-50px" }}
                whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
              >
                <IconArrowUpRight size={16} stroke={2} />
                Write me
              </motion.a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
