import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthProvider";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <AuthProvider>
      <App />
    </AuthProvider>
    {/* </Provider> */}
  </React.StrictMode>
);
