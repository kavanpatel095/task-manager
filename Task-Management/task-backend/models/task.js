module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('pending', 'in progress', 'completed'),
            allowNull: false,
            defaultValue: 'pending',
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        timestamps: true,
    });

    Task.associate = (models) => {
        Task.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });
    };

    return Task;
};
