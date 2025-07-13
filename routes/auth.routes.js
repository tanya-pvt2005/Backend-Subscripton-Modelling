import {Router} from 'express'
import { signIn, signOut, signUp } from '../controller/auth.controller.js';


const authRouter = Router();

//E.g. : Path: /api/v1/auth/sign-up (POST)
authRouter.post('/sign-up', signUp)
authRouter.post('/sign-in', signIn)
authRouter.post('/sign-out', signOut)

export default authRouter