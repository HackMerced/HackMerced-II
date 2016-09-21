## HackMerced Website
[Live Site](//hackmerced.com)

This repository is used to store the files for HackMerced's core website. Feel free to use it as long as you comply with our license.

## Why Optica? ##

We love the node registration features of [chef server](https://docs.chef.io/server_components.html).
However, we run chef-solo here at [Airbnb](www.airbnb.com).
We use optica as alternate node registration system.

## Installation ##

HackMerced's website runs on top of node.js and requires you to install `node.js`, `npm`, `grunt`;

Once you've installed the prerequistes you will need to run the following command to run packages.

```bash
$ npm install
$ ./setup
```

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
