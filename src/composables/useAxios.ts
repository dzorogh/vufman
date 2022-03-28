import axios from "axios";
import { useLoadingBar, useNotification } from "naive-ui";

export function useAxios() {
  const instance = axios.create();
  const loadingBar = useLoadingBar();
  const notification = useNotification();

  instance.interceptors.request.use(
    function (config) {
      console.info('Axios request', config);

      loadingBar.start();

      // Do something before request is sent
      return config;
    },
    function (error) {
      console.warn('Axios request error', error);


      loadingBar.error();
      notification.error({
        content: 'Ошибка при отправке запроса',
        meta: error.toString()
      });
      
      // Do something with request error
      return Promise.reject(error);
    });

  instance.interceptors.response.use(
    function (response) {
      console.info('Axios response', response);

      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data

      loadingBar.finish();

      return response;
    },
    function (error) {
      console.warn('Axios response error', error);

      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error

      loadingBar.error();
      notification.error({
        content: 'Ошибка сервера',
        meta: error.toString()
      });

      return Promise.reject(error);
    });

  return instance;
}
