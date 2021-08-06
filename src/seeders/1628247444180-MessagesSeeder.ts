import { Message } from "src/chat/entities/message.entity";
import { MigrationInterface, QueryRunner } from "typeorm";

export class MessagesSeeder1628247444180 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.createQueryBuilder().insert()
            .into(Message)
            .values([
                { content: "message1", from: { id: 5 }, project: { id: 1 } },
                { content: "message1", from: { id: 2 }, project: { id: 1 } },
                { content: "message1", from: { id: 5 }, project: { id: 1 } },
                { content: "message1", from: { id: 5 }, project: { id: 1 } },
                { content: "message1", from: { id: 2 }, project: { id: 1 } },
                { content: "message1", from: { id: 2 }, project: { id: 1 } },
            ])
            .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
