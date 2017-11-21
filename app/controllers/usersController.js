const mongoose = require( "mongoose" );
const { extractObject } = require( "../utilities" );
const jwt = require( "jsonwebtoken" );
const bcrypt = require( "bcrypt" );

const User = mongoose.model( "User" );
const SECRET = "superSuperSecret";

exports.register = ( req, res ) => {
    let { user } = req;
    if ( user ) {
        res.preconditionFailed( "existing_user" );
        return;
    }
    user = new User( req.body );
    user.setPass( req.body.password );
    user.save( ( err, savedUser ) => {
        if ( err ) {
            return res.validationError( err );
        }
        return res.success( extractObject(
            savedUser,
            [ "id", "username" ],
        ) );
    } );
};

exports.login = ( req, res ) => {
    const { user } = req;
    if ( !req.body.password ) {
        return res.status( 400 ).send( "password required" );
    }

    const password = bcrypt.compareSync( req.body.password, user.password );
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
    const { user } = req;
    const { name, sex, age } = req.body;

    user.name = name;
    user.sex = sex;
    user.age = age;

    user.save( ( err, savedUser ) => {
        if ( err ) {
            return res.validationError( err );
        }
        return res.success( extractObject(
            savedUser,
            [ "id", "name", "age", "sex" ],
        ) );
    } );
};

exports.delete = ( req, res ) => {
    const { user } = req;

    user.remove( );
    res.success( );
};
