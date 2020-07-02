'use strict';

/**
 * @typedef {(Symbol|string|number)} Action
 * */

/**
 * @typedef {string} Role
 */

/**
 * @typedef {(Symbol|string|number)} Entity
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
 * @readonly
 * @enum {Role}
 */
module.exports.ROLE = {
    ADMIN: 'ADMIN',
    USER: 'USER',
    MODERATOR: 'MODERATOR',
};

/**
 * @readonly
 * @enum {Entity}
 */
module.exports.ENTITY = {
    USER: Symbol('USER'),
    TASK: Symbol('TASK'),
};