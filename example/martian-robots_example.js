'use strict';

var Controller = require('../lib/controller.js').Controller;
var config = require('../lib/config');

var c1 = new Controller(5, 3);

console.log('controller 1')
console.log('IGNORE_OFF :' + config.get('IGNORE_OFF'));

c1.addBot(1, 1, 'E');
console.log(c1.steer('RFRFRFRF'));

c1.addBot(3, 2, 'N');
console.log(c1.steer('FRRFLLFFRRFLL'));

c1.addBot(0, 3, 'W');
console.log(c1.steer('LLFFFLLFL'));

console.log('New controller: controller 2')
var c2 = new Controller(5, 3);
c2.setConfig('IGNORE_OFF', false);
console.log('IGNORE_OFF :' + config.get('IGNORE_OFF'));

c2.addBot(1, 1, 'E');
console.log(c2.steer('RFRFRFRF'));

c2.addBot(3, 2, 'N');
console.log(c2.steer('FRRFLLFFRRFLL')); // lost at 3,3

c2.addBot(0, 3, 'W');
console.log(c2.steer('LLFFFLLFL')); // Picks up scent and turns off without getting lost
