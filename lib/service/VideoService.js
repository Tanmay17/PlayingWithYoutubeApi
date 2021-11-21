const { VideoModel } = require("../model");

module.exports = {
  insert: async (videoData) => {
    let response = [];

    console.log("Extracting already existing videos data");
    const existingVideos = await VideoModel.find();
    console.log("Extracted already existing videos data");

    const existingVideosYtId = existingVideos.map((existingVideo) => {
      return existingVideo.ytId;
    });

    console.log("Transforming video data for DB insertion");
    const videos = videoData.reduce((map, value) => {
      if (!existingVideosYtId.includes(value.id.videoId)) {
        map.push({
          title: value.snippet.title,
          description: value.snippet.description,
          publishedOn: value.snippet.publishTime,
          thumbnailURL: value.snippet.thumbnails.default.url,
          ytId: value.id.videoId,
        });
      }
      return map;
    }, []);
    console.log("Transformed video data for DB insertion");

    try {
      console.log("Inserting video data in DB");
      response = await VideoModel.insertMany(videos);
      console.log("Inserted video data in DB");
    } catch (e) {
      console.error("Some error occured in inserting video data", e);
    }

    return response;
  },

  filterData: async (search) => {
    var allVideo;
    try {
      console.log(`Filtering data on the basis of search( ${search} )`);
      allVideo = await VideoModel.find({ $text: { $search: search } }).sort({
        publishedOn: -1,
      });
      console.log(`Filtered data on the basis of search( ${search} )`);
    } catch (error) {
      console.error(`Error in filtering data on search( ${search} )`);
      throw error;
    }
    return allVideo;
  },

  async paginatedData(data, page = 0) {
    try {
      const size = 10;
      const pageNo = parseInt(page);
      const totalSize = data.length;

      if (totalSize <= size) {
        return {
          data,
          page: {
            prev: 0,
            curr: 0,
            next: null,
          },
        };
      } else {
        const curr = pageNo;
        var prev;

        const windowData = data.slice(pageNo * size, (pageNo + 1) * size);
        const prevList = data.slice((pageNo - 1) * size, pageNo * size);

        if (pageNo - 1 < 0) {
          prev = 0;
        } else {
          if (!prevList.length) {
            prev = null;
          } else {
            prev = pageNo - 1;
          }
        }

        const nextList = data.slice((pageNo + 1) * size, (pageNo + 2) * size);
        const next = !nextList.length ? null : pageNo + 1;

        return {
          data: windowData,
          page: {
            prev,
            curr,
            next,
          },
        };
      }
    } catch (error) {
      console.error(`Error in paginating data`);
      throw error;
    }
  },
};
