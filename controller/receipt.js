const request = require('../utility/request');
const base64 = require('../utility/base64');
const rp = require('request-promise');
const { forEach } = require('p-iteration');

async function fiscal (req, res) {
  const options = request.generate_request_options(JSON.stringify(req.body));
  const response = await rp(options).then(res => JSON.parse(res))
  .catch(err => res.status(500).send(err))
  const fiscal_commands = response.response.message.map(item => base64.decode(item));
  let com = [];

  await forEach(fiscal_commands, async (command) => {
    const fiscal_option = request.generate_fiscal_device_options(command);
    const fiscal_response = await rp(fiscal_option).then(res => JSON.parse(res)).catch(err => err);
    com.push(fiscal_response)
  })

  let parsed_commands = [];
  await forEach(com, async (el) => {
    const params = request.generate_parse_response_params('fiscal_receipt', req, el.message);
    const parse_response_body = request.generate_body_from_fiscal_response(params)
    const fiscal_response_option = request.generate_request_options(JSON.stringify(parse_response_body));
    const fiscal = await rp(fiscal_response_option).then(res => JSON.parse(res))
      .catch(err => res.status(500).send(err))
    parsed_commands.push(fiscal);
  })
  res.send(parsed_commands);
}

async function non_fiscal(req, res) {
  const options = request.generate_request_options(JSON.stringify(req.body));
  const response = await rp(options)
    .then(res => JSON.parse(res))
    .catch(err => res.status(500));
  if (!Array.isArray(response.response.message)) {
    res.status(403).send(res)
  } else {
    const decoded_commands = response.response.message.map(item => base64.decode(item));
    let fiscal_commands = [];
    await forEach(decoded_commands, async (command) => {
      const fiscal_option = request.generate_fiscal_device_options(command);
      const fiscal_response = await rp(fiscal_option)
        .then(res => JSON.parse(res))
        .catch(err => console.log(err));
      fiscal_commands.push(fiscal_response.message);
    })
    let parsed_commnads = [];
    await forEach(fiscal_commands, async (command) => {
      const params = request.generate_parse_response_params('non_fiscal_receipt', req, command);
      const parse_response_body = request.generate_body_from_fiscal_response(params);
      const parse_response_options = request.generate_request_options(JSON.stringify(parse_response_body));
      const parse_response = await rp(parse_response_options)
        .then(res => JSON.parse(res))
        .catch(err => console.log(err));
      parsed_commnads.push(parse_response)
    })
    res.send(parsed_commnads);
  }
}

async function reversal (req, res) {
  const options = request.generate_request_options(JSON.stringify(req.body));
  const response = await rp(options)
    .then(res => JSON.parse(res))
    .catch(err => res.status(500).send(err));

  if (!Array.isArray(response.response.message)) {
    res.status(403).send(response.response.message)
  } else {
    const decoded_commands = response.response.message.map(item => base64.decode(item));
  let fiscal_commands = [];
  
  await forEach(decoded_commands, async (command) => {
    const fiscal_option = request.generate_fiscal_device_options(command);
    const fiscal_response = await rp(fiscal_option)
      .then(res => JSON.parse(res))
      .catch(err => console.log(err));
    fiscal_commands.push(fiscal_response.message);
  })

  let parsed_commnads = [];
  await forEach(fiscal_commands, async (command) => {
    const params = request.generate_parse_response_params('reversal', req, command);
    const parse_response_body = request.generate_body_from_fiscal_response(params);
    const parse_response_options = request.generate_request_options(JSON.stringify(parse_response_body));
    const parse_response = await rp(parse_response_options)
      .then(res => JSON.parse(res))
      .catch(err => console.log(err));
    parsed_commnads.push(parse_response)
  })
  res.send(parsed_commnads);
  }
}

module.exports = {
  fiscal,
  non_fiscal,
  reversal
}