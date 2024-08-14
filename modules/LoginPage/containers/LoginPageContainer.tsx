import { NextRouter, useRouter } from "next/router";
import { useState } from "react";

import {
  Button,
  TextInput,
  PasswordInput,
  Stack,
  Card,
  Title,
  Alert,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";

import classes from "./LoginPage.module.css";

const predefinedEmail = "test@gmail.com";
const predefinedPassword = "123456";

const LoginPageContainer: React.FC = () => {
  const [visible, { toggle }] = useDisclosure(false);
  const router = useRouter();
  const [isInvalid, setIsInvalid] = useState(false);

  const validateLogin = (
    email: string,
    password: string,
    router: NextRouter
  ) => {
    if (email === predefinedEmail && password === predefinedPassword) {
      router.push("/todo");
    } else {
      setIsInvalid(true);
    }
  };

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className={classes.loginPage}>
      <Card className={classes.cardContainer}>
        <Title order={2} mb="lg">
          Login
        </Title>

        {isInvalid && (
          <Alert
            icon={<IconAlertCircle />}
            title="Invalid Credentials"
            color="red"
            mt="md"
            mb="lg"
          >
            The email or password you entered is incorrect.
          </Alert>
        )}

        <form
          onSubmit={form.onSubmit((values) => {
            validateLogin(values.email, values.password, router);
          })}
          onChange={() => setIsInvalid(false)}
        >
          <Stack>
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps("email")}
              classNames={{
                label: classes.inputLabel,
              }}
            />
            <PasswordInput
              withAsterisk
              label="Password"
              placeholder="Password"
              visible={visible}
              onVisibilityChange={toggle}
              {...form.getInputProps("password")}
              classNames={{
                label: classes.inputLabel,
              }}
            />
            <Button
              color="teal"
              mt={20}
              mb={10}
              className={classes.submitButton}
              type="submit"
            >
              Login
            </Button>
          </Stack>
        </form>
      </Card>
    </div>
  );
};

export default LoginPageContainer;
