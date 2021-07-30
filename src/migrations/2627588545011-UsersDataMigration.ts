import { Role } from "src/users/entities/role.enum";
import { User } from "src/users/entities/user.entity";
import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersDataMigration2627588545011 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.createQueryBuilder().insert()
            .into(User)
            .values([
                { email: "admin@gmail.com", password: "$2b$10$F17UOdZGb1F1uLkV35QwTedGVnofaFSIwWb2KN29AgeqzuXlwhRdS", role: Role.ADMIN },
                { email: "employee@gmail.com", password: "$2b$10$F17UOdZGb1F1uLkV35QwTedGVnofaFSIwWb2KN29AgeqzuXlwhRdS", role: Role.EMPLOYEE },
                { email: "employee1@gmail.com", password: "$2b$10$F17UOdZGb1F1uLkV35QwTedGVnofaFSIwWb2KN29AgeqzuXlwhRdS", role: Role.EMPLOYEE },
                { email: "client@gmail.com", password: "$2b$10$F17UOdZGb1F1uLkV35QwTedGVnofaFSIwWb2KN29AgeqzuXlwhRdS", role: Role.CLIENT },
                { email: "client1@gmail.com", password: "$2b$10$F17UOdZGb1F1uLkV35QwTedGVnofaFSIwWb2KN29AgeqzuXlwhRdS" },
            ])
            .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DELETE FROM user;
        `);
    }

}
