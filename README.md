# HackMerced Website
[Live Site](//hackmerced.com)

[![Code Climate](https://codeclimate.com/github/HackMerced/website/badges/gpa.svg)](https://codeclimate.com/github/HackMerced/website)

This repository is used to store the files for HackMerced's core website. Feel free to use it as long as you comply with our license.

## Installation ##

HackMerced's website runs on top of node.js and requires you to install `node.js`, `npm`, and `grunt`

Once you've installed the prerequistes you will need to run the following command to run packages.

```bash
$ npm install
$ ./setup (MacOSx, This needs to be converted into a node-binary instead of a C binary)
```

If you're on windows or linux, please compile setup in `scripts`

To setup the program for development environment run grunt normally:

```bash
$ grunt
```

To setup the website for production, run the following:

```bash
$ grunt production
```

## Running the Program ##
To run the program for development, enter the following:
```bash
$ node development.js
```

To run the program for production, enter the following:
```bash
$ node production.js
```

Access the website by going to `http://localhost:4220`

## License

(The MIT License)

Copyright (c) 2016 HackMerced

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
