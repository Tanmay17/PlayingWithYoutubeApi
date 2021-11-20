const { VideoModel } = require('../model');

module.exports = {

    insert: async (videoData)=> {
        let response = [];

        console.log('Extracting already existing videos data');
        const existingVideos = await VideoModel.find();
        console.log('Extracted already existing videos data');

        const existingVideosYtId = existingVideos.map((existingVideo)=> {
            return existingVideo.ytId;
        });
        
        console.log('Transforming video data for DB insertion');
        const videos = videoData.reduce((map, value) => {
            if (!existingVideosYtId.includes(value.id.videoId)) {
                map.push({
                    title: value.snippet.title,
                    description: value.snippet.description,
                    publishedOn: value.snippet.publishTime,
                    thumbnailURL: value.snippet.thumbnails.default.url,
                    ytId: value.id.videoId
                });
            }
            return map;
        }, [] );
        console.log('Transformed video data for DB insertion');

        try {
            console.log('Inserting video data in DB');
            response = await VideoModel.insertMany(videos);
            console.log('Inserted video data in DB');
        } catch (e) {
            console.error('Some error occured in inserting video data', e)
        }

        return response;
    } 

}