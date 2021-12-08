import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'oauth'})
export class Oauth {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    service_id: number;

    @Column({ default: "" })
    access_token: string;

    @Column({ default: "" })
    refresh_token: string;

}