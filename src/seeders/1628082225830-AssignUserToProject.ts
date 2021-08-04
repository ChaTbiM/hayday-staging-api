import { Project } from "src/projects/entities/project.entity";
import { User } from "src/users/entities/user.entity";
import { MigrationInterface, QueryRunner } from "typeorm";

export class AssignUserToProject1628082225830 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const userRepository = await queryRunner.connection.getRepository(User);
        let client = await userRepository.findOne({ id: 5 })
        let client1 = await userRepository.findOne({ id: 6 })

        let employee = await userRepository.findOne({ id: 2 })
        let employee1 = await userRepository.findOne({ id: 3 })

        let projectRepository = await queryRunner.connection.getRepository(Project);


        client.projects = [...await projectRepository.findByIds([1, 2])]
        client1.projects = [await projectRepository.findOne({ id: 3 })]


        employee.projects = [...await projectRepository.findByIds([1, 3])]
        employee1.projects = [await projectRepository.findOne({ id: 2 })]

        await userRepository.save(client)
        await userRepository.save(client1)

        await userRepository.save(employee)
        await userRepository.save(employee1)

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "user_projects_project"`);
    }

}
