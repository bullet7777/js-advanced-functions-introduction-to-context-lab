// Your code here
function createEmployeeRecord(record) {
    return {
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}


function createEmployeeRecords(records) {
    return records.map((record) => {
        return createEmployeeRecord(record)
    })
}

function createTimeInEvent(employeeRecord, dateStamp) {
    let dateArray = dateStamp.split(" ");
    let timeInDate = dateArray[0]
    let hour = dateArray[1]

    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: timeInDate
    })
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    let dateArray = dateStamp.split(" ");
    let timeInDate = dateArray[0]
    let hour = dateArray[1]

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: timeInDate
    })


    return employeeRecord

}

function hoursWorkedOnDate(employeeRecord, date) {

    let hours = 0
    let timeInEvent = employeeRecord.timeInEvents
        .find(o => o.date === date)

    let timeOutEvent = employeeRecord.timeOutEvents.find(o => o.date === date)

    let timeInEventHour = timeInEvent.hour
    let timeOutEventHour = timeOutEvent.hour

    hours = timeOutEventHour - timeInEventHour
    return hours/100

}


function wagesEarnedOnDate(employeeRecord, date) {
    let pay = 0
    let hours = hoursWorkedOnDate(employeeRecord, date)
    let payRate = employeeRecord.payPerHour

    pay = hours * payRate

    return pay

}
function allWagesFor(employeeRecord) {
    let pays = 0
    
    for(let i=0;i<employeeRecord.timeInEvents.length;i++){
        let timeInEvent=employeeRecord.timeInEvents[i]
        let date = timeInEvent.date
        let pay= wagesEarnedOnDate(employeeRecord, date)
        pays=pays +pay;
    }
    return pays

}

function findEmployeeByFirstName(srcArray,firstName) {
    console.log(srcArray)
    console.log(firstName)
    
    let employeeRecord=srcArray.find((element)=>
    {
        return element.firstName===firstName})
    console.log(employeeRecord)
    return employeeRecord

}

function calculatePayroll(employeeRecords) {
    let sum= employeeRecords.reduce(myFunc,0);

function myFunc(total, employeeRecord) {
    let wage=allWagesFor(employeeRecord)
  return total + wage;
}

    return sum
}