import { GlobalSettings } from "./types/GlobalSettings";

declare global {
  interface Window {
    wufmanSetup: (settings: GlobalSettings) => GlobalSettings;
  }
}
