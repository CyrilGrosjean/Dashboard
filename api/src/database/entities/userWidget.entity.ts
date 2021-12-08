import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_widget')
export class UserWidget {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    widget_id: number;

    @Column("integer", { default: [0, 0], array: true })
    x_y: number[];

    @Column({ default: 0 })
    widget_number: number;

    @Column({ default: "" })
    form_values: string;

    @Column({ default: 0 })
    service_id: number;

}