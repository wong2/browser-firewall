import Browser from "webextension-polyfill";

Browser.action.onClicked.addListener(() => {
  Browser.runtime.openOptionsPage();
});

Browser.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    Browser.runtime.openOptionsPage();
  }
});
