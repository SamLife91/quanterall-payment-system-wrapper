# quanterall-payment-system-wrapper
express.js wrapper to qps api

## Requirements
- node:  8.X^
- npm:  5.X^

## Installation

- Clone the repo: 'git@github.com:SamLife91/quanterall-payment-system-wrapper.git'
- Install dependencies: 'npm install'
- Create Config file: 'npm run config'
- Fill Config variables: { 'API_URL', 'API_URL_PORT'. 'FISCAL_DEVICE_URL', 'FISCAL_DEVICE_PORT'}
```
API_URL = xxxx
API_URL_PORT = xxxx
FISCAL_DEVICE_URL = xxxx
FISCAL_DEVICE_PORT = xxxx
```
- Start the server: 'npm run start'

## Testing the api
### Via POSTMAN
- import already created POSTMAN file 'Quanterall Payment.postman_collection.json' ()

## RESTful endpoints
### AUTH
#### LOGIN
Login 
##### POST `/api/v1/auth/login`
+ Method: `POST`
+ URL: `/api/v1/auth/login`
+ Body:
```js
{
  "operation": "auth",
  "type": "login",
  "data": {
    "user": "test_user",
    "password": "test_password"
  }
}
```

#### REGISTER
Register
##### POST '/api/v1/auth/register'
+ Method: `POST`
+ URL: `/api/v1/auth/register`
+ Body:
```js
{
  "operation": "system",
  "type": "add_device",
  "auth": {
    "user": "test_user",
    "token": "test_user_token"
  },
  "data": {
    "type": "fiscal",
    "manufacture": "datecs",
    "model": "fp-60kl",
    "serial_number": "dt2742k873"
  }
}
```

### DEVICE
operations with fiscal device
#### ADD
add new fiscal device and set to active state
##### POST '/api/v1/device/add'
+ Method: `POST`
+ URL: `/api/v1/device/add`
+ Body:
```js
{
  "operation": "system",
  "type": "add_device",
  "auth": {
    "user": "test_user",
    "token": "test_user_token"
  },
  "data": {
    "type": "fiscal",
    "manufacture": "datecs",
    "model": "fp-60kl",
    "serial_number": "dt2742k873"
  }
}
```

#### GET DEVICE's
get all devices of current user.
##### POST '/api/v1/device
+ Method: `POST`
+ URL: `/api/v1/device`
+ Body:
```js
{
  "operation": "system",
  "type": "get_all_devices",
  "auth": {
    "user": "test_user",
    "token": "test_user_token"
  }
}
```

#### GET DEVICE STATUS
get device status
##### POST '/api/v1/device/status'
+ Method: `POST`
+ URL: `/api/v1/device/status`
+ Body:
```js
{
  "operation": "build_command",
  "type": "device_status",
  "auth": {
    "user": "test_user",
    "token": "test_user_token"
  },
  "data": {
    "device": {
      "id": "1"
    }
  }
}
```

#### GET DEVICE DATE AND TIME
get current date and time of device
##### POST '/api/v1/device/get-time'
+ Method: `POST`
+ URL: `/api/v1/device/get-time`
+ Body:
```js
{
  "operation": "build_command",
  "type": "get_time_and_date",
  "auth": {
    "user": "test_user",
    "token": "test_user_token"
  },
  "data": {
    "device": {
      "id": "1"
    }
  }
}
```

#### SET DEVICE DATE AND TIME
set date and time of device
##### POST '/api/v1/device/set-time'
+ Method: `POST`
+ URL: `/api/v1/device/set-time`
+ Body:
```js
{
  "operation": "build_command",
  "type": "set_time_and_date",
  "auth": {
    "user": "test_user",
    "token": "test_user_token"
  },
  "data": {
    "clock": "DD-MM-YY HH:MM:SS",
    "device": {
      "id": "1"
    }
  }
}
```

### ITEMS
operations with fiscal device items(products)

#### ADD ITEM
adding new item, or overwrite exsisting one
##### POST '/api/v1/item/add'
+ Method: `POST`
+ URL: `/api/v1/item/add`
+ Body:
```js
{
  "operation": "build_command",
  "type": "add_item",
  "auth": {
    "user": "test_user",
    "token": "test_user_token"
  },
  "data": {
    "item_data": {
      "group": "1",
      "name": "test_item_name",
      "number": "1",
      "quantity": "1",
      "price": "1.00",
      "tax_group": "Б"
    },
    "device": {
      "id": "1"
    }
  }
}
```

#### GET ITEM
get item from fiscal device
##### POST '/api/v1/item'
+ Method: `POST`
+ URL: `/api/v1/item`
+ Body:
```js
{
  "operation": "build_command",
  "type": "get_item",
  "auth": {
    "user": "test_user",
    "token": "test_user_token"
  },
  "data": {
    "item_data": {
      "number": "1"
    },
    "device": {
      "id": "1"
    }
  }
}
```