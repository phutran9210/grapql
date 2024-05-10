import {
    Column,
    CreateDateColumn, DeleteDateColumn,
    Entity, JoinTable, ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { Field, ObjectType } from '@nestjs/graphql';
import { Role } from "./Role.entity";
import { Exclude } from "class-transformer";

@Entity('users')
@ObjectType()
export class User {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Field()
    username: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    displayName?: string;

    @Column()
    @Field()
    is_active: boolean;

    @CreateDateColumn()
    @Field(() => Date)
    created_at: Date;

    @UpdateDateColumn()
    @Field(() => Date)
    updated_at: Date;

    @DeleteDateColumn()
    @Field(() => Date, { nullable: true })
    @Exclude()
    deleted_at?: Date;

    @Field(() => [Role])
    @ManyToMany(() => Role, role => role.users)
    @JoinTable({
        name: 'user_role', // Tên bảng liên kết trong cơ sở dữ liệu
        joinColumn: {
            name: 'user_id', // Tên cột trong bảng liên kết tham chiếu đến User
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'role_id', // Tên cột trong bảng liên kết tham chiếu đến Role
            referencedColumnName: 'id'
        }
    })
    roles: Role[];

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}
