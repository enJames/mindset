const UserMindsetData = (sequelize, DataTypes) => {
    const mindsetDataTable = sequelize.define('user_mindset_data', {
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

    return mindsetDataTable;
};

export default UserMindsetData;
