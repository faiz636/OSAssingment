/**
 * Created by Muhammad Faizan Khan on 30/03/2015.
 */

//SJF scripting

function SJF_ShedulePremptive() {
    var l = processForShedular.length, currentBurst, reShedule = false;
//    if (firstRun) {
//        currentBurst = 10000;
//    } else {
//        currentBurst = currentRunningProcess.burstTime;
//    }

    for (i = arrivedPionter + 1; i < l; i++) {//check for more arrived processes
        if (processForShedular[i].arrivalTime <= time) {
            arrivedPionter++;
            reShedule = true;
            console.log("arived");
        }
        else {
            break;
        }
    }
    if (currentRunningProcess.remainingTime <= 0) {//check current process is finished
        reShedule = true;
        currentRunningProcess.endTime=time;
        console.log("process finished");
    }
    if (reShedule) {//    reshedule if new process arrive
        console.log("reshedule");
        var remaining = [], shortest, j = 0;
        for (i = 0; i <= arrivedPionter; i++) {
            if (processForShedular[i].remainingTime > 0) {
                remaining.push(i);
            }
        }
//        console.log(remaining);
        if (remaining.length == 0 && arrivedPionter + 1 == processForShedular.length) {
            finish = true;
            currentRunningProcess.endTime=time;
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
//            console.log("dummy");
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
            shortest = processForShedular[remaining[0]].burstTime;
            j = remaining[0];
            for (i = 1; i < remaining.length; i++) {
                if (shortest > processForShedular[remaining[i]].burstTime) {
                    shortest = processForShedular[remaining[i]].burstTime;
                    j = remaining[i];
                }
            }
        }
//        console.log("j:" + j);
//        if (currentRunningProcessPointer == j) {
//            return;
//        } else {
        if (firstRun) {
        } else {
            currentRunningState.end = time;
        }
        currentRunningProcess = processForShedular[j];
        currentRunningProcessPointer = j;
        currentRunningState = new RunningState(currentRunningProcess.name);
        runningStateArray.push(currentRunningState);
//        }

    }
    reShedule = false;
    firstRun = false;
}


function sjf() {
    console.log("SJF started");
    if (processArray.length == 0) {
        console.log("nothing to run");
        return;
    }
    getSortProcessByArrival();
    time = 0;
    arrivedPionter = -1;
    currentRunningProcess = new Process("EMPTY", 0, 0, 0);
    currentRunningProcess.remainingTime = 0;
    currentRunningProcessPointer = -1;
    runningStateArray = [];
    firstRun=true;
    console.log("sheduling started");
    finish = false;
    while (true) {
        SJF_ShedulePremptive();
        if (finish) {
            break;
        }
        time++;
//        console.log(time);
        currentRunningProcess.remainingTime--;
    }
//    console.log("sheduling end");
//    printRunningStates("SJFrunningStates");
    printGanntChart("sjf-gantt-chart");
    printResult("sjf-table-result");
    document.getElementById("sjf-turnaroundTime").innerHTML=(processForShedular.length/time).toFixed(2);

}


