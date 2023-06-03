import multer from "multer";
const multerStorage = multer({
  storage: multer.memoryStorage(),
});
const upload = multerStorage.any();
export default upload;
