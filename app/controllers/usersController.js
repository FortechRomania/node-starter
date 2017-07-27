const mongoose = require( "mongoose" );
const extractObject = require( "../utilities" ).extractObject;
const jwt = require( "jsonwebtoken" );
const md5 = require( "md5" );

const User = mongoose.model( "User" );
const SECRET = "superSuperSecret";

exports.register = ( req, res ) => {
    let user = req.user;
    if ( user ) {
        return res.preconditionFailed( "existing_user" );
    }
    user = new User( req.body );
    user.setPass( req.body.password );
    user.save( function( err, savedUser ) {
        if ( err ) {
            return res.validationError( err );
        } else {
            return res.success( extractObject(
                savedUser,
                [ "id", "username" ] ) );
        }
    } );
};

exports.login = ( req, res ) => {
    const user = req.user;
    if ( !req.body.password ) {
        res.status( 400 ).send( "password required" );
        return;
    }

    const password = md5( req.body.password );
    if ( user ) {
        if ( user.password !== password ) {
            return res.json( {
                success: false,
                message: "Authentication failed. Wrong password.",
            } );
        }

        const token = jwt.sign( user.toObject(), SECRET, { expiresIn: 1440 } );
        return res.json( {
            success: true,
            token,
            } );
    }
    return res.json( {
        success: false,
        message: "Authentication failed. User not found.",
    } );
};

exports.edit = ( req, res ) => {
    const user = req.user;
    const name = req.body.name;
    const sex = req.body.sex;
    const age = req.body.age;

    user.name = name;
    user.sex = sex;
    user.age = age;

    user.save( function( err, savedUser ) {
        if ( err ) {
            return res.validationError( err );
        }
        return res.success( extractObject(
            savedUser,
            [ "id", "name", "age", "sex" ] ) );
    } );
};

exports.delete = ( req, res ) => {
    const user = req.user;

    user.remove( );
    res.success( );
};
