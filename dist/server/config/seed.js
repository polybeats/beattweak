/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var _room = require('../api/room/room.model');

var _room2 = _interopRequireDefault(_room);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var roomNames = ['Bass', 'House', 'Techno', 'Dub', 'DnB'];
var newRoom,
    new_mock = {
  tempo: 140,
  bar_resolution: 8,
  grid_length: 16,
  channels: []
};
var ch_names = ['Kick', 'Snare', 'Hi-hat', 'Rimshot'],
    channel = { index: 0, beats: [] };
for (var i = 0; i < new_mock.grid_length; i++) {
  channel.beats.push(false);
}
new_mock.channels = ch_names.map(function (name, i) {
  return { name: name, index: i, beats: channel.beats };
});

_room2.default.find({}).remove().then(function () {
  _room2.default.create(roomNames.map(function (name) {
    var mock = { name: name + ' Room' };

    for (var i in new_mock) {
      mock[i] = new_mock[i];
    }
    return mock;
  }));
});

/*({
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
             'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
             'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
             'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep ' +
             'tests alongside code. Automatic injection of scripts and ' +
             'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more ' +
             'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript ' +
             'payload, minifies your scripts/css/images, and rewrites asset ' +
             'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
             'and openshift subgenerators'
    })*/
//# sourceMappingURL=seed.js.map
