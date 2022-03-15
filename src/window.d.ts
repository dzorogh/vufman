import { IGlobalSettings } from "./types/IGlobalSettings";

declare global {
  interface Window {
    wufmanSetup: (settings: IGlobalSettings) => IGlobalSettings;
  }
}
