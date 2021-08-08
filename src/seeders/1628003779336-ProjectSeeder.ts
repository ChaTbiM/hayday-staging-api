import { Project } from "src/projects/entities/project.entity";
import { MigrationInterface, QueryRunner } from "typeorm";

export class ProjectSeeder1628003779336 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.createQueryBuilder().insert()
            .into(Project)
            .values([
                { id: 1, type: "logo", description: "project 1 description", createdAt: new Date(), client: { id: 5 }, employee: { id: 2 }, },
                { id: 2, type: "logo", description: "project 2 description", createdAt: new Date(), client: { id: 6 }, employee: { id: 2 }, },
                { id: 3, type: "logo", description: "project 3 description", createdAt: new Date(), client: { id: 5 }, employee: { id: 3 }, }
            ])
            .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "user"`);
    }

}
