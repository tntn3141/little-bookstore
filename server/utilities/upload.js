import gc from "../config/index.js";
const bucket = gc.bucket("little-bookstore");

export const uploadImageGC = (file) =>
  new Promise((resolve, reject) => {
    const { originalName, buffer } = file;

    const blob = bucket.file(originalName);
    const blobStream = blob.createWriteStream();

    blobStream
      .on("finish", () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        resolve(publicUrl);
      })
      .on("error", () => {
        reject("Uploading image failed.");
      })
      .end(buffer);
  });

export async function uploadImageIMGBB(base64image) {
  // This function should upload base64image to imgbb, and return 
  // a string that is the display url from imgbb API

  try {
    // Data URL prefixes (e.g "data:image/jpeg;base64,") should be removed
    // as imgbb API doesn't recognize them (2023)
    const base64Data = base64image.replace("data:image/jpeg;base64,", "");

    // "image" as the name of the key is REQUIRED by imgbb API
    const formData = new FormData();
    formData.append("image", base64Data);

    // Headers unnecessary
    return fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => data.data.display_url);
  } catch (err) {
    console.log(err);
  }
}
