import { Types } from "mongoose";
import XlsxSheet from "../../models/xlsxSheets";
const SaveFileInfo = async ({ sellerId, bucket, key }) => {
  const newSheet = new XlsxSheet({
    _id: new Types.ObjectId().toHexString(),
    sellerId,
    key,
    bucket,
  });
  await newSheet.save();
  return "File Info save successfully.";
};
export default SaveFileInfo;
