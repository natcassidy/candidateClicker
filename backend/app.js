// app.js
var deployd = require('deployd')
  , options = {port: 80};

var dpd = deployd(options);

dpd.listen();