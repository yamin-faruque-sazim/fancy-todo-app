import React from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/store/store";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider defaultColorScheme="dark">
      <Notifications />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </MantineProvider>
  );
}
