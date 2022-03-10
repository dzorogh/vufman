import { GlobalSettings } from "./types/GlobalSettings";

let settings = {
  mountContainer: '#app'
} as GlobalSettings

if (window.wufmanSetup && typeof window.wufmanSetup === 'function') {
  settings = window.wufmanSetup(settings);
}

const root = document.querySelector(settings.mountContainer);

if (root) {
  root.classList.add('flex', 'flex-col');
} else {
  throw new Error(`Container selector "${settings.mountContainer}" not exists!`)
}

export { settings };
