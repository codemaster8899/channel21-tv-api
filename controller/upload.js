const {uploadPic, getFileStream} = require('../utils/s3')

exports.uploadImage = async (req,res) => {
    const file = req.file
    if(!file){
      return res.status(400).send({error: 'Please, choose a file.'})
    }
    try{
      const result = await uploadPic(file)
      res.send({imagePath: `${result.url}`, imageKey: `${result.key}` })
    }catch(error){
      res.status(500).send(error)
    }
   
}

exports.getFile = async (req,res) => {
    const key = req.params.key
    if(!key){
      res.status(500).send(error)
    }
    try {
      const readStream = await getFileStream(key)
      readStream.pipe(res)
    } catch (error) {
      res.status(400).send({error: `File with key ${key} doesn't exist`})
    }
 
}
