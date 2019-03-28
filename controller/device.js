const rp = require('request-promise');
const request = require('../utility/request');
const base64 = require('../utility/base64');


async function all (req, res, next) {
  const options = request.gen_options(JSON.stringify(req.body))
  const result = await rp(options)
    .then(res => JSON.parse(res))
    .catch(err => res.status(500).send(err))
  if (result.status === 'failed') {
    const error = new Error(result.response.message)
    error.status = 404
    return next(error)
  } else {
    const devices = result.response.message
    res.send(devices)
  }
}

async function add_device(req, res) {
  const options = request.gen_options(JSON.stringify(req.body));
  const result = await rp(options)
    .then(res => JSON.parse(res));
  if (result.status === 'failed') {
    const error = new Error(result.response.message)
    error.status = 404
    return next(error)
  } else {
    const command = base64.decode(result.response.message.activate_command)
    const fs_options = request.gen_device_options(command)
    const fs_result = await rp(fs_options)
      .then(res => JSON.parse(res))
      .catch(err => res.status(500).send(err))
    if (fs_result === '') {
      const error = new Error("device err")
      error.status = 500
      return next(error)
    } else {
      const activate_device_body = {
        auth: {
          token: req.body.auth.token,
          user: req.body.auth.user
        },
        data: {
          data: fs_result.message,
          device: {
            id: result.response.message.device_id
          }
        },
        operation: 'parse_response',
        type: 'add_device'
      }

      const activate_options = request.gen_options(JSON.stringify(activate_device_body))
      const activate = await rp(activate_options)
        .then(res => JSON.parse(res))
        .catch(err => console.log(err))
      res.send(activate)
    }
  }
}

async function get_device (req, res) {
  const options = request.gen_options(JSON.stringify(req.body))
  const result = await rp(options)
    .then(res => JSON.parse(res))
    .catch(err => res.status(500).send(err))
  res.send(result)
  if (result.response.status === 'failed') {
      const error = new Error(result.response.message)
      error.status = 404
      return next(error)
  } else {
    const device = result.response.message
    res.send(device)
  }
}

async function status(req, res) {
  const options = request.gen_options(JSON.stringify(req.body))
  const result = await rp(options)
    .then(res => JSON.parse(res))
    .catch(err => res.status(500).send(err))
  if (!Array.isArray(result.response.message)) {
    const error = new Error(result.response.message)
    error.status = 404
    return next(error)
  } else {
    const command = base64.decode(result.response.message[0])
    console.log('++++++')
    console.log(command)
    console.log('++++++')
    const fs_options = request.gen_device_options(command)
    const fs_result = await rp(fs_options)
      .then(res => JSON.parse(res))
      .catch(err => res.status(500).send(err))
    if (fs_result.message === '') {
      const error = new Error('err device')
      error.status = 500
      return next(error)
    } else {
      const params = request.gen_params('device_status', req, fs_result.message)
      const status_body = request.gen_body(params);
      const status_options = request.gen_options(JSON.stringify(status_body))
      const status_result = await rp(status_options)
        .then(res => JSON.parse(res))
        .catch(err => res.status(500).send(err));
      res.status(200).send(status_result);
    }
  }
}

async function get_time(req, res) {
  const options = request.gen_options(JSON.stringify(req.body));
  const response = await rp(options)
    .then(res => JSON.parse(res))
    .catch(err => res.status(500).send(err));
  if (!Array.isArray(response.response.message)) {
    res.status(403).send(response.response.message)
  } else {
    const fiscal_command = base64.decode(response.response.message[0]);
    const fiscal_option = request.gen_device_options(fiscal_command);
    const fiscal_response = await rp(fiscal_option)
      .then(res => JSON.parse(res))
      .catch(err => res.status(500).send(err));
    if (fiscal_response.message === '') {
      res.status(500).send('device error')
    } else {
      const params = request.gen_params('get_time_and_date', req, fiscal_response.message);
      const parse_response_body = request.gen_body(params);
      const parse_response_options = request.gen_options(JSON.stringify(parse_response_body));
      const parse_response_request = await rp(parse_response_options)
        .then(res => JSON.parse(res))
        .catch(err => res.status(500).send(err))
      res.send(parse_response_request);
    }
  }
}

async function set_time(req, res) {
  const options = request.gen_options(JSON.stringify(req.body));
  const response = await rp(options)
    .then(res => JSON.parse(res))
    .catch(err => res.status(500).send(err));
  if (!Array.isArray(response.response.message)) {
    res.status(403).send(response.response.message)
  } else {
    const fiscal_command = base64.decode(response.response.message[0]);
    const fiscal_option = request.gen_device_options(fiscal_command);
    const fiscal_response = await rp(fiscal_option)
      .then(res => JSON.parse(res))
      .catch(err => res.status(500).send(err));
    if (fiscal_response.message === '') {
      res.status(500).send('fiscal device error')
    } else {
      const params = request.gen_params('set_time_and_date', req, fiscal_response.message);
      const parse_response_body = request.gen_body(params);
      const parse_response_options = request.gen_options(JSON.stringify(parse_response_body));
      const parse_response_request = await rp(parse_response_options)
        .then(res => JSON.parse(res))
        .catch(err => res.status(500).send(err))
      res.send(parse_response_request);
    }
  }
}

async function documents (req, res) {
  
  const params = request.gen_params('set_time_and_date', req, fiscal_response.message);
      const parse_response_body = request.gen_body(params);
      const parse_response_options = request.gen_options(JSON.stringify(parse_response_body));
  const options = request.gen_options(JSON.stringify(body));
  console.log(options)
  const response = await rp(options).then(res => JSON.parse(res)).catch(err => res.send(err))
  res.send(response)
}

module.exports = {
  all,
  add_device,
  get_device,
  status,
  get_time,
  set_time,
  documents
}