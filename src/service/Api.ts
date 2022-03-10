import ApiServiceDemo from './ApiServiceDemo';
import { ApiServiceInterface } from './ApiServiceInterface';

let Api : ApiServiceInterface;

if (import.meta.env.MODE) {
  Api = new ApiServiceDemo();
} else {
  // realApiService

  // maybe will get global api endpoints from window object or other way
  Api = new ApiServiceDemo();
}

export default Api;
