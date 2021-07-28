import User from '../../../models/User';
import Address from '../../../models/Address';
import {getRepository , Repository} from 'typeorm';
import {hash} from 'bcryptjs';
import {v4} from 'uuid'
import {UserDTO , AddresDTO , ResponseDTO} from '../../../dto/IUser'
import AppErrors from '../../../errors/AppErrors'


interface Responselist  {
    user: User[],
    address: Address[]
}
export default class UserService{
   
    async CreateUser_execute({email ,name, password}: UserDTO) : Promise<User> {
        const UserRepository = getRepository(User);

        const find_user = await UserRepository.findOne({where: {email}});

        if(find_user){
            throw new AppErrors("Email address already registered.", 400);
            
        }

        const password_hashed = await hash(password ,8);

        const user = UserRepository.create({
            name: name,
            email: email,
            password: password_hashed,
        });

        await UserRepository.save(user);

        return user;    
    }
    
    async EditUser_execute({email, name, cpf, pis } : UserDTO , endereco: AddresDTO): Promise<ResponseDTO> {
        const UserRepository = getRepository(User);
        const AddressRepository = getRepository(Address);

        try 
        {
            const user = await UserRepository.findOne({where: {email}});

        if(!user){
            // throw new AppErrors("User not found.", 400);
            const user = UserRepository.create({
                name: name,
                email: email,
                password: '',
                cpf: cpf,
                pis: pis,
            });
    
            const new_user = await UserRepository.save(user);

            const address = this.CreateAddress(new_user.id, endereco);

            await AddressRepository.save(address);

            return {user: new_user , address: address};
        }

        user.name = name;
        user.email = email;
        user.cpf = cpf;
        user.pis = pis;
        await UserRepository.save(user);

        const find_address = await AddressRepository.findOne({user_id: user.id} );
        
        if(!find_address){
            const _address = this.CreateAddress(user.id, endereco);
            await AddressRepository.save(_address);
            return {user: user , address: _address};
        }

        find_address.cep = endereco.CEP,
        find_address.complemento= endereco.Complemento,
        find_address.estado =endereco.Estado,
        find_address.municipio= endereco.Municipio,
        find_address.numero =endereco.Numero,
        find_address.pais = endereco.Pais,
        find_address.rua= endereco.Rua,
        

        await AddressRepository.save(find_address);
        return {user: user , address: find_address};
        
    } catch (err) {
            console.log(err);
            throw new AppErrors(`Email address already registered.${err}`, 400);
        }
        
    }

    async ShowUser_Execute(email: string): Promise<ResponseDTO | undefined>{
        const UserRepository = getRepository(User);
        const AddressRepository = getRepository(Address);

        const user = await UserRepository.findOne({where: {email}});

        // Caso quando o usuário logou com o git ou gmail. Então ele não é cadastrado no banco
        if(!user){           
            return user;
        }

        const find_address = await AddressRepository.findOne( {user_id:user.id} );

        return {user: user, address: find_address};
    }
// Promise<User[]>
    async ListUser_Execute(): Promise<Responselist>{
        const UserRepository = getRepository(User);
        const AddressRepository = getRepository(Address);
        const users = await UserRepository.find();
        const address = await AddressRepository.find();
        
        return {user: users , address: address};
    }

    async DeleteUser_Execute(email: string): Promise<User | void>{
        const UserRepository = getRepository(User);
        const AddressRepository = getRepository(Address);

        const user = await UserRepository.findOne({email: email});

        if(!user){
            throw new AppErrors("User not found.", 400);
        }

        const address = await AddressRepository.findOne({user_id: user.id});

        if(address){
            await AddressRepository.remove(address);
        }

        await UserRepository.remove(user);
        return user;
    }

     CreateAddress(user_id: string,endereco: AddresDTO): Address{
        const AddressRepository = getRepository(Address);
        const new_address = AddressRepository.create({
            user_id: user_id,
            cep: endereco.CEP,
            complemento: endereco.Complemento,
            estado: endereco.Estado,
            municipio: endereco.Municipio,
            numero: endereco.Numero,
            pais: endereco.Pais,
            rua: endereco.Rua,
        })        
        return new_address;
    }
}