'use strict';

const ApplicationError = require('./ApplicationError.js');

class UnauthorizedError extends ApplicationError {
    constructor(message = 'The request requires user authentication.') {
        super(401, message);
    }
}

module.exports = UnauthorizedError;
