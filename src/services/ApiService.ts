import { useAxios } from "@/composables/useAxios";

export class ApiService {
  axios;

  constructor() {
    this.axios = useAxios();
  }
}
