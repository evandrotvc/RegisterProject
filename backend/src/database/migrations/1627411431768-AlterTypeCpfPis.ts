import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterTypeCpfPis1627411431768 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'cpf');
        await queryRunner.dropColumn('users', 'pis');
       
        await queryRunner.addColumn('users' , new TableColumn({
            name: 'cpf',
            type: 'varchar',
            isNullable: true,
            
        })
      )

      await queryRunner.addColumn('users' , new TableColumn({
            name: 'pis',
            type: 'varchar',
            isNullable: true,
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'pis');
        await queryRunner.dropColumn('users', 'cpf');

        await queryRunner.addColumn("users", new TableColumn({
            name: 'pis',
            type: 'int',
            isNullable: true,
        }))

        await queryRunner.addColumn("users", new TableColumn({
            name: 'cpf',
            type: 'int',
            isNullable: true,
        }))        
    }

}
