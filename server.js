var db = require('./modules/db');
var hapi = require ('hapi');
var respond = require('./modules/respond');

db.init(function() {
  var server = new hapi.Server();
  server.connection({
    port: 3000
  });

  server.route({
    method: 'GET',
    path: '/{itemId}',
    handler: function(req, reply) {
      db.get(req.params.itemId, function(err, response) {
        respond(err, response, reply);
      });
    }
  });

  server.route({
    method: 'PUT',
    path: '/{itemId}',
    handler: function(req, reply) {
      db.update(req.params.itemId, req.payload, function(err, response) {
        respond(err, response, reply);
      });
    }
  });

  server.route({
    method: 'DELETE',
    path: '/{itemId}',
    handler: function(req, reply) {
      db.delete(req.params.itemId, function(err, response) {
        respond(err, response, reply);
      });
    }
  });

  server.route({
    method: 'POST',
    path: '/',
    handler: function(req, reply) {
      db.insert(req.payload, function(err, response) {
        respond(err, response, reply);
      });
    }
  });

  server.route({
    method: 'GET',
    path: '/nearest/{address}',
    handler: function(req, reply) {
      db.getProximal(req.params.address, function(err, response) {
        respond(err, response, reply);
      });
    }
  });

  server.start(function(err) {
    if (err) {
      throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
  });
});
