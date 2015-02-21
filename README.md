# Boilerplate for react with ES6 and browserify

This is a boilerplate repo for using react with ES6 and browserify, and running it with gulp.

It also supports Sass compilation.

## Installation

```
npm install
```

After the installation, run `gulp` and browse to _http://localhost:8888_

The compiled code can be found in dist/bundle/app.js.

## What do you get

* A gulpfile with livereload
* Compilation of the jsx [1]
* Compilation of ES6 to ES5 [2], [3]

## React with ES6

### ES6 classes

```js
import React from 'react'; // import react

class _MainSection {
  render() {
    return (
      <div>
        <h1>Example of React with es6 and browserify</h1>
        <Body />
      </div>
    );
  }
}
export const MainSection = React.createClass(_MainSection.prototype);
```

We can create ES6 classes, but have to export it with `React.createClass` [5]. Importing the created files can be done like this:

```js
import {MainSection} from './components/MainSection.react.jsx';
```

### String templating for classes

```js
class _Body {
  getClassName() {
    return 'foo';
  }

  render() {
    const x = 'x';

    return (
      <div className={`${x} ${this.getClassName()} bar`}>
        Hello there!
      </div>
    );
  }
}
```

As you can see, you can use template literals [6] to create your classnames.

## Sources

* [0] Browserify - https://github.com/substack/node-browserify
* [1] Reactify - https://github.com/andreypopp/reactify
* [2] es6ify - https://github.com/thlorenz/es6ify
* [3] traceur-compiler - https://github.com/google/traceur-compiler
* [4] vinyl-source-stream - https://www.npmjs.org/package/vinyl-source-stream
* [5] react-es6-class - https://github.com/bjoerge/react-es6-class
* [6] Template Literals - https://github.com/google/traceur-compiler/wiki/LanguageFeatures#template-literals
* [7] Fast build with browserify and reactjs - http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
