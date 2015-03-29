/**
 * Created by Muhammad Faizan Khan on 27/03/2015.
 */

var processArray = [];

function Process(name, arrivalTime, burstTime, priority) {
    this.name = name;
    this.arrivalTime = arrivalTime;
    this.burstTime = burstTime;
    this.priority = priority;
}

function addProcess(name, arrivalTime, burstTime, priority) {
//    parseing numerival values
    arrivalTime = Number(arrivalTime);
    burstTime = Number(burstTime);
    priority = Number(priority);
//    check for invalid entries
    if (arrivalTime < 0 || burstTime < 0 || priority < 0) {
        //UI work reamining
        $("#invalid").slideDown();
        return false;
    }
    var processObj = new Process(name, arrivalTime, burstTime, priority);
    //UI work reamining
    processArray.push(processObj);
    addProcessToList(processObj);
    $("#invalid").slideUp();
    $("#newprocess").slideToggle("slow");
    document.getElementById("newProcessForm").reset();
//    console.log(arrayOfProcess[0]);
}

function addProcessToList(obj) {
    var x = "<tr>" +
        "<td>" + obj.name + "</td>" +
        "<td>" + obj.arrivalTime + "</td>" +
        "<td>" + obj.burstTime + "</td>" +
        "<td>" + obj.priority + "</td>" +
        "</tr>";
    document.getElementById("processListBody").innerHTML += x;
}


function refreshProcessList() {
    for (var cnt = 0; cnt < arrayOfProcess.length; cnt++) {
        document.getElementById("display").innerHTML += "<table><tr><td>" + arrayOfProcess[cnt].process + "</td>" +
            "<td>" + arrayOfProcess[cnt].arrival + "</td>" +
            "<td>" + arrayOfProcess[cnt].burst + "</td>" +
            "<td>" + arrayOfProcess[cnt].priority + "</td></tr></table>"

    }
}

