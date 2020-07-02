'use strict';

const ApplicationError = require('./ApplicationError.js');

class AuthenticationTimeoutError extends ApplicationError {
    constructor(message = 'Sorry, your session has expired. Please refresh and try again.') {
        super(419, message);
    }
}

module.exports = AuthenticationTimeoutError;
