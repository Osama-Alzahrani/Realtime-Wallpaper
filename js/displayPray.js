
function displayPray(selected,hoursRem,minuteRem){
    var id = window.setTimeout(function() {}, 0);
    while (id--) {
        window.clearTimeout(id); // will do nothing if no timeout with id is present
    }
    $("#prayer-notfication").show();
    setTimeout(function(){
        $("#prayer-notfication").css("top","1.5vw");
    }, 100);
    
    $(".P_title").text($(selected).children( "p:first-child" ).text());
    var bodyText;
    var textHour;
    var textMin;

    switch (hoursRem) {
    case 0:
        textHour = " "
        break;
    case 1:
        textHour = " ساعة "
        break;
    case 2:
        textHour = " ساعتان "
        break;
    default:
        textHour = " ساعات "
        break;
    }

    switch (minuteRem) {
    case 1:
        textMin = " "
        break;
    case 1:
        textMin = "دقيقة واحدة"
        break;
    case 2:
        textMin = "دقيقتان"
        break;
    case (minuteRem <= 10):
        textMin = "دقائق"
        break;
    default:
        textMin = " دقيقة"
        break;
    }


    if(diffrentTime < 0){
    bodyText = "باقي على الصلاة " + ((hoursRem <= 2)?textHour:hoursRem+textHour) + ((hoursRem !== 0)?' و ':' ')  + ((minuteRem <= 2)?textMin:minuteRem+textMin);
    }else if( diffrentTime <= 2700000){
    bodyText = "مر على الاذان " + ((hoursRem <= 2)?textHour:hoursRem+textHour) + ((hoursRem !== 0)?' و ':' ') + ((minuteRem <= 2)?textMin:minuteRem+textMin);
    }else{
    bodyText = "مر على الاذان " + ((hoursRem <= 2)?textHour:hoursRem+textHour) + ((hoursRem !== 0)?' و ':' ')  + ((minuteRem <= 2)?textMin:minuteRem+textMin);
    }
    $(".P_body").text(bodyText);

    setTimeout(function(){
        $("#prayer-notfication").css("top","-7vw");
        setTimeout(function(){
            $("#prayer-notfication").hide();
        }, 1000);
    }, 2000);
    
}