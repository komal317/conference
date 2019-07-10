var imported = document.createElement('script');
imported.src = '../node_modules/bootstrap-select/dist/js/bootstrap-select.js';
document.head.appendChild(imported);

var imported = document.createElement('link');
imported.rel="stylesheet"
imported.href = '../node_modules/bootstrap-select/dist/css/bootstrap-select.css';
document.head.appendChild(imported);

var imported = document.createElement('script');
imported.src = '../node_modules/bootstrap-datetime-picker/js/bootstrap-datetimepicker.js';
document.head.appendChild(imported);

var imported = document.createElement('link');
imported.rel="stylesheet"
imported.href = '../node_modules/bootstrap-datetime-picker/css/bootstrap-datetimepicker.css';
document.head.appendChild(imported);

class meetingModal{

    constructor (book,user,organizer,myMeetings,allMeetings,start,end,clickedId,nonmembers,teams,rooms,eventOfId) {
        // this.headerText=header;
        this.book=book;
        this.user=user;
        this.organizer=organizer;
        this.myMeetings=myMeetings;
        this.allMeetings=allMeetings;
        console.log(this.allMeetings)
        this.start=start;
        this.end=end;
        console.log("heres start and end selected")
        console.log(this.start)
        console.log(this.end)
        this.clickedId=clickedId;
        this.nonmembers=nonmembers;
        this.allTeams=teams
        console.log()
        this.rooms=rooms
        this.eventOfId=eventOfId;
        // getAllUsers("/users")
        // this.nonmembers=function getAllUsersFunction(xhttp){
        //   console.log(xhttp.responseText)
        // }
       
        
        
    }
    
    move () {
      var startTime,endTime;
      const weekday=new Array(7);
      weekday[1]="Mon";
      weekday[2]="Tues";
      weekday[3]="Wed";
      weekday[4]="Thu";
      weekday[5]="Fri";
      weekday[6]="Sat";
      weekday[0]="Sun";
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      
      var meeting_modal=document.getElementById("meeting-modal");
      meeting_modal.innerHTML=""
      
      var modalFade=document.createElement("DIV");
      modalFade.setAttribute("class","modal fade");
      modalFade.setAttribute("id","meeting-popup")
      modalFade.setAttribute("tabindex","-1")
      modalFade.setAttribute("role","dialog");
      modalFade.setAttribute("aria-labelledby","meeting-popupTitle")
      modalFade.setAttribute("aria-hidden","true");

      var modalDialogCentered=document.createElement("DIV");
      modalDialogCentered.setAttribute("class","modal-dialog modal-dialog-centered modal-lg");
      modalDialogCentered.setAttribute("role","document")
      

      var content=document.createElement("DIV")
      content.setAttribute("class","modal-content")

      var header=document.createElement("DIV");
      header.setAttribute("class","modal-header");
      var fa=document.createElement("I");
      fa.setAttribute("class","fas fa-users")
      fa.setAttribute("style","padding-right:20px;")
      header.appendChild(fa)
      var title=document.createElement("H1")
      title.setAttribute("class","modal-title")
      title.setAttribute("id","meeting-popupTitle")
      if(this.book)
        title.innerHTML="Book your meeting";
      else{
        for(var x in this.myMeetings){
          
          if(this.myMeetings[x]['id'] == this.clickedId){
            title.innerHTML=this.myMeetings[x]['title']
          }
        }
      }
      
      
      header.appendChild(title)
     
      var button=document.createElement("BUTTON");
      button.setAttribute("id","modal-close-icon" );
      button.setAttribute("type","button");
      button.setAttribute("class","close");
      button.setAttribute("data-dismiss","modal")
      button.setAttribute("aria-label","Close");

      var span=document.createElement("SPAN");
      span.setAttribute("aria-hidden","true")
      span.innerHTML="&times;";
      button.appendChild(span)
      header.appendChild(button)

      content.appendChild(header)
     
      
      

      
      


      var body=document.createElement("DIV");
      body.setAttribute("class","modal-body");
      


        var form=document.createElement("FORM")
        form.setAttribute("class","booking-form")
        form.setAttribute("name","booking-form")
        form.setAttribute("id","booking-form")
        
        form.setAttribute("style","display:grid;grid-template-columns:0.5fr 0.5fr;grid-column-gap:30px;padding:30px");

        var div=document.createElement("DIV")
        // div.setAttribute("style","grid-column:1/span 2;")
        
        div.setAttribute("id","title-row")
        // div.setAttribute("style","padding-bottom:1rem")
        var row1=document.createElement("DIV");
        row1.setAttribute("class","row1")
        var span=document.createElement("SPAN");
        span.setAttribute("style","letter-spacing:0.03cm;margin-bottom:15px;font-size:22px;")
        span.innerHTML="Title";
        row1.appendChild(span);
        var row2=document.createElement("DIV");
        row2.setAttribute("class","form-group")
        row2.setAttribute("id","title-row-2")
        row2.setAttribute("style","color:gray;font-size:16px")
        var input=document.createElement("INPUT")
        input.setAttribute("class","form-control form-input")
        input.setAttribute("id","title-field")
        input.setAttribute("style","border-radius: 10px;height: 50px;")
        input.setAttribute("type","text")
        input.setAttribute("autocomplete","off");
        input.setAttribute("required","")
        var clickedId=this.clickedId
        if(this.book)
        {div.setAttribute("style","grid-column:1/span 2;padding-bottom:1rem")}
        else{
          div.setAttribute("style","visibility:hidden;height:0px;")
          // for(var x in this.myMeetings){
          //   startTime=new Date(this.myMeetings[x]['start'])
          //   endTime=new Date(this.myMeetings[x]['end'])
          //   if(this.start.getTime() === startTime.getTime() && this.end.getTime() == endTime.getTime()){
          //     input.setAttribute("value",this.myMeetings[x]['title'])
          //   }
          // }
          for(var x in this.myMeetings){
            
              if(this.myMeetings[x]['id'] == clickedId){
                console.log("this.myMeetings[x]['id'] == clickedId")
                input.setAttribute("value",this.myMeetings[x]['title'])
              }
            }
        }
        // input.setAttribute("value",this.myMeetings[x]['title'])
        // div2.appendChild(input)
        row2.appendChild(input)
        div.appendChild(row1);
        div.appendChild(row2)
        // var hr=document.createElement("HR")
        // div.appendChild(hr)
        form.appendChild(div) 
        
        if(this.user){
                      var div=document.createElement("DIV")
            div.setAttribute("id","organizer")
            div.setAttribute("style","padding-bottom:10px;justify-self:end;")
            var row1=document.createElement("DIV");
            row1.setAttribute("id","organizer-row1")
          
            
            div.appendChild(row1)


            var row2=document.createElement("DIV");
            row2.setAttribute("class","row2")
            var span=document.createElement("SPAN");
            span.setAttribute("class","badge badge-info")
            span.setAttribute("style","padding:7px;letter-spacing:0.03cm;margin-bottom:5px;")
            span.innerHTML="Organizer";
            row2.appendChild(span);
            
            var span=document.createElement("SPAN");
            for(var x in this.myMeetings){
              if(this.myMeetings[x]['id'] == this.clickedId){
                span.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;"+this.myMeetings[x]['organizer']['name']+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
              }
            }
            
            row2.appendChild(span)
            
            
            for(var x in this.myMeetings){
              startTime=new Date(this.myMeetings[x]['start'])
              endTime=new Date(this.myMeetings[x]['end'])
              
              if(this.myMeetings[x]['id'] == this.clickedId){
                if(this.myMeetings[x]['organizer']['empId']===sessionStorage.getItem("userId")){
                  var roomname=this.myMeetings[x]['roomName']
                  var id=this.myMeetings[x]['id']
                  var i=document.createElement("I")
                  i.setAttribute("class","far fa-edit")
                  i.setAttribute("id","organizer-edit")
                  
                  i.addEventListener("click",function(){
                    
                    this.setAttribute("style","visibility:hidden")
                    this.organizer=true;
                    document.getElementById("title-row").setAttribute("style","visibility:visible;padding-bottom:1rem")
                    document.getElementById("agenda-field").removeAttribute("disabled")
    
                    document.getElementById("update-start-time").removeAttribute("disabled")
                    $('#update-start-time').datetimepicker({
                      autoclose: true,
                    });
                    $('#update-start-time').datetimepicker("update", this.start)
                    document.getElementById("update-end-time").removeAttribute("disabled")
                    $('#update-end-time').datetimepicker({
                      autoclose: true
                    });
                    $('#update-end-time').datetimepicker("update", this.end)
                    document.getElementById("edit-room-span").setAttribute("style","visibility:visible;float:right")
                    $('.edit-room').selectpicker({
                      actionsBox:true,
                      size:"7"
                    });
                    document.getElementById("edit-members").setAttribute("style","visibility:visible;float:right")
                    
                    var footer=document.getElementById("footer")
                    var btn=document.createElement("BUTTON")
                    
                    btn.setAttribute("class","btn btn-outline-info")
                    btn.innerHTML="Submit"
                    btn.setAttribute("style","margin-left:2rem;margin-right:2rem")
                    btn.setAttribute("type","submit")
                    form.setAttribute("onsubmit","return editMeeting(\'"+roomname+"\',\'"+id+"\')")
                    footer.setAttribute("style","padding-top:2rem;grid-column:1/span 2;justify-self:center")
                    footer.appendChild(btn)
                    
                    var btn=document.createElement("BUTTON")
                    
                    btn.setAttribute("class","btn btn-outline-info")
                    btn.setAttribute("style","margin-left:2rem;margin-right:2rem")
                    btn.setAttribute("type","button")
                    btn.innerHTML="Cancel Meeting"
                    btn.setAttribute("onclick","return cancelMeeting(\'"+id+"\')")
                    // btn.setAttribute("data-dismiss","")
                    footer.appendChild(btn)

                  })
                  console.log(this.organizer)
                  i.setAttribute("style","cursor:pointer;float:right;font-size:20px;")
                  row2.appendChild(i)
                }
              }
            }
            // EDIT OPTION
            
            div.appendChild(row2);
            form.appendChild(div)
        }

        var div=document.createElement("DIV")
          div.setAttribute("style","grid-column:1/span 2;padding-bottom:1rem")
        
          div.setAttribute("id","agenda-row")
          var row1=document.createElement("DIV");
          row1.setAttribute("class","row1")
          var span=document.createElement("SPAN");
          // span.setAttribute("class","badge btn btn-outline-info")
          span.setAttribute("style","letter-spacing:0.03cm;margin-bottom:15px;font-size:22px;")
          span.innerHTML="Agenda";
          row1.appendChild(span);
          var row2=document.createElement("DIV");
          row2.setAttribute("class","row2 form-group")
          row2.setAttribute("id","agenda-row-2")
          row2.setAttribute("style","color:gray;font-size:16px")
          
          var input=document.createElement("INPUT")
          input.setAttribute("id","agenda-field")
          input.setAttribute("class","form-control form-input")
          input.setAttribute("style","border-radius: 10px;height: 50px;")
          
          input.setAttribute("type","text")
          input.setAttribute("autocomplete","off");
          input.setAttribute("required","")
          
          if(this.book)
        {}
        else{
          input.setAttribute("disabled","")
          for(var x in this.myMeetings){
            if(this.myMeetings[x]['id'] == this.clickedId){
              input.setAttribute("value",this.myMeetings[x]['agenda'])
            }
          }
        }
          
          // div2.appendChild(input)
          row2.appendChild(input)
          div.appendChild(row1);
          div.appendChild(row2)
          // var hr=document.createElement("HR")
          // div.appendChild(hr)
          form.appendChild(div)


            var div=document.createElement("DIV")
            div.setAttribute("id","start")
            div.setAttribute("style","padding-bottom:1rem")
            var row1=document.createElement("DIV");
            row1.setAttribute("class","row1")
            var span=document.createElement("SPAN");
            span.setAttribute("style","letter-spacing:0.03cm;margin-bottom:15px;font-size:22px;")
            span.innerHTML="Start Time";
            row1.appendChild(span);
            
              
              var row2=document.createElement("DIV");
              row2.setAttribute("class","row2 form-group")
              row2.setAttribute("id","time-row")
              row2.setAttribute("style","color:gray;font-size:16px")
              // var div2=document.createElement("Span")
              //   div2.setAttribute("class","input-group mb-3")
              //   var div1=document.createElement("SPAN")
              //   div1.setAttribute("class","input-group-prepend")
              //   var span=document.createElement("SPAN")
              //   span.setAttribute("class","input-group-text")
              //   var fa=document.createElement("I");
              //   fa.setAttribute("class","fa fa-calendar fa-fw")
              //   span.appendChild(fa)
              //   div1.appendChild(span)
              //   div2.appendChild(div1)
                var input=document.createElement("INPUT")
                input.setAttribute("id","update-start-time")
                input.setAttribute("class","form-control form-input")
                input.setAttribute("style","border-radius: 10px;height: 50px;")
                input.setAttribute("type","text")
                input.setAttribute("autocomplete","off");
                input.setAttribute("required","")
                input.setAttribute("readonly","")
                input.setAttribute("data-date-format","yyyy-mm-dd hh:ii:ss")

          if(this.book)
          {
            var date=this.start
            console.log("in book")
            var sdate=date.getFullYear() + "-" + (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1) + "-" + (date.getDate() < 10 ? '0' : '') + date.getDate() + " " + (date.getHours() < 10 ? '0' : '') + date.getHours() + ":" + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() 
            input.setAttribute("value",sdate)
            
          }
          else{
            input.setAttribute("disabled","")
                
            for(var x in this.myMeetings){
              startTime=new Date(this.myMeetings[x]['start'])
              endTime=new Date(this.myMeetings[x]['end'])
              if(this.myMeetings[x]['id'] == this.clickedId){
                var sdate=weekday[startTime.getDay()]+" "+monthNames[startTime.getMonth()]+" "+startTime.getDate()+" "+startTime.getFullYear()
                
                var stime=startTime.getHours()+":"+startTime.getMinutes();
               
                input.setAttribute("value",sdate+" "+stime)
              }
            }
          }
                
                // div2.appendChild(input)
                row2.appendChild(input)
                div.appendChild(row1);
                div.appendChild(row2)
                form.appendChild(div)
                // $('#update-start-time').datetimepicker({autoclose: true});
                
                
                var div=document.createElement("DIV")
                div.setAttribute("id","end")
                div.setAttribute("style","padding-bottom:1rem")
                var row1=document.createElement("DIV");
                row1.setAttribute("class","row1")
                var span=document.createElement("SPAN");
                // span.setAttribute("class","badge btn btn-outline-info")
                span.setAttribute("style","letter-spacing:0.03cm;margin-bottom:15px;font-size:22px;")
                span.innerHTML="End Time";
                row1.appendChild(span);
                var row2=document.createElement("DIV");
              row2.setAttribute("class","row2 form-group")
              row2.setAttribute("id","time-row")
              row2.setAttribute("style","color:gray;font-size:16px")
                // var div2=document.createElement("SPAN")
                // div2.setAttribute("class","input-group mb-3")
                // // div2.setAttribute("style","width:50%")
                // var div1=document.createElement("SPAN")
                // div1.setAttribute("class","input-group-prepend")
                // var span=document.createElement("SPAN")
                // span.setAttribute("class","input-group-text")
                // var fa=document.createElement("I");
                // fa.setAttribute("class","fa fa-calendar fa-fw")
                // span.appendChild(fa)
                // div1.appendChild(span)
                // div2.appendChild(div1)
                var input=document.createElement("INPUT")
                input.setAttribute("id","update-end-time")
                input.setAttribute("class","form-control form-input")
                input.setAttribute("style","border-radius: 10px;height: 50px;")
                input.setAttribute("type","text")
                input.setAttribute("autocomplete","off");
                input.setAttribute("required","")
                input.setAttribute("readonly","")
                input.setAttribute("data-date-format","yyyy-mm-dd hh:ii:ss")
                if(this.book)
          {
            var date=this.end
            var edate=date.getFullYear() + "-" + (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1) + "-" + (date.getDate() < 10 ? '0' : '') + date.getDate() + " " + (date.getHours() < 10 ? '0' : '') + date.getHours() + ":" + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() 
            input.setAttribute("value",edate)
            $('#update-end-time').datetimepicker({
              autoclose: true,
            });
            $('#update-end-time').datetimepicker("update", this.end)
          }
          else{
            input.setAttribute("disabled","")
                
            for(var x in this.myMeetings){
              startTime=new Date(this.myMeetings[x]['start'])
              endTime=new Date(this.myMeetings[x]['end'])
              if(this.myMeetings[x]['id'] == this.clickedId){
                
                var edate=weekday[endTime.getDay()]+" "+monthNames[endTime.getMonth()]+" "+endTime.getDate()+" "+endTime.getFullYear()
                
                var etime=endTime.getHours()+":"+endTime.getMinutes();
                input.setAttribute("value",edate+" "+etime)
              }
            }
          }
               
                // div2.appendChild(input)
              row2.appendChild(input)
              div.appendChild(row1);
              div.appendChild(row2)
              form.appendChild(div)

          if(this.user){
            var div=document.createElement("DIV")
                  div.setAttribute("id","room")
                  div.setAttribute("style","grid-column:1/span 2;padding-bottom:2rem")
                  var row1=document.createElement("DIV");
                  row1.setAttribute("class","row1")
                  var span=document.createElement("SPAN");
                  span.setAttribute("style","letter-spacing:0.03cm;margin-bottom:15px;font-size:22px;")
                  span.innerHTML="Room";
                  row1.appendChild(span);
      
                  var span=document.createElement("SPAN");
                  span.setAttribute("style","visibility:hidden;float:right")
                  span.setAttribute("id","edit-room-span");
                  
                  row1.appendChild(span)
                  div.appendChild(row1);
                  var row2=document.createElement("DIV");
                  row2.setAttribute("class","row2")
                  row2.setAttribute("style","color:gray;font-size:16px")
                  for(var x in this.myMeetings){
                    if(this.myMeetings[x]['id'] == this.clickedId){
                      row2.innerHTML=this.myMeetings[x]['roomName']+"&nbsp;&nbsp;[ "+this.myMeetings[x]['specifications']+" ]";
                    }
                  }
                 
                  div.appendChild(row2)
                  
                  form.appendChild(div)
          }
          else{
            var div=document.createElement("DIV")
            div.setAttribute("id","teams")
            div.setAttribute("style","padding-bottom:2rem;")
            var row1=document.createElement("DIV");
            row1.setAttribute("class","row1")
            row1.setAttribute("style","padding-bottom:1rem")
            var span=document.createElement("SPAN");
            span.setAttribute("style","letter-spacing:0.03cm;margin-bottom:15px;font-size:22px;")
            span.innerHTML="Teams";
            row1.appendChild(span);
            var row2=document.createElement("DIV");
            row2.setAttribute("class","row2")
            row2.setAttribute("style","font-size:16px")
            // row2.setAttribute("style","margin-left:70px")
            row2.setAttribute("id","edit-teams");
            var sel=document.createElement("SELECT");
            // sel.setAttribute("styleBase","color:black")
            sel.setAttribute("class","edit-teams")
            sel.setAttribute("id","edit-teams")
            sel.setAttribute("data-live-search","true");
            // sel.setAttribute("data-style","btn- light")
            sel.setAttribute("multiple","")
            sel.setAttribute("title","Select Teams")
            sel.setAttribute("data-size","7")
            sel.setAttribute("data-width","100%")
            sel.setAttribute("data-selected-text-format","count")
            for(var t in this.allTeams){
                var option=document.createElement("OPTION");
                option.setAttribute("id",this.allTeams[t].teamId)
                
                option.innerHTML=this.allTeams[t].teamName;
                sel.appendChild(option)
            }
            row2.appendChild(sel)
            
            // row1.appendChild(span)
            div.appendChild(row1);
            div.appendChild(row2)
            var row2=document.createElement("DIV");
            row2.setAttribute("class","row2")
           
            
            div.appendChild(row2)
            
            form.appendChild(div)
          }
              

            var div=document.createElement("DIV")
            div.setAttribute("id","members")
            if(this.user){
              div.setAttribute("style","grid-column:1/span 2")
            }
            
            var row1=document.createElement("DIV");
            row1.setAttribute("class","row1")
            if(this.book)
            row1.setAttribute("style","padding-bottom:1rem")
            var span=document.createElement("SPAN");
            span.setAttribute("style","letter-spacing:0.03cm;margin-bottom:15px;font-size:22px;")
            span.innerHTML="Members";
           
            row1.appendChild(span);
            if(this.book){
              var span=document.createElement("DIV");
              
            }
            else{
              var span=document.createElement("SPAN");
            }
            
            
            span.setAttribute("id","edit-members");
            var sel=document.createElement("SELECT");
          
            sel.setAttribute("class","edit-members")
            sel.setAttribute("id","edit-members")
            sel.setAttribute("data-live-search","true");
            // sel.setAttribute("data-style","btn-info")
            sel.setAttribute("multiple","")
            sel.setAttribute("title","Participants")
            sel.setAttribute("data-size","7")
            sel.setAttribute("data-selected-text-format","count")
            if(this.book){
              sel.setAttribute("data-width","100%")
            }
            else{
              span.setAttribute("style","visibility:hidden;float:right")
            }
            // console.log("members "+this.myMeetings[x]['members'])
            for(var t in this.nonmembers){
              if(this.nonmembers[t].empId == sessionStorage.getItem("userId"))
                { console.log("continue "+this.nonmembers[t].name)
                  continue;}
                var option=document.createElement("OPTION");
                
                option.setAttribute("id",this.nonmembers[t].empId)
                if(this.user){
                  for(var x in this.myMeetings){
                    if(this.myMeetings[x]['id'] == this.clickedId){
                      if(this.myMeetings[x]['members'].find(el => el.empId === this.nonmembers[t].empId)){
                        option.setAttribute("Selected","")
                        console.log("selected all users "+this.nonmembers[t].name)
                        
                      }
                    }
                  }
                  
                }
                
                option.innerHTML=this.nonmembers[t].name;
                sel.appendChild(option)
            }
            span.appendChild(sel)
            
            if(this.user){
              row1.appendChild(span)
            }
            
            div.appendChild(row1);
            if(this.book){
              div.appendChild(span)
            }
            var row2=document.createElement("DIV");
            row2.setAttribute("class","row2")
            if(this.user){
              for(var x in this.myMeetings){
                if(this.myMeetings[x]['id'] == this.clickedId){
                  row2.setAttribute("style","color:gray;font-size:16px")
                  for(var y in this.myMeetings[x]['members']){
                    console.log(this.myMeetings[x]['members'][y]['name'])
                    if(y!=this.myMeetings[x]['members'].length-1){
                      row2.innerHTML+=this.myMeetings[x]['members'][y]['name']+",&nbsp;&nbsp; ";
                    }
                    else{
                      row2.innerHTML+=this.myMeetings[x]['members'][y]['name']+"&nbsp;&nbsp; ";
                    }
                    
                  }
                }
              }
            }
            
            
            div.appendChild(row2)
            form.appendChild(div)
            // var hr=document.createElement("HR")
            // div.appendChild(hr)

            if(this.book){
              var div=document.createElement("DIV")
              div.setAttribute("style","grid-column:1/span 2;padding-bottom:1rem")
            
              div.setAttribute("id","repeat")
              var row1=document.createElement("DIV");
              row1.setAttribute("class","row1")
              var span=document.createElement("SPAN");
              // span.setAttribute("class","badge btn btn-outline-info")
              span.setAttribute("style","letter-spacing:0.03cm;margin-bottom:15px;font-size:22px;")
              span.innerHTML="Repeat Meeting";
              row1.appendChild(span);
              var row2=document.createElement("DIV");
              row2.setAttribute("class","row2 form-group")
              row2.setAttribute("id","repeat-row-2")
              row2.setAttribute("style","color:gray;font-size:16px;margin:1rem")
               
              var radio=document.createElement("DIV");
              radio.setAttribute("class","custom-control custom-radio custom-control-inline")

              var input=document.createElement("INPUT")
              input.setAttribute("id","daily")
              input.setAttribute("class","custom-control-input")
              input.setAttribute("name","repeat")
              input.setAttribute("type","radio")
              input.setAttribute("value","daily")

              var label=document.createElement("LABEL")
              label.setAttribute("class","custom-control-label")
              label.setAttribute("for","daily")
              label.innerHTML="Daily";

              radio.appendChild(input)
              radio.appendChild(label)
              row2.appendChild(radio)

              var radio=document.createElement("DIV");
              radio.setAttribute("class","custom-control custom-radio custom-control-inline")

              var input=document.createElement("INPUT")
              input.setAttribute("id","weekly")
              input.setAttribute("class","custom-control-input")
              input.setAttribute("name","repeat")
              input.setAttribute("type","radio")
              input.setAttribute("value","weekly")

              var label=document.createElement("LABEL")
              label.setAttribute("class","custom-control-label")
              label.setAttribute("for","weekly")
              label.innerHTML="Weekly";

              radio.appendChild(input)
              radio.appendChild(label)
              row2.appendChild(radio)

              var radio=document.createElement("DIV");
              radio.setAttribute("class","custom-control custom-radio custom-control-inline")

              var input=document.createElement("INPUT")
              input.setAttribute("id","none")
              input.setAttribute("class","custom-control-input")
              input.setAttribute("name","repeat")
              input.setAttribute("type","radio")
              input.setAttribute("value","none")
              input.setAttribute("checked","")

              var label=document.createElement("LABEL")
              label.setAttribute("class","custom-control-label")
              label.setAttribute("for","none")
              label.innerHTML="None";

              radio.appendChild(input)
              radio.appendChild(label)
              row2.appendChild(radio)
              // 
              
              // input.setAttribute("type","text")
              // input.setAttribute("autocomplete","off");
              // input.setAttribute("required","")
              
              
              
              // // div2.appendChild(input)
              
              div.appendChild(row1);
              div.appendChild(row2)
              form.appendChild(div)
            }

            var footer=document.createElement("DIV")
            footer.setAttribute("class","footer");
            footer.setAttribute("id","footer");
            
            if(this.book){
              footer.setAttribute("style","padding-top:2rem;grid-column:1/span 2;justify-self:center")
              var btn=document.createElement("BUTTON")
              // btn.setAttribute("type","submit");
              btn.setAttribute("class","btn btn-outline-info")
              btn.innerHTML="Submit"
              // btn.addEventListener("click",function bookMeeting(){})
              form.setAttribute("onsubmit","return bookMeeting()")
              footer.appendChild(btn)
              
            }
            else{
              footer.setAttribute("style","padding-top:2rem;grid-column:1/span 2;justify-self:center")
            }
          form.appendChild(footer)   
          // <span id="error-msg" style="color: red;font:italic"></span>
          var err=document.createElement("SPAN")
          err.setAttribute("id","error-msg")
          err.setAttribute("style","color: red;font:italic")
          form.appendChild(err)
          body.appendChild(form)
          content.appendChild(body)
          
          
          // content.appendChild(footer)
          modalDialogCentered.appendChild(content)
          modalFade.appendChild(modalDialogCentered)
          meeting_modal.appendChild(modalFade)
          var allEvents=this.allMeetings
          for(var x in this.myMeetings){
            var eventOfId=this.eventOfId
            startTime=new Date(this.myMeetings[x]['start'])
            endTime=new Date(this.myMeetings[x]['end'])
            if(this.myMeetings[x]['id'] == this.clickedId){
              
              console.log(allEvents)
              console.log("out on change date")
              var roomSpan=document.getElementById("edit-room-span")
              
              $('#update-start-time').datetimepicker({
                autoclose: true,
              }).on('changeDate', function(ev){
                console.log("on change date")
                roomSpan.innerHTML=""
              var sel=document.createElement("SELECT");
              sel.setAttribute("class","edit-room")
              sel.setAttribute("id","edit-room")
              // sel.setAttribute("data-live-search","true");
              // sel.setAttribute("data-style","btn-info")
              sel.setAttribute("title","Available Rooms")
              
              sel.setAttribute("data-size","7")
                for(var s in allEvents){
                  console.log("jdjfdhjcjjhhhhhhhhhhhhh")
                  var array = allEvents[s];
                  var flag=0;
                  for(var i in array){
                    console.log(array[i].id)
                    console.log(eventOfId)
                    if(array[i].id == eventOfId){
                      console.log("Same id same room")
                      break;
                    }
                    console.log("kjdsdjk")
                    var start=ev.date
                    var end=new Date(document.getElementById("update-end-time").value);
                    var startDate=new Date(array[i].start);
                    var endDate=new Date(array[i].end);
                    console.log("start "+start)
                    console.log("startdate "+startDate)
                    console.log("end "+end)
                    console.log("enddate "+endDate)
                    var condition1 = (start.getTime()===(startDate.getTime()) && end.getTime()===(endDate.getTime()));
                    console.log("cond1 "+condition1)
                    var condition2 = (start.getTime()<(endDate.getTime()) && end.getTime()>(endDate.getTime()));
                    var condition3 = (start.getTime()<(startDate.getTime()) && end.getTime()>(startDate.getTime()));
                    var condition4 = (start.getTime()>(startDate.getTime()) && end.getTime()<(endDate.getTime()));
                    console.log("cond4 "+condition4)
                    if (condition1 || condition2 || condition3 ||  condition4){
                      console.log("cond false")
                      flag=1;
                      break;
                    }
                    
                  }
                  if(flag==0){
                   var option=document.createElement("OPTION");
                      option.innerHTML=s;
                      sel.appendChild(option)
                 
                  }
                }
                // if($(".edit-room").children("option").length === 0){
                //   sel.setAttribute("title","No Available Rooms")
                // }
                roomSpan.appendChild(sel)
                $('.edit-room').selectpicker({
                  actionsBox:true,
                  size:"7"
                });
                // document.getElementById("edit-room-span").appendChild(sel)
                });
                console.log(document.getElementById("edit-room-span"))
              $('#update-start-time').datetimepicker("update", this.start)

              $('#update-end-time').datetimepicker({
                autoclose: true,
              }).on('changeDate', function(ev){
                roomSpan.innerHTML=""
                var sel=document.createElement("SELECT");
                sel.setAttribute("class","edit-room")
                sel.setAttribute("id","edit-room")
                // sel.setAttribute("data-live-search","true");
                // sel.setAttribute("data-style","btn-info")
                sel.setAttribute("title","Available Rooms")
                sel.setAttribute("data-size","7")
                for(var s in allEvents){
                  
                  var array = allEvents[s];
                  var flag=0;
                  for(var i in array){
                    console.log(array[i].id)
                    console.log(eventOfId)
                    if(array[i].id == eventOfId){
                      console.log("Same id same room")
                      break;
                      
                    }
                    var end=ev.date
                    var start=new Date(document.getElementById("update-start-time").value);
                    var startDate=new Date(array[i].start);
                    var endDate=new Date(array[i].end);
                   
                    var condition1 = (start==(startDate) && end==(endDate));
                    var condition2 = (start<(endDate) && end>(endDate));
                    var condition3 = (start<(startDate) && end>(startDate));
                    var condition4 = (start>(startDate) && end<(endDate));
                    if (condition1 || condition2 || condition3 ||  condition4){
                      console.log("cond false")
                      flag=1;
                      break;
                    }
                    
                  }
                  if(flag==0){
                   var option=document.createElement("OPTION");
                      option.innerHTML=s;
                      sel.appendChild(option)
                 
                  }
                  console.log($(".edit-room").children("option").length)
                }
                // if($(".edit-room").children("option").length === 0){
                //   sel.setAttribute("title","No Available Rooms")
                // }
                roomSpan.appendChild(sel)
                $('.edit-room').selectpicker({
                  actionsBox:true,
                  size:"7"
                });
                // document.getElementById("edit-room-span").appendChild(sel)
                });
              $('#update-end-time').datetimepicker("update", this.end)
            }
          }
          $('#update-start-time').datetimepicker({
            autoclose: true,
          });
          $('#update-start-time').datetimepicker("update", this.start)
          $('#update-end-time').datetimepicker({
            autoclose: true,
          });
          $('#update-end-time').datetimepicker("update", this.end)
          $('.edit-members').selectpicker({
            actionsBox:true,
            size:"7",

          });
          $('.edit-teams').selectpicker({
            actionsBox:true,
            size:"7",
            
          });
          $("#booking-form").submit(function(e) {
            e.preventDefault();
         
          });
          $("#meeting-popup").modal("show")






      // if(this.book){
        
      // }


      // else if(this.user){
      //   for(var x in this.myMeetings){
      //     startTime=""
      //     endTime=""
      //     startTime=new Date(this.myMeetings[x]['start'])
      //     endTime=new Date(this.myMeetings[x]['end'])
      //     if(this.start.getTime() === startTime.getTime() && this.end.getTime() == endTime.getTime()){
      //       var meeting_modal=document.getElementById("meeting-modal");
      //       meeting_modal.innerHTML=""
            
      //       var modalFade=document.createElement("DIV");
      //       modalFade.setAttribute("class","modal fade");
      //       modalFade.setAttribute("id","meeting-popup")
      //       modalFade.setAttribute("tabindex","-1")
      //       modalFade.setAttribute("role","dialog");
      //       modalFade.setAttribute("aria-labelledby","meeting-popupTitle")
      //       modalFade.setAttribute("aria-hidden","true");
    
      //       var modalDialogCentered=document.createElement("DIV");
      //       modalDialogCentered.setAttribute("class","modal-dialog modal-dialog-centered modal-lg");
      //       modalDialogCentered.setAttribute("role","document")
            
    
      //       var content=document.createElement("DIV")
      //       content.setAttribute("class","modal-content")
    
      //       var header=document.createElement("DIV");
      //       header.setAttribute("class","modal-header");
      //       var fa=document.createElement("I");
      //       fa.setAttribute("class","	fas fa-users")
      //       header.appendChild(fa)
      //       var title=document.createElement("H1")
      //       title.setAttribute("class","modal-title")
      //       title.setAttribute("id","meeting-popupTitle")
            
      //       title.innerHTML="&nbsp;&nbsp;"+this.myMeetings[x]['title'];
      //       header.appendChild(title)
           
      //       var button=document.createElement("BUTTON");
      //       button.setAttribute("id","modal-close-icon" );
      //       button.setAttribute("type","button");
      //       button.setAttribute("class","close");
      //       button.setAttribute("data-dismiss","modal")
      //       button.setAttribute("aria-label","Close");
    
      //       var span=document.createElement("SPAN");
      //       span.setAttribute("aria-hidden","true")
      //       span.innerHTML="&times;";
      //       button.appendChild(span)
      //       header.appendChild(button)
    
      //       content.appendChild(header)
           

      //       var body=document.createElement("DIV");
      //       body.setAttribute("class","modal-body");
      //       body.setAttribute("style","display:grid;grid-template-columns:0.5fr 0.5fr;grid-column-gap:30px;padding:30px")


      //         var div=document.createElement("DIV")
      //         div.setAttribute("style","grid-column:1/span 2")
      //         div.setAttribute("style","visibility:hidden;height:0px;")
      //         div.setAttribute("id","title-row")
      //         var row1=document.createElement("DIV");
      //         row1.setAttribute("class","row1")
      //         var span=document.createElement("SPAN");
      //         // span.setAttribute("class","badge btn btn-outline-info")
      //         span.setAttribute("style","letter-spacing:0.03cm;margin-bottom:15px;font-size:22px;")
      //         span.innerHTML="Title";
      //         row1.appendChild(span);
      //         var row2=document.createElement("DIV");
      //         row2.setAttribute("class","row2")
      //         row2.setAttribute("id","title-row-2")
      //         row2.setAttribute("style","color:gray;font-size:16px")
      //         var div2=document.createElement("SPAN")
      //         div2.setAttribute("class","input-group mb-3")
      //         // div2.setAttribute("style","width:50%")
      //         var div1=document.createElement("SPAN")
      //         div1.setAttribute("class","input-group-prepend")
      //         var span=document.createElement("SPAN")
      //         span.setAttribute("class","input-group-text")
      //         var fa=document.createElement("I");
      //         fa.setAttribute("class","	fas fa-file-alt	")
      //         span.appendChild(fa)
      //         div1.appendChild(span)
      //         div2.appendChild(div1)
      //         var input=document.createElement("INPUT")
      //         input.setAttribute("id","agenda")
      //         input.setAttribute("Style","border-radius: 10px;border-top-left-radius: 0px;border-bottom-left-radius: 0px;padding-left:5px;")
      //         input.setAttribute("type","text")
      //         input.setAttribute("autocomplete","off");
      //         input.setAttribute("required","")
              
      //         input.setAttribute("value",this.myMeetings[x]['title'])
      //         div2.appendChild(input)
      //         row2.appendChild(div2)
      //         div.appendChild(row1);
      //         div.appendChild(row2)
      //         var hr=document.createElement("HR")
      //         div.appendChild(hr)
      //         form.appendChild(div) 


      //       var div=document.createElement("DIV")
      //       div.setAttribute("id","organizer")
      //       div.setAttribute("style","padding-bottom:10px;justify-self:end;")
      //       var row1=document.createElement("DIV");
      //       row1.setAttribute("id","organizer-row1")
          
            
      //       div.appendChild(row1)


      //       var row2=document.createElement("DIV");
      //       row2.setAttribute("class","row2")
      //       var span=document.createElement("SPAN");
      //       span.setAttribute("class","badge badge-info")
      //       span.setAttribute("style","padding:7px;letter-spacing:0.03cm;margin-bottom:5px;")
      //       span.innerHTML="Organizer";
      //       row2.appendChild(span);
            
      //       var span=document.createElement("SPAN");
      //       span.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;"+this.myMeetings[x]['organizer']['name']+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
      //       row2.appendChild(span)
            
    
    
      //       // EDIT OPTION
      //       if(this.myMeetings[x]['organizer']['empId']===sessionStorage.getItem("userId")){

      //         var i=document.createElement("I")
      //         i.setAttribute("class","far fa-edit")
      //         i.setAttribute("id","organizer-edit")
              
      //         i.addEventListener("click",function(){
              
      //           this.setAttribute("style","visibility:hidden")
      //           this.organizer=true;
      //           document.getElementById("title-row").setAttribute("style","visibility:visible")
      //           document.getElementById("agenda-field").removeAttribute("disabled")

      //           document.getElementById("update-start-time").removeAttribute("readonly")
      //           $('#update-start-time').datetimepicker({
      //             autoclose: true,
      //           });
      //           $('#update-start-time').datetimepicker("update", startTime)
      //           document.getElementById("update-end-time").removeAttribute("readonly")
      //           $('#update-end-time').datetimepicker({
      //             autoclose: true
      //           });
      //           $('#update-end-time').datetimepicker("update", endTime)
      //           document.getElementById("edit-room").setAttribute("style","visibility:visible;float:right")
      //           $('.edit-room').selectpicker({
      //             actionsBox:true,
      //             size:"7"
      //           });
      //           document.getElementById("edit-members").setAttribute("style","visibility:visible;float:right")
      //           $('.edit-members').selectpicker({
      //             actionsBox:true,
      //             size:"7"
      //           });
      //           var footer=document.getElementById("modal-footer")
      //           var btn=document.createElement("BUTTON")
      //           btn.setAttribute("type","button");
      //           btn.setAttribute("class","btn btn-outline-info")
      //           btn.innerHTML="Submit"
      //           footer.setAttribute("style","justify-content:center")
      //           footer.appendChild(btn)
      //         })
      //         console.log(this.organizer)
      //         i.setAttribute("style","cursor:pointer;float:right;font-size:20px;")
      //         row2.appendChild(i)
      //       }
      //       div.appendChild(row2);
      //       body.appendChild(div)

      //       var div=document.createElement("DIV")
      //       div.setAttribute("style","grid-column:1/span 2")
      //       div.setAttribute("id","agenda-row")
      //       var row1=document.createElement("DIV");
      //       row1.setAttribute("class","row1")
      //       var span=document.createElement("SPAN");
      //       // span.setAttribute("class","badge btn btn-outline-info")
      //       span.setAttribute("style","letter-spacing:0.03cm;margin-bottom:15px;font-size:22px;")
      //       span.innerHTML="Agenda";
      //       row1.appendChild(span);
      //       var row2=document.createElement("DIV");
      //       row2.setAttribute("class","row2")
      //       row2.setAttribute("id","agenda-row-2")
      //       row2.setAttribute("style","color:gray;font-size:16px")
      //       var div2=document.createElement("SPAN")
      //       div2.setAttribute("class","input-group mb-3")
      //       // div2.setAttribute("style","width:50%")
      //       var div1=document.createElement("SPAN")
      //       div1.setAttribute("class","input-group-prepend")
      //       var span=document.createElement("SPAN")
      //       span.setAttribute("class","input-group-text")
      //       var fa=document.createElement("I");
      //       fa.setAttribute("class","	fas fa-file-alt	")
      //       span.appendChild(fa)
      //       div1.appendChild(span)
      //       div2.appendChild(div1)
      //       var input=document.createElement("INPUT")
      //       input.setAttribute("id","agenda-field")
      //       input.setAttribute("Style","border-radius: 10px;border-top-left-radius: 0px;border-bottom-left-radius: 0px;padding-left:5px;")
      //       input.setAttribute("type","text")
      //       input.setAttribute("autocomplete","off");
      //       input.setAttribute("required","")
      //       input.setAttribute("disabled","")
      //       input.setAttribute("value",this.myMeetings[x]['agenda'])
      //       div2.appendChild(input)
      //       row2.appendChild(div2)
      //       div.appendChild(row1);
      //       div.appendChild(row2)
      //       var hr=document.createElement("HR")
      //       div.appendChild(hr)
      //       body.appendChild(div)
  
              
            
      //       var div=document.createElement("DIV")
      //       div.setAttribute("id","start")
      //       var row1=document.createElement("DIV");
      //       row1.setAttribute("class","row1")
      //       var span=document.createElement("SPAN");
      //       // span.setAttribute("class","badge btn btn-outline-info")
      //       span.setAttribute("style","letter-spacing:0.03cm;margin-bottom:15px;font-size:22px;")
      //       span.innerHTML="Start Time";
      //       row1.appendChild(span);
            
      //         // div.setAttribute("style","grid-column:1/span 2")
      //         var sdate=weekday[startTime.getDay()]+" "+monthNames[startTime.getMonth()]+" "+startTime.getDate()+" "+startTime.getFullYear()
      //         var edate=weekday[endTime.getDay()]+" "+monthNames[endTime.getMonth()]+" "+endTime.getDate()+" "+endTime.getFullYear()
      //         var stime=startTime.getHours()+":"+startTime.getMinutes();
      //         var etime=endTime.getHours()+":"+endTime.getMinutes();
      //         var row2=document.createElement("DIV");
      //         row2.setAttribute("class","row2")
      //         row2.setAttribute("id","time-row")
      //         row2.setAttribute("style","color:gray;font-size:16px")
      //         var div2=document.createElement("Span")
      //           div2.setAttribute("class","input-group mb-3")
      //           // div2.setAttribute("style","width:50%")
      //           var div1=document.createElement("SPAN")
      //           div1.setAttribute("class","input-group-prepend")
      //           var span=document.createElement("SPAN")
      //           span.setAttribute("class","input-group-text")
      //           var fa=document.createElement("I");
      //           fa.setAttribute("class","fa fa-calendar fa-fw")
      //           span.appendChild(fa)
      //           div1.appendChild(span)
      //           div2.appendChild(div1)
      //           var input=document.createElement("INPUT")
      //           input.setAttribute("id","update-start-time")
      //           input.setAttribute("Style","border-radius: 10px;border-top-left-radius: 0px;border-bottom-left-radius: 0px;padding-left:5px;")
      //           input.setAttribute("type","text")
      //           input.setAttribute("autocomplete","off");
      //           input.setAttribute("required","")
      //           input.setAttribute("data-date-format","yyyy-mm-dd hh:ii")
      //           input.setAttribute("readonly","")
      //           input.setAttribute("value",sdate+" "+stime)
      //           div2.appendChild(input)
      //           row2.appendChild(div2)
      //           div.appendChild(row1);
      //           div.appendChild(row2)
      //           var hr=document.createElement("HR")
      //           div.appendChild(hr)
      //           body.appendChild(div)
      //           // $('#update-start-time').datetimepicker({autoclose: true});

      //           var div=document.createElement("DIV")
      //           div.setAttribute("id","end")
      //           var row1=document.createElement("DIV");
      //           row1.setAttribute("class","row1")
      //           var span=document.createElement("SPAN");
      //           // span.setAttribute("class","badge btn btn-outline-info")
      //           span.setAttribute("style","letter-spacing:0.03cm;margin-bottom:15px;font-size:22px;")
      //           span.innerHTML="End Time";
      //           row1.appendChild(span);
      //           var row2=document.createElement("DIV");
      //         row2.setAttribute("class","row2")
      //         row2.setAttribute("id","time-row")
      //         row2.setAttribute("style","color:gray;font-size:16px")
      //           var div2=document.createElement("SPAN")
      //           div2.setAttribute("class","input-group mb-3")
      //           // div2.setAttribute("style","width:50%")
      //           var div1=document.createElement("SPAN")
      //           div1.setAttribute("class","input-group-prepend")
      //           var span=document.createElement("SPAN")
      //           span.setAttribute("class","input-group-text")
      //           var fa=document.createElement("I");
      //           fa.setAttribute("class","fa fa-calendar fa-fw")
      //           span.appendChild(fa)
      //           div1.appendChild(span)
      //           div2.appendChild(div1)
      //           var input=document.createElement("INPUT")
      //           input.setAttribute("id","update-end-time")
      //           input.setAttribute("Style","border-radius: 10px;border-top-left-radius: 0px;border-bottom-left-radius: 0px;padding-left:5px;")
      //           input.setAttribute("type","text")
      //           input.setAttribute("autocomplete","off");
      //           input.setAttribute("required","")
      //           input.setAttribute("data-date-format","yyyy-mm-dd hh:ii")
      //           input.setAttribute("readonly","")
      //           // input.setAttribute("data-date",this.myMeetings[x]['end']+"Z")
      //           input.setAttribute("value",edate+" "+etime)
      //           div2.appendChild(input)
      //           row2.appendChild(div2)
      //         div.appendChild(row1);
      //         div.appendChild(row2)
      //         var hr=document.createElement("HR")
      //         div.appendChild(hr)
      //         body.appendChild(div)

      //       var div=document.createElement("DIV")
      //       div.setAttribute("id","room")
      //       div.setAttribute("style","grid-column:1/span 2;")
      //       var row1=document.createElement("DIV");
      //       row1.setAttribute("class","row1")
      //       var span=document.createElement("SPAN");
      //       span.setAttribute("style","letter-spacing:0.03cm;margin-bottom:15px;font-size:22px;")
      //       span.innerHTML="Room";
      //       row1.appendChild(span);

      //       var span=document.createElement("SPAN");
      //       span.setAttribute("style","visibility:hidden;float:right")
      //       span.setAttribute("id","edit-room");
      //       var sel=document.createElement("SELECT");
          
      //       sel.setAttribute("class","edit-room")
      //       sel.setAttribute("id","edit-room")
      //       sel.setAttribute("data-live-search","true");
      //       sel.setAttribute("data-style","btn-info")
      //       sel.setAttribute("multiple","")
      //       // sel.setAttribute("data-width","75%")
      //       sel.setAttribute("title","Available Rooms")
      //       sel.setAttribute("data-size","7")
      //       for(var t in this.nonmembers){
      //           var option=document.createElement("OPTION");
      //           option.setAttribute("id",this.nonmembers[t].empId)
      //           option.innerHTML=this.nonmembers[t].name;
      //           sel.appendChild(option)
      //       }
      //       span.appendChild(sel)
      //       row1.appendChild(span)
      //       div.appendChild(row1);
      //       var row2=document.createElement("DIV");
      //       row2.setAttribute("class","row2")
      //       row2.setAttribute("style","color:gray;font-size:16px")
      //       row2.innerHTML=this.myMeetings[x]['roomName']+"&nbsp;&nbsp;[ "+this.myMeetings[x]['specifications']+" ]";
      //       div.appendChild(row2)
      //       var hr=document.createElement("HR")
      //       div.appendChild(hr)
      //       body.appendChild(div)

      //       var div=document.createElement("DIV")
      //       div.setAttribute("id","members")
      //       div.setAttribute("style","grid-column:1/span 2")
      //       var row1=document.createElement("DIV");
      //       row1.setAttribute("class","row1")
      //       var span=document.createElement("SPAN");
      //       span.setAttribute("style","letter-spacing:0.03cm;margin-bottom:15px;font-size:22px;")
      //       span.innerHTML="Members";
      //       row1.appendChild(span);
      //       var span=document.createElement("SPAN");
      //       span.setAttribute("style","visibility:hidden;float:right")
      //       span.setAttribute("id","edit-members");
      //       var sel=document.createElement("SELECT");
          
      //       sel.setAttribute("class","edit-members")
      //       sel.setAttribute("id","edit-members")
      //       sel.setAttribute("data-live-search","true");
      //       sel.setAttribute("data-style","btn-info")
      //       sel.setAttribute("multiple","")
      //       sel.setAttribute("title","Participants")
      //       sel.setAttribute("data-size","7")
      //       sel.setAttribute("data-selected-text-format","count")
      //       for(var t in this.nonmembers){
      //           var option=document.createElement("OPTION");
      //           option.setAttribute("id",this.nonmembers[t].empId)
      //           if(this.myMeetings[x]['members'].find(el => el.empId === this.nonmembers[t].empId)){
      //             option.setAttribute("Selected","")

      //           }
      //           option.innerHTML=this.nonmembers[t].name;
      //           sel.appendChild(option)
      //       }
      //       span.appendChild(sel)
            
      //       row1.appendChild(span)
      //       div.appendChild(row1);
      //       var row2=document.createElement("DIV");
      //       row2.setAttribute("class","row2")
      //       row2.setAttribute("style","color:gray;font-size:16px")
      //       for(var y in this.myMeetings[x]['members']){
      //         if(y!=this.myMeetings[x]['members'].length-1){
      //           row2.innerHTML+=this.myMeetings[x]['members'][y]['name']+",&nbsp;&nbsp; ";
      //         }
      //         else{
      //           row2.innerHTML+=this.myMeetings[x]['members'][y]['name']+"&nbsp;&nbsp; ";
      //         }
              
      //       }
            
      //       div.appendChild(row2)
      //       // var hr=document.createElement("HR")
      //       // div.appendChild(hr)
      //       body.appendChild(div)

            

      //       content.appendChild(body)
             
      //       var footer=document.createElement("DIV")
      //       footer.setAttribute("class","modal-footer");
      //       footer.setAttribute("id","modal-footer");
      //       footer.setAttribute("style","padding:0px;")
      //       content.appendChild(footer)

      //       modalDialogCentered.appendChild(content)
      //       modalFade.appendChild(modalDialogCentered)
      //       meeting_modal.appendChild(modalFade)
            
      //       $("#meeting-popup").modal("show")
        
      //     }
      //   }
      // }
        
        
    
    }

   

    // document.getElementById("organizer-edit").remove();
    // var inp=document.createElement("INPUT")
    // inp.setAttribute("id","title")
    // inp.setAttribute("type","text")
    // inp.setAttribute("autocomplete","off");
    // inp.setAttribute("required","")
    // var e=document.getElementById("organizer-row1")
    // e.appendChild(inp)
              // var div=document.createElement("DIV")
              // var row1=document.createElement("DIV");
              // row1.setAttribute("class","row1")
              // var span=document.createElement("SPAN");
              // span.setAttribute("class","badge btn btn-info")
              // span.setAttribute("style","padding:7px;letter-spacing:0.03cm;margin-bottom:12px;")
              // span.innerHTML="Title";
              // row1.appendChild(span);
              // div.appendChild(row1);
              // var row2=document.createElement("DIV");
              // row2.setAttribute("class","row2")
              // // var inp=document.createElement("INPUT")
              // // inp.setAttribute("id","title")
              // // inp.setAttribute("type","text")
              // // inp.setAttribute("autocomplete","off");
              // // if(this.book){
              // //   inp.setAttribute("required","")
              // // }
              // // else{

              // // }
              // // row2.appendChild(inp)
              // // row2.innerHTML=`  <input type="text" class="form-control form-input" style="border-radius: 10px;height: 50px;" id="title" placeholder="Title" required autocomplete="off">`
              // row2.innerHTML=this.myMeetings[x]['title'];
              // div.appendChild(row2)
              // var hr=document.createElement("HR")
              // div.appendChild(hr)
              // body.appendChild(div)
    // get getMyMeetingsFunction(xhttp){
    //     this.myMeetings=JSON.parse(xhttp.responseText)
    //     console.log(myMeetings)
    //     return 0
    
    
        // for(var x in myMeetings){
        //     var startTime=new Date(myMeetings[x]['start'])
        //     var endTime=new Date(myMeetings[x]['end'])
        //     // console.log(myMeetings[x]['title'])
        //     if(this.start.getTime() === startTime.getTime() && info.event.end.getTime() == endTime.getTime() && info.event.title==myMeetings[x]['title']){
            
        //         if(startTime.getDate()==endTime.getDate() && startTime.getMonth()==endTime.getMonth() && startTime.getFullYear()==endTime.getFullYear())
        //         {   
        //             var date=weekday[startTime.getDay()]+" "+startTime.getDate()+"th "+monthNames[startTime.getMonth()] +" "+startTime.getFullYear()
        //             var time=startTime.getHours()+":"+startTime.getMinutes()+" to "+endTime.getHours()+":"+endTime.getMinutes();
        //         }
        //         if(myMeetings[x]['organizer']['empId']===sessionStorage.getItem("userId")){
        //           console.log("same")


        //         }
        //         else{
        //           console.log("not same")
        //           console.log(sessionStorage.getItem("userId"))
        //         }
        //         // console.log(new Date(myMeetings[x]['start']).getDate())
        //         var clickedEventTitle=document.getElementById("showEventTitle");
        //         clickedEventTitle.innerHTML=myMeetings[x]['title'].toUpperCase();
        //         var clickedEvent=document.getElementById("showEventBody")
        //         clickedEvent.innerHTML=""
        //         var ul=document.createElement("UL")
        //         ul.setAttribute("class","list-group list-group-flush");

        //         var list=document.createElement("LI");
        //         list.setAttribute("class","list-group-item")
        //         var row1=document.createElement("DIV");
        //         row1.setAttribute("class","row1")
        //         var span=document.createElement("SPAN");
        //         span.setAttribute("class","badge btn btn-outline-info")
        //         span.setAttribute("style","padding:7px;letter-spacing:0.03cm;margin-bottom:3px;")
        //         span.innerHTML="Organizer";
        //         row1.appendChild(span);
        //         if(myMeetings[x]['organizer']['empId']===sessionStorage.getItem("userId")){
        //           var i=document.createElement("I")
        //           i.setAttribute("class","far fa-edit")
        //           i.setAttribute("onclick","editClicked("+JSON.stringify(myMeetings[x])+")")
        //           i.setAttribute("style","cursor:pointer;float:right;font-size:20px;")
        //           row1.appendChild(i)
        //         }

                
        //         list.appendChild(row1);
        //         var row2=document.createElement("DIV");
        //         row2.setAttribute("class","row2")
        //         row2.innerHTML=myMeetings[x]['organizer']['name'];
        //         list.appendChild(row2)
        //         ul.appendChild(list)

        //         list=document.createElement("LI");
        //         list.setAttribute("class","list-group-item")
        //         row1=document.createElement("DIV");
        //         row1.setAttribute("class","row1")
        //         span=document.createElement("SPAN");
        //         span.setAttribute("class","badge badge-info")
        //         span.setAttribute("style","padding:5px;letter-spacing:0.03cm")
        //         span.innerHTML="Timings";
        //         row1.appendChild(span);
        //         list.appendChild(row1);
        //         row2=document.createElement("DIV");
        //         row2.setAttribute("class","row2")
        //         row2.innerHTML=date+"  &nbsp;&nbsp;  "+time
        //         list.appendChild(row2)
        //         ul.appendChild(list)

        //         list=document.createElement("LI");
        //         list.setAttribute("class","list-group-item")
        //         row1=document.createElement("DIV");
        //         row1.setAttribute("class","row1")
        //         span=document.createElement("SPAN");
        //         span.setAttribute("class","badge badge-info")
        //         span.setAttribute("style","padding:7px;letter-spacing:0.03cm")
        //         span.innerHTML="Agenda";
        //         row1.appendChild(span);
        //         list.appendChild(row1);
        //         row2=document.createElement("DIV");
        //         row2.setAttribute("class","row2")
        //         row2.innerHTML=myMeetings[x]['agenda']
        //         list.appendChild(row2)
        //         ul.appendChild(list)

        //         list=document.createElement("LI");
        //         list.setAttribute("class","list-group-item")
        //         row1=document.createElement("DIV");
        //         row1.setAttribute("class","row1")
        //         span=document.createElement("SPAN");
        //         span.setAttribute("class","badge badge-info")
        //         span.setAttribute("style","padding:7px;letter-spacing:0.03cm")
        //         span.innerHTML="Room";
        //         row1.appendChild(span);
        //         list.appendChild(row1);
        //         row2=document.createElement("DIV");
        //         row2.setAttribute("class","row2")
        //         row2.innerHTML=myMeetings[x]['roomName'] +"&nbsp;&nbsp;  [ "+myMeetings[x]['specifications']+" ]"
        //         list.appendChild(row2)
        //         ul.appendChild(list)

        //         list=document.createElement("LI");
        //         list.setAttribute("class","list-group-item")
        //         row1=document.createElement("DIV");
        //         row1.setAttribute("class","row1")
        //         span=document.createElement("SPAN");
        //         span.setAttribute("class","badge badge-info")
        //         span.setAttribute("style","padding:7px;letter-spacing:0.03cm")
        //         span.innerHTML="Members";
        //         row1.appendChild(span);
        //         list.appendChild(row1);
        //         row2=document.createElement("DIV");
        //         row2.setAttribute("class","row2");
        //         for(var e in myMeetings[x]['members']){
        //           row2.innerHTML+=myMeetings[x]['members'][e]['name']+", "
        //         }
        //         // row2.innerHTML=myMeetings[x]['roomName'] +"  [ "+myMeetings[x]['specifications']+" ]"
        //         list.appendChild(row2)
        //         ul.appendChild(list)
        //         // list=document.createElement("LI");
        //         // list.setAttribute("class","list-group-item")
        //         // row1=document.createElement("DIV");
        //         // row1.setAttribute("class","row1 dropdown btn-group")
        //         // span=document.createElement("BUTTON");
        //         // span.setAttribute("class","btn btn-info dropdown-toggle")
        //         // span.setAttribute("type","button")
        //         // span.setAttribute("id","participantDropdown")
        //         // span.setAttribute("data-toggle","dropdown")
        //         // span.setAttribute("aria-haspopup","true")
        //         // span.setAttribute("aria-expanded","false")
        //         // span.setAttribute("style","padding:7px;letter-spacing:0.03cm")
        //         // span.innerHTML="Members";
        //         // row1.appendChild(span);
        //         // var dropdownList=document.createElement("DIV")
        //         // dropdownList.setAttribute("class","dropdown-menu");
        //         // dropdownList.setAttribute("style","max-height:200px;overflow-y:scroll")
        //         // dropdownList.setAttribute("aria-labelledby","participantDropdown")
        //         // var li;
        //         // for(var y in myMeetings[x]['members']){
        //         //   li=document.createElement("LI")
        //         //   li.setAttribute("class","dropdown-item list-group-item")
        //         //   li.innerHTML=myMeetings[x]['members'][y]['name']
        //         //   dropdownList.appendChild(li)
        //         // }
        //         // row1.appendChild(dropdownList)
        //         // list.appendChild(row1);
        //         // ul.appendChild(list)

        //         clickedEvent.appendChild(ul)
        //         // clickedEvent.insertAdjacentHTML("afterbegin",`<div class="title" style="width:100%"><h4 class="" style="text-align:center">`+myMeetings[x]['title']+`</h4><div class="" style="text-align:center">`+date+`<div class="" style="text-align:center">`+time+`</div></div></div>`)
        //         // clickedEvent.insertAdjacentHTML("beforeend",`<div class="" style="display:grid;grid-template-columns:1fr 1fr;grid-row-gap:20px;justify-items:center;"><div>Organizer</div><div>`+myMeetings[x]['organizer']['name']+`</div><div>Agenda</div><div>`+myMeetings[x]['agenda']+`</div><div>Room</div><div>`+myMeetings[x]['roomName']+`</div></div>`)
        //     }
        // }
        
}


// var allMeetings=[]
// function getAllEventsFunction(xhttp){
//     allMeetings=JSON.parse(xhttp.responseText)
//     let meetingmodal=new meetingModal("Book Your Meeting here",true,false,false,allMeetings)
// }


  
    

        
     
      
       
        /* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
        <button class="btn btn-outline-dark" id="button1"  data-dismiss="modal">Submit</button> */
      
   

/* <form class="booking-form" name="booking-form" id="booking-form" onsubmit="return bookMeeting()">
            
            
            
            
<div class="form-group" >
  
  <input type="text" class="form-control form-input" style="border-radius: 10px;height: 55px;" id="title" placeholder="Title" required autocomplete="off">
  <!-- <label for="title" class="form-label">Title</label> -->
</div>
<div class="form-group" >
 
  <input type="text" class="form-control form-input" style="border-radius: 10px;height: 55px;" id="agenda" placeholder="Agenda" required autocomplete="off">
  <!-- <label for="agenda" class="form-label">Agenda</label> -->
</div>
<!-- <div class="form-group" style="text-align: center;margin-bottom: 0px;grid-row: 3;grid-column: 1;">
    <span style="font-size: 18px;">Add Members</span>
  </div> -->
<div class="form-group" >
    <div class="autocomplete" style="width: 100%;min-height: 44px">
        <!-- <label for="myTeam">Teams</label> -->
        <input type="text" class="form-control" style="border-radius: 10px;height: 55px;" id="myTeam" placeholder="Search Team" autocomplete="off">
    </div>
    <div id="teamListElement" class="teamListElement" style="max-height: 50px;overflow:scroll;overflow-x: hidden;padding:5px;"></div>
</div>

<div class="form-group">
    <div class="autocomplete" style="width: 100%;min-height: 44px">
        <!-- <label for="myTeamMembers">Members</label> -->
        <input type="text" class="form-control" style="border-radius: 10px;height: 55px;"  id="myTeamMembers" placeholder="Search Team Members" autocomplete="off">
    </div>
    <div id="memberListElement" class="memberListElement" style="max-height: 80px;overflow:scroll;overflow-x: hidden;padding:5px;"></div>
</div>
<!-- <div class="form-group" style="text-align: center;margin-bottom: 0px;">
<span style="font-size: 18px;">*Select slot for Date and Time from the calendar</span>
</div> -->
<div class="input-group mb-3">
    
    <div class="input-group-prepend" style="height: 55px;">
        <span class="input-group-text"><i class="fa fa-calendar fa-fw"></i></span>
      </div>
     
      <input type="text" class="form-control" style="border-radius: 10px;height: 55px;border-top-left-radius: 0px;border-bottom-left-radius: 0px;" data-date-format="yyyy-mm-dd hh:ii:ss" placeholder="Start Time" id="start-time" required autocomplete="off">

  </div>
  <div class="input-group mb-3">
    
      <div class="input-group-prepend" style="height: 55px;">
          <span class="input-group-text"><i class="fa fa-calendar fa-fw"></i></span>
        </div>
       
        <input type="text" class="form-control" style="border-radius: 10px;height: 55px;border-top-left-radius: 0px;border-bottom-left-radius: 0px;" data-date-format="yyyy-mm-dd hh:ii:ss" placeholder="End Time" id="end-time" required autocomplete="off">

    </div>
    <span id="error-msg" style="color: red;font:italic"></span>
  <!-- <div class="form-group" style="margin-bottom: 0px;grid-row: 5;grid-column: 2;">
      
      <input type="text" class="form-control form-input" style="border-radius: 10px;height: 55px;" data-date-format="yyyy-mm-dd hh:ii:ss" placeholder="End Time" id="end-time" required autocomplete="off">
      <label for="end-time" class="form-label">End Time</label>
    </div> -->
  
    
    <!-- <div class="form-group" style="margin-bottom:26px;grid-row: 6;grid-column: 1/span 2;">
      <label for="example-date-input" class="col-2 col-form-label">Date</label>
      
      <input type="text" value="2012-05-15 21:05" id="datetimepicker" data-date-format="yyyy-mm-dd hh:ii">
      
      </div> -->
    <div class="">
      <h1><button class="btn btn-outline-info" id="button1" style="width: 100px;">Submit</button></h1>
    </div>
</form> */


// if(startTime.getDate()==endTime.getDate() && startTime.getMonth()==endTime.getMonth() && startTime.getFullYear()==endTime.getFullYear())
//             { div.setAttribute("style","grid-column:1/span 2")
//               var date=weekday[startTime.getDay()]+" "+monthNames[startTime.getMonth()]+" "+startTime.getDate()+" "+startTime.getFullYear()
//               var time=startTime.getHours()+":"+startTime.getMinutes()+" to "+endTime.getHours()+":"+endTime.getMinutes();
//               var row2=document.createElement("DIV");
//               row2.setAttribute("id","time-row")
//               row2.setAttribute("class","row2")
//               row2.setAttribute("style","color:gray;font-size:16px")
//               row2.innerHTML=date+"&nbsp;&nbsp"+time;
//               div.appendChild(row1);
//               div.appendChild(row2)
//               var hr=document.createElement("HR")
//               div.appendChild(hr)
//             }
//             else{
//               div.setAttribute("style","grid-column:1/span 2")
//               var sdate=weekday[startTime.getDay()]+" "+monthNames[startTime.getMonth()]+" "+startTime.getDate()+" "+startTime.getFullYear()
//               var edate=weekday[endTime.getDay()]+" "+monthNames[endTime.getMonth()]+" "+endTime.getDate()+" "+endTime.getFullYear()
//               var stime=startTime.getHours()+":"+startTime.getMinutes();
//               var etime=endTime.getHours()+":"+endTime.getMinutes();