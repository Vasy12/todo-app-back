'use strict';
const crypto = require('crypto');
const {Model} = require('sequelize');

/**
 * Result hash length
 */

module.exports = (sequelize, DataTypes) => {

  class User extends Model{

    /**
     *
     * @param {string} password - password plain text
     * @returns {boolean} - returns true, if the password is correct
     */
    isPasswordCorrect (password) {

      return this.password ===
             crypto.scryptSync(password, this.salt,
                               User.PASSWORD_HASH_LENGTH * 0.75)
               .toString('base64');

    }

    static PASSWORD_HASH_LENGTH = 64;
    static SALT_LENGTH = 64;

    static generatePasswordSalt () {
      return crypto.randomBytes(
        User.SALT_LENGTH * 0.75)
        .toString(
          'base64');
    }

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      User.hasMany(models.Task, {
        as: {
          singular: 'task',
          plural: 'tasks',
        },
        foreignKey: 'userId',
        targetKey: 'id',
      });
      User.hasMany(models.RefreshToken, {
        as: {
          singular: 'refreshToken',
          plural: 'refreshTokens',
        },
        foreignKey: 'userId',
        targetKey: 'id',
      });
    }
  }

  User.init({
              id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
              },
              firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                  isAlpha: true,
                  notEmpty: true,
                },
              },
              lastName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                  isAlpha: true,
                  notEmpty: true,
                },
              },
              email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                  isEmail: true,
                  notEmpty: true,
                },
              },
              salt: {
                type: DataTypes.TEXT,
                unique: true,
                allowNull: false,
              },
              password: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: 'passwordHash',
                /**
                 * Password setter; Generate the salt & hash the password
                 * @param value - password plain text value
                 */
                set (value) {
                  /**
                   * Set generated value to salt attribute
                   */
                  this.setDataValue('salt', User.generatePasswordSalt());
                  /**
                   * Hashing password value with salt
                   */
                  this.setDataValue('password',
                                    crypto.scryptSync(value, this.salt,
                                                      User.PASSWORD_HASH_LENGTH *
                                                      0.75)
                                      .toString('base64'));
                },
              },

            }, {
              sequelize,
              modelName: 'User',
            });

  return User;
};
