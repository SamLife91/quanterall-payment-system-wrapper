const express = require('express');
const app = express();
/// module paths
const qpsPath = `${process.cwd()}/qps/qps`
const qps = require(qpsPath)

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/login', async (req, res) => {
  const body = {
        type: "login",
        operation: "auth",
        data: {
          user: "elvis",
          password: "elvis"
        }
  }  
  const result = await qps.login(JSON.stringify(body))
  console.log(result)
  res.send(result);
});

app.post('/register', async (req, res) => {
  const body = {
    type: 'register',
    operation: 'auth',
    data: {
      user: 'arslan',
      password: 'arslan_password',
      mail: 'arslan@mail.arslan',
      first_name: 'arslan',
      last_name: 'arslan'
    }
  }
  const result = await qps.register(JSON.stringify(body))
  res.send(result);
});

app.post('/device/add', async (req, res) => {
  const body = {
    type: 'add_device',
    operation: 'system',
    auth: {
      user: 'elvis',
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyIjoiZWx2aXMiLCJleHAiOjE1NTE0MDI3NDZ9.AuKKWZ0z8qA8qSUIccw1lDHS-glR8_T7Rnhnpotys1vOFqkMXxeOlDDv4oVhHCnUT_PbGZ-sIxvNdEhMteN7BZUYaZ8tpW60VC_isUeokzp2E5pReByM2ytstAaKPcxkcHT8q1ZkQFaokWtaKs1QFgRtpsB4ykdNO3hqML9wEjAN9ZWGrgHNeADAv3t-CKWQ7FfXy6ryMRwOO5KbJ7DTJWrGeG42GYhYcMe86gU5XfeSqaf4NDdRyGujao4jWclY7KskvfEOhjR0HOiiR4iBVIemIqwamZyvuIij7qofxG7usCyy1w3MFCKsxdR7w0EwikZ0TDAuUWP2GhEeLMq6Mg'
    },
    data: {
      type: 'fiscal',
      manufacture: 'datecs',
      model: 'fp-60kl',
      serial_number: 'dt2742k873' 
    }
  }
  const result = await qps.add_device(JSON.stringify(body))
  res.send(result)
})

app.post('/device', async (req, res) => {
  const body = {
    type: 'get_all_devices',
    operation: 'system',
    auth: {
      user: 'elvis',
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyIjoiZWx2aXMiLCJleHAiOjE1NTE0MDI3NDZ9.AuKKWZ0z8qA8qSUIccw1lDHS-glR8_T7Rnhnpotys1vOFqkMXxeOlDDv4oVhHCnUT_PbGZ-sIxvNdEhMteN7BZUYaZ8tpW60VC_isUeokzp2E5pReByM2ytstAaKPcxkcHT8q1ZkQFaokWtaKs1QFgRtpsB4ykdNO3hqML9wEjAN9ZWGrgHNeADAv3t-CKWQ7FfXy6ryMRwOO5KbJ7DTJWrGeG42GYhYcMe86gU5XfeSqaf4NDdRyGujao4jWclY7KskvfEOhjR0HOiiR4iBVIemIqwamZyvuIij7qofxG7usCyy1w3MFCKsxdR7w0EwikZ0TDAuUWP2GhEeLMq6Mg'
    }
  }

  const result = await qps.add_device(JSON.stringify(body))
  res.send(result)
})

app.post('/api/courses', (req, res) => {
  // get route params
  // console.log(req)
  console.log(req.body)
  res.send(req.body);
})

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
})