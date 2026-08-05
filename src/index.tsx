import { createRoot } from "react-dom/client";
import App from "./app";

const container = document.getElementById("app");

if (!container) {
  throw new Error('Root element with id "app" was not found.');
}

createRoot(container).render(<App />);
