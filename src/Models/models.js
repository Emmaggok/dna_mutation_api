const mongoose = require('mongoose');
const {dnaSchema, statsSchema} = require('../Schemas/schemas.js');

const dnaModel = mongoose.model('dna', dnaSchema);
const statsModel = mongoose.model('stats', statsSchema);

module.exports = {
    dnaModel,
    statsModel
}