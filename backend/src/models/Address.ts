import {uuid} from 'uuidv4'
import {Entity, PrimaryGeneratedColumn, Column , 
    ManyToOne , JoinColumn} from 'typeorm'
import User from './User'

@Entity ('address')
class Address {
    @PrimaryGeneratedColumn('uuid') // Esta linha já executa this.id = uuid()
    id: string;

    @Column()
    user_id: string;

    // Cria o relacionamento entre 2 colunas
    @ManyToOne(() => User , {nullable: false , cascade: true})
    @JoinColumn({name : 'user_id'})
    user: User

    @Column()
    pais: string;
    
    @Column()
    estado: string;
    
    @Column()
    municipio: string;

    @Column()
    cep: number;

    @Column()
    rua: string;

    @Column()
    numero: string;

    @Column()
    complemento: string;

}

export default Address
