var generate = require("../index").CorrelationMatrix;


process.on('message', function (json) {
  delete json.hash;
  delete json.isDataSource;
  delete json.id;

  process.send(generate(json.data));
  // process.send(json.data)
  process.exit(0);
});
