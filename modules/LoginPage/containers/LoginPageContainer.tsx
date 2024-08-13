import { NextRouter, useRouter } from "next/router";

import {
  Button,
  TextInput,
  PasswordInput,
  Stack,
  Card,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";

import classes from "./LoginPage.module.css";

const predefinedEmail = "test@gmail.com";
const predefinedPassword = "123456";

const validateLogin = (email: string, password: string, router: NextRouter) => {
  if (email === predefinedEmail && password === predefinedPassword) {
    router.push("/todo");
  } 
};

const LoginPageContainer: React.FC = () => {
  const [visible, { toggle }] = useDisclosure(false);
  const router = useRouter();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => {
        if (!value) {
          return "Email is required";
        }
        if (value !== predefinedEmail) {
          return "Invalid Email";
        }
      },
      password: (value) => {
        if (!value) {
          return "Password is required";
        }
        if (value !== predefinedPassword) {
          return "Invalid password";
        }
        return null;
      },
    },
  });

  return (
    <div className={classes.loginPage}>
      <Card className={classes.cardContainer}>
        <Title  order={2} mb="lg">
          Login
        </Title>
        <form
          onSubmit={form.onSubmit((values) => {
            validateLogin(values.email, values.password, router);
          })}
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
            <Button color="teal" mt={20} mb={10} className={classes.submitButton} type="submit">
           Login
            </Button>
          </Stack>
        </form>
      </Card>
    </div>
  );
};

export default LoginPageContainer;
