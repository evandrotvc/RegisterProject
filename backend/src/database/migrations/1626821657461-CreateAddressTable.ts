import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateAddressTable1626821657461 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        
        await queryRunner.createTable(
            new Table({
                name: "address",
                columns: [
                    {
                        name: "id",
                        type: 'uuid',
                        isPrimary : true,
                        generationStrategy : "uuid",
                        default: 'uuid_generate_v4()'

                    },
                    {
                        name: "user_id",
                        type: 'uuid',
                    },
                    {
                        name: "pais",
                        type: 'varchar',
                        isNullable: true,

                    },
                    {
                        name: "estado",
                        type: 'varchar',
                        isNullable: true,

                    },
                    {
                        name: "municipio",
                        type: 'varchar',
                        isNullable: true,

                    },
                    {
                        name: "cep",
                        type: 'int',
                        isNullable: true,

                    },
                    {
                        name: "rua",
                        type: 'varchar',
                        isNullable: true,

                    },
                    {
                        name: "numero",
                        type: 'varchar',
                        isNullable: true,

                    },
                    {
                        name: "complemento",
                        type: 'varchar',
                        isNullable: true,

                    },                                
                ]
            })
        )

        await queryRunner.createForeignKey('address' , new TableForeignKey({
            name: 'AddressProvider',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE' 
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('address' , 'AddressProvider');
        await queryRunner.dropTable('address');
    }

}
