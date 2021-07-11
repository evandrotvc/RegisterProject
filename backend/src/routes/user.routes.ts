import {Router} from 'express'

import UserService from '../modules/User/services/UserService'
const UsersRouter = Router();


UsersRouter.post('/' , async(req, resp ,next) => {
    try {
        const {email, password, name} = req.body;

        const _UserService = new UserService();

        const user = await _UserService.CreateUser_execute({email, name, password});

        resp.json({name: user.name , email:user.email}).status(200);   
    } catch (err) {
        return resp.status(400).json({error : err.message})
    }
})

export default UsersRouter