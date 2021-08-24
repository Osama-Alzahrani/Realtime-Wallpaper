
fetch('YOUR_API_KEY')
.then(response => response.json())
.then(data => {

  // Error code And msg of error
  window.code = data['cod'];    // code number 
  window.msg = data['message']; // error msg

  //data
  if(data['cod']!==401){
    var lonCoord = data['coord']['lon'];                 // lon
    var latCoord = data['coord']['lat'];                 // Temperature
    var timezone = data['timezone']
    var tempValue = data['main']['temp'];                 // Temperature
    var tempMax = data['main']['temp_max'];                 // Temperature
    var tempMin = data['main']['temp_min'];                 // Temperature
    var humidity = data['main']['humidity'];                 // Temperature
    var nameValue = data['name'];                         // name of the city
    var descrValue = data['weather'][0]['description'];   // description of the weather
    var IconValue = data['weather'][0]['icon'];           // weather status icon name
    var visibility = data['visibility'];                  // visibility (how far can you see)
    var windspeed = data['wind']['speed']                 // wind speed
    var sunSet = data['sys']['sunset'];                   // sunset time in Unix Timestamp
    var sunRise = data['sys']['sunrise'];                 // sunrise time in Unix Timestamp
  }else{
    nonExistentFunction();
  }


  // Send Data to done function after get it.
  done(lonCoord,latCoord,timezone,nameValue,tempValue,tempMax,tempMin,humidity,descrValue,IconValue,visibility,windspeed,sunRise,sunSet);
})

// Catch any error on API
.catch(function(error) {

    
    if (window.code == null){
      // jquery-confirm.min Advanced alert
      $.confirm({
          title: "error 400",
          content: "Please check your network Then press reload. or continue without network.",
          type: 'red',
          icon: 'fas fa-exclamation-triangle',
          draggable: false,
          buttons: {
              somethingElse: {
                text: 'Continue',
                btnClass: 'btn-warning',
                keys: ['enter', 'shift'],
            },
            Reload: {
              btnClass: 'btn-blue',
              action: function(){
                location.reload();
              }
            }
          }
      });
    }else if(window.msg == null){
      // jquery-confirm.min
      $.alert({
        title: "error "+window.code,
        content: "Something wrong"+error,
        type: 'red',
        icon: 'fas fa-exclamation-triangle',
        draggable: false,
        buttons: {
          reload: {
            btnClass: 'btn-blue',
            action: function(){
              location.reload();
            }
          }
        }
      });
    }else{
      // jquery-confirm.min
      $.alert({
        title: "error "+window.code,
        content: window.msg,
        type: 'red',
        icon: 'fas fa-exclamation-triangle',
        draggable: false,
        buttons: {
          reload: {
            btnClass: 'btn-blue',
            action: function(){
              location.reload();
            }
          }
        }
      });
    }
    
})
