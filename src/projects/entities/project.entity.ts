import { Message } from "src/chat/entities/message.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Status } from "./status.enum";

@Entity()
export class Project {
    @PrimaryColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    description: string;

    @Column({ type: "enum", enum: Status, default: Status.INPROGRESS })
    status: string;

    @Column({ type: "timestamptz" })
    createdAt: Date;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn()
    client: User;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn()
    employee: User;

    @OneToMany(() => Message, message => message.content)
    messages: Message[];
}

