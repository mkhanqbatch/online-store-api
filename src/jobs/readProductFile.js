import Product from "../models/product";
import XlsxSheet from "../models/xlsxSheets";
import { s3 } from "../services/AwsStorage";
import { Types } from "mongoose";
import csvParser from "csv-parser";
const readFileData = (agenda) => {
  let chunk = [];

  agenda.define("readFile", async () => {
    const allProductFiles = await XlsxSheet.find({ productsAdded: false });
    console.log("job is running");
    allProductFiles.forEach(async (productFile) => {
      //make a readable stream
      const params = { Bucket: productFile.bucket, Key: productFile.key };
      const readableStream = s3
        .getObject(params)
        .createReadStream()
        .pipe(csvParser());

      readableStream.on("data", async (data) => {
        const document = {
          ...data,
          sellerId: productFile.sellerId,
          _id: new Types.ObjectId().toHexString(),
        };
        chunk.push({ insertOne: { document } });

        if (chunk.length == 500) {
          readableStream.pause();
          await Product.bulkWrite(chunk);
          chunk = [];
          readableStream.resume();
        }
      });
      readableStream.on("end", async (err) => {
        if (err) console.log("An error has occurred");
        else {
          try {
            if (chunk?.length > 0) {
              console.log("length", chunk.length);
              await Product.bulkWrite(chunk);
            }
            await XlsxSheet.updateOne(
              { _id: productFile._id },
              { productsAdded: true },
              { new: true }
            );
            console.log("products added successfully.");
          } catch (e) {
            console.log(e.message);
          }
        }
      });
    });
  });

  agenda.every("30 seconds", "readFile");
};
export default readFileData;
