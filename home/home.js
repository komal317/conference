// CHANGE TOKEN LINE NO. 41
var imported = document.createElement('script');
imported.src = 'meetingModal.js';
document.head.appendChild(imported);

var imported = document.createElement('script');
imported.src = '../api/api.js';
document.head.appendChild(imported);
$(function(){
  $("#included-navbar").load("../navbar/navbar.html"); 
  // console.log(document.getElementById('included-navbar').childNodes.childNodes)
});
$('#rooms-slide').carousel({
  interval: false
});
// $('.active').css('text-decoration', 'underline');
// $('.nav-item').click(function(){
  
//   $('.nav-item').css('text-decoration', 'none') 
//   $(this).css('text-decoration', 'underline');
 
  
// });

$('#start-time').datetimepicker({
  autoclose: true
});
$('#end-time').datetimepicker({autoclose: true});

document.addEventListener('DOMContentLoaded', function() {
  
  var ca = sessionStorage.getItem("token");
  var base64Url = ca.split('.')[1];
  var decodedValue = JSON.parse(window.atob(base64Url));
  sessionStorage.removeItem("userId")
  sessionStorage.setItem("userId",decodedValue['userId'])
  sessionStorage.removeItem("isAdmin")
  sessionStorage.setItem("isAdmin",decodedValue['isAdmin'])
  console.log(sessionStorage.getItem("token"))
  console.log("userid "+sessionStorage.getItem("userId"))
  $(".booking-row").css("pointer-events","none");
  
  var room_id;
  var room_id_send;
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: [ 'dayGrid', 'timeGrid', 'list','interaction' ],
    // events:  {url: "http://localhost:8181/path/Recursion"},
    // timeZone: 'UTC',
    aspectRatio: 2,
    eventBackgroundColor : "#63b0c5",
    
    unselectAuto:false,
    header:
    {  
      left: 'prev,next,today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek'
    },
    defaultView: "timeGridWeek",
    selectable: true,
    eventOverlap:false,
    selectOverlap:false,
    // validRange: function(nowDate) {
    //   return {
    //     start: nowDate,
        
    //   };
    // },
    // slotDuration: '00:15:00',
    nowIndicator:true,
    // minTime:'08:00:00',
    // maxTime:'22:00:00',
    eventTextColor: '#ffffff',
    // weekends:false,
    // hiddenDays: [ 0, 6 ],
    select: function (info) {
      
      // document.getElementById("start-time").value=getDateToDisplay(info.start);
      // document.getElementById("end-time").value=getDateToDisplay(info.end);
     console.log(info.start)
     console.log(info.end)
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var x = new XMLHttpRequest();
          x.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(JSON.parse(x.responseText))
                
                let meetingmodal=new meetingModal(true,false,false,"","",info.start,info.end,"",JSON.parse(xhttp.responseText),JSON.parse(x.responseText),"")
                meetingmodal.move();
            }
            else if(this.readyState == 4 && (this.status == 409 || this.status == 400 || this.status == 500 || this.status == 404)){
              $("#error-popup").modal("show")
            }
          };
          x.open("GET", 'http://localhost:8181/api/teams', true);
          x.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
          x.send();
            
        }
        else if(this.readyState == 4 && (this.status == 409 || this.status == 400 || this.status == 500 || this.status == 404)){
          $("#error-popup").modal("show")
        }
      };
      xhttp.open("GET", 'http://localhost:8181/api/users', true);
      xhttp.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
      xhttp.send();
      
      // var array = calendar.getEvents();
      // console.log(array)
      // for(var i in array){
      //   console.log(array[i]['start'])
      //   console.log(array[i]['end'])
      // }
      // $("#book-me-popup").modal("show")
      // getMyMeetings("/events/my")
      
      
      
    }
  });
  calendar.render();
  
//   $(document).on("click", "span[data-toggle=popover]", function(){
//     $(this).popover({ 
//        placement : 'right',
//        container : 'body',
//        width:'800px',
//        html : true,
//     content: function() {
//        return $('#popover-content').html();
//         }

//     }).click(function(e){
//     e.preventDefault();
//     })

// });
// $('.carousel-control-prev').on("click",function(){
//   $('.badge').popover("hide")
// })
// $('.carousel-control-next').on("click",function(){
//   $('.badge').popover("hide")
// })

  $('.carousel-inner').on("click",'.room-box-badge',function(){
    document.getElementById("loader").style.display="block";
    room_id=this.innerHTML;
    
    room_id_send=this.id.split("-")[1]
    console.log(room_id_send)
    $(".booking-row").css("visibility","visible");
    $(".booking-row").css("overflow","unset");
    $(".booking-row").css("height","fit-content");
    $('.fc-toolbar').css("margin-bottom","0px")
    // $(".booking-row-col").css("display","inline-block");
    $(".booking-row").css("pointer-events","auto");
    $('.badge').css("background-color","white");
    $('.badge').css("color","#63b0c5");
    $('#'+this.id).css("background-color","#184263")
    $('#'+this.id).css("color","white");
    // $('.badge').popover("hide")
    // $('#'+this.id).popover({
    //   placement:'bottom'
    // });
    // $('#'+this.id).popover("show")
    // $('#'+this.id).css("transform","translateY(18px)")
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(JSON.parse(xhttp.responseText))
        if(calendar.getEventSources()[0]){
          console.log(calendar.getEventSources()[0])
          
          console.log(calendar.getEvents())
          calendar.getEventSources()[0].remove()  
          calendar.addEventSource(JSON.parse(xhttp.responseText))
          // getAllEvents("/path/"+this.id)
          window.scrollBy({
            top: 10000,
            behavior: 'smooth'
          });
         
        }
        else{
          calendar.addEventSource(JSON.parse(xhttp.responseText))
          window.scrollBy({
            top: 10000,
            behavior: 'smooth'
          });
        
        
        }
        document.getElementById("loader").style.display="none";
      }
      else if(this.readyState == 4 && (this.status == 409 || this.status == 400 || this.status == 500 || this.status == 404)){
        $("#error-popup").modal("show")
      }
    };
    xhttp.open("GET", 'http://localhost:8181/api/events/all/'+room_id_send  , true);
    xhttp.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
    xhttp.send();
    
    
  });
  
  // $("#meeting-popup").on('hidden.bs.modal', function () {
  //   resetForm();
  // })


  // function resetForm(){
  //   document.getElementById("booking-form").reset();
  //   calendar.unselect();
  //   document.getElementById("error-msg").innerHTML="";
    
  // }
  
  var width_carousel_inner = $('#room-carousel-inner').width();
  setRoomsCarousel(width_carousel_inner);
  
  window.bookMeeting = function(){
    document.getElementById("loader").style.display="block";
    console.log("rooooooooooom"+room_id_send)
  //   $("div.spanner").addClass("show");
  // $("div.overlay").addClass("show");
    var title=document.getElementById("title-field").value;
    var agenda=document.getElementById("agenda-field").value;
    let start_datetime = document.getElementById("update-start-time").value;
    let start_date=start_datetime.replace(" ","T")
    
    let end_datetime = document.getElementById("update-end-time").value;
    let end_date = end_datetime.replace(" ","T")
    
    var radioValue = $("input[name='repeat']:checked").val();
    console.log(radioValue)
      var array = calendar.getEvents();
      // console.log("calendar.getevents")
      // console.log(array)
      for(var i in array){
        var start=new Date(start_datetime);
        var end=new Date(end_datetime);
        var startDate=array[i].start;
        var endDate=array[i].end;
      //   console.log(start_datetime)
      //  console.log(start)
      //  console.log(startDate)
      //  console.log(end)
      //  console.log(endDate)
        var condition1 = (start.getTime()==(startDate.getTime()) && end.getTime()==(endDate.getTime()));
        console.log("condition1 "+condition1)
        var condition2 = (start<(endDate) && end>(endDate));
       
        var condition3 = (start<(startDate) && end>(startDate));
        
        var condition4 = (start>(startDate) && end<(endDate));
        
        if (condition1 || condition2 || condition3 ||  condition4){
        document.getElementById("error-msg").innerHTML="*This slot is booked, try another one";
        document.getElementById("loader").style.display="none";
            return false;
        } 
      }
      var selectedTeams=$(".edit-teams").children("option:selected");
      var sendselectedTeams=[];
      for(var v=0;v<selectedTeams.length;v++){
          sendselectedTeams.push(selectedTeams[v].value)
          console.log("here")
          console.log(sendselectedTeams)
      }
      var selectedMembers=$(".edit-members").children("option:selected");
      var sendselectedMembers=[];
      for(var v=0;v<selectedMembers.length;v++){
          sendselectedMembers.push(selectedMembers[v]['id'])
          console.log(sendselectedMembers)
      }
      if(sendselectedMembers.length==0 && sendselectedTeams.length==0){
        document.getElementById("error-msg").innerHTML="*Select atleast one team or participant";
        document.getElementById("loader").style.display="none";
        return false;
      }
    // let member=[]; let team=[];
    // var e = document.getElementById("memberListElement"); 
    // var eLength=e.children.length
    // for(var i=0;i< eLength;i++){
      
    //   member.push(e.childNodes[i].childNodes[0].childNodes[1].getAttribute("class"))
      
      
    // }
    // e = document.getElementById("teamListElement"); 
    // eLength=e.children.length
    // for(var i=0;i< eLength;i++){
      
    //   team.push(e.childNodes[i].childNodes[0].childNodes[1].getAttribute("class"))
      
    // }
   
      // console.log("start : "+start_datetime)
      // console.log("start : "+start_datetime.split(" ")[1])
      // console.log("start day: "+new Date(start_datetime).getDay())
      // var newd=(new Date(start_datetime)).addMonths(2);
      // var rangeEnd=newd.getFullYear()+"-"+((newd.getMonth()+1)>9?(newd.getMonth()+1):('0'+(newd.getMonth()+1)))+"-"+(newd.getDate()<9?('0'+(newd.getDate())):(newd.getDate()))
      // console.log("start date: "+newd)
      // console.log("end : "+end_datetime)
      // console.log("end : "+end_datetime.split(" ",1))
      // console.log("end day: "+new Date(end_datetime).getDay())
      // console.log("end date: "+(new Date(end_datetime).getMonth() +2))

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        
        console.log(room_id_send)
        console.log("room-"+room_id_send)
        document.getElementById("room-"+room_id_send).click();
        // resetForm();
        document.getElementById("loader").style.display="none";

        // $("div.spanner").removeClass("show");
        // $("div.overlay").removeClass("show");
      }
      else if(this.readyState == 4 && (this.status == 409 || this.status == 400 || this.status == 500 || this.status == 404)){
        $("#error-popup").modal("show")
      }
    };

    xhttp.open("POST", "http://localhost:8181/api/events", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
    xhttp.send(JSON.stringify({
      'title':title,
      'agenda':agenda,    
      'start':start_date,
      'end':end_date,
      'members':sendselectedMembers,
      'teams':sendselectedTeams,
      'roomName':room_id,
      'repeat':radioValue
    }));  
    $("#meeting-popup").modal("hide")
    return true;
  };
    
    
  
  $("#booking-form").submit(function(e) {
    e.preventDefault();
 
  });
  

})

// $('.popover-dismiss').popover({
//   trigger: 'focus'
// });

// function getDateToDisplay(date){
          
//   var n = date.getFullYear() + "-" + (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1) + "-" + (date.getDate() < 10 ? '0' : '') + date.getDate() + " " + (date.getHours() < 10 ? '0' : '') + date.getHours() + ":" + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ":" + (date.getSeconds() < 10 ? '0' : '') + date.getSeconds()
  
//   return n;
// }
// })
var setRoomsCarousel = function(width){

  var width_without_gaps=(width - (4 * 150));

  var width_badge=(width_without_gaps / 5);
  console.log("llppp")
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      
      var rooms_data=JSON.parse(xhttp.responseText);
        
        console.log(rooms_data)
        for(var rm in rooms_data){
          console.log(rm)
          console.log(rooms_data[rm])
          var parent=document.getElementById("room-carousel-inner");
          if(rm % 5 == 0 ){
            var newDiv=document.createElement("DIV");
            if(rm == 0){
              newDiv.setAttribute("class","carousel-item active")
            } 
            else{
              newDiv.setAttribute("class","carousel-item")
            }    
            
            var newChildDiv=document.createElement("DIV");
            newChildDiv.setAttribute("class","room-box");
            newChildDiv.setAttribute("style","display:grid;grid-template-columns:repeat(5,1fr);grid-column-gap: 100px;grid-template-rows:80px;")

            var newRoomSpan=document.createElement("SPAN");
            newRoomSpan.setAttribute("class","room-box-badge badge")
            newRoomSpan.setAttribute("id","room-"+rooms_data[rm].roomId)
            newRoomSpan.setAttribute("data-toggle","tooltip")
            
             newRoomSpan.setAttribute("title"," Capacity : "+rooms_data[rm].capacity+ " People");
            //  newRoomSpan.setAttribute("data-content",rooms_data[rm].toString())
            newRoomSpan.innerHTML=rooms_data[rm].name
            newRoomSpan.setAttribute("style"," box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.2);font-size:20px;background-color: white; color: #63b0c5;border-radius: 15px;cursor: pointer; display: flex;justify-content: center;align-items: center;")
            newChildDiv.appendChild(newRoomSpan);
            
            newDiv.appendChild(newChildDiv);
            parent.appendChild(newDiv);
            

          }
          else{
            var newRoomSpan=document.createElement("SPAN");
            newRoomSpan.setAttribute("class","room-box-badge badge")
            newRoomSpan.setAttribute("id","room-"+rooms_data[rm].roomId)
            newRoomSpan.setAttribute("data-toggle","tooltip")
            newRoomSpan.setAttribute("title"," Capacity : "+rooms_data[rm].capacity+ " People");
            // newRoomSpan.setAttribute("data-content",rooms_data[rm].toString())
            newRoomSpan.innerHTML=rooms_data[rm].name
            newRoomSpan.setAttribute("style","box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.2);font-size:20px;background-color: white; color: #63b0c5;border-radius: 15px;cursor: pointer;display: flex;justify-content: center;align-items: center;")
            

            newChildDiv.appendChild(newRoomSpan);

          }
          

        }
    
    }
    else if(this.readyState == 4 && (this.status == 409 || this.status == 400 || this.status == 500 || this.status == 404)){
      $("#error-popup").modal("show")
    }
  };

  xhttp.open("GET", "http://localhost:8181/api/rooms", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("Authorization", "Bearer "+ sessionStorage.getItem("token"));
  xhttp.send();
  // fetch('http://localhost:8181/api/rooms')
  // .then(
  //   function(response) {
  //     if (response.status !== 200) {
  //       console.log('problem. Status Code: ' +response.status);
  //       return;
  //     }
                    
  //     // Examine the text in the response
  //     response.json().then(function(data) {
        
        




  //     });
  //   }
  // )
  // .catch(function(err) {
  //   console.log('Fetch Error :-S', err);
  // });


}

// for(var rm in rooms_data){
        //   // console.log(rooms_data[rm])
        //   var parent=document.getElementById("room-carousel-inner");
        //   if((Object.keys(rooms_data).indexOf(rm)) % 5 ===0 ){
        //     var newDiv=document.createElement("DIV");
        //     if((Object.keys(rooms_data).indexOf(rm)) ===0){
        //       newDiv.setAttribute("class","carousel-item active")
        //     } 
        //     else{
        //       newDiv.setAttribute("class","carousel-item")
        //     }    
            
        //     var newChildDiv=document.createElement("DIV");
        //     newChildDiv.setAttribute("class","room-box");
        //     newChildDiv.setAttribute("style","display:grid;grid-template-columns:repeat(5,1fr);grid-column-gap: 100px;grid-template-rows:80px;")

        //     var newRoomSpan=document.createElement("SPAN");
        //     newRoomSpan.setAttribute("class","room-box-badge badge")
        //     newRoomSpan.setAttribute("id",rm)
        //     newRoomSpan.setAttribute("data-toggle","tooltip")
            
        //      newRoomSpan.setAttribute("title", rm+" Specifications");
        //      newRoomSpan.setAttribute("data-content",rooms_data[rm].toString())
        //     newRoomSpan.innerHTML=rm
        //     newRoomSpan.setAttribute("style"," box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.2);font-size:20px;background-color: white; color: #63b0c5;border-radius: 15px;cursor: pointer; display: flex;justify-content: center;align-items: center;")
        //     newChildDiv.appendChild(newRoomSpan);
            
        //     newDiv.appendChild(newChildDiv);
        //     parent.appendChild(newDiv);
            

        //   }
        //   else{
        //     var newRoomSpan=document.createElement("SPAN");
        //     newRoomSpan.setAttribute("class","room-box-badge badge")
        //     newRoomSpan.setAttribute("id",rm)
        //     newRoomSpan.setAttribute("data-toggle","tooltip")
        //     newRoomSpan.setAttribute("title", rm+" Specifications");
        //     newRoomSpan.setAttribute("data-content",rooms_data[rm].toString())
        //     newRoomSpan.innerHTML=rm
        //     newRoomSpan.setAttribute("style","box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.2);font-size:20px;background-color: white; color: #63b0c5;border-radius: 15px;cursor: pointer;display: flex;justify-content: center;align-items: center;")
            

        //     newChildDiv.appendChild(newRoomSpan);
        //   }
          


        // }


// function autocomplete(inp, arr,myElement1) {
  
//   var currentFocus;
  
//   inp.addEventListener("input", function(e) {
//       var a, b, i, val = this.value;
     
//       closeAllLists();
//       if (!val) { return false;}
//       currentFocus = -1;
  
//       a = document.createElement("DIV");
//       a.setAttribute("id", this.id + "autocomplete-list");
//       a.setAttribute("class", "autocomplete-items");
      
//       this.parentNode.appendChild(a);
     
//       for (i = 0; i < arr.length; i++) {
        
//         if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          
//           b = document.createElement("DIV");
          
//           b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
//           b.innerHTML += arr[i].substr(val.length);
          
//           b.innerHTML += "<input type='hidden' id='ip' value='" + arr[i] + "'>";
          
//           b.addEventListener("click", function(e) {
              
//               var closeinput=this.getElementsByTagName("input")[0].value;
//               inp.value = "";
//               var myElement = document.getElementById(myElement1);
//               var newEle = document.createElement("span");
//               var att = document.createAttribute("class");       // Create a "class" attribute
//               att.value = "chip";                           // Set the value of the class attribute
//               newEle.setAttributeNode(att);
//               var mySpan=document.createElement("SPAN");
//               var att1 = document.createAttribute("class");
//               att1.value="badge badge-pill badge-light"
//               mySpan.setAttributeNode(att1)
//               mySpan.setAttribute("style","padding:10px;margin:3px;")
//               mySpan.innerHTML=this.getElementsByTagName("input")[0].value + "&nbsp" + ` <span class="`+closeinput +`" style="cursor:pointer;">&times;</span>`
//               newEle.appendChild(mySpan)
//               console.log(mySpan)
//               myElement.appendChild(newEle);
//               var added=document.getElementById(this.id + "autocomplete-list")
//               console.log(added)
//               for( var i = 0; i < arr.length; i++){ 
//                 if ( arr[i] === this.getElementsByTagName("input")[0].value) {
//                   console.log("removing")
//                   arr.splice(i, 1); 
//                 }
//               }
            
//               if(closeinput.includes(" ")){
//                 var space=closeinput.split(" ");
//                 // console.log("span."+space[0]+"."+space[1])
//                 $("div").on("click" ,"span."+space[0]+"."+space[1] ,function() {
//                   if(!arr.includes(closeinput)){
//                     console.log("pushhhhhhh")
//                     arr.push(space[0]+" "+space[1]);
//                     arr.sort();
//                     $(this).parent().parent().remove();
//                   }
                  
//                 });
//               }
//               else{
//                 $("div").on("click" ,"span."+closeinput ,function() {
//                 if(!arr.includes(closeinput)){
//                   console.log("pushhhhhhh")
//                   arr.push(closeinput);
//                   arr.sort();
//                   $(this).parent().parent().remove();
//                 }
//               });
//               }
              
              
//               closeAllLists();
             


//           });
          
          
//           a.appendChild(b);
//         }
//       }
//   });
  
  
//   inp.addEventListener("keydown", function(e) {
//       var x = document.getElementById(this.id + "autocomplete-list");
       
//       if (x) x = x.getElementsByTagName("div");
//       if (e.keyCode == 40) {
  
//         currentFocus++;
        
//         addActive(x);
//       } else if (e.keyCode == 38) { 
//         currentFocus--;
        
//         addActive(x);
//       } else if (e.keyCode == 13) {
        
//         e.preventDefault();
        
//         if (currentFocus > -1) {
          
//           if (x) {
//           x[currentFocus].click();
          
//           }
//         }
//       }
//   });
//   function addActive(x) {
   
//     if (!x) return false;
  
//     removeActive(x);
//     if (currentFocus >= x.length) currentFocus = 0;
//     if (currentFocus < 0) currentFocus = (x.length - 1);
    
//     x[currentFocus].classList.add("autocomplete-active");
//   }
//   function removeActive(x) {

//     for (var i = 0; i < x.length; i++) {
//       x[i].classList.remove("autocomplete-active");
//     }
//   }
//   function closeAllLists(elmnt) {
    
//     var x = document.getElementsByClassName("autocomplete-items");
//     for (var i = 0; i < x.length; i++) {
//       if (elmnt != x[i] && elmnt != inp) {
//         x[i].parentNode.removeChild(x[i]);
//       }
//     }
//   }
 
//   document.addEventListener("click", function (e) {
//       closeAllLists(e.target);
//   });
// }


// var countries = ["Afghanistan a","Albania","Algeria","Andorra","Angola","Anguilla","Antigua Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
// var teams = ["ECV","SevOne","RocketCM","CMA","GoSnow"]

// autocomplete(document.getElementById("myTeamMembers"), countries,"memberListElement");
// autocomplete(document.getElementById("myTeam"), teams,"teamListElement");


