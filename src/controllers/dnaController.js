

async function dnaMutation(req, res) {
    const {dna} = req.body;
    const result = await hasMutation(dna);
    res.status(200).json({
        result
    });
}

async function hasMutation(dna) {
    let count = 0;
    let countRows = 0;
    const rows = dna.length;
    const indexStop = rows-4;


    while (count < 2 && countRows < rows) {
        let indexHor = 0;
        while (indexHor <= indexStop && count<2) {
            let theSame4 = dna[countRows][indexHor]+dna[countRows][indexHor]+dna[countRows][indexHor]+dna[countRows][indexHor];

            if (dna[countRows][indexHor].slice(indexHor, indexHor+4) === (theSame4)) {
                count = count + 1;
            }
            if (countRows <= indexStop && count<2) {
                if (dna[countRows][indexHor]+dna[countRows+1][indexHor+1]+dna[countRows+2][indexHor+2]+dna[countRows+3][indexHor+3] === theSame4){
                    count = count + 1;
                }
            }
            indexHor = indexHor + 1;
        }
        if(countRows <= indexStop && count < 2) {
            let index = 0;
            //for (let index = 0; index < rows; index++) {
            while (index < rows && count<2) {
                if (dna[countRows][index]+dna[countRows+1][index]+dna[countRows+2][index]+dna[countRows+3]  === dna[countRows][index]+dna[countRows][index]+dna[countRows][index]+dna[countRows][index]){
                    count = count + 1;
                }
                index = index + 1;
            }
        }

        countRows = countRows + 1;
    }

    
    return count >= 2;
}


module.exports = { dnaMutation };