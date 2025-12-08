const mongoose = require('mongoose');
const id_validator = require('mongoose-id-validator');
var BetaReportSchema = new mongoose.Schema({

    beta_rpt_name: {
        type: String
    },

    beta_rpt_path:{
        type: String
    },

    beta_rpt_id:{
        type: String
    },

    // beta_rpt_DOS: {     //Date Of Submission
    //     type: String
    // }

}, { timestamps: true });
BetaReportSchema.plugin(id_validator);

const BetaReport = mongoose.model('betaReport', BetaReportSchema);
module.exports = BetaReport
