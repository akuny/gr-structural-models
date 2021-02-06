const path = require('path');
const express = require('express');
const app = express();
const port = 4000;
const public = path.join(__dirname, 'public');

app.use(express.static(public));

app.get('/', (req, res) => {
  return res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.listen(port, () => {
  console.log(`gr structural models up and running at http://localhost:${port}`)
});
