/*global describe,it*/
'use strict';
var assert = require('chai').assert,
    Bot = require('../lib/bot.js').Bot,
    Grid = require('../lib/grid.js').Grid,
    Point = require('../lib/point').Point;

describe('Bot node module.', function() {

    it('has Bot', function() {
        assert.isDefined(Bot, 'is Function');
    });


    describe('Bot in a point grid.', function() {
        // create a point grid
        var grid = new Grid(0, 0);

        describe('create a bot outside the grid:', function() {

            var addBot = function() {
                new Bot(10, 10, 'E', grid);
            };

            it('must fail to set the bot', function() {
                assert.throws(addBot, Error);
            });

        });

        describe('create a bot with invalid orientation:', function() {

            var addBot = function() {
                new Bot(10, 10, 'U', grid);
            };

            it('must fail to set the bot', function() {
                assert.throws(addBot, Error);
            });

        });

        var bot = new Bot(0, 0, 'E', grid);

        it('must be bot', function() {
            assert.isObject(bot, 'is an object');
        });

        // has functions defined by API
        it('Verifying API', function() {
            assert.isFunction(bot.turnLeft, 'is available');
            assert.isFunction(bot.turnRight, 'is available');
            assert.isFunction(bot.moveForward, 'is available');
            assert.isFunction(bot.switchOff, 'is available');
            assert.isFunction(bot.getStatus, 'is available');
        });

        it('turn to left', function() {
            bot.orientation = 'E';
            bot.turnLeft();
            assert.equal(bot.orientation, 'N', 'change direction from E to N');
        });

        it('turn to right', function() {
            bot.orientation = 'N';
            bot.turnRight();
            assert.equal(bot.orientation, 'E', 'change direction from N to E');
        });

        it('emit turn to left event', function() {
            bot.orientation = 'E';
            bot.emit('L');
            assert.equal(bot.orientation, 'N', 'change direction from E to N');
        });

        it('emit turn to right event', function() {
            bot.orientation = 'N';
            bot.emit('R');
            assert.equal(bot.orientation, 'E', 'change direction from N to E');
        });

        it('emit move forward event', function() {
            bot.orientation = 'N';
            bot.emit('F');
            var expected = new Point(0, 0);
            assert.deepEqual(bot.pos, expected, 'Cannot move in a point grid');
        });

        it('move forward', function() {
            bot.orientation = 'N';
            bot.moveForward();
            var expected = new Point(0, 0);
            assert.deepEqual(bot.pos, expected, 'Cannot move in a point grid');
        });


        it('LOST bot: turn to left', function() {
            bot.orientation = 'E';
            bot.alive = false;
            bot.turnLeft();
            assert.equal(bot.orientation, 'E', 'cannot turn a LOST bot');
        });

        it('OFF bot: turn to right', function() {
            bot.orientation = 'E';
            bot.off = true;
            bot.turnRight();
            assert.equal(bot.orientation, 'E', 'cannot turn a OFF bot');
        });

        it('Verify the status of LOST bot', function() {
            bot.orientation = 'E';
            bot.alive = false;
            assert.equal(bot.getStatus(), '0 0 E LOST', 'bot is LOST');
        });
    });


    describe('Bot in a 2 X 2 grid.', function() {
        // create a point grid
        var grid = new Grid(2, 2);
        var bot = new Bot(1, 1, 'E', grid);

        it('turn to left', function() {
            bot.orientation = 'E';
            bot.turnLeft();
            assert.equal(bot.orientation, 'N', 'change direction from E to N');
        });

        it('turn to right', function() {
            bot.orientation = 'N';
            bot.turnRight();
            assert.equal(bot.orientation, 'E', 'change direction from N to E');
        });

        it('move forward', function() {
            bot.orientation = 'N';
            bot.moveForward();
            var expected = new Point(1, 2);
            assert.deepEqual(bot.pos, expected, 'moved up North');
        });

        it('Verify the status of bot', function() {
            bot.orientation = 'N';
            bot.pos = new Point(1, 2);
            assert.equal(bot.getStatus(), '1 2 N', 'bot is LOST');
        });

        it('move forward UP to get LOST', function() {
            bot.orientation = 'N';
            bot.moveForward();
            var expected = new Point(1, 2);
            assert.deepEqual(bot.pos, expected, 'Cannot move more');
            assert.isFalse(bot.alive, 'bot is LOST');
        });

        it('LOST bot: turn to left', function() {
            bot.orientation = 'E';
            bot.alive = false;
            bot.turnLeft();
            assert.equal(bot.orientation, 'E', 'cannot turn a LOST bot');
        });

        it('OFF bot: turn to right', function() {
            bot.orientation = 'E';
            bot.off = true;
            bot.turnRight();
            assert.equal(bot.orientation, 'E', 'cannot turn a OFF bot');
        });

        it('Verify the status of LOST bot', function() {
            bot.orientation = 'N';
            bot.alive = false;
            bot.pos = new Point(1, 2);
            assert.equal(bot.getStatus(), '1 2 N LOST', 'bot is LOST');
        });
    });

});
