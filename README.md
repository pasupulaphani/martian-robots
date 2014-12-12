#  [![Build Status](https://secure.travis-ci.org/pasupulaphani/martian-robots.png?branch=master)](http://travis-ci.org/pasupulaphani/martian-robots) ![License MIT](http://img.shields.io/badge/License-MIT-lightgrey.svg?style=flat)

> Martian Robots Problem


## Getting Started

Checkout the repo or download the source, then

    cd martian-robots
    npm install

**On command line:**

    node cli.js -i example/input.txt

**In browser:**

    <script type="text/javascript" src="./browser.js"></script>
    <script type="text/javascript">
        var Controller = require('./lib/controller.js').Controller;
        ...
    </script>

**Run tests:**

    npm install grunt-cli -g
    grunt test

## Documentation
Problem is explained here [PROBLEM.md!](https://github.com/pasupulaphani/martian-robots/blob/master/PROBLEM.md)

### Options
    $ node cli.js -h
    
    Usage: cli [options]

    Options:
    
    -h, --help               output usage information
    -V, --version            output the version number
    -i, --input [filename]   Input file
    --TURN_OFF [true/false]  To turn off the bot on scent. Default: false
    --MAX_INS [int]          Max instructions allowed. Default: 100
    --MAX_X [int]            Grid max x co-ordinate. Default: 50
    --MAX_Y [int]            Grid max y co-ordinate. Default: 50

### Sample output

    ~/martian-robots $ node cli.js -i example/input.txt 
    1 1 E
    3 3 N LOST
    2 3 S

###### Option: --TURN_OFF
> If this is set to true, bot pick up the scent from the co-ordinate will be turned off.

    ~/martian-robots $ node cli.js -i example/input.txt --TURN_OFF true
    1 1 E
    3 3 N LOST // lost at 3,3
    3 3 E OFF // Picks up scent and turns off without getting lost

## Examples

Please see the example folder in the repo.
- example/cli-input_example.txt : Is a sample input file that has the accepted format to use with the cli tool.
- example/martian-robots_example.js : This shows how to use the API directly.use with in the browser.
- example/browsify_example.js : This shows how to use the API in Bowser.


## License

Copyright (c) 2014 Phaninder  
Licensed under the MIT license.
