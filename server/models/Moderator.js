const mongoose = require('mongoose')
const id_validator = require('mongoose-id-validator');

var ModeratorSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        trim: true
    },

    mod_firstName: {
        type: String,
        trim: true
    },

    mod_lastName: {
        type: String,
        required: true,
        trim: true
    },

    mod_ID: {
        type: String,
        required: true,
        trim: true
    },

    mod_email: {
        type: String,
        required: true,
        trim: true
    },

    projects_arr: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project'
    }],

    judge_project_arr: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project'
    }],

    Grades_arr_judge: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'grades'
    }],

}, { timestamps: true }
);
ModeratorSchema.plugin(id_validator);

const Moderator = mongoose.model('Moderator', ModeratorSchema);
module.exports = Moderator
