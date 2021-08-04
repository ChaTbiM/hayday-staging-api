import { Project } from "src/projects/entities/project.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { Role } from "./role.enum";

@Entity()
export class User {
    @PrimaryColumn()
    id: number;

    @Column()
    email: string;

    @Column({ nullable: true })
    phone: string;

    @Column()
    password: string;

    @Column({ type: "enum", enum: Role, default: Role.CLIENT })
    role: string;

    @ManyToMany(() => Project)
    @JoinTable()
    projects: Project[];
}
