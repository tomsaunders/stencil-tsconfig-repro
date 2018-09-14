# stencil-tsconfig-repro

This reproduces stencil bug https://github.com/ionic-team/stencil/issues/1062

## Setup

### In my-component

1. `npm install`
2. `npm build`

### In my-app

1. `npm install`
2. `npm start`

## Problems Observed

```
> @stencil/starter@0.0.1 start /Users/tom/stencil-tsconfig-repro/my-app
> stencil build --dev --watch --serve

[32:03.7]  @stencil/core v0.11.4 ⛰
[32:03.8]  build, app, dev mode, started ...
[32:03.9]  transpile started ...
[32:03.9]  transpile finished in 41 ms
[32:03.9]  module map started ...
[32:03.9]  generate styles started ...
[32:07.2]  module map finished in 3.29 s
[32:07.2]  generate styles finished in 3.30 s

[ ERROR ]  sass: ...m/stencil-tsconfig-repro/my-component/dist/collection/components/my-cat/cat.scss, line: 2: ...m/stencil-tsconfig-repro/my-component/dist/collection/components/my-cat/cat.scss
           File to import not found or unreadable: ../../style/img.

      L1:  :host {
      L3:    @import "../../style/img";

[32:07.3]  dev server: http://localhost:3334/
[32:11.2]  build, app, dev mode, started ...

[ ERROR ]  TypeScript: ../my-component/dist/types/components.d.ts:13:7
           Cannot find module 'model/random-cat'.

     L12:    RandomCat,
     L13:  } from 'model/random-cat';

[32:11.2]  build failed, watching for changes... in 2 ms
```

### Sass

`my-component/src/components/my-cat/cat.scss` imports another scss file from a shared location, but the imported scss file is not included in the `my-component/dist` bundle.

### TypeScript Paths

`my-component/tsconfig.json` uses the compilerOptions.paths to allow 'project' paths rather than relative paths.

Thus, `my-component/src/components/my-cat/cat.tsx` can refer to `my-component/src/model/random-cat.ts` as **model/random-cat** rather than **../../model/random-cat**

## Current workaround

I've made a postbuild script that does some import path re-writing via regex and copies over any scss files in `src/` but not `dist/collection`
