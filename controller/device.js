// const serialization = require('../utility/serialization');
const request = require('../utility/request');
const base64 = require('../utility/base64');

const rp = require('request-promise');

async function add_device(req, res) {
  const options = request.generate_request_options(JSON.stringify(req.body));
  const response = await rp(options)
    .then(res => JSON.parse(res));
  if (response.status === 'failed') {
    res.status(403).send(response.response)
  } else {
    // res.send(response
    console.log('********')
    console.log(response)
    console.log('********')
    console.log(response.response.message.activate_command)
    const fiscal_command = base64.decode(response.response.message.activate_command)
    console.log(fiscal_command)
    const fiscal_options = request.generate_fiscal_device_options(fiscal_command)
    const fiscal_response = await rp(fiscal_options).then(res => JSON.parse(res)).catch(err => res.send(err))
    // res.send(fiscal_response)
    console.log('============')
    console.log(fiscal_response)
    console.log('============')

    const activate_device_body = {
      auth: {
        token: req.body.auth.token,
        user: req.body.auth.user
      },
      data: {
        data: fiscal_response.message,
        device: {
          id: response.response.message.device_id
        }
      },
      operation: 'parse_response',
      type: 'add_device'
    }

    const active_device_options = request.generate_request_options(JSON.stringify(activate_device_body))

    console.log('...............')
    console.log(active_device_options)
    console.log('...............')
    const active_device_request = await rp(active_device_options).then(res => JSON.parse(res)).catch(err => console.log(err))
    console.log('-=-=-=-=-=-=')
    console.log(active_device_request)
    console.log('-=-=-=-=-=-=')
    res.send(active_device_request)
  }
}

async function get_device(req, res) {
  const options = request.generate_request_options(JSON.stringify(req.body))
  const response = await rp(options)
    .then(res => JSON.parse(res));
  if (response.status === 'failed') {
    res.status(403).send(response.response.message)
  } else {
    res.send(response)
  }
}

async function activate_device(req, res) {
  const options = request.generate_request_options(JSON.stringify(req.body))
  const response = await rp(options).then(res => JSON.parse(res))
  res.send(response)
}

async function status(req, res) {
  console.log('test')
  const options = request.generate_request_options(JSON.stringify(req.body))
  const response = await rp(options).then(res => JSON.parse(res))
  res.send(response)
}

module.exports = {
  add_device,
  get_device,
  activate_device,
  status
}