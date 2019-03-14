
const fs = require('fs');
fs.createReadStream('.config')
  .pipe(fs.createWriteStream('.env'));