# File Manager UI

File manager reusable interface built with: Typescript, Vite, VueJS 3, Vue
Composition API, Tailwind CSS, Naive UI, Pinia, Vue Router, ESlint.

# Installation

`npm install @dzorogh/vufman`

# Example configuration

```php
@if (env('APP_FILEMANAGER_LOCAL') === true)
    <script type="module" crossorigin 
        src="https://localhost:3333/@vite/client"></script>
    <script type="module" crossorigin 
        src="https://localhost:3333/src/main.ts"></script>
@else
    <script type="module" crossorigin 
        src="/libs/filemanager/assets/index.e9cd66ab.js"></script>
@endif

    <script>
        function wufmanSetup(settings) {
            return {
                ...settings,

                apiDemo: {{ env('APP_FILEMANAGER_DEMO') === true ? 'true' : 'false' }},
                mountContainer: '#vufman',
                apiPrefix: '/api/fm',
                basePath: '/fm'
            };
        }
    </script>
```

# Build

`npm run build`

# For future

- [ ] Video poster generation
- [ ] Some videos with identical format have different encoders and one can be
  played in browser, another — not
- [ ] Ctrl+Z
