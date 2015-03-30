/**
 * Created by Muhammad Faizan Khan on 30/03/2015.
 */

//SJF scripting
var time, sortedProcess, currentRunningProcess, arrivedPionter, currentRunningProcessPointer, firstRun = true;
var runningStateArray = [], currentRunningState, finish = false;

function SJF_ShedulePremptive() {
    var l = sortedProcess.length, currentBurst, reShedule = false;
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
    if (currentRunningProcess.remainingTime <1) {//check current process is finished
        reShedule = true;
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
        if (remaining.length == 0 && arrivedPionter + 1 == sortedProcess.length) {
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
            currentRunningProcessPointer = -1;
            currentRunningProcess.remainingTime = 1;
            currentRunningState = new RunningState(currentRunningProcess.name);
            runningStateArray.push(currentRunningState);
            firstRun = false;
            return;
        }
        if (remaining.length == 1) {
            j = remaining[0];
        } else {
            shortest = sortedProcess[remaining[0]].burstTime;
            j=remaining[0];
            for (i = 1; i < remaining.length; i++) {
                if (shortest > sortedProcess[remaining[i]].burstTime) {
                    shortest = sortedProcess[remaining[i]].burstTime;
                    j = remaining[i];
                }
            }
        }
        console.log("j:" + j);
//        if (currentRunningProcessPointer == j) {
//            return;
//        } else {
        if (firstRun) {
        } else {
            currentRunningState.end = time;
        }
        currentRunningProcess = sortedProcess[j];
        currentRunningProcessPointer = j;
        currentRunningState = new RunningState(currentRunningProcess.name);
        runningStateArray.push(currentRunningState);
//        }

    }
    reShedule = false;
    firstRun = false;
}

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
    sortedProcess = x;
}

function sjf() {
    console.log("SJF started");
    if(processArray.length==0){
        console.log("nothing to run");
        return;
    }
    getSortProcessByArrival();
    time = 0;
    arrivedPionter = -1;
    currentRunningProcess = new Process("EMPTY", 0, 0, 0);
    currentRunningProcess.remainingTime = 0;
    currentRunningProcessPointer = -1;
    console.log("sheduling started");
    finish=false;
    while (true) {
        SJF_ShedulePremptive();
        if (finish) {
            break;
        }
        time++;
        console.log(time);
        currentRunningProcess.remainingTime--;
    }
    console.log("sheduling end");
    printRunningStates("SJFrunningStates");
    printGanntChart("sjf-gantt-chart");
}
function printRunningStates(id) {
    var x = "";
    for (i = 0; i < runningStateArray.length; i++) {
        x += "<tr><th>" + runningStateArray[i].name + "</th><th>" + runningStateArray[i].start + "</th><th>" + runningStateArray[i].end + "</th></tr>";
    }
    document.getElementById(id).innerHTML = x;
}

//processArray=JSON.parse(localStorage.process);
//refreshProcessList();
function printGanntChart(id) {
    var color = ["red", "blue", "green"], first = true, x = " ", clas, l = runningStateArray.length;
    console.log("print chart");
    for (i = 0; i < l; i++) {
        clas = color[(i % 3)];
        if (first) {
            console.log(clas);
            x += "<span class='contain'><span class='box " + clas + "'>" + runningStateArray[i].name + "</span>" +
                "<span class='left'>" + runningStateArray[i].start + "</span><span class='right'>" + runningStateArray[i].end + "</span></span>";
            first = false;
        } else {
            console.log(clas);
            x += "<span class='contain'><span class='box " + clas + "'>" + runningStateArray[i].name + "</span>" +
                "<span class='right'>" + runningStateArray[i].end + "</span></span>";
        }
    }
    document.getElementById(id).innerHTML = x;
}

/*
 function listSortedProcess() {
 getSortProcessByArrival();
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
//processArray=JSON.parse(localStorage.p3);refreshProcessList();sjf();