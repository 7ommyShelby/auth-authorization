
const roles = (role) => async (req, res, next) => {
    const user = req.user
    console.log(user);
    console.log(role);

    if(role !== user.role){
        return res.status(403).json({
            message : "Forbidden"
        })
    }
    next()
}

module.exports = roles