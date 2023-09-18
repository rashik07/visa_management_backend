const express = require("express");
const passportInfoController = require("../controllers/passportInfo.controller");


const router = express.Router();

const upload =require("../middileware/uploader");


router.post("/post", upload.single('image'), passportInfoController.postPassportInfo);
router.get("/get", passportInfoController.getPassportInfo);
router.get("/get/all", passportInfoController.getAllPassportInfo);
router.delete("/delete/:id", passportInfoController.deletePassportInfo);





// router.post('/stats', upload.single('uploaded_file'), function (req, res) {
//     // req.file is the name of your file in the form above, here 'uploaded_file'
//     // req.body will hold the text fields, if there were any 
//     console.log(req.file, req.body)
//  });

module.exports = router;