//var jquery = require("jQuery");
var http = require("http");
var $ = "";

require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }

    $ = require("jquery")(window);
});

http.createServer(function(request, response) {
  console.log("before getTime");
  //getTime();
    var dataURL = 'http://api.timezonedb.com/v2/get-time-zone?key=LHW0VPUEFWFT&format=json&by=zone&zone=Asia/Kolkata';

         $.ajax({
        url: dataURL,
        dataType: 'json',
        success: function(){
            response.writeHead(200, {"Content-Type": "text/plain"});
  response.write(results);
  response.end();
                 console.log(results);
           var localDate = new Date();
           //Local Time GMT Offset Correction
           var timeOffset = localDate.getTimezoneOffset();
           //Time of location in UTC
           var locationTime = results.timestamp + (timeOffset*60);
           var locationDate = new Date(locationTime*1000);
           // Hours part from the timestamp
           var hours = locationDate.getHours();
           // Minutes part from the timestamp
           var minutes = "0" + locationDate.getMinutes();
           // Seconds part from the timestamp
           var seconds = "0" + locationDate.getSeconds();
           // Will display time in 10:30:23 format
           //Format 12 Hours
           var hoursAMPM = (hours >= 12?'PM':'AM');
hours = hours % 12 || 12;
           var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + ' ' + hoursAMPM;
           //$('.time').html(formattedTime);
           console.log(formattedTime);
             }});

    console.log("after ajax call");



}).listen(3000);

var getTime = function () {
    console.log("in getTime");
                  var dataURL = 'http://api.timezonedb.com/v2/get-time-zone?key=LHW0VPUEFWFT&format=json&by=zone&zone=Asia/Kolkata';

                         $.ajax({
                        url: dataURL,
                        dataType: 'json',
                             success: function(){
                                 console.log(results);
                           var localDate = new Date();
                           //Local Time GMT Offset Correction
                           var timeOffset = localDate.getTimezoneOffset();
                           //Time of location in UTC
                           var locationTime = results.timestamp + (timeOffset*60);
                           var locationDate = new Date(locationTime*1000);
                           // Hours part from the timestamp
                           var hours = locationDate.getHours();
                           // Minutes part from the timestamp
                           var minutes = "0" + locationDate.getMinutes();
                           // Seconds part from the timestamp
                           var seconds = "0" + locationDate.getSeconds();
                           // Will display time in 10:30:23 format
                           //Format 12 Hours
                           var hoursAMPM = (hours >= 12?'PM':'AM');
  hours = hours % 12 || 12;
                           var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + ' ' + hoursAMPM;
                           //$('.time').html(formattedTime);
                           console.log(formattedTime);
                             }});
                             /*.done(function(results){
                           console.log(results);
                           var localDate = new Date();
                           //Local Time GMT Offset Correction
                           var timeOffset = localDate.getTimezoneOffset();
                           //Time of location in UTC
                           var locationTime = results.timestamp + (timeOffset*60);
                           var locationDate = new Date(locationTime*1000);
                           // Hours part from the timestamp
                           var hours = locationDate.getHours();
                           // Minutes part from the timestamp
                           var minutes = "0" + locationDate.getMinutes();
                           // Seconds part from the timestamp
                           var seconds = "0" + locationDate.getSeconds();
                           // Will display time in 10:30:23 format
                           //Format 12 Hours
                           var hoursAMPM = (hours >= 12?'PM':'AM');
  hours = hours % 12 || 12;
                           var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + ' ' + hoursAMPM;
                           //$('.time').html(formattedTime);
                           console.log(formattedTime);
                        });*/
 //setTimeout(getTime,1000);
}

//getTime();
