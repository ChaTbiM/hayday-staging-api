import { File } from "src/projects/entities/file.entity";
import { MigrationInterface, QueryRunner } from "typeorm";

export class FileSeeder1628434771006 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.createQueryBuilder().insert()
            .into(File)
            .values([
                { filename: "01.jpg" , project:{id:1} },
                { filename: "1.png" , project:{id:1} },
                { filename: "002.png", project:{id:2} },
                { filename: "02.jpg", project:{id:2} },
                { filename: "2.png", project:{id:2} },
                { filename: "003.gif" , project:{id:3}},
            ])
            .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "file"`);
    }

}
