const Media = require('../../model/homepage/social_media')

exports.addSocialMediaLink = async (req,res) => {
  const socialLink = new Media(req.body)
  console.log(socialLink);
  if(!socialLink){
    res.status(400).send(error.message)
  }
  
  try{
    await socialLink.save();
    res.status(201).send(socialLink)
  }catch(error){
    res.status(500).send(error.message)
  }
}

exports.getSocialMediaLinks = async (req,res) => {
  try{
    const socialMediaLink = await Media.find({})  
    res.status(200).send(socialMediaLink)   
  }catch(error){
    res.status(500).send(error.message)
  }
}

exports.getSocialMediaLinkById = async (req,res) => {
  const id = req.params.id
  try{
    const socialMediaLink = await Media.findOne({_id: id})  
    res.status(200).send(socialMediaLink)   
  }catch(error){
    res.status(500).send(error.message)
  }
}

exports.editSocialMediaLink = async (req,res) => {
  const id = req.params.id
  const socialMedia = req.body
  try{
    const editedMedia = await Media.findByIdAndUpdate({_id: id}, socialMedia, {new: true})
    if(!editedMedia){
      return res.status(400).send({error: `Social medai  with id ${id} does not exist`})
    }
    await editedMedia.save()
    res.status(200).send(editedMedia)
  }catch(error){
    res.status(500).send(error.message)
  }
}

exports.deleteSocialMediaLink = async (req,res) => {
  const id = req.params.id

  try{
    const deleteLink = await Media.findByIdAndDelete({_id: id})
    if(!deleteLink){
      return res.status(400).send("Social Media hasn't found")
    }
    res.status(200).send(deleteLink)
  }catch(error){
    res.status(500).send(error.message)
  }
}