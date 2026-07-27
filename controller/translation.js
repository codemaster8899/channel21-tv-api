const Translate = require('../model/translation')

exports.translation = async (req, res) =>{
  if(!req.body){
   return res.status(400).send({message: "Content can not be empty"})
  }

  let word = await Translate.findOne({key: req.body.key})
  if(word){
    return res.status(400).send({error: 'Word with this key already exist.'})
  }

  word = new Translate(req.body)  
  try{
    await word.save()
    res.status(201).send(word)
  }catch(error){
    res.status(500).send(error);
  }
}

exports.getTranslation = async (req,res) => {
  try{
    const translation = await Translate.find()
    res.status(200).send(translation)
  }catch(error){
    res.status(500).send(error.message)
  }
}

exports.deleteTranslation = async (req,res) => {
  try{
    const deletedTranslation = await Translate.findByIdAndDelete(req.params.id)
    res.status(200).send(deletedTranslation)
  }catch(error){
    res.status(500).send(error.message)
  }
}