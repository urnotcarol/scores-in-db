var express = require('express');
var mysql = require('mysql');
var hbs = require('hbs');
var app = express();

var serializeEntries = require('./public/serialize-entries.js');
var sortScore = require('./public/sort-score.js');
app.use(express.static('public/'));
app.use(express.static('bower_components/'));


app.set('view engine', 'html');
app.engine('html', hbs.__express);

var connection;
app.get('*', function(req, res, next) {
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
    res.render('index', {
      entries: serializeEntries(rows)
    });
    connection.end();
  });
});

app.get('/sort-score', function(req, res) {
  connection.query('select * from student_info, scores, courses where student_info.student_id=scores.student_id and scores.course_id=courses.course_id;', function(err, rows) {
    res.send(sortScore(serializeEntries(rows), req.query.sk, req.query.so));
    connection.end();
  });
});

app.get('/delete-item', function(req, res) {
  connection.query('delete from scores where student_id=' + req.query.sid, function(err, rows) {
    if (err) {
      throw err;
    } else {
      res.send({
        status: 200,
        message: {},
        data: {}
      });
    }
    connection.end();
  });
});

var server = app.listen(3000, function() {
  console.log("haha");
});
