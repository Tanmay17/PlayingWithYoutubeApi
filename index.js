const express = require("express");
const mongoose = require("mongoose");

let app;
mongoose
  .connect("mongodb://localhost:27017/fp-assignment", { useNewUrlParser: true })
  .then(() => {
    app = express();
    const routes = require("./src/video/routes");

    app.use("/", routes);
    app.listen(3000, async () => {
      await mongoose.connect("mongodb://localhost:27017/fp-assignment");
      console.log("Server is listening on port 3000");
    });
  });

module.exports = {
  app,
};
