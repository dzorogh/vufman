import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// @ts-ignore
import Components from 'unplugin-vue-components/vite';
// @ts-ignore
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      Components({
        resolvers: [ NaiveUiResolver() ]
      }),
      vue(),
      {
        // Hard hack plugin
        // Adds local base url to all paths
        // Need when main js file used outside test server
        name: 'asset-base-url',
        enforce: 'post',
        transform: (code) => {
          const port = '3333';

          code = code.replace(
            /(from |import\()(["'`])(\/src|~?@|\/@fs\/@)\/(.*?)\.(svg|png|mp3|mp4|eot|woff|ttf|json)/g,
            `$1$2http://localhost:${port}/src/$4.$5?import=`);
          code = code.replace(/(?<!local)(\/src|~?@|\/@fs\/@)\/(.*?)\.(svg|png|mp3|mp4|eot|woff|ttf|json)/g,
            `http://localhost:${port}/src/$2.$3`);

          code = code.replace(/'\/node_modules\//g, `'http://localhost:${port}/node_modules/`);
          code = code.replace(/"\/node_modules\//g, `"http://localhost:${port}/node_modules/`);

          code = code.replace(/(axios\.get\(['"`])\/(.*)(.json)/gm, `$1http://localhost:${port}/$2$3`);


          // console.log(code);

          return {
            code,
            map: null,
          };
        },
      },
    ],
    build: {
      // lib: {
      // entry: path.resolve(__dirname, 'src/main.ts'),
      // name: 'MyLib',
      // fileName: (format) => `vufman.${format}.js`
      // },
      rollupOptions: {
        output: {
          // file: 'bundle.js',
          format: 'iife',
          name: 'Vufman',
        },

        // // make sure to externalize deps that shouldn't be bundled
        // // into your library
        // external: ['vue'],
        // output: {
        //   // Provide global variables to use in the UMD build
        //   // for externalized deps
        //   globals: {
        //     vue: 'Vue'
        //   }
        // }
      },
    },

    resolve: {
      alias: [
        { find: '@', replacement: '/src' },
      ]
    },
  };
});
