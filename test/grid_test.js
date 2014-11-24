/*global describe,it*/
'use strict';
var assert = require('chai').assert,
    Grid = require('../lib/grid.js').Grid,
    Point = require('../lib/point').Point;

describe('Grid module.', function() {

    it('has Grid', function() {
        assert.isDefined(Grid, 'is Function');
    });

    describe('In point Grid :', function() {

        // lets create a point grid
        var grid = new Grid(0, 0);

        it('rectangular grid with l=0 aand b=0', function() {
            assert.isObject(grid, 'grid is created');
        });

        // has functions defined by API
        it('Verifying API', function() {
            assert.isFunction(grid.hasScent, 'is available');
            assert.isFunction(grid.setScent, 'is available');
            assert.isFunction(grid.isInBounds, 'is available');
        });

        it('set scent at 0,0', function() {
            var point = new Point(0, 0);
            grid.setScent(point);

            assert.isTrue(grid.hasScent(point), 'scent is at 0,0');
        });

        it('is 0,0 in the boundary?', function() {
            assert.isTrue(grid.isInBounds(new Point(0, 0)), '0,0 is in the bounds');
        });

        it('is 0,1 in the boundary?', function() {
            assert.isFalse(grid.isInBounds(new Point(0, 1)), '0,1 is not in the bounds');
        });
    });



    describe('In Grid 2 X 2 :', function() {

        // lets create a 2 X 2 grid
        var grid = new Grid(2, 2);

        it('rectangular grid with l=2 aand b=2', function() {
            assert.isObject(grid, 'grid is created');
        });

        var point_1_2 = new Point(1, 2);

        it('set scent at 1,2', function() {
            grid.setScent(point_1_2);

            assert.isTrue(grid.hasScent(point_1_2), 'scent is at 1,2');
        });

        it('is 1,2 in the boundary?', function() {
            assert.isTrue(grid.isInBounds(point_1_2), '1,2 is in the bounds');
        });

        it('is 1,-3 in the boundary?', function() {
            assert.isFalse(grid.isInBounds(new Point(1, -3)), '1,-2 is not in the bounds');
        });
    });

});
