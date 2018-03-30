const mindsetModel = (sequelize, DataTypes) => {
    const Mindset = sequelize.define('enejomindset', {
        user_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        part_one_sum: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        part_two_sum: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        grand_sum: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        part_one: {
            type: DataTypes.JSON,
            allowNull: false
        },
        part_two: {
            type: DataTypes.JSON,
            allowNull: false
        }
    }, {
        freezeTableName: true
    });

    return Mindset;
};

export default mindsetModel;
