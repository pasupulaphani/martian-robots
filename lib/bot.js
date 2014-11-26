/*
 * Copyright (c) 2014 Phaninder
 * Licensed under the MIT license.
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');

var Point = require('./point').Point;
var config = require('./config');

var left = {
    'N': 'W',
    'W': 'S',
    'S': 'E',
    'E': 'N'
};
var right = {
    'N': 'E',
    'E': 'S',
    'S': 'W',
    'W': 'N'
};
var orientations = ['N', 'E', 'W', 'S'];

var nextForwardPos = function(point, orientation) {

    if (orientations.indexOf(orientation) === -1) {
        throw new Error("UNKNOWN_ORIENTATION");
    }

    switch (orientation) {
        case 'N':
            return new Point(point.x, point.y + 1);
        case 'E':
            return new Point(point.x + 1, point.y);
        case 'W':
            return new Point(point.x - 1, point.y);
        case 'S':
            return new Point(point.x, point.y - 1);
    }
};

function Bot(x, y, orientation, grid) {
    this.pos = new Point(x, y);
    if (!grid.isInBounds(this.pos)) {
        throw new Error("Cannot place Bot outside the grid");
    }

    if (orientations.indexOf(orientation) === -1) {
        throw new Error("UNKNOWN_ORIENTATION");
    }
    this.orientation = orientation;
    this.alive = true;
    this.off = false;
    this.grid = grid;

    EventEmitter.call(this);

    this.on('L', this.turnLeft);
    this.on('R', this.turnRight);
    this.on('F', this.moveForward);
    this.on('OFF', this.switchOff);
}

util.inherits(Bot, EventEmitter);

Bot.prototype.turnLeft = function() {

    if (this.alive && !this.off) {

        this.orientation = left[this.orientation];
        return true;

    } else {

        return false;
    }
};

Bot.prototype.turnRight = function() {

    if (this.alive && !this.off) {

        this.orientation = right[this.orientation];
        return true;

    } else {

        return false;
    }
};

Bot.prototype.moveForward = function() {

    if (!this.alive || this.off) {
        return false;
    }

    var next_pos = nextForwardPos(this.pos, this.orientation);

    if (this.grid.hasScent(next_pos)) {
        this.emit('OFF');
    }

    if (this.grid.isInBounds(next_pos)) {
        this.pos = next_pos;
        return true;
    } else {
        this.alive = false;
        this.grid.setScent(this.pos);
        return false;
    }
};

Bot.prototype.switchOff = function() {
    if (!config.get('IGNORE_OFF')) {
        this.off = true;
        return false;
    } else {
        return true;
    }
};

Bot.prototype.getStatus = function() {

    var status = '';
    if (!this.alive) {
        status = 'LOST';
    } else if (this.off) {
        status = 'OFF';
    }

    return [this.pos.x, this.pos.y, this.orientation, status].join(' ').trim();
};

module.exports.Bot = Bot;
