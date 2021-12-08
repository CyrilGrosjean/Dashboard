import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'authentication'})
export class Authentication {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'username'})
    username: string;

    @Column({name: 'password', default: "" })
    password: string;

    @Column({name: 'auth_type', default: 0 })
    auth_type: number;

    @Column({name: 'auth_id', default: "" })
    auth_id: string;
}