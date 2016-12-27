module.exports = function(err, json, reply) {

  if (err) {
    reply(JSON.stringify(err)).code(404);
    return;
  }

  reply(JSON.stringify(json)).code(200);
}
