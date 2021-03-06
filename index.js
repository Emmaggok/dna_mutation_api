const server = require('./src/app.js');
const mongoose = require('mongoose');
require('dotenv').config();
const {statsModel} = require('./src/Models/models.js');

const {DB_URL} = process.env;
//'mongodb://localhost:27017/dna_mutations';


const PORT = process.env.PORT || 5000;

// CONNECT TO DB
async function conection () {
    await mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log('********** Error connecting to DB **********');
    } else {
        console.log('********** DB connected **********');
    }
})
}

conection();



async function CreateIfNotExist(){
    const stat = await statsModel.findById(1)
    if (stat === null) {
        statsModel.create(
            {
            _id: 1, 
            count_mutations: 0, 
            count_no_mutations: 0
        }
    
        );
    }
}

CreateIfNotExist();


if (statsModel.findById(1) === null) {
    statsModel.create(
        {
        _id: 1, 
        count_mutations: 0, 
        count_no_mutations: 0
    }

    );
}

//statsModel.create({_id: 1, count_mutations: 0, count_no_mutations: 0});




server.listen(PORT, async () => console.log(`Server running on ${PORT}`));