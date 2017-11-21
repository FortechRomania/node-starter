const mongoose = require( "mongoose" );

const User = mongoose.model( "User" );

module.exports = ( req, res, next ) => {
    const { id } = req.body;
    if ( !id ) {
        return res.preconditionFailed( "missing_id" );
    }

    return User.findOne(
        { id },
        ( err, user ) => {
            if ( err ) {
                // if( err ) {
                return res.serverError( );
                // }
                // return res.unauthorized( );
            }
            req.user = user;
            return next( );
        },
    );
};
