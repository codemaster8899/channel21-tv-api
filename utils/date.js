const moment = require('moment')
const Schedule = require('../model/schedule')

const getDateFrom = (date) => {
  return ('0' + date.getDate()).slice(-2) + '-'
         + ('0' + (date.getMonth()+1)).slice(-2) + '-'
         + date.getFullYear();
}

const getMilliseconds = (date) => {
  const day = new Date(date).getTime()
  const dayStart = new Date(new Date(date).toDateString()).getTime()
  return day - dayStart
}

const getDateTZ = (date) => {
  return new Date(new Date(date).getTime() + 14400000)
}

const existingDateTime = async (startTime, endTime, dates, scheduleId = null) => {
  let condition = {$or: [{$and: [{startTime: {$lte: startTime}},{endTime: {$gt: startTime}}]},{$and:[{startTime: {$lt: endTime}},{endTime: {$gte: endTime}}]},{$and: [{startTime: {$gte: startTime}},{startTime: {$lt: endTime}}]}]};

  if(scheduleId) {
    condition = {$and :[
      {
        _id: {$ne: scheduleId}
      },
      condition
    ]};
  }  

  const getSchedule = await Schedule.find(condition, {"dates":1})
  let allDates = [];
  getSchedule.forEach(function(val) {
    val.dates.forEach(function(item){
      allDates = [...allDates, item]
    }) 
  })

  allDates = [...new Set(allDates)]
  
  let existingDates = [];
  for(let i = 0; i <  dates.length; i++){
    if (allDates.indexOf(dates[i]) !== -1){
      existingDates.push(dates[i]);      
    }
  }
  
  if (existingDates.length > 0) {
    return ({error: "Conflict with time for dates: " + existingDates.join()})
  }  
}

module.exports = {getDateFrom, getMilliseconds, getDateTZ, existingDateTime}