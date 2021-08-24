//==================================================================================
//                                Clock update
//==================================================================================
$( document ).ready(function() {

    refresh2();
    function refresh2(){
        // variables
        var currentT = new Date();                  // time 
        var timet = currentT.toLocaleTimeString(); // current time
        var time = timet.substr(0,4);             // hour & minute
        var Hour = timet.substr(0,2);            // Just Hours
        var minute = timet.substring(2,5);      // Just minute
        var day = currentT.getDay();           // Day
        var month = currentT.getMonth();      // Month
        var date = currentT.getDate();       // Day of the month

        var months = new Array(12); // Array to define every month with it number -1
        months[0] = "January";
        months[1] = "February";
        months[2] = "March";
        months[3] = "April";
        months[4] = "May";
        months[5] = "June";
        months[6] = "July";
        months[7] = "August";
        months[8] = "September";
        months[9] = "October";
        months[10] = "November";
        months[11] = "December";

        var weekdayf = new Array(7); // Array of first half of day name
        weekdayf[0] = "Sun";
        weekdayf[1] = "Mon";
        weekdayf[2] = "Tue";
        weekdayf[3] = "Wed";
        weekdayf[4] = "Thu";
        weekdayf[5] = "Fri";
        weekdayf[6] = "Sat";

        var weekdaye = new Array(7); // Array of last half of day name
        weekdaye[0] = "day";
        weekdaye[1] = "day";
        weekdaye[2] = "sday";
        weekdaye[3] = "nesday";
        weekdaye[4] = "rsday";
        weekdaye[5] = "day";
        weekdaye[6] = "urday";

        if (day == 6){
        $("#dayb").text(weekdayf[day-1].toUpperCase());   // day before
        $("#day").text(weekdayf[day].toUpperCase());      // today
        $("#day2").text(weekdayf[day].toUpperCase());     // today
        $("#daya").text(weekdayf[0].toUpperCase());       // first day in the week
        }else{
        if (day == 0 ){
            $("#dayb").text(weekdayf[6].toUpperCase());     // last day in the week
            $("#day").text(weekdayf[day].toUpperCase());    // today
            $("#day2").text(weekdayf[day].toUpperCase());      // today
            $("#daya").text(weekdayf[day+1].toUpperCase()); // day after
        }else{
            $("#dayb").text(weekdayf[day-1].toUpperCase()); // day before
            $("#day").text(weekdayf[day].toUpperCase());    // today
            $("#day2").text(weekdayf[day].toUpperCase());      // today
            $("#daya").text(weekdayf[day+1].toUpperCase()); // day after
        }
        } // end of if

        $("#dayNum").text(date);        //print day of month
        $("#month").text(months[month].toUpperCase()); // print months

        var sec;
        if (Hour >= 10){
        sec = timet.substring(5,8)
        }else{
        sec = timet.substring(5,7)
        }
        $("#sec").text(sec)
        if (timet.includes("AM")){
        $("#period").text("AM")
        }else{
        $("#period").text("PM")
        }
        if (Hour >= 10){
        var time = timet.substr(0,5);
        $("#clock").text(time)
        $("#hour").text(Hour)
        var minute = timet.substring(2,5)
        }else{
        $("#hour").text("0"+Hour)
        $("#clock").text("0"+time)
        var minute = timet.substring(2,4)
        }
        
        $("#minu").text(minute);

        setTimeout(function(){ refresh2() }, 1000);
    }


});