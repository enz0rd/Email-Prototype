const Router = require('express');
const CadastroController = require('../controllers/CadastroController');

const router = Router();

router.get('/signup', CadastroController.getCadastros)
router.get('/signin', CadastroController.getLogin);
router.post('/try-login', CadastroController.tryLogin);
router.get('/try-login', CadastroController.tryLogin);
router.post('/try-signup', CadastroController.addUser);
router.get('/try-signup', CadastroController.addUser);

module.exports = router;