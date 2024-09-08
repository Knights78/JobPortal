import multer from "multer"
const storage=multer.memoryStorage()//we are storing it in the browser itself they are kept in a meemory
export const singleUpload=multer({storage}).single("file")
// This creates a middleware function singleUpload that handles uploading a single file at a time.
// multer({ storage }): Initializes multer with the specified storage option (memoryStorage).
// .single("file"): Specifies that only one file should be uploaded at a time, and the file will be associated with the form field named "file"