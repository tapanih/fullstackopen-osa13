const Blog = require("./blog");
const User = require("./user");

User.hasMany(Blog);
Blog.belongsTo(User);

void Blog.sync({alter: true});
void User.sync({alter: true});

module.exports = {Blog, User};
