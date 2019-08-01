const express = require('express')
const mongoose = require('mongoose')

const loggerLib = require('../libs/loggerLib')
const responseLib = require('../libs/responseLib')
const shortId = require('shortid')

const BlogModel = require('../models/Blog')

let getAllBlogs = (req, res) => {

    BlogModel.find((err, result) => {
        if (err) {
            loggerLib.error('Failed to find blogs details', 'getAllBlogs > findOne()', 5)
            let apiResponse = responseLib.generate(true, 'Failed to find blog details', 500, err)
            res.send(apiResponse)
        } else if (result == undefined || result == null || result == '') {
            loggerLib.error('Blogs not found', 'getAllBlogs > findOne()', 3)
            let apiResponse = responseLib.generate(true, 'Blog not found', 404, null)
            res.send(apiResponse)
        } else {
            loggerLib.info('Blogs found successfully', 'getAllBlogs > findOne()', 1)
            let apiResponse = responseLib.generate(false, 'Blogs found successfully', 200, result)
            res.send(apiResponse)
        }
    })

}

let viewByBlogId = (req, res) => {

    BlogModel.findOne({ blogId: req.params.blogId }, (err, result) => {
        if (err) {
            loggerLib.error('Failed to find blog details', 'getAllBlogs > findOne()', 5)
            let apiResponse = responseLib.generate(true, 'Failed to find blog details', 500, err)
            res.send(apiResponse)
        } else if (result == undefined || result == null || result == '') {
            loggerLib.error('Blog not found', 'getAllBlogs > findOne()', 3)
            let apiResponse = responseLib.generate(true, 'Blog not found!', 404, null)
            res.send(apiResponse)
        } else {
            loggerLib.info('Blog found successfully', 'getAllBlogs > findOne()', 1)
            let apiResponse = responseLib.generate(false, 'Blog found successfully', 200, result)
            res.send(apiResponse)
        }
    })

}

let createBlog = (req, res) => {

    let newBlog = new BlogModel({
        blogId: shortId.generate(),
        title: req.body.title,
        description: req.body.description,
        bodyHtml: req.body.bodyHtml,
        created: Date.now(),
        lastModified: Date.now(),
        author: req.body.author,
        isPublished: true,
    })

    let tags = (req.body.tags != undefined && req.body.tags != null && req.body.tags != '') ? req.body.tags.split(',') : []
    newBlog.tags = tags

    newBlog.save((err, result) => {
        if (err) {
            loggerLib.error(('Failed to create blog!', 'createBlog > save()', 5))
            let apiResponse = responseLib.generate(true, 'Failed to create blog!', 500, err)
            res.send(apiResponse)
        } else {
            delete result._id
            delete result.__v
            delete result.isPublished
            loggerLib.info(('Blog created successfully!', 'createBlog > save()', 1))
            let apiResponse = responseLib.generate(false, 'Blog created successfully!', 200, result)
            res.send(apiResponse)
        }
    })

}

let editBlog = (req, res) => {

    let options = req.body;
    UserModel.update({ 'userId': req.params.userId }, options, ((err, result) => {
        if (err) {
            logger.error('Failed to update blog!', 'editBlog > update()', 5)
            let apiResponse = response.generate(true, 'Failed To edit user details', 500, err)
            res.send(apiResponse)
        } else if (result == undefined || result == null || result == '') {
            logger.error('No blog Found', 'editBlog > update()', 3)
            let apiResponse = response.generate(true, 'No blog Found', 404, null)
            res.send(apiResponse)
        } else {
            logger.info('Blog details updated!', 'editBlog > update()', 1)
            let apiResponse = response.generate(false, 'Blog details updated!', 200, result)
            res.send(apiResponse)
        }
    })
    )

}

let deleteBlog = (req, res) => {

    BlogModel.remove({ blogId: req.params.blogId }, (err, result) => {
        if (err) {
            logger.error('Failed to delete blog!', 'deleteBlog > remove()', 5)
            let apiResponse = response.generate(true, 'Failed To delete blog!', 500, err)
            res.send(apiResponse)
        } else if (result == undefined || result == null || result == '') {
            logger.error('No blog Found', 'deleteBlog > remove()', 3)
            let apiResponse = response.generate(true, 'No blog Found', 404, null)
            res.send(apiResponse)
        } else {
            logger.info('Blog deleted successfully!', 'deleteBlog > remove()', 1)
            let apiResponse = response.generate(false, 'Blog deleted successfully!', 200, result)
            res.send(apiResponse)
        }
    })

}

module.exports = {
    getAllBlogs: getAllBlogs,
    viewByBlogId: viewByBlogId,
    createBlog: createBlog,
    editBlog: editBlog,
    deleteBlog: deleteBlog
}