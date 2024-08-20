const { StatusCodes } = require("http-status-codes")
const jwt = require("jsonwebtoken")

function authMiddleware(req,res,next){
    const authHeader=req.headers.authorization
    console.log(authHeader)
    if(!authHeader ||!authHeader.startsWith("Bearer")){
        return res.status(StatusCodes.UNAUTHORIZED).json({msg:" bearer invalid authentication",})
    }
    try {
        const token=authHeader.split(' ')[1]
        const { username, userid } = jwt.verify(token, "MkZLgWzdY4i4Hz6KMKixrtKeX0UTom7Q6yyy76r");
        req.user={username,userid}
        next()
    } catch (error) {
        
            return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ msg: " auth invalid authentication" });

    }
}
module.exports = authMiddleware