### object-path: get/set object properties using path syntax
---
this module is written for Deno, but should work in node.js and the browser if compiled to javascript(its written in typescript). There are zero dependencies, except for the tests which are written using the Deno testing library.

# install
----
*Deno allows you to directly import modules from URL's! To import and use the client in your file, add the following import statement:

```ts
import { create } from 'https://raw.githubusercontent.com/r3wt/object-path/master/mod.ts';
```

# API
---

1. you should use the `create` function to create a new instance of `ObjectPathModule`.

```ts
const { parse, get, set, configure } = create({
    seperator:'.',//the path seperator to use can be string or RegExp
    defaultUnsetValue: undefined,//the default returned value for not existing properties.
    autoCreate: false // automatically create properties if they don't exist
});// all options are shown and all returned function in the module are shown as well
```