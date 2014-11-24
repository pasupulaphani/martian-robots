/*global describe,it*/
'use strict';
var assert = require('chai').assert,
    Controller = require('../lib/controller').Controller;

describe('controller node module.', function() {

    it('has Controller', function() {
        assert.isDefined(Controller, 'is Function');
    });


    describe('set the controller with oversized Grid:', function() {

        var createBigCont = function() {
            new Controller(100, 100);
        };

        it('must fail to set the controller', function() {
            assert.throws(createBigCont, Error);
        });

    });

    describe('set the controller with point Grid', function() {
        // create a point grid
        var controller = new Controller(0, 0);

        it('must be controller', function() {
            assert.isObject(controller, 'is an object');
        });

        // has functions defined by API
        it('Verifying API', function() {
            assert.isFunction(controller.addBot, 'is available');
            assert.isFunction(controller.steer, 'is available');
            assert.isFunction(controller.setConfig, 'is available');
        });

        describe('create a bot outside the grid:', function() {

            controller.setConfig('MAX_X', 50);
            var addBot = function() {
                controller.addBot(100, 100, 'E');
            };

            it('must fail to set the bot', function() {
                assert.throws(addBot, Error);
            });

        });

        describe('create a bot with invalid orientation:', function() {

            var addBot = function() {
                controller.addBot(0, 0, 'U');
            };

            it('must fail to set the bot', function() {
                assert.throws(addBot, Error);
            });

        });

        describe('steering the bot:', function() {

            controller.addBot(0, 0, 'E');
            controller.setConfig('MAX_INSTRUCTIONS', 3);
            var steerTooMany = function() {
                controller.steer('LLR');
            };

            it('too many instructions', function() {
                assert.throws(steerTooMany, Error);
            });

            var steerInvalidIns = function() {
                controller.steer('LLK');
            };

            it('invalid instruction', function() {
                assert.throws(steerInvalidIns, Error);
            });

            it('valid instructions', function() {
                assert.equal(controller.steer('LR'), '0 0 E');
            });

            it('lose the bot', function() {
                assert.equal(controller.steer('F'), '0 0 E LOST');
            });
        });
    });

});
