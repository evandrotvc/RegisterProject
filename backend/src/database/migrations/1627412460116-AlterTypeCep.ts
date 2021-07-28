import {MigrationInterface, QueryRunner,TableColumn} from "typeorm";

export class AlterTypeCep1627412460116 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('address', 'cep');
       
        await queryRunner.addColumn('address' , new TableColumn({
            name: 'cep',
            type: 'varchar',
            isNullable: true,  
        })
      )

      
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('address', 'cep');

        await queryRunner.addColumn("address", new TableColumn({
            name: 'cep',
            type: 'int',
            isNullable: true,
        }))
    }

}
