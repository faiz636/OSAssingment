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


function clone(x) {
    x = new Process(x.name, x.arrivalTime, x.burstTime, x.priority);
    return x;
}

function addProcess(name, arrivalTime, burstTime, priority) {
    //parseing numerival values
    console.log("trying to add process");
    var selector = $("#invalid");
    selector.slideUp();
    arrivalTime = Number(arrivalTime);
    burstTime = Number(burstTime);
    priority = Number(priority);
    //check for invalid entries
    if (arrivalTime < 0 || burstTime < 0 || priority < 0) {
        //UI work reamining
        document.getElementById("invalid").innerHTML = "invalid values entered, values cannot be negative";
        selector.slideDown();
        return false;
    }
    var l=processArray.length;
    for (var i = 0; i < l; i++) {
        if (name == processArray[i]) {
            document.getElementById("invalid").innerHTML = "same name process already exist";
            selector.slideDown();
            return false;
        }
    }
    var processObj = new Process(name, arrivalTime, burstTime, priority);
    //UI work reamining
    processArray.push(processObj);
    addProcessToList(processObj);
    selector.slideUp();
    $("#newprocess").slideToggle("slow");
    document.getElementById("newProcessForm").reset();
//    console.log(arrayOfProcess[0]);
}

function addProcessToList(obj) {
    var x = "<tr>"+"<td>"+obj.name+"</td>"+"<td>"+obj.arrivalTime+"</td>"+"<td>"+obj.burstTime+"</td>"+"<td>"+obj.priority+"</td>"+"</tr>";
    document.getElementById("processListBody").innerHTML += x;
}

function refreshProcessList() {
    for (var cnt = 0; cnt < processArray.length; cnt++) {
        var x = document.getElementById("processListBody");
        x.innerHTML += "<table><tr><td>" + processArray[cnt].name + "</td>" +
            "<td>" + processArray[cnt].arrivalTime + "</td>" +
            "<td>" + processArray[cnt].burstTime + "</td>" +
            "<td>" + processArray[cnt].priority + "</td></tr></table>";
    }
}