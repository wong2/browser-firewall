import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest(() => {
  return {
    manifest_version: 3,
    name: "Browser Firewall",
    description: "Block any extension or website from accessing network",
    version: "1.0.0",
    icons: {
      16: "src/assets/icon.png",
      32: "src/assets/icon.png",
      48: "src/assets/icon.png",
      128: "src/assets/icon.png",
    },
    action: {},
    background: {
      service_worker: "src/background.ts",
      type: "module",
    },
    permissions: ["management", "declarativeNetRequest"],
    options_ui: {
      page: "options.html",
      open_in_tab: true,
    },
  };
});
