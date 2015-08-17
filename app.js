var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var app = express();

var serializeEntries = require('./public/serialize-entries.js');
var sortScore = require('./public/sort-score.js');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public/'));
app.use(express.static('bower_components/'));


app.set('view engine', 'html');
app.engine('html', hbs.__express);

var connection;
app.all('*', function(req, res, next) {
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

app.delete('/delete-item', function(req, res, fields) {
  connection.query('delete from scores where student_id=' + req.body.sid, function(err, result) {
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

app.post('/append-item', function(req, res) {
  var currStudentId;
  var insertNameSQL = 'insert into student_info (name) values ( "' + req.body.sname + '");';
  connection.query(insertNameSQL, function(err, rows) {
    if (err) {
      throw err;
    } else {
      currStudentId = rows.insertId;
      var insertScoreSQL = "insert into scores values (''," + currStudentId + ", 1, " + req.body.schinese + ")," +
        "(''," + currStudentId + ", 2, " + req.body.smath + ")," +
        "(''," + currStudentId + ", 3, " + req.body.senglish + ");";
      connection.query(insertScoreSQL,
        function(err, rows) {
          if (err) {
            throw err;
          } else {
            res.send({
              status: 200,
              message: {},
              data: {
                sid: currStudentId
              }
            });
          }
        }
      );
    }
    connection.end();
  });
});

var server = app.listen(3000, function() {
  console.log("listen at http://localhost/3000");
});
