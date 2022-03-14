import ApiServiceDemo from './ApiServiceDemo';
import { ApiServiceInterface } from './ApiServiceInterface';

let api: ApiServiceInterface;

if (import.meta.env.MODE === 'local') {
  api = new ApiServiceDemo();
} else {
  // realApiService

  // maybe will get global api endpoints from window object or other way
  api = new ApiServiceDemo();
}

export default api;
