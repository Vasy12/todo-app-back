'use strict';
const Op = require('sequelize').Op;

const tableName = 'Users';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const nameSchema = {
      allowNull: false,
      type: Sequelize.STRING,
    };

    await queryInterface.createTable(tableName, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: nameSchema,
      lastName: nameSchema,
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      passwordHash: {
        allowNull: false,
        unique: true,
        type: Sequelize.TEXT,
      },
      salt: {
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
     * first & last names attributes "CHECK" constraint conditions
     * */
    const createNameCheckOptions = (isFirstName = false) => ( {
      type: 'check',
      fields: [`${isFirstName ? 'first' : 'last'}Name`],
      where: {
        firstName: {
          [Op.regexp]: '^[a-z]+$',
        },
      },
    } );

    /**
     * Add "CHECK" constraints to first & last names attributes
     */
    await queryInterface.addConstraint(tableName,
                                       createNameCheckOptions(true));

    await queryInterface.addConstraint(tableName,
                                       createNameCheckOptions());

    /**
     * Add check constraint for email attribute
     */
    await queryInterface.addConstraint(tableName, {
      type: 'check',
      fields: ['email'],
      where: {
        email: {
          [Op.notRegexp]: '^\s*$', // not only empty space
        },
      },
    });

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(tableName);
  },
};
