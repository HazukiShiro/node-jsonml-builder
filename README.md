# JsonML Builder

Build JsonML objects on-the-fly using Node.js

## How to use

    var JsonML = require('jsonml-builder').JsonML;
    var x = new JsonML();

    x.add('html');
    
    x.open();
    x.add('head');

    x.open();
    x.add('title');
    x.add('Untitled');

    x.close(); // title
    x.close(); // head

    x.open();
    x.add('body');

    x.open();
    x.add('p');
    x.add('Hello, world!');

    var doc = x.get();
    console.log(doc);

The code above should print something like this:

    [ 'html',
      [ 'head', [ 'title', 'Untitled' ] ],
      [ 'body', [ 'p', 'Hello, world!' ] ] ]


## TODO

* JSDoc comments
* Add some examples

## UNLICENSE

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>
