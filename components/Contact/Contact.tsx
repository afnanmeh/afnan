"use client";

import { Container, Title, Text, SimpleGrid, Card, Group } from "@mantine/core";
import { motion } from "framer-motion";
import {
  IconMail,
  IconPhone,
  IconMapPin,
  IconBrandLinkedin,
  IconBrandGithub,
  IconArrowUpRight,
} from "@tabler/icons-react";
import classes from "./Contact.module.css";

const contactInfo = [
  {
    icon: IconMail,
    title: "Email",
    value: "d4afnan@gmail.com",
    link: "mailto:d4afnan@gmail.com",
    color: "#cfff7d",
  },

  {
    icon: IconMapPin,
    title: "Location",
    value: "Pakistan",
    link: null,
    color: "#cfff7d",
  },
];

const workAddress =
  "88 Chinar Rd, I-10/3 I 10/3 I-10, Islamabad, 44000, Pakistan";
const homeAddress = "Rawalpindi, 46000, Rawalpindi, Pakistan";

export function Contact() {
  return (
    <div className={classes.wrapper} id="contact">
      <Container size="xl">
        <motion.div
          className={classes.header}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={classes.title}>
            LET'S <span className={classes.titleHighlight}>CONNECT</span>
          </h2>
          <Text className={classes.subtitle}>
            Ready to bring your ideas to life? Let's discuss your next project
          </Text>
        </motion.div>

        <motion.div
          className={classes.ctaActions}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="mailto:d4afnan@gmail.com"
            className={classes.ctaButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <IconArrowUpRight size={20} stroke={2} />
            Discuss the project
          </motion.a>
        </motion.div>

        <div className={classes.content}>
          <motion.div
            className={classes.mainContact}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className={classes.contactGrid}>
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <Card
                    className={classes.card}
                    padding="xl"
                    radius="lg"
                    component={item.link ? "a" : "div"}
                    href={item.link || undefined}
                  >
                    <div className={classes.cardContent}>
                      <div className={classes.iconWrapper}>
                        <item.icon size={28} stroke={2} />
                      </div>
                      <div className={classes.cardInfo}>
                        <Text className={classes.cardTitle}>{item.title}</Text>
                        <Text className={classes.cardValue}>{item.value}</Text>
                      </div>
                      {item.link && (
                        <div className={classes.cardArrow}>
                          <IconArrowUpRight size={20} stroke={2} />
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              className={classes.addressSection}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className={classes.addressCard} padding="xl" radius="lg">
                <div className={classes.addressHeader}>
                  <IconMapPin
                    size={24}
                    stroke={2}
                    className={classes.addressIcon}
                  />
                  <Text className={classes.addressTitle}>Office Location</Text>
                </div>
                <Text className={classes.addressText}>{workAddress}</Text>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div
            className={classes.socialSection}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className={classes.socialCard} padding="xl" radius="lg">
              <Text className={classes.socialTitle}>Follow Me</Text>
              <Text className={classes.socialSubtitle}>
                Stay updated with my latest projects and insights
              </Text>
              <div className={classes.socialLinks}>
                <motion.a
                  href="https://github.com/D4-afnan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.socialLink}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconBrandGithub size={24} stroke={2} />
                  <span>GitHub</span>
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/afnan-mehmood"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.socialLink}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconBrandLinkedin size={24} stroke={2} />
                  <span>LinkedIn</span>
                </motion.a>
              </div>
            </Card>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
