const mongoose      = require( "mongoose" );
const extractObject = require( "../utilities/functions" ).extractObject;
const User          = mongoose.model( "User" );

exports.register = ( req, res ) => {
    let user     = req.user;

    if ( user ) {
        res.preconditionFailed( "existing_user" );
    } else {
        user = new User( req.body );
        user.save( function( err, savedUser ) {
            if ( err ) {
                res.validationError( err );
            } else {
                res.success( extractObject(
                    savedUser,
                    [ "id", "name", "age", "sex" ] ) );
            }
        } );
    }
};

exports.edit = ( req, res ) => {
    const user = req.user;
    const name = req.body.name;
    const sex  = req.body.sex;
    const age  = req.body.age;

    user.name  = name;
    user.sex   = sex;
    user.age   = age;

    user.save( function( err, savedUser ) {
        if ( err ) {
            res.validationError( err );
        } else {
            res.success( extractObject(
                savedUser,
                [ "id", "name", "age", "sex" ] ) );
        }
    } );
};

exports.delete = ( req, res ) => {
    const user = req.user;

    user.remove( );
    res.success( );
};
