const Router = require('express');
const cookieParser = require("cookie-parser");
const HomeController = require('../controllers/HomeController')
const router = Router();

router.use(cookieParser());

router.get('/home', HomeController.getHome);

module.exports = router;