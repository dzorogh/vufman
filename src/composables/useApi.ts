import ApiServiceDemo from '@/services/ApiServiceDemo';
import { IApiService } from '@/types/IApiService';

export function useApi() {
  let apiImplementation: IApiService;

  if (import.meta.env.MODE === 'local') {
    apiImplementation = new ApiServiceDemo();
  } else {
    // realApiService

    // maybe will get global api endpoints from window object or other way
    apiImplementation = new ApiServiceDemo();
  }

  return apiImplementation;
}

