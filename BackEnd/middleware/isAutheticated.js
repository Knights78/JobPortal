import jwt from "jsonwebtoken"

export const isAuthenticated=async(req,res,next)=>{
    try {
        const token=req.cookies.token
        if(!token)
        {
            return res.status(401).json({
                message:"Token not found (user not autheticated)",
                success:false
            })
        }
        //after getting the token decode it
        const decode=await jwt.verify(token,process.env.SECRET_KEY)//whatever sata we have used to generate the token that data will be decoded here
        if(!decode)
        {
            return res.status(401).json({
                message:"error in decoding the token",
                status:false
            })
        }
        req.id=decode.userId;
        next();

    } catch (error) {
        console.log(error)
    }
}