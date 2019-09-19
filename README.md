# Welcome to DIG Resources v.2.0.0.alpha!

This is the shared code base of the front-end-only resources for the new knowledge portals. It requires the [back-end server](https://github.com/broadinstitute/dig-dug-portal) to be installed and started first.

---

```
Note: This code base make no assumption on how you choose to work with different portals. You can choose to work on them as separate branches, forked repos, etc ...
```

## Front-end framework

### Vue.js / Vuex

[Vue.js](https://vuejs.org/) is an open-source JavaScript framework for building user interfaces and single-page applications. It is the core of our front-end. Because it is based on javascript, it can be incorporated with any javscript library like jQuery, lodash, etc ... or even plain javascript.

[Vuex](https://vuex.vuejs.org/) is a state management pattern + library for Vue.js applications. It serves as a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion.

## File structure

+`css` This folder contains all the stylesheets for the site. +`js` This folder contains all the javascripts for the site.

### Components

Components are reusable Vue instances. They can accept the sampe options as a Vue object, such as `data`, `computed`, `methods`, etc ... and lifecycle hooks.

### Modules

Similar to components, modules are ...

### Utilities

These are simple helper functions.
