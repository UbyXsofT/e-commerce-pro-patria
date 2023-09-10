import { defineConfig } from "unlighthouse";

export default defineConfig({
  site: "http://localhost:60443/",
  debug: true,
  auth: {
    username: "prova",
    password: "prova",
  },
  localStorage: {
    themeMode: "dark",
  },
  urls: ["/", "/account/login", "/account/resetPassword", "/account/register", "/account/setNewPassword", "/auth/home", "/auth/notifiche", "/policy/termini-condizioni"],
});
