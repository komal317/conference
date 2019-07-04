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
  
    var calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: [ 'dayGrid', 'timeGrid', 'list','interaction' ],
      events:  {url: "http://localhost:8181/events/my"},
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
        // console.log(info.description)
        
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
                        let meetingmodal=new meetingModal(false,true,false,myMeetings,JSON.parse(xht.responseText),info.event.start,info.event.end,JSON.parse(xhttp.responseText),JSON.parse(x.responseText),JSON.parse(xh.responseText),info.event.id)
                        meetingmodal.move();
                    }
                  };
                  xht.open("GET", 'http://localhost:8181/events/all', true);
                  xht.send();
                }
              };
              xh.open("GET", 'http://localhost:8181/api/rooms', true);
              xh.send();
            }
          };
          x.open("GET", 'http://localhost:8181/teams/info', true);
          x.send();
            
        }
      };
      xhttp.open("GET", 'http://localhost:8181/users', true);
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
    $('.fc-header.toolbar').css("margin-bottom","0px");
    window.editMeeting = function(roomname,eventId){
      // var calendar = document.getElementById('calendar');
      // var calendar = new FullCalendar.Calendar(calendarEl)
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
          //   end:end_date
          // },calendar.getEventSources()[0])
          if(calendar.getEventSources()[0]){
            console.log(calendar.getEventSources()[0])
            
            console.log(calendar.getEvents())
            calendar.getEventSources()[0].remove()  
            calendar.addEventSource("http://localhost:8181/events/my")
            
           
          }
          else{
            calendar.addEventSource("http://localhost:8181/events/my")
            
          }

        }
      };
    
      xhttp.open("POST", "http://localhost:8181/send", true);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
      xhttp.send(JSON.stringify({
        'title':title,
        'agenda':agenda,    
        'start':start_date,
        'end':end_date,
        'members':sendselectedMembers,
        // 'teams':team,
        'roomName':selectedRoom,
        'repeat':" daily,weekly none"
      }));  
      $("#meeting-popup").modal("hide")
      return true;
    };
      
      
    
    $("#booking-form").submit(function(e) {
      e.preventDefault();
    
    });

}

document.addEventListener('DOMContentLoaded', function() {
    getMyMeetings("/events/my")
})