import { ApiServiceDemo } from '@/services/ApiServiceDemo';
import { ApiServiceReal } from '@/services/ApiServiceReal';
import { IApiService } from '@/types/IApiService';
import { settings } from "@/setup";

export function useApi() {
  let apiImplementation: IApiService;

  if (settings.apiDemo) {
    apiImplementation = new ApiServiceDemo();
  } else {
    // realApiService

    apiImplementation = new ApiServiceReal();
  }

  return apiImplementation;
}

