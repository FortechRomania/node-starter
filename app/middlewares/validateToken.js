const jwt    = require( "jsonwebtoken" );
const SECRET = "superSuperSecret";

module.exports = function( req, res, next ) {
    const token = req.body.token || req.query.token || req.headers[ "x-access-token" ];

    if ( token ) {
        jwt.verify( token, SECRET, function( err, decoded ) {
            if ( err ) {
                return res.json( {
                    success: false,
                    message: "Failed to authenticate token."
                } );
            } else {
                req.decoded = decoded;
                next( );
            }
        } );
    } else {
        return res.status( 403 ).send( {
            success: false,
            message: "No token provided."
        } );
    }
};
