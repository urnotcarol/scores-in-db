var express = require('express');
var mysql = require('mysql');
var hbs = require('hbs');
var app = express();

var serializeEntries = require('./public/serialize-entries.js');
app.use(express.static('public/'));
app.use(express.static('bower_components/'));


app.set('view engine', 'html');
app.engine('html', hbs.__express);

var connection;
app.get('*', function(res, req, next) {
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shmilyico',
    database: 'students'
  });
  connection.connect(function(err) {
    next();
  });
});

app.get('/', function(req, res) {
  connection.query('select * from student_info, scores, courses where student_info.student_id=scores.student_id and scores.course_id=courses.course_id;', function(err, rows) {
  res.render('index', {entries: serializeEntries(rows)});
  connection.end();
  });
});

var server = app.listen(3000, function() {
  console.log("haha");
});
