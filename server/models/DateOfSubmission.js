const mongoose = require('mongoose');
const id_validator = require('mongoose-id-validator');
var DateOfSubmissionSchema = new mongoose.Schema({
    propRpt: {
        type: String,
        // required: true,
        // trim: true
    },

    alfaRpt: {
        type: String,
        // required: true,
        // trim: true
    },

    betaRpt: {
        type: String,
        // required: true,
        // trim: true
    },

    finalRpt: {
        type: String,
        // required: true,
        // trim: true
    },

    presentation:{
        type:String,
        // required: true,
        // trim: true
    }

}, { timestamps: true });
DateOfSubmissionSchema.plugin(id_validator);

const DateOfSubmission = mongoose.model('DateOfSubmission', DateOfSubmissionSchema);
module.exports = DateOfSubmission
