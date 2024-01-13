const { S3, DeleteObjectCommand } = require('@aws-sdk/client-s3');

const multer = require('multer');
const multerS3 = require('multer-s3');
const uuid = require('uuid'); // or import { v1 as uuid } from 'uuid' if you're using ES6 modules
const { v1: uuidv1 } = require('uuid');


// Configure AWS SDK

const s3Client = new S3({
  region: process.env.AWS_REGION, 
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
//  endpoint: 'https://mern-heroku-app-file-en18jn718am6yr6mduq7ucinmycyguse2b-s3alias.s3-accesspoint.us-east-2.amazonaws.com' // Your Access Point URL
});

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
};


const deleteFile = async (fileKey) => {
  try {
    const deleteParams = {
      Bucket: process.env.S3_BUCKET,
      Key: fileKey
    };

    await s3Client.send(new DeleteObjectCommand(deleteParams));
    console.log(`File ${fileKey} deleted successfully from bucket ${process.env.S3_BUCKET}`);
  } catch (error) {
    console.error('Error in deleting file: ', error);
    throw error;
  }
};

module.exports = deleteFile
