const ApplicationError = require('./ApplicationError.js');

class ConflictError extends ApplicationError{
  constructor(message = 'The request could not be completed due to a conflict with the current state of the resource.') {
    super(409,
        message,
    );
  }
}

module.exports = ConflictError;
