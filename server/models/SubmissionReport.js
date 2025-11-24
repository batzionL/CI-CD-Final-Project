const mongoose = require('mongoose');
const id_validator = require('mongoose-id-validator');
var SubmissionReportSchema = new mongoose.Schema({

    id_project: {
        type: String,
    },
    // id_judge: {
    //     type: String
    // },
    prop_rpt_sub:{
        type: String,
    },

    alfa_rpt_sub: {
        type: String,
    },
    beta_rpt_sub:{
        type: String
    },
    final_rpt_sub: {
        type: String,
    },

}, { timestamps: true });
SubmissionReportSchema.plugin(id_validator);

const SubRpt = mongoose.model('subRpt', SubmissionReportSchema);
module.exports = SubRpt
