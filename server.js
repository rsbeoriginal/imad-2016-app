var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var app = express();
app.use(morgan('combined'));

var config = {
  host: 'db.imad.hasura-app.io',
  user: 'rsbeoriginal',
  port: '5432',
  password: 'db-rsbeoriginal-951',
  database: 'rsbeoriginal',
};

var pool = new Pool(config);

app.get('/db', function (req, res) {
  pool.query('SELECT * FROM article',function(err,result){
      if(err){
          res.status(500).send(err.toString());
      }else{
        res.send(JSON.stringify(result.rows));   
      }
  });
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/blog', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/blog', 'index.html'));
});

app.get('/ui/blog/css/bootstrap.min.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/blog/css', 'bootstrap.min.css'));
});

app.get('/ui/blog/css/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/blog/css', 'style.css'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
