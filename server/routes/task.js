const router = require('express').Router();
const taskController = require('../controllers/taskController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.get('/:category',  taskController.findAll);
router.post('/', authentication, taskController.addData);
router.get('/edit/:id', authentication, authorization, taskController.findByPk);
router.put('/edit/:id', authentication, authorization, taskController.putData);
router.put('/edit-category/:id', authentication, authorization, taskController.putCategory);
router.delete('/:id', authentication, authorization, taskController.delete);

module.exports = router;