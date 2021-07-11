import {Router} from 'express'
import axios from 'axios';

import SessionService from '../modules/Session/Services/SessionServices';
const SessionRouter = Router();

SessionRouter.post("/", async (req, resp ,next) => {
    try {
        const {email, password} = req.body;

        const _SessionService = new SessionService();

        const session_datas = await _SessionService.AuthenticatedUser_execute({email, password});

        delete session_datas.user.password;

        resp.json(session_datas).status(200);

    } catch (err) {
        return resp.status(400).json({error : err.message})
    }
})

SessionRouter.post('/oauth', async (req, resp, next) => {
    try {

        // const clientID = process.env. //'<your client id>'
        const clientSecret = '<your client secret>'
        
    } catch (err) {
        return resp.status(400).json({error : err.message})
    }
})

export default SessionRouter;