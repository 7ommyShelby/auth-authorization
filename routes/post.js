const express = require("express");

const router = express.Router();

const {listpost, createpost} = require("../controllers/post")

const rolemiddlware = require('../middleware/post')

router.get("/post", listpost);

router.post("/post", rolemiddlware('creater'), createpost); 

module.exports = router;