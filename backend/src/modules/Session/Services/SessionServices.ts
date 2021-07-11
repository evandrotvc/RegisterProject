import User from '../../../models/User';
import {getRepository} from 'typeorm';
import {compare} from 'bcryptjs';

import {sign} from 'jsonwebtoken'

import AppErrors from '../../../errors/AppErrors'

interface RequestDTO{
    email: string,
    password: string
}

interface ResponseDTO{
    token: string,
    user: User
}

export default class SessionService {
    async AuthenticatedUser_execute({email , password} : RequestDTO) : Promise<ResponseDTO>{

        const UserRepository = getRepository(User);

        const user = await UserRepository.findOne({where: {email}});

        if(!user){
            throw new AppErrors("Email or password is incorrect.", 400);
        }

        const ComparePassword = await compare(password, user.password);

        if(!ComparePassword){
            throw new AppErrors("Email or password is incorrect.", 400);
        }

        // cria o json web token
        const token = sign({}, '7c8c29d9f5b447c81834cf170dc2f0fe',{
             subject: user.id,
             expiresIn: '1d'
        })

        return {user , token};

    }
}