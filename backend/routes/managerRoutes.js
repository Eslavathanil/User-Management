const express = require('express');
const router = express.Router();
const { getManagers } = require('../controllers/managerController');

router.get('/get_managers', getManagers);

module.exports = router;
