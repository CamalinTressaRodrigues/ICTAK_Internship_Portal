const express = require('express');
const router = express.Router();
const auth = require('../Middleware/Auth');
const { getReferences, addReference,deleteReference} = require('../controllers/referenceController');

router.get('/', auth, getReferences);
router.post('/add',auth, addReference);
router.delete('/:id',auth, deleteReference);

module.exports = router;
