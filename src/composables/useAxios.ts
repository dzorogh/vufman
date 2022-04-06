import axios from "axios";
import { useLoadingBar, useNotification } from "naive-ui";
import { settings } from "@/setup";

export function useAxios() {
  const instance = axios.create({
    baseURL: settings.apiPrefix
  });

  const loadingBar = useLoadingBar();
  const notification = useNotification();

  instance.interceptors.request.use(
    function (config) {
      console.log('%cAxios request',
        'background: -webkit-linear-gradient(315deg,#42d392 25%,#5AFFE2); border-radius: 5px; padding: 2px 5px; color: #282C34; font-size: 70%; font-weight: bold;',
        config.url,
        config);

      if (!config.onUploadProgress) {
        loadingBar.start();
      }

      // Do something before request is sent
      return config;
    },
    function (error) {
      console.warn('%cAxios request error',
        'background: -webkit-linear-gradient(315deg,#FF1C36 25%,#D39149);' +
        ' border-radius: 5px; padding: 2px 5px; color: #282C34; font-size: 70%; font-weight: bold;', { error });

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
      console.log('%cAxios response',
        'background: -webkit-linear-gradient(315deg,#42d392 25%,#7FFF6E); border-radius: 5px; padding: 2px 5px; color: #282C34; font-size: 70%; font-weight: bold;',
        response.config.url, response);

      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data

      if (!response.config.onUploadProgress) {
        loadingBar.finish();
      }

      return response;
    },
    function (error) {
      console.warn('Axios response error', { error });

      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error

      loadingBar.error();

      notification.error({
        content: 'Ошибка сервера',
        meta: error.response.data && error.response.data.message ? error.response.data.message : error.response.statusText
      });

      return Promise.reject(error);
    });

  return instance;
}
