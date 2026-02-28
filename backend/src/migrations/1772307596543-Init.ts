import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1772307596543 implements MigrationInterface {
    name = 'Init1772307596543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."authority_verificationstatus_enum" AS ENUM('PENDING', 'VERIFIED', 'REJECTED')`);
        await queryRunner.query(`CREATE TABLE "authority" ("id" SERIAL NOT NULL, "institution" character varying NOT NULL, "province" character varying NOT NULL, "badgeNumber" character varying NOT NULL, "password" character varying NOT NULL, "verificationStatus" "public"."authority_verificationstatus_enum" NOT NULL DEFAULT 'PENDING', "isActive" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_80f2ce13d2e8d3e80cfedeb9c4d" UNIQUE ("badgeNumber"), CONSTRAINT "PK_b0f9bb35ff132fc6bd92d0582ce" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "authority"`);
        await queryRunner.query(`DROP TYPE "public"."authority_verificationstatus_enum"`);
    }

}
