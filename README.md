#  [![Build Status](https://secure.travis-ci.org//martian-robots.png?branch=master)](http://travis-ci.org//martian-robots)

> Martian Robots Problem


## Getting Started

Checkout the repo or download the source, then

    cd martian-robots
    npm install
    node cli.js -i example/input.txt

Run tests:

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
- example/input.txt : Is a sample input file that has the accepted format to use with the cli tool.
- example/martian-robots_example.js : This shows how to use the API directly.


## License

Copyright (c) 2014 Phaninder  
Licensed under the MIT license.
