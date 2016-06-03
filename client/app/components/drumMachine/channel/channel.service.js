(function() {
  'use strict';

  angular
      .module('beattweakApp')
      .service('channel', channel);
    function channel($http, $log) {
      var data = [];
      var machine_id;
      var socket;

      this.setSocket = function(soc) {
        socket = soc;
      }

      this.getChannels = function () {
        return data;
      }

      function channelConf() {
        var chans = data.map(function(channel, i){
          return {index: i, 
            beats: channel.sequence.map(function(beat) {
              return beat.active;
            })} 
        });
        var retval = {channels: chans};
        retval['_id'] = machine_id;
        // TODO: get machine_id from this...
        return retval;
      }

      function updateNotify() {
        socket.socket.emit('room:beatUpdate', channelConf());
      }

      // This helper loads sound buffers
      var loadTrack = function(track, index, context) {
        var item = data[index];
        var url = '/assets/sounds/' + track;
        $http.get(url, {responseType: "arraybuffer"}).
          success(function(data) {
            $log.debug("Read '" + url + "' with " + data.byteLength
            + " bytes in a variable of type '" + data + "'");
            context.decodeAudioData(data, function(buffer) {
              var createNode = function() {
                var node = context.createBufferSource()
                node.buffer = buffer
                node.connect(context.destination)
                return node
              }
              item.sound = { createNode: createNode }
            })
          }).
          error(function(data, status) {
            $log.error("Request failed with status: " + status);
          });
        
      }


      this.updateBeats = function beatUpdate(machine) {
        $log.debug('updateBeats, machine_conf: ' + angular.toJson(machine))
        var channels = machine.channels;
        channels.forEach(function(ch) {
          ch.beats.forEach(function(beat, i) {
            data[ch.index].sequence[i].active = beat;
          })
        });
      }

      this.loadInstruments = function(machine, context, instrumentFile) {
        var item, beatUpdate = this.updateBeats;
        var file = instrumentFile || "/app/components/drumMachine/defaults/local-kit.json";
        data = [];
        this.channels = machine.channels;
        machine_id = machine['_id'];
        
        return $http.get(file).then(function(response) {
          var clearBeats = function(){this.sequence.forEach(function(b){b.active = false;})};
          for(var i = 0; i < 4; i++) {
            item = response.data.instruments[i];
            var row = {
              'channel': i + 1,
              'title': item.name, 
              'sound': null,
              'sequence': []
            };
            var toggleBeat = function(){this.active = !this.active;
              updateNotify();};
            var clearBeat = function(){this.active = false;};
            var togglePlay = function(){this.playing = !this.playing;};
            var stopPlay = function(){this.playing = false;};
            for(var j = 0; j < machine.gridLength; j++) {
              // Add beats
              row.sequence.push({"active": false, "toggle": toggleBeat, 
                "clear": clearBeat, "playing": false,
                "togglePlay": togglePlay, "stopPlay": stopPlay,
                "getClasses": function(){return {"active": this.active, "playing": this.playing};}
              });
            }
            row.clearBeats = clearBeats;
            row.getSequence =  function(){return this.sequence};
            data.push(row);
            loadTrack(item.file, i, context);
               
          }
          beatUpdate(machine);
          return "Instruments Loaded";
        });
      }
    }

    channel.$inject = ['$http', '$log'];

})();
