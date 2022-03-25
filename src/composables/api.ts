import ApiServiceDemo from '../services/ApiServiceDemo';
import { IApiService } from '../types/IApiService';
import { useLoadingBar, useNotification } from "naive-ui";
import axios from "axios";

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

export function useAxios() {
  const instance = axios.create();
  const loadingBar = useLoadingBar();
  const notification = useNotification();

  instance.interceptors.request.use(
    function (config) {
      loadingBar.start();

      // Do something before request is sent
      return config;
    },
    function (error) {

      loadingBar.error();
      notification.error({
        content: 'Ошибка при отправке запроса',
        meta: error.toString()
      });

      console.warn(error);

      // Do something with request error
      return Promise.reject(error);
    });

  instance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data

      loadingBar.finish();

      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error

      loadingBar.error();
      notification.error({
        content: 'Ошибка сервера',
        meta: error.toString()
      });
      console.warn(error);

      return Promise.reject(error);
    });

  return instance;
}

