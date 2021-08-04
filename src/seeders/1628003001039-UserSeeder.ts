import { Role } from "src/users/entities/role.enum";
import { User } from "src/users/entities/user.entity";
import { MigrationInterface, QueryRunner } from "typeorm";

export class UserSeeder1628003001039 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.createQueryBuilder().insert()
            .into(User)
            .values([
                { id: 1, email: "admin@gmail.com", phone: "+213549678707", password: "$2b$10$F17UOdZGb1F1uLkV35QwTedGVnofaFSIwWb2KN29AgeqzuXlwhRdS", role: Role.ADMIN },
                { id: 2, email: "employee@gmail.com", phone: "+213549678708", password: "$2b$10$F17UOdZGb1F1uLkV35QwTedGVnofaFSIwWb2KN29AgeqzuXlwhRdS", role: Role.EMPLOYEE },
                { id: 3, email: "employee1@gmail.com", phone: "+213549678709", password: "$2b$10$F17UOdZGb1F1uLkV35QwTedGVnofaFSIwWb2KN29AgeqzuXlwhRdS", role: Role.EMPLOYEE },
                { id: 4, email: "employee2@gmail.com", phone: "+213549678709", password: "$2b$10$F17UOdZGb1F1uLkV35QwTedGVnofaFSIwWb2KN29AgeqzuXlwhRdS", role: Role.EMPLOYEE },
                { id: 5, email: "client@gmail.com", phone: "+213549678710", password: "$2b$10$F17UOdZGb1F1uLkV35QwTedGVnofaFSIwWb2KN29AgeqzuXlwhRdS", role: Role.CLIENT },
                { id: 6, email: "client1@gmail.com", phone: "+213549678711", password: "$2b$10$F17UOdZGb1F1uLkV35QwTedGVnofaFSIwWb2KN29AgeqzuXlwhRdS" },
            ])
            .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "user"`);
    }

}
