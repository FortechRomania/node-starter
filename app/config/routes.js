const errorsController = require( "../controllers/errorsController" );
//add other controllers that are used

const express = require( "express" );
const router  = express.Router( );

// Add routes below
// Example: router.post/get/put/ ..../delete ( path, middlewares ( if any ), controllerFunction );

//use apiDoc to generate documentation for API routes
//Details on how to use on: http://apidocjs.com/

router.get( "/test", function( req, res ) {
    console.log( req );
    res.json( { success: true } );
} );

router.use( errorsController.notFound );

module.exports = function( app ) {
    app.use( "/", router );
    app.use( errorsController.errorLogger );
    app.use( errorsController.errorHandler );
};
