import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddFieldsToUserTable1626820534742 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("users", new TableColumn({
            name: 'cpf',
            type: 'int',
            isNullable: true,
        }))

        await queryRunner.addColumn("users", new TableColumn({
            name: 'pis',
            type: 'int',
            isNullable: true,
        }))

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'cpf');
        await queryRunner.dropColumn('users', 'pis');
    }

}
