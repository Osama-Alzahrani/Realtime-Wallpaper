$(function(){
    var width = $(window).width();
    var height = $(window).height();
    $.contextMenu({
        selector: '.context-menu-one', 
        className: 'data-title',
        callback: function(key, options) {
            var m = "clicked: " + key;
            window.console && console.log(m) || alert(m); 
        },
        items: {
            // <input type="text">
            test: {
                type: 'html', 
                html: '<span>Posistion of elemnt</span>', 
                className:"center bold",
            },
            x_location: {
                name: "X:", 
                inputclass: "form-control",
                customAtt: 'data-numspin numspin-input-scheme="flat" numspin-input-style="rounded" step="1"',
                type: 'number',
                labelClass:"centerLabel",
                max: width,
                min: 10,
                val:10
            },
            y_location: {
                name: "Y:", 
                inputclass: "form-control",
                customAtt: 'data-numspin numspin-input-scheme="flat" numspin-input-style="rounded" step="1"',
                type: 'number',
                labelClass:"centerLabel",
                max: height,
                min: 10,
                val:10
            },
            "sep1": "---------",
            key: {
                name: "Save",
                className:"center bold",
                callback: function(itemKey, opt){ 
                    // Alert the key of the item and the trigger element's id.
                   // alert("Clicked on " + itemKey + " on element " + opt.$trigger.attr("id"));

                    var $this = this;
                    $.contextMenu.getInputValues(opt, $this.data());

                   // console.log(opt.$trigger.css("width", opt.items.y_location.val));

                    if($this.data().y_location > opt.items.y_location.max || $this.data().x_location > opt.items.x_location.max 
                    ||$this.data().x_location < opt.items.x_location.min || $this.data().y_location < opt.items.y_location.min){
                        alert("error");
                    }else{
                       // test($this.data());
                       localStorage.setItem(opt.$trigger[0]+"x", $this.data().x_location);
                       localStorage.setItem(opt.$trigger[0]+"y", $this.data().y_location);



                       opt.$trigger.css("left", localStorage.getItem(opt.$trigger[0]+"x")+'px')
                       opt.$trigger.css("top", localStorage.getItem(opt.$trigger[0]+"y")+'px')
                       /*
                       opt.$trigger.css("left", parseInt($this.data().x_location)+'px')
                       opt.$trigger.css("top", parseInt($this.data().y_location)+'px')
                       */
                        //console.log();
                        //console.log($this.data().x_location);
                        return true
                    }

                    // Do not close the menu after clicking an item
                    return false;
                }
            }
        }, 
        events: {
            show: function(opt) {
                // this is the trigger element
                var $this = this;
                // import states from data store 
                $.contextMenu.setInputValues(opt, $this.data());
                //console.log(opt.$trigger[0].offsetTop);
                //console.log(opt.$trigger[0].offsetLeft); 
                $.contextMenu.getInputValues(opt,$this.data());

                //opt.items.x_location.val = 
                //opt.items.y_location.val = 
                opt.items.x_location.val = parseInt(opt.$trigger.css("left"));
                opt.items.y_location.val = parseInt(opt.$trigger.css("top"));


                localStorage.setItem(opt.$trigger[0]+"x", opt.items.x_location.val);
                localStorage.setItem(opt.$trigger[0]+"y", opt.items.y_location.val);

                //console.log(localStorage.getItem(opt.$trigger+"y"));
                //onsole.log(opt.$trigger[0]);

                opt.items.x_location.min = opt.$trigger[0].offsetWidth/2
                opt.items.y_location.min = opt.$trigger[0].offsetHeight/2

                let viewportHeight = window.innerHeight;
                let viewportWidth = window.innerWidth;
          
                let borderHeight = viewportHeight - (opt.$trigger[0].offsetHeight/2);
                let borderWidth = viewportWidth - (opt.$trigger[0].offsetWidth/2);


                opt.items.y_location.max =borderHeight;
                opt.items.x_location.max =borderWidth;

                // this basically fills the input commands from an object
                // like {name: "foo", yesno: true, radio: "3", &hellip;}
            }, 
            hide: function(opt) {
                // this is the trigger element
                var $this = this;
                // export states to data store
                $.contextMenu.getInputValues(opt, $this.data());
                startAnimation(opt.$trigger[0]);
                // this basically dumps the input commands' values to an object
                // like {name: "foo", yesno: true, radio: "3", &hellip;}
            }
        }
    });
    $('.data-title').attr('data-menutitle', "Position");
});

function test(data)
{
    console.log(data)
    console.log("applayed")
}

function startAnimation(element)
{
    $(element).css("-webkit-animation", "");
    $(element).css("-moz-animation", "");
    $(element).css("-ms-animation", "");
    $(element).css("animation", "");
}
