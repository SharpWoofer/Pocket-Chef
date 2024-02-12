import jwt from 'jsonwebtoken';
export const verifyToken = async (req, res, next) => {
    try{
        let token = req.headers["Token Authorization"];
        if (!token) return res.status(403).json("Token is not provided");
        if(token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft();
        }
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        if(!verified) return res.status(401).json("Token verification failed");
        req.user = verified;
        next();
    }catch (err){
        return res.status(500).json("Token is not valid");
    }
}