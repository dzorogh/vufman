import 'pinia';
import { Router } from "vue-router";
import { useMessages } from "@/composables/useMessages";

declare module 'pinia' {
  export interface PiniaCustomProperties {
    router: Router;
    messages: ReturnType<typeof useMessages>;
  }
}
