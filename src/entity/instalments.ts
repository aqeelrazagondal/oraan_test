import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { Length, IsEmail, IsNumber } from "class-validator";
import { User } from "./user";

@Entity()
export class Instalments {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User)
    @JoinColumn({ name: 'user_id' })
    @IsNumber()
    user_id: number;

    @Column({
        type: 'datetime'
    })
    payment_date: Date;

    @Column({
        type: 'datetime'
    })
    instalment_date: Date;
    
    @Column({
        type: 'datetime'
    })
    instalment_amount: Number;
    
    @Column({
        type: 'varchar'
    })
    payment_method: string;

        // Generic Fields
        @Column({ nullable: true, type: 'datetime' })
        created_at: Date;
        
        @Column({ nullable: true, type: 'datetime' })
        updated_at: Date;
    
        @BeforeInsert()
        beforeinsert() {
            this.created_at = new Date();
            this.updated_at = new Date();
        }
    
        @BeforeUpdate()
        beforeUpdate() {
            this.created_at = new Date();
        }
}

export const userSchema = {
    id: { type: "number", required: true, example: 1 },
    name: { type: "string", required: true, example: "Javier" },
    email: { type: "string", required: true, example: "avileslopez.javier@gmail.com" }
};