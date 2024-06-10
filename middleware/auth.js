const jwt = require("jsonwebtoken")
const usermodel = require("../model/userschema")
const jwtkey = "My_JWT_KEY"

const validateuser = async (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "UnAuthorized User"
        })
    }

    try {
        jwt.verify(req.headers.authorization, jwtkey)
    } catch (error) {
        res.status(401).json({
            message: "Unauthorized user", error
        })
    }

    const tokendata = jwt.decode(req.headers.authorization)
    console.log(tokendata);

    const now = Math.floor(new Date().getTime() / 1000)

    if (tokendata.exp < now && tokendata.iat > now) {
        return res.status(401).json({
            message: "UnAuthorized User"
        })
    }

    const userid = tokendata.userid;

    const user = await usermodel.findById(userid);

    if (!user) {
        return res.status(401).json({
            message: "UnAuthorized User"
        })
    }

    req.user = user;
    next();

}

module.exports = validateuser