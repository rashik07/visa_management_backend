const PassportInfo = require("../modules/PassportInfo");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const {
  dataPostService,
  getPassportInfo,
  getAllPassportInfo,
  deleteAllPassportInfo,
} = require("../services/passportInfo.service");

const giveCurrentDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;
  return dateTime;
};
// const storage = getStorage();

exports.postPassportInfo = async (req, res) => {
  const dateTime = giveCurrentDateTime();
  const storage = getStorage();
  const storageRef = ref(
    storage,
    `files/${req.file.originalname + "       " + dateTime}`
  );

  // Create file metadata including the content type
  const metadata = {
    contentType: req.file.mimetype,
  };

  // Upload the file in the bucket storage
  const snapshot = await uploadBytesResumable(
    storageRef,
    req.file.buffer,
    metadata
  );
  //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

  // Grab the public url
  const downloadURL = await getDownloadURL(snapshot.ref);

  console.log("File successfully uploaded.");
  const image = req.file.filename;
  const name = req.body.name;
  const passport = req.body.passport;

  try {
    //   await wishlistItem.save();
    // res.status(200).json(req.file);
    const data = await dataPostService(downloadURL, name, passport);

    res.status(200).send({ message: "Item added to wishlist" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.getPassportInfo = async (req, res) => {
  const { _id } = req.query;

  try {
    const data = await getPassportInfo(_id);
    //   const wishlist = await Wishlist.find({ userId });

    res.send(data);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
exports.getAllPassportInfo = async (req, res) => {
  // const { _id } = req.query;
  try {
    const data = await getAllPassportInfo();

    res.send(data);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.updatePassportInfo = async (req, res) => {
  try {
    const { id } = req.params;
// console.log()
    // First, check if the passport information exists
    const passportInfoItem = await PassportInfo.findById(id);
if(req?.file?.originalname){
    if (!passportInfoItem) {
      return res.status(404).json({
        status: "fail",
        error: "No passport found. Please create an account",
      });
    }
    const dateTime = giveCurrentDateTime();
    const storage = getStorage();
    const storageRef = ref(
      storage,
      `files/${req?.file?.originalname + "       " + dateTime}`
    );

    // Create file metadata including the content type
    const metadata = {
      contentType: req?.file?.mimetype,
    };

    // Upload the file in the bucket storage
    const snapshot = await uploadBytesResumable(
      storageRef,
      req?.file?.buffer,
      metadata
    );
    //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

    // Grab the public url
    const downloadURL = await getDownloadURL(snapshot.ref);
    // Update the passport information

    if (downloadURL) {
      passportInfoItem.image = downloadURL;
    }
  }

    if (req.body.name) {
      passportInfoItem.name = req.body.name;
    }
    if (req.body.passport) {
      passportInfoItem.passport = req.body.passport;
    }

    // Save the updated passport information
    await passportInfoItem.save();

    res.status(200).json({
      status: "Passport updated successfully",
      data: passportInfoItem,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error.message,
    });
  }
};

exports.deletePassportInfo = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await deleteAllPassportInfo(id);

    if (!deletedItem) {
      return res.status(404).send({ error: "Item not found" });
    }
    //     if(res.status==200){
    // fs.unlink(path.join(__dirname,))
    //     }
    res.status(200).send({ message: "Item removed from wishlist" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
