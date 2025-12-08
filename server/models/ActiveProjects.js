const mongoose = require('mongoose');
const id_validator = require('mongoose-id-validator');
var ActiveProjectsSchema = new mongoose.Schema({
    idPjt: {
        type: String,
        required: true,
        trim: true
    },

    pjtName: {
        type: String,
        required: true,
        trim: true
    },

    modName:{
        type: String,
        trim: true
    },

    jdgName1: {
        type: String,
        trim: true
    },

    jdgName2: {
        type: String,
        trim: true
    },

    jdgName3: {
        type: String,
        trim: true
    },

    sdtName1: {
        type: String,
        trim: true
    },

    sdtName2: {
        type: String,
        trim: true
    }

}, { timestamps: true });
ActiveProjectsSchema.plugin(id_validator);

const ActiveProjects = mongoose.model('activeProjects', ActiveProjectsSchema);
module.exports = ActiveProjects