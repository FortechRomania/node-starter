const usersRoutes = require( "./users/routes" );

module.exports = ( app ) => {
    app.use( "/", usersRoutes );
};
