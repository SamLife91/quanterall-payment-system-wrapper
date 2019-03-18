const rp = require('request-promise');
const request = require('../utility/request');

async function login(req, res) {
  const options = request.generate_request_options(JSON.stringify(req.body))
  const response = await rp(options)
    .then(response => JSON.parse(response))
    .catch(err => res.status(403).send(err))
  res.send(response)
}

async function register(req, res) {
  const options = request.generate_request_options(JSON.stringify(req.body))
  const response = await rp(options)
    .then(res => JSON.parse(res))
    .catch(err => res.status(403).send(err));
  res.send(response)
}

module.exports = { login, register }


