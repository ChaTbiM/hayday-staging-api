import { Project } from "src/projects/entities/project.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
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

    @OneToMany(() => Project, project => project.client)
    projects: Project[];

    @OneToMany(() => Project, project => project.employee)
    managedProjects: Project[];

}
