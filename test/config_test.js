/*global describe,it*/
'use strict';
var assert = require('chai').assert,
    config = require('../lib/config');

describe('config node module.', function() {

    it('must be config', function() {
        assert.isObject(config, 'is an object');
    });

    // has functions defined by API
    it('Verifying API', function() {
        assert.isFunction(config.get, 'is available');
        assert.isFunction(config.set, 'is available');
    });

    it('get an existing config', function () {
        config.set('MAX_X', 50);
        assert.equal(config.get('MAX_X'), 50, 'config found');
    });

    it('get an non existing config', function () {
        assert.equal(config.get('MAX_Z'), '', 'config not found');
    });

});
