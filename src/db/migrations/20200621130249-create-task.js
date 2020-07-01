'use strict';
const {Op} = require('sequelize');

const tableName = 'Tasks'; // table name string value

module.exports = {
  up: async (queryInterface, Sequelize) => {

    /**
     * Create table query
     */
    await queryInterface.createTable(tableName, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: null,
        references: {
          model: 'Users',
          key: 'id',

        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        type: Sequelize.INTEGER,
      },
      body: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      isDone: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      deadline: {
        allowNull: false,
        defaultValue: Sequelize.literal('now() + CAST(\'7 day\' AS interval)'),
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    /**
     * Add "CHECK" constrains to "Tasks"."body" attribute
     */
    await queryInterface.addConstraint(tableName, {
      type: 'check',
      fields: ['body'],
      where: {
        body: {
          [Op.notRegexp]: '^\s*$', // not only spaces
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(tableName);
  },
};
