const {Router} = require('express');
const {dnaMutation} = require('../controllers/dnaController');
const router = Router();

router.post('/mutation', dnaMutation)