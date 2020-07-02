'use strict';
const {ROLE} = require('../../enums');
const {Op} = require('sequelize');

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
            role: {
                type: Sequelize.ENUM(Object.values(ROLE)),
                defaultValue: ROLE.USER,
                allowNull: false,
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
        const createNameCheckOptions = (isFirstName = false) => {
            const fieldName = `${ isFirstName ? 'first' : 'last' }Name`;
            return (
                {
                    type: 'check',
                    fields: [fieldName],
                    where: {
                        [fieldName]: {
                            [Op.iRegexp]: '^[a-z]+$',
                        },
                    },
                }
            );
        };

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
    down: async (queryInterface) => {
        await queryInterface.dropTable(tableName);
    },
};
