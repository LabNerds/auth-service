import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1634963537925 implements MigrationInterface {
    name = 'InitialMigration1634963537925'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "example" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" text NOT NULL, "createdOn" datetime NOT NULL DEFAULT (datetime('now')), "updatedOn" datetime NOT NULL DEFAULT (datetime('now')))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "example"`);
    }

}
