// document.getElementById("toHome").addEventListener("click", function(){
//     var value1=document.getElementById('token').innerHTML;
// var value2="value2";
// var queryString = "?para1=" + value1 + "&para2=" + value2;
// window.location.href = "home/home.html" + queryString;
// });
document.getElementById("loginBtn").addEventListener("click", function(e){
  e.preventDefault()
  var loginUrl = "http://localhost:8181/login"
    var xhr = new XMLHttpRequest();
    var userElement = document.getElementById('email').value;
    var passwordElement = document.getElementById('password').value;
    // var tokenElement = document.getElementById('token');
    // var user = userElement.value;
    // var password = passwordElement.value;
  
    xhr.open('POST', loginUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.addEventListener('load', function() {
      var responseObject = JSON.parse(this.response);
      console.log(responseObject);
      if (responseObject.accessToken) {
        // tokenElement.innerHTML = responseObject.accessToken;
        // localStorage.setItem("token",JSON.stringify(responseObject))
        sessionStorage.setItem("token",responseObject.accessToken)
        if(responseObject.isAdmin){
          sessionStorage.setItem("isAdmin",responseObject.isAdmin)
          console.log(responseObject.isAdmin)
        }
        console.log(responseObject.accessToken)
        window.location.href = "home/home.html";
      } else {
        // tokenElement.innerHTML = "No token received";
        alert("Enter correct login credentials")
      }
    });
  
    var sendObject = JSON.stringify({username: userElement, password: passwordElement});
  
    console.log('going to send', sendObject);
  
    xhr.send(sendObject);
})


 console.log(sessionStorage.getItem("token"))

  // make the request to the secret API endpoint
// function getSecret() {

//     var url = "http://localhost:3000/secret"
//     var xhr = new XMLHttpRequest();
//     var tokenElement = document.getElementById('token');
//     var resultElement = document.getElementById('result');
//     xhr.open('GET', url, true);
//     xhr.setRequestHeader("Authorization", "JWT " + tokenElement.innerHTML);
//     xhr.addEventListener('load', function() {
//       var responseObject = JSON.parse(this.response);
//       console.log(responseObject);
//       resultElement.innerHTML = this.responseText;
//     });
  
//     xhr.send(null);
//   }