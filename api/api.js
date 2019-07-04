// TEAMS
function getMyTeams(apiName){
   
    var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      getMyTeamsFunction(this)
    }
  };
  xhttp.open("GET", 'http://localhost:8181/'+apiName, true);
  xhttp.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
  xhttp.send();
}


function getNonMembers(apiName,teamId){
   
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    
      getNonMembersFunction(this,teamId)
    }
  };
  xhttp.open("GET", 'http://localhost:8181/'+apiName, true);
  xhttp.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
  xhttp.send();
}

function postAddMembers(apiName,teamId,idArray,nameArray){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      
      postAddMembersFunction(this,teamId,idArray,nameArray)
    
    }
  };

  xhttp.open("POST", "http://localhost:8181/"+apiName, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
  xhttp.send(JSON.stringify({'empIds':idArray}));  
}

function postDeleteMembers(apiName,teamId,empId){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      
      deleteMemberFunction(this,teamId,empId)
    
    }
  };

  xhttp.open("POST", "http://localhost:8181/"+apiName, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
  xhttp.send(JSON.stringify({'empId':empId}));  
}

// TEAMS OVER

// MEETINGS
function getMyMeetings(apiName){
   
  var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
      console.log(JSON.parse(xhttp.responseText))
    getMyMeetingsFunction(this)
  }
};
xhttp.open("GET", 'http://localhost:8181/'+apiName, true);
xhttp.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
xhttp.send();
}

function getAllEvents(apiName){
   
  var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
      console.log(JSON.parse(xhttp.responseText))
      getAllEventsFunction(this)
  }
};
xhttp.open("GET", 'http://localhost:8181/'+apiName, true);
xhttp.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
xhttp.send();
}

// function getAllUsers(apiName){
   
//   var xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function() {
//   if (this.readyState == 4 && this.status == 200) {
//       // console.log(JSON.parse(xhttp.responseText))
//       // let meet=new meetingModal();
//       // meet.prototype.nonmembers=xhttp.responseText
//       getAllUsersFunction(this)
//   }
// };
// xhttp.open("GET", 'http://localhost:8181/'+apiName, true);
// // xhttp.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
// xhttp.send();
// }