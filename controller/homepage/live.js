const Live = require('../../model/homepage/live')

exports.addLiveLink = async (req,res) => {
  const liveLink = new Live(req.body)
  
  try{
    await liveLink.save()
    res.status(201).send(liveLink)
  }catch(error){
    res.status(500).send(error.message)
  } 
}


exports.getLiveLink = async (req,res) => {
  try{
    const liveLink = await Live.find({})  
    res.status(200).send(liveLink)   
  }catch(error){
    res.status(500).send(error.message)
  }
}

exports.getLiveLinkById = async (req,res) => {
  try{
    const liveLink = await Live.find({_id: req.params.id})  
    res.status(200).send(liveLink)   
  }catch(error){
    res.status(500).send(error.message)
  }
}

exports.editLiveLink = async (req,res) => {
  
  try{
    const live = await Live.findByIdAndUpdate(req.params.id, req.body, {new: true})
    await live.save()
    res.status(200).send(live)
  }catch(error){
    res.status(500).send(error.message)
  }
}


exports.deleteLiveLink = async (req,res) => {
  const _id = req.params.id
  try{
    const deleteLiveLink = await Live.findByIdAndDelete({_id: _id})
    if(!deleteLiveLink){
      return res.status(400).send({error: `Live link not found`})
    }
    res.status(200).send(deleteLiveLink)
  }catch(error){
    res.status(500).send(error.message)
  }
}