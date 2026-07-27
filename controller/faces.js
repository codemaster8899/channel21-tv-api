const Faces = require('../model/faces')

exports.addFace = async (req,res) => {

  const face = new Faces(req.body)
  if(!face){
    res.status(400).send(error.message)
  }

  try{
    await face.save();
    res.status(201).send(face)
  }catch(error){
    res.status(500).send(error.message)
  }
}

exports.getFaces = async (req,res) => {
  try{
    const faces = await Faces.find({})  
    res.status(200).send(faces)   
  }catch(error){
    res.status(500).send(error.message)
  }
}

exports.getFaceById = async (req,res) => {
  try{
    const face = await Faces.findById(req.params.id)  
    res.status(200).send(face)   
  }catch(error){
    res.status(500).send(error.message)
  }
}

exports.editFace = async (req,res) => {
  if(!req.params.id || !req.body || req.body === {}){
    return res.status(500).send(error.message)
  }
  try{
    const editedFace = await Faces.findByIdAndUpdate(req.params.id, req.body, {new: true})
    if(!editedFace){
      return res.status(400).send({error: `Face  with id ${id} does not exist`})
    }
    await editedFace.save()
    res.status(200).send(editedFace)
  }catch(error){
    res.status(500).send(error.message)
  }
}

exports.deleteFace = async (req,res) => {
  try{
    const deleteFace = await Faces.findByIdAndDelete(req.params.id)
    if(!deleteFace){
      return res.status(400).send("Face hasn't found")
    }
    res.status(200).send(deleteFace)
  }catch(error){
    res.status(500).send(error.message)
  }
}