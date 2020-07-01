'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      RefreshToken.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'userId',
        targetKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  RefreshToken.init({
                      id: {
                        type: DataTypes.INTEGER,
                        autoIncrement: true,
                        allowNull: false,
                        primaryKey: true,
                      },
                      body: {
                        type: DataTypes.TEXT,
                        allowNull: false,
                        unique: true,
                        validate: {
                          not: /^\s*$/,
                        },
                      },
                    }, {
                      sequelize,
                      modelName: 'RefreshToken',
                      timestamps: true,
                    });
  return RefreshToken;
};