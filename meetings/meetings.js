const weekday=new Array(7);
weekday[1]="Monday";
weekday[2]="Tuesday";
weekday[3]="Wednesday";
weekday[4]="Thursday";
weekday[5]="Friday";
weekday[6]="Saturday";
weekday[0]="Sunday";
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
$(function(){
    $("#included-navbar").load("../navbar/navbar.html");
    
    $('#meetings').css('text-decoration', 'underline');
    // $('#meetings').css('color', 'black');
});

var myMeetings=[];

function getMyMeetingsFunction(xhttp){
    myMeetings=JSON.parse(xhttp.responseText)
    console.log(myMeetings)
    var calendarEl = document.getElementById('calendar');
    calendarEl.innerHTML="";
    var calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: [ 'dayGrid', 'timeGrid', 'list','interaction' ],
      // timeZone: 'UTC',
      // events:  {url: "http://localhost:8181/api/events/my/past"},
      eventRender: function(info) {
        info.el.style.cursor = 'pointer';
        var tooltip = new Tooltip(info.el, {
          title: info.event.extendedProps.description,
          placement: 'top',
          trigger: 'hover',
          container: 'body'
        });
      },
      eventClick: function(info) {
        console.log("INFO .................... ID")
        console.log(info.event.id)
        // console.log(info.description)
        document.getElementById("loader").style.display="block";
        console.log(info.event.start)
        var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log("xhttp")
          var x = new XMLHttpRequest();
          x.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              console.log("x")
              var xh = new XMLHttpRequest();
              xh.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  console.log("xh")
                  var xht = new XMLHttpRequest();
                  xht.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        console.log("xht")
                        console.log(JSON.parse(xht.responseText))
                        document.getElementById("loader").style.display="none";
                        let meetingmodal=new meetingModal(false,true,false,myMeetings,JSON.parse(xht.responseText),info.event.start,info.event.end,info.event.id,JSON.parse(xhttp.responseText),JSON.parse(x.responseText),JSON.parse(xh.responseText),info.event.id)
                        meetingmodal.move();
                    }
                  };
                  xht.open("GET", 'http://localhost:8181/api/events', true);
                  xht.setRequestHeader("Content-type", "application/json");
                  xht.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
                  xht.send();
                }
              };
              xh.open("GET", 'http://localhost:8181/api/rooms', true);
              xh.setRequestHeader("Content-type", "application/json");
              xh.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
              xh.send();
            }
          };
          x.open("GET", 'http://localhost:8181/api/teams', true);
          x.setRequestHeader("Content-type", "application/json");
          x.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
          x.send();
            
        }
      };
      xhttp.open("GET", 'http://localhost:8181/api/users', true);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
      xhttp.send();
        
        
      },
    
      aspectRatio: 2,
      eventBackgroundColor : "#63b0c5",
      
      
      header:
      {  
        left: 'prev,next,today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,listWeek'
      },
      defaultView: "timeGridWeek",
     
      
      nowIndicator:true,
      
      eventTextColor: '#ffffff',
     
     
    });
    calendar.render();
    if(calendar.getEventSources()[0]){
                        
      calendar.getEventSources()[0].remove()  
      calendar.addEventSource(myMeetings)
    }
    else{
      calendar.addEventSource(myMeetings)
    }
    // var xht = new XMLHttpRequest();
    // xht.onreadystatechange = function() {
    //   if (this.readyState == 4 && this.status == 200) {
                        
    //     if(calendar.getEventSources()[0]){
                        
    //       calendar.getEventSources()[0].remove()  
    //       calendar.addEventSource(JSON.parse(xht.responseText))
    //     }
    //     else{
    //       calendar.addEventSource(JSON.parse(xht.responseText))
    //     }
    //   }
    //   if(this.readyState == 4 && this.status == 404){

    //   }
    // };
    // xht.open("GET", 'http://localhost:8181/api/events/my', true);
    // xht.setRequestHeader("Content-type", "application/json");
    // xht.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
    // xht.send();
    $('.fc-header.toolbar').css("margin-bottom","0px");
    window.editMeeting = function(roomname,eventId){
      // var calendar = document.getElementById('calendar');
      // var calendar = new FullCalendar.Calendar(calendarEl)
      document.getElementById("loader").style.display="block";
      console.log("hello")
      console.log(roomname)
      console.log(eventId)
      var title=document.getElementById("title-field").value;
      var agenda=document.getElementById("agenda-field").value;
      let start_datetime = document.getElementById("update-start-time").value;
      let start_date=start_datetime.replace(" ","T")
      
      let end_datetime = document.getElementById("update-end-time").value;
      let end_date = end_datetime.replace(" ","T")
      if(document.getElementById("edit-room-span").innerHTML){
        var selectedRoom=$('.edit-room').selectpicker('val');
        console.log("selectedRoomddddddddddd "+selectedRoom)
        if(selectedRoom) {
          
        }
        else{
          console.log("error")
          document.getElementById("error-msg").innerHTML="*Select a room";
          return false;
        }
      }
      else{
        var selectedRoom=roomname
      }
      
      
      var selectedMembers=$(".edit-members").children("option:selected");
      var sendselectedMembers=[];
      for(var v=0;v<selectedMembers.length;v++){
          sendselectedMembers.push(selectedMembers[v]['id'])
          console.log(sendselectedMembers)
      }
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          // calendar.getEventById(eventId).remove()
          // // calendar.remove(info.event.id)
          // calendar.addEvent({
          //   title:title,
          //   start:start_date,
          //   end:end_date,
          //   members:sendselectedMembers,
          //   roomName:selectedRoom
          // },calendar.getEventSources()[0])
          // if(calendar.getEventSources()[0]){
          //   console.log(calendar.getEventSources()[0])
            
          //   console.log(calendar.getEvents())
          //   calendar.getEventSources()[0].remove()  
          //   calendar.addEventSource("http://localhost:8181/api/events/my")
            
           
          // }
          // else{
          //   calendar.addEventSource("http://localhost:8181/api/events/my")
            
          // }
          document.getElementById("loader").style.display="none";
          getMyMeetings("events/my")

        }
      };
    
      xhttp.open("PUT", "http://localhost:8181/api/events", true);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
      xhttp.send(JSON.stringify({
        'id':eventId,
        'title':title,
        'agenda':agenda,    
        'start':start_date,
        'end':end_date,
        'members':sendselectedMembers,
        // 'teams':team,
        'roomName':selectedRoom,
        'repeat':"none"
      }));  
      $("#meeting-popup").modal("hide")
      return true;
    };
      
      
    
    $("#booking-form").submit(function(e) {
      e.preventDefault();
    
    });
    window.cancelMeeting=function(id){
      // e.preventDefault();
      document.getElementById("loader").style.display="block";
      $("#meeting-popup").modal("hide")
      
      console.log(id)
      console.log("cancel")
      var xht = new XMLHttpRequest();
      xht.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          
          console.log(id)
          console.log(calendar.getEventById("'"+id+"'"))
          calendar.getEventById(id).remove()
         
          document.getElementById("loader").style.display="none";
          
        }
      };
      xht.open("DELETE", 'http://localhost:8181/api/events', true);
      xht.setRequestHeader("Content-type", "application/json");
      xht.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
      xht.send(JSON.stringify({'eventId':id}));
    }
}

document.addEventListener('DOMContentLoaded', function() {
    getMyMeetings("events/my")
})