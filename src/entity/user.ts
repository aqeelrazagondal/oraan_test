import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { Length, IsEmail } from "class-validator";
import bcrypt from "bcrypt";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 80,
        type: "varchar"
    })
    @Length(5, 80)
    user_name: string;

    @Column({
        length: 20,
        type: "varchar"
    })
    @Length(5, 80)
    phone_number: string;


    @Column({
        length: 100,
        type: "varchar"
    })
    @Length(10, 100)
    password: string;

    // Generic Fields
    @Column({ nullable: true, type: 'datetime' })
    created_at: Date;
    
    @Column({ nullable: true, type: 'datetime' })
    updated_at: Date;

    @BeforeInsert()
    beforeinsert() {
        this.created_at = new Date();
        this.updated_at = new Date();
        this.password = bcrypt.hashSync(this.password, 10);
    }

    @BeforeUpdate()
    beforeUpdate() {
        this.created_at = new Date();
    }
}

export const userSchema = {
    id: { type: "number", required: true, example: 1 },
    username: { type: "string", required: true, example: "Javier" },
    password: { type: "string", required: true, example: "avileslopez.javier@gmail.com" }
};