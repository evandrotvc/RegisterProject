import {Router} from 'express'

import UserService from '../modules/User/services/UserService'
import {UserDTO, AddresDTO} from '../dto/IUser'
import EnsureAuth from '../middlewares/ValidateCookie';
const UsersRouter = Router();


UsersRouter.post('/' , async(req, resp ,next) => {
    try {
        const {email, password, name} = req.body;

        const user_info: UserDTO = {
            email: email,
            password: password,
            name: name,
            pis: '',
            cpf: ''
        }

        const _UserService = new UserService();

        const user = await _UserService.CreateUser_execute(user_info);

        resp.json({name: user.name , email:user.email}).status(200);   
    } catch (err) {
        return resp.status(400).json({error : err.message})
    }
})

UsersRouter.get('/list',EnsureAuth , async(req, resp ,next) => {
    try {
        const _UserService = new UserService();

        const users = await _UserService.ListUser_Execute();

        resp.json({users: users.user , address: users.address}).status(200);
    } catch (err) {
        return resp.status(400).json({error : err.message})
    }
})

UsersRouter.put('/edit',EnsureAuth , async(req, resp ,next) => {
    try {
        const {email, name, password , pis , cpf} = req.body;

        const endereco:AddresDTO = {
            CEP: req.body.cep,
            Complemento: req.body.complemento,
            Estado: req.body.estado,
            Municipio: req.body.municipio,
            Numero: req.body.numero,
            Pais: req.body.pais,
            Rua: req.body.rua
        } 

        const _UserService = new UserService();

        const {user,address} = await _UserService.EditUser_execute({email, name, password , cpf, pis} , endereco);

        resp.json({user: user , address:address}).status(200);
    } catch (err) {
        return resp.status(400).json({error : err.message})
    }
})


UsersRouter.get('/:email',EnsureAuth , async(req, resp ,next) => {
    try {
        const email = req.params.email;

        const _UserService = new UserService();

        const user = await _UserService.ShowUser_Execute(email);

        resp.json(user).status(200);   
    } catch (err) {
        return resp.status(400).json({error : err.message})
    }
})



UsersRouter.delete('/:email', EnsureAuth , async(req, resp ,next) => {
    try {
        const email = req.params.email;

        const _UserService = new UserService();

        const user = await _UserService.DeleteUser_Execute(email);

        resp.json(user).status(200);   
    } catch (err) {
        return resp.status(400).json({error : err.message})
    }
})

export default UsersRouter