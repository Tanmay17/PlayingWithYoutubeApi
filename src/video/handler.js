const { validationResult } = require("express-validator");
const {
  Service: { VideoService },
} = require("../../lib");
const { VideoModel } = require("../../lib/model");

const getVideos = async function getVideos(req, res) {
  const { search, page } = req.query;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    var data;

    if (search) {
      console.log("GET /video => Filtering Video Data");
      data = await VideoService.filterData(search);
      console.log("GET /video => Filtered Video Data");

      if (!data) {
        console.error("GET /video => Some Error Occured while Filtering Data");
        return res.sendStatus(422);
      }
    }

    if (!data) data = await VideoModel.find().sort({ publishedOn: -1 });
    console.log("GET /video => Paginating Vaccines Data");
    const paginatedData = await VideoService.paginatedData(data, page);
    console.log("GET /video => Paginated Vaccines Data");

    if (!paginatedData) {
      console.error("GET /video => Some Error Occured while Paginating Data");
      return res.sendStatus(422);
    }

    return res.send({ data: paginatedData }).status(200);
  } catch (error) {
    console.error("GET /video =>", error.message);
    return res.sendStatus(500);
  }
};

module.exports = {
  getVideos,
};
