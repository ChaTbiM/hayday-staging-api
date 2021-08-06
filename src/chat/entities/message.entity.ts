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

    @ManyToOne(() => Project, project => project.id)
    @JoinColumn()
    project: Project;

    @Column({ type: "timestamptz", default: new Date() })
    createdAt: Date;


}
