const express = require('express')

const apiConfig = require('../config/appConfig')
const blogController = require('../controllers/blogController')

let setRouter = (app) => {

    let baseUrl = apiConfig.apiVersion + '/blogs';

    app.get(baseUrl+'/all', blogController.getAllBlogs)

    app.get(baseUrl+'/view/:blogId', blogController.viewByBlogId);

    app.post(baseUrl+'/create', blogController.createBlog);

    app.put(baseUrl+'/:blogId/edit', blogController.editBlog);

    app.post(baseUrl+'/:blogId/delete', blogController.deleteBlog);

}

module.exports = {
    setRouter: setRouter
}