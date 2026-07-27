const ProgramType = require('../model/prograqm_type')

exports.addProgramType = async (req,res) => {
  if(!req.body){
    return res.status(400).send({message: "Content can not be empty"})
  }

  let type = await ProgramType.findOne({name: req.body.name})
  if(type){
    return res.status(400).send({error: 'Name already exist.'})
  }

  type = new ProgramType(req.body)
  try{
    await type.save()
    res.status(201).send(type)
  }catch(error){
    res.status(500).send(error);
  }
}

exports.getProgramTypes = async (req,res)=>{ 
  try{
    const program_types = await ProgramType.find({})
    if(!program_types){
      return res.status(404).send()
    }
    res.status(200).send(program_types)
  }catch(error){
    res.status(500).send(error)
  }
}

exports.getProgramType = async (req,res)=>{
  const progrmType_id = req.params.id
  try{
    const type_id = await ProgramType.findOne({_id: progrmType_id})
    if(!type_id){
      return res.status(404).send()
    }
    res.status(200).send(type_id)
  }catch(error){
    res.status(500).send(error)
  }
}

exports.deleteProgramType = async (req,res) => {
  const _id = req.params.id
  try{
    const deletedProgramType = await ProgramType.findByIdAndDelete({_id: _id})
    if(!deletedProgramType){
      return res.status(400).send({error: `Program with id ${_id} does not exist`})
    }
    res.status(200).send(deletedProgramType)
  }catch(error){
    res.status(500).send(error)
  }

}
