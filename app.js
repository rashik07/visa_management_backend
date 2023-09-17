const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());
app.use(express.static('public'));
const passportInfoRoute = require("./routes/passportInfo.route");

// const productRoute = require("./routes/product.route");
// const cartRoute = require("./routes/cart.route");
// const wishlistRoute = require("./routes/wishlist.route");
// const orderRoute = require("./routes/order.route");

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

app.use("/api/v1/passport", passportInfoRoute);
app.use("/api/v1/passport", passportInfoRoute);
// app.use("/api/v1/product", productRoute);
// app.use("/api/v1/cart", cartRoute);
// app.use("/api/v1/wishlist", wishlistRoute);
// app.use("/api/v1/order", orderRoute);



module.exports = app;
