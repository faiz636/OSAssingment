/**
 * Created by Muhammad Faizan Khan on 27/03/2015.
 */
$(document).ready(function(){
    $("#sjf-show").click(function() {
        $("#sjf").slideToggle("slow");
    });
    $("#sjf-first").click(function() {
        $("#sjf-newprocess").slideToggle("slow");
    });
    $("#sjf-second").click(function() {
        $("#sjf-processList").slideToggle("slow");
    });
});