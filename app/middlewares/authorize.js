const mongoose = require( "mongoose" );

const User = mongoose.model( "User" );

module.exports = function( req, res, next ) {
    const id = req.body.id;

    User.findOne(
        { id },
        function( err, user ) {
            if ( err || !user ) {
                if ( err ) {
                    console.log( err );
                }
                return res.unauthorized( );
            }
            req.user = user;
            return next( );
        } );
};
