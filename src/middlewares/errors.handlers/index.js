const {ApplicationError} = require('./../../utils/errors');
const {BaseError} = require('sequelize');
const {ValidationError} = require('yup');

/** Handle own generated errors
 *
 * @param err
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
module.exports.applicationErrorHandler = (err, req, res, next) => {
  if (err instanceof ApplicationError) {
    return res.status(err.status).send({
                                         message: err.message,
                                       });
  }
  return next(err);
};

/** Handle sequelize ORM errors
 *
 * @param err
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
module.exports.sequelizeErrorHandler = (err, req, res, next) => {
  if (err instanceof BaseError) {

  }
  return next(err);
};
/** Handle validation errors
 *
 * @param err
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
module.exports.validationErrorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {

  }
  return next(err);
};

/** handle unknown errors
 *
 * @param err
 * @param req
 * @param res
 * @param next
 */
module.exports.serverErrorHandler = (err, req, res, next) => {
  res.status(500).send({
                         message: 'The server encountered an unexpected condition which prevented it from fulfilling the request.',
                       });
};
