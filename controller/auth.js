const rp = require('request-promise');
const request = require('../utility/request');

async function login (req, res, next) {
  const options = request.gen_options(JSON.stringify(req.body))
  const response = await rp(options)
    .then(response => JSON.parse(response))
    .catch(err => res.status(500).send(err))
  if (response.status === 'failed') {
    const error = new Error(response.response.message)
    error.status = 404
    return next(error)
  }
  res.send(response)
}

async function register (req, res, next) {
  const options = request.gen_options(JSON.stringify(req.body))
  const response = await rp(options)
    .then(res => JSON.parse(res))
    .catch(err => res.status(403).send(err));
    if (response.status === 'failed') {
      const error = new Error(response.response.message)
      error.status = 409
      return next(error)
    }
  res.send(response)
}

module.exports = { login, register }