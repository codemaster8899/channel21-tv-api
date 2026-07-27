const Footer = require('../../model/homepage/footer')

exports.addFooter = async (req,res) => {
  const title = req.body.title
  console.log(title, Object.keys(title).length);
  if(!title || title === {} || Object.keys(title).length === 0){
    return res.status(400).send("Title is required")  
  } 

  try{
    const footer = new Footer({title: title})
    await footer.save();
    res.status(201).send(footer)
  }catch(error){
    res.status(500).send(error)
  }
}

exports.getFooter = async (req,res) => {
  try{
    const footer = await Footer.find({})  
    res.status(200).send(footer)   
  }catch(error){
    res.status(500).send(error.message)
  }
}

exports.getFooterById = async (req,res) => {
  try{
    const footer = await Footer.findOne({_id: req.params.id})  
    res.status(200).send(footer)
  }catch(error){
    res.status(500).send(error.message)
  }
}

exports.editFooter = async (req,res) => {
  const id = req.params.id
  const title = req.body
  try{
    const footer = await Footer.findByIdAndUpdate({_id: id}, title, {new: true})
    await footer.save()
    res.status(200).send(footer)
  }catch(error){
    res.status(500).send(error.message)
  }

}

exports.deleteFooter = async (req,res) => {
  try{
    const deletefooter = await Footer.findByIdAndDelete(req.params.id)
    if(!deletefooter){
      return res.status(400).send("Footer hasn't found")
    }
    res.status(200).send(deletefooter)
  }catch(error){
    res.status(500).send(error.message)
  }
}