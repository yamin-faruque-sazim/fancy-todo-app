import React from "react";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider defaultColorScheme="dark">
      <Provider store={store}>
      <Component {...pageProps} />
      </Provider>
    </MantineProvider>
  );
}
