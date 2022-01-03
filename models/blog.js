const {DataTypes, Model} = require("sequelize");
const {sequelize} = require("../util/db");

class Blog extends Model {
}

Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    author: {
        type: DataTypes.TEXT,
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    year: {
        type: DataTypes.INTEGER,
        validate: {
            isInt: true,
            min: 1991,
            isLessThanOrEqualToCurrentYear(value) {
                if (parseInt(value) > new Date().getFullYear()) {
                    throw new Error("year cannot be greater than current year");
                }
            },
        },
    },
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "blog",
});

module.exports = Blog;