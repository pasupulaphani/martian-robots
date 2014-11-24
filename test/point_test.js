/*global describe,it*/
'use strict';
var assert = require('chai').assert,
    Point = require('../lib/point').Point;

describe('Point node module.', function() {

    it('has Point', function() {
        assert.isDefined(Point, 'is Function');
    });

    var point = new Point(0, 0, 0);

    it('must be point', function() {
        assert.isObject(point, 'is an object');
    });

    // has functions defined by API
    it('Verifying API', function() {
        assert.isFunction(point.isEqual, 'is available');
    });

    it('is equal', function () {
        assert.deepEqual(point, new Point(0, 0), "they are same point");
    });

});
