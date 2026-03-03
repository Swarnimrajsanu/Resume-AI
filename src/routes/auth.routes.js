const { Router } = require('express');
const { registerUserController, loginUserController } = require('../controllers/auth.controller');


const authRouter = Router();

authRouter.post('/register', registerUserController);

authRouter.post('/login', loginUserController);





module.exports = authRouter;