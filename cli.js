#! /usr/bin/env node

'use strict';

var Controller = require('./lib/controller').Controller;

var fs = require('fs');
var program = require('commander');

program
    .version(require('./package').version)
    .option('-i, --input [filename]', 'Input file')
    .option('--TURN_OFF [true/false]', 'To turn off the bot on scent. Default: false')
    .option('--MAX_INS [int]', 'Max instructions allowed. Default: 100')
    .option('--MAX_X [int]', 'Grid max x co-ordinate. Default: 50')
    .option('--MAX_Y [int]', 'Grid max y co-ordinate. Default: 50')
    .parse(process.argv);


var controller, bot_ready = false;

var setConfig = function() {
    if (program.TURN_OFF && program.TURN_OFF == 'true') {
        controller.setConfig('IGNORE_OFF', false);
    }
    if (program.MAX_INS && isNaN(parseInt(program.MAX_INS))) {
        controller.setConfig('MAX_INSTRUCTIONS', parseInt(program.MAX_INS));
    }
    if (program.MAX_X && isNaN(parseInt(program.MAX_X))) {
        controller.setConfig('MAX_X', parseInt(program.MAX_X));
    }
    if (program.MAX_Y && isNaN(parseInt(program.MAX_Y))) {
        controller.setConfig('MAX_Y', parseInt(program.MAX_Y));
    }
};

var data = function(data) {

    if (!data || data == '') {
        return
    };
    var init = function(data) {
        data = data.match(/\S+/g);
        controller = new Controller(parseInt(data[0]), parseInt(data[1]));
        setConfig();
    }

    if (typeof controller === 'undefined') {
        init(data);
    } else if (!bot_ready) {
        data = data.match(/\S+/g);
        controller.addBot(parseInt(data[0]), parseInt(data[1]), data[2]);
        bot_ready = true;
    } else {
        console.log(controller.steer(data));
        bot_ready = false;
    }

};

if (program.input) {
    var input = fs.createReadStream(program.input);
    readLines(input, data);
}

function readLines(input, func) {
    var remaining = '';

    input.on('data', function(data) {
        remaining += data;
        var index = remaining.indexOf('\n');
        var last = 0;
        while (index > -1) {
            var line = remaining.substring(last, index);
            last = index + 1;
            func(line);
            index = remaining.indexOf('\n', last);
        }

        remaining = remaining.substring(last);
    });

    input.on('end', function() {
        if (remaining.length > 0) {
            func(remaining);
        }
    });
}
