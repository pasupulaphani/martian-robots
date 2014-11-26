/*
 * Copyright (c) 2014 Phaninder
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('underscore');
var Grid = require('./grid').Grid;
var Bot = require('./bot').Bot;
var config = require('./config');

var validateGrid = function(end_x, end_y) {
    if (isNaN(end_x) || end_x > config.get('MAX_X')) {
        throw new Error("The maximum value for X coordinate is " + config.get('MAX_X'));
    }
    if (isNaN(end_y) || end_y > config.get('MAX_Y')) {
        throw new Error("The maximum value for Y coordinate is " + config.get('MAX_Y'));
    }
};

var canSteer = function(instructions) {
    if (instructions.split('').length >= config.get('MAX_INSTRUCTIONS')) {
        throw new Error("Max length of instruction strings will be less than " + config.get('MAX_INSTRUCTIONS') + " characters.");
    }
};

function Controller(end_x, end_y, origin_x, origin_y) {

    end_x = parseInt(end_x);
    end_y = parseInt(end_y);
    validateGrid(end_x, end_y);

    this.grid = new Grid(end_x, end_y, origin_x, origin_y);
    this.bots = [];
}

Controller.prototype.addBot = function(x, y, orientation) {
    this.bots.push(new Bot(x, y, orientation, this.grid));
};


Controller.prototype.steer = function(instructions) {

    canSteer(instructions);

    // at the moment we steer one at a time
    var bot = this.bots[this.bots.length - 1];

    _.every(instructions.split(''), function(instruction) {
        return bot.emit(instruction);
    });

    return bot.getStatus();
};

Controller.prototype.setConfig = config.set;

module.exports.Controller = Controller;
