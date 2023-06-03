import { getSignedUrl } from "../../services/AwsStorage";

const GetS3Url = async (bucket, key) => {
  const url = await getSignedUrl(bucket, key);
  return url;
};
export default GetS3Url;
