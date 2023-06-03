import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SK_KEY,
  region: "eu-north-1",
});
const getSignedUrl = async (bucket, key) => {
  const params = {
    Bucket: bucket,
    Key: key,
    ACL: "private", // Set the desired ACL for the uploaded object
    ContentType: "application/octet-stream", // Set the desired content type of the uploaded object
  };

  return new Promise((resolve, reject) => {
    s3.getSignedUrl("putObject", params, (err, url) => {
      if (err) {
        reject(err);
      } else {
        resolve(url);
      }
    });
  });
};
const uploadFile = (file, key) => {
  return new Promise((resolve, reject) => {
    try {
      const BUCKET = "myqbatchx";
      const uploadParams = {
        Bucket: BUCKET,
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
        Bucket: "qbatchfile",
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

export { uploadFile, deleteFile, getSignedUrl, s3 };
