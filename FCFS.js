/**
 * Created by Muhammad Faizan Khan on 31/03/2015.
 */

function fcfs() {
    console.log("FCFS started");
    if (processArray.length == 0) {
        console.log("nothing to run");
        return;
    }
    getSortProcessByArrival();
    time = 0;
    arrivedPionter = -1;
    currentRunningProcess = new Process("EMPTY", 0, 0, 0);
    currentRunningProcess.remainingTime = 1;
    currentRunningProcessPointer = -1;
    runningStateArray = [];
    firstRun = true;
    console.log("sheduling started");
    finish = false;
    while (true) {
        FCFS_Shedular();
        if (finish) {
            break;
        }
        time += currentRunningProcess.remainingTime;
        console.log(time);
        currentRunningProcess.remainingTime = 0;
    }
    console.log("sheduling end");
    printRunningStates("FCFSrunningStates");
    printGanntChart("fcfs-gantt-chart");
}

function FCFS_Shedular() {
    var l = processForShedular.length, currentBurst, reShedule = false;
    for (i = arrivedPionter + 1; i < l; i++) {//check for more arrived processes
        if (processForShedular[i].arrivalTime <= time) {
            arrivedPionter++;
            console.log("arived");
        }
        else {
            break;
        }
    }
    console.log("reshedule");
    if (currentRunningProcessPointer + 1 == processForShedular.length) {
        finish = true;
        currentRunningState.end = time;
        console.log("finished");
        return;
    }
    else if (currentRunningProcessPointer == arrivedPionter) {
        if (firstRun) {
            firstRun = false;
        } else {
            currentRunningState.end = time;
        }
        console.log("dummy");
        currentRunningProcess = new Process("EMPTY", 0, 1, 0);
        currentRunningProcessPointer = -1;
        currentRunningProcess.remainingTime = 1;
        currentRunningState = new RunningState(currentRunningProcess.name);
        runningStateArray.push(currentRunningState);
//            firstRun = false;
        return;
    }
    if (arrivedPionter > currentRunningProcessPointer) {
        currentRunningProcessPointer++;
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
