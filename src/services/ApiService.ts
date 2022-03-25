import { useAxios } from "@/composables/api";

export class ApiService {
  axios;
  
  constructor() {
    this.axios = useAxios();
  }
}
