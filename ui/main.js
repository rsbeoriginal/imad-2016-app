console.log('Loaded!');
function loadLoginForm () {
    // var loginHtml = `
    //     <h3>Login/Register to unlock awesome features</h3>
    //     <input type="text" id="username" placeholder="username" />
    //     <input type="password" id="password" />
    //     <br/><br/>
    //     <input type="submit" id="login_btn" value="Login" />
    //     <input type="submit" id="register_btn" value="Register" />
    //     `;
    // document.getElementById('login_area').innerHTML = loginHtml;
    
    // Submit username/password to login
    var submit = document.getElementById('bt_login');
    submit.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  submit.value = 'Sucess!';
              } else if (request.status === 403) {
                  submit.value = 'Invalid credentials. Try again?';
              } else if (request.status === 500) {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              } else {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              }
              //loadLogin();
          }  
          // Not done yet
          // Make the request
        var username = document.getElementById('txt_username').value;
        var password = document.getElementById('txt_password').value;
        console.log(username);
        console.log(password);
        request.open('POST', '/login', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        submit.value = 'Logging in...';
        };
        
        
        
    };
    
loadLoginForm ();