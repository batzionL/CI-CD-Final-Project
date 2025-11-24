const mongoose = require('mongoose');
const id_validator = require('mongoose-id-validator');
var AlfaReportSchema = new mongoose.Schema({

    alfa_rpt_name: {
        type: String
    },

    alfa_rpt_path:{
        type: String
    },

    alfa_rpt_id: {
        type: String
    },

    // alfa_rpt_DOS: {     //Date Of Submission
    //     type: String
    // }

}, { timestamps: true });
AlfaReportSchema.plugin(id_validator);

const AlfaReport = mongoose.model('alfaReport', AlfaReportSchema);
module.exports = AlfaReport;