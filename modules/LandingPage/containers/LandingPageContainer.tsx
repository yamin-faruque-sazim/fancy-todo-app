import React from "react";
import router from "next/router";

import { Container, Stack, Text, Group, Button } from "@mantine/core";
import { IconEdit, IconSearch, IconDeviceFloppy } from "@tabler/icons-react";

import classes from "./LandingPageContainer.module.css";

const LandingPageContainer: React.FC = () => {
  return (
    <Container className={classes.container} fluid>
      <div className={classes.leftSection}>
        <Group>
          <Text className={classes.title}>
            Welcome to Fancy To-do Application!
          </Text>
        </Group>
        <Text className={classes.subDescription}>
          Your all-in-one solution to manage tasks efficiently!
        </Text>

        <Stack className={classes.features}>
          <Group className={classes.featureItem}>
            <IconEdit className={classes.featureIcon} size={24} />
            <Text>Add your tasks</Text>
          </Group>
          <Group className={classes.featureItem}>
            <IconSearch className={classes.featureIcon} size={24} />
            <Text>Filter them as you need</Text>
          </Group>
          <Group className={classes.featureItem}>
            <IconDeviceFloppy className={classes.featureIcon} size={24} />
            <Text>Local storage support</Text>
          </Group>
        </Stack>
      </div>

      <div className={classes.rightSection}>
        <Button
          onClick={() => router.push("/login")}
          className={classes.getStartedButton}
          size="lg"
          variant="filled"
          color="teal"
        >
          Get Started
        </Button>
      </div>
    </Container>
  );
};

export default LandingPageContainer;
