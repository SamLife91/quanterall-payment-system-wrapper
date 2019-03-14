// const serialization = require('../utility/serialization');
const request = require('../utility/request');

const rp = require('request-promise');

async function login(req, res) {
  const options = request.generate_request_options(JSON.stringify(req.body))
  const response = await rp(options).then(response => JSON.parse(response)).catch(err => res.status(403).send(err))
  if (response.status === 'failed') {
    res.status(403).send(response.response.message)
  } else {
    res.send(response)
  }
}

async function register(req, res) {
  const options = request.generate_request_options(JSON.stringify(req.body))
  const response = await rp(options)
    .then(res => JSON.parse(res));
  if (response.status === 'failed') {
    res.status(403).send(response.response.message)
  } else {
    res.send(response)
  }
}

module.exports = { login, register }


