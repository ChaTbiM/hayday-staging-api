import { Project } from "src/projects/entities/project.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn()
    from: User;

    @Column()
    fromId: number;

    @ManyToOne(() => Project, project => project.id)
    @JoinColumn()
    project: Project;


    @Column()
    projectId: number;

    @Column({  type: "timestamp with time zone", default: new Date() })
    createdAt: Date;


}
