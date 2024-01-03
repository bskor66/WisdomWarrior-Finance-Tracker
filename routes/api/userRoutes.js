const router = require('express').Router();
const userController = require('../../controllers/api-user-controller');
// get all users
router.get('/', userController.indexAllUsers)
// get one user by id
router.get('/:id', userController.indexUser)

// add a new user
// *redirect to signup page is /users receives a post request 
router.post('/signup', userController.postUser)
router.post('/login', userController.loginUser)
router.post('/logout', userController.logoutUser)

// update user by id
router.put('/:id', userController.updateUser)
// delete user by id
router.delete('/:id', userController.deleteUser)


module.exports = router;