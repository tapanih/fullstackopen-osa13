const Blog = require('./blog');
const User = require('./user');

void Blog.sync();
void User.sync();

module.exports = {Blog, User};
