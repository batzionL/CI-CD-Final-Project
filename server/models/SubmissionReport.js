const mongoose = require('mongoose');
const id_validator = require('mongoose-id-validator');
var SubmissionReportSchema = new mongoose.Schema({

    id_project: {
        type: String,
        required: true
    },
    
    prop_rpt_sub:{
        type: String,
        default: null
    },

    alfa_rpt_sub: {
        type: String,
        default: null
    },
    beta_rpt_sub:{
        type: String,
        default: null
    },
    final_rpt_sub: {
        type: String,
        default: null
    },

}, { timestamps: true });
SubmissionReportSchema.plugin(id_validator);

const SubRpt = mongoose.model('subRpt', SubmissionReportSchema);
module.exports = SubRpt
