/*
╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱
      
      𝐴𝑢𝑡ℎ𝑜𝑟 : Osama Alzahrani
      𝑣𝑒𝑟𝑠𝑖𝑜𝑛: 0.1
      𝑝𝑟𝑜𝑗𝑒𝑐𝑡: 𝑊𝑎𝑙𝑙𝑝𝑎𝑝𝑒𝑟 𝑒𝑛𝑔𝑖𝑛𝑒

╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱
*/
//==================================================================================
//                                get Data from API
//==================================================================================


//==================================================================================
//                                Start real code
//==================================================================================


$( document ).ready(function() {
  
  $(".moreWeather").fadeOut(1);
  var toggleWeather = false;
  $(".weather").attr('data-after','˅'); 
  

  $( ".weather" ).on( "click", function(e) {
    if (e.offsetY > e.target.offsetHeight) {
      if(toggleWeather === false){
        $(this).attr('data-after','˄'); 
        $(this).css("height","12.8vw");
        $(".rectangle").css("height","6.7vw");

        $(".moreWeather").fadeToggle(1000);
        toggleWeather = true;
      }else{
        $(this).attr('data-after','˅'); 
        $(this).css("height","6.8vw");  
        $(".moreWeather").fadeToggle(200);


        toggleWeather = false;
      }
    }
  } );

  var togglePrayer = false;
  $( ".prayer-time" ).on( "click", function(e) {
    if (e.offsetY > e.target.offsetHeight) {
      if(togglePrayer === false){
        $(this).css("top","0vw");

        togglePrayer = true;
      }else{ 
        $(this).css("top","-10vw");  
        $(this).css('--myVar','10vw');


        togglePrayer = false;
      }
    }
  } );
});

function toArabicNumeral(en) {
  return ("" + en).replace(/[0-9]/g, function(t) {
      return "٠١٢٣٤٥٦٧٨٩".slice(+t, +t+1);
  });
}


function done(lon,lat,timezone,name,temp,temp_max,temp_min,humidity,descr,ico,visi,wind,sunRise,sunSet){

  
  /////////////////////////////////////////////////////////////////
  //                          Prayer                            //
  /////////////////////////////////////////////////////////////////
  prayTimes.setMethod('Makkah');
  var times = prayTimes.getTimes(new Date(), [lat, lon], 3,0,'12h');
  console.log(times);
  
  $("#fajr_time").text(times.fajr);
  $("#dhuhr_time").text(times.dhuhr);
  $("#asr_time").text(times.asr);
  $("#maghrib_time").text(times.maghrib);
  $("#isha_time").text(times.isha);


  //----------------( if Prayer card is clicked )----------------//

  $( ".prayer" ).on( "click", function() {
    var time = new Date();
    var PT = new PrayTimes('Makkah');
    var prTimes = PT.getTimes(new Date(), [lat, lon]);
    selP = $(this).attr("name");
    var sp = (prTimes[selP]).split(':');

    var date = new Date(time.getFullYear(), time.getMonth(), time.getDate(), sp[0], sp[1], 0);

    var isha_sp = (prTimes.isha).split(':');
    const ishaTime = new Date(time.getFullYear(), time.getMonth(), time.getDate(), isha_sp[0], isha_sp[1], 0);

    diffrentTime = time - date;


    diffrentTimeIsha = time - ishaTime;


    if(diffrentTimeIsha > 0 && selP == "fajr"){
      date.setDate(date.getDate() + 1);
      diffrentTime = time - date;
    }
    
    hoursRem = Math.abs(parseInt(diffrentTime / 3600000));
    minuteRem = Math.abs(parseInt(diffrentTime % 3600000 / 60000));

    TimeLeft = hoursRem  + ':' + minuteRem;

    displayPray(this,hoursRem,minuteRem);

  } );

  /////////////////////////////////////////////////////////////////
  //                          Weather                            //
  /////////////////////////////////////////////////////////////////
  $("#CityName").text(name);
  $("#description").text(descr);
  $("#max_temp").text('°'+temp_max);
  $("#min_temp").text('°'+temp_min);
  $("#temp").text('°'+temp);
  $("#hum").text('%'+humidity);


  /////////////////////////////////////////////////////////////////
  //                  Movement of sun / moon                     //
  /////////////////////////////////////////////////////////////////
  

    function refresh(){
    var set = sunSet *1000;    //convert it to millisecond
    var rise = sunRise *1000;  //convert it to millisecond
    var timeNow = Date.now();  // Current time 

    var diff_rise_set = set - rise;  // calculate difference between sunrise and sunset 

    var diff_Set = (set-timeNow);      // in the morning we need to calculate diff between Current time and sunset
    var diff_A_set = (timeNow-set);   // after Sunset we need to recalculate diff between Current time and sunset
    var diff_rise = (rise-timeNow);  // after oneday (12:00 AM) we need to recalculate diff between Current time and sunrise
    
    var dayafter = 86400000 - diff_rise_set; // to get old diff -- one Day equall : 86400000ms

    var status_morning = (diff_Set / diff_rise_set *98.958); // to make value in range between (0 <--> 1900) -> Pixel to move sun/moon Left or right
    var status_night = (diff_A_set / dayafter *98.958);     // to make value in range between (0 <--> 1900) -> Pixel to move sun/moon Left or right
    var status_after_day = (diff_rise / dayafter *98.958); // to make value in range between (0 <--> 1900) -> Pixel to move sun/moon Left or right

      ////////////////////////////////////

    function parseMillisecondsIntoReadableTime(milliseconds){
      //Get hours from milliseconds
      var hours = milliseconds / (1000*60*60);
      var absoluteHours = Math.floor(hours);
      var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;
    
      //Get remainder from hours and convert to minutes
      var minutes = (hours - absoluteHours) * 60;
      var absoluteMinutes = Math.floor(minutes);
      var m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;
    
      //Get remainder from minutes and convert to seconds
      var seconds = (minutes - absoluteMinutes) * 60;
      var absoluteSeconds = Math.floor(seconds);
      var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;
    
    
      return h + ':' + m + ':' + s;
    }
    
    var time_sunset = parseMillisecondsIntoReadableTime(diff_Set);
    var time_sunrise = parseMillisecondsIntoReadableTime(diff_rise);
    //console.log(time_sunset);
    //console.log(time_sunrise);
    

    var sunset_pixels = (status_morning);                 // we send data to updateTime function to update it and return it
    var after_sunset_pixels = (98.958 - status_night);      // we send data to updateTime function to update it and return it
    var sunrise_pixels = (status_after_day);              // we send data to updateTime function to update it and return it

    //===========================|  move  |==============================
    // make sun/moon  move in arc path see this: (https://cutt.ly/CQEnDtS)
    
    var heightX = (diff_Set / diff_rise_set )*33.333; 
    var heightY = (diff_A_set / dayafter )*33.333;
    var heightZ = (diff_rise / dayafter )*33.333;

    // also this will change moon sun size to be more realistic
    var widthX = (diff_Set / diff_rise_set )*20.833;
    var widthY = (diff_A_set / dayafter )*9.375;
    var widthZ = (diff_rise / dayafter )*9.375;
    if (98.9583 >= sunset_pixels > 0 && diff_Set > 1 ){
      const str_a = sunset_pixels.toString();
      const result = Number(str_a.slice(0, 6));
            if(widthX > 10.4166){
                  widthX = widthX-20.8333;
                  $('#status').css({
                    'width':(Math.abs(widthX-10.4166))+"vw",
                    'top':(Math.abs(heightX-16.666))+"vw",
                    'left':(sunset_pixels+5.208)+"vw"
                  });
            }else{
                  $('#status').css({
                    'left':(result+5.208)+"vw",
                    'top':(Math.abs(heightX-16.666))+"vw",
                    'width':(Math.abs(widthX+10.4166))+"vw"
                  });
            }

      $("#status").attr("src","css/images/BGsun.png");
    }else if(98.9583 >= after_sunset_pixels > 0 && diff_A_set > 1){

            if(widthY > 4.6875){
              widthY = widthY-9.375;
              $('#status').css({
                'width':(Math.abs(widthY-4.6875))+"vw",
                'top':(Math.abs(heightY-16.6666))+"vw",
                'left':(after_sunset_pixels)+"vw"
              });
            }else{
              $('#status').css({
                'left':(after_sunset_pixels)+"vw",
                'top':(Math.abs(heightY-16.6666))+"vw",
                'width':(Math.abs(widthY+4.6875))+"vw"
              });
            }

      $("#status").attr("src","css/images/BGnight.png");
    }else if(98.9583 >= sunrise_pixels > 0 && diff_rise > 1){

            if(widthZ > 4.6875){
              widthZ = widthZ-9.375;
              $('#status').css({
                'width':(Math.abs(widthZ-4.6875))+"vw",
                'top':(Math.abs(heightX-16.6666))+"vw",
                'left':(sunrise_pixels)+"vw"
              });
            }else{
              $('#status').css({
                'left':(sunrise_pixels)+"vw",
                'top':(Math.abs(heightZ-16.6666))+"vw",
                'width':(Math.abs(widthZ+4.6875))+"vw"
              });
            }
            
          $("#status").attr("src","css/images/BGnight.png");
    }

    //========================================| Controll background |=======================================//

      const timebRise = 1200000;
      const timebset = 1200000;
      var beforeSet = (set -timebset);//2400000 - > 40 min
      var beforeRise= (rise -timebRise);//2400000 - > 40 min

      //sunrise: 1628994988
      //sunset: 1629042058

      //var timeNow = 1628994988000; //sunrise
      //var timeNow = 162904218000; //sunset
      if (set > timeNow && rise < timeNow){
        $("body").css({"background-color":"rgb(80, 187, 252)"});
        // check if time > beforeSet to start compare
        if (timeNow >= beforeSet) {// if it just time bigger
          //check again if time bigger 1200000
          backgeround_changer("night");
          //console.log("night")
        }
      }

      if (rise > timeNow){

        
        $("body").css({"background-color":"rgb(1, 16, 26)"});
        
        // check if time > beforerise to start compare
        if (timeNow >= beforeRise) {// if it just time bigger
          //check again if time bigger 1200000
          backgeround_changer("day");
          //console.log("day")
        }
      }else{
        if(set < timeNow){
          $("body").css({"background-color":"rgb(1, 16, 26)"});
        }
      }
      //========================================| Background Changer |=========================================//
      /*var redDay=0;
      var greenDay=16;
      var blueDay=26;*/
 

      /*
      var red=80;
      var green=187;
      var blue=252;*/



      function backgeround_changer(status){

        var red = ((timeNow-beforeSet)/timebset)*1;
        var green = ((timeNow-beforeSet)/timebset)*16;
        var blue = ((timeNow-beforeSet)/timebset)*26;

        var red2 = ((timeNow-beforeSet)/timebset)*80;
        var green2 = ((timeNow-beforeSet)/timebset)*187;
        var blue2 = ((timeNow-beforeSet)/timebset)*252;

        var redDay = ((timeNow-beforeRise)/timebRise)*80;
        var greenDay = ((timeNow-beforeRise)/timebRise)*187;
        var blueDay = ((timeNow-beforeRise)/timebRise)*252;


        if(status == "night"){

          if (red >= 97){
            red = 97;
          }
          if (green >= 195){
            green = 195;
          }
          
          $("body").css({"background-color":"rgb("+((80-red2)+red)+", "+((187-green2)+green)+", "+((252-blue2)+blue)+")"});
        }else{
        
          if (redDay <= 0){
            redDay = 0;
          }
          if (greenDay <= 52){
            greenDay = 52;
          }
          if (blueDay <= 78){
            blueDay = 78;
          }
          $("body").css({"background-color":"rgb("+(redDay)+", "+(greenDay)+", "+(blueDay)+")"});
        }
      }


      var t = setTimeout(function(){ refresh() }, 500); //refresh

  }// end of refresh function
  
  refresh(); // start refrech function in the beginning
}// end of done function




/*
backgeround_changer2();
var rgb1=80;
var rgb2=187;
var rgb3=252;
function backgeround_changer2(){
  rgb1 = (parseInt(rgb1 -= 1));
  rgb2 = (parseInt(rgb2 -= 1));
  rgb3 = (parseInt(rgb3 -= 1));

  if (rgb1 <= 0){
    rgb1 = 0;
  }
  if (rgb2 <= 52){
    rgb2 = 52;
  }
  if (rgb3 <= 78){
    rgb3 = 78;
  }

  $("body").css({"background-color":"rgb("+(rgb1-8)+", "+(rgb2-20)+", "+(rgb3-26)+")"});
  var t = setTimeout(function(){ backgeround_changer2(); }, 100); 
}
*/

// Drag