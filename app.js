var express = require('express');
var app = express();
var scores = require('./public/scores.js');
var sortScore = require('./public/sort-score.js');

app.use(express.static('public/'));
app.use(express.static('bower_components/'));

var hbs = require('hbs');
app.set('view engine', 'html');
app.engine('html', hbs.__express);

app.get('/', function(req, res) {
  res.render('index', {entries: scores.getAllEntries()});
});

app.get('/scores', function(req, res) {
  var sortedArr = sortScore(scores.getAllEntries(), req.query.sk, req.query.so);
  res.send(sortedArr);
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var post = server.address().port;
  console.log('app listening at http://%s:%s',host, post);
});
