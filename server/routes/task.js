const router = require('express').Router();
const taskController = require('../controllers/taskController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.get('/:category', authentication, taskController.findAll);
router.post('/', authentication, taskController.addData);
router.get('/:id', authentication, authorization, taskController.findByPk);
router.put('/:id', authentication, authorization, taskController.putData);
router.put('/:idCat/', authentication, authorization, taskController.putCategory);
router.delete('/:id', authentication, authorization, taskController.delete);

module.exports = router;