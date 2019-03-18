const rp = require('request-promise');
const request = require('../utility/request');
const base64 = require('../utility/base64')

async function add_item(req, res) {
  const options = request.generate_request_options(JSON.stringify(req.body))
  const response = await rp(options)
    .then(res => JSON.parse(res))
    .catch(err => res.status(403).send(err));

  const fiscal_command = base64.decode(response.response.message[0])
  const fiscal_options = request.generate_fiscal_device_options(fiscal_command);
  const fiscal_response = await rp(fiscal_options)
    .then(res => JSON.parse(res))
    .catch((err) => res.status(500).send(err));

  const params = request.generate_parse_response_params('add_item', req, fiscal_response.message);
  const parse_response_body = request.generate_body_from_fiscal_response(params)
    
  const parse_response_options = request.generate_request_options(JSON.stringify(parse_response_body))
  const parse_response_request = await rp(parse_response_options)
    .then(res => JSON.parse(res))
    .catch((err) => res.status(500).send(err));
  res.status(200).send(parse_response_request);
}

// get item
async function get_item (req, res) {
  const options = request.generate_request_options(JSON.stringify(req.body))
  const response = await rp(options)
    .then(res => JSON.parse(res))
    .catch(err => res.status(500).send(err))
  
  const fiscal_command = base64.decode(response.response.message[0])
  const fiscal_options = request.generate_fiscal_device_options(fiscal_command)
  const fiscal_response = await rp(fiscal_options)
    .then(res => JSON.parse(res))
    .catch(err => res.status(500).send(err))

  const params = request.generate_parse_response_params('get_item', req, fiscal_response.message);
  const parse_response_body = request.generate_body_from_fiscal_response(params)

  const parse_response_options = request.generate_request_options(JSON.stringify(parse_response_body))
  const parse_response_response = await rp(parse_response_options)
    .then(res => JSON.parse(res))
    .catch(err => res.status(500).send(err))
  res.send(parse_response_response)
}

async function get_all_items (req, res) {
  let items = [];
  
  const first_item_options = request.generate_request_options(JSON.stringify(req.body))
  const first_item = await rp(first_item_options).then(res => JSON.parse(res)).catch(err => res.status(500).send(err))
  const first_item_fiscal_command = base64.decode(first_item.response.message[0])
  const first_item_fiscal_options = request.generate_fiscal_device_options(first_item_fiscal_command)
  const first_item_fiscal_request = await rp(first_item_fiscal_options)
    .then(res => JSON.parse(res))
    .catch(err => res.status(500).send(err))

  const params = request.generate_parse_response_params('get_first_item', req, first_item_fiscal_request.message);
  const parse_response_first_item_body = request.generate_body_from_fiscal_response(params);

  const parse_response_options = request.generate_request_options(JSON.stringify(parse_response_first_item_body))
  const parse_response_request = await rp(parse_response_options)
    .then(res => JSON.parse(res))
    .catch(err => res.status(500).send(err))

  items.push(parse_response_request.response.message)

  let getNext = true
  do {
    const next_item_body = {
      operation: 'build_command',
      type: 'get_next_item',
      auth: {
        user: req.body.auth.user,
        token: req.body.auth.token
      },
      data: {
        device: {
          id: req.body.data.device.id
        }
      }
    }

    const next_item_option = request.generate_request_options(JSON.stringify(next_item_body))
    const next_item_response = await rp(next_item_option)
      .then(res => JSON.parse(res))
      .catch(err => res.status(500).send(err));
    
    const next_item_fiscal_command = base64.decode(next_item_response.response.message[0])
    const next_item_fiscal_options = request.generate_fiscal_device_options(next_item_fiscal_command)
    const next_item_fiscal_response = await rp(next_item_fiscal_options)
      .then(res => JSON.parse(res))
      .catch(err => console.log(err))

    const params_next_item = request.generate_parse_response_params('get_next_item', req, next_item_fiscal_response.message)
    const parse_response_next_item_body = request.generate_body_from_fiscal_response(params_next_item)
    const parse_respone_next_item_options = request.generate_request_options(JSON.stringify(parse_response_next_item_body))
    const parse_response_next_item_request = await rp(parse_respone_next_item_options)
      .then(res => JSON.parse(res))
      .catch(err => res.status(500).send(err));
      console.log(parse_response_next_item_request.response);
    if (parse_response_next_item_request.response.message === 'item_not_found') {
      getNext = false
    } else {
      items.push(parse_response_next_item_request.response.message)
    }
  } while (getNext);

  res.status(200).send(items)
  
}

module.exports = {
  add_item,
  get_item,
  get_all_items
}