// const rp = require('request-promise');
const request = require('../utility/request');
const base64 = require('../utility/base64')
const axios = require('axios');

require('dotenv').config();

const port = `${process.env.API_URL_PORT}`;
const printerPort = `${process.env.FISCAL_DEVICE_PORT}`;
const baseURL = `${process.env.API_URL}:${port}`;
const fiscalURL = `${process.env.FISCAL_DEVICE_URL}:${printerPort}`;

async function add_item(req, res, next) {
  const result = await axios.post(baseURL, req.body).catch(() => {
    const error = new Error('service is down')
    error.status = 500
    return next(error)
  })
  if (!Array.isArray(result.data.response.message)) {
    res.status(403).send(result.data.response.message)
  } else {
    const command = base64.decode(result.data.response.message[0])
    const fs_result = await axios.post(fiscalURL, command).catch(() => {

    })
    console.log(fs_result.data)
    if (fs_result.data.message === '') {
      const error = new Error('error device')
      error.status = 500
      return next(error)
    } else {
      const params = request.gen_params('add_item', req, fs_result.data.message);
      const parse_response_body = request.gen_body(params)
      const item = await axios.post(baseURL, parse_response_body)
      res.send(item.data.response.message)
    }
  }
}

// get item
async function get_item(req, res) {
  const options = request.gen_options(JSON.stringify(req.body))
  const response = await rp(options)
    .then(res => JSON.parse(res))
    .catch(err => res.status(404).send(err))
  console.log(response.response)
  if (!Array.isArray(response.response.message)) {
    res.status(403).send(response.response.message)
  } else {
    const fiscal_command = base64.decode(response.response.message[0])
    const fiscal_options = request.gen_device_options(fiscal_command)
    const fiscal_response = await rp(fiscal_options)
      .then(res => JSON.parse(res))
      .catch(err => res.status(403).send(err))
    if (fiscal_response.message === '') {
      res.status(500).send('fiscal device error')
    } else {
      const params = request.gen_params('get_item', req, fiscal_response.message);
      const parse_response_body = request.gen_body(params)
      const parse_response_options = request.gen_options(JSON.stringify(parse_response_body))
      const parse_response_response = await rp(parse_response_options)
        .then(res => JSON.parse(res))
        .catch(err => res.status(500).send(err))
      res.send(parse_response_response)
    }
  }
}

async function get_all_items(req, res, next) {
  let items = [];
  const fi = await axios.post(baseURL, req.body).catch(() => {
    const error = new Error('service is down')
    error.status = 500
    return next(error)
  })
  if (!Array.isArray(fi.data.response.message)) {
    const error = new Error(fi.data.response.message)
    error.status = 404
    return next(error)
  } else {
    const fi_command = base64.decode(fi.data.response.message[0])
    const fi_result = await axios.post(fiscalURL, fi_command)
      .catch(() => {
        const error = new Error('fiscal device error')
        error.status = 500
        return next(error)
      })
    if (fi_result.data.message === '') {
      const error = new Error(fi_result.data.response.message)
        error.status = 404
        return next(error)
    } else {
      console.log('00-0-0-0')
      console.log(fi_result.data.message)
      console.log('00-0-0-0')
      const params = request.gen_params('get_first_item', req, fi_result.data.message);
      const fi_result_body = request.gen_body(params);
      console.log(fi_result_body)

      const fi_item = await axios.post(baseURL, fi_result_body).catch(() => {
        const error = new Error('rr')
        error.status = 404
        return next(error)
      })
      items.push(fi_item.data.response.message)
    }
  }
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
    const ni = await axios.post(baseURL, next_item_body).catch(() => {
    })
    if (!Array.isArray(ni.data.response.message)) {

    } else {
      const ni_command = base64.decode(ni.data.response.message[0])
      const ni_result = await axios.post(fiscalURL, ni_command)
        .catch(() => {

        })
      if (ni_result.data.message === '') {

      } else {
        const params_next_item = request.gen_params('get_next_item', req, ni_result.data.message)
        const ni_item_body = request.gen_body(params_next_item)
        const ni_item = await axios.post(baseURL, ni_item_body).catch(() => {})
        console.log(ni_item.data.response);
        if (ni_item.data.response.message === 'item_not_found') {
          getNext = false
        } else {
          items.push(ni_item.data.response.message)
        }
      }
    }
  } while (getNext);

  res.status(200).send(items)

}

module.exports = {
  add_item,
  get_item,
  get_all_items
}