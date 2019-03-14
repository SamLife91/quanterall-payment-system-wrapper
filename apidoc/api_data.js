define({ "api": [
  {
    "type": "post",
    "url": "/api/v1/auth/login",
    "title": "Login User",
    "name": "Login",
    "group": "Auth",
    "permission": [
      {
        "name": "Non authorized"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Unique Type of Request.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status Request.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Response message or errors.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "operation",
            "description": "<p>Type operation.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n     \"type\": \"login\",\n     \"status\": \"success\",\n     \"response\": {\n       \"warnings\": [],\n        \"message\": {\n         \"token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyIjoiZWx2aXMiLCJleHAiOjE1NTA4MTgxNTd9.INJZT38sMOBTQhfqbQe0X3Gy2EauteFCrC409F6ZdovwDIpSgTBI527QkKwesmaya3zMcK7X_kMeEBN5RSSWFhj9sP45o7O7aUiHeRSNxPdAAvwDhLkZDEhV0NjyQnX0zDr1wJ3ik0gW1aIWx1WlIKcGv39yqW5GpESfqd2jmEZXmCmVWR3M3mV9rw0wXHA0I7m8-NkreEOKFZW0liWyzoXZl0pZZoaBkpb8IbirOoqhVvYPP3LNvT3bTNHxPDNrvsPtxQBHIrqtL3xijMPRlRsPCxjOEJjbDy2cIiTwpwXU6zYab3IEcd0qzh7_KOOHu_iWIjVozHQwo8FbMf69hw\"\n       },\n       \"errors\": []\n     },\n     \"operation\": \"auth\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>404 The id of the User was not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidAuthentication",
            "description": "<p>403 Authentication failed.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "UserNotFound:",
          "content": " HTTP/1.1 404 Not Found\n {\n \"operation\": \"auth\",\n\"response\": {\n   \"errors\": [],\n  \"message\": \"wrong_username_or_password\",\n  \"warnings\": []\n},\n\"status\": \"failed\",\n\"type\": \"login\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "    curl -X POST \\\nhttp://localhost:3000/api/v1/auth/login \\\n-H 'Content-Type: application/json' \\\n-H 'Postman-Token: 3bd60272-a674-4b3a-8ded-88efa05715fc' \\\n-H 'cache-control: no-cache' \\\n-d '{\n    \"type\": \"login\",\n    \"operation\": \"auth\",\n    \"data\": {\n      \"user\": \"elvis\",\n      \"password\": \"elvis\"\n    }\n   }'",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "./controller/auth.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/api/v1/auth/register",
    "title": "Register User",
    "name": "Register",
    "group": "Auth",
    "permission": [
      {
        "name": "Non authorized"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Unique Type of Request.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status Request.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Response message or errors.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "operation",
            "description": "<p>Type operation.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"operation\": \"auth\",\n  \"response\": {\n    \"errors\": [],\n    \"message\": \"user_was_registered\",\n   \"warnings\": []\n },\n  \"status\": \"success\",\n  \"type\": \"register\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>404 The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "UserNotFound:",
          "content": "HTTP/1.1 404 Not Found\n{\n \"type\": \"register\",\n \"status\": \"failed\",\n \"response\": {\n   \"warnings\": [],\n   \"message\": \"username_already_exists\",\n   \"errors\": []\n  },\n \"operation\": \"auth\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "   curl -X POST \\\n     http://localhost:3000/api/v1/auth/register \\\n     -H 'Content-Type: application/json' \\\n     -H 'Postman-Token: 8f4795d8-4bc9-438f-bc97-fc2736611dca' \\\n     -H 'cache-control: no-cache' \\\n     -d '{\n\t        \"type\": \"register\",\n\t        \"operation\": \"auth\",\n\t        \"data\": {\n\t          \"user\": \"arslan\",\n\t          \"password\": \"arslan_password\",\n\t          \"mail\": \"arslan@mail.arslan\",\n\t          \"first_name\": \"arslan\",\n\t          \"last_name\": \"arslan\"\n          }\n       }'",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "./controller/auth.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/api/v1/device/activate",
    "title": "Activate Device",
    "name": "Activate_Device",
    "group": "Device",
    "permission": [
      {
        "name": "Authorized user only"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status Response.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "operation",
            "description": "<p>Type Operation.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Response type.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Response message or errors.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{ \n  \"operation\": \"system\",\n  \"response\": {\n      \"errors\": [],\n      \"message\": [\n         {\n          \"active\": false,\n          \"data\": \"{\\\"sequence\\\":33}\",\n          \"firmware_version\": null,\n          \"id\": 9,\n          \"manufacture\": \"datecs\",\n          \"model\": \"fp-60kl\",\n          \"returned_response\": false,\n          \"serial_number\": \"dt1\",\n          \"state\": null,\n          \"type\": \"fiscal\",\n          \"user_id\": 1\n         }, ..... ],\n      \"warnings\": []\n  },\n  \"status\": \"success\",\n  \"type\": \"get_all_devices\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>403 Invalide data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Invalide data:",
          "content": "HTTP/1.1 403 Forbidden\n{\n user_does_not_exist\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -X POST \\\n  http://localhost:3000/api/v1/device/list \\\n -H 'Content-Type: application/json' \\\n -H 'Postman-Token: 5e239a02-e29e-403c-8851-725f31561dc3' \\\n -H 'cache-control: no-cache' \\\n -d '{\n     \"type\": \"get_all_devices\",\n     \"operation\": \"system\",\n     \"auth\": {\n      \"user\": \"elvis\",\n      \"token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyIjoiZWx2aXMiLCJleHAiOjE1NTI0MzYwODF9.eB9eJHf_FkdoJPvc2j8S4dkU2Vcp--XcXzKQkdc2LTxOa9lmYPMHcrZIEHVIarABaKW6DlrMpEPpt0RYEf86hRD684LcgQgC_bevkg3Wh2HSOTlI4SQT1JeFENsexfubBpMI1giUA7Gk3DvQruoHlDeX-YskpgDqVBju-EBFUIFhcBoBwNTFzV3xRQunQW6lEU7FbO3SzECreBbWfJ_MEAf2DAErrY474Bo8YgfHuNy6KU97L9Zb3H3ZY7S8cPMkOuarZGfn5I4xRargeYfr7_AIG-NSPAbLo4W8LY0UmPvNM8wjJ43xEEaNsC0-ItemXMaFpxkMQJtnq1uMIKHAzw\"\n     }\n    }'",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "./controller/device.js",
    "groupTitle": "Device"
  },
  {
    "type": "post",
    "url": "/api/v1/device/add",
    "title": "Add Device",
    "name": "Add_Device",
    "group": "Device",
    "permission": [
      {
        "name": "Authorized user only"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status Response.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "operation",
            "description": "<p>Type Operation.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Response type.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Response message or errors.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"operation\": \"parse_response\",\n \"response\": {\n    \"errors\": [],\n    \"message\": \"device_created\",\n    \"warnings\": []\n },\n \"status\": \"success\",\n \"type\": \"add_device\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>403 Invalide data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Invalide data:",
          "content": "HTTP/1.1 403 Forbidden\n{\n \"errors\": [],\n \"message\": \"device_name_is_taken\",\n \"warnings\": []\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -X POST \\\n http://localhost:3000/api/v1/device/add \\\n -H 'Content-Type: application/json' \\\n -H 'Postman-Token: 2764ee18-6329-4791-a05f-e3c18c7b1cf8' \\\n -H 'cache-control: no-cache' \\\n -d '{\n   \"type\": \"add_device\",\n   \"operation\": \"system\",\n   \"auth\": {\n     \"user\": \"arslan\",\n     \"token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyIjoiZWx2aXMiLCJleHAiOjE1NTI0MzYwODF9.eB9eJHf_FkdoJPvc2j8S4dkU2Vcp--XcXzKQkdc2LTxOa9lmYPMHcrZIEHVIarABaKW6DlrMpEPpt0RYEf86hRD684LcgQgC_bevkg3Wh2HSOTlI4SQT1JeFENsexfubBpMI1giUA7Gk3DvQruoHlDeX-YskpgDqVBju-EBFUIFhcBoBwNTFzV3xRQunQW6lEU7FbO3SzECreBbWfJ_MEAf2DAErrY474Bo8YgfHuNy6KU97L9Zb3H3ZY7S8cPMkOuarZGfn5I4xRargeYfr7_AIG-NSPAbLo4W8LY0UmPvNM8wjJ43xEEaNsC0-ItemXMaFpxkMQJtnq1uMIKHAzw\"\n   },\n   \"data\": {\n     \"type\": \"fiscal\",\n     \"manufacture\": \"datecs\",\n     \"model\": \"fp-60kl\",\n     \"serial_number\": \"dt2742k876\"\n   }\n  }'",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "./controller/device.js",
    "groupTitle": "Device"
  },
  {
    "type": "post",
    "url": "/api/v1/device/list",
    "title": "List Device",
    "name": "List_Device",
    "group": "Device",
    "permission": [
      {
        "name": "Authorized user only"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status Response.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "operation",
            "description": "<p>Type Operation.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Response type.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Response message or errors.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{ \n  \"operation\": \"system\",\n  \"response\": {\n      \"errors\": [],\n      \"message\": [\n         {\n          \"active\": false,\n          \"data\": \"{\\\"sequence\\\":33}\",\n          \"firmware_version\": null,\n          \"id\": 9,\n          \"manufacture\": \"datecs\",\n          \"model\": \"fp-60kl\",\n          \"returned_response\": false,\n          \"serial_number\": \"dt1\",\n          \"state\": null,\n          \"type\": \"fiscal\",\n          \"user_id\": 1\n         }, ..... ],\n      \"warnings\": []\n  },\n  \"status\": \"success\",\n  \"type\": \"get_all_devices\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>403 Invalide data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Invalide data:",
          "content": "HTTP/1.1 403 Forbidden\n{\n user_does_not_exist\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -X POST \\\n  http://localhost:3000/api/v1/device/list \\\n -H 'Content-Type: application/json' \\\n -H 'Postman-Token: 5e239a02-e29e-403c-8851-725f31561dc3' \\\n -H 'cache-control: no-cache' \\\n -d '{\n     \"type\": \"get_all_devices\",\n     \"operation\": \"system\",\n     \"auth\": {\n      \"user\": \"elvis\",\n      \"token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyIjoiZWx2aXMiLCJleHAiOjE1NTI0MzYwODF9.eB9eJHf_FkdoJPvc2j8S4dkU2Vcp--XcXzKQkdc2LTxOa9lmYPMHcrZIEHVIarABaKW6DlrMpEPpt0RYEf86hRD684LcgQgC_bevkg3Wh2HSOTlI4SQT1JeFENsexfubBpMI1giUA7Gk3DvQruoHlDeX-YskpgDqVBju-EBFUIFhcBoBwNTFzV3xRQunQW6lEU7FbO3SzECreBbWfJ_MEAf2DAErrY474Bo8YgfHuNy6KU97L9Zb3H3ZY7S8cPMkOuarZGfn5I4xRargeYfr7_AIG-NSPAbLo4W8LY0UmPvNM8wjJ43xEEaNsC0-ItemXMaFpxkMQJtnq1uMIKHAzw\"\n     }\n    }'",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "./controller/device.js",
    "groupTitle": "Device"
  },
  {
    "type": "post",
    "url": "/api/v1/device/status",
    "title": "Status Device",
    "name": "Status_Device",
    "group": "Device",
    "permission": [
      {
        "name": "Authorized user only"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status Response.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "operation",
            "description": "<p>Type Operation.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Response type.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Response message or errors.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{ \n  \"operation\": \"system\",\n  \"response\": {\n      \"errors\": [],\n      \"message\": [\n         {\n          \"active\": false,\n          \"data\": \"{\\\"sequence\\\":33}\",\n          \"firmware_version\": null,\n          \"id\": 9,\n          \"manufacture\": \"datecs\",\n          \"model\": \"fp-60kl\",\n          \"returned_response\": false,\n          \"serial_number\": \"dt1\",\n          \"state\": null,\n          \"type\": \"fiscal\",\n          \"user_id\": 1\n         }, ..... ],\n      \"warnings\": []\n  },\n  \"status\": \"success\",\n  \"type\": \"get_all_devices\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>403 Invalide data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Invalide data:",
          "content": "HTTP/1.1 403 Forbidden\n{\n user_does_not_exist\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -X POST \\\n  http://localhost:3000/api/v1/device/list \\\n -H 'Content-Type: application/json' \\\n -H 'Postman-Token: 5e239a02-e29e-403c-8851-725f31561dc3' \\\n -H 'cache-control: no-cache' \\\n -d '{\n     \"type\": \"get_all_devices\",\n     \"operation\": \"system\",\n     \"auth\": {\n      \"user\": \"elvis\",\n      \"token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyIjoiZWx2aXMiLCJleHAiOjE1NTI0MzYwODF9.eB9eJHf_FkdoJPvc2j8S4dkU2Vcp--XcXzKQkdc2LTxOa9lmYPMHcrZIEHVIarABaKW6DlrMpEPpt0RYEf86hRD684LcgQgC_bevkg3Wh2HSOTlI4SQT1JeFENsexfubBpMI1giUA7Gk3DvQruoHlDeX-YskpgDqVBju-EBFUIFhcBoBwNTFzV3xRQunQW6lEU7FbO3SzECreBbWfJ_MEAf2DAErrY474Bo8YgfHuNy6KU97L9Zb3H3ZY7S8cPMkOuarZGfn5I4xRargeYfr7_AIG-NSPAbLo4W8LY0UmPvNM8wjJ43xEEaNsC0-ItemXMaFpxkMQJtnq1uMIKHAzw\"\n     }\n    }'",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "./controller/device.js",
    "groupTitle": "Device"
  },
  {
    "type": "post",
    "url": "/api/v1/item/add",
    "title": "Add Item",
    "name": "Add_Item",
    "group": "Item",
    "permission": [
      {
        "name": "Authorized user only"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status Response.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message for Response.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "error",
            "description": "<p>Response errors.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"status\": \"ok\",\n \"message\": \"ASxFa1AEgKCAgISCBTA0N\",\n \"error\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>403 Invalide data.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Invalide data:",
          "content": "HTTP/1.1 403 Forbidden\n{\n \"operation\": \"build_command\",\n \"response\": {\n   \"errors\": [],\n   \"message\": \"no such device id\",\n   \"warnings\": []\n  },\n \"status\": \"failed\",\n \"type\": \"add_item\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "   curl -X POST \\\nhttp://localhost:3000/api/v1/item/add \\\n-H 'Content-Type: application/json' \\\n-H 'Postman-Token: 9b35233c-1158-4949-a330-3fc0ed0bc6c8' \\\n-H 'cache-control: no-cache' \\\n-d '{\n    \"type\": \"add_item\",\n    \"operation\": \"build_command\",\n    \"auth\": {\n      \"user\": \"elvis\",\n      \"token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyIjoiZWx2aXMiLCJleHAiOjE1NTI0MzYwODF9.eB9eJHf_FkdoJPvc2j8S4dkU2Vcp--XcXzKQkdc2LTxOa9lmYPMHcrZIEHVIarABaKW6DlrMpEPpt0RYEf86hRD684LcgQgC_bevkg3Wh2HSOTlI4SQT1JeFENsexfubBpMI1giUA7Gk3DvQruoHlDeX-YskpgDqVBju-EBFUIFhcBoBwNTFzV3xRQunQW6lEU7FbO3SzECreBbWfJ_MEAf2DAErrY474Bo8YgfHuNy6KU97L9Zb3H3ZY7S8cPMkOuarZGfn5I4xRargeYfr7_AIG-NSPAbLo4W8LY0UmPvNM8wjJ43xEEaNsC0-ItemXMaFpxkMQJtnq1uMIKHAzw\"\n    },\n    \"data\": {\n      \"item_data\": {\n        \"group\": \"1\",\n        \"name\": \"test_item_name\",\n        \"number\": \"1\",\n        \"quantity\": \"1\",\n        \"price\": \"1.00\",\n        \"tax_group\": \"Б\"\n       },\n       \"device\": {\n         \"id\": \"363\"\n       }\n     }\n   }'",
        "type": "curl"
      }
    ],
    "version": "0.0.0",
    "filename": "./controller/item.js",
    "groupTitle": "Item"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./apidoc/main.js",
    "group": "_home_sonyft_project_JSapp_quanterall_payment_system_wrapper_apidoc_main_js",
    "groupTitle": "_home_sonyft_project_JSapp_quanterall_payment_system_wrapper_apidoc_main_js",
    "name": ""
  }
] });
