import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1634576231651 implements MigrationInterface {
    name = 'InitialMigration1634576231651'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "example" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text, "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "updatedOn" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_608dd5fd6f0783062b07346ed1c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "example"`);
    }

}
