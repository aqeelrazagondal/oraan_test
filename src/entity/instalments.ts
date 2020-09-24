import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import {
    IsInt,
    IsNumber,
    IsString,
    IsDate
  } from "class-validator";
import { User } from "./user";
import { PaymentMethod } from "./paymentMethods";

@Entity()
export class Instalment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User)
    @JoinColumn({ name: "userId" })
    @IsNumber()
    userId: number;

    @Column({
        type: "datetime"
    })
    @IsDate()
    paymentDate: Date;

    @Column({
        type: "datetime"
    })
    @IsDate()
    instalmentDate: Date;
    
    @Column({
        type: "datetime"
    })
    @IsInt()
    instalmentAmount: number;
    
    @Column({
        type: "varchar"
    })
    @IsString()
    @ManyToOne(type => PaymentMethod)
    @JoinColumn({ name: "paymentMethodId" })
    @IsNumber()
    paymentMethodId: number;

    // Generic Fields
    @Column({ nullable: true, type: "datetime" })
    createdAt: Date;
        
    @Column({ nullable: true, type: "datetime" })
    updatedAt: Date;
    
    @BeforeInsert()
    beforeinsert() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
    
    @BeforeUpdate()
    beforeUpdate() {
        this.createdAt = new Date();
    }
}

export const installmentSchema = {
    userId: { type: "string", required: true, example: "Javier" },
    paymentDate: { type: "date", required: true, example: "12-12-2020" },
    instalmentDate: { type: "date", required: true, example: "12-12-2020" },
    instalmentAmount: { type: "Number", required: true, example: "2345" },
    paymentMethodId: { type: "string", required: true, example: "avileslopez.javier@gmail.com" }
};