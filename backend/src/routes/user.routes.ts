import {Router} from 'express'

import CreateUserService from '../modules/User/services/CreateUserService'
const UsersRouter = Router();


UsersRouter.post('/register' , (req, resp ,next) => {

    const DataUser = {
        name : 'Evandro Thalles',
        password: '123456',
        email: 'evandro@gmail.com',
        cpf: '12343243243',
        pis: '12222',
        endereco: {
            Pais: 'Brasil',
            Estado: 'df',
            Município: 'vicente pires',
            CEP: '423423424',
            Rua: '5',
            Número: '5',
            Complemento: 'chacara'

        }
    }

    const _CreateUserService = new CreateUserService();

    const user = _CreateUserService.execute(DataUser)

    resp.json(user).status(200);
})

export default UsersRouter