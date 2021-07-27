import Address from "../models/Address";
import User from "../models/User";

export interface UserDTO{
    name : string,
    password: string
    email: string,
    cpf?: number,
    pis?: number,
}

export interface AddresDTO{
    Pais: string,
    Estado: string,
    Municipio: string,
    CEP: number,
    Rua: string,
    Numero: string,
    Complemento: string,
}

export interface ResponseDTO{
    user: User,
    address?: Address,
}