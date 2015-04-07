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
        if (name == processArray[i].name) {
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
    var x = document.getElementById("processListBody");
    x.innerHTML="";
    for (var cnt = 0; cnt < processArray.length; cnt++) {
        x.innerHTML += "<table><tr><td>" + processArray[cnt].name + "</td>" +
            "<td>" + processArray[cnt].arrivalTime + "</td>" +
            "<td>" + processArray[cnt].burstTime + "</td>" +
            "<td>" + processArray[cnt].priority + "</td></tr></table>";
    }
    console.log("refreshing process list");
}
function saveProcesses(name){
    if(localStorage.getItem(name)==null){
        localStorage.setItem(name,JSON.stringify(processArray));
        $("#saveProcesses").slideToggle("slow");
        $("#saveError").slideUp();
    }else{
        $("#saveError").slideUp();
        document.getElementById("saveError").innerHTML="data already saved with this name try another name";
        $("#saveError").slideDown();
    }
}
function loadProcess(name){
    processArray=JSON.parse(localStorage.getItem(name));
    $("#loadProcesses").slideUp();
    $("#processListBody").slideUp();
    refreshProcessList();
    $("#processListBody").slideDown();

}


var time, processForShedular, currentRunningProcess, arrivedPionter, currentRunningProcessPointer, firstRun = true;
var runningStateArray , currentRunningState, finish = false;


function RunningState(name) {
    this.name = name;
    this.start = time;
//    this.end=0;
}

function getSortProcessByArrival() {
    var x = [], y, l = processArray.length;
    for (i = 0; i < l; i++) {
        y = clone(processArray[i]);
        y.remainingTime = y.burstTime;
        x.push(y);
    }
    for (i = 0; i < l; i++) {
        for (j = i + 1; j < l; j++) {
            if (x[i].arrivalTime > x[j].arrivalTime) {
                y = x[i];
                x[i] = x[j];
                x[j] = y;
            }
        }
    }
    processForShedular = x;
}


function printRunningStates(id) {
    var x = "";
    for (i = 0; i < runningStateArray.length; i++) {
        x += "<tr><th>" + runningStateArray[i].name + "</th><th>" + runningStateArray[i].start + "</th><th>" + runningStateArray[i].end + "</th></tr>";
    }
    document.getElementById(id).innerHTML = x;
}

function printGanntChart(id) {
    var color = ["red", "blue", "green"], first = true, x = " ", clas, l = runningStateArray.length,emptyFound=false,emptyStar,current,next;
    console.log("print chart");
    var x=document.getElementById(id);
    x.innerHTML="";

    for (var i = 0; i < l; i++) {
        current=runningStateArray[i];
        next=runningStateArray[i+1];
        if(runningStateArray[i].name=="EMPTY" && !emptyFound ){
            emptyFound=true;
            emptyStart=runningStateArray[i].start;
//            continue;
        }
        if(emptyFound && !(runningStateArray[i+1].name=="EMPTY") ){
            runningStateArray[i].start=emptyStart;
            emptyFound=false;
        }else if(emptyFound){
            continue;
        }
        clas = color[(i % 3)];
        if (first) {
//            console.log(clas);
            x.innerHTML += "<span class='contain'><span class='box " + clas + "'>" + runningStateArray[i].name + "</span>" +
                "<span class='left'>" + runningStateArray[i].start + "</span><span class='right'>" + runningStateArray[i].end + "</span></span>";
            first = false;
        } else {
//            console.log(clas);
            x.innerHTML += "<span class='contain'><span class='box " + clas + "'>" + runningStateArray[i].name + "</span>" +
                "<span class='right'>" + runningStateArray[i].end + "</span></span>";
        }
    }
//    document.getElementById(id).innerHTML = x;
}

function printResult(id){
    var x="";
    for(var i= 0,len=processForShedular.length;i<len;i++) {
        x += "<tr><td>" + processForShedular[i].name + "</td>" +
            "<td>" + (processForShedular[i].endTime-processForShedular[i].burstTime-processForShedular[i].arrivalTime) + "</td>" +
//            "<td>" + (time/processForShedular.length) + "</td>" +
            "</tr>";
    }
    document.getElementById(id).innerHTML=x;
}


/*
 function listSortedProcess() {
 getSortProcessByArrival();
 for (var cnt = 0; cnt < processForShedular.length; cnt++) {
 x = document.getElementById("sortedrefresh");
 x.innerHTML += "<table><tr><td>" + processForShedular[cnt].name + "</td>" +
 "<td>" + processForShedular[cnt].arrivalTime + "</td>" +
 "<td>" + processForShedular[cnt].burstTime + "</td>" +
 "<td>" + processForShedular[cnt].priority + "</td>" +
 "<td>" + processForShedular[cnt].remainingTime + "</td></tr></table>";
 }
 }
 */


//processArray=JSON.parse(localStorage.process);
//refreshProcessList();
//processArray=JSON.parse(localStorage.p3);refreshProcessList();sjf();
