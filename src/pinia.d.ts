import 'pinia';
import { Router } from "vue-router";
import { useMessages } from "@/composables/useMessages";
import { useNodesActions } from "@/composables/useNodesActions";
import { useApi } from "@/composables/useApi";

declare module 'pinia' {
  export interface PiniaCustomProperties {
    router: Router;
    messages: ReturnType<typeof useMessages>;
    nodesActions: ReturnType<typeof useNodesActions>;
    api: ReturnType<typeof useApi>;
  }
}
