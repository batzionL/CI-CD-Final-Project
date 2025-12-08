const mongoose = require('mongoose');
const id_validator = require('mongoose-id-validator');
var FinalReportSchema = new mongoose.Schema({

    final_rpt_name: {
        type: String
    },

    final_rpt_path: {
        type: String
    },

    final_rpt_id:{
        type: String
    },

    // final_rpt_DOS: {     //Date Of Submission
    //     type: String
    // }

}, { timestamps: true });
FinalReportSchema.plugin(id_validator);

const FinalReport = mongoose.model('finalReport', FinalReportSchema);
module.exports = FinalReport
