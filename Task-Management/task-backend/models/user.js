module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: true,
    });

    User.associate = (models) => {
        User.hasMany(models.Task, {
            foreignKey: 'userId',
            as: 'tasks',
        });
    };

    return User;
};
