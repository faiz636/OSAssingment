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
    var x = new Process(x.name, x.arrivalTime, x.burstTime, x.priority);
    return x;
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
    for (var cnt = 0; cnt < processArray.length; cnt++) {
        x = document.getElementById("processListBody");
        x.innerHTML += "<table><tr><td>" + processArray[cnt].name + "</td>" +
            "<td>" + processArray[cnt].arrivalTime + "</td>" +
            "<td>" + processArray[cnt].burstTime + "</td>" +
            "<td>" + processArray[cnt].priority + "</td></tr></table>";
    }
}
/*
 function listSortedProcess() {
 getSortProcess();
 for (var cnt = 0; cnt < sortedProcess.length; cnt++) {
 x = document.getElementById("sortedrefresh");
 x.innerHTML += "<table><tr><td>" + sortedProcess[cnt].name + "</td>" +
 "<td>" + sortedProcess[cnt].arrivalTime + "</td>" +
 "<td>" + sortedProcess[cnt].burstTime + "</td>" +
 "<td>" + sortedProcess[cnt].priority + "</td>" +
 "<td>" + sortedProcess[cnt].remainingTime + "</td></tr></table>";
 }
 }
 */


//SJF scripting
var time, sortedProcess, currentRunningProcess, arrivedPionter, currentProcessPointer, firstRun = true;
var runningStateArray = [], currentRunningState, finish = false;

function shedule() {
    var l = sortedProcess.length, newAssigned = false, currentBurst, reShedule = false, f = false;
    if (firstRun) {
        currentBurst = 10000;
    } else {
        currentBurst = currentRunningProcess.burstTime;
    }
    for (i = arrivedPionter + 1; i < l; i++) {//check for more arrived processes
        if (sortedProcess[i].arrivalTime <= time) {
            arrivedPionter++;
            reShedule = true;
            console.log("arived");
        }
        else {
            break;
        }
    }
    if (currentRunningProcess.remainingTime == 0) {//check current process is finished
        reShedule = true;
        f = true;
        console.log("process finished");
    }
    if (reShedule) {//    reshedule if new process arrive
        console.log("reshedule");
        var remaining = [], shortest, j = 0;
        for (i = 0; i <= arrivedPionter; i++) {
            if (sortedProcess[i].remainingTime > 0) {
                remaining.push(i);
            }
        }
        console.log(remaining);
        if (remaining.length == 0 && arrivedPionter +1== sortedProcess.length) {
            finish = true;
            currentRunningState.end = time;
            console.log("finished");
            return;
        }
        else if (remaining.length == 0) {
            if (firstRun) {

//                firstRun = false;
            } else {
                currentRunningState.end = time;
            }
            console.log("dummy");
            currentRunningProcess = new Process("EMPTY", 0, 1, 0);
            currentProcessPointer = -1;
            currentRunningProcess.remainingTime=1;
            currentRunningState = new RunningState(currentRunningProcess.name);
            runningStateArray.push(currentRunningState);
            return;
        }
        if(remaining.length==1){
            j=remaining[0];
        }else {
            shortest = sortedProcess[remaining[0]].burstTime;
            for (i = 1; i < remaining.length; i++) {
                if (shortest > sortedProcess[remaining[i]].burstTime) {
                    shortest = sortedProcess[remaining[i]].burstTime;
                    j = remaining[i];
                }
            }
        }
        console.log("j:"+j);
//        if (currentProcessPointer == j) {
//            return;
//        } else {
            if (firstRun) {
                firstRun = false;
            } else {
                currentRunningState.end = time;
            }
            currentRunningProcess = sortedProcess[j];
            currentProcessPointer = j;
            currentRunningState = new RunningState(currentRunningProcess.name);
            runningStateArray.push(currentRunningState);
//        }

    }
    reShedule = false;
}

function RunningState(name) {
    this.name = name;
    this.start = time;
//    this.end=0;
}

RunningState.prototype.stop = function () {
    this.end = time;
}

function getSortProcess() {
    var x = [], y, l = processArray.length;
    for (i = 0; i < l; i++) {
        y = clone(processArray[i]);
        x.push(y);
        x[i].remainingTime = x[i].burstTime;
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
    sortedProcess = x;
}

function sjf() {
    getSortProcess();
    time = 0;
    arrivedPionter = -1;
    currentRunningProcess = new Process("EMPTY", 0, 0, 0);
    currentRunningProcess.remainingTime=0;
    currentProcessPointer = -1;
    console.log("sheduling started");
    while (true) {
        shedule();
        if (finish) {
            break;
        }
        time++;
        console.log(time);
        currentRunningProcess.remainingTime--;
    }
    console.log("sheduling end");
    printRunningStates();
    printGanntChart()
}
function printRunningStates() {
    var x = ""
    for (i = 0; i < runningStateArray.length; i++) {
        x += "<tr><th>" + runningStateArray[i].name + "</th><th>" + runningStateArray[i].start + "</th><th>" + runningStateArray[i].end + "</th></tr>";
    }
    document.getElementById("runningStates").innerHTML = x;
}

//processArray=JSON.parse(localStorage.process);
//refreshProcessList();
function printGanntChart(){
    var color=["red","blue","green"].l=runningStateArray.length,first=true,x=" ",clas;
    console.log("print chart");
    for(i=0;i<l;i++) {
        clas=color[i%3]+(i%3);
        if(first) {
             x+= "<span class='outer'><span class='inner "+clas+"'>"+runningStateArray[i].name+"</span><br>" +
                "<span class='left'>"+runningStateArray[i].start+"</span><span class='right'>"+runningStateArray[i].end+"</span></span>";
        }else{
            x+= "<span class='outer'><span class='inner'>"+runningStateArray[i].name+"</span><br>" +
                "<span class='right'>"+runningStateArray[i].end+"</span></span>";
        }
    }
    document.getElementById("sjf-gantt-chart").innerHTML=x;
}