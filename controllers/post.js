// const express = require("express")

const listpost = async  (req, res) => {
    // console.log(req.headers);
    res.json({
        message: "Logged"
    })
}

const createpost = async (req, res)=>{
    res.json({
        message: "You can create a post"
    })
}

const postcontroller = {
    listpost,
    createpost
}

module.exports = postcontroller;