const express = require('express');
const router = express.Router();
const {
  createUser,
  getUsers,
  deleteUser,
  updateUser
} = require('../controllers/userController');

router.post('/create_user', createUser);
router.post('/get_users', getUsers);
router.post('/delete_user', deleteUser);
router.post('/update_user', updateUser);

module.exports = router;
