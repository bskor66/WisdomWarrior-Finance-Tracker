const router = require('express').Router();
const userController = require('../../controllers/api-user-controller');

//* route: api/users/

// get all users
router.get('/', userController.indexAllUsers)
// get one user by id
router.get('/:id', userController.indexUser)
// get all budgets for the logged in user
router.get('/:id/budgets', userController.indexBudgets)

// add a new user
// *redirect to signup page is /users receives a post request 
router.post('/signup', userController.postUser)
router.post('/login', userController.loginUser)
router.post('/logout', userController.logoutUser)
router.post('/:id/budgets', userController.postBudget)

// update user by id
router.put('/:id', userController.updateUser)
// delete user by id
router.delete('/:id', userController.deleteUser)
// delete all budgets for a user
router.delete('/:id/budgets', userController.deleteBudget)



module.exports = router;