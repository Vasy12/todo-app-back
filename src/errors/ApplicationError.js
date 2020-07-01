class ApplicationError extends Error{

  constructor(
      status = 500,
      message = 'The server encountered an unexpected condition which prevented it from fulfilling the request.') {
    super(message);
    this._status = status;
  };

  get status() {
    return this._status;
  }
}

module.exports = ApplicationError;
