# stencil-tsconfig-repro

This reproduces stencil bug https://github.com/ionic-team/stencil/issues/1104 'Plugin Error: Unexpected token when importing a class from stencil project'

## Setup

### In my-component

1. `npm install`
2. `npm build`

### In my-app

1. `npm ci` (I've been seeing some weirdness with npm install after referencing a local module, ci seems more successful)
2. `npm start`

## Problems Observed

```
> @stencil/starter@0.0.1 start /Users/tom.saunders/stencil-tsconfig-repro/my-app
> stencil build --dev --watch --serve

[34:56.7]  @stencil/core v0.11.4 ⛰
[34:56.8]  cache optimizations disabled
[34:56.8]  build, app, dev mode, started ...
[34:56.9]  transpile started ...
[34:58.7]  transpile finished in 1.86 s
[34:58.7]  module map started ...
[34:58.7]  generate styles started ...
[34:59.3]  compile global style start ...
[34:59.5]  compile global style finish in 236 ms
[34:59.5]  generate styles finished in 791 ms
[34:59.9]  module map finished in 1.12 s

[ ERROR ]  Plugin Error
           Unexpected token (251:169) in
           /Users/tom.saunders/stencil-tsconfig-repro/my-component/dist/esm/es5/mycomponent.core.js

[34:59.9]  dev server: http://localhost:3333/

```

## mycomponent.core.js

This line reference is only for the non-minified code.

Lines 250-261:
```
  var promises = [];
  window.customElements && (!window.Element || window.Element.prototype.closest && window.Element.prototype.matches && window.Element.prototype.remove) || promises.push(import('./polyfills/dom.js'));
  'function' === typeof Object.assign && Object.entries || promises.push(import('./polyfills/object.js'));
  Array.prototype.find && Array.prototype.includes || promises.push(import('./polyfills/array.js'));
  String.prototype.startsWith && String.prototype.endsWith || promises.push(import('./polyfills/string.js'));
  window.fetch || promises.push(import('./polyfills/fetch.js'));
  Promise.all(promises).then(function(results) {
    results.forEach(function(polyfillModule) {
      polyfillModule.applyPolyfill(window, window.document);
    });
    cb();
  });
```
