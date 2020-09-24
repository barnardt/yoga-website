// Function to animate chevron up and down
$(function() {
    function chevronUpDown() {
        $("#chevron").stop(true);
        if ($("#chevron").css("display") != "none") {
            $("#chevron").animate({bottom: "2rem"}, 1000, function(){
                $("#chevron").fadeOut(1000, function(){
                    $("#chevron").animate({bottom: "4rem"}, 1, function(){
                        $("#chevron").fadeIn(1000, function(){
                            chevronUpDown();
                        });
                    });
                });
            });
        }
    }

    chevronUpDown()
    
    // When window is resized, the chevron function is called
    $(window).resize(function(){
        if ($(window).width() <= 992) { 
            chevronUpDown()
        }
        else {
            $("#chevron").stop(true);
        }
    });
});




