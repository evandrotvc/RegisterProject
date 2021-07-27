import {Router} from 'express'
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';
import cookieParser from 'cookie-parser';

import SessionService from '../modules/Session/Services/SessionServices';
import EnsureAuth from '../middlewares/ValidateCookie';

const SessionRouter = Router();
// gmail :  id = userregistration-58783
SessionRouter.post("/", async (req, resp ,next) => {
    try {
        const {email,cpf, pis ,password} = req.body;

        const _SessionService = new SessionService();

        const session_datas = await _SessionService.AuthenticatedUser_execute({email,cpf, pis ,password});

        // delete session_datas.user.password;

        resp.cookie('session_id', session_datas.token).json(session_datas).status(200);
        // resp.clearCookie('session_id')

    } catch (err) {
        return resp.status(400).json({error : err.message})
    }
})



SessionRouter.get('/logout', EnsureAuth,(req, resp , next) => {
    resp.clearCookie('session_id');

    resp.status(200).send({msg : "Logout sucess"})
})

// Para concluir a configuração, adicione este URL de callback à sua configuração do aplicativo do GitHub.
// https://userregistration-58783.firebaseapp.com/__/auth/handler




// SessionRouter.get('/auth', async (req, resp, next) => {
//     try {
//         const redirect_uri = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`;
//         resp.setHeader("Access-Control-Allow-Origin", "http://localhost:3333")
//         resp.setHeader("Access-Control-Allow-Credentials", "true");
//         resp.setHeader("Access-Control-Max-Age", "1800");
//         resp.setHeader("Access-Control-Allow-Headers", "content-type");
//         resp.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );

//         resp.send("hello");
        
//     } catch (err) {
//         return resp.status(400).json({error : err.message})
//     }
// });

SessionRouter.get('/oauth-callback' ,async ({ query: {code} }, resp) => {
    try {
        const body = {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_SECRET,
            code,
          };

        const opts = { headers: { accept: 'application/json' } };
  
        axios
            .post('https://github.com/login/oauth/access_token', body, opts)
            .then((_res) => _res.data.access_token)
            .then((token) => {
            // eslint-disable-next-line no-console
            console.log('My token:', token);

        resp.redirect(`http://localhost:3000/dashboard/?token=${token}`);
        })
        .catch((err) => resp.status(500).json({ err: err.message }));
        
    } catch (err) {
        return resp.status(400).json({error : err.message})
    }
})

export default SessionRouter;