const express = require('express');

const UserController = require('../controllers/usuarioController');

const { verifyToken } = require("../middleware/index");

const router = express.Router();

router.get('/', verifyToken, UserController.getAllUser);
router.get('/t', verifyToken, UserController.getAllUserByRol);
router.get('/:id', verifyToken, UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', verifyToken, UserController.deleteUser);
router.post('/login', UserController.login);
router.patch('/:id', verifyToken, UserController.changeStatusTrue)
router.get('/uf/:estado', verifyToken, UserController.getAllUsersStatus)
router.post('/logout', UserController.logout)

module.exports = router;