window.loaded = true;
$("#imagebig").fadeOut("slow", function() {

});
setTimeout(function() {
    $("#imagebig").remove();
    $("#preshow").css("display", "block");
}, 2500);
