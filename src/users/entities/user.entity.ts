import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.enum";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ type: "enum", enum: Role, default: Role.CLIENT })
    role: string;
}
