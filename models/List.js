const { model, Schema } = require('mongoose');

const listSchema = new Schema({
    title: String,
    username: String,
    createdAt: String,
    listItems: [{
        username: String,
        description: String,
        isComplete: Boolean,
        createdAt: String
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = model('List', listSchema)