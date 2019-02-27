const rp = require('request-promise');
const msgpack = require('msgpack');

const port = '8808'
const baseURL = `http://31.13.251.48:${port}`

async function login (data) {
  const pckg = msgpack.pack(data)
  const packgBase64 = pckg.toString('base64')
  let options = {
    method: 'POST',
    url: baseURL,
    body: packgBase64,
    json: false
  }
  const result = await rp(options).then(res => new Buffer(res, 'base64')).catch(err => console.log(err.message))
  const response = msgpack.unpack(result)

  return response
}

async function register (data) {
  const pckg = msgpack.pack(data)
  const packgBase64 = pckg.toString('base64')
  let options = {
    method: 'POST',
    url: baseURL,
    body: packgBase64,
    json: false
  }
  const result = await rp(options).then(res => new Buffer(res, 'base64')).catch(err => console.log(err.msg))
  return msgpack.unpack(result)
}

async function add_device (data) {
  const pckg = msgpack.pack(data)
  const packgBase64 = pckg.toString('base64')

  let options = {
    method: 'POST',
    url: baseURL,
    body: packgBase64,
    json: false
  }

  const result = await rp(options).then(res => new Buffer(res, 'base64')).catch(err => console.log(err.msg))
  return msgpack.unpack(result)
}

async function get_device (data) {
  const pckg = msgpack.pack(data)
  const packgBase64 = pckg.toString('base64')

  let options = {
    method: 'POST',
    url: baseURL,
    body: packgBase64,
    json: false
  }

  const result = await rp(options).then(res => new Buffer(res, 'base64')).catch(err => console.log(err.msg))
  return msgpack.unpack(result)
}


// module.exports = {
//   login
// }
module.exports = {login, register, add_device, get_device}