/**
 * @typedef {(Symbol|string|number)} Action
 * */
/**
 *
 * @readonly
 * @enum {Action}
 */
module.exports.ACTION = {
  CREATE: Symbol('CREATE'),
  READ: Symbol('READ'),
  UPDATE: Symbol('UPDATE'),
  DELETE: Symbol('DELETE'),
  LOGIN: Symbol('LOGIN'),
  SIGN_UP: Symbol('SIGN_UP'),
};

/**
 * @typedef {(Symbol|string|number)} Entity
 * */
/**
 * @readonly
 * @enum {Entity}
 */
module.exports.ENTITY = {
  USER: Symbol('USER'),
  TASK: Symbol('TASK'),
};

module.exports.PASSWORD_RULE = {
  PATTERN: /(?=.*?\d)(?=.*?[A-Z])(?=.*?[a-z])^{8,64}$/,
  MESSAGE: 'Your password must be at least 8 characters long, be of mixed case and also contain a digit or symbol. ',
};
