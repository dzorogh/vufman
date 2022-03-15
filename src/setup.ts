// import { IGlobalSettings } from "./types/IGlobalSettings";

let settings = {
  mountContainer: '#app',
  basePath: '/',
  apiPrefix: '/data/'
};

if (window.wufmanSetup && typeof window.wufmanSetup === 'function') {
  settings = window.wufmanSetup(settings) as typeof settings;
}

const root = document.querySelector(settings.mountContainer);

if (root) {
  root.classList.add('flex', 'flex-col');
} else {
  throw new Error(`Container selector "${settings.mountContainer}" not exists!`);
}

export { settings };
