const Router = require('express');
const cookieParser = require("cookie-parser");
const CadastroController = require('../controllers/CadastroController');

const router = Router();

router.use(cookieParser());

router.get('/signup', CadastroController.getCadastros)
router.get('/signin', CadastroController.getLogin);
router.post('/try-login', CadastroController.tryLogin);
router.get('/try-login', CadastroController.tryLogin);
router.post('/try-signup', CadastroController.addUser);
router.get('/try-signup', CadastroController.addUser);
router.get('/logout', CadastroController.Logout);

module.exports = router;