import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN ?? "invalid domain"}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID ?? "invalid id"}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE, // For accessing the API
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);
