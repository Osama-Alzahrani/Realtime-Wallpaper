$('.draggableOBJ').each(function () {
    //console.log(this);
    console.log(localStorage.getItem(this+"y"));
    $(this).css("left", localStorage.getItem(this+"x")+'px')
    $(this).css("top", localStorage.getItem(this+"y")+'px')
});