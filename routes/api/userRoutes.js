const router = require('express').Router();
const userController = require('../../controllers/api-user-controller');

router.get('/', userController.indexAllUsers)
router.post('/', userController.postUser)

module.exports = router;
