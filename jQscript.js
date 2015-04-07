/**
 * Created by Muhammad Faizan Khan on 27/03/2015.
 */
$(document).ready(function(){
    $("#sjf-result").click(function() {
        $(".sjf-run").slideToggle("slow");
//        $("#sjf-gantt-chart").slideToggle("slow");
//        $("#sjf-table").slideToggle("slow");
//        console.log("click");
    });
    $("#rr-result").click(function() {
        $(".rr-run").slideToggle("slow");
//        $("#rr-gantt-chart").slideToggle("slow");
//        $("#rr-table").slideToggle("slow");
    });
    $("#fcfs-result").click(function() {
        $(".fcfs-run").slideToggle("slow");
//        $("#fcfs-gantt-chart").slideToggle("slow");
//        $("#fcfs-table").slideToggle("slow");
//        console.log("click");
    });
    $("#addProcess").click(function() {
        $("#newprocess").slideToggle("slow");
    });
    $("#viewProcess").click(function() {
        $(".processList").slideToggle("slow");
    });
    $("#save").click(function() {
        $("#saveProcesses").slideToggle("slow");
    });
    $("#load").click(function() {
        if(document.getElementById("loadProcesses").style.display=="none"){
            if(localStorage.length>0){
                var x="";
                for(var i=0,len=localStorage.length;i<len;i++){
                    x+="<option value="+localStorage.key(i)+">"+localStorage.key(i)+"</option>";
                }
                document.getElementById("optionList").innerHTML=x;
            }else{

            }
        }
        $("#loadProcesses").slideToggle("slow");
    });
});