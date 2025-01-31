import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1738324829928 implements MigrationInterface {
    name = 'Migration1738324829928'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "explanation" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "explanation"`);
    }

}
