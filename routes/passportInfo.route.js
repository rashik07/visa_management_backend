
// import { initializeApp } from "firebase/app";
// import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
// import multer from "multer";
// import config from "../config/firebase.config";

const {initializeApp} = require("firebase/app");
const { getStorage, ref, getDownloadURL, uploadBytesResumable }=require("firebase/storage");
const express = require("express");
const multer = require("multer");
const config = require("../config/firebase.config");

const passportInfoController = require("../controllers/passportInfo.controller");



const router = express.Router();



// const upload =require("../middileware/uploader");
initializeApp(config.firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();

// Setting up multer as a middleware to grab photo uploads
const upload = multer({ storage: multer.memoryStorage() });

router.post("/post", upload.single('filename'), passportInfoController.postPassportInfo);
router.get("/get", passportInfoController.getPassportInfo);
router.get("/get/all", passportInfoController.getAllPassportInfo);
router.put("/update/:id",upload.single('filename'), passportInfoController.updatePassportInfo);
router.delete("/delete/:id", passportInfoController.deletePassportInfo);

// router.post('/stats', upload.single('uploaded_file'), function (req, res) {
//     // req.file is the name of your file in the form above, here 'uploaded_file'
//     // req.body will hold the text fields, if there were any 
//     console.log(req.file, req.body)
//  });

module.exports = router;