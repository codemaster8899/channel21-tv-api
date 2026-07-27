const Banners = require('../../model/homepage/program-show_banners')

exports.addBanner = async (req,res) =>{
  const banners = new Banners(req.body)
  if(!banners){
    res.status(400).send(error)
  }
  try{
    await banners.save();
    res.status(201).send(banners)
  }catch(error){
    res.status(500).send(error)
  }
}

exports.getBanners = async (req,res) => {
  try{
    const banners = await Banners.find({})  
    res.status(200).send(banners)   
  }catch(error){
    res.status(500).send(error.message)
  }
}

exports.getBannerById = async (req,res) => {
  const id = req.params.id
  try{
    const banner = await Banners.findOne({_id: id})  
    res.status(200).send(banner)   
  }catch(error){
    res.status(500).send(error.message)
  }
}

exports.editBanner = async (req,res) => {
  const id = req.params.id
  const banner = req.body
  try{
    const editedBanner = await Banners.findByIdAndUpdate({_id: id}, banner, {new: true})
    await editedBanner.save()
    res.status(200).send(editedBanner)
  }catch(error){
    res.status(500).send(error.message)
  }
}

exports.deleteBanner = async (req,res) => {
  const id = req.params.id
  try{
    const deleteBanner = await Banners.findByIdAndDelete({_id: id})
    if(!deleteBanner){
      return res.status(400).send("Social Media hasn't found")
    }
    res.status(200).send(deleteBanner)
  }catch(error){
    res.status(500).send(error.message)
  }
}