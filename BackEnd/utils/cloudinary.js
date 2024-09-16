import {v2 as cloudinary} from "cloudinary"
import dotenv from "dotenv"

dotenv.config()
cloudinary.config({ 
    cloud_name: 'dzgfis2sd', 
    api_key: '141893675432852', 
    api_secret: process.env.API_SECRET // Click 'View API Keys' above to copy your API secret
});

export default cloudinary