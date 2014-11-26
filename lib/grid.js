/*
 * Copyright (c) 2014 Phaninder
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('underscore');
var Point = require('./point').Point;

var isInBounds = function(point, origin, end) {

    var x = point.x;
    var y = point.y;

    return (x >= origin.x && x <= end.x &&
        y >= origin.y && y <= end.y);
};

function Grid(end_x, end_y, origin_x, origin_y) {

    this.origin = new Point(origin_x || 0, origin_y || 0);
    this.end = new Point(end_x, end_y);
    this.scents = [];
}

Grid.prototype.hasScent = function(point) {
    return _.some(this.scents, function(p) {
        return p.isEqual(point);
    });
};

Grid.prototype.setScent = function(point) {
    this.scents.push(point);
};

Grid.prototype.isInBounds = function(point) {
    return isInBounds(point, this.origin, this.end);
};

module.exports.Grid = Grid;
