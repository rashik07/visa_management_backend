const PassportInfo = require("../modules/PassportInfo");

const { dataPostService, getPassportInfo, getAllPassportInfo, deleteAllPassportInfo } = require("../services/passportInfo.service");


exports.postPassportInfo = async (req, res) => {
     
     const image=req.file.filename;
     const name= req.body.name;
     const passport= req.body.passport
  try {
    //   await wishlistItem.save();
    // res.status(200).json(req.file);
    const data = await dataPostService(image,name,passport);

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

    // First, check if the passport information exists
    const passportInfoItem = await PassportInfo.findById(id);

    if (!passportInfoItem) {
      return res.status(404).json({
        status: "fail",
        error: "No passport found. Please create an account",
      });
    }

    // Update the passport information
    if (req.file) {
      passportInfoItem.image = req.file.filename;
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