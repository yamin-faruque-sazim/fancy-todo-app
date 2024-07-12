import React from "react";
import ReactDOM from "react-dom/client";

import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';

import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';






ReactDOM.createRoot(document.getElementById("root")!).render(
  <MantineProvider defaultColorScheme="dark">
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </MantineProvider>
);
