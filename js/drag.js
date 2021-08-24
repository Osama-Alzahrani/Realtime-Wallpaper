$( function() {
    
    $('.draggableOBJ').draggable({
      drag: function( event, ui ) {
      stopAnimation(event.target)
      

      // Keep the left edge of the element
      // at least 100 pixels from the container
      let viewportHeight = window.innerHeight;
      let viewportWidth = window.innerWidth;

      let borderHeight = viewportHeight - (event.target.offsetHeight/2);
      let borderWidth = viewportWidth - (event.target.offsetWidth/2);

      ui.position.left = Math.max( (event.target.offsetWidth/2), ui.position.left);
      ui.position.left = Math.min( borderWidth, ui.position.left);
      ui.position.top = Math.max( (event.target.offsetHeight/2), ui.position.top );
      ui.position.top = Math.min( borderHeight, ui.position.top );

        //console.log(event.target);
        
      localStorage.setItem(event.target+"x", ui.position.left);
      localStorage.setItem(event.target+"y", ui.position.top);

      },
      stop: function( event, ui ) {
          startAnimation(event.target);
      }
      }
      
      );
      
      
    

      $( ".draggableOBJ" ).dblclick(function(e) {
          localStorage.removeItem(e.currentTarget+"x");
          localStorage.removeItem(e.currentTarget+"y");
          $(e.currentTarget).removeAttr("style");
      });

      $('.draggableOBJ').on('click', function(e) {
          e.preventDefault();

          if(e.ctrlKey) {
            stopAnimation(e.currentTarget)
            $(this).contextMenu();
              //console.log("Ctrl+Click");
          // your code goes here...
          }
      
          // or $('.context-menu-one').trigger("contextmenu");
          // or $('.context-menu-one').contextMenu({x: 100, y: 100});
      });
    
  } );


  function stopAnimation(element)
  {
      $(element).css("-webkit-animation", "none");
      $(element).css("-moz-animation", "none");
      $(element).css("-ms-animation", "none");
      $(element).css("animation", "none");
  }

  function startAnimation(element)
  {
      $(element).css("-webkit-animation", "");
      $(element).css("-moz-animation", "");
      $(element).css("-ms-animation", "");
      $(element).css("animation", "");
  }