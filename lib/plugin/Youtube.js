const { google } = require("googleapis");
const service = google.youtube({
  version: "v3",
  auth: process.env.API_KEY,
});

module.exports = {

  searchByKeyword: async function () {
    try {
      console.log('Extracting new videos');
      const results = await service.search.list({
        part: ["id", "snippet"],
        q: process.env.SEARCH_TOPIC || "f1",
        maxResults: 25,
        order: "date",
      });
      console.log(`Extracted ${results.data.items.length} new videos`);

      return results.data.items;
    } catch (error) {
      console.error("Error occurred in searching video by keyword", error);
    }
  },

};
