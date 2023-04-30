import Cloud from "@google-cloud/storage";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serviceKey = path.join(__dirname, "./notional-cab-384210-146e9e056a32.json");

const { Storage } = Cloud;
const storage = new Storage({
  projectId: "little-bookstore",
  keyFilename: serviceKey,
});

export default storage;
