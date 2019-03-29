const express = require('express');
const app = express();

var bodyParser = require('body-parser')

const auth = require('./routes/auth');
const device = require('./routes/device');
const item = require('./routes/item');
const receipt = require('./routes/receipt');
const operator = require('./routes/operator');

const morgan = require('morgan');

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());



app.use(express.json());
// app.use(logger('dev'));

app.use(morgan('dev'));
app.use('/api/v1/auth', auth);
app.use('/api/v1/device', device);
app.use('/api/v1/item', item);
app.use('/api/v1/receipt', receipt);
app.use('/api/v1/operator', operator);

app.use((error, req, res , next) => {  
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
})

// PORT
const port = process.env.PORT || 3000;
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`listening on port ${port}...`);
})
// server.keepAliveTimeout
server.timeout = 1000000;