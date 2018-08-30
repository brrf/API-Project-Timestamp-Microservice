# API-Project-Timestamp-Microservice
This API shows the time elapsed since your reference, which is January 1, 1970(Unix epoch). 
API picks up the value for url_parameter "date_string" from the route /api/timestamp/:date_string and responds with a json,
which is used in a series of conditionals to verify if is it a valid date or not, after that it is created another json with
the time elapsed in UNIX and UTC format.
