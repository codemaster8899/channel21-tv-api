const PageContent = require('../model/page_content')

exports.addPageContent = async (req,res) => {

  const pageContent = new PageContent(req.body)
  if(!pageContent){
    res.status(400).send(error.message)
  }

  try{
    await pageContent.save();
    res.status(201).send(pageContent)
  }catch(error){
    res.status(500).send(error.message)
  }
}

exports.getPageContent = async (req,res) => {
  try{
    const pageContent = await PageContent.find({})  
    res.status(200).send(pageContent)   
  }catch(error){
    res.status(500).send(error.message)
  }
}

exports.editPageContent = async (req,res) => {
  if(!req.params.id || !req.body || req.body === {}){
    return res.status(500).send(error.message)
  }
  try{
    const editedPageContent = await PageContent.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
    if(!editedPageContent){
      return res.status(400).send({error: `Page Content  with id ${id} does not exist`})
    }
    await editedPageContent.save()
    res.status(200).send(editedPageContent)
  }catch(error){
    res.status(500).send(error.message)
  }
}

exports.deletePageContent = async (req,res) => {
  try{
    const deletePageContent = await PageContent.findByIdAndDelete({_id: req.params.id})
    if(!deletePageContent){
      return res.status(400).send("Page Content hasn't found")
    }
    res.status(200).send(deletePageContent)
  }catch(error){
    res.status(500).send(error.message)
  }
}