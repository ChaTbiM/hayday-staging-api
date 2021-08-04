import { Column, Entity, PrimaryColumn } from "typeorm";
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

    @Column({ type: "date" })
    createdAt: Date;
}
