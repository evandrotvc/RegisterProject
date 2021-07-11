import {uuid} from 'uuidv4'
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from 'typeorm'

@Entity ('users')
class User {
    @PrimaryGeneratedColumn('uuid') // Esta linha já executa this.id = uuid()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;   

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

}

export default User
