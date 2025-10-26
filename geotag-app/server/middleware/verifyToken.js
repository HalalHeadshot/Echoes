const jwt = require('jsonwebtoken');

/*
When designing JWT auth:
You know almost every protected resource will need the identity of the logged-in user.
Rather than manually checking token + decoding in every route, you do it once in middleware.
Then req.userId becomes a trusted, convenient handle to reference the user in all downstream route handlers.
Storing userId in req is the standard way to give routes access to authenticated user info. hence req.userId=decoded.id
 */
const verifyToken=(req,res,next)=>{
    const token=req.cookies.token;//req.cookies.token-reads the token that was stored in the browser cookie during login/signup
    if(!token){
        return res.status(401).json({message:'No token provided, unauthorized'});
    }

    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        //#region
        /*
        401 Unauthorized → Means “you are not authenticated” — i.e., no valid credentials were provided.
        Example: user didn’t send a token at all (req.cookies.token missing).
        
        403 Forbidden → Means “you are authenticated, but not allowed” — i.e., the credentials exist but are invalid or you don’t have permission.
        Example: token exists but is invalid, expired, or tampered with (jwt.verify fails).
         */
        //#endregion
        if (err) return res.status(403).json({ message: 'Invalid token' });
        //decoded contains the payload we signed (e.g., { id: userId, iat: timestamp, exp: timestamp })
        req.userId=decoded.id;//middleware adds userId to req object and sends only the id from authenticated user
        /*
        If the token is valid, take the id from the token payload and store it in req.userId.
        This is now available in any route that uses this middleware
         */
        next();//token is valid,proceed to next middleware or route handler
    });
};
module.exports = verifyToken;