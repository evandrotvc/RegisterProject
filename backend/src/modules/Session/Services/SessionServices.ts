import User from '../../../models/User';
import {getRepository} from 'typeorm';
import {compare} from 'bcryptjs';

import {sign} from 'jsonwebtoken'

import AppErrors from '../../../errors/AppErrors'

interface RequestDTO{
    email?: string,
    cpf?: string,
    pis?: string,
    password: string
}

interface ResponseDTO{
    token: string,
    user: User
}

export default class SessionService {
    async AuthenticatedUser_execute({email,cpf, pis ,password} : RequestDTO) : Promise<ResponseDTO>{

        const filter = email ? email : cpf ? cpf : pis ? pis : null;
        let type_filter = ''
        const obj :RequestDTO = {
            email: email,
            cpf: cpf,
            pis: pis,
            password: ''
        };

        for (var [key, value] of Object.entries(obj)) {
            if(value){
                type_filter = key;
            }
        }

        const filters2 = {
            $or: [
              { email: email },
              { cpf: cpf },
              { pis: pis },
            ],
          }

        const UserRepository = getRepository(User);

        // const user2 = await UserRepository.findOne(`${filters2}`);
        const user = await UserRepository.findOne({[`${type_filter}`]: filter});

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