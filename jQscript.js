/**
 * Created by Muhammad Faizan Khan on 27/03/2015.
 */
$(document).ready(function(){
    $("#sjf-result").click(function() {
        $("#sjf-gantt-chart").slideToggle("slow");
        $("#sjf-table").slideToggle("slow");
        console.log("click");
    });
    $("#fcfs-result").click(function() {
        $("#fcfs-gantt-chart").slideToggle("slow");
        $("#fcfs-table").slideToggle("slow");
        console.log("click");
    });
    $("#rr-result").click(function() {
        $("#rr-gantt-chart").slideToggle("slow");
        $("#rr-table").slideToggle("slow");
        console.log("click");
    });
    $("#addProcess").click(function() {
        $("#newprocess").slideToggle("slow");
    });
    $("#viewProcess").click(function() {
        $("#processList").slideToggle("slow");
    });
});