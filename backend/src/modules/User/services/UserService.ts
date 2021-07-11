import User from '../../../models/User';
import {getRepository} from 'typeorm';
import {hash} from 'bcryptjs';

import AppErrors from '../../../errors/AppErrors'

interface UserDTO{
    name : string,
    password: string
    email: string,    
}

export default class UserService{

    async CreateUser_execute({email, name, password}: UserDTO) : Promise<User> {
        const UserRepository = getRepository(User);

        const find_user = await UserRepository.findOne({where: {email}});

        if(find_user){
            throw new AppErrors("Email address already registered.", 400);
            
        }

        const password_hashed = await hash(password ,8);

        const user = UserRepository.create({
            name: name,
            email: email,
            password: password_hashed
        });

        await UserRepository.save(user);

        return user;    
    }    
}