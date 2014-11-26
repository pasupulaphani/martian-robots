/*
 * Copyright (c) 2014 Phaninder
 * Licensed under the MIT license.
 */

'use strict';

var _conf = _conf || {};

_conf.IGNORE_OFF = true;
_conf.MAX_X = 50;
_conf.MAX_Y = 50;
_conf.MAX_INSTRUCTIONS = 100;

module.exports = {
    set: function(key, val) {
        _conf[key] = val;
    },
    get: function(key) {
        return _conf.hasOwnProperty(key) ? _conf[key] : '';
    }
};
