import { MigrationInterface, QueryRunner } from "typeorm";

export class CheckMigration1645225105112 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.hasTable('accounts');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.hasTable('accounts');
  }

}
