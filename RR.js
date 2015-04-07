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
//    printRunningStates("RRrunningStates");
    printGanntChart("rr-gantt-chart");
    printResult("rr-table-result");
    document.getElementById("rr-turnaroundTime").innerHTML=(processForShedular.length/time).toFixed(2);

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
                currentRunningProcess.endTime=time;
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
        currentRunningProcess.endTime=time;

    }
    currentRunningProcess = processForShedular[currentRunningProcessPointer];
    currentRunningState = new RunningState(currentRunningProcess.name);
    runningStateArray.push(currentRunningState);
}
