const Slider = require('../../model/homepage/slider')

exports.addSlider = async (req, res) => {
  
  const slider = new Slider(req.body)  
  try{
    await slider.save()
    res.status(201).send(slider)
  }catch(error){
    res.status(500).send(error.message)
  }  
}

exports.getSliders = async (req,res) =>{
  
  try{
    const slider = await Slider.find({})  
    res.status(200).send(slider)   
  }catch(error){
    res.status(500).send(error.message)
  }
}

exports.getSliderById = async (req,res) =>{
  
  try{
    const slider = await Slider.findById(req.params.id)  
    res.status(200).send(slider)   
  }catch(error){
    res.status(500).send(error.message)
  }
}

exports.editSlider = async (req,res) => {
  const id = req.params.id
  if(!id || id === null){
    return res.status(400).send({error: "Id is required"})
  }
  
  const updatedSlider = await Slider.findByIdAndUpdate(id, req.body, {new: true})
  if(!updatedSlider){
    return res.status(400).send(error)
  }
  try{
 
    await  updatedSlider.save()
    res.status(200).send(updatedSlider)
  }catch(error){
    res.status(500).send(error.message)
  }
}

exports.deleteSlider = async (req,res) => {
  const _id = req.params.id
  try{
    const deleteSlider = await Slider.findByIdAndDelete(_id)
    if(!deleteSlider){
      return res.status(400).send({error: `Slide not found`})
    }
    res.status(200).send(deleteSlider)
  }catch(error){
    res.status(500).send(error.message)
  }
}

exports.saveSlider = async (req,res) => {
  try {
    req.body.map(async (slide) => {
      const slider = await Slider.findById(slide.id);
      if (slider) {
        slider.slider_order = slide.slider_order;    
        await slider.save()
      } 
    });
    res.status(200).send("Slider's orders have been updated")
  } catch(error) {
    res.status(500).send(error.message)
  }  
}