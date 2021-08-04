import { Project } from "src/projects/entities/project.entity";
import { MigrationInterface, QueryRunner } from "typeorm";

export class ProjectSeeder1628003779336 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.createQueryBuilder().insert()
            .into(Project)
            .values([
                { id: 1, type: "logo", description: "brief description", createdAt: new Date() },
                { id: 2, type: "logo", description: "brief description", createdAt: new Date() },
                { id: 3, type: "logo", description: "brief description", createdAt: new Date() }
            ])
            .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "user"`);
    }

}
