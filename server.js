
const express = require('express');
const app = express();
const path = require("path");

app.use(express.static(__dirname + '/public'));

const PORT = process.env.PORT || 3000;

const parseDateString = (dateString) => {
  const parsedNumber = Number(dateString);
  const parsedDateString = new Date(dateString);
  const tryToParseDataNumber = new Date(parsedNumber);
  var event = new Date(); 
  if(
    (parsedDateString.toString() === "Invalid Date") &&
    (tryToParseDataNumber.toString() === "Invalid Date")
  ) {
    if(isNaN(Number(dateString))){
      return { unix: Date.now(), utc: event.toUTCString() };
    } 
    return { error: "Invalid Date" };
  }
  else if (Number(dateString) === 0) { //Se não houver URL parameter
    return { unix: Date.now(), utc: tryToParseDataNumber.toUTCString() };
  }
  else if (parsedDateString.toString() !== "Invalid Date") {
    return { unix: parsedDateString.getTime(), utc: parsedDateString.toUTCString() }; 
  } 
  else if (Number.isInteger(parsedNumber)) {
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

app.get('/api/timestamp/', (req, res) => {
  const { date_string } = req.params 
  return res.json(parseDateString(date_string))
  //Como ele não tem um URL parameter, deve-se pôr uma função que dê a data diretamente.
  //Ou tentar criar uma exceção na função.
});

app.use(function(req, res) {
  res.send('404: Page not Found', 404);
});

app.listen(PORT, () => console.log('Example app listening on port 3000!'));
