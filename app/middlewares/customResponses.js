const customResponses = {
    success( payload ) {
        this.status( 200 ).json( {
            success: true,
            payload: payload
        } );
    },

    unauthorized( ) {
        this.status( 401 ).json( {
            success: false,
            error: "unauthorized"
        } );
    },

    preconditionFailed( customError ) {
        this.status( 412 ).json( {
            success: false,
            error: customError || "precondition_failed"
        } );
    },

    validationError( error ) {
        if ( !error || !error.errors ) {
            return this.serverError( );
        }

        // TODO: check all schemas and potentially extract all keys from there?
        const validationTypes = [ "required", "min", "max", "enum", "maxLen" ];
        const errorResponse = { };
        validationTypes.forEach( type => {
            const typeFields = extractValidationType( error.errors, type );
            if ( typeFields.length > 0 ) {
                errorResponse[ type ] = typeFields;
            }
        } );

        this.unprocessableEntity( errorResponse );
    },

    blocked( ) {
        this.status( 410 ).json( {
            success: false,
            error: "version_blocked"
        } );
    },

    unprocessableEntity( customError ) {
        this.status( 422 ).json( {
            success: false,
            error: "unprocessable_entity",
            payload: customError
        } );
    },

    notFound( ) {
        this.status( 404 ).json( {
            success: false,
            error: "not_found"
        } );
    },

    serverError( ) {
        this.status( 503 ).json( {
            success: false,
            error: "server_error"
        } );
    }
};

module.exports = function( req, res, next ) {
    Object.assign( res, customResponses );
    next( );
};

function extractValidationType( errors, type ) {
    const fields = Object.keys( errors );
    return fields.map( key => errors[ key ] )
                 .filter( validation => validation.kind === type )
                 .map( validation => ( { path: validation.path, message: validation.message } ) );
}
