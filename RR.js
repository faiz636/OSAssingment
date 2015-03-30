/**
 * Created by Muhammad Faizan Khan on 30/03/2015.
 */

//rr scripting


function rr() {
    console.log("RR started");
    runningStateArray = [];
    if (processArray.length == 0) {
        console.log("nothing to run");
        return;
    }
    var quantum = Number(prompt("Enter Quantum Time(default:5)", "5"));
    if (quantum <= 0) {
        console.log("invalid Quantum Time re-try");
        return;
    }
    getProcessClone();
    time = 0;
    console.log("sheduling started");
    finish = false;
    while (true) {
        RR_Shedular();
        if (finish) {
            break;
        }
        if (currentRunningProcess.remainingTime < quantum) {
            time += currentRunningProcess.remainingTime;
            currentRunningProcess.remainingTime = 0;
        } else {
            time += quantum;
            currentRunningProcess.remainingTime -= quantum;
        }
        console.log(time);
    }
    console.log("sheduling end");
    printRunningStates("RRrunningStates");
    printGanntChart("rr-gantt-chart");
}
function getProcessClone() {
    var x = [], y, l = processArray.length;
    for (i = 0; i < l; i++) {
        y = clone(processArray[i]);
        y.remainingTime = y.burstTime;
        x.push(y);
    }
    processForShedular = x;
}
function RR_Shedular() {
    var l = processForShedular.length, afterNotFound = true;
    if (firstRun) {
        currentRunningProcessPointer = 0;
    } else {
        console.log("reshedule");
        for (i = currentRunningProcessPointer; i < l; i++) {
            if (processForShedular[i].remainingTime > 0) {
                afterNotFound = false;
                currentRunningProcessPointer = i;
                break;
            }
        }
        if (afterNotFound) {
            var beforNotFound = true;
            for (i = 0; i < currentRunningProcessPointer; i++) {
                if (processForShedular[i].remainingTime > 0) {
                    beforNotFound = false;
                    currentRunningProcessPointer = i;
                    break;
                }
            }
            if (beforNotFound && currentRunningProcess.remainingTime > 0) {
                return;
            }

            if (beforNotFound) {
                finish = true;
                currentRunningState.end = time;
                console.log("finished");
                return;
            }
        }
    }
    if (firstRun) {
        firstRun = false;
    } else {
        currentRunningState.end = time;
    }
    currentRunningProcess = processForShedular[currentRunningProcessPointer];
    currentRunningState = new RunningState(currentRunningProcess.name);
    runningStateArray.push(currentRunningState);
}

/*
 //rr scripting
 var pending,pendingPointer;
 function rr() {
 console.log("RR started");
 if (processArray.length == 0) {
 console.log("nothing to run");
 return;
 }
 var quantum = Number(prompt("Enter Quantum Time(default:5)", "5"));
 if (quantum <= 0) {
 console.log("invalid Quantum Time re-try");
 return;
 }
 getProcessClone();
 time = 0;
 runningStateArray = [];
 pending= [];
 console.log("sheduling started");
 firstRun=true;
 finish = false;
 while (true) {
 RR_Shedular();
 if (finish) {
 break;
 }
 if (currentRunningProcess.remainingTime < quantum) {
 time += currentRunningProcess.remainingTime;
 currentRunningProcess.remainingTime = 0;
 } else {
 time += quantum;
 currentRunningProcess.remainingTime -= quantum;
 }
 console.log(time);
 }
 console.log("sheduling end");
 printRunningStates("RRrunningStates");
 printGanntChart("rr-gantt-chart");
 }
 function getProcessClone() {
 var x = [], y, l = processArray.length;
 for (var i = 0; i < l; i++) {
 y = clone(processArray[i]);
 y.remainingTime = y.burstTime;
 x.push(y);
 pending.push(i);
 }
 processForShedular = x;
 }
 function RR_Shedular() {
 var l = processForShedular.length, afterNotFound = true;
 if (firstRun) {
 currentRunningProcessPointer = pending[0];
 pendingPointer=0;
 } else {
 if(pendingPointer.length==0){
 finish = true;
 currentRunningState.end = time;
 console.log("finished");
 return;
 }
 console.log("reshedule");
 pendingPointer++;
 if(pendingPointer>pending.length){
 pendingPointer=0;
 }
 currentRunningProcessPointer=pending[pendingPointer];
 }
 if (firstRun) {
 firstRun = false;
 } else {
 currentRunningState.end = time;
 }
 currentRunningProcess = processForShedular[currentRunningProcessPointer];
 currentRunningState = new RunningState(currentRunningProcess.name);
 runningStateArray.push(currentRunningState);
 }

 for(i=1;i<runningStateArray.length;i++){
 if(runningStateArray[i].name==runningStateArray[i-1].name){
 runningStateArray[i].start=runningStateArray[i-1].start;
 //remove red box from arr
 }
 }

 */