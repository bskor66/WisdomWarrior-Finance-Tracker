const router = require('express').Router();
const userController = require('../../controllers/api-user-controller');

router.get('/', userController.indexAllUsers)
router.get('/:id', userController.indexUser)
router.post('/', userController.postUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)


module.exports = router;
