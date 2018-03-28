module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Mindset', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        user_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        part_one_sum: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        part_two_sum: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        grand_sum: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        part_one: {
            type: Sequelize.JSON,
            allowNull: false
        },
        part_two: {
            type: Sequelize.JSON,
            allowNull: false
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    }, {
        freezeTableName: true
    }),
    down: queryInterface => queryInterface.dropTable('Mindset')
};
