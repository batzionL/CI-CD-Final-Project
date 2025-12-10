const mongoose = require('mongoose');
const id_validator = require('mongoose-id-validator');
var DateOfSubmissionSchema = new mongoose.Schema({
    propRpt: {
        type: String,
    },

    alfaRpt: {
        type: String,
    },

    betaRpt: {
        type: String,
    },

    finalRpt: {
        type: String,
    },

    presentation:{
        type:String,
    }

}, { timestamps: true });
DateOfSubmissionSchema.plugin(id_validator);

const DateOfSubmission = mongoose.model('DateOfSubmission', DateOfSubmissionSchema);
module.exports = DateOfSubmission
