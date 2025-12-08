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

    //List of projects the moderator in
    projects_arr: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project'
    }],

    //List of projects judged by the moderator
    judge_project_arr: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project'
    }],

    //A list of grade documents that are linked to the project that the supervisor is judging
    Grades_arr_judge: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'grades'
    }],

}, { timestamps: true }
);
ModeratorSchema.plugin(id_validator);

const Moderator = mongoose.model('Moderator', ModeratorSchema);
module.exports = Moderator
