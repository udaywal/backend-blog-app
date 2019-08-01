const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let blogSchema = new Schema(
    {
        blogId:{
            type: String,
            unique: true
        },
        title: {
            type: String,
            default: 'Default Title!'
        },
        description: {
            type: String,
            default: 'Default description!'
        },
        bodyHtml: {
            type: String,
            default: ''
        },
        isPublished: {
            type: Boolean,
            default: false
        },
        category: {
            type: String,
            default: ''
        },
        author: {
            type: String,
            default: ''
        },
        tags: [],

        created: {
            type: Date,
            default: Date.now
        }, 

        lastModified: {
            type: Date,
            default: Date.now
        }
    }
)

module.exports = mongoose.model('Blog', blogSchema)