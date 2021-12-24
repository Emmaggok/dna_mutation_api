/*const mongoose = require('mongoose');
const {statsModel} = require('../Models/models.js');

async function statsInfo (req,res,next){
    try {
        const { count_mutations, count_no_mutations } = await statsModel.findById(1);
        let ratio = count_mutations / count_no_mutations;
        let response = {
            "count_mutations": count_mutations,
            "count_no_mutations": count_no_mutations,
            "ratio": ratio
        }

        return res.json(response);
    } catch (error) {
        next(error)
    }
}


module.exports = {statsInfo};
*/