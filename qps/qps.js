const serialization = require('../utility/serialization');
const request = require('../utility/request');

const rp = require('request-promise');
const msgpack = require('msgpack');

const port = '8808'
const baseURL = `http://31.13.251.48:${port}`

async function login (req, res) {
  const body = serialization.serialize_request(req.body);
  const options = request.generate_request_options(body)
  const response = await rp(options)
        .then(res => serialization.serialize_response(res));
  if (response.status === 'failed') {
    res.status(403).send(response.response.message)
  } else {
    res.send(response)
  }
}

async function register (req, res) {
  const body = serialization.serialize_request(req.body);
  const options = request.generate_request_options(body)
  const response = await rp(options)
        .then(res => serialization.serialize_response(res));
  if (response.status === 'failed') {
    res.status(403).send(response.response.message)
  } else {
    res.send(response)
  }
}

async function add_device (req, res) {
  const body = serialization.serialize_request(req.body);
  const options = request.generate_request_options(body)
  const response = await rp(options)
        .then(res => serialization.serialize_response(res));
  if (response.status === 'failed') {
    res.status(403).send(response.response.message)
  } else {
    res.send(response)
  }
}

async function get_device (req, res) {
  const body = serialization.serialize_request(req.body);
  const options = request.generate_request_options(body)
  const response = await rp(options)
        .then(res => serialization.serialize_response(res));
  if (response.status === 'failed') {
    res.status(403).send(response.response.message)
  } else {
    res.send(response)
  }
}

async function add_item (data, res) {
  const pckg = msgpack.pack(data)
  const packgBase64 = pckg.toString('base64')

  let options = {
    method: 'POST',
    url: baseURL,
    body: packgBase64,
    json: false
  }

  const result = await rp(options).then(res => Buffer(res, 'base64')).catch(err => console.log(err.msg))
  console.log(msgpack.unpack(result))
  let json = JSON.parse(data)
  const item = msgpack.unpack(result)
  if (item.status === 'failed') {
    return res.status(400).send(item.response.message)
  } else {
    const decodeBody = {
      type: 'add_item',
      operation: 'parse_response',
      auth: {
        user: json.auth.user,
        token: json.auth.token
      },
      data: {
        device: {
          id: json.data.device.id
        },
        data: item.response.message[0]
      }
    }
    const alternativeData = JSON.stringify(decodeBody)
    const pckg2 = msgpack.pack(alternativeData)
    const packgBase642 = pckg2.toString('base64')
  
    let decodeOptions = {
      method: 'POST',
      url: baseURL,
      body: packgBase642,
      json: false
    }
    const decoded = await rp(decodeOptions).then(res => Buffer(res, 'base64')).catch(err => console.log(err.msg))
    return res.status(200).send(msgpack.unpack(decoded))
  }
  
  
} 

async function get_item (data) {
  const pckg = msgpack.pack(data)
  const packgBase64 = pckg.toString('base64')

  let options = {
    method: 'POST',
    url: baseURL,
    body: packgBase64,
    json: false
  }

  const result = await rp(options).then(res => Buffer(res, 'base64')).catch(err => console.log(err.msg))
  return msgpack.unpack(result)
}

function test () {
  console.log('test')
}


// module.exports = {
//   login
// }
module.exports = {login, register, add_device, get_device, get_item, add_item, test}