import express from 'express';
import { registerController, loginController, testController, forgotPasswordController } from '../controllers/authController.js'
import { requiredSignIn, isAdmin } from '../middlewares/authMiddleware.js';
// router object
const router = express.Router()

//routing
//REGISTER || METHOD POST
router.post('/register', registerController);

//LOGIN || POST
router.post('/login', loginController);

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

//test routes
router.get('/test', requiredSignIn, isAdmin, testController)

//protected User route auth
router.get("/user-auth", requiredSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected Admin route auth
router.get("/admin-auth", requiredSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router