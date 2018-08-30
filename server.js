
const express = require('express');
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3000;

const parseDateString = (dateString) => {
  const parsedNumber = Number(dateString);
  const parsedDateString = new Date(dateString);
  const tryToParseDataNumber = new Date(parsedNumber);
  if (
    (parsedDateString.toString() === "Invalid Date") &&
    (tryToParseDataNumber.toString() === "Invalid Date")
  ) {
    return { error: "Invalid Date" };
  } else if (parsedDateString.toString() !== "Invalid Date") {
    return { unix: parsedDateString.getTime(), utc: parsedDateString.toUTCString() }; 
  } else if (Number.isInteger(parsedNumber)) {
    return { unix: tryToParseDataNumber.getTime(), utc: tryToParseDataNumber.toUTCString() };
  }
  return { error: "Invalid Date" };
};

app.get('/', (req, res) =>  res.sendFile(path.join(__dirname + '/public/index.html')));

app.get('/api/timestamp/:date_string', (req, res) => {
    const { date_string } = req.params // Descontrução de objetos, estude!
    // Equivalente a const date_string = req.params.date_string
    return res.json(parseDateString(date_string)) // Estude!!!!!!!
});

app.listen(PORT, () => console.log('Example app listening on port 3000!'));
