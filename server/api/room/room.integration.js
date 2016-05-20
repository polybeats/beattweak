'use strict';

var app = require('../..');
import request from 'supertest';

var newRoom, new_mock = {
    name: 'New Room',
    tempo: 140,
    bar_resolution: 8,
    grid_length: 16,
    channels: [
      
    ]
  };
var ch_names = ['Kick', 'Snare', 'Hi-hat', 'Rimshot'], channel = {index: 0, beats: []}
for(var i = 0; i < new_mock.grid_length; i++) {
  channel.beats.push(false);
}
new_mock.channels = ch_names.map(function(name, i) {
  return {name: name, index: i, beats: channel.beats};
})




describe('Room API:', function() {

  describe('GET /api/rooms', function() {
    var rooms;

    beforeEach(function(done) {
      request(app)
        .get('/api/rooms')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          rooms = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      rooms.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/rooms', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/rooms')
        .send(new_mock)
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newRoom = res.body;
          done();
        });
    });

    it('should respond with the newly created room', function() {
      newRoom.name.should.equal(new_mock.name);
      newRoom.tempo.should.equal(new_mock.tempo);
    });

  });

  describe('GET /api/rooms/:id', function() {
    var room;

    beforeEach(function(done) {
      request(app)
        .get('/api/rooms/' + newRoom._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          room = res.body;
          done();
        });
    });

    afterEach(function() {
      room = {};
    });

    it('should respond with the requested room', function() {
      room.name.should.equal(new_mock.name);
      room.tempo.should.equal(new_mock.tempo);
    });

  });

  describe('PUT /api/rooms/:id', function() {
    var updatedRoom;

    beforeEach(function(done) {
      request(app)
        .put('/api/rooms/' + newRoom._id)
        .send({
          name: 'Updated Room',
          tempo: 125
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedRoom = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedRoom = {};
    });

    it('should respond with the updated room', function() {
      updatedRoom.name.should.equal('Updated Room');
      updatedRoom.tempo.should.equal(125);
    });

  });

  describe('DELETE /api/rooms/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/rooms/' + newRoom._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when room does not exist', function(done) {
      request(app)
        .delete('/api/rooms/' + newRoom._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
