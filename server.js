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


function createTemplate (data) {
    var title = data.title;
    var body = data.body;
    var likes = data.likes;
    var dislikes =data.dislikes;
    
    
    var htmlTemplate = `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Material Design</title>

    <!-- Bootstrap -->
    <link href="../ui/blog/css/bootstrap.min.css" rel="stylesheet">
    <link href="/ui/blog/css/style.css" rel="stylesheet">
  </head>
  <body>
      
    <!--Navigation Bar-->
    <div class="navbar navbar-static-top bs-docs-nav shadow" style="background-color:red;border-radius: 5px;width:100%; height:7.5%; padding:0.5%; position:fixed">
  		<div class="row">
            <div>
                <h3 style="margin:0.75%;margin-left:45%"><strong>Blog</strong></h3>
            </div>
        </div>
  	</div>
      <br><br>
  	<div class="row" >
  		<div id="col-left" class="margin-top-bottom left" style="margin-left:20%">            
            <div class="margin-top-bottom white shadow list-group-item" style="border-radius:4px;padding:1%">
                    <h3><strong>`+title+`</strong></h3>
                    <p><h4><small>`+body+` </small></h4></p>
                    <div><h5><small>`+likes+` Likes | `+dislikes+` Dislikes</small></h5>
                    </div>
            </div>
            <!--Comment Section -->
                <!-- Write a Comment Section-->
            <div class="margin-top-bottom white shadow" style="padding:2%">         
                <label><h4 class="page-header" style="margin:2%">Comments</h4></label>
                <div class="input-group" style="padding:1%;background-color:#f3f3f3">
                    <span class="input-group-addon" >
                        <img src="res/list_item.jpg" class="left" style="width:48px;height:48px;border-radius:50%;">
                    </span>
                    <input type="text" class="form-control" placeholder="Write a comment . . . " style="height:48px" >
                </div>
                <!--Comments by users -->
                <ul id="list-comment" class="list-group">
                    <div class="list-group-item white row" style="margin:3%;background-color:#f2f2f2;border-radius:5px">
                        <div class="col-md-1">
                            <img src="res/list_item.jpg" class="left" style="width:48px;height:48px;border-radius:50%">
                        </div>
                        <div class="col-md-5" style="margin-left:1%">
                            <h5><strong>Rishi Sharma</strong></h4>
                            <h4><small>This is comment.This is comment.</small></h4>
                        </div>
                    </div>
                </ul>
            </div>
            
        </div>        
  </body>
</html>
    `;
    return htmlTemplate;
}


app.get('/db', function (req, res) {
  pool.query('SELECT * FROM article ,user;',function(err,result){
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

app.get('/blog/article/:id', function (req, res) {
  pool.query("SELECT * FROM article WHERE id = $1", [req.params.id], function (err, result) {
    if (err) {
        res.status(500).send(err.toString());
    } else {
        if (result.rows.length === 0) {
            res.status(404).send('Article not found');
        } else {
            var articleData = result.rows[0];
            res.send(createTemplate(articleData));
        }
    }
  });
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
