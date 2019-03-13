const rp = require('request-promise');
const request = require('../utility/request');
const base64 = require('../utility/base64');

async function add_device (req, res) {
  const options = request.generate_request_options(JSON.stringify(req.body));
  const response = await rp(options)
    .then(res => JSON.parse(res))
    .catch(err => res.status(500).send(err));
  const fiscal_command = base64.decode(response.response.message.activate_command)
  const fiscal_options = request.generate_fiscal_device_options(fiscal_command)
  const fiscal_response = await rp(fiscal_options)
    .then(res => JSON.parse(res))
    .catch(err => res.status(500).send(err))
  
  const params = request.generate_parse_response_params('add_device', req, fiscal_response.message)
  const parse_response_body = request.generate_body_from_fiscal_response(params)
  const parse_response_options = request.generate_request_options(JSON.stringify(parse_response_body))
  const parse_response_request = await rp(parse_response_options)
    .then(res => JSON.parse(res))
    .catch(err => console.log(err))
  res.send(parse_response_request)
}

async function get_device (req, res) {
  const options = request.generate_request_options(JSON.stringify(req.body))
  const response = await rp(options).then(res => JSON.parse(res)).catch(err => res.status(500).send(err))
  res.send(response)
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
  
  const params = request.generate_parse_response_params('device_status', req, fiscal_response.message)

  const parse_response_body = request.generate_body_from_fiscal_response(params);
  console.log(parse_response_body)
  const parse_response_options = request.generate_request_options(JSON.stringify(parse_response_body))
  const parse_response_request = await rp(parse_response_options).then(res => JSON.parse(res)).catch(err => res.status(500).send(err));
  res.status(200).send(parse_response_request);
}

async function get_time (req, res) {
  const options = request.generate_request_options(JSON.stringify(req.body));
  const response = await rp(options).then(res => JSON.parse(res));

  const fiscal_command = base64.decode(response.response.message[0]);
  const fiscal_option = request.generate_fiscal_device_options(fiscal_command);
  const fiscal_response = await rp(fiscal_option).then(res => JSON.parse(res))
    .catch(err => res.status(500).send(err));

  const params = request.generate_parse_response_params('get_time_and_date', req, fiscal_response.message);
  const parse_response_body = request.generate_body_from_fiscal_response(params);
  const parse_response_options = request.generate_request_options(JSON.stringify(parse_response_body));
  const parse_response_request = await rp(parse_response_options).then(res => JSON.parse(res)).catch(err => res.status(500).send(err))
  res.send(parse_response_request);
}

async function set_time (req, res) {
  const options = request.generate_request_options(JSON.stringify(req.body));
  const response = await rp(options).then(res => JSON.parse(res))
    .catch(err => res.status(500).send(err));
    
  const fiscal_command = base64.decode(response.response.message[0]);
  const fiscal_option = request.generate_fiscal_device_options(fiscal_command);
  const fiscal_response = await rp(fiscal_option).then(res => JSON.parse(res))
    .catch(err => res.status(500).send(err));

  const params = request.generate_parse_response_params('set_time_and_date', req, fiscal_response.message);
  const parse_response_body = request.generate_body_from_fiscal_response(params);
     
  const parse_response_options = request.generate_request_options(JSON.stringify(parse_response_body));
  const parse_response_request = await rp(parse_response_options)
    .then(res => JSON.parse(res))
    .catch(err => res.status(500).send(err))
  res.send(parse_response_request);
}

module.exports = {
  add_device,
  get_device,
  activate_device,
  status,
  get_time,
  set_time
}