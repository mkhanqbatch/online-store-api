const { Product } = require("../models/product");
const { XlsxSheet } = require("../models/xlsxSheets");
const csvParser = require("csv-parser");
const axios = require("needle");

module.exports = function readFileData(agenda) {
  agenda.define("readFile", async () => {
    const allProductFiles = await XlsxSheet.find({ productsAdded: false });
    console.log("job is running");
    allProductFiles.forEach(async (productFile) => {
      //make a readable stream
      let chunk = [];
      const readableStream = axios.get(productFile.Location).pipe(csvParser());
      readableStream.on("data", async (data) => {
        const document = { ...data, sellerId: productFile.sellerId };
        chunk.push({ insertOne: { document } });
        if (chunk.length == 100) {
          // console.log("paused on chunk: ", chunkCount++);
          readableStream.pause();
          await Product.bulkWrite(chunk);
          chunk = [];
          readableStream.resume();
        }
        if (readableStream.isPaused()) {
          console.log("paused");
        }
      });
      readableStream.on("done", async (err) => {
        if (err) console.log("An error has occurred");
        else {
          try {
            if (chunk?.length > 0) {
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
async function insertAllDocuments() {
  const chunkSize = 1000;
  try {
    const chunks = [];
    for (let i = 0; i < documents.length; i += chunkSize) {
      const chunk = documents.slice(i, i + chunkSize);
      chunks.push(insertChunk(chunk));
    }
    const results = await Promise.all(chunks);
    console.log("All documents inserted successfully:", results);
  } catch (error) {
    console.error("Error inserting documents:", error);
  }
}
