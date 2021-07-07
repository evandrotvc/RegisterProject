import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUserTable1625490144221 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: 'uuid',
                        isPrimary : true,
                        generationStrategy : "uuid",
                        default: 'uuid_generate_v4()'

                    },
                    {
                        name: "name",
                        type: 'varchar',

                    },
                    {
                        name: "email",
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "password",
                        type: "varchar",
                    },
                    {
                        name: "cpf",
                        type: "varchar",
                    },
                    {
                        name: "pis",
                        type: "varchar",
                    },
                    {
                        name: "created_at",
                        type: "timestamp", //adiciona fuso horário na data do horário
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp", //adiciona fuso horário na data do horário
                        default: "now()",
                    },                    
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }

}
