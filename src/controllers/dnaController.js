const mongoose = require('mongoose');
const {dnaModel, statsModel} = require('../Models/models');


function validDna (dna) {

    const letrasValidas = "ATCG";

    function validLetras(letra) {
        return letrasValidas.includes(letra);
    }

    return (dna.length !== 0 && Array.isArray(dna) && dna.every((currentValue) => typeof currentValue === 'string') && dna.every((currentValue) => currentValue.length === dna.length) && dna.every(row => row.split("").every(validLetras)))
}


async function dnaMutation(req, res) {
    const {dna} = req.body;
    
    if (validDna(dna)) {
        await hasMutation(dna) ? res.status(200).send('200-OK') : res.status(403).send('403-Forbidden');
    } else {
        res.status(400).send('400-Bad Request');
    }
}




async function hasMutation(dna) {
    let count = 0;
    let countRows = 0;
    const rowsOrColumns = dna.length;
    const indexStop = rowsOrColumns-4;
    const {count_mutations, count_no_mutations} = await statsModel.findById(1);


    while (count < 2 && countRows < rowsOrColumns) {
        let indexHor = 0;
        let AntiIndexHor = rowsOrColumns-1;

        while (indexHor <= indexStop && count<2) {
            let theSame4 = dna[countRows][indexHor]+dna[countRows][indexHor]+dna[countRows][indexHor]+dna[countRows][indexHor];
            let theSame4Anti = dna[countRows][AntiIndexHor]+dna[countRows][AntiIndexHor]+dna[countRows][AntiIndexHor]+dna[countRows][AntiIndexHor];
            //console.log(dna[countRows].slice(indexHor, indexHor+4))
            if (dna[countRows].slice(indexHor, indexHor+4) === (theSame4)) {
                
                count = count + 1;
            }
            if (countRows <= indexStop && count<2) {
                if (dna[countRows][indexHor]+dna[countRows+1][indexHor+1]+dna[countRows+2][indexHor+2]+dna[countRows+3][indexHor+3] === theSame4){
                    //console.log(dna[countRows][indexHor]+dna[countRows+1][indexHor+1]+dna[countRows+2][indexHor+2]+dna[countRows+3][indexHor+3]);
                    count = count + 1;
                }

                if (count<2){
                    if (dna[countRows][AntiIndexHor]+dna[countRows+1][AntiIndexHor-1]+dna[countRows+2][AntiIndexHor-2]+dna[countRows+3][AntiIndexHor-3] === theSame4Anti){
                        count = count + 1;
                    }
                    if (count<2){
                        if (dna[countRows][indexHor]+dna[countRows+1][indexHor]+dna[countRows+2][indexHor]+dna[countRows+3][indexHor]  === theSame4){
                            count = count + 1;
                        }
                    }
                }
            }

            indexHor = indexHor + 1;
            AntiIndexHor = AntiIndexHor - 1;
        }



        countRows = countRows + 1;
    }

    const dnaExist = await dnaModel.findOne({dna: dna});

    if (count >= 2 && dnaExist === null) {
        try{
            dnaModel.create({dna: dna});
            await statsModel.findByIdAndUpdate(1, {count_mutations: count_mutations+1});
        } catch (err) {
            console.log(err);
        }
        } else {
            if (dnaExist === null) {
                dnaModel.create({dna: dna});
                await statsModel.findByIdAndUpdate(1, {count_no_mutations: count_no_mutations+1});
            }
        }
    

    return count >=2;
}


module.exports = { dnaMutation };