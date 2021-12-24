const {Router} = require('express');
const {dnaMutation} = require('../controllers/dnaController');
const {statsInfo} = require('../controllers/statsController');
const router = Router();

router.post('/mutation', dnaMutation)
router.get('/stats', statsInfo)
router.get('/', (req, res) => res.send('Welcome to the DNA´S verification API'))

module.exports = router;