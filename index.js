var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var server = express();
var $http = require('axios');

var port = process.env.PORT || 8080;
var apiKey = require('./config').apiKey; //allows to not expose key
var baseUrl = 'https://api.forecast.io/forecast/';

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(cors());

server.get('/forecast/hourly/:lat,:lon', function(req, res){
  $http.get(baseUrl + apiKey + '/' + req.params.lat+ ',' + req.params.lon)
    .then(function(response){
      var resObj = {
        latitude: response.data.latitude,
        longitude: response.data.longitude,
        hourly: response.data.hourly,

      };
      res.status(200).json(resObj);
    })
    .catch(function(error){
    res.status(500).json({
        msg: error
    });
  });
});

server.get('/forecast/minutely/:lat,:lon', function(req, res){
  $http.get(baseUrl + apiKey + '/' + req.params.lat+ ',' + req.params.lon)
    .then(function(response){
      var resObj = {
        latitude: response.data.latitude,
        longitude: response.data.longitude,
        minutely: response.data.minutely,

      };
      res.status(200).json(resObj);
    })
    .catch(function(error){
    res.status(500).json({
        msg: error
    });
  });
});


server.listen(port, function(){
  console.log('Now running on port...' , port);
});
