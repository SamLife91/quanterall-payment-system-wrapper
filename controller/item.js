const serialization = require('../utility/serialization');
const request = require('../utility/request');
const base64 = require('../utility/base64')

const msgpack = require('msgpack');
const lite = require('msgpack-lite')

const rp = require('request-promise');

async function add_item(req, res) {
  const options = request.generate_request_options(JSON.stringify(req.body))
  const response = await rp(options).then(res => JSON.parse(res)).catch(err => res.status(403).send(err));
  console.log(response)
  if (response.status === 'failed') {
    res.status(403).send(response)
  } else {
    const fiscal_command = base64.decode(response.response.message[0])
    const fiscal_options = request.generate_fiscal_device_options(fiscal_command);
    const fiscal_response = await rp(fiscal_options).then(res => JSON.parse(res)).catch((err) => res.status(500).send(err));
    
    const fiscal_body = {
      type: 'add_item',
      operation: 'parse_response',
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
    const add_item_options = request.generate_request_options(JSON.stringify(fiscal_body))
    const add_item_request = await rp(add_item_options).then(res => JSON.parse(res)).catch((err) => res.status(500).send(err));
    res.status(200).send(add_item_request);
  }
}

// get item
async function get_item (req, res) {
  const options = request.generate_request_options(JSON.stringify(req.body))
  const response = await rp(options).then(res => JSON.parse(res)).catch(err => res.status(500).send(err))
  
  const fiscal_command = base64.decode(response.response.message[0])
  const fiscal_options = request.generate_fiscal_device_options(fiscal_command)
  const fiscal_response = await rp(fiscal_options).then(res => JSON.parse(res)).catch(err => res.status(500).send(err))
  console.log(fiscal_response)

  const get_item_body = {
    operation: 'parse_response',
    type: 'get_item',
    auth: {
      user: req.body.auth.user,
      token: req.body.auth.token,
    },
    data: {
      device: {
        id: req.body.data.device.id
      },
      data: fiscal_response.message
    }
  }

  const get_item_options = request.generate_request_options(JSON.stringify(get_item_body))
  const get_item_response = await rp(get_item_options).then(res => JSON.parse(res)).catch(err => res.status(500).send(err))
  res.send(get_item_response)
}


// get all items
async function get_all_items (req, res) {
  let items = [];
  
  const first_item_options = request.generate_request_options(JSON.stringify(req.body))
  const first_item = await rp(first_item_options).then(res => JSON.parse(res)).catch(err => res.status(500).send(err))
  // res.send(first_item)
  const first_item_fiscal_command = base64.decode(first_item.response.message[0])
  const first_item_fiscal_options = request.generate_fiscal_device_options(first_item_fiscal_command)
  const first_item_fiscal_request = await rp(first_item_fiscal_options)
        .then(res => JSON.parse(res)).catch(err => res.status(500).send(err))


  const first_item_body = {
    operation: 'parse_response',
    type: 'get_first_item',
    auth: {
      user: req.body.auth.user,
      token: req.body.auth.token
    },
    data: {
      device: {
        id: req.body.data.device.id
      },
      data: first_item_fiscal_request.message
    }
  }

  const first_item_options_2 = request.generate_request_options(JSON.stringify(first_item_body))
  const first_item_request_2 = await rp(first_item_options_2).then(res => JSON.parse(res)).catch(err => res.status(500).send(err))

  // res.send(first_item_request_2)
  items.push(first_item_request_2.response.message)

  let getNext = true
  do {
    console.log('i')
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

    console.log(next_item_body)

    const next_item_option = request.generate_request_options(JSON.stringify(next_item_body))
    const next_item_response = await rp(next_item_option).then(res => JSON.parse(res)).catch(err => err)
    console.log(next_item_response.response.message[0]);
    
    const next_item_fiscal_command = base64.decode(next_item_response.response.message[0])
    const next_item_fiscal_options = request.generate_fiscal_device_options(next_item_fiscal_command)
    const next_item_fiscal_response = await rp(next_item_fiscal_options).then(res => JSON.parse(res)).catch(err => console.log(err))


    const next_item_body2 = {
      operation: 'parse_response',
      type: 'get_next_item',
      auth: {
        user: req.body.auth.user,
        token: req.body.auth.token
      },
      data: {
        device: {
          id: req.body.data.device.id
        },
        data: next_item_fiscal_response.message
      }
    }

    const next_item_options = request.generate_request_options(JSON.stringify(next_item_body2))

    const next_item_response2 = await rp(next_item_options).then(res => JSON.parse(res))
    console.log('**********')
      console.log(next_item_response2.response.message)
      console.log('**********')
    if (next_item_response2.response.message === 'item_not_found') {
      getNext = false
    } else {
      items.push(next_item_response2.response.message)
    }
    console.log(getNext)
  } while (getNext);

  res.status(200).send(items)
  
}

module.exports = {
  add_item,
  get_item,
  get_all_items
}