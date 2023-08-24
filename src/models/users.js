module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'user_id',
            primaryKey: true,
            autoIncrement: true,
        },
        user_name: {
            type: DataTypes.STRING,
            field: 'user_name',
            allowNull: false,
        },
        user_phone: {
            type: DataTypes.STRING,
            field: 'user_phone',
            allowNull: true,
        },
        user_gender: {
            type: DataTypes.INTEGER,
            field: 'user_gender',
            allowNull: true,
        },
        user_description: {
            type: DataTypes.TEXT,
            field: 'user_description',
            allowNull: true,
        },
        user_birth: {
            type: DataTypes.INTEGER,
            field: 'user_birth',
            allowNull: true,
        },
        user_email: {
            type: DataTypes.STRING,
            field: 'user_email',
            allowNull: true,
        },
        user_address: {
            type: DataTypes.STRING,
            field: 'user_address',
            allowNull: true,
        },
        user_avatar: {
            type: DataTypes.STRING,
            field: 'user_avatar',
            allowNull: true,
        },
        user_status: {
            type: DataTypes.INTEGER,
            field: 'user_status',
            allowNull: false,
            defaultValue: 0,
        },
        user_data: {
            type: DataTypes.TEXT,
            field: 'user_data',
            allowNull: true,
        },
        // Junior - Senior
        user_skill: {
            type: DataTypes.INTEGER,
            field: 'user_skill',
            allowNull: true,
        },
        user_role_id: {
            type: DataTypes.INTEGER,
            field: 'user_role_id',
            allowNull: true,
        },
        user_department_id: {
            type: DataTypes.INTEGER,
            field: 'user_department_id',
            allowNull: true,
        },
        // Staff - Leader - Manager - ...
        user_position: {
            type: DataTypes.INTEGER,
            field: 'user_position',
            allowNull: true,
        },
        user_password: {
            type: DataTypes.STRING,
            field: 'user_password',
            allowNull: false,
        }
    })
    return User;
}