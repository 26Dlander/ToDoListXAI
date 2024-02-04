// Todo.js (inside Models folder)
const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const TodoModel = mongoose.model('Todo', TodoSchema);

module.exports = TodoModel;
