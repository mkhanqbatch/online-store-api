//aws
const AWS = require("aws-sdk");
require("dotenv").config();
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SK_KEY,
});

const uploadFile = (file, key) => {
  return new Promise((resolve, reject) => {
    try {
      const BUCKET = "qbatch";
      const uploadParams = {
        Bucket: BUCKET + "/images",
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      s3.upload(uploadParams, function (err, data) {
        if (err) {
          return reject(err);
        }
        if (data) {
          return resolve(data);
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
};
const deleteFile = (filePath) => {
  return new Promise((resolve, reject) => {
    try {
      var params = {
        Bucket: "qbatch",
        Key: filePath,
      };

      s3.deleteObject(params, function (err, data) {
        if (err) return reject(err);
        return resolve({ data });
      });
    } catch (err) {
      return reject(err);
    }
  });
};

module.exports = { uploadFile, deleteFile };
