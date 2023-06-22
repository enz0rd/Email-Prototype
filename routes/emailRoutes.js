const Router = require('express');
const cookieParser = require("cookie-parser");
const EmailController = require('../controllers/EmailController');

const router = Router();

router.use(cookieParser());

router.get('/new-email', EmailController.getNewEmail)
router.post('/try-send-email', EmailController.trySendEmail)

module.exports = router;