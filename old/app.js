var k=0;

           //*****FUNCTION TO GET THE INTIAL INPUT FROM THE USER AND BUILD THE MENUS BASED ON THE NUMBER SPEIFIED********//
           function init()
           {
                document.getElementById("sub").onclick=function(){
                    var citiesCount = parseInt(document.getElementById("city").value);
                    var xmlhttp = new XMLHttpRequest();
                    var url = "js/country.json";

                    xmlhttp.onreadystatechange = function() {
                        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                            var myArr = JSON.parse(xmlhttp.responseText);

                            //*****CALL THE BUILD MENU FUNCTION, SEND IT THE RESPONSE FROM THE JSON, AND THE NUMBER SPECIFIED NUMBER FROM THE USER****//
                            buildMenu(citiesCount, myArr);

                        }
                    };
                    xmlhttp.open("GET", url, true);
                    xmlhttp.send();

                };

            }
           window.onload= init;


           //****BUILD THE MENUS****//
           //**citiesCount- number the user specified****//
           //**myArr- rESPONSES FROM THE JSON FILE**//
           function buildMenu(citiesCount, myArr){
               var parent= document.getElementById("inputs") ;
               //*CLEAR THE INITIAL QUESTION AND INPUT FIELD**//
               while (parent.hasChildNodes()) {
                    parent.removeChild(parent.lastChild);
                }


               //***CREATE A MENU FOR EACH NUMBER SPECIFIED***//
               for(var i=0; i<citiesCount; i++){
                    var  parentDiv = document.createElement("div");
                    var select = document.createElement("select");

                    select.setAttribute('id','select'+i+"");
                    select.setAttribute('class','allSelects');
                    select.style.width="350px";
                    select.style.height="70px";

                    //create default option 'Select'
                    var options = document.createElement("option");
                    var text = document.createTextNode('Select the Location');
                    options.appendChild(text);
                    select.appendChild(options);

                   //***LOOP THROUGH THE RESPONSETEST, AND CREATE OPTIONS OUT OF THE COUNTRY NAME**//
                    for(var j=0; j< myArr.length; j++){
//                            console.log(myArr[i].countryName);
                        var options = document.createElement("option");
                        var text = document.createTextNode(myArr[j].countryName);
                        options.appendChild(text);
                        select.appendChild(options);

                    }

                   parentDiv.appendChild(select);
                   parent.appendChild(parentDiv);
                     select.onchange =function(){
				     //createTimeZone(this);

                    var chosen=document.getElementById(this.id).value; //console.log(chosen);
                     for(var x=0; x<myArr.length; x++){
                         //**Search for the selected option in the response text, and sen its zoneName to the createTimeZone function***//

                         if(myArr[x].countryName == chosen){
                             createTimeZone(myArr[x].countryCode, myArr[x].countryName);
                         }
                     }


				    }

               }//end of all menues

               //**ADD MORE MENUS BUTTON****//
               var addMore = document.createElement("input");

               addMore.setAttribute("type", "button");
               addMore.setAttribute("value", "Add More Cities");
               addMore.setAttribute("id", "addMore");

               parent.appendChild(addMore);

               addMore.onclick= function(){
                   createMoreCities(myArr);
               }


               //**FINISH BUTTON***//
              var finish = document.createElement("input");

               finish.setAttribute("type", "button");
               finish.setAttribute("value", "Find Convenient TIME");
               finish.setAttribute("id", "finish");

               parent.appendChild(finish);

               finish.onclick= sendAllSelectedOptions;
               //addMore.onclick= buildMenu(1, myArr);

           }

           //****THIS IS WHAT YOU NEED CHANDAN. YOU CAN GET ALL THE OPTIONS THAT WAS SELECTED FROM HERE*********//
function sendAllSelectedOptions(){
var allOptions = document.getElementsByClassName("allSelects");
// for(var i=0; i<allOptions.length; i++){
//    console.log("These are the values you need FOR COUNTRY NAME- "+allOptions[i].value);
//   }

//var allZones = document.getElementsByClassName("allZones");
var timeZone = document.getElementsByClassName("allZones");
for(var i=0; i<timeZone.length; i++){
console.log("These are the values you need FOR ALL TIME ZONES- "+timeZone[i].value);
    }

    var xhttp = new XMLHttpRequest();
var dataURL = 'http://api.timezonedb.com/v2/list-time-zone?key=LHW0VPUEFWFT&format=json';

//var timeZone = ["America/Los_Angeles", "Asia/Kolkata", "Africa/Lagos","America/New_York","Europe/London"];
//var timeZone = ["Asia/Kolkata", "America/New_York", "Asia/Kolkata","Asia/Kolkata","Asia/Kolkata"];

//var timeZone = JSON.parse(JSON.stringify(allZones));

/*for(var i=0;i<4;i++)
   {
      console.log("Getting Data " + allZones[i]);
   } */

var arrayLength = timeZone.length;
var allTime = [];


setInterval(function(){
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        var results = JSON.parse(xhttp.responseText);
        console.log(results);
        var localDate = new Date();
        //Local Time GMT Offset Correction
        var timeOffset = localDate.getTimezoneOffset();
        var hours = localDate.getHours();
        var minutes = "0" + localDate.getMinutes();
        var seconds = "0" + localDate.getSeconds();
        var localTime = hours + minutes.substr(-2);
        localTime = parseInt(localTime, 10);
        console.log("Local Time in 24hours format:  " + localTime);
        //Format 12 Hours
        var hoursAMPM = (hours >= 12 ? 'PM' : 'AM');
        hours = hours % 12 || 12;
        var formattedLocalTime = hours + ':' + minutes.substr(-2) + ' ' + hoursAMPM;
        document.getElementById("localTime").innerHTML = "Local time: " + formattedLocalTime;
        document.getElementById("cityTime").innerHTML = "The time in the selected Cities: ";
        var ul = document.getElementById("listTime");
        //ul.removeChild(li);
        var node = document.getElementById('listTime');
        while(node.firstChild){
            node.removeChild(node.firstChild);
        }
        for(var i =0;i<arrayLength;i++)
        {
            for(var j =0;j<424;j++)
            {
                if(timeZone[i].value == results.zones[j].zoneName)
                    {
                     //console.log(results.zones[j].zoneName);
                     //getFormattedTime(results.zones[j].timestamp);
                     //console.log(results.zones[j].timestamp);
                     //Time of location in UTC
                     var locationTime = results.zones[j].timestamp + (timeOffset * 60);
                     var locationDate = new Date(locationTime * 1000);
                     // Hours part from the timestamp
                     hours = locationDate.getHours();
                     // Minutes part from the timestamp
                     minutes = "0" + locationDate.getMinutes();
                     // Seconds part from the timestamp
                     seconds = "0" + locationDate.getSeconds();
                     // Will display time in 10:30:23 format
                     var newTime = hours + minutes.substr(-2); //24 hour format for calculation
                     newTime = parseInt(newTime, 10);
                     //console.log(newTime);
                     allTime[i] = newTime;
                     //Format 12 Hours
                     hoursAMPM = (hours >= 12 ? 'PM' : 'AM');
                     hours = hours % 12 || 12;
                     var formattedTime = hours + ':' + minutes.substr(-2) + ' ' + hoursAMPM;
                     //$('.time').html(formattedTime);
                      //allTime[i]  = formattedTime;
                      console.log(timeZone[i].value + " : " + formattedTime);
                      var li = document.createElement("li");
                      li.innerHTML = timeZone[i].value + " : " + formattedTime;
                      //li.appendChild(document.createTextNode(timeZone[i].value + " : " + formattedTime));
                      ul.appendChild(li);
                    }
            }

        }
      collabTime(allTime, localTime);

    }
};


xhttp.open("GET", dataURL, true);
xhttp.send();

}, 2000);


function collabTime(calcTime, localTime)
{
    //console.log("Local City: " + localTime);
    var collabCheck = [""];
    var collabStatus;
    if(localTime>=800 && localTime< 2200)
        {
            console.log("Local City: Collab");
            for(var i =0;i<arrayLength;i++)
                {
                    console.log(calcTime[i] );
                    if(calcTime[i]>=800 && calcTime[i] < 2200)
                    {
                          collabCheck[i] = "Collab";
                    }
                    else
                    {
                          collabCheck[i] = "No Collab";
                    }
                    console.log(collabCheck[i]);
                }
             for(var i =0;i<arrayLength-1;i++)
                {
                     if(collabCheck[i] == "Collab" && collabCheck[i] == collabCheck[i+1])
                         {
                             collabStatus = "true";
                         }
                     else
                         {
                             collabStatus = "false";
                             break;
                         }
                }
            console.log(collabStatus);
            document.getElementById("collabState").innerHTML = "Collaboration is possible";
        }
    else
        {
            console.log("Local City: No Collab");
            document.getElementById("collabState").innerHTML = "Collaboration is not possible";
        }
}


} //end of function




           //***Get time zone of the selected countryName**//

           function createTimeZone(timeZone, countryName){

              // console.log(timeZone);

               var xmlhttp = new XMLHttpRequest();
               var url = "js/zoneName.json";

                xmlhttp.onreadystatechange = function() {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        var myArr = JSON.parse(xmlhttp.responseText);


                        var select = document.createElement("select");

                        select.setAttribute('id','select'+i+"");
                        select.setAttribute('class','allZones');
                        select.style.width="350px";
                        select.style.height="70px";

                        var options = document.createElement("option");
                        var text = document.createTextNode('Select the TimeZone for '+countryName);
                        options.appendChild(text);
                        select.appendChild(options);

                        for(var i=0; i<myArr.length; i++){
                            //***get all time zones for the country selected****//
                           if(myArr[i].countryCode == timeZone){
                              // console.log(myArr[i].zoneName);

                                var options = document.createElement("option");
                                var text = document.createTextNode(myArr[i].zoneName);
                                options.appendChild(text);
                                select.appendChild(options);
                           }
                         var zoneParent= document.getElementById("zones") ;
                        zoneParent.appendChild(select);
                        }
                    }
                };
                xmlhttp.open("GET", url, true);
                xmlhttp.send();


           }


           //*****I would improve on this later, but for now, it is for creating more menus when you click on the add city button- *********//
           function createMoreCities(myArr){
                k++;
                  var  parentDiv = document.createElement("div");
                   var select = document.createElement("select");

                   select.setAttribute('id','newSelect'+k+"");
                   select.setAttribute('class','allSelects');
                   select.style.width="350px";
                   select.style.height="70px";

                    //create default option 'Select'
                    var options = document.createElement("option");
                    var text = document.createTextNode('Select the Location');
                    options.appendChild(text);
                    select.appendChild(options);


                    for(var j=0; j< myArr.length; j++){
                        //console.log(myArr[i].countryName);
                        var options = document.createElement("option");
                        var text = document.createTextNode(myArr[j].countryName);
                        options.appendChild(text);
                        select.appendChild(options);

                    }
                   parentDiv.appendChild(select);
                   //parent.appendChild(parentDiv);
                     select.onchange =function(){
				     //createTimeZone(this);

                        var chosen=document.getElementById(this.id).value; console.log(chosen);
                         for(var x=0; x<myArr.length; x++){
                             if(myArr[x].countryName == chosen){
                             createTimeZone(myArr[x].countryCode, myArr[x].countryName);
                         }
                     }


				    }


                    document.getElementById("inputs").insertBefore(parentDiv, document.getElementById("addMore"))

           }
