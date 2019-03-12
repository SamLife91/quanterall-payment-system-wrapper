// const serialization = require('../utility/serialization');
const request = require('../utility/request');
const base64 = require('../utility/base64');

const rp = require('request-promise');

async function add_device (req, res) {
  const options = request.generate_request_options(JSON.stringify(req.body));
  const response = await rp(options)
        .then(res => JSON.parse(res));
  if (response.status === 'failed') {
    res.status(403).send(response.response)
  } else {
    const fiscal_command = base64.decode(response.response.message.activate_command)
    const fiscal_options = request.generate_fiscal_device_options(fiscal_command)
    const fiscal_response = await rp(fiscal_options).then(res => JSON.parse(res)).catch(err => res.status(500).send(err))
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
    const active_device_request = await rp(active_device_options).then(res => JSON.parse(res)).catch(err => console.log(err))
    res.send(active_device_request)
  }
}

async function get_device (req, res) {
  const options = request.generate_request_options(JSON.stringify(req.body))
  const response = await rp(options)
        .then(res => JSON.parse(res));
  if (response.status === 'failed') {
    res.status(403).send(response.response.message)
  } else {
    res.send(response)
  }
}

async function activate_device (req, res) {
  const options = request.generate_request_options(JSON.stringify(req.body))
  const response = await rp(options).then(res => JSON.parse(res))
  res.send(response)
}

async function status (req, res) {
  const options = request.generate_request_options(JSON.stringify(req.body))
  const response = await rp(options).then(res => JSON.parse(res)).catch(err => res.status(500).send(err))
  const fiscal_command = base64.decode(response.response.message[0])
  const fiscal_options = request.generate_fiscal_device_options(fiscal_command)
  const fiscal_response = await rp(fiscal_options).then(res => JSON.parse(res)).catch(err => res.status(500).send(err))
  
  const device_command_body = {
    operation: "parse_response",
    type: "device_status",
    auth: {
      user: req.body.auth.user,
      token: req.body.auth.token
    },
    data: {
      device: {
        id: req.body.data.device.id
      },
      data: fiscal_response.message
    }
  }
  const device_status_options = request.generate_request_options(JSON.stringify(device_command_body))
  const device_status = await rp(device_status_options).then(res => JSON.parse(res)).catch(err => res.status(500).send(err));
  res.status(200).send(device_status);
}

module.exports = {
  add_device,
  get_device,
  activate_device,
  status
}