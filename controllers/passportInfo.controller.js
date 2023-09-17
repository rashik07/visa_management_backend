// const PassportInfo = require("../modules/PassportInfo");

const { dataPostService, getPassportInfo, getAllPassportInfo, deleteAllPassportInfo } = require("../services/passportInfo.service");


exports.postPassportInfo = async (req, res) => {
        console.log(req.body);
        console.log(req.file);
     const image=req.file.filename;
     const name= req.body.name;
     const passport= req.body.passport
  try {
    //   await wishlistItem.save();
    // res.status(200).json(req.file);
    const data = await dataPostService(image,name,passport);
    console.log(data);
    res.status(200).send({ message: "Item added to wishlist" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.getPassportInfo = async (req, res) => {
  const { _id } = req.query;
  console.log(req.query)
  try {
    const data = await getPassportInfo(_id);
    //   const wishlist = await Wishlist.find({ userId });
    // console.log(data)
    res.send(data);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
exports.getAllPassportInfo = async (req, res) => {
  // const { _id } = req.query;
  try {
    const data = await getAllPassportInfo();
    //   const wishlist = await Wishlist.find({ userId });
    // console.log(data)
    res.send(data);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.deletePassportInfo = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
    const deletedItem = await deleteAllPassportInfo(id);
    console.log(deletedItem)
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