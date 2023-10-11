javascript:
const currentURL = window.location.href;
const allowedPatternURL = /^https:\/\/chrome\.google\.com\/webstore[a-zA-Z]+$/;

if (allowedPatternURL.test(currentURL)) {
  String.prototype.getExtensionID = function () {
  if (/^[a-zA-Z]{32}$/.test(this)) {
    return this.toString();
  } else if (this.match("chrome.google.com")) {
    const pathname = new URL(this).pathname.split("/");
    const extensionID = pathname[pathname.length - 1];
    return /^[a-zA-Z]{32}$/.test(extensionID) ? extensionID : false;
  }
  return false;
  };
  
  let validInput = false;
  document.title = "Extension Installer ©MJUC";

  while (!validInput) {
    const extensionInput = prompt("Extension Installer ©MJUC\nEnter Extension ID or URL");

    if (extensionInput === null) {
      break;
    } else {
      const extensionID = extensionInput ? extensionInput.getExtensionID() : null;

      if (extensionID) {
        validInput = true;

      chrome.webstorePrivate.beginInstallWithManifest3(
        {
          id: extensionID,
          manifest:
            '{\n"update_url": "https://clients2.google.com/service/update2/crx",\n\n"manifest_version": 2,\n"content_security_policy": "script-src \'self\'; object-src \'self\';",\n"minimum_chrome_version": "71.0.0.0",\n"offline_enabled": true,\n"content_scripts":\n[\n{\n"js": [\n"page.js",\n"content.js"\n],\n"matches": [ "file:///*", "http://*/*", "https://*/*" ],\n"run_at": "document_start",\n"all_frames": true\n}\n],\n"browser_action": {\n"default_icon": {\n"19": "images/icon_grey19.png",\n"38": "images/icon_grey38.png",\n"16": "images/icon_grey16.png",\n"24": "images/icon_grey24.png",\n"32": "images/icon_grey32.png"\n},\n"default_title": "Extension",\n"default_popup": "action.html"\n},\n"icons": {\n"32": "images/icon.png",\n"48": "images/icon48.png",\n"128": "images/icon128.png"\n},\n"incognito": "split",\n"name": "Extension",\n"short_name": "Extension",\n"version": "4.18.0",\n"description": "The world\'s most popular userscript manager",\n"default_locale": "en",\n"background": {\n "page": "background.html"\n},\n"options_page": "options.html",\n"options_ui": {\n"page": "options.html",\n"chrome_style": false,\n"open_in_tab": true\n},\n"commands": {\n"toggle-enable": {\n"description": "Toggle enable state"\n},\n"open-dashboard": {\n"description": "Open dashboard"\n},\n"open-dashboard-with-running-scripts": {\n"description": "Open dashboard with the current tab\'s URL used as filter"\n},\n"open-new-script": {\n"description": "Open new script tab"\n}\n},\n"permissions": [\n"notifications",\n"unlimitedStorage",\n"tabs",\n"idle",\n"webNavigation",\n"webRequest", "webRequestBlocking",\n"storage",\n"contextMenus",\n"chrome://favicon/",\n"clipboardWrite",\n"cookies",\n"declarativeContent",\n"<all_urls>"\n],\n"optional_permissions" : [ "downloads" ]\n}\n',
        },
        () => chrome.webstorePrivate.completeInstall(extensionID, function () {})
      );
    } else {
      alert("Invalid Extension ID or URL");
      }
    }
  }
} else {
  window.open("https://chrome.google.com/webstorex");
}
