/*
 * Copyright (c) 2014 Phaninder
 * Licensed under the MIT license.
 */

'use strict';

var Point = function(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z || 0;
};

Point.prototype.isEqual = function(point) {
    return this.x === point.x && this.y === point.y && this.z === point.z;
};

module.exports.Point = Point;
