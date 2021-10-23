import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1634975553562 implements MigrationInterface {
    name = 'InitialMigration1634975553562'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "example" ALTER COLUMN "description" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "example" ALTER COLUMN "description" DROP NOT NULL`);
    }

}
