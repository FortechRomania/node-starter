const jwt = require( "jsonwebtoken" );

const SECRET = "superSuperSecret";

module.exports = ( req, res, next ) => {
    const token = req.body.token || req.query.token || req.headers[ "x-access-token" ];

    if ( token ) {
        jwt.verify( token, SECRET, ( err, decoded ) => {
            if ( err ) {
                return res.json( {
                    success: false,
                    message: "Failed to authenticate token.",
                } );
            }
            req.decoded = decoded;
            return next( );
        } );
    }

    return res.unauthorized( );
};
