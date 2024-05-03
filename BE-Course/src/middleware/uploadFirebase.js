const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
async function uploadFirebase({ file, name ,type}) {
  const storage = getStorage();
  const storageRef = ref(storage, name);
  const metadata = {
    contentType: type,
  };
  try {
    await uploadBytes(storageRef, file.buffer, metadata);

    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("An error occurred while uploading the file.");
  }
}

module.exports = uploadFirebase;
