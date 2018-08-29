
const express = require('express');
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) =>  res.sendFile(path.join(__dirname + '/public/index.html')));

app.get('/api/timestamp/:date_string', (req, res) => res.json({ hello: "world!" }));

app.listen(PORT, () => console.log('Example app listening on port 3000!'));