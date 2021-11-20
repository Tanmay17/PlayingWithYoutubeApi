const express = require( 'express' );
const {} = require( './handler' );

const router = express.Router();

router.get( '/', ()=> {
    return 'Hello world';
} );


module.exports = router;