const express = require('express');
const app = express();
// import {login} from 'qps/qps.js'

let qpsPath = `${process.cwd()}/qps/qps`
const qps = require(qpsPath)
console.log(qps)


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/login', (req, res) => {
  const data = {
      operation: "auth",
      type : "login",
      data : {
        user: "test_user",
        password : "test_password"
      }
    } 
  const alt = qps.login(data)
  console.log(alt)
  res.send(alt);
});

app.get('/api/courses/:id', (req, res) => {
  // get route params
  res.send(req.params);
})

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
})