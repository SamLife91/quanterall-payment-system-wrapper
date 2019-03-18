const rp = require('request-promise');
const request = require('../utility/request');
const base64 = require('../utility/base64');


async function all (req, res) {
  const options = request.generate_request_options(JSON.stringify(req.body))
  const response = await rp(options).then(res => JSON.parse(res)).catch(err => res.status(500).send(err))
  res.send(response)
}

async function add_device(req, res) {
  const options = request.generate_request_options(JSON.stringify(req.body));
  const response = await rp(options)
    .then(res => JSON.parse(res));
  if (response.status === 'failed') {
    res.status(403).send(response.response.message)
  } else {
    const fiscal_command = base64.decode(response.response.message.activate_command)
    const fiscal_options = request.generate_fiscal_device_options(fiscal_command)
    const fiscal_response = await rp(fiscal_options)
      .then(res => JSON.parse(res))
      .catch(err => res.status(500).send(err))
    if (fiscal_response === '') {
      res.status(500).send('fiscal device error')
    } else {
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
      const active_device_request = await rp(active_device_options)
        .then(res => JSON.parse(res))
        .catch(err => console.log(err))
      res.send(active_device_request)
    }
  }
}

async function get_device (req, res) {
  const options = request.generate_request_options(JSON.stringify(req.body))
  const response = await rp(options)
    .then(res => JSON.parse(res))
    .catch(err => res.status(500).send(err))
  res.send(response)
}

async function status(req, res) {
  const options = request.generate_request_options(JSON.stringify(req.body))
  const response = await rp(options)
    .then(res => JSON.parse(res))
    .catch(err => res.status(500).send(err))
    console.log(response.response.message[0])
  if (!Array.isArray(response.response.message)) {
    res.status(403).send(response.response.message)
  } else {
    const fiscal_command = base64.decode(response.response.message[0])
    const fiscal_options = request.generate_fiscal_device_options(fiscal_command)
    const fiscal_response = await rp(fiscal_options)
      .then(res => JSON.parse(res))
      .catch(err => res.status(500).send(err))
    if (fiscal_command.message === '') {
      res.status(500).send('fiscal device error')
    } else {
      const params = request.generate_parse_response_params('device_status', req, fiscal_response.message)
      const parse_response_body = request.generate_body_from_fiscal_response(params);
      const parse_response_options = request.generate_request_options(JSON.stringify(parse_response_body))
      const parse_response_request = await rp(parse_response_options)
        .then(res => JSON.parse(res))
        .catch(err => res.status(500).send(err));
      res.status(200).send(parse_response_request);
    }
  }
}

async function get_time(req, res) {
  const options = request.generate_request_options(JSON.stringify(req.body));
  const response = await rp(options)
    .then(res => JSON.parse(res))
    .catch(err => res.status(500).send(err));
  if (!Array.isArray(response.response.message)) {
    res.status(403).send(response.response.message)
  } else {
    const fiscal_command = base64.decode(response.response.message[0]);
    const fiscal_option = request.generate_fiscal_device_options(fiscal_command);
    const fiscal_response = await rp(fiscal_option)
      .then(res => JSON.parse(res))
      .catch(err => res.status(500).send(err));
    if (fiscal_response.message === '') {
      res.status(500).send('device error')
    } else {
      const params = request.generate_parse_response_params('get_time_and_date', req, fiscal_response.message);
      const parse_response_body = request.generate_body_from_fiscal_response(params);
      const parse_response_options = request.generate_request_options(JSON.stringify(parse_response_body));
      const parse_response_request = await rp(parse_response_options)
        .then(res => JSON.parse(res))
        .catch(err => res.status(500).send(err))
      res.send(parse_response_request);
    }
  }
}

async function set_time(req, res) {
  const options = request.generate_request_options(JSON.stringify(req.body));
  const response = await rp(options)
    .then(res => JSON.parse(res))
    .catch(err => res.status(500).send(err));
  if (!Array.isArray(response.response.message)) {
    res.status(403).send(response.response.message)
  } else {
    const fiscal_command = base64.decode(response.response.message[0]);
    const fiscal_option = request.generate_fiscal_device_options(fiscal_command);
    const fiscal_response = await rp(fiscal_option)
      .then(res => JSON.parse(res))
      .catch(err => res.status(500).send(err));
    if (fiscal_response.message === '') {
      res.status(500).send('fiscal device error')
    } else {
      const params = request.generate_parse_response_params('set_time_and_date', req, fiscal_response.message);
      const parse_response_body = request.generate_body_from_fiscal_response(params);
      const parse_response_options = request.generate_request_options(JSON.stringify(parse_response_body));
      const parse_response_request = await rp(parse_response_options)
        .then(res => JSON.parse(res))
        .catch(err => res.status(500).send(err))
      res.send(parse_response_request);
    }
  }
}

module.exports = {
  all,
  add_device,
  get_device,
  status,
  get_time,
  set_time
}