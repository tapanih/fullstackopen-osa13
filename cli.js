require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false
});

class Blog extends Model {}
Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: {
        type: DataTypes.TEXT,
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    likes: {
        type: DataTypes.INTEGER,
        default: 0
    }
}, {
    sequelize,
        underscored: true,
        timestamps: false,
        modelName: 'blog'
});

const main = async () => {
    try {
        const blogs = await Blog.findAll( {raw: true});
        blogs.forEach(blog => console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`));
        await sequelize.close();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

void main();