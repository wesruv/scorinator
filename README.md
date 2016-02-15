# Setup
Make sure you have Node.js/npm installed (recommend node 5.4+ and npm 3.3+), then:

From anywhere install Babel globally (you'll probably need sudo because global?):
```
npm install babel@5.8.35
```

Then from repo root:
```
npm install
```

If that goes well, you can then run:

```
npm run dev
```

And you should be up and running. The console should tell you the address and port you can hit the web server from.

# `npm` Commands
```
npm run dev
```
Loads dev setup, will compile Sass, ES6, and run everything needed for the server using Browsersync to auto-refresh when any source file is modified.

**If you add a new file** you'll need to restart this command (aka, Ctrl + C then run `npm run dev` again).

```
npm run clean
```
If your local isn't behaving, you can easily remove all of the build files by running `npm run clean`, then run `npm install` from repo root and hopefully you'll be back in business.

# File structure

* `source` - the main event, has everything we care about
  * `components` - UI Component JSX templates, a component is a 'widget', a 'chunk of UI that works together'
  * `data-handlers` - Code that handles communication with the data layer. Each subfolder handles one 'table', or 'content type'.
  * `images` - It's images.
  * `styles` - All of our SCSS files
    * `_core` - Basic dependencies, none of these files should output CSS. They're responsible for variables, mixins, functions, etc. To include all of `_core` use `@import '../_core/_core'`
    * `base` - Basic styles for HTML elements and basic stuffs.
    * `components` - Styles for specific components, considering replacing these styles with Radium...
  * `utilities` - Black box, these are written by my good friend Joe who did the original React/RxJS/etc architecture for this beast. Consider these files to be a 3rd party API... kind of.
  * `App.jsx` - Main app wrapper, responsible for `routes` (internal paths that are available), and basic setup
  * `AppWrapper.jsx` - Responsible for global UI, like the app's header and main menu
  * `index.html` - Probably won't need editing after this point, this helps kick off the app and has setup for System.js our dependency injector
