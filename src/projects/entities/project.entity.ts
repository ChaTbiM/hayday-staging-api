import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Status } from "./status.enum";

@Entity()
export class Project {
    @PrimaryColumn()
    id: number;

    @Column()
    type: string;

    @Column({ type: "enum", enum: Status, default: Status.INPROGRESS })
    status: string;

    @Column({ type: "date" })
    createdAt: Date;

    @OneToOne(() => User)
    @JoinColumn()
    client: User;

    @OneToOne(() => User)
    @JoinColumn()
    employee: User;

}
