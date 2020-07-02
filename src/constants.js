'use strict';

/**
 * Describe password requirements
 * @readonly
 */
module.exports.PASSWORD_RULE = {
    PATTERN: /(?=.*?\d)(?=.*?[A-Z])(?=.*?[a-z])^.{8,64}$/,
    MESSAGE: 'Your password must be at least 8 characters long, be of mixed case and also contain a digit or symbol. ',
};
