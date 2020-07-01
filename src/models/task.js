'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Task.belongsTo(models.User, {
        as: 'owner',
        foreignKey: 'userId',
        targetKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }

  }

  Task.init({
              id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
              },
              body: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                  not: /^\s*$/,
                  notNull: true,
                },
              },
              isDone: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,

              },
              deadline: {
                type: DataTypes.DATE,
                validate: {
                  isDate: true,
                },
              },
            }, {
              sequelize,
              modelName: 'Task',
            });

  return Task;
};
