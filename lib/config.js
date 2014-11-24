/*
 * Copyright (c) 2014 Phaninder
 * Licensed under the MIT license.
 */


'use strict';

var config = (function() {

    var conf = conf || {};

    conf.IGNORE_OFF = true;
    conf.MAX_X = 50;
    conf.MAX_Y = 50;
    conf.MAX_INSTRUCTIONS = 100;

    function Config() {}

    Config.prototype.set = function(key, val) {
        conf[key] = val;
    };

    Config.prototype.get = function(key) {
        return conf.hasOwnProperty(key) ? conf[key] : '';
    };

    return new Config();

}());

module.exports = config;
