'use strict';

const ApplicationError = require('./ApplicationError.js');

class BadRequestError extends ApplicationError {
    constructor(message = 'The request could not be understood by the server due to malformed syntax.') {
        super(400, message);
    }
}

module.exports = BadRequestError;
