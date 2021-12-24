const {Router} = require('express');
const {dnaMutation} = require('../controllers/dnaController');
const router = Router();

router.post('/mutation', dnaMutation)
router.get('/', (req, res) => res.send('Welcome to the DNA´S verification API'))

module.exports = router;