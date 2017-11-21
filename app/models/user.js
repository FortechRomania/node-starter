const bcrypt = require( "bcrypt" );
const mongoose = require( "mongoose" );

const { Schema } = mongoose;

const userSchema = new Schema( {
    id: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true, min: 18 },
    sex: { type: String, required: true, enum: [ "male", "female" ] },
}, {
    timestamps: true,
} );

userSchema.methods.setPass = function( password ) {
    const saltRounds = 10;
    bcrypt.hash( password, saltRounds, function( err, hash ) {
        this.password = hash;
    } );
};

module.exports = mongoose.model( "User", userSchema );
