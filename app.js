const express = require('express');
const app = express();

let qpsPath = `${process.cwd()}/qps/qps`
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
  const alt = await qps.login(JSON.stringify(body))
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