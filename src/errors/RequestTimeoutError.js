const ApplicationError = require('./ApplicationError.js');

class RequestTimeoutError extends ApplicationError{
  constructor(message = 'The server understood the request, but is refusing to fulfill it.') {
    super(403,
        message,
    );
  }
}

module.exports = RequestTimeoutError;
