const Program = require('../model/program')
const ProgramType = require('../model/prograqm_type')

exports.addProgram = async (req,res) => {

  let program = await Program.findOne({name: req.body.name})
  if(program){
    return res.status(400).send({error: 'Program name must be unique.'})
  }

  const type_id = req.body.program_type_id
  let program_type = await ProgramType.findOne({type: req.body.program_type_id});

  if(!program_type){
    return res.status(400).send({error: 'Program type not found.'})
  }  

  program = new Program({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    banners_order: req.body.banners_order,
    program_type_id: program_type._id,
    link: req.body.link
  })

  try{
    await program.save()
    res.status(201).send(program)
  }catch(error){
    res.status(500).send(error.message);
  } 
}

exports.getPrograms = async (req,res)=>{

  try{
    const programs = await Program.find({})
    if(!programs){
      return res.status(404).send({error: `Programs don\'t exist`})
    }
    res.status(200).send(programs)
  }catch(error){
    res.status(500).send(error.message)
  }
}

exports.getProgramById = async (req,res)=>{
  const id = req.params.id
  try{
    const program = await Program.find({_id: id})
    res.status(200).send(program)
  }catch(error){
    res.status(500).send(error.message)
  }
}

exports.getProgramByTypeId = async (req,res)=>{
  const type_id = req.params.id
  try{
    const program = await Program.find({program_type_id: type_id})
    res.status(200).send(program)
  }catch(error){
    res.status(500).send(error.message)
  }
}

exports.editProgram = async (req,res)=>{
  const id = req.params.id
  let {description,image,program_type_id,name,link} = req.body
  if(Object.keys(req.body).length === 0){
    return res.status(400).send({message: "Content can not be empty"})
  }
  let program_type = await ProgramType.findOne({_id: program_type_id})
  if(program_type){
    program_type_id = program_type._id
  }
 
  try{
    const updatedProgram = await Program.findByIdAndUpdate({_id: id}, {
      name,
      description,
      image,
      program_type_id,
      link
    },{ new: true })
    if(!updatedProgram){
      return res.status(400).send({error: `Program with id ${id} does not exist`})
    }
    await updatedProgram.save()
    res.status(200).send(updatedProgram)
  }catch(error){
    res.status(500).send(error.message)
  }
}

exports.deleteProgram = async (req,res) => {
  const _id = req.params.id
  try{
    const deletedProgram = await Program.findByIdAndDelete({_id: _id})
    if(!deletedProgram){
      return res.status(400).send({error: `Program  not found`})
    }
    res.status(200).send(deletedProgram)
  }catch(error){
    res.status(500).send(error.message)
  }
}

exports.saveBanners = async (req,res) => {
  try {
    req.body.forEach(async (banner) => {
      const program = await Program.findById(banner._id);
      if(program) {
        program.banners_order = banner.banners_order;    
        await program.save()
      }  
    })
    res.status(200).send("Banners orders have been updated")
  } catch(error) {
    res.status(500).send(error.message)
  }  
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           

