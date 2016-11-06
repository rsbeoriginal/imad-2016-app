<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Material Design</title>

    <!-- Bootstrap -->
    <link href="/ui/blog/css/bootstrap.min.css" rel="stylesheet">
    <link href="/ui/blog/css/style.css" rel="stylesheet">
    
  </head>
  <body>
      <script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
    <!--Navigation Bar-->
    <div class="navbar navbar-static-top bs-docs-nav shadow" style="background-color:red;border-radius: 5px;width:100%; height:7.5%; padding:0.5%; position:fixed">
  		<div class="row">
            <div>
                <div style="margin-left:45%" class="col-md-1 center "><h3><strong>Blog</strong></h3></div>
                <!-- Single button -->
                    <div class="col-md-1 right btn-group" style=" margin-right:5%">
                      <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Log in <span class="caret"></span>
                      </button>
                      <ul class="dropdown-menu">
                        <li><input type="text" class="form-control" placeholder="Username "></li>
                        <li><input type="password" class="form-control" placeholder="Password" ></li>
                        <li><button class="btn btn-success"><strong>Sign in</strong></button></li>
                        <li role="separator" class="divider"></li>
                        <li><small>Don't have an account?</small><br>
                            <a href="/blog/sign-up">Sign up</a></li>
                      </ul>
                    </div>
            </div>
        </div>
  	</div>
      <br><br>
  	<div class="row" >
  		<div id="col-left" class="margin-top-bottom left" style="margin-left:20%">            
            <div class="margin-top-bottom white shadow" style="border-radius:4px;padding:1%">
                <h3><strong>Sign Up</strong></h3>
                <p><h4><small>Sign up to access premium features.</small></h4></p>
            </div>     
            <!--Comment Section -->
                <!-- Write a Comment Section-->
            <div class="margin-top-bottom white shadow" style="padding:2%">         
                <label><h4 class="page-header" style="margin:2%">Enter the required details</h4></label>
                <div class="input-group" style="padding:1%;background-color:#f3f3f3">
                    <input id="txt_username" type="text" class="form-control" placeholder="Username " style="height:48px" >
                    <input id="txt_full_name" type="text" class="form-control" placeholder="Full Name" style="height:48px" >
                    <input id="txt_password" type="password" class="form-control" placeholder="Password" style="height:48px" >
                    <button id="bt-sign-up" class="btn btn-success right margin-right-left" style="margin:4%"><strong>Sign up</strong></button>
                </div>
                
                
            </div>
            
        </div> 
    </div>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
      <script src="http://getbootstrap.com/dist/js/bootstrap.min.js"></script>
      <script>
                    $(document).ready(function() {
                        $("#bt-sign-up").click(function(){
                        //$('#bt-sign-up').attr("disabled");
                        
                            $.ajax({
                              url:"/create-user",
                              type:"POST",
                              headers: { 
                                "Content-Type": "application/x-www-form-urlencoded"
                              },
                              data:
                              {
                                username: document.getElementById('txt_username').value,
                                password: document.getElementById('txt_password').value,
                                full_name: document.getElementById('txt_full_name').value ,
                            
                            },
                              dataType:"json",
                              success: function(data) {
                                  console.log('user created');
                               // $('#bt-sign-up').removeAttr("disabled"); 
                                alert('User created successfully');
                                window.location.href = "/blog";
                            },
                            });  
                        });  
                    });
                </script>
                
  </body>
</html>