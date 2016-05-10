'use strict';
angular
.module('beattweakApp')
// event Queue Model - queues event defs when clock isn't running.
.factory('eventQueue', function() {
  var _queue = new Array();

  function queue() {
    return _queue;
  }
  
  function clear() {
    
    _queue = [];
  }

  function add(anon) {
    _queue.push(anon);
  }

  // define all events
  function callEvents(clock, barDur) {
    _queue.forEach(function(e) {
      e(clock, barDur)
    });
    _queue = [];
  }

  // Queue a beat activation
  /*function addEnable(beat) {
    _queue.push(function(clock, bar) {
      var event = clock.callbackAtTime(function(event) {
        var bufferNode = beat.sound.createNode()
        bufferNode.start(event.deadline)
      }, nextBeatTime(beatInd))
      event.repeat(barDur)
      event.tolerance({late: 0.01})
      beat.event = event
    });
  }*/

  // Queue a beat disable 
/*  function addDisable(track, beatInd) {
    
  }
*/
  return {
    queue: queue,
    add: add,
    clear: clear
  };
});