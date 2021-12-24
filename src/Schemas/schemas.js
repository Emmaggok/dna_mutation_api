const mongoose = require ('mongoose');


const dnaSchema = new mongoose.Schema({
    dna: {
        type: Array,
    },
},
{
    timestamps: true,
    versionKey: false
}
);


const statsSchema = new mongoose.Schema({
    count_mutations: {
        type: Number,
        default: 0
    },
    count_no_mutations: {
        type: Number,
        default: 0
    },
    _id: {
        type: Number,
    }
},
{
    timestamps: true,
    versionKey: false
});

module.exports = {
    dnaSchema,
    statsSchema
}