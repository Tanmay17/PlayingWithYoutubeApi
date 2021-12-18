const express = require("express");
const mongoose = require("mongoose");
const cron = require("node-cron");
require("dotenv").config();

const {
  Plugin: { Youtube },
  Service: { VideoService },
} = require("./lib");

let app;
mongoose
  .connect(`${process.env.MONGO_URL}`, { useNewUrlParser: true })
  .then(() => {
    app = express();
    const routes = require("./src/video/routes");

    app.use("/", routes);
    app.listen(3000, async () => {
   
      cron.schedule(process.env.CRON_SCHEDULE, async () => {
        console.log("Scheduling Cron");
        const videoData = await Youtube.searchByKeyword();
        if (videoData.length) {
          await VideoService.insert(videoData);
        }
        console.log("Cron Scheduled");
      });

      console.log("Server is listening on port 3000");
    });
  });

module.exports = {
  app,
};
