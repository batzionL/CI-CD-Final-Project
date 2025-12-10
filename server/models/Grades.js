const mongoose = require('mongoose');
const id_validator = require('mongoose-id-validator');
var GradesSchema = new mongoose.Schema({

    id_project: {
        type: String,
    },
    id_judge: {
        type: String
    },
    alfa_rpt_grd: {
        type: Number,
    },
    final_rpt_grd: {
        type: Number,
    },
    final_grd_pjt: {
        type: Number,
    },

}, { timestamps: true });
GradesSchema.plugin(id_validator);

const Grades = mongoose.model('grades', GradesSchema);
module.exports = Grades
