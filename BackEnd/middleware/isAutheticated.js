// import jwt from "jsonwebtoken"

// export const isAuthenticated=async(req,res,next)=>{
//     try {
//         const token=req.cookies.token
//         if(!token)
//         {
//             return res.status(401).json({
//                 message:"Token not found (user not autheticated)",
//                 success:false
//             })
//         }
//         //after getting the token decode it
//         const decode=await jwt.verify(token,process.env.SECRET_KEY)//whatever sata we have used to generate the token that data will be decoded here
//         if(!decode)
//         {
//             return res.status(401).json({
//                 message:"error in decoding the token",
//                 status:false
//             })
//         }
//         req.id=decode.userId;
//         next();

//     } catch (error) {
//         console.log(error)
//     }
// }
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        //console.log("isticayedauthen",token)
        if (!token) {
            return res.status(401).json({
                message: "Token not found (user not authenticated)",
                success: false
            });
        }
        
        // Verify the token
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        if (!decode) {
            return res.status(401).json({
                message: "Error in decoding the token",
                success: false
            });
        }
        //console.log("DECODE",decode)
        req.id = decode.userId;
        next();

    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Token expired, please log in again",
                success: false
            });
        }
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
