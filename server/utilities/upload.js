import gc from "../config/index.js";
const bucket = gc.bucket("little-bookstore");

export const uploadImage = (file) =>
  new Promise((resolve, reject) => {
    const { originalname, buffer } = file;

    const blob = bucket.file(originalname);
    const blobStream = blob.createWriteStream();

    blobStream
      .on("finish", () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        resolve(publicUrl);
      })
      .on("error", () => {
        reject("Uploading image failed.")
      })
      .end(buffer);
  });
