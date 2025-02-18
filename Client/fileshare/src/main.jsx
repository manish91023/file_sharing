import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

const clientId ="WFI1UVKrmyQzdFmmxEH4sNiOK8S8gly1"
const domain = "manishgga09.us.auth0.com"
const audiences=import.meta.env.VITE_CLIENT_AUDIENCE


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience:`https://manishgga09.us.auth0.com/api/v2/`
      }}
    >
      <App />
    </Auth0Provider> 
  </StrictMode>
);
