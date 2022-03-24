import ApiServiceDemo from './ApiServiceDemo';
import { ApiServiceInterface } from './ApiServiceInterface';

let apiImplementation: ApiServiceInterface;

if (import.meta.env.MODE === 'local') {
  apiImplementation = new ApiServiceDemo();
} else {
  // realApiService

  // maybe will get global api endpoints from window object or other way
  apiImplementation = new ApiServiceDemo();
}


export const api = apiImplementation;
