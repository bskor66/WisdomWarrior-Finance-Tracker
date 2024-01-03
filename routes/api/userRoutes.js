const router = require('express').Router();
const userController = require('../../controllers/api-user-controller');
// get all users
router.get('/', userController.indexAllUsers)
// get one user by id
router.get('/:id', userController.indexUser)
// add a new user
router.post('/', userController.postUser)
// update user by id
router.put('/:id', userController.updateUser)
// delete user by id
router.delete('/:id', userController.deleteUser)

module.exports = router;