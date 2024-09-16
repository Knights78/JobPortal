import DataUriParser from "datauri/parser.js"
import path from "path"
const getDataUri=(file)=>{
    console.log(file)
    const parser=new DataUriParser();
    const extName=path.extname(file.originalname).toString();
    return parser.format(extName,file.buffer)
}

export default getDataUri
//path.extname() extracts the file extension (e.g., .jpg, .png) from the file's original name. file.originalname is typically provided by file upload handlers like Multer in Node.js. The result is then converted to a string.

//parser.format(extName, file.buffer) converts the file into a Data URI. It takes two arguments:
//extName: The file extension (like .jpg or .png), which helps identify the file type (MIME type).
//file.buffer: The actual binary data of the file.