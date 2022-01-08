const {Model, DataTypes} = require("sequelize");

const {sequelize} = require("../util/db");

class Session extends Model {
}

Session.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: "users", key: "id"},
    },
    token: {
        type: DataTypes.TEXT,
        allowNull: false,
        references: {model: "blogs", key: "id"},
    },
}, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "session",
});

module.exports = Session;