const express = require( 'express' );
const { getVideos } = require( './handler' );

const router = express.Router();

router.get( '/', ()=> {
    return 'Hello world';
} );

router.get( '/video', getVideos );


module.exports = router;