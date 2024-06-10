const usermodel = require('../model/userschema')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const jwtkey = "My_JWT_KEY"

const signup = async (req, res) => {

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newuser = new usermodel({...req.body, password : hash});
    await newuser.save();

    res.json({
        success: true,
        message: "User registered successfully"
    })
}
const login = async (req, res) => {

    const user = await usermodel.findOne({ email: req.body.email })

    if (!user) {
        return res.json({
            success: false,
            message: "incorrect email or password"
        })
    }
    const tokenexp = Math.floor(new Date().getTime() / 1000) + 3600 

    const payload = {
        userid : user._id,
        name : user.name,
        exp : tokenexp
    }

  const token =   jwt.sign(payload, jwtkey);

    if (bcrypt.compareSync(req.body.password, user.password)) {
        return res.json({
            success: true,
            message: `Welcome, ${user.name}`,
            token : token
        })
    }

    res.json({
        success: false,
        message: "incorrect email or password"
    })
}

const usercontrol = {
    signup, login
}

module.exports = usercontrol