const request = require('../utility/request');
const axios = require("axios")

const baseURL = request.baseURL

async function login (req, res, next) { 
  const result = await axios.post(baseURL, req.body)
  .catch(() => {
    let error = new Error('service is down')
    return next(error)
  })
  if (result.data.status === 'failed') {
    let error = new Error(result.data.response.message)
    error.status = 404
    return next(error)
  }
  res.send(result.data.response.message.token)
}

async function register (req, res, next) {
  const result = await axios.post(baseURL, req.body)
  .catch(() => {
    const error = new Error('service is down')
    return next(error)
  })
  if (result.data.status === 'failed') {
    const error = new Error(result.data.response.message)
    error.status = 409
    return next(error)
  }
  res.send(result.data.response.message)
}

module.exports = { login, register }