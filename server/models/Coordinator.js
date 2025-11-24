const mongoose = require('mongoose')
const id_validator = require('mongoose-id-validator');

var CoordinatorSchema = new mongoose.Schema({
    coo_ID: {
        type: String,
        required: true,
        trim: true
    }

    // Proposal_rpt: {
    //     type: String
    // },

    // alfa_rpt: {
    //     type: String
    // },

    // beta_rpt: {
    //     type: String
    // },

    // finall_rpt: {
    //     type: String
    // }

}, { timestamps: true }
);
CoordinatorSchema.plugin(id_validator);

const Coordinator = mongoose.model('Coordinator', CoordinatorSchema);
module.exports = Coordinator
