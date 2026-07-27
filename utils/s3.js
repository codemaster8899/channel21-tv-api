const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

exports.uploadPic = async (file)=>{
  const fileStream = fs.createReadStream(file.path)

  const s3 = new S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.AWS_S3_REGION,
    acl: 'public-read',
  });

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: file.filename,
    Body: fileStream
  };
  try {
    const awsResponse = await s3.upload(params).promise();
    fs.unlinkSync(file.path)
    return {error: false, url: awsResponse.Location, key: awsResponse.Key }
  }  catch (err) {
    return {error: true, message: err.message};
  }
}

exports.getFileStream = async (fileKey) => {
  const s3 = new S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.AWS_S3_REGION
  });

  const downloadParams = {
    Key: fileKey,
    Bucket: process.env.AWS_S3_BUCKET_NAME    
  }
  try {
    return  await s3.getObject(downloadParams).createReadStream()   
  } catch (error) {
    return {error: 'File not founded'}
  }  
}

