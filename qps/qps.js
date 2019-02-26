const rp = require('request-promise');
const msgpack = require('msgpack');
const Base64 = require('js-base64').Base64;
var fs = require("fs");
var msgpackLite = require("msgpack-lite");
const assert = require('assert');
var _ = require('lodash');
var base64_arraybuffer= require('base64-arraybuffer-converter');




const port = '8808'
const baseURL = `http://31.13.251.48:${port}`



async function login (data) {
  let buf = new Buffer('2U57InR5cGUiOiJsb2dpbiIsIm9wZXJhdGlvbiI6ImF1dGgiLCJkYXRhIjp7InVzZXIiOiJlbHZpcyIsInBhc3N3b3JkIjoiZWx2aXMifX0=', 'base64')
  console.log(buf)
  console.log('*********---*****')
  let unbuf = msgpackLite.decode(buf)
  console.log(unbuf)
  let packbuf = msgpackLite.encode(unbuf)
  console.log(packbuf)
  const eq = _.isEqual(packbuf, buf)
  console.log(eq)
  console.log('/////////////////////////////')
  // const buf64 = buf.toString('base64')
  const buf64 = buf.toString('base64')
  console.log(buf64)
  if (buf64 === '2U57InR5cGUiOiJsb2dpbiIsIm9wZXJhdGlvbiI6ImF1dGgiLCJkYXRhIjp7InVzZXIiOiJlbHZpcyIsInBhc3N3b3JkIjoiZWx2aXMifX0=') {
    console.log('eq')
  } else {
    console.log('wr')
  }
  // const params = {
  //     "operation": "auth",
  //     "type": "login",
  //     "data": {
  //       "user": "test_user",
  //       "password": "test_password"
  //     }
  // }
  // const parampckg = msgpack.pack(params)
  // console.log(parampckg)
  // const buffer = msgpack.encode()
  // const pckg = msgpack.pack()
  // const packgBase64 = Base64.encode(pckg)
  // const pckg = msgpack.pack(data)
  const pckg = msgpack.pack(data)
  console.log(pckg)
  // const packgBase64 = Base64.encode(pckg)
  // var packgBase64 = base64_arraybuffer.ab_2_base64(pckg)

  // const packgBase64 = buf.toString('base64')
  const packgBase64 = pckg.toString('base64')
  console.log(packgBase64)
  const testData = `2U57InR5cGUiOiJsb2dpbiIsIm9wZXJhdGlvbiI6ImF1dGgiLCJkYXRhIjp7InVzZXIiOiJlbHZpcyIsInBhc3N3b3JkIjoiZWx2aXMifX0=`
  // const from64 = Base64.decode(testData)
  // console.log(from64)
  // console.log('********************')
  // const packed = msgpack.pack(from64)
  // const test = Base64.encode(packed)
  // console.log(unpacked)
  // console.log(msgpack.unpack(from64))
  // const unpack = msgpack.unpack(from64)
  // console.log(unpack)
  let options = {
    method: 'POST',
    url: baseURL,
    body: packgBase64,
    json: false
  }
  // console.log(pckg)
  // console.log(packgBase64)
  // const result = packgBase64
  const result = await rp(options).then(res => new Buffer(res, 'base64')).catch(err => console.log(err.message))
  // const result = await rp(options)
  console.log(result)
  console.log('============================================')
  const debug = msgpack.unpack(result)
  console.log(debug)
  // console.log()
  // const debug = Base64.decode(result)
  // const debug = btoa(result)
  // console.log(debug)
  // const unpackedRes = msgpack.decode(debug)
  // console.log(unpackedRes)
  
  // const response = Base64.decode(result)
  // console.log(response)
  // const response = msgpack.unpack(result)
  // const unpckg = msgpack.unpack(response)
  // console.log(response)
  return debug
  // return unpack
}

function register (params) {
  return (params)
}


// module.exports = {
//   login
// }
module.exports = {login, register}