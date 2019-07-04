$(function(){
    $("#included-navbar").load("../navbar/navbar.html");
    
    $('#meetings').css('text-decoration', 'underline');
    // $('#meetings').css('color', 'black');
 

});

var teams=[];
var nonMembers=[];
// function editMembers(){
//     console.log("jekl")
// }

// $("div").on('click', "card-header.no-collapsable" ,function (e) {
//     console.log("hello")
//     e.stopPropagation();
// });
function postAddMembersFunction(xhttp,teamId,sendSelected,sendSelectedValue){
    // console.log(xhttp.responseText);
    var memberList=document.getElementById("memberList "+teamId);
    // console.log(memberList)
    for(var x in sendSelected){
        // console.log(sendSelected[x]);
        // console.log(sendSelectedValue[x])
        var list=document.createElement("LI")
        list.setAttribute("class","list-group-item memberList team-"+teamId)
        list.setAttribute('id',sendSelected[x]);
        list.appendChild(document.createTextNode(sendSelectedValue[x]));
        memberList.appendChild(list);
    }

}

function deleteMember(empId,teamId){
    // console.log("in delete")
    // console.log(ele);
    postDeleteMembers("/teams/"+teamId+"/remove",teamId,empId)


}
function deleteMemberFunction(xhttp,teamId,empId){
    var list=document.getElementsByClassName("team-"+teamId)
    // console.log(xhttp.responseText)
    // console.log(list)
    for(var x=0;x<list.length;x++){
        if(list[x]['id']===empId){
            list[x].parentElement.removeChild(list[x])
            return          
            // console.log(list[x]);
            // console.log(list[x].parentElement)
            // console.log(list[x].parentNode)
        }
    }
}
function getNonMembersFunction(xhttp,teamId) {
    // console.log(teamId)
    nonMembers=JSON.parse(xhttp.responseText);
    var y=document.getElementsByClassName("team-"+teamId)
    // console.log(sessionStorage.getItem("userId"))
    for(var j=0;j<y.length;j++){
        if(y[j].getAttributeNode("id").value != sessionStorage.getItem("userId")){
            y[j].insertAdjacentHTML("afterbegin",'<span><button type="button" class="btn btn-danger btn-sm" style="border-radius:16px;cursor:pointer" onclick="deleteMember(\''+y[j].getAttributeNode("id").value+'\',\''+teamId+'\')"><i class="fas fa-minus"></i></button>&nbsp;&nbsp;</span>')

        }
    }
    var p=y[0].parentElement;
    

        var div=document.createElement("DIV")
        
        div.setAttribute("id","addMember")
        div.setAttribute("style","font-size: 20px;padding:12px 20px;")
        
    var sel=document.createElement("SELECT");
   
    sel.setAttribute("class","addMember-team-"+teamId)
    sel.setAttribute("id","addMember-team-"+teamId)
    sel.setAttribute("data-live-search","true");
    sel.setAttribute("data-style","btn-success")
    sel.setAttribute("multiple","")
    sel.setAttribute("data-width","75%")
    sel.setAttribute("title"," + Add Member")
    sel.setAttribute("data-size","7")
    for(var t in nonMembers){
        
        var option=document.createElement("OPTION");
        option.setAttribute("id",nonMembers[t]['empId'])
        option.innerHTML=nonMembers[t]['name'];
        sel.appendChild(option)
    }
    div.appendChild(sel)
    p.insertBefore(div,p.firstChild)
    $('.addMember-team-'+teamId).selectpicker({
        actionsBox:true,
        size:"7"
    });
    var d=document.getElementById("main-team-"+teamId)
    for(var x in d.firstChild.childNodes){
        if(d.firstChild.childNodes[x].nodeName == 'SPAN'){
            if(d.firstChild.childNodes[x].getAttributeNode("id").value == 'edit'){
                // console.log("yes")
                d.firstChild.childNodes[x].innerHTML='<i class="fas fa-check" style="cursor: pointer;" onclick="doneClicked('+teamId+')">&nbsp;Save</i>'

            }
        }
    }
    // d.getElementById("edit").innerHTML='<i class="fas fa-check" style="cursor: pointer;" onclick="doneClicked('+teamId+')">&nbsp;Save</i>'
}

function editClicked(teamId){
    getNonMembers("/teams/"+teamId+"/add",teamId);
    // console.log(nonMembers)
   
    //     // ul[i].insertAdjacentHTML("afterbegin",'<span><button type="button" class="btn btn-outline-danger btn-sm" style="border-radius:16px;"><i class="fas fa-minus"></i></button>&nbsp;&nbsp;</span>')
        
    //     var y=document.getElementsByClassName("team-"+teamId)
    //     for(var j=0;j<y.length;j++){
    //         y[j].insertAdjacentHTML("afterbegin",'<span><button type="button" class="btn btn-outline-danger btn-sm" style="border-radius:16px;"><i class="fas fa-minus"></i></button>&nbsp;&nbsp;</span>')
    //     }
    
    // // var li=document.createElement("LI")
    // // li.setAttribute("Class","list-group-item")
    // // li.setAttribute("id","addMember")
    // // li.setAttribute("style","font-size: 20px;")
    // // var icon=document.createElement("I")
    // // icon.setAttribute("class","fas fa-plus")
    // // li.appendChild(icon)
    // var sel=document.createElement("SELECT");
   
    // sel.setAttribute("class","selectpicker")
    // sel.setAttribute("data-live-search","true");
    // sel.setAttribute("data-style","btn-success")
    // for(var t in nonMembers){
    //     console.log("in t nonmember")
    //     var option=document.createElement("OPTION");
    //     option.setAttribute("id",nonMembers[t]['id'])
    //     option.innerHTML=nonMembers[t]['name'];
    //     sel.appendChild(option)
    // }
    // document.getElementById("addMember").appendChild(sel)
    // // var option=document.createElement("OPTION");
    // // option.innerHTML="Hot Dog";
    // // sel.appendChild(option)
    // // var option=document.createElement("OPTION");
    // // option.innerHTML="Ht Dog";
    // // sel.appendChild(option)
    // // var option=document.createElement("OPTION");
    // // option.innerHTML="Hot Dg";
    // // sel.appendChild(option)
    // // var option=document.createElement("OPTION");
    // // option.innerHTML="Hot Do";
    // // sel.appendChild(option)
    // // li.appendChild(sel)
    // // ul.insertBefore(li,ul.firstChild)
    // // ul.insertAdjacentHTML('afterbegin', '<li class="list-group-item" id="addMember" style="font-size: 20px;"><i class="fas fa-plus"></i>&nbsp;&nbsp;&nbsp;<select class="selectpicker" data-live-search="true" multiple><option data-tokens="ketchup mustard">Hot Dog</option><option data-tokens="mustard">Burger</option><option data-tokens="frosting">Sugar</option></select></li>');
    // document.getElementById("addMember").style.display="block";
    // // var x = document.getElementById(teamId).children;
    // // var i;
    // // for (i = 0; i < x.length; i++) {
    // //     x[i].insertAdjacentHTML("afterbegin",'<span><button type="button" class="btn btn-outline-danger btn-sm" style="border-radius:16px;"><i class="fas fa-minus"></i></button>&nbsp;&nbsp;</span>')
    // // }
    // document.getElementById("edit").innerHTML='<i class="fas fa-check" style="cursor: pointer;" onclick="doneClicked('+teamId+')">&nbsp;Save</i>'
}

function doneClicked(teamId){
    var d=document.getElementById("main-team-"+teamId)
    for(var x in d.firstChild.childNodes){
        if(d.firstChild.childNodes[x].nodeName == 'SPAN'){
            if(d.firstChild.childNodes[x].getAttributeNode("id").value == 'edit'){
                // console.log("yes")
                d.firstChild.childNodes[x].innerHTML='<i class="far fa-edit" style="cursor: pointer;" onclick="editClicked('+teamId+')"></i>'

            }
        }
    }
    // document.getElementById("edit").innerHTML='<i class="far fa-edit" style="cursor: pointer;" onclick="editClicked('+teamId+')"></i>'
    // var selected =[]
    // console.log($('select.addMember-team-"+teamId).value)
    var selected=[]
    var sendSelected=[]
    var sendSelectedValue=[]
    selected=$(".addMember-team-"+teamId).children("option:selected");
    for(var v=0;v<selected.length;v++){
        sendSelected.push(selected[v]['id'])
        sendSelectedValue.push(selected[v].innerHTML)
        // console.log(selected[v].innerHTML)
    }
    // console.log(sendSelected)
    postAddMembers("/teams/"+teamId+"/addmembers",teamId,sendSelected,sendSelectedValue)
    var e=document.getElementById("adminList "+teamId).firstChild
    if(e.nodeName=='DIV'){
        if(e.getAttributeNode("id").value == 'addMember'){
            e.remove()
        }
    }
    // document.getElementById("addMember").remove();
    var x = document.getElementsByClassName("team-"+teamId)
    var i;
    
    for (i = 0; i < x.length; i++) {
        if(x[i].getAttributeNode("id").value != sessionStorage.getItem("userId")){
            x[i].removeChild(x[i].firstChild)
        }
    }

}
function getMyTeamsFunction(xhttp) {
    
    teams=JSON.parse(xhttp.responseText);
    
    var disp=document.getElementById("teamsDisplay");
        if(teams.length===1){
            console.log("in 1")
            disp.setAttribute("style","display: grid;grid-template-columns:1fr 1fr 1fr;grid-column-gap: 100px;grid-row-gap: 80px;")
        }
        else if(teams.length===2){
            console.log("in 2")
            disp.setAttribute("style","display: grid;grid-template-columns:513px 513px;grid-column-gap: 150px;grid-row-gap: 80px;justify-content:center")
        }
        else{
            console.log("in else")
            disp.setAttribute("style","display: grid;grid-template-columns:1fr 1fr 1fr;grid-column-gap: 100px;grid-row-gap: 80px;")
        }
    for(var x in teams){
        // style="display: grid;grid-template-columns:1fr 1fr 1fr;grid-column-gap: 100px;grid-row-gap: 80px;"
        // console.log(teams.length)
        
        var card=document.createElement("DIV");
        card.setAttribute("class","card border-info mb-3")
        if(teams.length===1){
            console.log("in 1")
            card.setAttribute("style","grid-column-start:2")
        }
        card.setAttribute("id","main-team-"+teams[x]['teamId'])
        var cardHeader=document.createElement("DIV");
        cardHeader.setAttribute("class","card-header")
        cardHeader.setAttribute("id",teams[x]['teamId'])
        cardHeader.setAttribute("style","background-color: #184263;color: white;font-family: 'luzro';font-size: 25px;")
        cardHeader.innerHTML=teams[x]['teamName']

        var editSpan=document.createElement("SPAN");
        editSpan.setAttribute("id","edit")
        editSpan.setAttribute("style","float:right;")

        if(teams[x]['isAdmin']){
            var i=document.createElement("I")
            i.setAttribute("class","far fa-edit")
            i.setAttribute("onclick","editClicked("+teams[x]['teamId']+")")
            i.setAttribute("style","cursor:pointer")
            editSpan.appendChild(i)
        }
        

        cardHeader.appendChild(editSpan)
        card.appendChild(cardHeader)

        var cardBody=document.createElement("DIV");
        cardBody.setAttribute("class","card-body text-info")

        var cardTitle=document.createElement("H5");
        cardTitle.setAttribute("class","card-title")
        cardTitle.setAttribute("style","font-size: 25px;")
        cardTitle.innerHTML="Team Members";
        cardBody.appendChild(cardTitle)

        var p=document.createElement("P")
        p.setAttribute("class","card-text")
        p.setAttribute("id","card-text")
        p.setAttribute("style","height:500px;max-height:500px;overflow-y:scroll")
        

        var adminList=document.createElement("UL");
        adminList.setAttribute("class","list-group list-group-flush "+teams[x]['teamId'])
        adminList.setAttribute("id","adminList "+teams[x]['teamId'])
    
            for(var i in teams[x]['teamAdmins']){
                var list=document.createElement("LI")
                list.setAttribute("class","list-group-item adminList team-"+teams[x]['teamId'])
                list.setAttribute('id',teams[x]['teamAdmins'][i]['empId']);
                list.appendChild(document.createTextNode(teams[x]['teamAdmins'][i]['name']));
                var badge=document.createElement("SPAN")
                badge.setAttribute("class","badge badge-info badge-pill")
                badge.setAttribute("style","float:right;")
                badge.innerHTML="Team Admin"
                list.appendChild(badge)
                adminList.appendChild(list);
            }
            p.appendChild(adminList)
    
        var memberList=document.createElement("UL");
            memberList.setAttribute("class","list-group list-group-flush "+teams[x]['teamId'])
            memberList.setAttribute("id","memberList "+teams[x]['teamId'])
            for(var i in teams[x]['teamMembers']){
                var list=document.createElement("LI")
                list.setAttribute("class","list-group-item memberList team-"+teams[x]['teamId'])
                list.setAttribute('id',teams[x]['teamMembers'][i]['empId']);
                list.appendChild(document.createTextNode(teams[x]['teamMembers'][i]['name']));
                memberList.appendChild(list);
            }
            p.appendChild(memberList)
            cardBody.appendChild(p)
            card.appendChild(cardBody)

            disp.appendChild(card)
    }
}
document.addEventListener('DOMContentLoaded', function() {
    getMyTeams("teams/my");
    
})