const Schedule = require('../model/schedule')
const { rrulestr }  = require('rrule')
const {getDateFrom, getMilliseconds, getDateTZ,existingDateTime} = require('../utils/date')
const moment = require('moment')

exports.addSchedule = async (req,res)=> {
  let {startDate,endDate,rRule, appointmentId,image,programId,name,id} = req.body  
  const startTime = getMilliseconds(startDate)
  const endTime = getMilliseconds(endDate)
  const dates = []
  let freqType 
  
  if(!rRule){
    dates.push(getDateFrom(new Date(startDate)))
  }else{
    const rruleDates = rrulestr(rRule).all()
    freqType = rrulestr(rRule).options.freq
    for(let i = 0; i < rruleDates.length; i++){
      dates.push(getDateFrom(new Date(rruleDates[i])))
    }
  } 
  
  const existDateTime = await existingDateTime(startTime,endTime,dates)
  if(existDateTime){
    return res.status(400).send(existDateTime)
  }
  
  const schedule = new Schedule({
    programId,
    name,
    id,
    startDate,
    endDate,
    rRule,
    appointmentId,
    image,
    startTime,
    endTime,
    dates,
    freqType
  })

  try{
    await schedule.save()
    res.status(201).send(schedule)
  }catch(error){
    res.status(500).send(error);
  }
}

exports.getSchedule = async (req,res) => {
  try{
    const schedule = await Schedule.find({})
    if(!schedule || schedule === {}){
      return res.status(404).send({error: `Schedule doesn\'t exist`})
    }
    res.status(200).send(schedule)
  }catch(error){
    res.status(500).send(error)
  }

}

exports.getScheduleById = async (req,res) => {
  const schedule_id = req.params.id
  try{  
    const schedule = await Schedule.findOne({_id: schedule_id})
    res.status(200).send(schedule)
  }catch(error){
    res.status(500).send(error)
  }

}

exports.updateSchedule = async (req,res) => {
  const schedule_id = req.params.id
  let {startDate,endDate,rRule, appointmentId,image,programId,name,id,exDate} = req.body
  let startTime
  let endTime
  let dates
  let freqType 
  
  if(startDate && endDate){
    startTime = getMilliseconds(startDate)
    endTime = getMilliseconds(endDate)

    if(!rRule){
      dates = []
      dates.push(getDateFrom(new Date(startDate)))
    }else{
      dates = []
      const rruleDates = rrulestr(rRule).all()
      freqType = rrulestr(rRule).options.freq
      for(let i = 0; i < rruleDates.length; i++){
        dates.push(getDateFrom(new Date(rruleDates[i])))
      }
    }

    const existDateTime = await existingDateTime(startTime,endTime,dates,schedule_id,exDate)
    if(existDateTime){
      return res.status(400).send(existDateTime)
    }
  }

  if(exDate){
    let dateFrom = await Schedule.findById(schedule_id);
    dates = dateFrom.dates
    exDate.split(',').forEach(elm => {
      let index = dates.indexOf(getDateFrom(getDateTZ(elm)))
      if(index !== -1){
        dates.splice(index,1)
      }
    })
   
  }
  try{
    
    const editedSchedule = {
      programId,
      name,
      id,
      startDate,
      endDate,
      rRule,
      appointmentId,
      image,
      dates,
      freqType,
      startTime,
      endTime,
      exDate
    }
    const updatedSchedule = await Schedule.findByIdAndUpdate(schedule_id, editedSchedule, { new: true })
    await updatedSchedule.save()
    res.status(200).send(updatedSchedule)    
  }catch(error){
    res.status(500).send(error)
  }

}


exports.deleteSchedule = async (req,res) => {
  const _id = req.params.id
  try{
    const deletedSchedule = await Schedule.findByIdAndDelete(_id)
    if(!deletedSchedule){
      return res.status(400).send({error: `Schedule not found`})
    }
    res.status(200).send(deletedSchedule)
  }catch(error){
    res.status(500).send(error)
  }

}