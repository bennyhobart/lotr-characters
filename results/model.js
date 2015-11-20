'use strict';
const mongoose = require('mongoose');
const Result = mongoose.model('Post', {
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    image: {
        type: Object,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = {
    create: (result) => Result.create(result),
    read: (id) => Result.findById(id),
    update: (result, id) => Result.findOneAndUpdate({_id: id}, result),
    remove: (id) => Result.findOneAndRemove({_id: id}),
    find: () => Result.find({})
};
