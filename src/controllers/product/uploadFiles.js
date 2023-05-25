const { XlsxSheet } = require("../../models/xlsxSheets");
const { uploadFile } = require("../../services/AwsStorage");
const uploadFiles = async (file, sellerId) => {
  const result = await uploadFile(file, "myFile" + Date.now());
  const { Location, Key, Bucket } = result;
  const newSheet = new XlsxSheet({ Location, Key, Bucket, sellerId });
  await newSheet.save();
  return "File uploaded successfully.";
};
module.exports = { uploadFiles };
