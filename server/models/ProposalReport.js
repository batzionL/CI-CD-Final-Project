const mongoose = require('mongoose');
const id_validator = require('mongoose-id-validator');
var ProposalReportSchema = new mongoose.Schema({

    propos_rpt_name: {
        type: String
    },

    propos_rpt_path: {
        type: String
    },

    propos_rpt_id:{
        type: String
    },

    // propos_rpt_DOS: {     //Date Of Submission
    //     type: String
    // }

}, { timestamps: true });
ProposalReportSchema.plugin(id_validator);

const ProposalReport = mongoose.model('proposalReport', ProposalReportSchema);
module.exports = ProposalReport