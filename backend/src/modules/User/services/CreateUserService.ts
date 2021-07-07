

interface AddressDTO{
    Pais: string,
    Estado: string,
    Município: string,
    CEP: string,
    Rua: string,
    Número: string,
    Complemento: string
}

interface UserDTO{
    name : string,
    password: string
    email: string,
    cpf: string,
    pis: string,
    endereco: AddressDTO
}
interface User{
    name: string,
    email: string
}


export default class CreateUserService{
    user: UserDTO[] = [];

    public  execute(datasUser: UserDTO) :UserDTO | undefined {

        this.user.push(datasUser);

        const finduser = this.user.find(user => user.cpf == datasUser.cpf);

        return finduser;
    }
}