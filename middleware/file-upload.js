const { S3 } = require('@aws-sdk/client-s3');

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

const fileUpload = multer({
  limits: 500000,
  storage: multerS3({
    s3: s3Client,
    bucket:process.env.S3_BUCKET, 
//    acl: 'public-read', // Adjust the ACL as per your requirement
    key: function (req, file, cb) {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuidv1() + '.' + ext); // Ensure you're calling the function correctly based on your uuid version
    }
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error('Invalid mime type!');
    cb(error, isValid);
  }
});

module.exports = fileUpload 
