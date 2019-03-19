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

#### GET ALL DEVICE's
get all user devices
##### POST '/api/v1/device/list'
+ Method: `POST`
+ URL: `/api/v1/device/list`
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

#### GET ALL ITEMS
get all items from fiscal device
##### POST '/api/v1/item/all'
+ Method: `POST`
+ URL: `/api/v1/item/all`
+ Body:
```js
{
  "operation": "build_command",
  "type": "get_first_item",
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

### FISCAL OPERATIONS

#### FISCAL RECEIPT
trigger fiscal device to print receipt
##### POST '/api/v1/receipt/fiscal'
+ Method: `POST`
+ URL: `/api/v1/receipt/fiscal`
+ Body:
```js
{
  "operation": "build_command",
  "type": "fiscal_receipt",
  "auth": {
    "user": "test_user",
    "token": "test_user_token"
  },
  "data": {
    "items": [
      {
        "price": "0.01",
        "product": "Пуканки",
        "quantity": "1"
      },
      {
        "price": "0.01",
        "product": "Вафла",
        "quantity": "2"
      }
    ],
    "operator": {
      "name": "test_operator_name",
      "num": "1",
      "pwd": "0000"
    },
    "paidmode": "cash",
    "tax_type": "B",
    "till_num": "1",
    "device": {
      "id": "1"
    }
  }
}
```

#### NON-FISCAL RECEIPT
trigger fiscal device to print non-fiscal receipt
##### POST '/api/v1/receipt/non-fiscal'
+ Method: `POST`
+ URL: `/api/v1/receipt/non-fiscal`
+ Body:
```js
{
  "operation": "build_command",
  "type": "non_fiscal_receipt",
  "auth": {
    "user": "test_user",
    "token": "test_user_token"
  },
  "data": {
    "text": 
    [
      "Non fiscal receipt text 1",
      "Non fiscal receipt text 2"
    ],
    "device": {
      "id": "1"
    }
  }
}
```


#### REVERSAL RECEIPT
trigger fiscal device to print reversal receipt
##### POST '/api/v1/receipt/reversal'
+ Method: `POST`
+ URL: `/api/v1/receipt/reversal`
+ Body:
```js
{
  "operation": "build_command",
  "type": "reversal",
  "auth": {
    "user": "test_user",
    "token": "test_user_token"
  },
  "data": {
    "reversal_data": {
      "operator": {"name": "pesho", "num": "1", "pwd": "1"},
      "till_num": "1",
      "tax_type": "Б",
      "unp": "DT518231-0001-0000015",
      "document_type": "2",
      "document_number": "34",
      "document_date_time": "2702191208",
      "fm_number": "02518231",
      "reason": "не ме кефят пуканки 2",
      "items": [
        {"price": "0.01", "product": "Пуканки", "quantity": "1"}
      ]	  
    },
    "device": {
      "id": "1"
    }
  }
}
```