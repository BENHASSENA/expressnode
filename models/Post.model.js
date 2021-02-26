const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: {
        type: 'string',
        required: true,
        unique: true,
    },
    content:  {
        type: 'string',
        required: true,
    },
    tags:  {
        type: Array,
    },
})



module.exports =mongoose.model('Post',PostSchema)
