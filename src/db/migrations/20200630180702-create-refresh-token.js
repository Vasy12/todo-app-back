'use strict';

const {Op} = require('sequelize');

const tableName = 'RefreshTokens';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Create "RefreshTokens" table query
     */
    await queryInterface.createTable(tableName, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
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
        unique: true,
        type: Sequelize.TEXT,
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
     * Add "CHECK" constraint to "RefreshTokens"."body" attribute
     */
    await queryInterface.addConstraint(tableName, {
      type: 'check',
      fields: ['body'],
      where: {
        body: {
          [Op.notRegexp]: '^\s*$',
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(tableName);
  },
};